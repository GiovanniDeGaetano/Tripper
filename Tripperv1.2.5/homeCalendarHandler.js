$("#datepicker").datepicker({
    minDate: 0, // Sets the minimum selectable date to today's date
    numberOfMonths: [1,2], // Displays two months in the datepicker
    beforeShowDay: function(date) {  // Customizes the appearance of specific dates
        var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#startDate").val()); // Converts the start date to a JavaScript Date object
        var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#endDate").val()); // Converts the end date to a JavaScript Date object

        // Checks if the current date is equal to the start date or if it is between the start date and end date
        if (date1 && (date.getTime() === date1.getTime() || (date2 && date >= date1 && date <= date2))) {
            // Applies a CSS class "dp-highlight" to the current date, making it visually distinct
            return [true, "dp-highlight"];
        } else {
            // No special highlighting for the current date
            return [true, ""];
        }
    },
    onSelect: function(dateText, inst) { // Handles date selection events
        var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#startDate").val()); // Converts the start date to a JavaScript Date object
        var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#endDate").val()); // Converts the end date to a JavaScript Date object
        var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText); // Converts the selected date to a JavaScript Date object

        // If no start date is set or an end date is set, update the start date and clear the end date
        if (!date1 || date2) {
            $("#startDate").val(dateText); // Set the start date to the selected date
            $("#endDate").val(""); // Clear the end date
            $(this).datepicker(); // Refresh the datepicker with the updated values
        } else if (selectedDate < date1) { // If the selected date is earlier than the start date
            $("#endDate").val($("#startDate").val()); // Set the end date to the start date
            $("#startDate").val(dateText); // Set the start date to the selected date
            $(this).datepicker(); // Refresh the datepicker with the updated values
        } else { // If the selected date is later than or equal to the start date
            $("#endDate").val(dateText); // Set the end date to the selected date
            $(this).datepicker(); // Refresh the datepicker with the updated values
        }
    }
});


