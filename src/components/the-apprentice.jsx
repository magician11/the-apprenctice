import React, { Component } from 'react';

import styling from '../styling/main.scss';

class TheApprentice extends Component {
  render() {
    const content = <p>Hello Andrew</p>;

    return (
      <div className={styling['the-apprentice']}>
        {content}
      </div>
    );
  }
}

export default TheApprentice;
