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
  private metrics: any = {}
  private history: any = [];

  constructor(public http: HttpClient) {
    console.log('Hello SingletonServiceProvider Provider');
  }

  public getHistory() {
    return _.reverse(this.history);
  }

  public pushToHistory(tras: any) {
    this.history.push(tras);
  }

  public addMetrics(key, value: number) {
    this.metrics[key] == null ? this.metrics[key] = value : this.metrics[key] += value;
    return this.metrics[key];
  }

  public setMetrics(key, value: any) {
    this.metrics[key] = value;
    return this.metrics[key];
  }

  public getMetrics(key) {
    return this.metrics[key];
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
