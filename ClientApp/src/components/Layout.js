import React, { Component } from 'react';
import { Container } from 'reactstrap';
import '../custom.css';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Container className="onAllPage">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
