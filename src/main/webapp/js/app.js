$(document).ready(function() {
	$('.datetime').datetimepicker({
		language : 'en',
		pick12HourFormat : true
	});

	Appointment.listAppointments($('#appointmentList'));

	$(document).on('click', '.delete', function() {
		var appointment;
		var appId = $(this).parents('.appointment:first').data('id');
		
		appointment = Appointment.allAppointments[appId];
		appointment.remove(function(){
			Appointment.listAppointments($('#appointmentList'));			
		});
	});
	
	$(document).on('click', '.edit,.new', function() {
		var appointment;
		var appId = $(this).parents('.appointment:first').data('id');
		
		if(appId > 0){
			appointment = Appointment.allAppointments[appId];
		}else{
			appointment = new Appointment({
				title: 'default',
				start: 'today',
				end: 'tomorrow'
			});			
		}
		
		console.log(appointment);
		
		bootbox.dialog({
			message : appointment.getHtml('form'),
			title : "Appointment",
			closeButton: true,
			buttons : {
				save : {
					label : "Save",
					className : "btn-success",
					callback : function() {
						var windows = $(this);
						//$(this).find('form').submit();
						//var app = new Appointment($('.bootbox.modal').find('form').serializeObject());
						appointment.updateFrom($('.bootbox.modal').find('form').serializeObject());
						appointment.save(function() {
							console.log('SAVED SUCCESSFULL');
							Appointment.listAppointments($('#appointmentList'));
							bootbox.hideAll();
						});
						//appointment.save();
						return false;
					}
				}
			}
		});
	});
	/*
	 * $('#addAppointmentForm').submit(function(){
	 * console.log($('#addAppointmentForm').serialize()); var app = new
	 * Appointment($('#addAppointmentForm').serialize()); console.log(app);
	 * app.save(); });
	 */

	$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [ o[this.name] ];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
});