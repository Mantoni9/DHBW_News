import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

   /**
   * Konstruktor für *Dependency Injection*.
   */  
  constructor( private alarmCtrl      : AlertController,
    private toastCtrl: ToastController ) {}

/**
* Alert/Dialog anzeigen.
*
* @param title  Dialog-Titel, z.B. "Fehler" oder "Ungültige Eingabe".
*
* @param nachricht  Eigentlich Nachricht des Dialogs.
*/
async zeigeDialog(titel: string, nachricht: string) {

const meinAlarm =
await this.alarmCtrl.create({
   header  : titel,
   message : nachricht,
   buttons : [ "Ok" ]
});

await meinAlarm.present();
}


/**
* Toast anzeigen. Sollte nicht für die Anzeige von Fehlermeldungen verwendet werden.
*
* @param nachricht  Anzuzeigender Text
*/
async zeigeToast(nachricht: string) {

const toast =
await this.toastCtrl.create({
   message : nachricht,
   duration: 2000  // 2000 ms = 2 seconds
});

await toast.present();
}

}