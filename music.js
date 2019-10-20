const MidiWriter = require('midi-writer-js');

const VELOCITY_MAX = 2500.0;

module.exports = class NotePicker {
  constructor(dataPoint, track) {
    this.sum = dataPoint.sum;
    this.average = dataPoint.average;
    this.isRising = dataPoint.isRising;
    this.track = track;
    this.velocity = this.getVelocity();
    this.duration = this.getDuration();
  }

  getVelocity() {
    const p = this.sum;

    if (p > VELOCITY_MAX) {
        return 100;
    }

    const v = parseInt(p*100/VELOCITY_MAX);
    console.log("%o", v)
    return v;
  }

  getDuration() {
    return '16';
  }

  defaultC() {
    this.track.addEvent([
      new MidiWriter.NoteEvent({
        pitch: ['C4'],
        duration: '16',
        velocity: this.velocity
      })], function(event, index) {
          return {sequential: true};
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