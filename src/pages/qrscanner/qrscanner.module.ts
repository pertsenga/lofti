import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrscannerPage } from './qrscanner';
import { QRScanner } from '@ionic-native/qr-scanner';
import { HTTP } from '@ionic-native/http';

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
