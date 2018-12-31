import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/services/poll.service';
import { Poll } from 'src/app/models/poll.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  polls$;

  constructor(
    private ps : PollService
  ) { }

  ngOnInit() {

    this.ps.getAll().subscribe( data => {
      this.polls$ = data;
      console.log(data);
    });
  }

}
