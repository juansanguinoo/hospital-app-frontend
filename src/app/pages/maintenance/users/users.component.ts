import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ModalService } from 'src/app/services/modal.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit {
  public total: number = 0;
  public users: User[] = [];
  public from: number = 0;
  public loading: boolean = true;

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({ total, users }) => {
      this.total = total;
      this.users = users;
      this.loading = false;
    });
  }

  handleChangePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.total) {
      this.from -= value;
    }

    this.getUsers();
  }

  handleSearch(value: string) {
    if (value.length === 0) {
      return this.getUsers();
    }

    this.searchService.filter(value, 'users').subscribe((users) => {
      this.users = users;
    });
  }

  handleDeleteUser(user: User) {
    if (user._id === this.userService.uid) {
      return Swal.fire(
        'No puede borrar usuario',
        'No se puede borrar a sí mismo',
        'error'
      );
    }

    return Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de borrar a ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(user._id!).subscribe(() => {
          this.getUsers();
          Swal.fire(
            'Usuario borrado',
            `El usuario ${user.name} ha sido borrado`,
            'success'
          );
        });
      }
    });
  }

  handleChangeRole(user: User) {
    this.userService.updateRole(user).subscribe(() => {
      Swal.fire(
        'Rol actualizado',
        `El rol de ${user.name} ha sido actualizado`,
        'success'
      );
    });
  }

  openModal(user: User) {
    this.modalService.openModal();
  }
}
