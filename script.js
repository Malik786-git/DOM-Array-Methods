// Get DOM Elements...
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const filterBtn = document.getElementById('filter');
const sortBtn = document.getElementById('sort');
const sumBtn = document.getElementById('sum');

// initialize data array
let data = [];


// Fetch Random User from randomuser.me API

async function getRandomUser(params) {
    // wait for the results from API...
    const res = await fetch('https://randomuser.me/api/');
    //    wait for response to convert into JSON
    const data = await res.json();

    // console.log(data);

    // Get the user name
    const user = data.results[0];
    // console.log(user);

    // Create the New User
    const newUser = {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        balance: Math.floor(Math.random() * 1000000)
    }
    // console.log(newUser);

    // Add new user into data array
    addData(newUser);
}

// Function to add user data into data array...

function addData(newUser) {

    data.push(newUser);
    // console.log("dataArray", data);
    // Update Dom to display users in the data array...
    updateDOM();

}

// for formated Number as money
function formatNumberToDollar(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}

// function to double money of all users
function doubleMoney() {
    data = data.map(user => {
        return { ...user, balance: user.balance * 2 };
    })
    updateDOM();
}

// FilterMillionaires

function filterMillionaires() {
    data = data.filter(user => user.balance > 1_000_000);
    // Update with New User
    updateDOM();
}

// sort Wealth 
function sortWealth() {
    // sort users by balance using compare function inside sort.
    data.sort((a,b)=>a.balance - b.balance);
    updateDOM();
}
// for total money of all users
function totalBalance() {
    // accumulator start at 0 
    const balance = data.reduce((acc, user) => acc+=user.balance, 0);
    console.log(balance);
    const balanceElement = document.createElement('div');
    balanceElement.innerHTML = `<h3>Total Balance: ${formatNumberToDollar(balance)}</h3>`;
    main.appendChild(balanceElement); 
    
}

// Update UI
function updateDOM(userData = data) {
    // clear previous UI
    main.innerHTML = ` <h2><strong>User</strong>Wealth</h2>`;
    userData.forEach((user) => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        userDiv.innerHTML = `<strong>${user.name}</strong>${formatNumberToDollar(user.balance)}`;
        main.appendChild(userDiv);
    })

}


// Event listerners...
// add user
addUserBtn.onclick = getRandomUser;
// double money
doubleBtn.onclick = doubleMoney;
// filter Millionaires
filterBtn.onclick = filterMillionaires;
// sorted wealth
sortBtn.onclick = sortWealth;
// sum all balance of user
sumBtn.onclick = totalBalance;