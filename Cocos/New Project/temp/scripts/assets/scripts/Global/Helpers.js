cc._RFpush(module, 'c8640M3ozRErrV/Go3uTknt', 'Helpers');
// scripts\Global\Helpers.js

// Returns a random integer between min (included) and max (excluded)
"use strict";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  getRandomInt: getRandomInt
};

cc._RFpop();