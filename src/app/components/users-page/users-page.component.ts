import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { VerifyResponse } from '../../models/user.model';
import { Router } from '@angular/router';
import { ClassCookieService } from '../../services/cookie.service';
import { BaseFormComponent } from '../base-form/base-form.component';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent extends BaseFormComponent {

  btnCreateUpdate: string = 'CREATE';
  updateUserId: string = ''
  userListForm: FormGroup;

  constructor(private apiService: ApiService, private cookieService: ClassCookieService, private router: Router) {
    super();
    this.createForm();

    this.userListForm = new FormGroup({
      userList: new FormArray([])
    });
  }

  createForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('ADMIN', Validators.required),
    });
  }

  onSubmit(): any {
    if (this.btnCreateUpdate == 'CREATE') {  
      return this.apiService.registerAuth(this.form.value).subscribe(() => {
        this.quitUpdate();
        this.loadUsers();
      });
    }

    return this.apiService.updateAuth(this.updateUserId, this.form.value).subscribe(() => {      
      this.removeUserForm(this.updateUserId);
      this.quitUpdate();
      this.loadUsers();
    });
    
  }

  ngOnInit(): void {
    this.loadUsers();
  };

  loadUsers() {
    this.apiService.verifyAuth().subscribe(
      (data) => data.map(user => !this.userExists(user.userId) && this.addUser(user)),
      (error) => console.log("Error loading users", error)
    )
  };

  updateInputs(user: VerifyResponse) {
  
    this.form.setValue({
      username: user.username,
      password: '',
      role: 'ADMIN'
    })
    this.updateUserId = user.userId
    this.btnCreateUpdate = 'UPDATE';
  }

  deleteUser(id: string) {
        
    this.apiService.deleteAuth(id).subscribe(() => {
      this.removeUserForm(id)
      this.loadUsers();
    });
  }

  quitUpdate = () => {

    this.form.setValue({
      username: '',
      password: '',
      role: 'ADMIN'
    });
    this.btnCreateUpdate = "CREATE";
    this.updateUserId = '';
  }

  // ----- FormArray -----

  get userList() {
    return this.userListForm.get('userList') as FormArray;
  }

  addUser(user: VerifyResponse) {
    const userGroup = new FormGroup({
      userId: new FormControl(user.userId),
      username: new FormControl(user.username),
      role: new FormControl(user.role)
    });

    this.userList.push(userGroup);
  }

  userExists(userId: string): boolean {
    return this.userList.controls.some(userGroup => {
      return userGroup.get('userId')?.value === userId;
    });
  }

  removeUserForm(id: string) {
    const index = this.userList.controls.findIndex(userGroup => {
      return userGroup.get('userId')?.value === id;
    });

    if (index !== -1) {
      this.userList.removeAt(index);
    }
  }

}
