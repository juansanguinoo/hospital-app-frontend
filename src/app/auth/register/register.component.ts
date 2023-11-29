import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  public submittedForm: boolean = false;
  public registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
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

    this.userService.createUser(this.registerForm.value).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        Swal.fire('Error', err.error.message, 'error');
      },
    });
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
