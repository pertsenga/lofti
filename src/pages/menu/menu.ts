import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController } from 'ionic-angular';

interface PageItem {
  title: string
  component: any
}
type PageList = PageItem[]

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  // A reference to the ion-nav in our component
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'NewsfeedPage';

  pages: PageList;

  menuItems = [
    {
      title: 'Scan QR',
      component: 'QrscannerPage'
    },
    {
      title: 'News',
      component: 'NewsfeedPage'
    },
    // {
    //   title: 'Projects'
    // },
    // {
    //   title: 'My Profile'
    // },
    // {
    //   title: 'Credits'
    // }
  ]

  constructor(public navCtrl: NavController) {
    // used for an example of ngFor and navigation
    this.pages = this.menuItems;
  }

  ionViewDidLoad() {
    console.log('Hello MenuPage Page');
  }

  openPage(page: PageItem) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
