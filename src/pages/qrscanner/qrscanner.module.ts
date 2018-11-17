import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrscannerPage } from './qrscanner';
import { QRScanner } from '@ionic-native/qr-scanner';

@NgModule({
  declarations: [
    QrscannerPage,
  ],
  imports: [
    IonicPageModule.forChild(QrscannerPage),
  ],
  providers: [
  	QRScanner,
  ]
})
export class QrscannerPageModule {}
