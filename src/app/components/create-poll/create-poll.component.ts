import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/models/poll.model';
import { Option } from 'src/app/models/option.model';
import { User } from 'src/app/models/user.model';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  poll: Poll;
  options: Option[];
  user: User;

  constructor(
    private ps: PollService
  ) { }

  ngOnInit() {

    this.createPoll();
  }

  createPoll() {
/*
    this.user = {
      "id": 'NqxwR3owBHoqZaBtO9aX',
      "firstName": 'Nivedita',
      "lastName": 'Gautam',
      "password": 'kmkgdm',
      "email" : 'niveditagautam000@gmail.com'
    }

    this.options[0] = {
      "desc" : 'Morning',
      "votes" : []
    }

    this.poll = {
      "desc" : 'Whwn do you wake up?',
      "options" : this.options,
      "time" : new Date()
    }

    console.log(this.poll);

    this.ps.createPoll(this.poll);
  */
  }

}
