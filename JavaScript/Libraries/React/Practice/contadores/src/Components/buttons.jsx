import React, { Component } from 'react';
import Button from './button';

class Buttons extends Component {
  render() {
    const { buttons, onDelete, onReset, onDecrement, onAdd, onIncrement} = this.props;

    return (
        <div>
          <button className="btn m-2" onClick={onReset}>Reset</button>
          <button className="btn m-2" onClick={onAdd}>Add</button>
          {buttons.map(button => {
            return <Button
              key={button.id}
              counter={button}
              onIncrement={() => onIncrement(button)} 
              onDecrement={() => onDecrement(button)} 
              onDelete={() => onDelete(button.id)}
              />;
          })}
        </div>
    )}
}
 
export default Buttons;