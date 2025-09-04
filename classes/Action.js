export default class Action {
  constructor(type, description, amount , date = new Date()) {
    this.type = type;
    this.description = description;
    this.amount = type == "income" ? amount : -amount;
    this.date = date
    this.id = Math.ceil(Math.random() * 1000);
  }
  get(varName) {
    return this[varName];
  }
  set(varName, newValue) {
    this[varName] = newValue;
  }
}

