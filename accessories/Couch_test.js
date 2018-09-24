var cmd = require('node-cmd');

var COUCH = {
    secondsToComplete: 6,
    openingOffset: 1,
    position: 0,
    setPosition: function (value) {

        console.log("Setting couch position to %s percent", value);

        // move difference will determine direction and duration to move couch
        const moveDifference = COUCH.position - value;

        const percentagetoMove = Math.abs(moveDifference);

        // Direction to move. ex: asked for 70% while the couch is currently 60%, moveDiff is -10. Negative means move open more.
        const shouldOpen = moveDifference < 0; 

        // round absolute value of percent, then multiply by full motion time to get seconds to move
        let duration = Math.round(COUCH.secondsToComplete * (percentagetoMove / 100) * 100) / 100;

        // TWEAKS FOR SLOP IN THE TIMING

        // Since the couch opens slower with your fat ass in it, run open a little longer with offset
        if (shouldOpen) {
            duration += COUCH.openingOffset * (duration / COUCH.secondsToComplete);
        }

        // To be sure it goes all the way open/closed, add 1 sec. The couch's killswitch won't let the motor strain.
        if (!value || value === 100) duration++

        // Trigger move_couch.py with duration and direction
        try {
            cmd.get('sudo python ./python/couch_move_test.py ' + duration + ' ' + shouldOpen, function (err, str, stderr) {
                if (err) console.error(err);
            });
        } catch (err) {
            console.error(err);
        }

        // Set new COUCH position
        COUCH.position = value;

    }
};

//Open all the way
COUCH.setPosition(100);

// Send close halfway signal after 10 secs
setTimeout(() => {
    COUCH.setPosition(50);
}, 10000);


