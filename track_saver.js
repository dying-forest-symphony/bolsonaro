const fs = require('fs');

module.exports = function saveTracks(tracks) {
    const fs = require('fs');

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      fs.writeFile(`tracks/${i}.mid`, track, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log(`track ${i} saved!`);
      });
    }
}
