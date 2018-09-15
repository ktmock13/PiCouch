var cmd = require('node-cmd');

var COUCH = {
    secondsToComplete: 6,
    openingOffset: 1,
    position: 0,
    setPosition: function (value) {

        // if postition is 100, or 0 go a bit longer to ensure closed/open fully
        console.log("Setting couch position to %s percent", value);
        const moveDifference = COUCH.position - value;
        const directionOpen = moveDifference < 0; // ex: asked for 70% while the couch is @ 60%, -10 means move open more.

        // round absolute value of percent, then multiply by full motion time to get seconds to move
        let duration = Math.round(COUCH.secondsToComplete * (Math.abs(moveDifference) / 100) * 100) / 100;

        // account for slop in the timing

        // since the couch opens slower
        if (directionOpen) {
            duration += COUCH.openingOffset * (duration / COUCH.secondsToComplete);
        }
        // to be sure it goes all the way, add 1 sec
        if (!value || value === 100) duration++

        // trigger move_couch.py with duration and direction
        cmd.get('python ../python/couch_move_test.py ' + duration + ' ' + directionOpen, function (err, str, stderr) {
            console.log(str);
        });
        // set new couch position
        COUCH.position = value;

    }
};
COUCH.setPosition(100);
setTimeout(() => {
COUCH.setPosition(1);
}, 10000);
