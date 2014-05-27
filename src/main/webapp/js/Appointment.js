var Appointment = function(data){
	var self = this;
	self.id = data['id'] || false;
	self.title = data['title'] || '';
	self.start = data['start'] || '';
	self.end = data['end'] || '';
	self.owner = data['owner'] || 'test';
	self.isPrivate = data['isPrivate'] || false;
	self.type = data['type'] || 'testType';
	
	self.getHtml = function(template){
		var templates = {
			'row': '<tr>\
				<td>'+self.title+'</td>\
				<td>'+self.start+'</td>\
				<td>'+self.end+'</td>\
				<td>'+self.type+'</td>\
				<td>'+self.users+'</td>\
			</tr>'
		};
		console.log("Get template for ", self, " with template ", template, templates[template]);
		return templates[template];
	};
	
	self.toObject = function(){
		var obj = {};
		if(self.id) obj.id = self.id;
		obj.title = self.title;
		obj.start = self.start;
		obj.end = self.end;
		obj.owner = self.owner;
		obj.isPrivate = self.isPrivate;
		obj.type = self.type;
		
		return obj;
	};
	
	self.save = function(successCB){
		//New Appointment
		//if(self.id > 0){
			$.ajax({
		        url: 'rest/appointments',
		        contentType: "application/json",
		        dataType: "json",
		        type: "POST",
		        data: JSON.stringify(self.toObject()),
		        success: successCB,
		        /*function(data) {
		        	console.log(data);
		        	
		            //clear input fields
		            $('#reg')[0].reset();

		            //mark success on the registration form
		            $('#formMsgs').append($('<span class="success">Appointment added</span>'));
		        },*/
		        error: function(error) {
		        	console.log(error);
		            if ((error.status == 409) || (error.status == 400)) {
		                //console.log("Validation error registering user!");
		            	//alert("error: "+error.responseText);
		                var errorMsg = $.parseJSON(error.responseText);
		                //var errorMsg = error.responseText;

		               $('.err').remove();
		                $.each(errorMsg, function(index, val) {
		                	var formEl = $('[name="' + index+'"]');
		                	formEl
		                		//.append('<span class="input-group-addon err"><span class="glyphicon glyphicon-remove form-control-feedback"></span></span>')
		                		.parent().addClass('has-error');
		                	$('<p class="invalid bg-danger err">' + val + '</p>').insertAfter(formEl.parent());
		                });
		            } else {
		                //console.log("error - unknown server issue");
		                $('#formMsgs').append($('<span class="invalid">Unknown server error</span>'));
		            }
		        }
		    });
		//}else{ // Update Appointment
			
		//}
	};
};

Appointment.listAppointments = function(tableToAppend, template){
	template = template || "row";
	$.ajax({
        url: "rest/appointments",
        cache: false,
        success: function(data) {
        	tableToAppend.children('tbody')
				.html('');
        	for(var d in data){
        		var app = new Appointment(data[d]);
        		console.log("Append Tempalte to", tableToAppend.children('tbody'));
        		tableToAppend.children('tbody')
        			.append(app.getHtml(template));
        	}
        },
        error: function(error) {
            console.log("error updating table -" + error.status);
        }
    });
};
