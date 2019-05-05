var x = 0;

$(document).ready(function() {
	var max_fields = 9;
	var wrapper = $('#spare-parts-form');
	var add_button = $('#add-spare-parts-form');

	$(add_button).click(function(e) {
		//on add input button click
		e.preventDefault();
		if (x < max_fields) {
			//max input box allowed
			x++; //text box increment
			element = `<div class="row mt-3">
          <div class="col-2">
            <input type="text" placeholder="reservedel nr." name="productNumber" id="productNumber${x}" class="form-control form-control-lg">
          </div>
          <div class="col-7">
            <input type="text" placeholder="beskrivelse" name="description" id="description${x}" class="form-control form-control-lg">
          </div>
          <div class="col-1">
            <input type="number" onkeyup="if(this.value > 9999){this.value=9999}if(this.value < 0){this.value = 0}" max="99999" min="0" placeholder="antal" name="amount" id="amount${x}" class="input-amount form-control form-control-lg">
          </div>
          <div class="col-1">
            <input type="number" onkeyup="if(this.value > 99999){this.value=99999}if(this.value < 0){this.value = 0}" max="99999" min="0" name="price" id="price${x}" placeholder="pris" class="input-amount form-control form-control-lg">
          </div>
          <div class="col-1">
          <button type="submit" id="remove" class="btn btn-danger remove">X</button>
          </div>
        </div>`;
			$(wrapper).append(element);
			console.log(x);
			//add input box
			$('#spare-parts-form #remove').click(function(e) {
				$(this).parent().parent().remove();
				x--;
				console.log(x);
			});
		}
	});
});

document.getElementById('go-back-btn').addEventListener('click', function() {
	console.log('Someithn');
	window.history.back();
});

document.getElementById('submit-invoice-btn').addEventListener('click', function() {
	var reg = document.getElementById('#reg');
	var brand = document.getElementById('#brand');
	var model = document.getElementById('#model');
	var year = document.getElementById('#year');
	var workHours = document.getElementById('#hours');
});
