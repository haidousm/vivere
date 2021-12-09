import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiaryService } from 'src/app/services/diary.service';
import { StorageService } from 'src/app/services/storage.service';
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
  constructor(
    private usersService: UsersService,
    private diaryService: DiaryService,
    private storageService: StorageService,
    private router: Router
  ) {}
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
      this.diaryService.refreshDiary.next(Math.random());
    });
  }

  updateIsChanged() {
    this.isChanged =
      this.userHeight === this.user.height &&
      this.userWeight === this.user.weight &&
      this.userGoalWeight === this.user.goalWeight &&
      this.userGoalCalories === this.user.goalCalories;
  }

  logout() {
    this.usersService.logout().subscribe(() => {
      this.router.navigateByUrl('splashscreens');
      this.storageService.remove('token');
    });
  }
}
