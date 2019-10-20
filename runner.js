var readline = require('readline');
var fs = require('fs');

module.exports = function(callback) {
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
        callback(inputs);
        // publishSong(inputs);
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