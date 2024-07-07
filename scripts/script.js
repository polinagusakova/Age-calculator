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

const all_inputs_numbers = [];
for (let i = 0; i < all_inputs.length; i++) {
  all_inputs_numbers.push(Number(all_inputs[i]));
}


//get current date
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();


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
        } // Validation for months with 30 days 
        else if ((parseInt(all_inputs[1].value) === 4 || parseInt(all_inputs[1].value) === 6 || parseInt(all_inputs[1].value) === 9 || parseInt(all_inputs[1].value) === 11) && parseInt(all_inputs[0].value) > 30) {
            e.preventDefault();
            errors[0].style.display = 'block';
            errors[0].innerHTML = 'Must be a valid day';
            all_inputs[0].style.border = '1.5px solid hsl(0, 100%, 67%)';
            labels[0].style.color = 'hsl(0, 100%, 67%)';
        } // Validation for February 
        else if (parseInt(all_inputs[1].value) === 2 && parseInt(all_inputs[0].value) > 28) {
            e.preventDefault();
            errors[0].style.display = 'block';
            errors[0].innerHTML = 'Must be a valid day';
            all_inputs[0].style.border = '1.5px solid hsl(0, 100%, 67%)';
            labels[0].style.color = 'hsl(0, 100%, 67%)';
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
    let total_year = year - parseInt(all_inputs[2].value);
    let total_month = 0;
    let total_days = 0;

    // if inserted month more than actual month - total years must be reduced by one
    if (parseInt(all_inputs[1].value) > month) {
        total_year -= 1;
    }

    // if inserted month <= actual month and inserted day > actual day - total months must be reduced by one
    if (parseInt(all_inputs[1].value) <= month && parseInt(all_inputs[0].value) > day) {
        total_month = month - parseInt(all_inputs[1].value) - 1;
    } else if (parseInt(all_inputs[1].value) <= month) {
        total_month = month - parseInt(all_inputs[1].value);
    } else {
        total_month = (12 - parseInt(all_inputs[1].value)) + month;
    }

    if (all_inputs[0].value <= day) {
        total_days = day - all_inputs[0].value;
    } // Months with 30 days
    else if (parseInt(all_inputs[1].value) === 4 || parseInt(all_inputs[1].value) === 6 || parseInt(all_inputs[1].value) === 9 || parseInt(all_inputs[1].value) === 11) {
        total_days = day + (30 - parseInt(all_inputs[0].value));
    } // February 
    else if (all_inputs[1].value === 2) {
        total_days = day + (28 - all_inputs[0].value);
    } // Other months 
    else {
        total_days = day + (31 - all_inputs[0].value);
    }
        
    //Animated counters for years, month and days
    let counts_years = setInterval(updated_year, 20); //second parameter is time in ms
    let counts_months = setInterval(updated_month, 20);
    let counts_days = setInterval(updated_day, 20);

    let upto_day = upto_month = upto_year = 0; //in one line

    function updated_year() {
        if (total_year === 0) {
            new_year.innerHTML = 0;
            upto_year = 0;
        } else {
            new_year.innerHTML = ++upto_year;
            if (upto_year === total_year) {
                clearInterval(counts_years);
            }
        }        
    }

    function updated_month() {
        if (total_month === 0) {
            new_month.innerHTML = 0;
            upto_month = 0;
        } else {
            new_month.innerHTML = ++upto_month;
            if (upto_month === total_month) {
                clearInterval(counts_months);
           }
        }
    }

    function updated_day() {
        if (total_days === 0) {
            new_day.innerHTML = 0;
            upto_day = 0;
        } else {
            new_day.innerHTML = ++upto_day;
            if (upto_day === total_days) {
                clearInterval(counts_days);
            }
        }
    }
})