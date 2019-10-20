const MidiWriter = require('midi-writer-js');
const NotePicker = require('./music.js');


const MAX = {
    MELODY: 2500.0,
    PERCUSSION: 5000.0,
};


function velocity(p) {
    if (p > MAX.MELODY) {
        return 100;
    }

    v = parseInt(p*100/MAX.MELODY);
    // console.log("%o", v)
    return v;
}

function velocityCymbal(p) {
    if (p > MAX.PERCUSSION) {
        return 100;
    }

    return 0;
}

function velocityBlownBottle(p) {
    if (p == 0) {
        return 50;
    }

    return 0;
}

module.exports = function buildSong(fireData) {
    const GUITAR = 49;
    const CYMBAL = 32;
    const BLOWN_BOTTLE = 73;

    const track = new MidiWriter.Track();
    const guitarTrack = new MidiWriter.Track();
    const cymbalTrack = new MidiWriter.Track();
    const blownBottleTrack = new MidiWriter.Track();

    track.setTempo(90);
    guitarTrack.setTempo(90);
    cymbalTrack.setTempo(90);
    blownBottleTrack.setTempo(90);

    guitarTrack.addEvent(new MidiWriter.ProgramChangeEvent({instrument: GUITAR}));
    cymbalTrack.addEvent(new MidiWriter.ProgramChangeEvent({instrument: CYMBAL}));
    blownBottleTrack.addEvent(new MidiWriter.ProgramChangeEvent({instrument: BLOWN_BOTTLE}));

    for(let i = 0; i < fireData.length; i++) {
        const datum = fireData[i];

        const pianoTone = new NotePicker(datum, track, {
          pitches: ['C1'],
          velocity: 0,
          channel: 1,
        });

        const guitarTone = new NotePicker(datum, guitarTrack, {
          pitches: ['A1'],
          velocity: velocity(datum),
          channel: 2,
        });

        const CymbalTone = new NotePicker(datum, cymbalTrack, {
          pitches: ['G8'],
          velocity: velocityCymbal(datum),
          channel: 3,
        });

        const BlownBottleTone = new NotePicker(datum, blownBottleTrack, {
          pitches: ['E1'],
          velocity: velocityBlownBottle(datum),
          channel: 4,
          sequential: false,
        });
    }

    var write = new MidiWriter.Writer(track);
    return write.buildFile();
}