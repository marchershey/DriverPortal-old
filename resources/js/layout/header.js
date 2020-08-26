$("#header")
    .find("#mobile-menu-button")
    .on("click", function() {
        console.log("test");
        $("#sidebar").toggleClass("hidden");
        $("#user-panel").addClass("hidden");
        // $("#sidebar").animate({
        //     width: "toggle"
        // });
    });

$("#header")
    .find("#user-icon")
    .on("click", function() {
        $("#user-panel").toggleClass("hidden");
    });

$(document).on("focusout", "#user-icon", function() {
    setTimeout(function() {
        $("#user-panel").addClass("hidden");
    }, 100);
});
