const nameRegexp = /^[^-,\s][a-zA-Z',\s-]+$/;

export const nameValidator = (control) => {
  if (control.value) {
    return control.value.match(nameRegexp)
      ? null
      : {
          invalidName: true,
          message: 'FORMS.ERRORS.NAME',
        };
  } else {
    return null;
  }
};
