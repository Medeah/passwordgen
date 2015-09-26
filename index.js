var buttons = require('sdk/ui/button/action');
var clipboard = require("sdk/clipboard");
var utils = require('sdk/window/utils');
var preferences = require("sdk/simple-prefs").prefs;

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
    var len = preferences["pwLength"];
    var buffer = new Uint32Array(Math.ceil(len / 5) * 4);
    var browserWindow = utils.getMostRecentBrowserWindow();
    var window = browserWindow.content; // `window` object for the current webpage
    window.crypto.getRandomValues(buffer);
    clipboard.set(base85Encode(buffer).substring(0, len));
}

// https://github.com/noseglid/base85
function base85Encode(buffer)
{
  var padding = (buffer.length % 4 === 0) ? 0 : 4 - buffer.length % 4;

  var result = '';
  for (var i = 0; i < buffer.length; i += 4) {

    /* 32 bit number of the current 4 bytes (padded with 0 as necessary) */
    var num = ((buffer[i] << 24) >>> 0) + // Shift right to force unsigned number
        (((i + 1 > buffer.length ? 0 : buffer[i + 1]) << 16) >>> 0) +
        (((i + 2 > buffer.length ? 0 : buffer[i + 2]) <<  8) >>> 0) +
        (((i + 3 > buffer.length ? 0 : buffer[i + 3]) <<  0) >>> 0);

    /* Create 5 characters from '!' to 'u' alphabet */
    var block = [];
    for (var j = 0; j < 5; ++j) {
      block.unshift(enctable[num % 85]);
      num = Math.floor(num / 85);
    }

    /* And append them to the result */
    result += block.join('');
  }

  return result.substring(0, result.length - padding);
}

var enctable = {
    0:  '0',
    1:  '1',
    2:  '2',
    3:  '3',
    4:  '4',
    5:  '5',
    6:  '6',
    7:  '7',
    8:  '8',
    9:  '9',
    10: 'a',
    11: 'b',
    12: 'c',
    13: 'd',
    14: 'e',
    15: 'f',
    16: 'g',
    17: 'h',
    18: 'i',
    19: 'j',
    20: 'k',
    21: 'l',
    22: 'm',
    23: 'n',
    24: 'o',
    25: 'p',
    26: 'q',
    27: 'r',
    28: 's',
    29: 't',
    30: 'u',
    31: 'v',
    32: 'w',
    33: 'x',
    34: 'y',
    35: 'z',
    36: 'A',
    37: 'B',
    38: 'C',
    39: 'D',
    40: 'E',
    41: 'F',
    42: 'G',
    43: 'H',
    44: 'I',
    45: 'J',
    46: 'K',
    47: 'L',
    48: 'M',
    49: 'N',
    50: 'O',
    51: 'P',
    52: 'Q',
    53: 'R',
    54: 'S',
    55: 'T',
    56: 'U',
    57: 'V',
    58: 'W',
    59: 'X',
    60: 'Y',
    61: 'Z',
    62: '.',
    63: '-',
    64: ':',
    65: '+',
    66: '=',
    67: '^',
    68: '!',
    69: '/',
    70: '*',
    71: '?',
    72: '&',
    73: '<',
    74: '>',
    75: '(',
    76: ')',
    77: '[',
    78: ']',
    79: '{',
    80: '}',
    81: '@',
    82: '%',
    83: '$',
    84: '#'
};
