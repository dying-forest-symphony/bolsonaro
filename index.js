const MidiWriter = require('midi-writer-js');
const saveSong = require('./song_saver.js')
const run = require('./runner.js');

// function velocity(point) {
//     var MAX = 2500.0;

//     p = parseInt(point, 10);

//     if (p > MAX) {
//         return 100;
//     }

//     v = parseInt(p*100/MAX);
//     console.log("%o", v)
//     return v;
// }

// function buildSong(fireData) {
//     var track = new MidiWriter.Track();
//     track.setTempo(90);

//     for( var i = 0; i < fireData.length; i++) {
//         track.addEvent([
//             new MidiWriter.NoteEvent({pitch: ['C4'], duration: '16',
//                 velocity: velocity(fireData[i])}),
//           ], function(event, index) {
//             return {sequential: true};
//           }
//         );
//     }

//     var write = new MidiWriter.Writer(track);
//     return write.buildFile();
// }

run(saveSong);




