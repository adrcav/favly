import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { SearchService } from '../search.service';

import * as moment from 'moment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [
    FeedService,
    SearchService
  ]
})
export class FeedComponent implements OnInit {

  favoriteIds = [];
  favoriteRepos = [];
  randomRepos = [];

  constructor(private feedService: FeedService, private searchService: SearchService) { }

  ngOnInit() {
    this.getFavoritesRepos();

    this.updateSearch();
  }

  getFavoritesRepos() {
    this.feedService.getIdRepos().subscribe(data => {
      this.favoriteIds = data.json();
      this.getFavoriteData(data.json());
    });
  }

  getFavoriteData(favorites) {
    favorites.forEach(element => {
      if (!this.checkIfIdExist(element.id)) {
        this.feedService.getFavoriteRepo(element.id).subscribe(data => {
          this.favoriteRepos.push(data.json());
        });
      }
    });
  }

  checkIfIdExist(id) {
    let res = this.favoriteRepos.filter(obj => {
      return obj.id === id;
    });

    return Boolean(Number(res.length));
  }

  removeFavoriteRepo(id) {
    let res = this.favoriteRepos.filter(el => {
      return el.id != id;
    });

    this.favoriteRepos = res;
  }

  updateSearch() {
    this.searchService.searchRepo().subscribe(data => {
      this.randomRepos = data.json().items;
      console.log(this.randomRepos);
    });
  }

  handleLikedRepoFromChildComponent(repo) {
    let data = {
      id: repo.id,
      adddedAt: moment().format()
    };

    if (this.checkIfIdExist(repo.id)) {
      this.feedService.unlikeRepo(data.id).subscribe(data => {
        this.removeFavoriteRepo(repo.id);
      });
    } else {
      this.feedService.likeRepo(data).subscribe(data => {
        this.getFavoritesRepos();
      });
    }

  }

}
