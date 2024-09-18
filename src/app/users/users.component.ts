import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pagination } from '../interfaces/pagination';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy{
  subscription: any;
  userSubscription: any;
  users: any[] = [];
  user: any;
  userImage: string = '';
  page: number = 1;
  search: string = '';
  role: string = 'admin';
  pagination: Pagination = {};

  constructor(private _AuthService: AuthService, private _UsersService: UsersService) { }

  getUsers() {
    this.subscription = this._UsersService.getAllUsers(undefined, this.page, 'name', this.search, this.role)
      .subscribe({
        next: (res) => {
          this.users = res.data;
          this.pagination = res.pagination
        }, error: (err) => { }
      })
  }

  changeUserActive(userId: string) {
    this.userSubscription = this._UsersService.getUser(userId).subscribe({
      next: (res) => {
        this.user = res.data
        this._UsersService.updateUser(userId, { active: !this.user.active }).subscribe({
          next: (res) => {
            this.getUsers();
            alert('user activation updated')
          }, error: (err) => { }
        })
      }
      , error: (err) => { }
    })
  }

  deleteUser(userId: string) {
    this._UsersService.deleteUser(userId).subscribe({
      next: (res) => {
        this.getUsers();
        alert('user deleted successfully')
      }, error: (err) => { }
    })
  }

  changeData(page: number) {
    this.page = page;
    this.getUsers();
  }

  searchData(data: string) {
    this.search = data;
    this.getUsers()
  };

  filterUsers(filter: string) {
    this.role = filter;
    this.getUsers()
  };

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.userImage = this._UsersService.userImage;
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.userSubscription) { this.userSubscription.unsubscribe() };
  }
}
