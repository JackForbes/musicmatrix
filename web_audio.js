
/*
 * Common tools for use with WebAudio.
 * 
 * This code was based on original code by Boris Smus
 * from: http://www.webaudioapi.com/
 *
 * with extensions and modifications by Phil Burk
 * from http://www.softsynth.com/webaudio/
 */
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function createAudioContext()
{
    var contextClass = (window.AudioContext ||
            window.webkitAudioContext ||
            window.mozAudioContext ||
            window.oAudioContext);
    if (contextClass) {
        return new contextClass();
    } else {
        alert("Sorry. WebAudio API not supported. Try using the Google Chrome or Safari browser.");
        return null;
    }
}

// Start off by initializing a new context.
var context =  createAudioContext();

console.log(context);

// shim layer with setTimeout fallback
window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame    || 
      window.oRequestAnimationFrame      || 
      window.msRequestAnimationFrame     || 
      function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();


// Add missing functions to make the oscillator compatible with the later standard.
function fixOscillator(osc)
{
    if (typeof osc.start == 'undefined') {
        osc.start = function(when) {
            osc.noteOn(when);
        }
    }
    if (typeof osc.stop == 'undefined') {
        osc.stop = function(when) {
            osc.noteOff(when);
        }
    }
}