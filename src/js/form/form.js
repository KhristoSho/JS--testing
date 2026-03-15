import { Validator } from "../validator/validator";
import { changeView } from "../card-examples/changeView";

export class Form {
  constructor() {
    this.cardNum = null;
    this.clickBtn = this.clickBtn.bind(this);
  }

  clickBtn() {
    const btn = document.querySelector(".card-form__button");
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const cardForm = new FormData(document.querySelector(".card-form form"));
      this.cardNum = cardForm.get("card-number");

      const isValid = Validator.isValid(this.cardNum);
      this._addValid(isValid);
      changeView(Validator.getPayment(this.cardNum));
    });
  }

  _addValid(isValid) {
    const card = document.querySelector(".card");
    let valid = document.querySelector(".card-valid");
    if (valid === null) {
      valid = document.createElement("p");
      valid.classList.add("card-valid");
    }
    if (isValid) {
      valid.classList.remove("invalid");
      valid.classList.add("valid");
      valid.textContent = "Номер карты валиден";
    } else {
      valid.classList.remove("valid");
      valid.classList.add("invalid");
      valid.textContent = "Невалидный номер карты";
    }
    card.appendChild(valid);
  }
}
