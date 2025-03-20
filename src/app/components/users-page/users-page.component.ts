import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { VerifyResponse } from '../../models/user.model';
import { Router } from '@angular/router';
import { BaseFormComponent } from '../base-form/base-form.component';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent extends BaseFormComponent {

  dateTest = new Date();

  btnCreateUpdate: string = 'CREATE';
  updateUserId: string = ''
  userListForm: FormGroup;
  isVisibleCrud: boolean = true;
  isVisibleList: boolean = true;

  private unsubscribe$ = new Subject<void>();
  

  constructor(private apiService: ApiService, private router: Router) {
    super();
    this.createForm();

    this.userListForm = new FormGroup({
      userList: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.form.controls['username'].valueChanges.pipe(
      filter(value => value.length > 5)
    ).subscribe(value => {
      console.log(value); 
    })
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('Cancela a assinatura ao destruir o usersPage');
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
      return this.apiService.registerAuth(this.form.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
        this.quitUpdate();
        this.loadUsers();
      });
    }

    return this.apiService.updateAuth(this.updateUserId, this.form.value)
      .pipe(takeUntil(this.unsubscribe$))  
      .subscribe(() => {      
        this.removeUserForm(this.updateUserId);
        this.quitUpdate();
        this.loadUsers();
      });
  }

  loadUsers() {
    this.apiService.verifyAuth()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (data) => data.map(user => !this.userExists(user.userId) && this.addUser(user)),
      error: (error) => console.log("Error loading users", error),
      complete: () => console.log('Carregamento de usuários finalizado.')
  })
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
        
    this.apiService.deleteAuth(id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
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

  // removeUserForm(index: number) {
  //   const usereIdRemove = this.userList.at(index).get('userId')?.value;
  //   this.userList.removeAt(index);
  // }

  receiveLog(event: string) {
    console.log(event);
  }

  receiveVisibilityList(event: boolean) {
    this.isVisibleList = event;
  }

  receiveVisibilityCrud(event: boolean) {
    this.isVisibleCrud = event;
  }

  toggleVisibility() {
    this.isVisibleList = !this.isVisibleList;
  }

  onFocus(string: string) {
    console.log("O usuário acessou o input " + string);
  }

  onBlur(string: string) {
    console.log("O usuário saiu do input " + string);
  }

  onChange(string: string) {
    console.log("O usuário alterou o input " + string);
  }

}
