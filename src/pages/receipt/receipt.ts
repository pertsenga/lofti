import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SingletonServiceProvider } from '../../providers/singleton-service/singleton-service';
import { HTTP } from '@ionic-native/http';
import { API_PASSWORD, API_PRODUCTS, API_USERNAME } from '../../pages';

/**
 * Generated class for the ReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {
	balance: number = 0.00;

  constructor(
  		public navCtrl: NavController,
  		public navParams: NavParams,
  		public singleton: SingletonServiceProvider,
  		public loadingCtrl: LoadingController,
  		private http: HTTP,
  	) {

  	this.http.g
  	this.presentLoadingDefault('Updating credits...')
  	this.balance = singleton.subtractFromBalance(120);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
  }

  closeScreen() {
  	this.navCtrl.push('ProjectsPage');
  }

  presentLoadingDefault(text: string) {
	  let loading = this.loadingCtrl.create({
	    content: text
	  });

	  loading.present();

	  return loading;
	}

}