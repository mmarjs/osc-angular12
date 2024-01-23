import { Pipe, PipeTransform } from '@angular/core';
import { TAX } from '@ocean/api/shared';
import memo from 'memo-decorator';

@Pipe({
  name: 'tax'
})
export class TaxPipe implements PipeTransform {
  @memo()
  transform(value: any, ...args: unknown[]): unknown {
    return (+value / 100) * TAX;
  }
}
