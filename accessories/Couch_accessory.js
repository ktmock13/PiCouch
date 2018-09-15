// Couch accessory

var Accessory = require('../').Accessory;
var Service = require('../').Service;
var Characteristic = require('../').Characteristic;
var uuid = require('../').uuid;
var cmd = require('node-cmd');

// here's a fake hardware device that we'll expose to HomeKit
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
            duration += COUCH.openingOffset * (duration/COUCH.secondsToComplete);
        }
        // to be sure it goes all the way, add 1 sec
        if(!value || value === 100) duration++

        // trigger move_couch.py with duration and direction
        try {
            console.log('attempting cmd ' + 'sudo python /home/pi/HAP-NodeJS/python/left_couch_move.py ' + duration + ' ' + directionOpen);
            cmd.run('sudo python /home/pi/HAP-NodeJS/python/left_couch_move.py ' + duration + ' ' + directionOpen);
        } catch(err) {
            console.error(err);
        }

        // set new couch position
        COUCH.position = value;

    },
    identify: function () {
        //put your code here to identify the fan
        console.log("Couch Identified!");
    }
}

// This is the Accessory that we'll return to HAP-NodeJS that represents our couch.
var couch = exports.accessory = new Accessory('Couch', uuid.generate('hap-nodejs:accessories:Couch'));

// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
couch.username = "1A:2B:3C:4D:5F:FF";
couch.pincode = "031-45-159";

// set some basic properties (these values are arbitrary and setting them is optional)
couch
    .getService(Service.AccessoryInformation)
    .setCharacteristic(Characteristic.Manufacturer, "TheRobotFactory")

// listen for the "identify" event for this Accessory
couch.on('identify', function (paired, callback) {
    COUCH.identify();
    callback(); // success
});


// Add the actual Window Service and listen for change events from iOS.
// We can see the complete list of Services and Characteristics in `lib/gen/HomeKitTypes.js`
couch
    .addService(Service.Window, "Couch") 
    .getCharacteristic(Characteristic.TargetPosition)
    .on('set', function (value, callback) {
        COUCH.setPosition(value);
        callback(); // Couch is synchronous - this value has been successfully set

        //tell Homekit about the new current position
        couch
            .getService(Service.Window)
            .setCharacteristic(Characteristic.CurrentPosition, value)
    });

