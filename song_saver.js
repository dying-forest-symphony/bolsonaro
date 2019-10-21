const fs = require('fs');
const buildSong = require('./song_builder.js');
const saveTracks = require('./track_saver.js');
const exec = require('child_process').exec;


const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

function buildCommand(len) {
    let files = []
    for(let i = 0; i < len; i++) {
        files.push(`tracks/${i}.mid`);
    }

    return `python3 ~/miditools/miditools/midisox_py -M ${files.join(" ")} out.mid`;
}

module.exports = function saveSong(fireData) {

    const tracks = buildSong(fireData);
    saveTracks(tracks);

    sleep(2000).then(() => {
        const command = buildCommand(tracks.length);
        exec(command, (error, stdout, stderr) => {
            console.log("out.midi is ready!");
        });
    })
}