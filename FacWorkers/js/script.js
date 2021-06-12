'use strict';

// Data
const factoryAccount1 = {
  factoryName: 'Factory 1',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  password: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-06-10T17:01:17.194Z',
    '2021-06-05T23:36:17.929Z',
    '2021-06-08T10:51:36.790Z',
  ],
};

const factoryAccount2 = {
  factoryName: `Factory 2`,
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  password: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const factoryAccount3 = {
  factoryName: 'Factory 3',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  password: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};

const factoryAccount4 = {
  factoryName: 'Factory 4',
  movements: [430, 1000, 700, 50, 90],
  password: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const factoryAccount5 = {
  factoryName: 'Factory 5',
  movements: [430, 1000, 700, 50, 90, -10],
  password: 5555,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-11-18T21:31:17.178Z',
  ],
};

const accounts = [
  factoryAccount1,
  factoryAccount2,
  factoryAccount3,
  factoryAccount4,
  factoryAccount5,
];

// Elements
const navEl = document.querySelector('.nav');
const bodyEl = document.querySelector('body');
const startEl = document.querySelector('.start');
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelTotalWorkers = document.querySelector('.totalWorkers__value');
const labelSumNeeded = document.querySelector('.summary__value--needed');
const labelSumTransfered = document.querySelector(
  '.summary__value--transfered'
);
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLoginStart = document.querySelector('.login--btn');
const btnLoginNav = document.querySelector('.login__btn__nav');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnGetMore = document.querySelector('.form__btn--getMore');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputUsername = document.querySelector('.input--user');
const inputPassword = document.querySelector('.input--password');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPassword = document.querySelector('.login__input--password');

const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferWorkers = document.querySelector('.form__input--workers');

const inputGetMoreWorkers = document.querySelector(
  '.form__input--getMore-workers'
);
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePassword = document.querySelector('.form__input--pin');

let currentAccount, timer;

containerApp.style.display = 'none';

const appLogin = function () {
  currentAccount = accounts.find(
    (acc) =>
      acc.username === inputLoginUsername.value ||
      acc.username === inputUsername.value
  );
  if (
    currentAccount?.password === Number(inputLoginPassword.value) ||
    currentAccount?.password === Number(inputPassword.value)
  ) {
    console.log(currentAccount);
    //Display UI and Message
    //factory name
    labelWelcome.textContent = `${currentAccount.factoryName}`;
    //showing app data
    containerApp.style.opacity = 100;

    if (containerApp.style.display === 'none') {
      //display container app
      containerApp.style.display = 'grid';

      //show nav bar
      navEl.classList.remove('hidden');

      //hide background and start screen
      bodyEl.style.backgroundImage = 'url(../images/back.jpg)';
      startEl.style.display = 'none';
    }

    //timer
    if (timer) clearInterval(timer);
    //logout Timer
    timer = startLogoutTimer();

    //Update UI
    updateUI(currentAccount);

    //Current Date functionaliy when user login to show the available workers.
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //Clear the input fields of Login
    inputLoginUsername.value = inputLoginPassword.value = '';
    inputUsername.value = inputPassword.value = '';
    inputLoginPassword.blur();
  }
};

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    //In each call, show the remaining time in UI.
    labelTimer.textContent = `${min}:${sec}`;

    time--; //decrese 1 second

    //When timer is 0, stop timer and logout the user
    if (time === 0) {
      clearInterval(timer);
      hideAppUI();
    }
  };
  // Set time to 5 minutes
  let time = 300;

  // Call the timer every second
  tick();
  timer = setInterval(tick, 1000);

  return timer;
};

const updateUI = function (acc) {
  //Display Movements
  displayMovements(acc);

  //Display Current Workers
  calDisplayFactoryWorkers(acc);

  //Display Summary
  calDisplaySummary(acc.movements);
};

const hideAppUI = function () {
  containerApp.style.display = 'none';
  navEl.classList.add('hidden');

  //display login Screen
  startEl.style.display = 'flex';
  bodyEl.style.backgroundImage = 'url(../images/background-image.jpg)';
};

//Login button click from Nav Bar
btnLoginNav.addEventListener('click', function (e) {
  //prevent form submitting
  e.preventDefault();

  appLogin();
});

//Login Button click from Starter Page
btnLoginStart.addEventListener('click', function (e) {
  //prevent form submitting
  e.preventDefault();

  appLogin();
});

//computing factory ID for login purpose
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.factoryName
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};

createUserName(accounts);

//display summary result of workers needed and workers transfered
const calDisplaySummary = function (movements) {
  const need = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumNeeded.textContent = `${need}`;

  const transfer = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumTransfered.textContent = `${Math.abs(transfer)}`;
};

calDisplaySummary(factoryAccount1.movements);

const formatMovementsDate = function (date) {
  const calDayPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calDayPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

//display movements
const displayMovements = function (acc, sort = false) {
  //for empty container
  containerMovements.innerHTML = '';

  //sorting
  const movs = sort ? acc.slice().sort((a, b) => a - b) : acc.movements;
  console.log(movs);

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'received' : 'transfered';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date);

    const html = `<div class="movements__row">
                      <div class="movements__type movements__type--${type}">${type}</div>
                      <div class="movements__date">${displayDate}</div>
                      <div class="movements__value">${Math.abs(mov)} </div>
                    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//calculate and print balance
const calDisplayFactoryWorkers = function (acc) {
  acc.availableWorkers = acc.movements.reduce((acc, cur) => acc + cur, 0);

  labelTotalWorkers.textContent = `${acc.availableWorkers}`;
};

//Workers Transfer Functionality
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const workers = Number(inputTransferWorkers.value);
  const reciverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferTo.value = inputTransferWorkers.value = '';

  if (
    workers > 0 &&
    reciverAcc &&
    currentAccount.availableWorkers >= workers &&
    reciverAcc?.username !== currentAccount.username
  ) {
    //Doing the Transfer
    currentAccount.movements.push(-workers);
    reciverAcc.movements.push(workers);

    //Add Transfer Date
    currentAccount.movementsDates.push(new Date());
    reciverAcc.movementsDates.push(new Date());

    //Update UI
    updateUI(currentAccount);

    //reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

//Get More Workers Functionality
btnGetMore.addEventListener('click', function (e) {
  e.preventDefault();

  const workers = Number(inputGetMoreWorkers.value);

  if (
    workers > 0 &&
    currentAccount.movements.some((mov) => mov >= workers * 0.1)
  ) {
    setTimeout(function () {
      currentAccount.movements.push(workers);

      //Add Date
      currentAccount.movementsDates.push(new Date());

      //Update UI
      updateUI(currentAccount);

      //reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 3000);
  }

  inputGetMoreWorkers.value = '';
});

//Close Account Functionality
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  let confrimUsername = inputCloseUsername.value;
  let confrimPassword = Number(inputClosePassword.value);

  if (
    currentAccount.username === confrimUsername &&
    currentAccount.password === confrimPassword
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);

    hideAppUI();
  }

  confrimUsername = confrimPassword = '';
});

//to preserve the state of sorting
let sorted = false;

//Sorting Functionality
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
