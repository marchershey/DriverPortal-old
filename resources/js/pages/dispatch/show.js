var timeout

$('.stop-input')
    .on('keypress', function(event) {
        var keycode = event.keyCode ? event.keyCode : event.which
        if (keycode == '13') {
            event.preventDefault()
        }
    })
    .on('input', function(el) {
        var $this = $(el.target)
        var $resultsContainer = $this.siblings('.stop-results-container')
        var $loadingIcon = $this.next('.stop-loading')

        stopSearchStart($this, $resultsContainer, $loadingIcon)
    })
    .on('focusin', function(el) {
        var $this = $(el.target)
        var $resultsContainer = $this.siblings('.stop-results-container')
        var $loadingIcon = $this.next('.stop-loading')

        stopSearchStart($this, $resultsContainer, $loadingIcon)
    })
    .on('focusout', function(el) {
        var $resultsContainer = $(el.target).siblings('.stop-results-container')
        $resultsContainer.slideUp()
    })

function stopSearchStart($this, $resultsContainer, $loadingIcon) {
    $loadingIcon.show()

    if ($this.val().length > 0 || $this.val() != '') {
        $this.next('.stop-loading')
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            getStops($this.val(), $resultsContainer, $this.next('.stop-loading'))
            stopSearchDone($this.next('.stop-loading'))
        }, 500)
    } else {
        stopSearchReset($resultsContainer, $this.next('.stop-loading'))
    }
}

function stopSearchReset($resultsContainer, $loadingIcon) {
    $loadingIcon.hide()
    $resultsContainer.find('.stop-no-results').slideUp()
    $resultsContainer.find('.stop-item-list').text('')
}

function stopSearchDone($loadingIcon) {
    $loadingIcon.hide()
}

function stopSearchNoResults($resultsContainer) {
    $resultsContainer.find('.stop-no-results').slideDown()
}

function getStops(string, $resultsContainer, $loadingIcon) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
    })
    $.ajax({
        type: 'POST',
        url: './warehouse/search',
        data: {
            string: string,
        },
        success: function(results) {
            stopSearchReset($resultsContainer, $loadingIcon)
            if (results < 1) {
                stopSearchNoResults($resultsContainer)
            } else {
                $.each(results, function(key, result) {
                    $('<a class="stop-item block border-b p-2 hover:bg-gray-100 cursor-pointer" data-id="' + result.id + '" data-name="' + result.name + '"><h1 class="text-sm font-semibold">' + result.name + '</h1><p class="stop-item-address text-xs uppercase truncate">' + result.address + ' ' + result.city + ' ' + result.state + ' ' + result.zip + '</p></a>').appendTo($resultsContainer.find('.stop-item-list'))
                })

                $resultsContainer.slideDown()
                $resultsContainer.find('.stop-item-list').slideDown()
            }
        },
        complete: function() {
            stopSearchDone($loadingIcon)
        },
    })
}

// -----

$('.stop-item-list').on('click', '.stop-item', function(event) {
    var $this = $(event.currentTarget)
    var id = $this.data('id')
    var name = $this.data('name')
    console.log($this.data())
    var $hiddenInput = $this
        .parent()
        .parent()
        .parent()
        .children('.stop')
    var $input = $hiddenInput.siblings('.stop-input')
    var $resultsContainer = $this.parent().parent()

    $hiddenInput.val(id)
    $input.val(name)
    $resultsContainer.slideUp()
})

$('.stop-type-selection')
    .change(function() {
        $(this)
            .find('option:selected')
            .each(function() {
                var stopDataType = $(this).text()
                var $stopDataGroup = $(this)
                    .parent()
                    .parent()
                    .parent()
                    .siblings('.stop-data-group')
                var $stopDataMiles = $stopDataGroup.find('.miles')
                var $stopDataDropHook = $stopDataGroup.find('.drophook')
                var $stopDataTrayCount = $stopDataGroup.find('.tray')
                var $stopDataRollOffCount = $stopDataGroup.find('.rolloff')
                var $stopDataPackOutCount = $stopDataGroup.find('.packout')
                var $stopDataDifferent = $stopDataGroup.find('.different')

                switch (stopDataType) {
                    case 'Drop & Hook':
                        $stopDataMiles
                            .slideDown()
                            .children('input')
                            .removeAttr('disabled')
                        $stopDataDropHook
                            .slideDown()
                            .children('input')
                            .removeAttr('disabled')

                        $stopDataTrayCount
                            .slideUp()
                            .children('input')
                            .attr('disabled', 'disabled')
                        $stopDataRollOffCount
                            .slideUp()
                            .children('input')
                            .attr('disabled', 'disabled')
                        $stopDataPackOutCount
                            .slideUp()
                            .children('input')
                            .attr('disabled', 'disabled')
                        $stopDataDifferent
                            .slideUp()
                            .children('input')
                            .attr('disabled', 'disabled')
                        break
                    case 'Roll Off':
                        $stopDataMiles
                            .slideDown()
                            .children('input')
                            .removeAttr('disabled')
                        $stopDataDropHook
                            .slideDown()
                            .children('input')
                            .removeAttr('disabled')
                        $stopDataTrayCount
                            .slideDown()
                            .children('input')
                            .removeAttr('disabled')

                        $stopDataRollOffCount
                            .slideUp()
                            .children('input')
                            .attr('disabled', 'disabled')
                        $stopDataPackOutCount
                            .slideUp()
                            .children('input')
                            .attr('disabled', 'disabled')
                        $stopDataDifferent
                            .slideUp()
                            .children('input')
                            .attr('disabled', 'disabled')

                        break
                    case 'Pack Out':
                        $stopDataMiles
                            .slideDown()
                            .children('input')
                            .removeAttr('disabled')
                        $stopDataDropHook
                            .slideDown()
                            .children('input')
                            .removeAttr('disabled')
                        $stopDataTrayCount
                            .slideDown()
                            .children('input')
                            .removeAttr('disabled')
                        $stopDataDifferent
                            .slideDown()
                            .children('input')
                            .removeAttr('disabled')

                        $stopDataRollOffCount.slideUp()
                        $stopDataPackOutCount.slideUp()
                        break
                    case '':
                        $stopDataMiles
                            .slideUp()
                            .children('input')
                            .attr('disabled', 'disabled')
                        $stopDataDropHook
                            .slideUp()
                            .children('input')
                            .attr('disabled', 'disabled')
                        $stopDataTrayCount
                            .slideUp()
                            .children('input')
                            .attr('disabled', 'disabled')
                        $stopDataRollOffCount
                            .slideUp()
                            .children('input')
                            .attr('disabled', 'disabled')
                        $stopDataPackOutCount
                            .slideUp()
                            .children('input')
                            .attr('disabled', 'disabled')
                        $stopDataDifferent
                            .slideUp()
                            .children('input')
                            .attr('disabled', 'disabled')
                        break
                }

                // $stopDataGroup.slideDown()
            })
    })
    .change()

$('.different-checkbox').click(function() {
    var $stopDataGroup = $(this)
        .parent()
        .parent()
        .parent()
    var $stopDataTrayCount = $stopDataGroup.find('.tray')
    var $stopDataRollOffCount = $stopDataGroup.find('.rolloff')
    var $stopDataPackOutCount = $stopDataGroup.find('.packout')

    if ($(this).is(':checked')) {
        $stopDataTrayCount
            .hide()
            .children('input')
            .attr('disabled', 'disabled')
        $stopDataRollOffCount
            .show()
            .children('input')
            .removeAttr('disabled')
        $stopDataPackOutCount
            .show()
            .children('input')
            .removeAttr('disabled')
    } else if ($(this).is(':not(:checked)')) {
        $stopDataTrayCount
            .show()
            .children('input')
            .removeAttr('disabled')
        $stopDataRollOffCount
            .hide()
            .children('input')
            .attr('disabled', 'disabled')
        $stopDataPackOutCount
            .hide()
            .children('input')
            .attr('disabled', 'disabled')
    }
})
