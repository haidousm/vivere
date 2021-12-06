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

  userHeight: number;
  userWeight: number;
  userGoalWeight: number;
  userGoalCalories: number;
  constructor(private usersService: UsersService) {}
  ngOnInit() {
    this.usersService.getCurrentUser().subscribe((user: User) => {
      this.user = user;
      this.updateIsChanged();
    });
  }

  updateProfile() {
    this.user.height = this.userHeight;
    this.user.weight = this.userWeight;
    this.user.goalWeight = this.userGoalWeight;
    this.user.goalCalories = this.userGoalCalories;
    this.usersService.updateUser(this.user).subscribe((user: User) => {
      this.user = user;
      this.updateIsChanged();
    });
  }

  updateIsChanged() {
    this.isChanged =
      this.userHeight === this.user.height &&
      this.userWeight === this.user.weight &&
      this.userGoalWeight === this.user.goalWeight &&
      this.userGoalCalories === this.user.goalCalories;
  }
}