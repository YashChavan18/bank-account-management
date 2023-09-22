// Define a BankAccount class
class BankAccount {
    constructor(accountHolder, initialBalance, accountType) {
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
        this.accountType = accountType;
        this.transactionHistory = [];
    }
    
    deposit(amount) {
        this.balance += amount;
        this.transactionHistory.push(`Deposited $${amount}`);
    }
    
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            this.transactionHistory.push(`Withdrawn $${amount}`);
        } else {
            throw new Error("Insufficient funds.");
        }
    }
    
    getTransactionHistory() {
        return this.transactionHistory;
    }
}

// Initialize an empty account object
let account = null;

// Add event listeners for buttons and implement actions using switch statements
const buttons = document.querySelectorAll("button");
const messageDiv = document.getElementById("message");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const action = button.id;
        switch (action) {
            case "createAccount":
                createAccount();
                break;
            case "deposit":
            case "withdraw":
                performTransaction(action);
                break;
            case "checkBalance":
                displayAccountInfo();
                break;
            case "showHistory":
                displayTransactionHistory();
                break;
            default:
                showMessage("Invalid action.", "error");
        }
    });
});

function createAccount() {
    const accountHolder = document.getElementById("accountHolder").value.trim();
    const initialBalance = parseFloat(document.getElementById("initialBalance").value);
    const accountType = document.getElementById("accountType").value;

    if (accountHolder !== "" && !isNaN(initialBalance) && initialBalance >= 0) {
        account = new BankAccount(accountHolder, initialBalance, accountType);
        displayAccountInfo();
        showMessage("Account created successfully!", "success");
    } else {
        showMessage("Invalid input. Please provide valid account details.", "error");
    }
}

function performTransaction(action) {
    const amount = parseFloat(prompt(`Enter the ${action === "deposit" ? "deposit" : "withdrawal"} amount:`));
    if (!isNaN(amount) && amount > 0) {
        try {
            if (action === "deposit") {
                account.deposit(amount);
            } else {
                account.withdraw(amount);
            }
            displayAccountInfo();
            showMessage(`${action.charAt(0).toUpperCase() + action.slice(1)} successful!`, "success");
        } catch (error) {
            showMessage(error.message, "error");
        }
    } else {
        showMessage(`Invalid amount. Please enter a valid ${action} amount.`, "error");
    }
}

function displayTransactionHistory() {
    const historyList = document.getElementById("transactionHistory");
    historyList.innerHTML = "";
    const transactions = account.getTransactionHistory();
    
    if (transactions.length === 0) {
        showMessage("No transaction history available.", "info");
        return;
    }

    transactions.forEach(transaction => {
        const listItem = document.createElement("li");
        listItem.textContent = transaction;
        historyList.appendChild(listItem);
    });
}

function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.classList.remove("success", "error", "info");
    messageDiv.classList.add(type);
    messageDiv.style.display = "block";
}

function displayAccountInfo() {
    document.getElementById("displayAccountHolder").textContent = account.accountHolder;
    document.getElementById("displayAccountType").textContent = account.accountType;
    document.getElementById("displayBalance").textContent = account.balance.toFixed(2);
}
