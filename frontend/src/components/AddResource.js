import React from "react";

export default class AddResource extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.elements.value;
    if (value.length > 0) {
      this.props.handleAddResource(value);
      e.target.reset();
    }
  };

  render() {
    return (
      <form
        noValidate
        onSubmit={this.handleSubmit}
        className="new-resource form-group"
      >
        <input
          type="text"
          name="value"
          required
          minLength={1}
          className="form-control"
        />
        <button className="btn btn-primary" type="submit">
          Add Resource
        </button>
      </form>
    );
  }
}