import React from "react";
import axios from "axios";
import "./App.scss";
import AddResource from "./components/AddResource";
import ResourceList from "./components/ResourceList";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/v1")
      .then((response) => {
        this.setState({
          resources: response.data.data,
        });
      })
      .catch((e) => console.log("Error : ", e));
  }

  handleAddResource = (value) => {
    axios
      .post("/api/v1/resource", { text: value })
      .then(() => {
        this.setState({
          resources: [...this.state.resources, { text: value }],
        });
      })
      .catch((e) => console.log("Error : ", e));
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