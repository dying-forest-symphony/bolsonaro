const fs = require('fs');
const buildSong = require('./song_builder.js');

function saveSongToFile(song) {
    const fs = require('fs');

    fs.writeFile('symphony.mid', song, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('file saved!');
    });
}

module.exports = function saveSong(fireData) {
    const song = buildSong(fireData);
    saveSongToFile(song);
}