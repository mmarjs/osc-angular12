import { Component, OnInit } from '@angular/core';
import { getProjectRelease } from '@ocean/shared/utils/getProjectRelease';

@Component({
  selector: 'layout-basic-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  today: Date = new Date();
  version = getProjectRelease().split('@')?.[1] ?? '0.0.0';

  constructor() {}

  ngOnInit() {}
}
