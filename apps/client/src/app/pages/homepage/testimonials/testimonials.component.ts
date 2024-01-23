import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  testimonials = [
    {
      message: 'Ocean Service Center saved me thousands in repairs!',
      author: 'Analisa Guay'
    },
    {
      message: 'Thanks for the excellent service!',
      author: 'Elise Sanders'
    },
    {
      message: 'Just like eBay for boat repairs',
      author: 'Sean Gerety'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
