import { Country } from '@angular-material-extensions/select-country';
import { ChangeData } from 'ngx-intl-tel-input/lib/interfaces/change-data';

export interface StripeForm {
  firstName: string;
  lastName: string;
  email: string;
  businessUrl: string;
  ssnLast4: string;
  phone: ChangeData;
  taxId: string;
  dob: string;
  gender: string;
  city: string;
  line1: string;
  line2: string;
  postalCode: string;
  state?: string;
  province?: string;
  region?: string;
  country: Country;
}
