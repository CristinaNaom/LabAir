import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  images= [
    'assets/image/homePage/sport_1.webp','assets/image/homePage/sport_2.webp','assets/image/homePage/sport_3.webp',
    'assets/image/homePage/sport_4.webp','assets/image/homePage/sport_5.webp','assets/image/homePage/sport_6.webp'
  ];
  images2= [
    'assets/image/homePage/banner_1.webp','assets/image/homePage/banner_2.webp','assets/image/homePage/banner_3.webp',
    'assets/image/homePage/banner_4.webp','assets/image/homePage/banner_5.webp','assets/image/homePage/banner_6.webp'
  ];
  images3= [
    'assets/image/homePage/scarpa_1.webp','assets/image/homePage/scarpa_2.webp','assets/image/homePage/scarpa_3.webp',
    'assets/image/homePage/scarpa_4.webp','assets/image/homePage/scarpa_5.webp','assets/image/homePage/scarpa_8.webp'
  ];
}
