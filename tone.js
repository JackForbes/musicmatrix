
// Example showing how to produce a tone using Web Audio API.
var oscillator;
var amp;

// Create an AudioCOntext and a JavaScriptNode.
function initAudio()
{
    if( context )
    {
        oscillator = context.createOscillator();
        fixOscillator(oscillator);
        oscillator.frequency.value = 440;
        amp = context.createGainNode();
        amp.gain.value = 0;
    
        // Connect ooscillator to amp and amp to the mixer of the context.
        // This is like connecting cables between jacks on a modular synth.
        oscillator.connect(amp);
        amp.connect(context.destination);
        oscillator.start(0);
    }
}

// Set the frequency of the oscillator and start it running.
function startTone( frequency )
{
    var now = context.currentTime;
    
    oscillator.frequency.setValueAtTime(frequency, now);
    
    // Ramp up the gain so we can hear the sound.
    // We can ramp smoothly to the desired value.
    // First we should cancel any previous scheduled events that might interfere.
    amp.gain.cancelScheduledValues(now);
    // Anchor beginning of ramp at current value.
    amp.gain.setValueAtTime(amp.gain.value, now);
    amp.gain.linearRampToValueAtTime(0.5, context.currentTime + 0.1);
    amp.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.5);
    
}

// init once the page has finished loading.
window.onload = initAudio;
