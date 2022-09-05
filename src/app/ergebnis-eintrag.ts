/**
 * Ein Objekt dieser Klasse kapselt ein Paar von Zeitstempen (Key) und Array mit
 * zugehörigen Ergebnissen (Value für Key).
 */
 export class ErgebnisEintrag {

    constructor( public zeit : string,
                 public ergebnisse: string[]
               ) {}
  }