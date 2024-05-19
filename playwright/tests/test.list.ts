// test.list.ts
import { test } from '@playwright/test';
import signupWithShipyard from './signupWithShipyard.spec';
import signupWithSurveyor from './signupWithSurveyor.spec';
import signupWithBoatOwner from './signupWithBoatOwner.spec';

import login from './login.spec';
import signup from './signup.spec';

test.describe(signupWithShipyard);
test.describe(signupWithSurveyor);
test.describe(signupWithBoatOwner);
test.describe(signup);

test.describe(login);
