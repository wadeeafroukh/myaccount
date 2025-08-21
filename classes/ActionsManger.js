import Action from "./Action.js";

export default class ActionsManger {
  constructor() {
    this.actions = [];
    this.balance = 0;
  }
  addAction(action) {
    this.actions.push(action);
    this.calcBalance();
  }

   deleteAction(id) {
    let indexToDelete = this.actions.findIndex((action) => action.id == id);
    this.actions.splice(indexToDelete, 1);
    this.calcBalance();
  }

  updateAction(id, newAmount) {
    let indextoUpdate = this.actions.findIndex((action) => action.id == id);
    this.actions[indextoUpdate].amount = newAmount;
    if (newAmount < 0) this.actions[indextoUpdate].type = "expense";
    else this.actions[indextoUpdate].type = "income";
    this.calcBalance();
  }
  calcBalance() {
    this.balance = this.actions.reduce((total, currvalue) => total + currvalue.amount , 0

    );
  }
}


 // amount = $$
 // actions = []
// Action = (type, desc, amount)
// id 