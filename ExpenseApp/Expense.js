let inputNameExpense = document.getElementById('expensename');
let inputDateExpense = document.getElementById("expensedate");
let inputAmountExpense = document.getElementById("expenseamount");
let addExpensebtn = document.getElementById("addexpense");
let expenseTable = document.querySelector(".expenses");

addExpensebtn.addEventListener('click', addExpense);

if (inputNameExpense == null || inputDateExpense == null || inputAmountExpense == null) {
    throw Error();
}

function addExpense(e) {
    e.preventDefault();
    if (inputNameExpense.value != "" && inputDateExpense.value != "" && inputAmountExpense.value != "") {
        let newExpenseEl = createElem("tr");

        let newExpenseName = createElem("td");
        appentToEl(newExpenseEl, newExpenseName);
        appentInnerHTML(newExpenseName, inputNameExpense.value);

        let newExpenseDate = createElem("td");
        appentToEl(newExpenseEl, newExpenseDate);
        appentInnerHTML(newExpenseDate, inputDateExpense.value);

        let newExpenseAmount = createElem("td");
        appentToEl(newExpenseEl, newExpenseAmount);
        appentInnerHTML(newExpenseAmount, `$${inputAmountExpense.value}`);

        appentToEl(expenseTable, newExpenseEl);

        inputDateExpense.value = "";
        inputAmountExpense.value = "";
        inputNameExpense.value = "";
    }
}

function createElem(el) {
    return document.createElement(el);
}

function appentToEl(to, from) {
    to.appendChild(from);
}

function appentInnerHTML(to, text) {
    to.innerHTML = text;
}

function addToClassList(to, item) {
    to.classList.add(item);
}