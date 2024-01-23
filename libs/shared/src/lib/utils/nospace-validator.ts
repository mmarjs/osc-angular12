import { ValidatorFn } from '@angular/forms';
import { LocalizationService } from '@ocean/internationalization';
const noWhiteSpace: ValidatorFn = (control) => {
  if (typeof control.value === 'string' && control.value?.includes(' ')) {
    return { 'message': "No white space allowed" };
  }
  return null;
}

const noOnlySpace: ValidatorFn = (control) => {
  if(control.value?.length > 0){
    return control.value?.trim().length === 0 && { 'invalidSpace': true, 'message': 'Only space is not allowed' };
  } else {
    return null;
  }
}

const onlyPositiveNumbers = (service:LocalizationService):ValidatorFn => {
  return (control) => {
    if(control.value){
      return control.value < 0 && { 'invalidNumber': true, 'message': service.translate('FORMS.ERRORS.SHOULD_BE_GREATER_THAN_ZERO') };
    } else {
      return null;
    }
}
}

const dontAllowOnlyZeros = (service?: LocalizationService): ValidatorFn => {
  return (control) => {
    if (control?.value?.toString().match(/^0+$/)) {
      return {
        invalidData: true,
        message: 'FORMS.ERRORS.PLEASE_ENTER_VALID_DATA',
      };
    } else {
      return null;
    }
  };
}

const startWithSpaceValidator: ValidatorFn = (control) => {
     if (control.value) {
       return control.value.toString().startsWith(' ') && { 'invalidStart': true, 'message': 'FORMS.ERRORS.START_SPACE_ERROR' };
     } else {
       return null;
     }
 }

export const CustomValidator = {
  noWhiteSpace,
  noOnlySpace,
  onlyPositiveNumbers,
  dontAllowOnlyZeros,
  startWithSpaceValidator
} 
