function _(id) {
	return document.getElementById(id);
}

//singleton
var Table = (function() {
	var ele = _('carSalesTable');

	var persons = [];
	var bestSalesPerson = []; //may have some 
	return {
		addChild: function(person) {
			persons.push(person);

			if (bestSalesPerson.length === 0) {
				bestSalesPerson.push(person);
			} else {
				if (bestSalesPerson[0].total < person.total) {
					bestSalesPerson = [];
					bestSalesPerson.push(person);
				} else if (bestSalesPerson[0].total == person.total) {
					bestSalesPerson.push(person);
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
		},
		getBestSalesPerson: function() {
			return bestSalesPerson;
		}

	}
})();


function SalesPerson(config) {
	this.salesName = config.salesName;
	this.salesID = config.salesID;
	this.salesAmount = config.salesAmount;

	var total = 0.0;
	for (var i = 0; i < this.salesAmount.length; i++) {
		result += parseFloat(this.salesAmount[i]);
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

	amount.push(_('benz').value);
	amount.push(_('audi').value);
	amount.push(_('porsche').value);
	amount.push(_('bmw').value);

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