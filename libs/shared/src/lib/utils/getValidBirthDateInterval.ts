interface ValidBirthDateInterval {
  minDate: Date;
  maxDate: Date;
}

export const OLD_AGE = 150; // additional 50 to test StripeAccounts
export const ADULT_AGE = 18;

export const getValidBirthDateInterval = (date = new Date()): ValidBirthDateInterval => {
  const minDate = new Date(date.getFullYear() - OLD_AGE, date.getMonth(), date.getDate());
  const maxDate = new Date(date.getFullYear() - ADULT_AGE, date.getMonth(), date.getDate());

  return {
    minDate,
    maxDate
  };
};
