import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public newUserForm : FormGroup

  constructor(
    public fb: FormBuilder,
    public us: UserService
  ) { }

  ngOnInit() {

    this.newUserForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['']
    });  
  }

  registerUser() {
    let res = this.us.addUser(this.newUserForm.value); // Submit student data using CRUD API
    this.newUserForm.reset();  // Reset form when clicked on reset button
   };

}
