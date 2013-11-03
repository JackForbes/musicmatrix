function newHtmlBlock(id) {
    $('.container').append('<div class="block" data-id="' + id + '"></div>');
}

var frequencies = [
    100,
    200,
    300,
    400,
    500,
    600,
];

iterFrequency = 1;


function Queue(n) {
    this.n = n;
    this.blocks = {};
    this.matrix = {}

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
Queue.prototype.playBlock = function(id) {
    block = this.blocks[id];
    block.play();
}

// Take in a set of ids to play
Queue.prototype.playBlocks = function(ids) {
    for (var id in ids) {
        console.log(ids[id]);
        this.playBlock(ids[id]);
    }
}

// Init function that will generate all of the blocks
Queue.prototype.init = function() {
    current = 0;
    console.log(this.n);
    for (var id in this.blocks) {
        newHtmlBlock(id);
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
}


$(document).ready(function() {
    var queue = new Queue(1);
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
