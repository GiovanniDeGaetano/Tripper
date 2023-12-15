/**
 * Represents the start date for date range selection.
 * @type {Date}
 */
let startDate = new Date();

/**
 * Represents the end date for date range selection.
 * @type {Date}
 */
let endDate = new Date();

/**
 * Sets the selected dates in local storage.
 */
localStorage.setItem('selectedDates', JSON.stringify({ startDate, endDate }));

/**
 * jQuery document ready function to handle actions on page load.
 */
$(function() {
    /**
     * Event handler for the 'travel' button click.
     * Retrieves the destination city from the input field and stores it in local storage.
     */
    $('#travel').click(function () {
        const city = $('#destination').val();
        localStorage.setItem('destination', JSON.stringify({ city: city }));
    });

    /**
     * Initializes the date range picker with specified options.
     * @type {Object}
     */
    $('#dateRange').daterangepicker({
        opens: 'center', // Controls the calendar's opening direction
        autoApply: true, // Automatically applies selected dates to the input field
        locale: {
            format: 'DD-MM-YYYY', // Date format
            separator: ' - ', // Separator between selected dates in the input field
            customRangeLabel: 'Custom Range',
        },
        minDate: new Date(),
        showDropdowns: true,
    }).on('apply.daterangepicker', function(ev, picker) {
        /**
         * Event handler for applying date range selection.
         * Updates the start and end dates and stores them in local storage.
         * @param {Event} ev - The apply event.
         * @param {Object} picker - The date picker object.
         */
        startDate = picker.startDate.format('MM-DD-YYYY');
        endDate = picker.endDate.format('MM-DD-YYYY');
        localStorage.setItem('selectedDates', JSON.stringify({ startDate, endDate }));
    });
});
