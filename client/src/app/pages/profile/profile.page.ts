import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  isChanged: boolean;
  constructor(private usersService: UsersService) {
    this.usersService.getCurrentUser().subscribe((user: User) => {
      this.user = user;
      this.isChanged = false;
    });
  }

  ngOnInit() {}

  updateProfile() {
    this.usersService.updateUser(this.user).subscribe((user: User) => {
      this.user = user;
      this.isChanged = false;
    });
  }
}
