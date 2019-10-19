var MidiWriter = require('midi-writer-js');

function buildSong() {
    var track = new MidiWriter.Track();

    track.addEvent([
        new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
        new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
        new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
        new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
        new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8'}),
        new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
        new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'})
      ], function(event, index) {
        return {sequential: true};
      }
    );

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

function publishSong() {
    var song = buildSong();
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
        publishSong();
        console.log(inputs); // has its values now
    });
}

run();




