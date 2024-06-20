let button = document.getElementById('button');
let my_form = document.getElementById('my-form');

//New data
let new_year = document.getElementById('newyear');
let new_month = document.getElementById('newmonth');
let new_day = document.getElementById('newday');

//Create arrays with similar elements
let all_inputs = document.getElementsByClassName('all-inputs');
let errors = document.getElementsByClassName('errors');
let labels = document.getElementsByTagName('label');


//Validation before submitting
button.addEventListener('click', (e) => {
    for (let i = 0; i < all_inputs.length; i++) {
        if (all_inputs[i].value === '') {
            e.preventDefault();
            errors[i].style.display = 'block';
            errors[i].innerHTML = 'This field is required';
            all_inputs[i].style.border = '1.5px solid hsl(0, 100%, 67%)';
            labels[i].style.color = 'hsl(0, 100%, 67%)';
        } else if (i === 0 && (all_inputs[0].value < 1 || all_inputs[0].value > 31 || isNaN(all_inputs[0].value))) {
            e.preventDefault();
            errors[0].style.display = 'block';
            errors[0].innerHTML = 'Must be a valid day';
            all_inputs[0].style.border = '1.5px solid hsl(0, 100%, 67%)';
            labels[0].style.color = 'hsl(0, 100%, 67%)';
        } else if (i === 1 && (all_inputs[1].value < 1 || all_inputs[1].value > 12 || isNaN(all_inputs[1].value))) {
            e.preventDefault();
            errors[1].style.display = 'block';
            errors[1].innerHTML = 'Must be a valid month';
            all_inputs[1].style.border = '1.5px solid hsl(0, 100%, 67%)';
            labels[1].style.color = 'hsl(0, 100%, 67%)';
        } else if (i === 2 && (all_inputs[2].value > 2024 || isNaN(all_inputs[2].value))) {
            e.preventDefault();
            errors[2].style.display = 'block';
            errors[2].innerHTML = 'Must be in the past';
            all_inputs[2].style.border = '1.5px solid hsl(0, 100%, 67%)';
            labels[2].style.color = 'hsl(0, 100%, 67%)';
        } else {
            errors[i].style.display = 'none';
            all_inputs[i].style.border = '1.5px solid hsl(0, 1%, 44%)';
            labels[i].style.color = 'hsl(0, 1%, 44%)';
        }
    }    
})

//Calculations for exact age after submitting
my_form.addEventListener('submit', (e) => {
    e.preventDefault();
    let total_year = 2024 - all_inputs[2].value;
    let total_month = (12 - all_inputs[1].value) + 6;
    let total_days = 0;

    if (total_month >= 12) {
        total_month -= 12;
    } else {
        total_year -= 1;
    }

    if (all_inputs[0].value <= 20) {
        total_days = 20 - all_inputs[0].value;
    } else {
        total_days = 20 + (all_inputs[0].value - 20);
    }
    
    //Animated counters for years, month and days
    let counts_years = setInterval(updated_year, 20); //second parameter is time in ms
    let counts_months = setInterval(updated_month, 20);
    let counts_days = setInterval(updated_day, 20);

    let upto_day = upto_month  = upto_year = 0; //in one line

    function updated_year() {
        new_year.innerHTML = ++upto_year;
        if (upto_year === total_year) {
            clearInterval(counts_years);
        }
    }

    function updated_month() {
        new_month.innerHTML = ++upto_month;
        if (upto_month === total_month) {
            clearInterval(counts_months);
        }
    }

    function updated_day() {
        new_day.innerHTML = ++upto_day;
        if (upto_day === total_days) {
            clearInterval(counts_days);
        }
    }
})