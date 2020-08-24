let money, time;
let btnStart = document.getElementById('start'),
    wrapper = document.querySelector('.wrapper'),
    row = document.querySelectorAll('.row'),
    modal = document.querySelector('.modal'),
    modalClose = document.querySelector('.modal-close');


let arrOfClasses = [];
let arrWithTags = document.querySelectorAll('div');
for(let i = 0; i < arrWithTags.length; i++){

    if(arrWithTags[i].className == 'budget-value' || arrWithTags[i].className == 'daybudget-value' 
        || arrWithTags[i].className == 'level-value' || arrWithTags[i].className == 'expenses-value' 
        || arrWithTags[i].className == 'optionalexpenses-value' || arrWithTags[i].className == 'income-value'
        || arrWithTags[i].className == 'monthsavings-value' || arrWithTags[i].className == 'yearsavings-value'){
    arrOfClasses.push(arrWithTags[i]);
    }
}

let isStart = false;

let budgetValue = arrOfClasses[0],
    dayBudgetValue = arrOfClasses[1],
    levelValue = arrOfClasses[2],
    expensesValue = arrOfClasses[3],
    optionalExpensesValue = arrOfClasses[4],
    incomeValue = arrOfClasses[5],
    monthSavingsValue = arrOfClasses[6],
    yearSavingsValue = arrOfClasses[7];

let expensesItem = document.querySelectorAll('.expenses-item'),
    btnExpenses = document.querySelector('.expenses-item-btn'),
    btnOptExpenses = document.querySelector('.optionalexpenses-btn'),
    btnCountBudget = document.querySelector('.count-budget-btn'),
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncomeInput = document.querySelector('.choose-income'),
    savingsInput = document.querySelector('#savings'),
    chooseSumInput = document.querySelector('#sum'),
    choosePercentInput = document.querySelector('#percent'),
    yearInput = document.querySelector('.year-value'),
    monthInput = document.querySelector('.month-value'),
    dayInput = document.querySelector('.day-value');

var createNewFieldsBtn = document.querySelector('.creatingNewFieldsBtn');
createNewFieldsBtn.addEventListener('click', function(){
    var newRow = row[0].cloneNode(false);
    for(let i = 0; i < 2; i++){
        var newFields_0 = expensesItem[i].cloneNode();
        let count = ++expensesItem.length;
        let newId = 'expenses_' + count;
        newFields_0.id = newId;
        wrapper.appendChild(newRow);
        newRow.appendChild(newFields_0);
        expensesItem = document.querySelectorAll('.expenses-item');
        console.log(newFields_0);
    }
});


btnStart.addEventListener('click', function(){
    time = prompt("Enter current date in format YYYY-MM-DD", "1970-01-01");

    while(isNaN(money) || money == "" || money == null){
        money = +prompt("Your budget for 1 month, in dollars:", "1000");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed() + " $";
    yearInput.value = new Date(Date.parse(time)).getFullYear();
    monthInput.value = new Date(Date.parse(time)).getMonth() + 1;
    dayInput.value = new Date(Date.parse(time)).getDate();

    isStart = true;
    waitingStart();
});

btnExpenses.addEventListener('click', function(){
    let sum = 0;

    for(let i = 0; i < expensesItem.length; i++){
        let a = expensesItem[i].value;
        let b = expensesItem[++i].value;
    
        if((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
            && a != '' && b != '' && a.length < 50){
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i--;
        }  
    }
    expensesValue.textContent = sum + ' $';
});

btnOptExpenses.addEventListener('click', function(){
    for(let i = 0; i < optionalExpensesItem.length; i++){
        let a = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = a;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '; 
    }
});

btnCountBudget.addEventListener('click', function(){
    if(appData.budget != undefined){
    let expensesSum = parseFloat(expensesValue.textContent);
    appData.moneyPerDay = +((appData.budget - expensesSum) / 30).toFixed(2);
    dayBudgetValue.textContent = appData.moneyPerDay + ' $';

    if(appData.moneyPerDay < 100){
        levelValue.textContent = "Minimum level of wealth";
    } else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
        levelValue.textContent = "Average level of wealth";
    } else if(appData.moneyPerDay > 2000){
        levelValue.textContent = "You are rich";
    } else {
        levelValue.textContent = "Invalid data type entered";
    }
    } else {
        alert('To start click on button "Start calculating"');
    }
    
});

chooseIncomeInput.addEventListener('input', function(){
    let items = chooseIncomeInput.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

savingsInput.addEventListener('click', function(){
    if(appData.savings == true){
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

chooseSumInput.addEventListener('input', function(){
    if(appData.savings == true){
        let sum = +chooseSumInput.value,
            percent = +choosePercentInput.value;

        appData.monthIncome = (sum/100/12*percent);
        appData.yearIncome = (sum/100*percent);

        monthSavingsValue.textContent = appData.monthIncome.toFixed(2) + ' $';
        yearSavingsValue.textContent = appData.yearIncome.toFixed(2) + ' $';
    }
});

choosePercentInput.addEventListener('input', function(){
    if(appData.savings == true){
        let sum = +chooseSumInput.value,
            percent = +choosePercentInput.value;

        appData.monthIncome = (sum/100/12*percent).toFixed(2);
        appData.yearIncome = (sum/100*percent).toFixed(2);

        monthSavingsValue.textContent = appData.monthIncome;
        yearSavingsValue.textContent = appData.yearIncome;
    }
});

let appData = {
    budget : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false,
};

function showAllData(){
    for(let key in appData){
        console.log("Key: " + key  + " value: " + appData[key]);
    }
}


function waitingStart(){
    if(isStart == true){
        for(let i = 0; i < expensesItem.length; i++){
            expensesItem[i].disabled = false;
            }
    btnExpenses.disabled = false;
    btnOptExpenses.disabled = false;
    btnCountBudget.disabled = false;
    for(let i = 0; i < optionalExpensesItem.length; i++){
        optionalExpensesItem[i].disabled = false;
        }
    chooseIncomeInput.disabled = false;
    savingsInput.disabled = false;
    chooseSumInput.disabled = false;
    choosePercentInput.disabled = false;
    yearInput.disabled = false;
    monthInput.disabled = false;
    dayInput.disabled = false;
    } else {

    for(let i = 0; i < expensesItem.length; i++){
    expensesItem[i].disabled = true;
    }

    btnExpenses.disabled = true;
    btnOptExpenses.disabled = true;
    btnCountBudget.disabled = true;

    for(let i = 0; i < optionalExpensesItem.length; i++){
        optionalExpensesItem[i].disabled = true;
        }

    chooseIncomeInput.disabled = true;
    savingsInput.disabled = true;
    chooseSumInput.disabled = true;
    choosePercentInput.disabled = true;
    yearInput.disabled = true;
    monthInput.disabled = true;
    dayInput.disabled = true;
    }  
}
setTimeout(function(){
    if(modal.classList.contains('fadeout')){
    modal.style.display = 'flex';
    modal.classList.remove('fadeout');
    modal.classList.add('fadein');
    }
}, 2000);

modalClose.addEventListener('click', function(){
    if(modal.classList.contains('fadein')){
        modal.classList.remove('fadein');
        modal.classList.add('fadeout');
        setTimeout(function(){
            modal.style.display = 'none';
        }, 1500);
    }
});
waitingStart();
