var MidiWriter = require('midi-writer-js');

function velocity(point) {
    var MAX = 2500.0;

    p = parseInt(point, 10);

    if (p > MAX) {
        return 100;
    }

    v = parseInt(p*100/MAX);
    console.log("%o", v)
    return v;
}

function velocityCymbal(point) {
    p = parseInt(point, 10);

    if (p > 5000) {
        return 100;
    }

    return 0;
}

function velocityBlownBottle(point) {
    p = parseInt(point, 10);

    if (p == 0) {
        return 50;
    }

    return 0;
}

function buildSong(fireData) {
    var GUITAR = 49;
    var CYMBAL = 32;
    var BLOWN_BOTTLE = 73;

    var track = new MidiWriter.Track();
    var guitarTrack = new MidiWriter.Track();
    var cymbalTrack = new MidiWriter.Track();
    var blownBottleTrack = new MidiWriter.Track();
    track.setTempo(90);
    guitarTrack.setTempo(90);
    cymbalTrack.setTempo(90);
    blownBottleTrack.setTempo(90);

    guitarTrack.addEvent(new MidiWriter.ProgramChangeEvent({instrument: GUITAR}));
    cymbalTrack.addEvent(new MidiWriter.ProgramChangeEvent({instrument: CYMBAL}));
    blownBottleTrack.addEvent(new MidiWriter.ProgramChangeEvent({instrument: BLOWN_BOTTLE}));

    for( var i = 0; i < fireData.length; i++) {
        track.addEvent([
            new MidiWriter.NoteEvent({pitch: ['C1'], duration: '16',
                velocity: 0, channel: 1}),
          ], function(event, index) {
            return {sequential: true};
          }
        );

        guitarTrack.addEvent([
            new MidiWriter.NoteEvent({pitch: ['A1'], duration: '16',
                velocity: velocity(fireData[i]), channel: 2}),
          ], function(event, index) {
            return {sequential: true};
          }
        );

        cymbalTrack.addEvent([
            new MidiWriter.NoteEvent({pitch: ['G8'], duration: '16',
                velocity: velocityCymbal(fireData[i]), channel: 3}),
          ], function(event, index) {
            return {sequential: true};
          }
        );

        blownBottleTrack.addEvent([
            new MidiWriter.NoteEvent({pitch: ['E1'], duration: '16',
                velocity: velocityBlownBottle(fireData[i]), channel: 4}),
          ], function(event, index) {
            return {sequential: false};
          }
        );

    }

    var write = new MidiWriter.Writer([track, guitarTrack, cymbalTrack, blownBottleTrack]);
    return write.buildFile();
}

function saveSongToFile(song) {
    const fs = require('fs');

    fs.writeFile('symphony.mid', song, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('file saved!');
    });
}

function publishSong(fireData) {
    var song = buildSong(fireData);

    saveSongToFile(song);
}


function run() {
    var inputs = [];

    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('viirs.raw.ordered.csv')
    });

    lineReader.on('line', function (line) {
        inputs.push(parseInt(line, 10))
    });

    lineReader.on('close', function() {
        publishSong(inputs);
    });
}

run();




