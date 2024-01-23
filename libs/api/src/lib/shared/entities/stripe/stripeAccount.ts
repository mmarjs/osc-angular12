interface Address {
  city: string;
  line1: string;
  line2: string;
  postalCode: string;
  state: string;
  country: string;
}

export interface StripeAccount {
  mcc: '5551';
  ssnLast4?: string;
  email: string;
  businessUrl: string;
  individual: {
    firstName: string;
    lastName: string;
    phone: string;
    dob: string;
    taxId: string;
    gender: string;
    address: Address;
  };
}
