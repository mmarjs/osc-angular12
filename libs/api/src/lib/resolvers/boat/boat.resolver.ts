import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { BoatProvider } from '@ocean/api/services';
import { BoatOutputDTO } from '@ocean/api/shared';
import { Observable, tap } from 'rxjs';
import { BoatsFacade } from '@ocean/client/state';

@Injectable({
  providedIn: 'root'
})
export class BoatResolver implements Resolve<BoatOutputDTO> {
  constructor(private boat: BoatProvider, private boatsFacade: BoatsFacade) { }

  resolve(route: ActivatedRouteSnapshot): Observable<BoatOutputDTO> {
    const id = Number(route.paramMap.get('id'));

    return this.boat.getBoatById({ id })
      .pipe(
        tap(boat => this.boatsFacade.setSelectedBoat(boat))
      );
  }
}
