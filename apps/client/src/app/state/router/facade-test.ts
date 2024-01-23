import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RouterTestFacade {
  state$ = new Subject();
  route$ = new Subject();
  url$ = new Subject();
  queryParams$ = new Subject();
  params$ = new Subject();

  constructor() {}
}
