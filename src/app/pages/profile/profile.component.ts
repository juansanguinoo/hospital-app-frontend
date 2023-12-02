import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup = new FormGroup({});
  public user: User | undefined;
  public image: File | undefined;
  public tempImage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private uploadService: UploadService
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user?.name, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    this.userService.updateUser(this.profileForm.value).subscribe({
      next: (resp) => {
        console.log(resp);
        const { name, email } = this.profileForm.value;
        if (this.user) {
          this.user.name = name;
          this.user.email = email;

          Swal.fire('Success', 'Profile updated successfully', 'success');
        }
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', error.error.message, 'error');
      },
    });
  }

  handleImage(event: any) {
    const file: File = event.target.files[0];
    if (!file) {
      this.image = undefined;
      this.tempImage = undefined;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      this.image = undefined;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.tempImage = reader.result as string;
    };
    this.image = file;
  }

  uploadImage() {
    if (this.user) {
      this.uploadService
        .updateImage(this.image!, 'users', this.user._id!)
        .then((img) => {
          this.user!.img = img.fileName;
          Swal.fire('Success', 'Image updated successfully', 'success');
        })
        .catch((error) => {
          Swal.fire('Error', error.error.message, 'error');
        });
    }
  }
}
