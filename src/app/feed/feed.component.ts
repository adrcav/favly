import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  repos = [
    {
      name: 'repo-1',
      description: 'Simple repo test.',
      author: {
        name: 'Fulano',
        avatar: 'https://semantic-ui.com/images/avatar/small/jenny.jpg'
      },
      likes: 2
    },
    {
      name: 'repo-2',
      description: 'Simple repo test.',
      author: {
        name: 'Nome',
        avatar: 'https://semantic-ui.com/images/avatar/small/jenny.jpg'
      },
      likes: 1
    },
    {
      name: 'repo-3',
      description: 'Simple repo test.',
      author: {
        name: 'Sicrano',
        avatar: 'https://semantic-ui.com/images/avatar/small/jenny.jpg'
      },
      likes: 5
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  handleLikedRepoFromChildComponent(repo) {
    repo.likes++;
  }

}
