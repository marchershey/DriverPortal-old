var timeout;

$(".stop-input")
    .on("keypress", function(event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode == "13") {
            event.preventDefault();
        }
    })
    .on("input", function(el) {
        var $this = $(el.target);
        var $resultsContainer = $this.parent().next(".stop-results-container");
        var $loadingIcon = $this.next(".stop-loading");

        stopSearchStart($this, $resultsContainer, $loadingIcon);
    })
    .on("focusin", function(el) {
        var $resultsContainer = $(el.target)
            .parent()
            .next(".stop-results-container");

        $resultsContainer.slideDown();
    });

function stopSearchStart($this, $resultsContainer, $loadingIcon) {
    $loadingIcon.show();

    if ($this.val().length > 0 || $this.val() != "") {
        $this.next(".stop-loading");
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            getStops(
                $this.val(),
                $resultsContainer,
                $this.next(".stop-loading")
            );
            stopSearchDone($this.next(".stop-loading"));
        }, 500);
    } else {
        stopSearchReset($resultsContainer, $this.next(".stop-loading"));
    }
}

function stopSearchReset($resultsContainer, $loadingIcon) {
    $loadingIcon.hide();
    $resultsContainer.find(".stop-no-results").slideUp();
    $resultsContainer.find(".stop-item-list").text("");
}

function stopSearchDone($loadingIcon) {
    $loadingIcon.hide();
}

function stopSearchNoResults($resultsContainer) {
    $resultsContainer.find(".stop-no-results").slideDown();
}

function getStops(string, $resultsContainer, $loadingIcon) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });
    $.ajax({
        type: "POST",
        url: "./warehouse/search",
        data: {
            string: string
        },
        success: function(results) {
            stopSearchReset($resultsContainer, $loadingIcon);
            if (results < 1) {
                stopSearchNoResults($resultsContainer);
            } else {
                $.each(results, function(key, result) {
                    $(
                        '<a class="stop-item block border-b p-2 hover:bg-gray-100 cursor-pointer" data-id="' +
                            result.id +
                            '" data-name="' +
                            result.name +
                            '"><h1 class="text-sm font-semibold">' +
                            result.name +
                            '</h1><p class="stop-item-address text-xs uppercase truncate">' +
                            result.address +
                            " " +
                            result.city +
                            " " +
                            result.state +
                            " " +
                            result.zip +
                            "</p></a>"
                    ).appendTo($resultsContainer.find(".stop-item-list"));
                });

                $resultsContainer.slideDown();
                $resultsContainer.find(".stop-item-list").slideDown();
            }
        },
        complete: function() {
            stopSearchDone($loadingIcon);
        }
    });
}

// -----

$(".stop-item-list").on("click", ".stop-item", function(event) {
    var $this = $(event.currentTarget);
    var id = $this[0].dataset["id"];
    var name = $this[0].dataset["name"];
    var $hiddenInput = $this
        .parent()
        .parent()
        .prev()
        .children(".stop");
    var $input = $hiddenInput.next(".stop-input");
    var $resultsContainer = $this.parent().parent();

    $hiddenInput.val(id);
    $input.val(name);
    $resultsContainer.slideUp();
});
