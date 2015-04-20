function SalesPerson(config){
	this.salesName = config.salesName;
	this.salesID = config.salesID;
	this.salesAmount = config.salesAmount;
}

function nameValidation(name){
	return /^[A-Za-z]+$/.test(name);
}

function idValidation(id){
	return /^\d+$/.test(id);
}

function floatValidation(n){
	return /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(n);
}
function amountValidation(amount){
	for (var i = 0; i < amount.length; i++) {
		if(!floatValidation(amount[i])){
			return false;
		}
	};
	return true;
}
