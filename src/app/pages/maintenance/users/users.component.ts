import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

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
    private searchService: SearchService
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
}
