import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { HTTP } from '@ionic-native/http';
import { API_PASSWORD, API_PRODUCTS, API_USERNAME } from '../../pages';
import * as _ from 'lodash';
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

		        let qrObj = JSON.parse(text);
		        let loader = this.presentLoadingDefault(qrObj.product);

		        this.http.useBasicAuth(API_USERNAME, API_PASSWORD);
		        this.http.get(API_PRODUCTS, { search: qrObj.product }, { })
		        	.then((res) => {
			        	loader.dismiss();

			        	let data = JSON.parse(res.data)[0];
			        	data.location = qrObj.location;

			        	this.presentPopupDefault("Product Details", data);
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

	presentPopupDefault(title: string, obj) {
		let img = `<img class="product-modal-img" src="${obj.images[0].src}'" alt="product image">`;
	  let name = obj.name;
	  let short_desc = obj.short_description;
	  let desc = obj.description;
	  let loc = obj.location;
	  let price = obj.price;

	  let content = `
	  	<div class="text-center">
		  	${img}
		  	<h3>${name}</h3>
		  	<h5>${short_desc}</h5>
		  	${desc}
		  	<h1>Php${price}</h1>
		  	Buying from ${loc}.
		  </div>
	  	`;

	  let alert = this.alertCtrl.create({
	    title: title,
	    subTitle: content,
	    buttons: [{
	    	text: 'Confirm',
	    	handler: () => { this.navCtrl.push('TutorialPage'); }
	    }]
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
