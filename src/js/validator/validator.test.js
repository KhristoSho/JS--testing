import { Validator } from "./validator";

test.each([
  ["4111111111111111", true],
  ["2200 0000 0000 0020", true],
  ["3530111333300000", true],
  ["5105105105105100", true],
  ["4300000000000777", true],
  ["1111", false],
  ["1241512515", false],
])("function isValid", (cardNum, expected) => {
  expect(Validator.isValid(cardNum)).toBe(expected);
});

test.each([
  ["4111111111111111", "visa"],
  ["2200 0000 0000 0020", "mir"],
  ["3530111333300000", "jcb"],
  ["5105105105105100", "mastercard"],
  ["4300000000000777", "visa"],
  ["1111", false],
  ["1241512515", false],
])("function isValid", (cardNum, expected) => {
  expect(Validator.getPayment(cardNum)).toBe(expected);
});
