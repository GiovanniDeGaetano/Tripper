$(function() {
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
        let startDate = picker.startDate.format('DD-MM-YYYY');
        let endDate = picker.endDate.format('DD-MM-YYYY');
    });
});