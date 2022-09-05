import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { NewsService } from '../api/news.service';
import { DialogService } from '../dialog.service';
import { ErgebnisEintrag } from '../ergebnis-eintrag';
import { SpeicherService } from '../speicher.service';

@Component({
  selector: 'app-historie',
  templateUrl: './historie.page.html',
  styleUrls: ['./historie.page.scss'],
})
export class HistoriePage implements OnInit {

   /**
   * Promise für Anzahl der Anfragen.
   */
  private anzahlAnfragenPromise : Promise<number>;

  /**
   * Promise auf Array mit Objekten der Klasse `ErgebnisEintrag`, die in einer Liste dargestellt werden.
   */
  private ergebnisEintragArrayPromise: Promise<ErgebnisEintrag[]>;

  constructor(private storage: SpeicherService, private alarm: AlertController, private dialog: DialogService, private newsService: NewsService) { }

  private ionViewWillEnter() {
    this.holeDatenVonSpeicherService();
  }


  /**
   * Holt Daten von SpeicherService und kopiert sie in Member-Variablen.
   * Muss in Lifecycle-Methode vor Laden der Seite aufgerufen werden und auch nach Löschen eines
   * Listeneintrags (einer Abkürzung).
   */
  private holeDatenVonSpeicherService(): void {

    this.anzahlAnfragenPromise  = this.storage.holeAnzahlgespeicherterAnfragen();

    this.ergebnisEintragArrayPromise = this.storage.holeAlleAnfragenUndErgebnisse();
  }

  ngOnInit() {
  }

  private async onAlleLoeschenButton(slider: IonItemSliding) {

    const jaButton = {
      text: "Weiter",
      handler: async () => {

          await this.storage.alleEintraegeLoeschen();

          const erfolgsNachricht = `Alle Einträge wurden gelöscht.`;
          this.dialog.zeigeToast(erfolgsNachricht);

          this.holeDatenVonSpeicherService();
      }
  };

  const abbrechenButton = {
      text: "Abbrechen",
      role: "Cancel",
      handler: () => {

          this.dialog.zeigeToast("Löschen abgebrochen.");

          slider.close();
      }
  };

  const sicherheitsfrage = `Möchten Sie alle Einträge endgültig löschen?`;

  const meinAlarm =
        await this.alarm.create({
            header         : "Sicherheitsfrage",
            message        : sicherheitsfrage,
            backdropDismiss: false,
            buttons        : [ jaButton, abbrechenButton ]
        });

  await meinAlarm.present();
}

  private async onLoeschenButton(zeit: string, kommentar: string, slider: IonItemSliding) {

    const jaButton = {
        text: "Weiter",
        handler: async () => {

            await this.storage.eintragLoeschen(zeit);

            const erfolgsNachricht = `Eintrag: "${zeit}" wurde gelöscht.`;
            this.dialog.zeigeToast(erfolgsNachricht);

            this.holeDatenVonSpeicherService();
        }
    };

    const abbrechenButton = {
        text: "Abbrechen",
        role: "Cancel",
        handler: () => {

            this.dialog.zeigeToast("Löschen abgebrochen.");

            slider.close();
        }
    };

    const sicherheitsfrage = `Möchten Sie diesen Eintrag "${zeit}" mit dem Kommentar ${kommentar} wirklich löschen?`;

    const meinAlarm =
          await this.alarm.create({
              header         : "Sicherheitsfrage",
              message        : sicherheitsfrage,
              backdropDismiss: false,
              buttons        : [ jaButton, abbrechenButton ]
          });

    await meinAlarm.present();
  }
}