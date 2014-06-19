var Appointment = function(data){
	data = data || {};
	var self = this;
		
	self.getHtml = function(template){

		var templates = {
				'row': '<tr class="appointment" data-id="'+self.id+'">\
					<td>'+self.title+'</td>\
					<td>'+self.start+'</td>\
					<td>'+self.end+'</td>\
					<td>'+self.type+'</td>\
					<td>'+self.users+'</td>\
					<td>'+self.location+'</td>\
					<td><input type="button" class="edit btn" data-type="appointment" value="Edit" /> <input type="button" class="delete btn btn-danger" value="Delete" data-type="appointment" /></td>\
				</tr>',
				'form': '<form name="reg" data-ajax="false" role="form" id="appointmentForm"  data-id="'+self.id+'">\
				            <fieldset>\
						        <legend>appointment options:</legend>\
						        <div class="form-group">\
						            <label for="title">Title:</label>\
						            <input class="form-control" type="text" name="title" id="title" value="'+self.title+'" placeholder="Title" required autofocus/>\
						        </div>\
					            <div class="form-group">\
						            <label for="location">Location:</label>\
						            <input class="form-control" type="text" name="location" id="location" value="'+self.location+'" placeholder="Title" required />\
					            </div>\
						        <div class="form-group">\
						            <label for="start">Start Time:</label>\
						            <div class="input-group date datetime"  data-date-format="MM/DD/YYYY hh:mm">\
						                <input class="form-control" value="'+self.start+'" name="start" id="start" placeholder="Start Time" required/>\
						            	<span class="input-group-addon">\
						            		<span class="glyphicon glyphicon-calendar"></span>\
						        		</span>\
						       		</div>\
						        </div>\
						        <div class="form-group">\
						            <label for="start">End Time:</label>\
						            <div class="input-group date datetime"  data-date-format="MM/DD/YYYY hh:mm">\
						            	<input class="form-control" value="'+self.end+'" name="end" id="end" placeholder="End Time" required/>\
						        		<span class="input-group-addon">\
						            		<span class="glyphicon glyphicon-calendar"></span>\
						        		</span>\
						        	</div>\
						        </div>\
						        <div class="form-group">\
						            <label for="isPrivate">Is Private ?:</label>\
						            <input class="" type="checkbox" name="isPrivate" id="isPrivate"'+((self.isPrivate == "on")?' checked':'')+' />\
						        </div>\
						        <div id="formMsgs"></div>\
						    </fieldset>\
						</form>'
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
		obj.location = self.location;
		
		return obj;
	};
	
	self.updateFrom = function(data){
		
		self.id = data['id'] || self.id || false;
		self.title = data['title'] || self.title || '';
		self.start = data['start'] || self.start || '';
		if (self.start.length == 10) {intToDate(self.start,"start");}
		self.end = data['end'] || self.end || '';
		if (self.end.length == 10) {intToDate(self.end,"end");}
		self.owner = data['owner'] || self.owner || 'test';
		self.isPrivate = data['isPrivate'] || self.isPrivate || false;
		self.type = data['type'] || self.type || 'testType';
		self.location = data['location'] || self.location || 'testLoc';
		
		return self;
	};
	
	function intToDate(int,startend) {
		var date = new Date(int*1000);
		var month = date.getMonth(); if (month<10) {month = "0"+month;}
		var day = date.getDate(); if (day<10) {day = "0"+day;}
		var hour = date.getHours();  if (hour<10) {hour = "0"+hour;}
		var minute = date.getMinutes();  if (minute<10) {minute = "0"+minute;}
		if (startend == "start") {self.start = month+"/"+day+"/"+date.getFullYear()+" "+hour+":"+minute;}
		if (startend == "end") {self.end = month+"/"+day+"/"+date.getFullYear()+" "+hour+":"+minute;}
	}

	self.save = function(successCB){
		//New Appointment
		$.ajax({
	        url: 'rest/appointments',
	        contentType: "application/json",
	        dataType: "json",
	        type: "POST",
	        data: JSON.stringify(self.toObject()),
	        success: successCB,
	        error: function(error) {
	        	console.log(error);
	            if ((error.status == 409) || (error.status == 400)) {
	                var errorMsg = $.parseJSON(error.responseText);

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
	};
	self.remove = function(successCB){
			$.ajax({
		        url: 'rest/appointments/'+self.id,
		        contentType: "application/json",
		        dataType: "json",
		        type: "DELETE",
		        data: JSON.stringify(self.toObject()),
		        success: successCB,
		        error: function(error) {
		        	console.log(error);
		        	alert('DeleteError:'+error);
		        }
		    });
	};
	self.updateFrom(data);
};
Appointment.allData = {};
	

Appointment.list = function(tableToAppend, template){
	template = template || "row";
	$.ajax({
        url: "rest/appointments",
        cache: false,
        success: function(data) {
        	tableToAppend.children('tbody')
				.html('');
        	Appointment.allData = {};
        	for(var d in data){
        		var app = new Appointment(data[d]);
        		Appointment.allData[app.id] = app;
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

Appointment.calendar = function(){
	$.ajax({
		url: "rest/appointments",
		cache: false,
		success: function(data) {
			var events = [];
			var id = 1;
			for(var d in data){
				var app = new Appointment(data[d]);
				
				events.push({
					'id': app.id,
					'title': app.title,
					'start': app.start,
					'end': app.end
				});
				id++;
			}
			console.log("update");
			$('#calendar').fullCalendar("events", events);
			/*$('#calendar').fullCalendar({
		        events: events
			});*/
			
		},
		error: function(error) {
			console.log("error updating table -" + error.status);
		}
	});
};

