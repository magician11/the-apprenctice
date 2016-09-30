import React, { Component } from 'react';
import TypeWriter from 'react-typewriter';

import styling from '../styling/main.scss';

class TheApprentice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: props.initialThoughts,
      currentThought: '',
    };

    this.think = this.think.bind(this);
  }

  think() {
    this.setState({
      currentThought: this.state.thoughts[0],
      thoughts: this.state.thoughts.slice(1),
    });
  }

  render() {
    return (
      <div className={styling['the-apprentice']}>
        <h1><TypeWriter typing={1} onTypingEnd={this.think}>{this.state.currentThought}</TypeWriter></h1>
      </div>
    );
  }
}

TheApprentice.propTypes = {
  initialThoughts: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default TheApprentice;
