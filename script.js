/* =========================================================
   SPENDWISE - INTERACTIVE BUDGET APPLICATION
========================================================= */


/* =========================================================
   1. APPLICATION DATA
========================================================= */

let budget = 150000;
let income = 150000;

let expenses = [
    {
        id: 1,
        name: "Lunch",
        amount: 1200,
        category: "Food",
        icon: "🍔",
        date: "Today, 1:30 PM"
    },
    {
        id: 2,
        name: "Uber",
        amount: 850,
        category: "Transport",
        icon: "🚗",
        date: "Today, 9:15 AM"
    },
    {
        id: 3,
        name: "Supermarket",
        amount: 4500,
        category: "Food",
        icon: "🛒",
        date: "Yesterday, 5:45 PM"
    },
    {
        id: 4,
        name: "Electricity Bill",
        amount: 3200,
        category: "Utilities",
        icon: "💡",
        date: "2 days ago"
    },
    {
        id: 5,
        name: "Rent",
        amount: 35000,
        category: "Rent",
        icon: "🏠",
        date: "3 days ago"
    },
    {
        id: 6,
        name: "Movie",
        amount: 1500,
        category: "Entertainment",
        icon: "🎬",
        date: "4 days ago"
    },
    {
        id: 7,
        name: "Transport",
        amount: 1200,
        category: "Transport",
        icon: "🚗",
        date: "5 days ago"
    },
    {
        id: 8,
        name: "Savings",
        amount: 20000,
        category: "Savings",
        icon: "💰",
        date: "6 days ago"
    },
    {
        id: 9,
        name: "Groceries",
        amount: 34900,
        category: "Food",
        icon: "🛒",
        date: "7 days ago"
    }
];


/* =========================================================
   2. GET HTML ELEMENTS
========================================================= */

const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budgetInput");
const budgetMessage = document.getElementById("budgetMessage");

const totalBalance = document.getElementById("totalBalance");
const monthlyIncome = document.getElementById("monthlyIncome");
const totalExpenses = document.getElementById("totalExpenses");
const expensePercentage = document.getElementById("expensePercentage");
const balanceStatus = document.getElementById("balanceStatus");

const budgetStatus = document.getElementById("budgetStatus");

const categoryGrid = document.getElementById("categoryGrid");
const transactionList = document.getElementById("transactionList");

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");

const searchInput = document.getElementById("searchInput");
const clearButton = document.getElementById("clearButton");
const resetButton = document.getElementById("resetButton");

const sortCategoriesButton =
    document.getElementById("sortCategoriesButton");

const sidebarBudget =
    document.getElementById("sidebarBudget");

const sidebarProgress =
    document.getElementById("sidebarProgress");

const sidebarBudgetText =
    document.getElementById("sidebarBudgetText");

const notificationButton =
    document.getElementById("notificationButton");

const savingsAmount =
    document.getElementById("savingsAmount");

const recordCount =
    document.getElementById("recordCount");

const categoryCount =
    document.getElementById("categoryCount");


/* =========================================================
   3. FORMAT CURRENCY
========================================================= */

function formatCurrency(amount) {

    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0
    }).format(amount);
}


/* =========================================================
   4. CALCULATE TOTAL EXPENSES
========================================================= */

function calculateTotalExpenses() {

    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}


/* =========================================================
   5. CALCULATE CATEGORY TOTALS
========================================================= */

function calculateCategoryTotals() {

    const categoryTotals = {};

    for (let i = 0; i < expenses.length; i++) {

        const expense = expenses[i];

        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }

        categoryTotals[expense.category] += expense.amount;
    }

    return categoryTotals;
}


/* =========================================================
   6. UPDATE DASHBOARD
========================================================= */

function updateDashboard() {

    const total = calculateTotalExpenses();

    const balance = income - total;

    const percentage =
        income > 0
            ? (total / income) * 100
            : 0;

    totalBalance.textContent =
        formatCurrency(balance);

    monthlyIncome.textContent =
        formatCurrency(income);

    totalExpenses.textContent =
        formatCurrency(total);

    expensePercentage.textContent =
        percentage.toFixed(1) + "% of income";


    /* Decision Making */

    if (balance < 0) {

        balanceStatus.textContent =
            "⚠️ You have exceeded your income.";

        balanceStatus.className = "negative";

    } else if (percentage >= 80) {

        balanceStatus.textContent =
            "⚠️ You are close to your spending limit.";

        balanceStatus.className = "negative";

    } else {

        balanceStatus.textContent =
            "✓ You have money available.";

        balanceStatus.className = "positive";
    }


    recordCount.textContent =
        expenses.length;


    const categories =
        calculateCategoryTotals();

    categoryCount.textContent =
        Object.keys(categories).length;


    updateBudgetStatus(total);
    updateSidebar(total);
    displayCategories();
    displayTransactions();
    updateSavings();
}


/* =========================================================
   7. BUDGET STATUS
========================================================= */

function updateBudgetStatus(total) {

    const percentage =
        budget > 0
            ? (total / budget) * 100
            : 0;


    if (budget === 0) {

        budgetStatus.className =
            "budget-status";

        budgetStatus.innerHTML = `
            <strong>Set your budget</strong>
            <span>
                Enter a monthly budget to start.
            </span>
        `;

    } else if (total > budget) {

        const amountOver = total - budget;

        budgetStatus.className =
            "budget-status danger";

        budgetStatus.innerHTML = `
            <strong>⚠️ You are over budget!</strong>
            <span>
                You are over your budget by
                ${formatCurrency(amountOver)}.
            </span>
        `;

    } else if (percentage >= 80) {

        budgetStatus.className =
            "budget-status warning";

        budgetStatus.innerHTML = `
            <strong>⚠️ Budget Warning</strong>
            <span>
                You have used
                ${percentage.toFixed(1)}%
                of your budget.
            </span>
        `;

    } else if (percentage >= 50) {

        budgetStatus.className =
            "budget-status warning";

        budgetStatus.innerHTML = `
            <strong>👍 Keep an eye on your spending</strong>
            <span>
                You have used
                ${percentage.toFixed(1)}%
                of your budget.
            </span>
        `;

    } else {

        budgetStatus.className =
            "budget-status good";

        budgetStatus.innerHTML = `
            <strong>✅ Great job!</strong>
            <span>
                You are managing your budget well.
                Only ${percentage.toFixed(1)}%
                has been used.
            </span>
        `;
    }
}


/* =========================================================
   8. UPDATE SIDEBAR
========================================================= */

function updateSidebar(total) {

    const percentage =
        budget > 0
            ? (total / budget) * 100
            : 0;

    sidebarBudget.textContent =
        formatCurrency(budget);

    const progress =
        Math.min(percentage, 100);

    sidebarProgress.style.width =
        progress + "%";

    sidebarBudgetText.textContent =
        percentage.toFixed(0) +
        "% of your budget used";


    if (percentage > 100) {

        sidebarProgress.style.background =
            "#dc3545";

    } else if (percentage >= 80) {

        sidebarProgress.style.background =
            "#fd7e14";

    } else {

        sidebarProgress.style.background =
            "#198754";
    }
}


/* =========================================================
   9. DISPLAY CATEGORIES
========================================================= */

function displayCategories() {

    categoryGrid.innerHTML = "";

    const categoryTotals =
        calculateCategoryTotals();

    const categories =
        Object.entries(categoryTotals);


    for (let i = 0; i < categories.length; i++) {

        const category =
            categories[i][0];

        const amount =
            categories[i][1];

        const percentage =
            budget > 0
                ? (amount / budget) * 100
                : 0;

        const data =
            getCategoryData(category);

        const card =
            document.createElement("article");

        card.className =
            "category-card";

        card.innerHTML = `
            <div class="card-top">

                <div class="category-icon ${data.className}">
                    ${data.icon}
                </div>

                <span>${category}</span>

            </div>

            <h3>
                ${formatCurrency(amount)}
            </h3>

            <p>
                ${percentage.toFixed(1)}%
                of monthly budget
            </p>

            <div class="card-progress">

                <div
                    class="category-progress"
                    style="
                        width: ${Math.min(
                            percentage,
                            100
                        )}%;
                        background: ${data.color};
                    ">
                </div>

            </div>
        `;

        categoryGrid.appendChild(card);
    }


    if (categories.length === 0) {

        categoryGrid.innerHTML = `
            <p class="empty-message">
                No expenses have been added yet.
            </p>
        `;
    }
}


/* =========================================================
   10. CATEGORY INFORMATION
========================================================= */

function getCategoryData(category) {

    const data = {

        Food: {
            icon: "🍔",
            className: "food-icon",
            color: "#f43f5e"
        },

        Transport: {
            icon: "🚗",
            className: "transport-icon",
            color: "#3b82f6"
        },

        Rent: {
            icon: "🏠",
            className: "rent-icon",
            color: "#f59e0b"
        },

        Entertainment: {
            icon: "🎬",
            className: "entertainment-icon",
            color: "#9333ea"
        },

        Savings: {
            icon: "💰",
            className: "savings-icon",
            color: "#198754"
        },

        Utilities: {
            icon: "💡",
            className: "utilities-icon",
            color: "#eab308"
        },

        Shopping: {
            icon: "🛒",
            className: "shopping-icon",
            color: "#0284c7"
        },

        Other: {
            icon: "📦",
            className: "other-icon",
            color: "#6b7280"
        }
    };

    return data[category] || data.Other;
}


/* =========================================================
   11. DISPLAY TRANSACTIONS
========================================================= */

function displayTransactions() {

    transactionList.innerHTML = "";

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();

    const filteredExpenses = [];


    for (let i = 0; i < expenses.length; i++) {

        const expense =
            expenses[i];

        const nameMatches =
            expense.name
                .toLowerCase()
                .includes(searchTerm);

        const categoryMatches =
            expense.category
                .toLowerCase()
                .includes(searchTerm);


        if (
            nameMatches ||
            categoryMatches
        ) {

            filteredExpenses.push(expense);
        }
    }


    for (
        let i = filteredExpenses.length - 1;
        i >= 0;
        i--
    ) {

        const expense =
            filteredExpenses[i];

        const transaction =
            document.createElement("div");

        transaction.className =
            "transaction";

        transaction.innerHTML = `
            <div class="transaction-icon">
                ${expense.icon}
            </div>

            <div class="transaction-details">

                <strong>
                    ${escapeHTML(expense.name)}
                </strong>

                <small>
                    ${expense.date}
                    · ${expense.category}
                </small>

            </div>

            <strong class="expense">
                - ${formatCurrency(expense.amount)}
            </strong>

            <button
                class="delete-transaction"
                data-id="${expense.id}">

                Delete

            </button>
        `;


        const deleteButton =
            transaction.querySelector(
                ".delete-transaction"
            );


        deleteButton.addEventListener(
            "click",
            function() {

                deleteExpense(
                    expense.id
                );
            }
        );


        transactionList.appendChild(
            transaction
        );
    }


    if (filteredExpenses.length === 0) {

        transactionList.innerHTML = `
            <p class="empty-message">
                No transactions found.
            </p>
        `;
    }
}


/* =========================================================
   12. ADD EXPENSE
========================================================= */

expenseForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const name =
            expenseName.value.trim();

        const amount =
            Number(expenseAmount.value);

        const category =
            expenseCategory.value;


        if (name === "") {

            alert(
                "Please enter an expense name."
            );

            return;
        }


        if (amount <= 0) {

            alert(
                "Amount must be greater than zero."
            );

            return;
        }


        if (category === "") {

            alert(
                "Please select a category."
            );

            return;
        }


        const data =
            getCategoryData(category);


        const newExpense = {

            id: Date.now(),

            name: name,

            amount: amount,

            category: category,

            icon: data.icon,

            date: "Just now"
        };


        expenses.push(newExpense);


        expenseForm.reset();


        budgetMessage.textContent =
            "✓ Expense added successfully.";

        budgetMessage.style.color =
            "#198754";


        updateDashboard();
    }
);


/* =========================================================
   13. DELETE EXPENSE
========================================================= */

function deleteExpense(id) {

    const confirmed =
        confirm(
            "Delete this expense?"
        );


    if (!confirmed) {
        return;
    }


    for (let i = 0; i < expenses.length; i++) {

        if (expenses[i].id === id) {

            expenses.splice(i, 1);

            break;
        }
    }


    updateDashboard();
}


/* =========================================================
   14. CLEAR ALL EXPENSES
========================================================= */

clearButton.addEventListener(
    "click",
    function() {

        if (expenses.length === 0) {

            alert(
                "There are no expenses."
            );

            return;
        }


        const confirmed =
            confirm(
                "Delete all expense records?"
            );


        if (!confirmed) {
            return;
        }


        expenses = [];

        updateDashboard();
    }
);


/* =========================================================
   15. SEARCH TRANSACTIONS
========================================================= */

searchInput.addEventListener(
    "input",
    function() {

        displayTransactions();
    }
);


/* =========================================================
   16. SET BUDGET
========================================================= */

budgetForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const newBudget =
            Number(budgetInput.value);


        if (newBudget <= 0) {

            budgetMessage.textContent =
                "Please enter a valid budget.";

            budgetMessage.style.color =
                "#dc3545";

            return;
        }


        budget =
            newBudget;


        budgetMessage.textContent =
            "✓ Budget updated successfully.";

        budgetMessage.style.color =
            "#198754";


        budgetInput.value = "";


        updateDashboard();
    }
);


/* =========================================================
   17. SORT CATEGORIES
========================================================= */

sortCategoriesButton.addEventListener(
    "click",
    function() {

        const totals =
            calculateCategoryTotals();

        const categories =
            Object.entries(totals);


        categories.sort(
            function(a, b) {
                return b[1] - a[1];
            }
        );


        categoryGrid.innerHTML = "";


        for (let i = 0; i < categories.length; i++) {

            const category =
                categories[i][0];

            const amount =
                categories[i][1];

            const percentage =
                budget > 0
                    ? (amount / budget) * 100
                    : 0;

            const data =
                getCategoryData(category);

            const card =
                document.createElement("article");

            card.className =
                "category-card";

            card.innerHTML = `
                <div class="card-top">

                    <div
                        class="category-icon ${data.className}">

                        ${data.icon}

                    </div>

                    <span>
                        ${category}
                    </span>

                </div>

                <h3>
                    ${formatCurrency(amount)}
                </h3>

                <p>
                    ${percentage.toFixed(1)}%
                    of monthly budget
                </p>

                <div class="card-progress">

                    <div
                        class="category-progress"
                        style="
                            width: ${Math.min(
                                percentage,
                                100
                            )}%;
                            background: ${data.color};
                        ">
                    </div>

                </div>
            `;

            categoryGrid.appendChild(card);
        }


        sortCategoriesButton.textContent =
            "✓ Sorted by Amount";
    }
);


/* =========================================================
   18. NOTIFICATION
========================================================= */

notificationButton.addEventListener(
    "click",
    function() {

        const total =
            calculateTotalExpenses();


        if (total > budget) {

            alert(
                "⚠️ Budget Alert\n\n" +
                "You are over your monthly budget."
            );

        } else if (
            budget > 0 &&
            total >= budget * 0.8
        ) {

            alert(
                "⚠️ Budget Alert\n\n" +
                "You have used 80% or more of your budget."
            );

        } else {

            alert(
                "🔔 No urgent notifications.\n\n" +
                "Your spending is currently under control."
            );
        }
    }
);


/* =========================================================
   19. CALCULATE SAVINGS
========================================================= */

function updateSavings() {

    let savings = 0;


    for (let i = 0; i < expenses.length; i++) {

        if (
            expenses[i].category === "Savings"
        ) {

            savings += expenses[i].amount;
        }
    }


    savingsAmount.textContent =
        formatCurrency(savings);
}


/* =========================================================
   20. RESET DEMO DATA
========================================================= */

resetButton.addEventListener(
    "click",
    function() {

        const confirmed =
            confirm(
                "Reset SpendWise to the original demo data?"
            );


        if (!confirmed) {
            return;
        }


        budget = 150000;
        income = 150000;


        expenses = [
            {
                id: 1,
                name: "Lunch",
                amount: 1200,
                category: "Food",
                icon: "🍔",
                date: "Today, 1:30 PM"
            },
            {
                id: 2,
                name: "Uber",
                amount: 850,
                category: "Transport",
                icon: "🚗",
                date: "Today, 9:15 AM"
            },
            {
                id: 3,
                name: "Supermarket",
                amount: 4500,
                category: "Food",
                icon: "🛒",
                date: "Yesterday, 5:45 PM"
            },
            {
                id: 4,
                name: "Electricity Bill",
                amount: 3200,
                category: "Utilities",
                icon: "💡",
                date: "2 days ago"
            },
            {
                id: 5,
                name: "Rent",
                amount: 35000,
                category: "Rent",
                icon: "🏠",
                date: "3 days ago"
            },
            {
                id: 6,
                name: "Movie",
                amount: 1500,
                category: "Entertainment",
                icon: "🎬",
                date: "4 days ago"
            },
            {
                id: 7,
                name: "Transport",
                amount: 1200,
                category: "Transport",
                icon: "🚗",
                date: "5 days ago"
            },
            {
                id: 8,
                name: "Savings",
                amount: 20000,
                category: "Savings",
                icon: "💰",
                date: "6 days ago"
            },
            {
                id: 9,
                name: "Groceries",
                amount: 34900,
                category: "Food",
                icon: "🛒",
                date: "7 days ago"
            }
        ];


        updateDashboard();


        alert(
            "SpendWise has been reset."
        );
    }
);


/* =========================================================
   21. SIDEBAR NAVIGATION
========================================================= */

const navItems =
    document.querySelectorAll(".nav-item");


for (let i = 0; i < navItems.length; i++) {

    navItems[i].addEventListener(
        "click",
        function() {

            for (
                let j = 0;
                j < navItems.length;
                j++
            ) {

                navItems[j]
                    .classList
                    .remove("active");
            }


            this.classList.add("active");
        }
    );
}


/* =========================================================
   22. ESCAPE HTML
========================================================= */

function escapeHTML(text) {

    const element =
        document.createElement("div");

    element.textContent = text;

    return element.innerHTML;
}


/* =========================================================
   23. START APPLICATION
========================================================= */

updateDashboard();
