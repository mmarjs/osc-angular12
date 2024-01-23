import { Pipe, PipeTransform } from '@angular/core';
import { JobTypes, userTypes, UserTypeTitle } from '@ocean/api/shared';

@Pipe({
  name: 'formatType'
})
export class FormatTypePipe implements PipeTransform {
  /**
   * Format special texts in the app
   */
  transform(type: UserTypeTitle | JobTypes): string {
    if (!type) {
      return '';
    }

    if (!isNaN(Number(type))) {
      type = userTypes[type];
    }

    switch (type) {
      case 'ADMIN':
        return 'Admin';

      case 'SURVEYOR':
        return 'Surveyor';

      case 'SHIPYARD':
        return 'Shipyard';

      case 'BOAT_OWNER':
        return 'Boat Owner';

      case JobTypes.REPAIR:
        return 'Repair';

      default:
        return type;
    }
  }
}
