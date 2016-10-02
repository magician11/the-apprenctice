import React, { Component } from 'react';
import Typist from 'react-typist';
// import annyang from 'annyang';
import SpeechRecognition from '../modules/speech-recognition';

import styling from '../styling/main.scss';

class TheApprentice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: props.initialThoughts,
      currentThought: '',
      typing: true,
      error: '',
      currentSpokenWords: '',
    };

    this.think = this.think.bind(this);
    this.listen = this.listen.bind(this);
    this.addThought = this.addThought.bind(this);

  }

  componentDidMount() {
    this.listen();
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
    const onAnythingSaid = (text) => {
      console.log(`Interim text: ${text}`);
      this.setState({ currentSpokenWords: text });
    };

    const onFinalised = text => console.log(`Finalised text: ${text}`);

    try {
      const listener = new SpeechRecognition(onAnythingSaid, onFinalised);
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    }
    // recognition.start(onAnythingSaid, onFinalised);
    // const commands = {
    //   'pretty good thanks': () => this.addThought('Awesome!'),
    //   'hi': () => this.addThought('hello'),
    //   'hello': () => this.addThought('hello Andrew'),
    //   'repeat after me *sentence': sentence => this.addThought(sentence),
    // };
    //
    // annyang.addCommands(commands);
    // annyang.start({ continuous: false });
    // this.debug();
  }

  // debug() {
  //   annyang.addCallback('start', error => {
  //     console.log('starting to listen...');
  //   });
  //
  //   annyang.addCallback('end', error => {
  //     console.log('no longer listening...');
  //   });
  //
  //   annyang.addCallback('error', error => {
  //     console.log('Error...');
  //     console.log(error);
  //   });
  //   annyang.debug(true);
  // }

  render() {
    console.log(this.state);
    const { currentThought, error, typing, currentSpokenWords } = this.state;
    let aiText;

    if (error) {
      aiText = error;
    } else if (typing) {
      const cursor = {
        show: false,
      };
      console.log(`About to type out ${currentThought}`);
      aiText = <Typist onTypingDone={this.think} cursor={cursor}>{currentThought}</Typist>;
    } else {
      aiText = currentThought;
    }
    return (
      <div className={styling['the-apprentice']}>
        <h1>{aiText}</h1>
        <p>{currentSpokenWords}</p>
      </div>
    );
  }
}

TheApprentice.propTypes = {
  initialThoughts: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default TheApprentice;
