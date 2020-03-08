import React, { Component } from 'react';

class Button extends Component {
  render() { 
    return (<div className="m-3">
      {this.props.counter.value}
      <button className="btn btn-primary ml-3" onClick={() => this.props.onIncrement(this.props.counter)}>Increment</button>
      <button className="btn btn-primary ml-3" onClick={() => this.props.onDecrement(this.props.counter)}>Decrement</button>
      <button className="btn btn-danger m-3" onClick={this.props.onDelete}>Delete</button>
      </div>);
  }
}
 
export default Button;