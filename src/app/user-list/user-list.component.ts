import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  allUser: Object;
  users: any[];

  constructor(private userService: UserService, private route: Router) {
    this.userService.getAllUser().subscribe((users: any) =>
      this.users = this.allUser = users);
  }
  ngOnInit() {
    this.getLatestUser();
  }

  getLatestUser() {
    this.userService.getAllUser().subscribe((response) => {
      this.allUser = response;
    })
  }

  deleteUser(user) {
    this.userService.deleteUser(user).subscribe(() => {
      this.getLatestUser();
    })
  }
  filter(query: string) {
    if (query) {
      this.allUser = this.users.filter(p => p.name && p.name.toLowerCase().includes(query.toLowerCase()));
    } else {
      this.allUser = this.users;
    }
  }

}

