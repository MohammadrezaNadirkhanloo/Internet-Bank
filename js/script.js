//Data
const account1 = {
  owner: "MohammadReza Nadirkhanloo",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
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

//Code
const displayList = function (account) {
  listGroup.innerHTML = "";
  account.forEach((element, index) => {
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
    listGroup.insertAdjacentHTML("afterbegin", html); // beforeend
  });
};
displayList(account1.movements);

const createUserName = function (arr) {
  arr.forEach((item) => {
    item.username = item.owner
      .toUpperCase()
      .split(" ")
      .map((item) => item[0])
      .join("");
  });
};

createUserName(accounts);

const allMany = function (item) {
  const balance = item.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

allMany(account1.movements);
