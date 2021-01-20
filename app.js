// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e){

    // Hide results
    document.querySelector('#results').style.display='none';
    //Sow loader
    document.querySelector('#loading').style.display='block';

    setTimeout(calculateResults , 2000);

    e.preventDefault();
});

// Calculate Results

function calculateResults(){

    console.log('Calculating');

    // UI Vars
    const  amount =  document.querySelector('#amount');
    const  intrest =  document.querySelector('#interest');
    const  years =  document.querySelector('#years');
    const  monthlyPayment =  document.querySelector('#monthly-payment');
    const  totalPayment =  document.querySelector('#total-payment');
    const  totalIntrest =  document.querySelector('#total-interest');


    const principal = parseFloat(amount.value);
    const calculatedIntreset = parseFloat(intrest.value) / 100 / 12 ; 
    const calculatedPayments = parseFloat(years.value) * 12 ;

    // Monthly payments formula
    
    const x = Math.pow(1+calculatedIntreset , calculatedPayments);
    const monthly = (principal*x*calculatedIntreset)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalIntrest.value = ((monthly*calculatedPayments)-principal).toFixed(2);

        // Show results
        document.querySelector('#results').style.display='block';
        //Hise Spiner
        document.querySelector('#loading').style.display='none';

    }else{
         showError('Please chekcyout numbers');
    }

}


//Show Error function

function showError(error){
    // Show results
    document.querySelector('#results').style.display='none';
    //Hise Spiner
    document.querySelector('#loading').style.display='none';
    //Create a div
    const errorDiv = document.createElement('div');
    // Get elements
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')
    // Add boot-strap class
    errorDiv.className='alert alert-danger';
    // Create text and insert it into div
    errorDiv.appendChild(document.createTextNode(error));
    //Insert error above heading 
    card.insertBefore(errorDiv , heading);
    // Clear error after 3 seconds
    setTimeout(clearError , 2000) ;
}

// Clear error
function clearError(){
    document.querySelector('.alert').remove();
}