const usernameRegexp = /^[a-z0-9-]*$/;

export const usernameValidator = (control) => {
  if (control.value) {
    return control.value.match(usernameRegexp)
      ? null
      : {
        invalidUserName: true,
        message: 'FORMS.ERRORS.USERNAME',
      };
  } else {
    return null;
  }
};