import React from "react";

export default class ResourceList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  handleActive(index) {
    this.setState({
      activeIndex: index,
    });
  }

  renderResources(resources) {
    return (
      <ul className="list-group">
        {resources.map((resource, i) => (
          <li
            className={
              "list-group-item cursor-pointer " +
              (i === this.state.activeIndex ? "active" : "")
            }
            key={i}
            onClick={() => {
              this.handleActive(i);
            }}
          >
            {resource.text}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    let { resources } = this.props;
    return resources.length > 0 ? (
      this.renderResources(resources)
    ) : (
      <div className="alert alert-primary" role="alert">
        No Resource to display
      </div>
    );
  }
}