import React, { Component } from 'react'
import List from './List'

export default class App extends Component {

  state = {
    numbers: []
  };

  componentDidMount() {
    this.randomized()
  }

  randomized = () => {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    }
    fetch('http://localhost:8882/api/numbers', options)
      .then((res) => res.json())
      .then(data => {
        console.log("randomized", data)
        this.setState({
          numbers: data
        });
      });
  }

  releaseBack = () => {
    const { numbers } = this.state
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ data: numbers })
    }
    fetch('http://localhost:8882/api/numbers', options)
      .then((res) => res.json())
      .then(result => {
        console.log(result)
      });
  }

  onRemove = (number) => {
    this.setState({
      numbers: this.state.numbers.filter((e) => e.number !== number)
    });
  }

  render() {
    return (
      <div style={{ margin: 10, padding: 30 }}>
        <div style={{ padding: 30 }}>
          <button onClick={this.randomized}>Simulate Fetch Randomizer</button>
          <button onClick={this.releaseBack}>Simulate Logout or Timeout</button>
        </div>
        <text>Click a number to simulate a Buy</text>
        <List onRemove={this.onRemove} numbers={this.state.numbers} />
      </div>
    );
  }
}
