import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';
import { MainPage } from '../';

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
  ) { }

  login() {
    this.navCtrl.setRoot('TutorialPage');
  }

  loginWithFacebook() {
  	if(this.isDevApp) {
  		this.navCtrl.push('TutorialPage');
  	}
  	this.facebook.login(['public_profile', 'user_friends', 'email'])
	  .then((res: FacebookLoginResponse) => {
	  	console.log('Logged into Facebook!', res)
	  })
	  .catch(e => console.log('Error logging into Facebook', e));
  }

  loginWithGoogle() {}

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
