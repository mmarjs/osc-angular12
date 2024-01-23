import { animate, state, style, transition, trigger } from '@angular/animations';

export function toggle() {
  return trigger('rowExpand', [
    state("collapsed", style({ height: "0px", minHeight: "0px" })),
    state("expanded", style({ minHeight: "48px" })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ]);
}