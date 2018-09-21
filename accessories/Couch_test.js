var cmd = require('node-cmd');

var COUCH = {
    secondsToComplete: 6,
    openingOffset: 1,
    position: 0,
    setPosition: function (value) {

        // if postition is 100, or 0 go a bit longer to ensure closed/open fully
        // console.log("Setting couch position to %s percent", value);
        const moveDifference = COUCH.position - value;
        const directionOpen = moveDifference < 0; // ex: asked for 70% while the couch is @ 60%, -10 means move open more.

        // round absolute value of percent, then multiply by full motion time to get seconds to move
        let duration = Math.round(COUCH.secondsToComplete * (Math.abs(moveDifference) / 100) * 100) / 100;

        // TWEAKS FOR SLOP IN THE TIMING

        // Since the couch opens slower with your fat ass in it
        if (directionOpen) {
            duration += COUCH.openingOffset * (duration / COUCH.secondsToComplete);
        }

        // To be sure it goes all the way open/closed, add 1 sec. The couch's killswitch won't let the motor strain.
        if (!value || value === 100) duration++

        // trigger move_couch.py with duration and direction
        try {
            // console.log('attempting cmd ' + 'sudo python ./python/couch_move_test.py ' + duration + ' ' + directionOpen);
            cmd.get('sudo python ./python/left_couch_move.py ' + duration + ' ' + directionOpen, function (err, str, stderr) {
                if (err) console.error(err);
            });
        } catch (err) {
            console.error(err);
        }

        // set new couch position
        COUCH.position = value;

    }
};

//Open all the way
COUCH.setPosition(100);
setTimeout(() => {
    // after 10 sec, close it
    COUCH.setPosition(1);
}, 10000);
