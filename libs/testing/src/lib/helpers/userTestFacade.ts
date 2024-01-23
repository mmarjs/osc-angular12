import { of } from "rxjs";

export let mockUserFacade = {
  id$: of('123'),
  token$: of('123'),
}