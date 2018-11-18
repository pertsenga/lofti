import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SingletonServiceProvider } from '../../providers/singleton-service/singleton-service';
import moment from 'moment';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	metrics = [
		{ title: 'Total Coffee Consumed', units: 'Cups', count: this.totalCups() },
		{ title: 'Last Consumed Coffee', units: 'ago', count: this.timePassedLastCoffee() }
	]

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public singleton: SingletonServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  totalCups() {
  	return this.singleton.addMetrics("cups", 0);
  }

  timePassedLastCoffee() {
  	let time = this.singleton.getMetrics("last_coffee");
  	return time ? time.fromNow(true) : 'Ages';
  }

}
