import React, { Component } from "react";
import axios from "axios";

class PostInstruments extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      series: "",
      digital: false,
      colors: ["black"],
      price: 0.1,
      checked: [true, false, false, false],
      id: [0, 1, 2, 3],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCheck(id, e) {
    let newChecked = [...this.state.checked];
    if (newChecked[id] === false) {
      newChecked[id] = true;
    } else {
      newChecked[id] = false;
    }
    this.setState({
      checked: newChecked,
    });

    // adding color
    let newColors = [...this.state.colors, e.target.value];
    // if color already exists, delete it
    if (this.state.colors.includes(e.target.value)) {
      newColors = newColors.filter((color) => color !== e.target.value);
    }
    this.setState({
      colors: newColors,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    if (data.checked.every((item) => item === false)) {
      alert("At least one color must be picked");
    } else {
      delete data.checked;
      delete data.id;
      axios
        .post("http://localhost:8080/api/itemsIntake", data)
        .then((res) => {
          alert("Succuss: Item added");
          this.setState({
            name: "",
            series: "",
            digital: false,
            colors: [],
            price: 0.1,
            checked: [true, false, false, false],
            id: [0, 1, 2, 3],
          });
        })
        .catch((error) => {
          alert("Error: Could not post");
        });
    }
  };

  render() {
    return (
      <div className="post-item">
        <h2>Add a new Piano</h2>
        <form className="post-form" onSubmit={this.handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <label>Series:</label>
          <input
            type="text"
            name="series"
            value={this.state.series}
            onChange={this.handleChange}
            required
          />
          <label>Digital:</label>
          <select
            value={this.state.digital}
            name="digital"
            onChange={this.handleChange}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <label>Colors:</label>
          <span className="checkmark">
            <input
              type="checkbox"
              name="colors"
              value="black"
              checked={this.state.checked[0]}
              onChange={this.handleCheck.bind(this, this.state.id[0])}
            />
            <label>Black</label>
            <input
              type="checkbox"
              name="colors"
              value="grey"
              checked={this.state.checked[1]}
              onChange={this.handleCheck.bind(this, this.state.id[1])}
            />
            <label>Grey</label>
            <input
              type="checkbox"
              name="colors"
              value="brown"
              checked={this.state.checked[2]}
              onChange={this.handleCheck.bind(this, this.state.id[2])}
            />
            <label>Brown</label>
            <input
              type="checkbox"
              name="colors"
              value="white"
              checked={this.state.checked[3]}
              onChange={this.handleCheck.bind(this, this.state.id[3])}
            />
            <label>White</label>
          </span>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={this.state.price}
            min="0.01"
            step="0.01"
            onChange={this.handleChange}
            required
          />
          <button>Add Piano</button>
        </form>
      </div>
    );
  }
}

export default PostInstruments;
