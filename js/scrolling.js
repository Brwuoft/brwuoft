var active = 0;

$(window).scroll(function() {
    console.log("JS is running");
    var scroll_position = $(window).scrollTop();
    var winHeight = window.innerHeight;
    console.log(scroll_position);
    console.log(winHeight);

    var activeSlide = Math.floor(scroll_position / winHeight);

    if (active != activeSlide) {
        active = activeSlide;
    }

    console.log("active is ", active);

    $(".slide").each(function(index) {
        console.log(index);
        if (index != active)
            $(this)
                .addClass("fade-out")
                .removeClass("fade-in");
        else
            $(this)
                .addClass("fade-in")
                .removeClass("fade-out");
        console.log($(this).attr("id"));
        console.log($(this).attr("class"));
    });
});
