import React, { Component } from 'react';
import TypeWriter from 'react-typewriter';

import styling from '../styling/main.scss';

class TheApprentice extends Component {
  render() {
    const content = <TypeWriter typing={1}>Hello Andrew!</TypeWriter>;

    return (
      <div className={styling['the-apprentice']}>
        <h1>{content}</h1>
      </div>
    );
  }
}

export default TheApprentice;
