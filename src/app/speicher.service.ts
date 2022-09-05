import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ErgebnisEintrag } from './ergebnis-eintrag';

@Injectable({
  providedIn: 'root'
})
export class SpeicherService {

  constructor(private storage: Storage) { 
    this.storage.create();
  }

  public async eintragSpeichern(ergebnisEintrag: Array<{category: String, totalCount: number, articles: Array<any>, kommentar: String}>): Promise<string> {

    let zeit = new Date().toISOString();

    await this.storage.set(zeit, ergebnisEintrag)

    return zeit;
  }


  /**
   * Löschen eines Eintrages mit alle dazugehörigen Werten.
   *
   * @param zeit   Zeitpunkt, der zu löschen ist.
   */
  public async eintragLoeschen(zeit: string) {

    await this.storage.remove(zeit);
  }

   /**
   * Löschen aller Einträge mit den dazugehörigen Werten.
   */
  public async alleEintraegeLoeschen() {
    await this.storage.clear();
  }
  /**
   * Methode holt eine bestimmte Ladezeit mit den Eingabeparametern und Kommentaren für den angegebenen Zeitpunkt.
   *
   * @param zeit   Zeitpunkt, für welchen der Datensatz abgeholt werden soll
   */
   public async holeErgebnisseFuerAnfrage(zeit: string): Promise<any> {

    const anyPromise = this.storage.get(zeit);

    return anyPromise
  }

  public holeAnzahlgespeicherterAnfragen(): Promise<number> {

    let anzahlPromise = this.storage.length();

    return anzahlPromise;
  }

   /**
   * Methode holt alle berechneten Ladezeiten mit jeweils allen Eingabeparametern und Kommentaren.
   *
   * @return  Promise-Objekt für Array von Objekten. Jedes dieser Objekte enthält unter
   *          dem Schlüssel `abkürzung` die Abkürzung, und unter dem Schüssel `bedeutung`
   *          die zugehörige Bedeutung.
   */
  public holeAlleAnfragenUndErgebnisse(): Promise<ErgebnisEintrag[]> {

    const ergebnisPromise = new Promise<ErgebnisEintrag[]>( (resolveCallback) => {

      const ergebnisArray: ErgebnisEintrag[] = [];

      this.storage.forEach( (wert, schluessel, nummer) => {

        let anfrageWerte = new ErgebnisEintrag(schluessel, wert);
        ergebnisArray.push(anfrageWerte);

      }).then( () => {

        resolveCallback(ergebnisArray);
      });
    });

    return ergebnisPromise;
  }
}
