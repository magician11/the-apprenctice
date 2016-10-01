import React, { Component } from 'react';
import Typist from 'react-typist';

import styling from '../styling/main.scss';

class TheApprentice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: props.initialThoughts,
      currentThought: '',
      typing: true,
    };

    this.think = this.think.bind(this);
  }

  think() {
    if (this.state.thoughts.length > 0) {
      this.setState({ typing: false }, () => {
        setTimeout(() =>
        this.setState({
          currentThought: this.state.thoughts[0],
          thoughts: this.state.thoughts.slice(1),
          typing: true,
        }), 2200);
      });
    }
  }

  render() {
    let text;
    if (this.state.typing) {
      const cursor = {
        show: false,
      };
      text = <Typist onTypingDone={this.think} cursor={cursor}>{this.state.currentThought}</Typist>;
    } else {
      text = this.state.currentThought;
    }
    return (
      <div className={styling['the-apprentice']}>
        <h1>{text}</h1>
      </div>
    );
  }
}

TheApprentice.propTypes = {
  initialThoughts: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default TheApprentice;
