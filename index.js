const MidiWriter = require('midi-writer-js');
const saveSong = require('./song_saver.js')
const run = require('./runner.js');

run(saveSong);
