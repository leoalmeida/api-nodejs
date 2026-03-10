import React from 'react';
import './App.scss';
import AddResource from './components/AddResource';
import ResourceList from './components/ResourceList';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: [],
    };
  }

  componentDidMount() {
    fetch('/api/v1')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          resources: data.data,
        });
      })
      .catch((e) => console.log('Error : ', e));
  }

  handleAddResource = (value) => {
    fetch('/api/v1/resource', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text: value}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        this.setState({
          resources: [...this.state.resources, {text: value}],
        });
      })
      .catch((e) => console.log('Error : ', e));
  };

  render() {
    return (
      <div className="App container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
              <h1>Resources</h1>
              <div className="resource-app">
                <AddResource handleAddResource={this.handleAddResource} />
                <ResourceList resources={this.state.resources} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
