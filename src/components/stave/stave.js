import React, { Component, PropTypes } from 'react';
import Vex from 'vexflow';

class Stave extends Component {

  constructor() {
    super();

    this.stave = null;
  }

  componentDidMount() {
    this.renderStave();
  }

  componentWillReceiveProps(nextProps) {
    this.stave.innerHTML = '';
    this.renderStave(nextProps.notes);
  }

  addRests(notes = []) {
    if (notes.length !== this.props.noteLength) {
      return Array.from(new Array(this.props.noteLength), (x, i) => i).map((n, i) => {
        if (notes[i]) {
          return notes[i];
        }

        return {
          keys: ['b/4'], duration: `${this.props.noteLength}r`,
        };
      });
    }

    return notes;
  }

  renderStave(notes = this.props.notes) {
    if (!notes.length) {
      return null;
    }

    notes = this.addRests(notes);

    const VF = Vex.Flow;

    const div = this.stave;

    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(520, 100);
    const context = renderer.getContext();
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

    // Create a stave of width 400 at position 10, 40 on the canvas.
    const stave = new VF.Stave(0, 0, 480);

    // Add a clef and time signature.
    stave.addClef(this.props.clef).addTimeSignature('4/4');

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    const notesToRender = notes.map((n) => {
      const noteObj = {
        keys: n.keys,
        duration: n.duration,
      };
      if (!n.accidental) {
        return new VF.StaveNote(noteObj);
      }

      return new VF.StaveNote(noteObj).addAccidental(0, new VF.Accidental(n.accidental));
    }
    );

    // Create a voice in 4/4 and add above notes
    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notesToRender);

    // Format and justify the notes to 400 pixels.
    new VF.Formatter().joinVoices([voice]).format([voice], 400);

    const beams = VF.Beam.generateBeams(notesToRender);

    voice.draw(context, stave);

    beams.forEach((beam) => {
      beam.setContext(context).draw();
    });
  }

  render() {
    return (
      <div ref={(ref) => { this.stave = ref; }} />
    );
  }
}

Stave.propTypes = {
  clef: PropTypes.string,
  noteLength: PropTypes.number,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      keys: PropTypes.arrayOf(PropTypes.string),
      duration: PropTypes.string,
    })
  ),
};

export default Stave;
