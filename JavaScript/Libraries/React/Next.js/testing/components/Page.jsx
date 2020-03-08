import React, { Component } from 'react';
import Meta from './Meta';

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        {this.props.children}
      </div>);
  }
}

export default Page;