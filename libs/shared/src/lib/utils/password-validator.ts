const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{5,30}$/;

export const passwordValidator = (control) => {
  if (control.value) {
    return control.value.match(passwordRegexp)
      ? null
      : {
        invalidPassword: true,
        message: 'FORMS.ERRORS.PASSWORD',
      };
  } else {
    return null;
  }
};