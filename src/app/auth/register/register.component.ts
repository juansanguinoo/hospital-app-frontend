import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private fb: FormBuilder) {}

  public submittedForm: boolean = false;
  public registerForm = this.fb.group(
    {
      name: ['Juan David', [Validators.required, Validators.minLength(3)]],
      email: ['juandavid@mail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '1234567',
        [Validators.required, Validators.minLength(6)],
      ],
      termsAndConditions: [false, Validators.required],
    },
    {
      validators: this.passwordValidator('password', 'confirmPassword'),
    }
  );

  createUser() {
    this.submittedForm = true;

    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm);
  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.submittedForm) {
      return true;
    }

    return false;
  }

  termsAndConditionsInvalid(): boolean {
    return (
      !this.registerForm.get('termsAndConditions')?.value && this.submittedForm
    );
  }

  invalidPassword(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password !== confirmPassword && this.submittedForm) {
      return true;
    }

    return false;
  }

  passwordValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (passwordControl?.value !== confirmPasswordControl?.value) {
        confirmPasswordControl?.setErrors({ invalidPassword: true });
      } else {
        confirmPasswordControl?.setErrors(null);
      }
    };
  }
}
