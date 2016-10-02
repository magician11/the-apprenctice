export default class SpeechRecognition {
  constructor(onAnythingSaid, onFinalised) {
    if (!('webkitSpeechRecognition' in window)) {
      throw new Error("Your browser doesn't support speech recognition. Try Google Chrome.");
    }
    const WebkitSpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new WebkitSpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      console.log('event');
      console.log(event);
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
          onAnythingSaid(finalTranscript);
          onFinalised(finalTranscript);
        } else {
          interimTranscript += event.results[i][0].transcript;
          onAnythingSaid(interimTranscript);
        }
      }
    };
    recognition.start();
  }
}
