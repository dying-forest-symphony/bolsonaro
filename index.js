var MidiWriter = require('midi-writer-js');

function buildSong(fireData) {
    var track = new MidiWriter.Track();

    for( var i = 0; i < fireData.length; i++) {
        track.addEvent([
            new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
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




