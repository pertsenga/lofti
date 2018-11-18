import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';
import { SingletonServiceProvider } from '../providers/singleton-service/singleton-service';

@Component({
  template: `<ion-menu class="appMain" [content]="content">
    <ion-content>
      <div class="splash-logo-menu"></div>
      <ion-list no-lines>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
      <img class="circle-pic avatar" src="{{ user.avatar_url || '../assets/img/person-placeholder.jpg' }}"/>
      <p>{{ user.name || 'John Doe' }}</p>
      <div class="credits-container">
        <span class="balance-credits">{{ balance }}</span><br>
        <span>CREDITS</span>
      </div>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;
  user: any = {};
  balance = 0;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    {
      title: 'Scan QR',
      component: 'QrscannerPage'
    },
    {
      title: 'News',
      component: 'NewsfeedPage'
    },
    {
      title: 'My Profile',
      component: 'ProfilePage'
    }
  ]

  constructor(
    private translate: TranslateService, 
    platform: Platform, settings: Settings, 
    private config: Config, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    public singleton: SingletonServiceProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      setInterval(() => {
        this.user = this.singleton.currentUser();
        this.balance = this.singleton.currentBalance();
      }, 3000);
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
