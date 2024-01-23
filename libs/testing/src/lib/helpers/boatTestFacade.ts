import { of } from "rxjs";

export let mockBoatsFacade={
  setSelectedBoat:()=>true,
  selectedBoat$: of({ id: 123, name: 'some boat name', images: [] }),
  update: ()=>true,
}