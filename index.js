var buttons = require('sdk/ui/button/action');
var clipboard = require("sdk/clipboard");
var utils = require('sdk/window/utils');
var notifications = require("sdk/notifications");
var preferences = require("sdk/simple-prefs").prefs;
var z85 = require("base85");

var button = buttons.ActionButton({
    id: "pwgen",
    label: "Password Generator",
    icon: {
        "18": "./addon18.png", // toolbar icon non HiDPI
        "32": "./addon32.png", // menu panel icon non HiDPI
        "36": "./addon36.png", // toolbar icon HiDPI
        "64": "./addon64.png"  // menu panel icon HiDPI
    },
    onClick: handleClick
});

function handleClick(state) {
    var len = preferences.pwLength;
    clipboard.set(genPass(len));
    notifications.notify({
      title: "Clipboard set to random string"
    });
}

function genPass(len) {
    if (!isAN(len)) {
        return "";
    }
    var buffer = new Uint32Array(Math.ceil(len / 5) * 4);
    var browserWindow = utils.getMostRecentBrowserWindow();
    var window = browserWindow.content; // `window` object for the current webpage
    window.crypto.getRandomValues(buffer);
    return z85.base85Encode(buffer).substring(0, len);
}

function isAN(value) {
    return (value instanceof Number||typeof value === 'number') && !isNaN(value);
}

exports.genPass = genPass;
