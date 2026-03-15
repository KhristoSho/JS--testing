export class Validator {
  static isValid(cardNum) {
    const digits = cardNum.replace(/\D/g, "").split("").map(Number);
    const length = digits.length;
    if (length === 0) return false;

    let sum = 0;
    const parity = length % 2;

    for (let i = 0; i < length - 1; i++) {
      if ((i + 1) % 2 === parity) {
        sum += digits[i];
      } else {
        const doubled = digits[i] * 2;
        sum += digits[i] > 4 ? doubled - 9 : doubled;
      }
    }

    const checkDigit = digits[length - 1];
    const expectedCheckDigit = (10 - (sum % 10)) % 10;

    return checkDigit === expectedCheckDigit;
  }

  static getPayment(cardNum) {
    const digits = cardNum.replace(/\D/g, "");
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]$/,
      discover:
        /^6(011|5|4[4-9]|22(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[01]\d|92[0-5]))/,
      jcb: /^35(2[89]|[3-8]\d)/,
      diners: /^3(0[0-5]|[689])/,
      mir: /^220[0-4]/,
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(digits)) {
        return type;
      }
    }

    return false;
  }
}
