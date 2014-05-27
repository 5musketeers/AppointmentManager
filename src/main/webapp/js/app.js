$(document).ready(function(){
	$('.datetime').datetimepicker({
        language: 'en',
        pick12HourFormat: true
    });
	
	Appointment.listAppointments($('#appointmentList'));
	
	$('#addAppointment').click(function(ev){
		ev.preventDefault();
		console.log($('#addAppointmentForm').serializeObject());
		var app = new Appointment($('#addAppointmentForm').serializeObject());
		console.log(app);
		app.save(function(){
			console.log('SAVED SUCCESSFULL');
			Appointment.listAppointments($('#appointmentList'));			
		});
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