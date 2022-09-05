import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NewsService } from '../api/news.service';
import { SpeicherService } from '../speicher.service';

@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.page.html',
  styleUrls: ['./ergebnis.page.scss'],
})
export class ErgebnisPage implements OnInit {
  articles = [];
  totalCount;
  private category: string;
  private kommentar: string;
  private ERGEBNIS_ARRAY: [{category: String, totalCount: number, articles: Array<any>, kommentar: String}];

  constructor(private newsService: NewsService, private loadingCtrl: LoadingController, private activatedRoute: ActivatedRoute, private speicherService: SpeicherService) {
    this.category = activatedRoute.snapshot.queryParamMap.get("eingabeCategory");
    this.kommentar = activatedRoute.snapshot.queryParamMap.get("eingabeKommentar");
   }

  ngOnInit() {
    this.loadArticles();
    this.saveResults();
  }

  async loadArticles() {
    const loading = await this.loadingCtrl.create({
      message: 'Laden...',
      spinner: 'circular',
    });
    await loading.present();


    this.newsService.getArticleByCategory(this.category).subscribe((res) => {
      loading.dismiss();
      this.totalCount = res.totalResults;
      this.articles.push(...res.articles);
      console.log(res);
    });
  }

  async saveResults() {
    this.ERGEBNIS_ARRAY = [{category: this.category, totalCount: this.totalCount, articles: this.articles, kommentar: this.kommentar}];

    try {
      
      await this.speicherService.eintragSpeichern(this.ERGEBNIS_ARRAY);

    } catch (error) {
      
    }
  }

}