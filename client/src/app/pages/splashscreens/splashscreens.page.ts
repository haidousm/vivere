import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-splashscreens',
  templateUrl: './splashscreens.page.html',
  styleUrls: ['./splashscreens.page.scss'],
})
export class SplashscreensPage implements OnInit {
  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.usersService.getCurrentUser().subscribe((user: User) => {
      if (user) {
        this.router.navigateByUrl('tabs');
      }
    });
  }
}
