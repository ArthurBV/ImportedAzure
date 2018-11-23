$(document).ready(function() {
	
	// DO GET
	$.ajax({
		type : "GET",
		url : "api/customers/all",
		success: function(result){
			$.each(result, function(i, customer){
				
				var customerRow = '<tr>' +
									'<td>' + customer.doc_clie + '</td>' +
									'<td>' + customer.nombre.toUpperCase() + '</td>' +
									'<td>' + customer.edad + '</td>' +
									'<td>' + customer.direccion + '</td>' +
									'<td>' + customer.medicamento + '</td>' +
									'<td>' + customer.alergias + '</td>' +
									'<td>' + customer.estatura + '</td>' +
									'<td>' + customer.peso + '</td>' +
								  '</tr>';
				
				$('#customerTable tbody').append(customerRow);


				for (var i = customer.tipo.length - 1; i >= 0; i--) {
				
					if (customer.tipo[i] === 'basica') {
						var basicRow = '<tr>' +
						'<td>' + customer.doc_clie + '</td>' +
						'<td>' + customer.nombre.toUpperCase() + '</td>' +
						'</tr>';
						$('#basicaTable tbody').append(basicRow);
					}

					if (customer.tipo[i] === 'medicada') {
						var medicadaRow = '<tr>' +
						'<td>' + customer.doc_clie + '</td>' +
						'<td>' + customer.nombre.toUpperCase() + '</td>' +
						'</tr>';
						$('#medicaTable tbody').append(medicadaRow);
					}

					if (customer.tipo[i] === 'contacto') {
						var contactoRow = '<tr>' +
						'<td>' + customer.doc_clie + '</td>' +
						'<td>' + customer.nombre.toUpperCase() + '</td>' +
						'</tr>';
						$('#contactoTable tbody').append(contactoRow);
					}
				}
				
	        });
			
			$( "#customerTable tbody tr:odd" ).addClass("info");
			$( "#customerTable tbody tr:even" ).addClass("success");
		},
		error : function(e) {
			alert("ERROR: ", e);
			console.log("ERROR: ", e);
		}
	});
	
	// do Filter on View
	$("#inputFilter").on("keyup", function() {
	    var inputValue = $(this).val().toLowerCase();
	    $("#customerTable tr").filter(function() {
	    	$(this).toggle($(this).text().toLowerCase().indexOf(inputValue) > -1)
	    });
	    $("#medicaTable tr").filter(function() {
	    	$(this).toggle($(this).text().toLowerCase().indexOf(inputValue) > -1)
	    });
	    $("#contactoTable tr").filter(function() {
	    	$(this).toggle($(this).text().toLowerCase().indexOf(inputValue) > -1)
	    });
	    $("#basicaTable tr").filter(function() {
	    	$(this).toggle($(this).text().toLowerCase().indexOf(inputValue) > -1)
	    });
	});
})