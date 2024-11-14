export const cardTypes = {
  visa: {
    pattern: /^4/,
    format: /(\d{1,4})/g,
    length: [16],
  },
  mastercard: {
    pattern: /^(5[1-5]|2[2-7])/,
    format: /(\d{1,4})/g,
    length: [16],
  },
  amex: {
    pattern: /^3[47]/,
    format: /(\d{1,4})/g,
    length: [15],
  },
  discover: {
    pattern: /^6(?:011|5)/,
    format: /(\d{1,4})/g,
    length: [16],
  },
};

export const getCardType = (number) => {
  for (const [type, { pattern }] of Object.entries(cardTypes)) {
    if (pattern.test(number)) {
      return type;
    }
  }
  return "";
};

export const formatCardNumber = (value) => {
  const number = value.replace(/\D/g, "");
  const cardType = getCardType(number);

  if (!cardType) {
    return number;
  }

  const { format } = cardTypes[cardType];
  return number.match(format)?.join(" ").trim() || number;
};

export const formatExpiryDate = (value) => {
  const expiry = value.replace(/\D/g, "");
  if (expiry.length >= 2) {
    return `${expiry.slice(0, 2)}/${expiry.slice(2, 4)}`;
  }
  return expiry;
};
