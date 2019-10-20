const MidiWriter = require('midi-writer-js');

const VELOCITY_MAX = 2500.0;

module.exports = class NotePicker {
  constructor(dataPoint, track, options) {
    options = options || {}
    this.sum = dataPoint.sum;
    this.average = dataPoint.average;
    this.isRising = dataPoint.isRising;
    this.track = track;
    this.velocity = options.velocity || this.getVelocity();
    this.duration = options.duration || this.getDuration();
    this.channel = options.channel || 1;
    this.pitches = options.pitches || this.getPitches();
    this.sequential = options.sequential || true;
    this.pickNote();
  }

  pickNote() {
    // logic can go here for what note to pick
    this.default();
  }

  getPitches() {
    // this should be calculated
    return ['C4'];
  }

  getVelocity() {
    // this needs to be updated with our other velocity checks
    const p = this.sum;

    if (p > VELOCITY_MAX) {
      return 100;
    }

    const v = parseInt(p*100/VELOCITY_MAX);
    // console.log("%o", v)

    return v;
  }

  getDuration() {
    // this should be calculated, but set to 16 for now
    return '16';
  }

  default() {
    // console.log(this.track);
    this.track.addEvent([
      new MidiWriter.NoteEvent({
        pitch: [this.pitches],
        duration: this.duration,
        velocity: this.velocity
      })], (event, index) => {
          return {sequential: this.sequential};
        }
    );
  }
}


// chooseNextNote(currentNote, key) {


// }

// upAFifth(currentNote, key) {
//   key[5]
// }



// backToRoot(key) {
//   return key[1];
// }

// upAFifth(key) {
//   return key[5];
// }


// upAFifth(currentNotePosition, key) {
//   key[5]
// }


// rollUp() {
//   track.addEvent([
//     new MidiWriter.NoteEvent({pitch: ['C4'], duration: '16',
//           velocity: velocity(fireData[i])}),
//     ], function(event, index) {
//       return {sequential: true};
//     }
//   );
// }

// module.exports.NotePicker;