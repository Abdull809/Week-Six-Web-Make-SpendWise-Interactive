💰 SpendWise

SpendWise is an interactive personal budgeting dashboard built using HTML, CSS, and JavaScript. The application helps users track their monthly budget, record expenses, view spending categories, and monitor their financial activity.

Improvements Made This Week

This week, I improved SpendWise by adding JavaScript functionality that makes the dashboard interactive and dynamic.

The main improvements include:

Added the ability to set a monthly budget.

Added the ability to add new expenses.

Added expense categories such as Food, Transport, Rent, Utilities, Entertainment, and Savings.

Added automatic calculation of total expenses.

Added automatic calculation of the remaining balance.

Added budget usage percentages.

Added spending category totals.

Added a recent transactions section.

Added the ability to delete individual expenses.

Added a search feature for transactions.

Added a sorting feature for spending categories.

Added a Clear All button for transactions.

Added a Reset Demo Data button.

Added budget status messages based on spending.

Made the dashboard update automatically when data changes.

Added responsive styling so the dashboard works on different screen sizes.

1. Decision Making with Conditionals

Conditional statements are used to evaluate the user's spending and determine the appropriate feedback.

For example, SpendWise checks how much of the budget has been used.

if (percentage >= 100) {
    message = "⚠️ You have exceeded your budget.";
} else if (percentage >= 80) {
    message = "⚠️ You are getting close to your budget limit.";
} else {
    message = "👍 Keep an eye on your spending.";
}


This allows SpendWise to provide different messages depending on the user's financial situation.

Conditionals are also used when calculating the remaining balance and determining whether the user has money available.

2. Arrays and Multiple Records

Expenses are stored inside an array instead of using separate variables for every expense.

For example:

let expenses = [
    {
        name: "Groceries",
        amount: 34900,
        category: "Food"
    },
    {
        name: "Savings",
        amount: 20000,
        category: "Savings"
    },
    {
        name: "Transport",
        amount: 1200,
        category: "Transport"
    }
];


Using an array makes it easier to store, add, delete, search, and process multiple expense records.

When a user adds a new expense, a new object is added to the array.

3. Processing Data with Loops

Loops are used to process the expense records stored in the array.

For example, the application can loop through all expenses to calculate the total amount spent.

let total = 0;

expenses.forEach(function(expense) {
    total += expense.amount;
});


Loops are also used to calculate spending by category and display transaction records on the dashboard.

This means the application does not need to manually calculate every expense.

4. DOM Manipulation

SpendWise uses JavaScript DOM manipulation to update the webpage dynamically.

For example:

document.getElementById("totalExpenses").textContent =
    formatCurrency(totalExpenses);


This changes the expense amount displayed on the webpage.

The DOM is also used to:

Display transactions.

Display spending categories.

Update the total balance.

Update the budget percentage.

Update the number of expense records.

Update the number of active categories.

Display budget warning messages.

Update the savings amount.

The user therefore sees the results directly on the dashboard instead of only seeing them in the browser console.

5. User Interactions and Events

Event listeners are used to allow users to interact with SpendWise.

For example, the expense form listens for a submit event:

expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Add expense
    // Update data
    // Refresh dashboard
});


Other events are used for:

Adding expenses.

Setting the monthly budget.

Searching transactions.

Deleting expenses.

Sorting categories.

Clearing transactions.

Resetting demo data.

Clicking navigation elements.

Showing notifications.

These events connect the user's actions to the JavaScript logic.

6. Connecting Everything Together

The application follows a clear flow:

User Action
     ↓
Event Listener
     ↓
JavaScript Logic
     ↓
Update Array/Data
     ↓
Calculate New Values
     ↓
Update DOM
     ↓
Dashboard Changes


For example, when a user adds an expense:

The user enters the expense name, amount, and category.

The form submit event is triggered.

JavaScript reads the form values.

A new expense object is added to the expenses array.

JavaScript recalculates the total expenses.

JavaScript recalculates the remaining balance.

Category totals are recalculated.

The transaction list is updated.

The dashboard displays the new information.

7. Challenges Encountered

One challenge was making sure that the information displayed on the dashboard stayed synchronized with the expense data.

Initially, some values were written directly into the HTML. This meant that the displayed totals could become incorrect when expenses changed.

I resolved this by storing expenses in an array and using JavaScript functions to recalculate the totals and update the DOM whenever the data changes.

Another challenge was making the different buttons and forms work together. I solved this by using event listeners for the different user actions and calling the dashboard update functions after each change.

I also had to make sure the HTML element IDs matched the IDs used in JavaScript. Matching these IDs correctly allowed JavaScript to find and update the correct elements on the webpage.

8. Technologies Used

HTML5

CSS3

JavaScript

DOM Manipulation

JavaScript Arrays

JavaScript Loops

Conditional Statements

Event Listeners

Conclusion

SpendWise has been upgraded from a static dashboard into an interactive budgeting application.

The project demonstrates how JavaScript can be used to make decisions, manage collections of data, process records using loops, manipulate the DOM, and respond to user actions.

The result is a functional budgeting dashboard where user actions update the application's data and are immediately reflected on the webpage.