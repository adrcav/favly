import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { SearchService } from '../search.service';

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
    this.feedService.getIdRepos().subscribe(data => {
      this.favoriteIds = data.json();
      this.getFavoritesData(data.json());
    });

    this.updateSearch();
  }

  getFavoritesData(favorites) {
    favorites.forEach(element => {
      this.feedService.getFavoriteRepo(element.id).subscribe(data => {
        this.favoriteRepos.push(data.json());
      })
    });
  }

  updateSearch() {
    this.searchService.searchRepo().subscribe(data => {
      this.randomRepos = data.json().items;
      console.log(this.randomRepos);
    });
  }

  handleLikedRepoFromChildComponent(repo) {
    repo.likes++;
    this.feedService.likeRepo(repo).subscribe(data => {
      console.log(data.json());
    })
  }

}
