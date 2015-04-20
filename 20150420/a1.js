function _(id) {
	return document.getElementById(id);
}

//singleton
var Table = (function() {
	var ele = _('carSalesTable');

	var persons = [];
	var bestSalesPerson = null; //may have some 
	var sales = [0.0,0.0,0.0,0.0];
	function showSummery(){
		// _('totalSales').innerHTML = sales;
		// _('bestSalesPerson').innerHTML = bestSalesPerson.salesName + ' who sells '+bestSalesPerson.salesAmount;
		var bestSellingCar = '';
		var max = 0.0,maxIndex=0;
		for (var i = 0; i < sales.length; i++) {
			if(sales[i] > max ){
				max = sales[i];
				maxIndex = i;
			}
		};
		switch(maxIndex){
			case 0:
				bestSellingCar = 'Mercedes Benz';
				break;
			case 1:
				bestSellingCar = 'Audi';
				break;
			case 2:
				bestSellingCar = 'Porsche';
				break;
			case 3:
				bestSellingCar = 'BMW';
				break;
		}

		_('summery').innerHTML = 'The best salesperson of the month is '+bestSalesPerson.salesName+', with the sales amount of $'+bestSalesPerson.total+'K.<br>'
			+'The best-selling car of the month is '+bestSellingCar+', with the sales amount of $'+max+'K.';
	}

	return {
		addChild: function(person) {
			persons.push(person);
			
			for (var i = 0; i < sales.length; i++) {
				sales[i] +=person.salesAmount[i];
			};

			if (!bestSalesPerson) {
				bestSalesPerson = person;
			} else {
				if (bestSalesPerson.total < person.total) {
					bestSalesPerson = person;
				}else if(bestSalesPerson.total == person.total){
					//equel strategy
				}
			}
			var tr = document.createElement('tr');
			var td;
			td = document.createElement('td');
			td.innerHTML = person.salesName;
			tr.appendChild(td);

			td = document.createElement('td');
			td.innerHTML = person.salesID;
			tr.appendChild(td);

			td = document.createElement('td');
			td.innerHTML = person.salesAmount;
			tr.appendChild(td);

			td = document.createElement('td');
			td.innerHTML = person.total;
			tr.appendChild(td);

			ele.appendChild(tr);

			showSummery();
		}

	}
})();


function SalesPerson(config) {
	this.salesName = config.salesName;
	this.salesID = config.salesID;
	this.salesAmount = config.salesAmount;

	var total = 0.0;
	for (var i = 0; i < this.salesAmount.length; i++) {
		total += this.salesAmount[i];
	};
	this.total = total;
}

SalesPerson.prototype.addToTable = function() {
	function reset() {
		_('name').value = '';
		_('id').value = '';
		_('benz').value = '';
		_('audi').value = '';
		_('porsche').value = '';
		_('bmw').value = '';
	}
	if (this.validateAll() === true) {
		//reset();


		Table.addChild(this);
	}
}
SalesPerson.prototype.validateAll = function() {
	//clear amount warning msg
	function clear() {
		_('warning_benz').innerHTML = '';
		_('warning_audi').innerHTML = '';
		_('warning_porsche').innerHTML = '';
		_('warning_bmw').innerHTML = '';
	}

	if (!nameValidation(this.salesName)) {
		_('warning_name').innerHTML = 'please input at least one alphabet letter like: Ada';
		return false;
	}
	_('warning_name').innerHTML = '';

	if (!idValidation(this.salesID)) {
		_('warning_id').innerHTML = 'please input only digits like: 1001';
		return false;
	}
	_('warning_id').innerHTML = '';

	if (typeof(amountValidation(this.salesAmount)) === 'number') {
		var index = amountValidation(this.salesAmount);
		var warningMsg = "please input non-negative decimal numbers like: 1000.33";

		clear();
		var ele;
		switch (index) {
			case 0:
				ele = _('warning_benz');
				break;
			case 1:
				ele = _('warning_audi');
				break;
			case 2:
				ele = _('warning_porsche');
				break;
			case 3:
				ele = _('warning_bmw');
				break;
		}
		ele.innerHTML = warningMsg;

		return false
	}

	clear();

	return true;
}


var addBtn = _("add");

addBtn.addEventListener('click', function(e) {

	var name = _('name').value;

	var id = _('id').value;

	var amount = [];

	amount.push(parseFloat(_('benz').value));
	amount.push(parseFloat(_('audi').value));
	amount.push(parseFloat(_('porsche').value));
	amount.push(parseFloat(_('bmw').value));

	var person = new SalesPerson({
		salesName: name,
		salesID: id,
		salesAmount: amount
	});

	person.addToTable();

});

////ok return true
function nameValidation(name) {
	return /^[A-Za-z]+$/.test(name);
}

function idValidation(id) {
	return /^\d+$/.test(id);
}

function floatValidation(n) {
	return /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(n);
}

/**
 * ok and return "ok"
 * if failure return the index
 */
function amountValidation(amount) {
	for (var i = 0; i < amount.length; i++) {
		if (!floatValidation(amount[i])) {
			return i;
		}
	};
	return "ok";
}