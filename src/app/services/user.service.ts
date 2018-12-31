import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private firestore: AngularFirestore,
    private db: AngularFireDatabase) { }

  /**
   * register a new user
   * 
   * @param user user to add
   *  */
  addUser(user: User) {

    return this.firestore.collection<User>('users').add(user)
      .then(function (docRef) {
        console.log("User added with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding user: ", error);
      });

  }

  /**
   * get a single user
   * 
   * @param id user id to fetch
   */
  getUserById(id: string): Promise<User> {

    let user: User = null;

    return this.firestore.collection<User>('users').doc(id).ref.get()
      .then(function (doc) {

        console.log(doc.data());
        return (doc.data() as User);

      });
  }

  /**
   * get user with given email, if not return false
   * 
   * @param email email to fetch
   */
  getUserByEmail(email: string): Observable<User> {

    let user: User;


    let userRef: AngularFireList<any>;


    userRef = this.db.list("users").query;

    return 
      .valueChanges<User>().forEach(
        item => {

          if (item.length != 0) {

            user = (item[0].payload.doc.data()) as User;
            user.id = item[0].payload.doc.id
          }
          console.log(user);  
          return user;
        }
      )
    }

  /**
   * Update user Object
   * @param user 
   */
  UpdateUser(user: User) {

  }

  /**
   * delete a user's account
   * 
   * @param id user id to delete
   */
  DeleteUser(id: string) {

  }
}
