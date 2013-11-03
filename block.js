function Block(order, freq) {
    this.id = guid();
    this.order = order;
    this.active = false;
    this.freq = freq;
}

// Play a sound for a given block
Block.prototype.play = function() {
    startTone(this.freq);
}

// Change when a block is active
Block.prototype.toggleActive = function() {
    this.active = !this.active;
}

// Used for generating random ids
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + s4() + s4();
}