import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/services/poll.service';
import { Poll } from 'src/app/models/poll.model';
import { Option } from 'src/app/models/option.model';

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

  submitPoll (poll: Poll, option: Option) {

    console.log(poll);
    console.log(option);

    option.currentUserVoted = true;

  }

}
