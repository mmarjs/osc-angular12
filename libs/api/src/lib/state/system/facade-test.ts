import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SystemTestFacade {
  loaded$ = new Subject();

  constructor() {}

  load() {}
}
