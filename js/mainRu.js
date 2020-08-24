let moneyRu, timeRu;
let btnStartRu = document.getElementById('start');
let wrapperRu = document.querySelector('.wrapper');
let rowRu = document.querySelectorAll('.row');

let arrOfClassesRu = [];
let arrWithTagsRu = document.querySelectorAll('div');
for(let i = 0; i < arrWithTagsRu.length; i++){
    if(arrWithTagsRu[i].className == 'budget-value' || arrWithTagsRu[i].className == 'daybudget-value' 
        || arrWithTagsRu[i].className == 'level-value' || arrWithTagsRu[i].className == 'expenses-value' 
        || arrWithTagsRu[i].className == 'optionalexpenses-value' || arrWithTagsRu[i].className == 'income-value'
        || arrWithTagsRu[i].className == 'monthsavings-value' || arrWithTagsRu[i].className == 'yearsavings-value'){
    arrOfClassesRu.push(arrWithTagsRu[i]);
    }
}

let isStartRu = false;

let budgetValueRu = arrOfClassesRu[0],
    dayBudgetValueRu = arrOfClassesRu[1],
    levelValueRu = arrOfClassesRu[2],
    expensesValueRu = arrOfClassesRu[3],
    optionalExpensesValueRu = arrOfClassesRu[4],
    incomeValueRu = arrOfClassesRu[5],
    monthSavingsValueRu = arrOfClassesRu[6],
    yearSavingsValueRu = arrOfClassesRu[7];

let expensesItemRu = document.querySelectorAll('.expenses-item'),
    btnExpensesRu = document.querySelector('.expenses-item-btn'),
    btnOptExpensesRu = document.querySelector('.optionalexpenses-btn'),
    btnCountBudgetRu = document.querySelector('.count-budget-btn'),
    optionalExpensesItemRu = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncomeInputRu = document.querySelector('.choose-income'),
    savingsInputRu = document.querySelector('#savings'),
    chooseSumInputRu = document.querySelector('#sum'),
    choosePercentInputRu = document.querySelector('#percent'),
    yearInputRu = document.querySelector('.year-value'),
    monthInputRu = document.querySelector('.month-value'),
    dayInputRu = document.querySelector('.day-value');

var createNewFieldsBtnRu = document.querySelector('.creatingNewFieldsBtn');
createNewFieldsBtnRu.addEventListener('click', function(){
    var newRowRu = rowRu[0].cloneNode(false);
    for(let i = 0; i < 2; i++){
        var newFields_0Ru = expensesItemRu[i].cloneNode();
        let countRu = ++expensesItemRu.length;
        let newIdRu = 'expenses_' + countRu;
        newFields_0Ru.id = newIdRu;
        wrapperRu.appendChild(newRowRu);
        newRowRu.appendChild(newFields_0Ru);
        expensesItemRu = document.querySelectorAll('.expenses-item');
    }
});


btnStartRu.addEventListener('click', function(){
    timeRu = prompt("Введите текущую дату в формате YYYY-MM-DD", "1970-01-01");

    while(isNaN(moneyRu) || moneyRu == "" || moneyRu == null){
        moneyRu = +prompt("Ваш бюджет на месяц, в долларах?", "1000");
    }
    appDataRu.budgetRu = moneyRu;
    appDataRu.timeDataRu = timeRu;
    budgetValueRu.textContent = moneyRu.toFixed() + " $";
    yearInputRu.value = new Date(Date.parse(timeRu)).getFullYear();
    monthInputRu.value = new Date(Date.parse(timeRu)).getMonth() + 1;
    dayInputRu.value = new Date(Date.parse(timeRu)).getDate();

    isStartRu = true;
    waitingStart();
});

btnExpensesRu.addEventListener('click', function(){
    let sumRu = 0;

    for(let i = 0; i < expensesItemRu.length; i++){
        let a = expensesItemRu[i].value;
        let b = expensesItemRu[++i].value;
    
        if((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
            && a != '' && b != '' && a.length < 50){
            appDataRu.expensesRu[a] = b;
            sumRu += +b;
        } else {
            i--;
        }  
    }
    expensesValueRu.textContent = sumRu + ' $';
});

btnOptExpensesRu.addEventListener('click', function(){
    for(let i = 0; i < optionalExpensesItemRu.length; i++){
        let a = optionalExpensesItemRu[i].value;
        appDataRu.optionalExpensesRu[i] = a;
        optionalExpensesValueRu.textContent += appDataRu.optionalExpensesRu[i] + ' '; 
    }
});

btnCountBudgetRu.addEventListener('click', function(){
    if(appDataRu.budgetRu != undefined){
    let expensesSumRu = parseFloat(expensesValueRu.textContent);
    appDataRu.moneyPerDayRu = +((appDataRu.budgetRu - expensesSumRu) / 30).toFixed(2);
    dayBudgetValueRu.textContent = appDataRu.moneyPerDayRu + ' $';

    if(appDataRu.moneyPerDayRu < 100){
        levelValueRu.textContent = "Минимальный уровень достатка..";
    } else if(appDataRu.moneyPerDayRu > 100 && appDataRu.moneyPerDayRu < 2000){
        levelValueRu.textContent = "Средний уровень достатка.";
    } else if(appDataRu.moneyPerDayRu > 2000){
        levelValueRu.textContent = "Да вы богач!";
    } else {
        levelValueRu.textContent = "Введён неправильный тип данных";
    }
    } else {
        alert('Для начала нажмите кнопку "Начать расчет"!');
    }
    
});

chooseIncomeInputRu.addEventListener('input', function(){
    let itemsRu = chooseIncomeInput.value;
    appDataRu.incomeRu = itemsRu.split(', ');
    incomeValueRu.textContent = appDataRu.incomeRu;
});

savingsInputRu.addEventListener('click', function(){
    if(appDataRu.savingsRu == true){
        appDataRu.savingsRu = false;
    } else {
        appDataRu.savingsRu = true;
    }
});

chooseSumInputRu.addEventListener('input', function(){
    if(appDataRu.savingsRu == true){
        let sumRu = +chooseSumInput.value,
            percentRu = +choosePercentInputRu.value;

        appDataRu.monthIncomeRu = (sum/100/12*percent);
        appDataRu.yearIncomeRu = (sum/100*percent);

        monthSavingsValueRu.textContent = appDataRu.monthIncomeRu.toFixed(2) + ' $';
        yearSavingsValueRu.textContent = appDataRu.yearIncomeRu.toFixed(2) + ' $';
    }
});

choosePercentInputRu.addEventListener('input', function(){
    if(appDataRu.savingsRu == true){
        let sumRu = +chooseSumInputRu.value,
            percentRu = +choosePercentInputRu.value;

        appDataRu.monthIncomeRu = (sum/100/12*percentRu).toFixed(2);
        appDataRu.yearIncomeRu = (sum/100*percentRu).toFixed(2);

        monthSavingsValueRu.textContent = appDataRu.monthIncomeRu;
        yearSavingsValueRu.textContent = appDataRu.yearIncomeRu;
    }
});

let appDataRu = {
    budgetRu : moneyRu,
    timeDataRu : timeRu,
    expensesRu : {},
    optionalExpensesRu : {},
    incomeRu : [],
    savingsRu : false,
};

function showAllData(){
    for(let key in appDataRu){
        console.log("Ключ: " + key  + " значение: " + appDataRu[key]);
    }
}


function waitingStart(){
    if(isStartRu == true){
        for(let i = 0; i < expensesItemRu.length; i++){
            expensesItemRu[i].disabled = false;
            }
    btnExpensesRu.disabled = false;
    btnOptExpensesRu.disabled = false;
    btnCountBudgetRu.disabled = false;
    for(let i = 0; i < optionalExpensesItemRu.length; i++){
        optionalExpensesItemRu[i].disabled = false;
        }
    chooseIncomeInputRu.disabled = false;
    savingsInputRu.disabled = false;
    chooseSumInputRu.disabled = false;
    choosePercentInputRu.disabled = false;
    yearInputRu.disabled = false;
    monthInputRu.disabled = false;
    dayInputRu.disabled = false;
    } else {

    for(let i = 0; i < expensesItemRu.length; i++){
    expensesItemRu[i].disabled = true;
    }

    btnExpensesRu.disabled = true;
    btnOptExpensesRu.disabled = true;
    btnCountBudgetRu.disabled = true;

    for(let i = 0; i < optionalExpensesItemRu.length; i++){
        optionalExpensesItemRu[i].disabled = true;
        }

    chooseIncomeInputRu.disabled = true;
    savingsInputRu.disabled = true;
    chooseSumInputRu.disabled = true;
    choosePercentInputRu.disabled = true;
    yearInputRu.disabled = true;
    monthInputRu.disabled = true;
    dayInputRu.disabled = true;
    }  
}

waitingStart();