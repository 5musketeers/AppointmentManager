$(document).ready(function(){
	$('.datetime').datetimepicker({
        language: 'en',
        pick12HourFormat: true
    });
	
	Appointment.listAppointments($('#listAppointments'));
	
	$('#addAppointment').click(function(){
		console.log($('#addAppointmentForm').serialize());
		var app = new Appointment($('#addAppointmentForm').serialize());
		console.log(app);
		app.save();
	});
	/*$('#addAppointmentForm').submit(function(){
		console.log($('#addAppointmentForm').serialize());
		var app = new Appointment($('#addAppointmentForm').serialize());
		console.log(app);
		app.save();
	});*/
	
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
});