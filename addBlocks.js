$(document).ready(function() {
    for ( var i = 0; i < 3; ++i ) {
        $("#matrix").append("<div class='column'></div>");
    }
    $(".column").each(function() {
        for ( var i = 0; i < 3; ++i ) {
            $(this).append("<div class='block'></div>")
        }
    });
})
