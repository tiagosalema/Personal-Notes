import React, { Component } from 'react';
import NavBar from './Components/navbar';
import Buttons from './Components/buttons';
const uuidv1 = require('uuid/v1');


class App extends Component {
  state = {
    buttons: [
      {id: uuidv1(), value: 1},
      {id: uuidv1(), value: 10},
      {id: uuidv1(), value: 1},
      {id: uuidv1(), value: 1}
    ],
  }
  
  incrementHandler = counter => {
    const buttons = [...this.state.buttons];
    const index = this.state.buttons.indexOf(counter);
    buttons[index] = {...counter};
    buttons[index].value++;
    this.setState({buttons})
  }


  decrementHandler = counter => {
    const buttons = [...this.state.buttons];
    const index = this.state.buttons.indexOf(counter);
    buttons[index] = {...counter};
    buttons[index].value--;
    this.setState({buttons})
  }

  resetHandler = () => {
    const buttons = this.state.buttons.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({buttons})
  }

  deleteHandler = id => {
    const buttons = this.state.buttons.filter(c => c.id !== id);     
    this.setState({buttons});    
  }

  addHandler = () => {
    const {buttons} = this.state;  
    this.setState({
      buttons: [
        {id: uuidv1(), value: 0},
        ...buttons
      ]}
    );
  }

  render() { 
    return (
      <React.Fragment>
        <NavBar total = {this.state.buttons.filter(c => c.value > 0 ).length} />
        <main className = 'container'>
          <Buttons
            onAdd={this.addHandler}
            onReset={this.resetHandler}
            onIncrement={this.incrementHandler}
            onDelete={this.deleteHandler}
            onDecrement={this.decrementHandler}
            buttons={this.state.buttons}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;