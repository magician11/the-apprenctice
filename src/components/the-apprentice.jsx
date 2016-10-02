import React, { Component } from 'react';
import Typist from 'react-typist';
import annyang from 'annyang';

import styling from '../styling/main.scss';

class TheApprentice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: props.initialThoughts,
      currentThought: '',
      typing: true,
      error: '',
    };

    if (annyang) {
      this.think = this.think.bind(this);
      this.listen = this.listen.bind(this);
      this.addThought = this.addThought.bind(this);
      this.listen();
    } else {
      this.state.error = 'You need a different browser to interact with me. Try Google Chrome.';
    }
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

  addThought(thought) {
    console.log(`Adding thought: ${thought}`);
    this.setState({
      thoughts: this.state.thoughts.concat(thought),
    });

    this.think();
  }

  listen() {
    const commands = {
      'pretty good thanks': () => this.addThought('Awesome!'),
      'repeat after me *sentence': sentence => this.addThought(sentence),
    };

    annyang.addCommands(commands);
    annyang.start();
    annyang.debug(true);
  }

  render() {
    console.log(this.state);
    const { currentThought, error, typing } = this.state;
    let text;

    if (error) {
      text = error;
    } else if (typing) {
      const cursor = {
        show: false,
      };
      console.log(`About to type out ${currentThought}`);
      text = <Typist onTypingDone={this.think} cursor={cursor}>{currentThought}</Typist>;
    } else {
      text = currentThought;
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
