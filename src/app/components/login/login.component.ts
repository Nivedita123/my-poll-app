import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public existingUserForm: FormGroup;

  public errMsg$: string;

  constructor(
    public fb: FormBuilder,
    public us: UserService
  ) { }

  ngOnInit() {

    this.existingUserForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  loginUser() {

    this.us.getUserByEmail(this.existingUserForm.value.email).subscribe(
      
      user => {

        console.log("here");
        console.log(user);
        // user with email found
        if (user) {

          // pwd matches
          if (user.password == this.existingUserForm.value.password) {

            this.errMsg$ = "Login success";
          }
          else {
            this.errMsg$ = "Incorrect password";
          }
        }
        else {
          this.errMsg$ = "User with this email does not exist!";
        }
      }
    );
  }
}
