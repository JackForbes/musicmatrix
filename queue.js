function newHtmlBlock(id) {
    return('<div class="block" data-id="' + id + '"></div>');
}

var WIDTH = 12;

var frequencies = [
    750,
    700,
    650,
    600,
    550,
    500,
    450,
    400,
    350,
    300,
    250,
    200
];

iterFrequency = 0.5;


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
        this.playBlock(ids[id]);
    }
}

// Init function that will generate all of the blocks
Queue.prototype.init = function() {
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
