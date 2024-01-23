import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { ErrorHandlingService } from '@ocean/api/client/error-handling.service';
import { JobProvider } from '@ocean/api/services';
import { JobDTO } from '@ocean/api/shared';
import { AuctionsFacade, BoatsFacade } from '@ocean/client/state';
import { isBefore, PATHS } from '@ocean/shared';
import { catchError, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobResolver implements Resolve<JobDTO | void> {
  constructor(
    private job: JobProvider,
    private errorHandlingService: ErrorHandlingService,
    private router: Router,
    private auctionsFacade: AuctionsFacade,
    private boatsFacade: BoatsFacade
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<JobDTO | void> {
    const id = Number(route.paramMap.get('id'));

    return this.job.findById({ id }).pipe(
      map((auction) => ({
        ...auction,
        isStarted: isBefore(new Date(auction.auctionStartDate as string)),
        isFinished: isBefore(new Date(auction.auctionEndDate as string), new Date()),
      })),
      tap((auction) => {
        this.auctionsFacade.setSelectedAuction(auction);
        this.boatsFacade.setSelectedBoat(auction.boat);
      }),
      catchError((error) => {
        this.router.navigateByUrl(PATHS.HOME);
        return this.errorHandlingService.handleError(error);
      })
    );
  }
}
