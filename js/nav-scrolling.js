var active = 0;

$(window).scroll(function() {
    var scroll_position = $(window).scrollTop();
    var window_height = $(window).height();

    var about_height = $("#about").offset().top;
    var honors_height = $("#honors").offset().top;
    var research_height = $("#research").offset().top;
    var skills_height = $("#skills").offset().top;
    var contact_height = $("#contact").offset().top;

    var heights = [
        about_height,
        honors_height,
        research_height,
        skills_height,
        contact_height
    ];

    active =
        heights.filter(function(x) {
            return x <= scroll_position + 0.5 * window_height;
        }).length - 1;

    $(".slide-title").each(function(index) {
        if (index != active)
            $(this)
                .addClass("title-fade-out")
                .removeClass("title-fade-in");
        else
            $(this)
                .addClass("title-fade-in")
                .removeClass("title-fade-out");
    });

    $(".list-group-item").each(function(index) {
        if (index != active && index != active + 5)
            $(this).removeClass("list-group-item-active");
        else $(this).addClass("list-group-item-active");
    });
});

$(window).scroll(function() {
    /* Check the location of each desired element */
    $(".hideme").each(function(i) {
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it in */
        if (bottom_of_window > bottom_of_object) {
            $(this).addClass("appear");
        }
    });

    $(".expand").each(function(i) {
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        console.log(bottom_of_object, bottom_of_window);

        /* If the object is completely visible in the window, fade it in */
        if (bottom_of_window > bottom_of_object) {
            $(this).removeClass("expand");
        }
    });
});

$(function() {
    $("#about-img").addClass("appear");
});
