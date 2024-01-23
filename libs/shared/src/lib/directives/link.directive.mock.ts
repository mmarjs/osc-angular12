// tslint:disable:no-invalid-this
import { TestDirective } from '@ocean/testing';
import { ROUTES } from '../routing';

export const LinkDirectiveMock = TestDirective('[appLink]', {
  inputs: [
    'appLink',
    'queryParams',
    'fragment',
    'queryParamsHandling',
    'preserveFragment',
    'skipLocationChange',
    'replaceUrl',
    'state'
  ],
  onInit: function() {
    const route = Array.isArray(this.appLink) ? this.appLink[0] : this.appLink;
    // checks if the route exists
    if (!ROUTES.exists(route)) {
      throw new Error(`Invalid route key used in appLink: '${route}'`);
    }
  }
});
