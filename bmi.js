var height = document.bmiForm.height;
var weight = document.bmiForm.weight;
var bmi = document.bmiForm.bmi;
var heightUnitGauge = document.getElementById("heightUnitGauge");
var const_magic = 703.06957964

var height_m;
var weight_kg;

var enter = 13;
var backspace = 8;
var heightUnit = "cm"; /* "cm", "m", "f" */
var weightUnit = "k"; /* "k", "p", stone? */

/*
 * height.unit
 */

/* var unit = { height: "m";
 * 		weight: "k";
 * 		}
 */

function lilRound(val) {
	return +( val ).toFixed(1);
}

function isNumber(n) {

	/* http://stackoverflow.com/a/1830844/2291720 */

	return !isNaN(parseFloat(n)) && isFinite(n);
}

function are2of3numbers(weight,height,bmi) {

	/* http://stackoverflow.com/a/3087026/2291720 */

	var a = isNumber(height)
		var b =	isNumber(weight)
		var c =	isNumber(bmi)

		return a ^ b ? c : a
}

function isFirstDigitFeet(digit) {

	if (2 < digit && digit < 9 ) {
		return true;
	} else {
		return false;
	}

}

function setMetric() {
	
	if (heightUnit == "m") {

	height_m = +height.value.slice(0,3);
	weight_kg = +weight.value;

	} else if (heightUnit == "cm") {
	height_m = +height.value.slice(0,3)/100;
	weight_kg = +weight.value;
	} else {

	var feet = +height.value.slice(0,1);
	var inches = +height.value.slice(2).replace("'",""); 
	
	inches += 12 * feet;

	height_m = inches * 2.54 / 100;
	weight_kg = +weight.value;
	}
}


function getHeightSqr() {

	var heightSqr;
	
	/* make sure height is a number */
	if (isNumber(height_m)) {
		heightSqr = Math.pow(height_m,2);
	} else {
		heightSqr = NaN;
	}

	return heightSqr;
}

function setBmi() {

	var weightL = weight_kg;
        var heightSqr = getHeightSqr();

	if (isNumber(heightSqr) && isNumber(weightL)) { 
		bmi.value = lilRound(weightL / heightSqr);
	}
}


function setWeight() {

        var heightSqr = getHeightSqr();
	var bmiL = bmi.value;

	if (isNumber(heightSqr) && isNumber(bmiL))
	{ 
		weight.value = lilRound(bmiL * heightSqr);
	}
}

function jumpToWeight(event) {
	
	if ( (isInchesDone(event)
		|| isMeterDone(event)
	        )
		&& event.keyCode != backspace ) {
		weight.focus();
	}
}

function isMeterDone(event) {

	var m = +height.value.replace("m","").replace("c","");
	if (heightUnit = "m") {
		m *= 100
	}

	if (( event.keyCode == enter || height.value.length >= 4) && 10 < m && m < 300 ) {
		return true;
	} else {
		return false;
	}
}




function isInchesDone(event) {
	
	var inches = height.value.replace("'","").substring(2);

	if (heightUnit != "f") {
		return false;
	}

	switch(true) {
		case inches == "0":
		case (1 < inches && inches < 12):
		case event.keyCode == enter:
			return true;
	 	default:
			return false;
	}
}

function setHeightUnit() {

	if (height.value.length == 1) {
		if ( isFirstDigitFeet(height.value) ) {
			heightUnit = "f";
			return;
		} 
	} else if ( height.value.slice(1,2) == "."
				|| height.value.slice(1,2) == ",") {
			heightUnit = "m";
			return;
	} else {
		heightUnit = "cm";
		return;
			
	}
}

function setHeightUnitEmbedded(event) {

	if (height.value.length == 1
		       	&& heightUnit == "f"
			&& event.keyCode != backspace) {
		height.value += '"';
	} else if (heightUnit == "m" && (height.value.length > 3 || event.keyCode == enter) ) {
		height.value += 'm';

	} else if (heightUnit == "cm" && height.value.length == 3) {
		height.value += 'cm';
	}
}

function setHeightSubUnitEmbedded(event) {

	var inchesEmpty = height.value.substring(2) == "";

	if (heightUnit == "f" 
		&& isInchesDone(event)
	       	&& event.keyCode != backspace 
		&& !inchesEmpty) {
			height.value += "'";
	} 
}

function deleteTwo(event) {

	if (heightUnit == "f"
		&& event.keyCode == backspace
		&& height.value.length == '1') {
			height.value = "";
	}
	
}


function remSubUnit () {
	
	height.value = height.value.replace("'","");
	height.value = height.value.replace("cm","");
	height.value = height.value.replace("m","");
 	

}





