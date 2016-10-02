import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import Stave from './components/stave/stave';
import noteMap from './note-map';

injectTapEventPlugin();

class App extends Component {

  constructor() {
    super();

    this.state = ({
      message: '',
      notes: [],
      noteChunks: [],
    });

    this.noteLength = 8;
  }

  textChange(e) {
    const safeMessage = (e.target.value && e.target.value
      .toLowerCase()
      .replace(/[^a-z ]/g, '')
      .split('')) || [];

    const notes = safeMessage
      .map(n => ({
        keys: [`${n === ' ' ? 'b' : noteMap[n]}/4`],
        duration: n === ' ' ? `${this.noteLength}r` : `${this.noteLength}`,
        accidental: noteMap[n].substring(1),
      })
    );

    const noteChunks = this.chunkArray(notes, this.noteLength);

    this.setState({
      message: e.target.value,
      notes,
      noteChunks,
    });
  }

  chunkArray(notesArray, size) {
    return notesArray.reduce((array, it, i) => {
      const segment = Math.floor(i / size);

      if (!array[segment]) {
        array[segment] = [];
      }

      array[segment].push(it);

      return array;
    }, []);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <h1>Musical typing</h1>
            <p>Type a message into the input below to parse english characters into music notation.</p>
          </div>
          <div className="enterText">
            <TextField
              hintText="e.g. hello"
              floatingLabelText="Start typing!"
              onChange={e => this.textChange(e)}
            />
          </div>
          {this.state.noteChunks.map((n, i) =>
            <Stave
              key={i}
              clef="treble"
              notes={n}
              noteLength={this.noteLength}
            />
            )
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
