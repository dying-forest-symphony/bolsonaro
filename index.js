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

function buildSong(fireData) {
    var track = new MidiWriter.Track();
    track.setTempo(90);

    for( var i = 0; i < fireData.length; i++) {
        track.addEvent([
            new MidiWriter.NoteEvent({pitch: ['C4'], duration: '16',
                velocity: velocity(fireData[i])}),
          ], function(event, index) {
            return {sequential: true};
          }
        );
    }

    var write = new MidiWriter.Writer(track);
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




