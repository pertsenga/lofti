import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { HTTP } from '@ionic-native/http';
import { API_PASSWORD, API_PRODUCTS, API_USERNAME } from '../../pages';

/**
 * Generated class for the QrscannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html',
})
export class QrscannerPage {

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private qrScanner: QRScanner,
  	private alertCtrl: AlertController,
  	private http: HTTP,
  	public loadingCtrl: LoadingController,
  ) { }

  ionViewDidLoad(){
	  this.qrScanner.prepare()
  		.then((status: QRScannerStatus) => {
  			if (status.authorized) {
		      // camera permission was granted
	

		      // start scanning
		      let scanSub = this.qrScanner.scan().subscribe((text: string) => {
		        console.log('Scanned something', text);
		        this.qrScanner.hide(); // hide camera preview
		        scanSub.unsubscribe(); // stop scanning
		        this.hideCamera();

		        let loader = this.presentLoadingDefault(text);

		        this.http.useBasicAuth(API_USERNAME, API_PASSWORD);
		        this.http.get(API_PRODUCTS, {}, { username: API_USERNAME, password: API_PASSWORD })
		        	.then((res) => {
			        	loader.dismiss();
			        	this.presentPopupDefault("Product Details", JSON.parse(res.data)[0].name);
			        	// this.navCtrl.push('TutorialPage');
			        })
		        // this.navCtrl.push('ProductPage');
		      });

		      this.showCamera();
		      this.qrScanner.show();
		    } else if (status.denied) {
		      // camera permission was permanently denied
		      // you must use QRScanner.openSettings() method to guide the user to the settings page
		      // then they can grant the permission from there
		    } else {
		      // permission was denied, but not permanently. You can ask for permission again at a later time.
		    }
  		});
	}

	ionViewWillLeave(){
	   this.hideCamera(); 
	}

  showCamera() {
	  (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
	}

	hideCamera() {
	  (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
	}

	presentPopupDefault(title: string, text: string) {
	  let alert = this.alertCtrl.create({
	    title: title,
	    subTitle: text,
	    buttons: ['Cancel', 'Continue']
	  });
	  alert.present();
	}

	presentLoadingDefault(text: string) {
	  let loading = this.loadingCtrl.create({
	    content: `looking for ${text}...`
	  });

	  loading.present();

	  return loading;
	}

}
