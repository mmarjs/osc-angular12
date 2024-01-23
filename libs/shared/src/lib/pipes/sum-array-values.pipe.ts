import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'sumArrayValues'
})
export class SumArrayValuesPipe implements PipeTransform {
  @memo()
  transform(value: any[], itemName?: string, quantityField?: string): number {
    if (value) {
      return value.reduce((previous, item) => {
        if (itemName) {
          if (quantityField) {
            return previous += (+item[itemName] * +item[quantityField]);
          }
          return previous += +item[itemName];
        }
        return previous += +item;
      }, 0);
    }
    return 0;
  }
}
