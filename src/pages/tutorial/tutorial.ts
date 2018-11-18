import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { MainPage } from '../';
import { QrscannerPage } from '../qrscanner/qrscanner';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform) {
    this.dir = platform.dir();
    this.slides = [
      {
        title: 'Get your coffee',
        description: '',
        image: 'assets/imgs/slide-1.png',
      },
      {
        title: 'Pay by QR Scan',
        description: '',
        image: 'assets/imgs/slide-2.png',
      },
      {
        title: 'Confirm your supported cause',
        description: '',
        image: 'assets/imgs/slide-3.png',
      },
      {
        title: 'All done!',
        description: '',
        image: 'assets/imgs/slide-4.png',
      }
    ];
  }

  startApp() {
    this.navCtrl.setRoot(QrscannerPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
