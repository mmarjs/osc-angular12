import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ErrorHandlingService } from '@ocean/api/client/error-handling.service';
import { BidProvider } from '@ocean/api/services';
import { BidDTO } from '@ocean/api/shared';
import { RouterFacade } from '@ocean/client/state';
import { catchError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BidResolver implements Resolve<BidDTO | void> {
  constructor(
    private bid: BidProvider,
    private routerFacade: RouterFacade,
    private errorHandlingService: ErrorHandlingService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<BidDTO | void> {
    const id = Number(route.paramMap.get('id'));

    return this.bid.findById({ id }).pipe(
      catchError((err) => {
        this.routerFacade.go({
          path: ['/'],
        });
        return this.errorHandlingService.handleError(err);
      })
    );
  }
}
