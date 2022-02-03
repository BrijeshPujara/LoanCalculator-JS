//Listen for submit 
document.querySelector('#loan-form').addEventListener('submit', (e) => {
    //Hide results
    document.querySelector('#results').style.display = 'none';

    //Show loader
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//Calculate results function 
function calculateResults() {
    console.log('Calculating...');
    //UI Vars
    const UIamount = document.querySelector('#amount');
    const UIinterest = document.querySelector('#interest');
    const UIyears = document.querySelector('#years');
    const UImonthPayment = document.querySelector('#monthly-payment');
    const UItotalPayment = document.querySelector('#total-payment');
    const UItotalInterest = document.querySelector('#total-interest');

    const principle = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(UIyears.value) * 12;
    
    //Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle * x * calculatedInterest) / (x - 1);

    //isFinite() function determines whether the 
    //passed value is a finite number.If  needed, the parameter is first converted to a number.
    if (isFinite(monthly)) {
        UImonthPayment.value = monthly.toFixed(2);
        UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        UItotalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);

        //Show results
        document.querySelector('#results').style.display = 'block';
        //Hide results
        document.querySelector('#loading').style.display = 'none';


    } else {
        showError('Please check your numbers');
    }

    
}

//Show error
function showError(error) {

    //Show results
    document.querySelector('#results').style.display = 'block';
    
    //Hide results
    document.querySelector('#loading').style.display = 'none';

    //Create div
    const errorDiv = document.createElement('div');

    //Get elements 
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    //Add class
    errorDiv.className = 'alert alert-danger';

    //Create text node and append div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv, heading);

    //Clear error set time out
    setTimeout(clearError, 3000);

}
//Clear error
function clearError() {
    document.querySelector('.alert').remove();
}