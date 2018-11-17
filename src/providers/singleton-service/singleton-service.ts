import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

/*
  Generated class for the SingletonServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SingletonServiceProvider {
	private user: any = {};
  private balance: number = 0;

  constructor(public http: HttpClient) {
    console.log('Hello SingletonServiceProvider Provider');
  }

  public assignUser(user: any) {
    this.user = user;
    this.balance = this.getBalanceFromObj();
  }

  public currentUser() {
    return this.user;
  }

  public subtractFromBalance(amt: number) {
    return this.balance -= amt;
  }

  public currentBalance() {
    return this.balance;
  }

  private getBalanceFromObj() {
  	let metaDatas = this.user.meta_data;
  	let funds = _.find(metaDatas, { "key": "account_funds" });
  	return _.toNumber(funds.value);
  }

}
