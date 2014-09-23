
//http://stackoverflow.com/a/1830844/2291720
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//http://stackoverflow.com/a/3087026/2291720
function are2of3numbers(weight,height,bmi) {

	var a = isNumber(height)
	var b =	isNumber(weight)
	var c =	isNumber(bmi)

	return a ^ b ? c : a
}



function calculateBmi() {

	var heightsqr = Math.pow(document.bmiForm.height.value/100,2);
	var weight = document.bmiForm.weight.value;
	var bmi = document.bmiForm.bmi.value;

	if (are2of3numbers(weight,heightsqr,bmi)){ 

		/* http://stackoverflow.com/a/12830454/2291720
		   +func(n).toFixed(2)
		   gives the desired result
		*/
		switch(true) {
			case !isNumber(heightsqr):
				document.bmiForm.height.value = +Math.sqrt(weight/bmi).toFixed(2);
				break;
			case !isNumber(weight):
				document.bmiForm.weight.value = +(bmi * heightsqr).toFixed(2);
				break;
			default:
				document.bmiForm.bmi.value = +(weight / heightsqr).toFixed(2);

		}


		/*
		if(weight > 0 && height > 0){	
			var finalBmi = weight/(height/100*height/100)
				document.bmiForm.bmi.value = finalBmi
				if(finalBmi < 18.5){
					document.bmiForm.meaning.value = "That you are too thin."
				}
			if(finalBmi > 18.5 && finalBmi < 25){
				document.bmiForm.meaning.value = "That you are healthy."
			}
			if(finalBmi > 25){
				document.bmiForm.meaning.value = "That you have overweight."
			}
		*/
	}
}

