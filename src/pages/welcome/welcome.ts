import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Platform, LoadingController, AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { MainPage, API_CUSTOMERS, API_USERNAME, API_PASSWORD } from '../';
import * as _ from 'lodash';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
	isDevApp: boolean = true;
	account: { email: string, password: string } = {
		email: '',
		password: ''
	};

  constructor(
  	public navCtrl: NavController,
  	private facebook: Facebook,
  	private platform: Platform,
    private http: HTTP,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) { }

  login() {
    let popUpText = `Signing ${this.account.email} in...`
    let loader = this.presentLoadingDefault(popUpText);
    this.http.useBasicAuth(API_USERNAME, API_PASSWORD);
    this.http.get(API_CUSTOMERS, {}, {})
      .then(res => {
        loader.dismiss();
        let data = JSON.parse(res.data);
        if (_.find(data, { "email": this.account.email })) {
          this.navCtrl.setRoot('TutorialPage');
        } else {
          this.presentPopupDefault('Sign In Failed.', 'Please make sure email and password are correct.');
        }
      });
  }

  loginWithFacebook() {
  	// if(this.isDevApp) {
  	// 	this.navCtrl.push('TutorialPage');
  	// }
  	this.facebook.login(['public_profile', 'user_friends', 'email'])
	  .then((res: FacebookLoginResponse) => {
	  	console.log('Logged into Facebook!', res)
	  })
	  .catch(e => console.log('Error logging into Facebook', e));
  }

  loginWithGoogle() {
    this.navCtrl.setRoot('TutorialPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  presentLoadingDefault(text: string) {
    let loading = this.loadingCtrl.create({
      content: text
    });

    loading.present();

    return loading;
  }

  presentPopupDefault(title: string, text: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
