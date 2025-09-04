import Action from "./classes/Action.js";
import ActionsManger from "./classes/ActionsManger.js";
let manger = new ActionsManger();
manger.addAction(new Action("income", "salary", 35000));
manger.addAction(new Action("income", "valorant", 4507));
manger.addAction(new Action("expense", "food", 5000));
console.log(manger.actions);
console.log(manger.balance);

let savedData = localStorage.getItem("manger");
if (savedData) {
  try {
    const raw = JSON.parse(savedData);
    manger.actions = raw.map(
      (a) => new Action(a.type, a.description, a.amount, new Date(a.date))
    );
    manger.calcBalance();
  } catch (error) {
    alert(`Bad saved data: ${error}`);
  }
}

let setTomemory = () => {
  localStorage.setItem("manger", JSON.stringify(manger.actions));
};

let formatDateTime = (d) =>
  new Date(d).toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
let showActionsinTable = () => {
  let table = document.getElementById("actions");
  table.innerHTML = "";
  let rows = [...manger.actions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  for (const action of manger.actions) {
    table.innerHTML += `
         <tr class= ${action.type == "income" ? "text-success" : "text-danger"}>
         
         <td>${action.description} </td>
         
         
         <td>${action.amount}</td>

         
         <td>${formatDateTime(action.date)}</td>
         <td style="cursor: pointer" onclick="updateAmount(${
           action.id
         })"><i class="fa-solid fa-pen-to-square"></i></td>
         
         <td style="cursor: pointer" onclick="deleteAction(${
           action.id
         })"><i class="fa-solid fa-trash"></i></td>
         </tr>
         `;
  }
  const alertEl = (document.querySelector(
    ".alert"
  ).innerHTML = `Balance: ${manger.balance}₪`);
  if (alertEl) alertEl.innerHTML = `Balance ${manger.balance}₪`;
};

window.addnewAction = () => {
  let type = document.getElementById("type").value;
  let amount = Number(document.getElementById("amount").value);
  let description = document.getElementById("description").value;
  if (description === "" || amount <= 0) {
    alert(
      "please enter valid information (the number should be greater than zero!)"
    );
    return;
  }
  manger.addAction(new Action(type, description, amount));
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  showActionsinTable();
  setTomemory();

};

window.updateAmount = (actionId) => {
  let newAmount = prompt("Enter new amount please: ");
  if (newAmount == null || newAmount == "")
    alert("Somthing went wrong try again");
  else {
    manger.updateAction(actionId, + newAmount);
    showActionsinTable();
    setTomemory();
  }
};

window.deleteAction = (actionId) => {
  if (confirm("are you sure?")) {
    manger.deleteAction(actionId);
    showActionsinTable();
    setTomemory();
  }
};

showActionsinTable();
// amount = $$
// action = (type, desc, amount)
