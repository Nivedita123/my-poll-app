import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, QueryDocumentSnapshot, CollectionReference, Query } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


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
   * get user with given email, if not return null
   * 
   * @param email email to fetch
   */
  getUserByEmail(email: string): Observable<User> {

    console.log("kk");
    return this.firestore.collection<User>('users', ref => ref.where('email', 
    '==', email))
      .snapshotChanges()
      .pipe(map(users => {

        console.log(users);
        
        const user = users[0];
        if (user) {
          const data = user.payload.doc.data() as User;
          const id = user.payload.doc.id;
          return { id, ...data };
        }
        else {
          return null;
        }
      }));

  }

  UpdateUser(user: User) {

  }

  DeleteUser(id: string) {

  }
}
