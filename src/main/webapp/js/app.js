$(document).ready(function() {
	
	//navigation
	$('.navLink').click(function(){
		$('.site').hide();
		$('#cont-'+$(this).attr('id')).show();
	});
	
	
	
	$('.datetime').datetimepicker({
		language : 'en',
		pick12HourFormat : true
	});

	Appointment.list($('#appointmentList'));
	Researcher.list($('#researcherList'));
	ResearcherGroup.list($('#researchergroupList'));

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
	
	$(document).on('click', '.edit,.new', function() {
		var className = $(this).data('type');
		var classInst = window[ucfirst(className)];
		
		var data;
		var dataId = $(this).parents('.'+className+':first').data('id');
		
		if(dataId > 0){
			data = classInst.allData[dataId];
		}else{
			data = new classInst({
				title: 'default',
				start: 'today',
				end: 'tomorrow'
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
						});
						return false;
					}
				}
			}
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