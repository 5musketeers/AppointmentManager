$(document).ready(function() {
	
	//navigation
	$('.navLink').click(function(){
		$('.site').hide();
		$('#cont-'+$(this).attr('id')).show();
	});
	
	
	
	

	Appointment.list($('#appointmentList'));
	Researcher.list($('#researcherList'));
	ResearcherGroup.list($('#researchergroupList'));
	Project.list($('#projectList'));

	$(document).on('click', '.delete', function() {
		var className = $(this).data('type');
		var classInst = window[ucfirst(className)];
		
		var data;
		var dataId = $(this).parents('.'+className+':first').data('id');
		
		data = classInst.allData[dataId];
		data.remove(function(){
			classInst.list($('#'+className+'List'));
		});
	});
	
	 $('#calendar').fullCalendar({
        events: function(start, end, timezone, callback){
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
        			callback(events);
        		},
        		error: function(error) {
        			console.log("error updating table -" + error.status);
        		}
        	});
        },
		// eventSources : ["rest/appointments"],
        eventClick: function(event){
        	var data = Appointment.allData[event.id];
        	bootbox.dialog({
    			message : data.getHtml('form'),
    			title : "appointment",
    			closeButton: true,
    			buttons : {

					'delete' : {
						label : "delete",
						className : "btn-danger",
						callback : function() {
							data.updateFrom($('.bootbox.modal').find('form').serializeObject());
							bootbox.confirm("are you sure?", function(){
								data.remove(function(){
									location.reload();
								});								
							});
							return false;
						}
					},
					save : {
    					label : "Save",
    					className : "btn-success",
    					callback : function() {
    						data.updateFrom($('.bootbox.modal').find('form').serializeObject());
    						data.save(function() {
    							console.log('SAVED SUCCESSFULL');
    							bootbox.hideAll();
    		        			window.location.reload();
    						});
    						return false;
    					}
    				}
    			}
    		});
    		
    		$('.datetime').datetimepicker({
    			language : 'en',
    			pick24HourFormat : true
    		});
        }
    });
	
	$(document).on('click', '.edit,.new', function() {
		
		var className = $(this).data('type');
		var classInst = window[ucfirst(className)];
		
		var data;
		var dataId = $(this).parents('.'+className+':first').data('id');
		
		if(dataId > 0){
			data = classInst.allData[dataId];
		}else{
			data = new classInst({
				title: 'defaultxy',
				start: '06/14/2014 12:00',
				end: '06/15/2014 12:00'
			});			
		}
		
		
		bootbox.dialog({
			message : data.getHtml('form'),
			title : ucfirst(className),
			closeButton: true,
			buttons : {
				save : {
					label : "Save",
					className : "btn-success",
					callback : function() {
						data.updateFrom($('.bootbox.modal').find('form').serializeObject());
						data.save(function() {
							console.log('SAVED SUCCESSFULL');
							classInst.list($('#'+className+'List'));
							bootbox.hideAll();
		        			//window.location.reload();
						});
						return false;
					}
				}
			}
		});
		
		$('.datetime').datetimepicker({
			language : 'en',
			pick24HourFormat : true
		});
	});

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
	function ucfirst(str) {
		  str += '';
		  var f = str.charAt(0)
		    .toUpperCase();
		  return f + str.substr(1);
		}
});