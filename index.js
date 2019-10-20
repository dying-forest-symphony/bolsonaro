var MidiWriter = require('midi-writer-js');
var readline = require('readline');
var fs = require('fs');

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
    var counter = 0;
    var triplet = [];
    var input = fs.createReadStream('viirs.raw.ordered.csv');

    var cursor = process.argv[2] && parseInt(process.argv[2]);
    var cursorCounter = 0;

    var lineReader = readline.createInterface({
      input: input
    });

    lineReader.on('line', function (line) {
        cursorCounter = cursorCounter + 1;
        if (cursor && cursorCounter < cursor) {
            return;
        }

        counter = counter + 1;
        triplet.push(parseInt(line, 10))

        if (counter > 2) {
            inputs.push(dataPoint(triplet));
            counter = 0;
            triplet = [];
        }
    });

    lineReader.on('close', function() {
        console.log(inputs);
        publishSong(inputs);
    });
}

function average(triplet) {
    return Math.ceil(sum(triplet) / triplet.length);
}

function sum(triplet) {
    return (triplet[0] + triplet[1] + triplet[2]);
}

function isRising(triplet) {
    return (triplet[2] > triplet[1] > triplet[0]);
}

function dataPoint(triplet) {
    return {
        value: triplet,
        sum: sum(triplet),
        average: average(triplet),
        isRising: isRising(triplet)
    };
}

run();




