export interface DiaryCalories {
  totalCalories: number;
  mealsCalories: {
    mealId: string;
    calories: number;
  }[];
}
