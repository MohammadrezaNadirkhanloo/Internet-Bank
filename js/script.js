//Data
const account1 = {
  owner: "MohammadReza Nadirkhanloo",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, -580],
  interestRate: 1.2,
  pin: 1111,
};
const account2 = {
  owner: "Mohammad khanloo",
  movements: [5000, 3400, -350, -3000, -1000, -130, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};
const account3 = {
  owner: "Amir Reza",
  movements: [250, -450, 400, -300, 650, -130, 400, -130],
  interestRate: 0.7,
  pin: 3333,
};
const account4 = {
  owner: "Ali khanloo",
  movements: [400, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];

//DOM
const listGroup = document.querySelector(".list-group");
const labelBalance = document.querySelector(".balance");
const summary = document.querySelector(".summary_value");
const sumOut = document.querySelector(".sumOut");
const sumINTEREST = document.querySelector(".sumINTEREST");
const btnLogin = document.querySelector(".login__btn");
const userLogin = document.querySelector(".login_user");
const passLogin = document.querySelector(".login_pass");
const textLabel = document.querySelector(".welcom");
const dataBox = document.querySelector(".box_data");
const inputTransfer = document.querySelector(".input_transfer");
const inputAmount = document.querySelector(".input_amount");
const btnTransfer = document.querySelector(".btn_transfer");
const userDelete = document.querySelector(".input_delete_user");
const passwordDelete = document.querySelector(".input_delete_pass");
const btnDelete = document.querySelector(".btn_delete");
const inputrequest = document.querySelector(".input_request");
const btnrequest = document.querySelector(".btn_request");
const btnSort = document.querySelector(".btn_sort");
const labelDate = document.querySelector(".label_date");
const Timer = document.querySelector(".timer");

//Code JS
const displayList = function (account, sort = false) {
  listGroup.innerHTML = "";
  account.movements.forEach((element, index) => {
    const bg = element > 0 ? "success" : "danger";
    const text = element > 0 ? "deposit" : "withdrawal";
    const html = `
    <li class="list-group-item py-3 px-5">
    <div class="d-flex align-items-center">
      <div class="flex-grow-1 d-flex gap-5 align-items-center">
        <p
          class="text_li px-2 py-1 rounded-pill bg-${bg} bg-gradient"
        >
          ${index + 1} ${text}
        </p>
      </div>
      <div>
        <p class="fs-4 fw-bold">${element}€</p>
      </div>
    </div>
  </li>
    `;
    sort
      ? listGroup.insertAdjacentHTML("afterbegin", html)
      : listGroup.insertAdjacentHTML("beforeend", html);
  });
};

const createUserName = function (arr) {
  arr.forEach((item) => {
    item.username = item.owner
      .toLowerCase()
      .split(" ")
      .map((item) => item[0])
      .join("");
  });
};

createUserName(accounts);

const allMany = function (item) {
  item.balance = item.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${item.balance} EUR`;
};

const checkSum = function (data) {
  const check = data.movements
    .filter((item) => item > 0)
    .reduce((acc, dataFilter) => acc + dataFilter, 0);
  summary.textContent = `${check} €`;
  const checkOut = data.movements
    .filter((item) => item < 0)
    .reduce((acc, dataFilter) => acc + dataFilter, 0);
  sumOut.textContent = `${checkOut} €`;
  const checkINTEREST = data.movements
    .filter((item) => item > 0)
    .map((newData) => (newData * data.interestRate) / 100)
    .reduce((acc, dataFilter) => acc + dataFilter);

  sumINTEREST.textContent = `${checkINTEREST.toFixed(2)} €`;
};
const checkTimer = function () {
  let time = 300;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    Timer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      dataBox.classList.add("d-none");
      textLabel.classList.remove("f_Ballistic");
      textLabel.textContent = "Login in to get started";
    }
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
const updateUI = function (account) {
  checkSum(account);
  allMany(account);
  displayList(account);
};

let userName, timer;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  loginUsercheck = userLogin.value.toLowerCase().trim();
  const user = accounts.find((item) => item.username === loginUsercheck);
  if (user?.pin === Number(passLogin.value)) {
    if (timer) clearInterval(timer);
    timer = checkTimer();
    textLabel.textContent = `${user.owner}`;
    textLabel.classList.add("f_Ballistic");
    dataBox.classList.remove("d-none");
    userLogin.value = passLogin.value = "";
    updateUI(user);
    userName = user;
  } else {
    alert("Wrong username or password");
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const many = Math.floor(+inputAmount.value);

  const receive = accounts.find(
    (item) => item.username === inputTransfer.value
  );
  if (receive && userName.balance >= many) {
    userName.movements.push(-many);
    updateUI(userName);
    receive.movements.push(many);
    inputTransfer.value = inputAmount.value = "";
    clearInterval(timer);
    timer = checkTimer();
  } else {
    alert("error");
  }
});

btnrequest.addEventListener("click", function (e) {
  e.preventDefault();
  const valueInt = Math.floor(+inputrequest.value);
  const check = userName.movements.some((item) => item >= valueInt * 0.6);
  inputrequest.value = "";
  if (check && valueInt > 0) {
    userName.movements.push(valueInt);
    updateUI(userName);
    clearInterval(timer);
    timer = checkTimer();
  } else {
    alert("error");
  }
});

btnDelete.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    userDelete.value === userName.username &&
    Number(passwordDelete.value) === userName.pin
  ) {
    const indexUser = accounts.findIndex(
      (item) => item.username === userDelete.value
    );
    accounts.splice(indexUser, 1);
    dataBox.classList.add("d-none");
    textLabel.classList.remove("f_Ballistic");
    textLabel.textContent = "Login in to get started";
  } else {
    alert("error");
  }
});

let sort = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayList(userName, !sort);
  sort = !sort;
});

const now = new Date();
const option = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
};
const local = navigator.language;

labelDate.textContent = new Intl.DateTimeFormat(
  navigator.language,
  option
).format(now);

document.addEventListener("DOMContentLoaded", (e) => {
  document.querySelector(".btn_help").click();
});
