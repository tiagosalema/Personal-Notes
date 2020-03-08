import React from 'react';
import ReactDOM from 'react-dom';
class Input extends React.Component {
  handleChange = e => { this.props.aaa(e.target.value); }
  
  render() { 

    const value = this.props.value; // the value comes from the parent component (! the parent component is the source of truth !)
    return (<input
      value={value} 
      onChange={this.handleChange}
      />  );
  }
}
 

class Inputs extends React.Component {
  state = {
    temperature: this.props.value,
    marcador: 1
  }

  handleChange1 = temperature => { this.setState({temperature, marcador: 2}); }
  handleChange2 = temperature => { this.setState({temperature, marcador: 1}); }

  render() { 
    const val1 = this.state.marcador === 1 ? this.state.temperature / 2 || '' : this.state.temperature;
    const val2 = this.state.marcador === 2 ? this.state.temperature * 2 || '' : this.state.temperature;
    return ( <div>

      <Input value={val1} aaa={this.handleChange1} />
      <Input value={val2} aaa={this.handleChange2} />

    </div> );
  }
}

ReactDOM.render(<Inputs value='11' />, document.getElementById('root'));
