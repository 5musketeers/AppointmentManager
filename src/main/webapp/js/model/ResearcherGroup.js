var ResearcherGroup = function(data){
	data = data || {};
	var self = this;
	
	self.getHtml = function(template){
		var templates = {
				'row': '<tr class="researchergroup" data-id="'+self.id+'">\
					<td>'+self.name+'</td>\
					<td><input type="button" class="edit btn" value="Edit" data-type="researchergroup" /> <input type="button" class="delete btn btn-danger" value="Delete" data-type="researchergroup" /></td>\
				</tr>',
				'form': '<form name="reg" data-ajax="false" role="form" id="researcherGroupForm"  data-id="'+self.id+'">\
				            <fieldset>\
						        <legend>appointment options:</legend>\
						        <div class="form-group">\
						            <label for="name">Name:</label>\
						            <input class="form-control" type="text" name="name" id="name" value="'+self.name+'" placeholder="Name" required autofocus/>\
						        </div>\
					            <div class="form-group">\
						            <label for="name">Members:</label>\
						            <select name="members" size="3" multiple>\
						            	'+Researcher.getHtml('empty', 'option', function(researcher){
						            		return {
						            			selected: (typeof self.membersByIds[researcher.id] !== 'undefined')
						            		};
						            	})+'\
						            </select>\
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
		obj.members = [];
		console.log(self.members);
		console.log(Researcher.allData);
		for(var i in self.members){
			var index = self.members[i];
			obj.members.push(Researcher.allData[index].toObject());
		}
		console.log(obj);
		
		
		return obj;
	};
	
	self.updateFrom = function(data){
		if(data['password'] == '') data['password'] != self.password;		
		self.id = data['id'] || self.id || false;
		self.name = data['name'] || self.name || '';
		self.members = data['members'] || self.members || [];
		
		self.membersByIds = {};
		for(var i in self.members){
			var id = self.members[i].id;
			self.membersByIds[id] = self.members[i];
		}
		
		return self;
	};

	self.save = function(successCB){
		//New Appointment
		$.ajax({
	        url: 'rest/researchergroup',
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
		        url: 'rest/researchergroup/remove/'+self.id,
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
ResearcherGroup.allData = {};
	

ResearcherGroup.list = function(tableToAppend, template){
	template = template || "row";
	$.ajax({
        url: "rest/researchergroup",
        cache: false,
        success: function(data) {
        	tableToAppend.children('tbody')
				.html('');
        	ResearcherGroup.allData = {};
        	for(var d in data){
        		var app = new ResearcherGroup(data[d]);
        		ResearcherGroup.allData[app.id] = app;
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

Researchergroup = ResearcherGroup;