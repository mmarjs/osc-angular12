import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-trusted-by',
  templateUrl: './trusted-by.component.html',
  styleUrls: ['./trusted-by.component.scss']
})
export class TrustedByComponent implements OnInit {
  brands = [
    {
      name: 'MAUI Marine Surveying',
      logo: 'maui_marine.png',
      width: 205,
      height: 78
    },
    {
      name: 'Bollinger',
      logo: 'bollinger.png',
      width: 180,
      height: 75
    },
    {
      name: 'Irving',
      logo: 'irving.png',
      width: 94,
      height: 66
    },
    {
      name: 'Newport',
      logo: 'newport.png',
      width: 100,
      height: 76
    },
    {
      name: 'Keppel',
      logo: 'keppel.png',
      width: 230,
      height: 37
    }
  ];

  constructor() {}

  ngOnInit() {}
}
