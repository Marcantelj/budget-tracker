// holds out list of mapped expenses
let expenses = JSON.parse(localStorage.getItem('savedBudget')) || [];

// our html elements by id
const description = document.getElementById('description');
const cost = document.getElementById('cost');
const expenseContainer = document.getElementById('expenseContainer');
const addExpensebtn = document.getElementById('addExpenses-btn')
const totalDisplay = document.getElementById('totalDisplay')


function renderBudget() {
    expenseContainer.innerHTML = ''
    let totalCost = 0;
    expenses.forEach((expense, index) => {
        const expenseHTML = `
        <div class="newExpenseContainer">
            <p class='expense'>ID: ${index+1} - ${expense.description}: $${expense.cost}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        </div>
        `;
        // adds html to existing container
        expenseContainer.innerHTML += expenseHTML;
        // adds html to totalCost
        totalCost += expense.cost;
    });


    
    if (totalDisplay) {
        totalDisplay.innerText = `Total Budget: ($${totalCost.toFixed(2)})`;
    }
}

// THE DELETE ENGINE: Listen to container for clicks on dynamic buttons
expenseContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')){
        const targetIndex = event.target.getAttribute('data-index');
        expenses.splice(targetIndex, 1);
        localStorage.setItem('savedBudget', JSON.stringify(expenses));
    }
    renderBudget();
})

addExpensebtn.addEventListener('click', () => {
    if (description.value.trim() === '' && cost.value.trim() === '') {
        return; // cancels out if no value 
    }
    // creates new description and appends it to tasks array
    const newExpense = {
        description: description.value.trim(),
        cost: Number(cost.value)
    };

    expenses.push(newExpense);
    localStorage.setItem('savedBudget', JSON.stringify(expenses));
    description.value = ''; // rests the value of description to '' 
    cost.value = ''; // rests the value of cost to ''
    renderBudget(); // calls renderBudget so we can display the new task
});

renderBudget();