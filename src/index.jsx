import React from 'react';
import ReactDOM from 'react-dom';
import TheApprentice from './components/the-apprentice';

// remove margins
document.body.style.margin = 0;

const initialThoughts = ['Hello Andrew'];
ReactDOM.render(<TheApprentice initialThoughts={initialThoughts} />, document.getElementById('app'));
