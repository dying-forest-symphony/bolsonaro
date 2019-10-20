const MidiWriter = require('midi-writer-js');
const NotePicker = require('./music.js');

module.exports = function buildSong(fireData) {
    var track = new MidiWriter.Track();
    track.setTempo(90);

    for( var i = 0; i < fireData.length; i++) {
        const datum = fireData[i];
        const notePicker = new NotePicker(datum, track);
        notePicker.defaultC();
    }

    var write = new MidiWriter.Writer(track);
    return write.buildFile();
}