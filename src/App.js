import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import './App.css';
import Stave from './components/stave/stave';
import noteMap from './note-map';
import { chunkArray } from './utils/helpers';

injectTapEventPlugin();

class App extends Component {

  constructor() {
    super();

    this.state = ({
      message: '',
      notes: [],
      noteChunks: [],
      clefNum: 1,
      clef: 'treble',
    });

    this.noteLength = 8;
  }

  textChange(e) {
    const safeMessage = (e.target.value && e.target.value
      .replace(/[^a-zA-Z.,!? ]/g, '')
      .split('')) || [];

    const notes = safeMessage
      .map(n => ({
        keys: [`${n === ' ' ? 'b' : noteMap[n].substring(0, 1)}/4`],
        duration: n === ' ' ? `${this.noteLength}r` : `${this.noteLength}`,
        accidental: noteMap[n].substring(1),
      })
    );

    const noteChunks = chunkArray(notes, this.noteLength);

    this.setState({
      message: e.target.value,
      notes,
      noteChunks,
    });
  }

  handleClef = (e, i, v) => {

    const clef = v === 1 ? 'treble'
      : v === 2 ? 'bass'
      : 'alto';

    this.setState({
      clefNum: v,
      clef,
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <h1>Musical typing</h1>
            <p>Type a message into the input below to parse english characters
            into music notation.</p>
          </div>

          <div className="flex-container">
            <div className="enter-text">
              <TextField
                hintText="e.g. hello"
                floatingLabelText="Start typing!"
                onChange={e => this.textChange(e)}
              />
            </div>

            <div className="clef-select">
              <SelectField value={this.state.clefNum} onChange={this.handleClef}>
                <MenuItem value={1} primaryText="Treble" />
                <MenuItem value={2} primaryText="Bass" />
                <MenuItem value={3} primaryText="Alto" />
              </SelectField>
            </div>

            <div className="notation">
              {this.state.noteChunks.map((n, i) =>
                <Stave
                  key={i}
                  clef={this.state.clef}
                  notes={n}
                  noteLength={this.noteLength}
                />
                )
              }
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
