let startDate = new Date(),endDate = new Date();
localStorage.setItem('selectedDates', JSON.stringify({ startDate, endDate }));

$(function() {
    $('#travel').click(function (){
        const city = $('#destination').val();
        localStorage.setItem('destination',city);
    });
    // Inizializza il datepicker con l'opzione range
    $('#dateRange').daterangepicker({
        opens: 'left', // Controlla la direzione dell'apertura del calendario
        autoApply: true, // Applica automaticamente le date selezionate al campo
        locale: {
            format: 'DD-MM-YYYY', // Formato della data
            separator: ' - ', // Separatore tra le date nel campo
            customRangeLabel: 'Intervallo personalizzato',
        },
        minDate: new Date(),
        showDropdowns: true
    }).on('apply.daterangepicker',function(ev, picker){
        startDate = picker.startDate.format('MM-DD-YYYY');
        endDate = picker.endDate.format('MM-DD-YYYY');
        localStorage.setItem('selectedDates', JSON.stringify({ startDate, endDate }));
    });
});