function newHtmlBlock(id) {
    $('.container').append('<div class="block" data-id="' + id + '">BLOCK-' + id + '</div><br />');
}

var frequencies = [
    100,
    200,
    300,
    400,
    500,
    600,
];

iterFrequency = 0.5;


function Queue(n) {
    // Uses to lookup blocks
    this.blocks = {};

    // Holds the structure of the matrix
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


// Start function that will generate all of the blocks
Queue.prototype.init = function() {
    for (var id in this.blocks) {
        newHtmlBlock(id);
    }
}


// Start playing the sounds.  This will loop through the matrix and play active blocks
Queue.prototype.start = function() {

}


$(document).ready(function() {
    var queue = new Queue(2);
    queue.init();

    $('.block').click(function(e) {
        var block = queue.blocks[this.dataset['id']];
        block.toggleActive();

        $(this).toggleClass('active');

        block.play();
    });
});


// console.log(queue.matrix[0]);