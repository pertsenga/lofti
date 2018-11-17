import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { API_NEWS, API_AUTHORS, API_USERNAME, API_PASSWORD } from '../';
import moment from 'moment';
import * as _ from 'lodash';

/**
 * Generated class for the NewsfeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newsfeed',
  templateUrl: 'newsfeed.html',
})
export class NewsfeedPage {
	posts = [];
	authors = [];

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private http: HTTP,
  	private alertCtrl: AlertController,
  	private loadingCtrl: LoadingController,
  	) {
  	http.useBasicAuth(API_USERNAME, API_PASSWORD);
  	let loader = this.presentLoadingDefault('Fetching News...');
  	this.http.get(API_NEWS, {}, {})
  		.then(res => {
  			loader.dismiss();
  			this.parsePosts(res.data)
  		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsfeedPage');
  }

  parsePosts(data) {
  	let posts = JSON.parse(data);
  	
  	this.posts = _.map(posts, post => {
  		return {
  			author_avatar: '../assets/img/person-placeholder.jpg',
  			author: 'admin',
  			post_image: post.jetpack_featured_media_url,
				post_excerpt: post.excerpt.rendered,
				last_posted: moment(post.date).fromNow(),
				location: "in Metro Manila"
  		}
  	});

  	// return this.getAuthors(user_ids)
  		// .then(() => {
  		// 	this.posts = _.map(posts_data, post => {
  		// 		let author = _.find(this.authors, { id: post.author })
  		// 		return {
  		// 			author_avatar: author.avatar,
  		// 			author_name: author.name,
  		// 			post_image: post.jetpack_featured_media_url,
  		// 			post_excerpt: post.excerpt.rendered,
  		// 			last_posted: moment(post.date).fromNow(),
  		// 			location: "in Metro Manila"
  		// 		}
  		// 	});
  		// });
  }

  getAuthors(ids) {
  	return this.http.get(API_AUTHORS, { include: ids }, {})
  		.then(res => {
  			let authors_data = JSON.parse(res.data);
  			this.authors = _.map(authors_data, author => {
  				return author.name;
  			});
  		})
  		.catch(err => {
  			this.presentPopupDefault('getauth', err.toString());
  		});
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
