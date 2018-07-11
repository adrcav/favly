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

  repos;
  randomRepos = [];

  constructor(private feedService: FeedService, private searchService: SearchService) { }

  ngOnInit() {
    this.feedService.getRepos().subscribe(data => {
      this.repos = data.json();
    });

    this.updateSearch();
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
