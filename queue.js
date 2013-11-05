function newHtmlBlock(id) {
    return('<div class="block" data-id="' + id + '"></div>');
}

var WIDTH = 12;
var BLOCK_SIZE = 34;
var BLOCK_MARGIN = 2;

var frequencies = [
    493.88,
    440,
    392,
    349.23,
    329.63,
    293.66,
    261.63,
    246.94,
    220,
    196,
    174.61,
    164.81
];

iterFrequency = 0.25;


function Queue(n) {
    this.n = n;
    this.blocks = {};
    this.matrix = {};

    // Initialize blocks and matrix variables
    for (var i = 0; i < n; i++) {
        this.matrix[i] = [];

        for (var j = 0; j < frequencies.length; j++) {
            var block = new Block(i, frequencies[j]);
            this.blocks[block.id] = block;
            this.matrix[i].push(block.id);

        }
    }
}

// Take in an id for a block and play it
Queue.prototype.playBlock = function(id, factor) {
    block = this.blocks[id];
    block.play(factor);
}

// Take in a set of ids to play
Queue.prototype.playBlocks = function(ids) {
    for (var id in ids) {
        this.playBlock(ids[id], 1/ids.length);
    }
}

// Init function that will generate all of the blocks
Queue.prototype.init = function() {
    $('.tracker').css('height', this.n * BLOCK_SIZE);

    for (var i in this.matrix) {
        var html = "";
        for (var j in this.matrix[i] ) {
           html += newHtmlBlock(this.matrix[i][j]);
        }

        $('.container').append("<div class='column'>" + html +"</div>");
    }
}


var stop = false;
// Start playing the sounds.  This will loop through the matrix and play active blocks
Queue.prototype.start = function() {
    var queue = this;
    var matrix = queue.matrix;

    var i = 0;
    window.setInterval(function() {
        i = (i + 1) % queue.n;

        var activeIds = []
        for (var id in matrix[i]) {
            var block = queue.blocks[matrix[i][id]];

            if (block.active) {
                activeIds.push(block.id);
            }
        }
        queue.playBlocks(activeIds);



        if (stop) {
            return;
        }
    }, iterFrequency * 1000);

    moveTracker(queue);

}

function moveTracker(queue) {
    $('.tracker').animate({
        left: queue.n * BLOCK_SIZE
    }, {
        easing: "linear",
        duration: queue.n * iterFrequency * 1000,
        complete: function(){
            $(this).css('left', 20);
            moveTracker(queue);
        }
    });
}

$(document).ready(function() {
    var queue = new Queue(WIDTH);
    queue.init();

    $('.block').click(function(e) {
        var block = queue.blocks[this.dataset['id']];
        block.toggleActive();

        $(this).toggleClass('active');
    });

    $('#stop').click(function() {
        stop = true;
    });

    $('#start').click(function() {
        queue.start();
    })

    queue.start();
});
