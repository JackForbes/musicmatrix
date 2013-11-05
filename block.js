function Block(order, freq) {
    this.id = guid();
    this.order = order;
    this.active = false;
    this.freq = freq;

    this.initAudio(freq);
}

// Initialize oscillator and amp objects, attaching them to the conext variable
Block.prototype.initAudio = function(frequency) {
    oscillator = context.createOscillator();
    fixOscillator(oscillator);
    oscillator.frequency.value = frequency;
    amp = context.createGainNode();
    amp.gain.value = 0;

    // Connect ooscillator to amp and amp to the mixer of the context.
    // This is like connecting cables between jacks on a modular synth.
    oscillator.connect(amp);
    amp.connect(context.destination);
    oscillator.start(0)

    this.oscillator = oscillator;
    this.amp = amp;
    this.amp.gain.linearRampToValueAtTime(0.0, context.currentTime + 0);
}

// Play a sound for a given block
Block.prototype.play = function(factor) {
    this.amp.gain.linearRampToValueAtTime(0.5*factor, context.currentTime + 0.1);
    this.amp.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.5);
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