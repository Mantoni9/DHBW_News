import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { NewsService } from '../api/news.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private eingabeCategory: String = "";
  private eingabeKommentar: String = "";

  constructor(private alarmCtrl: AlertController, private navCtrl: NavController) { }

  async onSearchButton() {
    let eingabeCategory: string = String(this.eingabeCategory);
    let eingabeKommentar = String(this.eingabeKommentar)
    if (!eingabeCategory) {

      await this.fehlerDialog("Das Suchfeld ist leer. Bitte machen Sie eine Eingabe");
      return;
    }
    if (this.eingabeCategory === "") {

      await this.fehlerDialog("Das Suchfeld ist leer. Bitte machen Sie eine Eingabe");
      return;
    }

    let navigationsErgebnis = `/ergebnis?eingabeCategory=${eingabeCategory}&eingabeKommentar=${eingabeKommentar}`;

    this.navCtrl.navigateForward(navigationsErgebnis);
  }

  async fehlerDialog(nachricht: string) {
    const meinAlarm = await this.alarmCtrl.create({ header: "Fehler", message: nachricht, buttons: ["OK"] });
    await meinAlarm.present();
  };

}
