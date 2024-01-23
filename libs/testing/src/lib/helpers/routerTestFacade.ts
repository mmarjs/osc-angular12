import { of } from "rxjs";

export  let mockRouterFacade = {
  queryParams$: of({ draft: 'draft' }),
  go:()=>true
}