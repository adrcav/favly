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

  userId = localStorage.getItem("user_id");
  favoriteIds = [];
  favoriteRepos = [];
  randomRepos = [];

  constructor(private feedService: FeedService, private searchService: SearchService) { }

  ngOnInit() {
    (!this.userId) ? this.getUserId() : this.getFavoritesRepos(this.userId);

    this.updateSearch();
  }

  getUserId() {
    this.feedService.getUserId().subscribe(data => {
      let res = data.json();
      localStorage.setItem('user_id', res.data._id);
      this.userId = res.data._id;
      this.getFavoritesRepos(this.userId);
    });
  }

  getFavoritesRepos(userId) {
    this.feedService.getIdRepos(userId).subscribe(data => {
      let res = data.json();
      this.favoriteIds = res.user.repositories;
      this.getFavoriteData(res.user.repositories);
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
    });
  }

  handleLikedRepoFromChildComponent(repo) {
    let data = {
      repository: {
        id: repo.id,
        adddedAt: moment().format()
      }
    };

    if (this.checkIfIdExist(repo.id)) {
      this.feedService.unlikeRepo(this.userId, repo.id).subscribe(data => {
        this.removeFavoriteRepo(repo.id);
      });
    } else {
      this.feedService.likeRepo(this.userId, data).subscribe(data => {
        this.getFavoritesRepos(this.userId);
      });
    }

  }

}
