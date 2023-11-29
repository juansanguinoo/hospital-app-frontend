import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

const clientID = environment.clientID;
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn')
  googleBtn!: ElementRef;

  public submittedForm: boolean = false;
  public loginForm: FormGroup = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.googleLogin();
  }

  googleLogin() {
    google.accounts.id.initialize({
      client_id: clientID,
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(this.googleBtn.nativeElement, {
      theme: 'outline',
      size: 'large',
    });
  }

  handleCredentialResponse(response: any) {
    this.userService.loginWithGoogle(response.credential).subscribe({
      next: (resp) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/dashboard');
        });
      },
      error: (err) => {
        Swal.fire('Error', err.error.message, 'error');
      },
    });
  }

  login() {
    this.submittedForm = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value).subscribe({
      next: (resp) => {
        if (this.loginForm.get('rememberMe')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        Swal.fire('Error', err.error.message, 'error');
      },
    });
  }
}
