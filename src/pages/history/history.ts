import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SingletonServiceProvider } from '../../providers/singleton-service/singleton-service';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
	history: Array<any> = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public singleton: SingletonServiceProvider) {
  	this.history = singleton.getHistory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
