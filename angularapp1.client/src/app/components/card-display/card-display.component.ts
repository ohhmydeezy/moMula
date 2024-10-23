import {
  Component,
  inject,
  AfterViewInit,
} from '@angular/core';
import SwiperCore, { Swiper } from 'swiper';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCardbyId, selectUser } from '../../state/app.selectors';

SwiperCore.use([]);

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrl: './card-display.component.css',
})
export class CardDisplayComponent implements AfterViewInit
{
  cardImages: { [key: number]: string | ArrayBuffer | null } = {};
  currentSlideIndex: number = 0;
  swiperInstance: Swiper | undefined;

  #router = inject(Router);
  #store = inject(Store);

  protected user = this.#store.selectSignal(selectUser);


  // Handle Swiper's initialization
  onSwiper(event: any) {
    this.swiperInstance = event as Swiper;
  }

  // Handle Swiper's slide change event
  onSlideChange(event: any) {
    const swiper: Swiper = event as Swiper;
    if (this.swiperInstance) {
      this.currentSlideIndex = swiper.realIndex;
    }
  }

  ngAfterViewInit(): void {
    this.swiperInstance = new Swiper('.carousel-3D-swiper', {
      effect: 'cards',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 1,
      on: {
        slideChange: () => {
          this.onSlideChange(this.swiperInstance);
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }


  // Method to navigate to a page based on the current slide
  navigateToCardPage() {
    const currentCard = this.user()?.cards?.[this.currentSlideIndex];
    if (currentCard) {
      this.#store.selectSignal(selectCardbyId(Number(currentCard.id)));
      this.#router.navigate(['/breakdown', currentCard.id]);
    }
  }
}
