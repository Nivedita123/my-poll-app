import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Poll } from '../models/poll.model';
import { map } from 'rxjs/operators'
import { Option } from '../models/option.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(
    private firestore: AngularFirestore,
    private us: UserService
  ) { }

  /**
   * 
   * @returns list of polls from the DB
   */

  getAll(): Observable<Poll[]> {

    let polls: Poll[] = [];

    this.firestore.collection('polls').ref.get()
      .then(res => {

        res.forEach(pollDoc => {

          // to avoid adding the entry more than once
          let added: boolean = false;

          let poll = pollDoc.data();
          poll.id = pollDoc.id;

          // fetch details of user who posted the poll
          if (poll.user) {

            poll.user.get()
              .then(userDoc => {

                poll.user = userDoc.data() as User;
                poll.user.id = userDoc.id;

                //  fetch the options for the poll
                if (poll.options) {

                  for(let i = 0 ; i < poll.options.length; i++) {

                    poll.options[i].get().then(optionDoc => {

                      poll.options[i] = optionDoc.data() as Option;
                      poll.options[i].id = optionDoc.id;

                      // fetch the voters of the options
                      if (poll.options[i].voters) {

                        for (let j = 0; j < poll.options[i].voters.length; j++) {

                          poll.options[i].voters[j].get().then( voterDoc => {

                            poll.options[i].voters[j] = voterDoc.data() as User;
                            poll.options[i].voters[j].id = voterDoc.id;

                            // add during last iteration of voter
                            if (j == poll.options[i].voters.length - 1 && !added) {

                              polls.push(poll as Poll);
                              added = true;
                              console.log("added");
                            }
                          })
                        }
                      }
                      // no voters, add during last itration of option
                      else {
                        if (!added && i == poll.options[i].length - 1) {
                          polls.push(poll as Poll);
                          added = true;
                          console.log("added");
                        }
                      }
                    })
                  }
                } // no options present
                else {
                  polls.push(poll as Poll);
                  added = true;
                  console.log("added");
                }
              })
              .catch(err => console.error(err));
          } // no user for the poll 
          else {
            polls.push(poll as Poll);
            added = true;
            console.log("added");
          }
        });
      })
      .catch(err => { console.error(err) });

      console.log("function ended")
    return of(polls);
  }

  createPoll(poll: Poll) {

    this.firestore.collection('polls').add(poll)
      .then(function (docRef) {
        console.log("User added with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding user: ", error);
      });
  }

}
