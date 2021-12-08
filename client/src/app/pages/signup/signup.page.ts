import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterUser } from 'src/app/types/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      weight: '',
      height: '',
      dateOfBirth: '',
      goalWeight: '',
      goalCalories: '',
    });
  }

  ngOnInit() {}

  signup() {
    const newUser: RegisterUser = this.signupForm.value;
    this.authService.register(newUser).subscribe(
      () => {
        this.router.navigateByUrl('tabs');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateGoalCalories() {
    const weight = this.signupForm.value.weight;
    const height = this.signupForm.value.height;
    const birthDate = this.signupForm.value.dateOfBirth;
    if (weight && height && birthDate) {
      const age = this.calculateAge(birthDate);
      const goalCalories = this.calculateGoalCalories(weight, height, age);

      this.signupForm.patchValue({ goalCalories });
    }
  }
  calculateGoalCalories(weight: number, height: number, age: number) {
    const BMR = 66 + 13.7 * weight + 5 * height - 6.8 * age;
    return Math.round(BMR * 1.2);
  }
  calculateAge(birthDate: string) {
    const date = new Date(birthDate);
    const today = new Date();
    return today.getFullYear() - date.getFullYear();
  }
}
