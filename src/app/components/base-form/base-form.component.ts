import { FormGroup } from '@angular/forms';

export abstract class BaseFormComponent {

  form!: FormGroup;

  constructor() {}

  abstract createForm(): void;

  submit(): void {
    if (this.form.valid) {
      this.onSubmit();
    }
  }

  abstract onSubmit(): any;

}
