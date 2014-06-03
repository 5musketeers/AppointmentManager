var Researcher = function(data){
	data = data || {};
	var self = this;
	
	self.getHtml = function(template,data){
		data = data || {};
		var templates = {
				'row': '<tr class="researcher" data-id="'+self.id+'">\
					<td>'+self.name+'</td>\
					<td>'+self.email+'</td>\
					<td><input type="button" class="edit btn" value="Edit" data-type="researcher" /> <input type="button" class="delete btn btn-danger" value="Delete" data-type="researcher" /></td>\
				</tr>',
				'option': '<option value="'+self.id+'"'+((data.selected)?' selected="selected"':'')+'>'+self.name+'</option>',
				'form': '<form name="reg" data-ajax="false" role="form" id="researcherForm"  data-id="'+self.id+'">\
				            <fieldset>\
						        <legend>appointment options:</legend>\
						        <div class="form-group">\
						            <label for="name">Name:</label>\
						            <input class="form-control" type="text" name="name" id="name" value="'+self.name+'" placeholder="Name" required autofocus/>\
						        </div>\
					            <div class="form-group">\
						            <label for="email">Email:</label>\
						            <input class="form-control" type="email" name="email" id="email" value="'+self.email+'" placeholder="Email" required/>\
					            </div>\
					            <div class="form-group">\
						            <label for="password">new Password:</label>\
						            <input class="form-control" type="password" name="password" id="password" value="" placeholder="Password"/>\
					            </div>\
						        <div id="formMsgs"></div>\
						    </fieldset>\
						</form>'
		};
		//console.log("Get template for ", self, " with template ", template, templates[template]);
		
		return templates[template];
	};

	self.toObject = function(){
		var obj = {};
		if(self.id) obj.id = self.id;
		obj.name = self.name;
		obj.email = self.email;
		obj.password = self.password;
		
		return obj;
	};
	
	self.updateFrom = function(data){
		if(data['password'] == '') data['password'] != self.password;		
		self.id = data['id'] || self.id || false;
		self.name = data['name'] || self.name || '';
		self.email = data['email'] || self.email || '';
		self.password = data['password'] || self.password || '';
		
		return self;
	};

	self.save = function(successCB){
		//New Appointment
		$.ajax({
	        url: 'rest/researcher',
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
		        url: 'rest/researcher/remove/'+self.id,
		        contentType: "application/json",
		        dataType: "json",
		        type: "POST",
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
Researcher.allData = {};

Researcher.getHtml = function(template,subTemplate, dataFilter){
	dataFilter = dataFilter || function(){return {};};
	var html = '';
	for(var resId in Researcher.allData){
		var researcher = Researcher.allData[resId];
		html += researcher.getHtml(subTemplate, dataFilter(researcher));
	}
	var templates = {
			'empty': html,
			'select': '<select name="researcher">'+html+'</select>'
	};
	
	return templates[template];
};

Researcher.list = function(tableToAppend, template){
	template = template || "row";
	$.ajax({
        url: "rest/researcher",
        cache: false,
        success: function(data) {
        	tableToAppend.children('tbody')
				.html('');
        	Researcher.allData = {};
        	for(var d in data){
        		var app = new Researcher(data[d]);
        		Researcher.allData[app.id] = app;
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
