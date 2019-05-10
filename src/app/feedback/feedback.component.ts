import { Component } from '@angular/core';
import { SleepOption, MealTracker } from 'src/app/feedback/feedback.model';

@Component({
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  sleepOptions: SleepOption[] = [
    { rating: 5, description: 'Fully rested - Carpe Diem' },
    { rating: 4, description: 'Pretty good - No snooze needed' },
    { rating: 3, description: 'Alright - Just 5 more minutes' },
    { rating: 2, description: 'Bad - Need my coffee' },
    { rating: 1, description: 'Horrible - Walking zombie' }
  ];

  mealTracker: MealTracker[] = [
    { meal: 'Breakfast', timing: false, food: false, missed: false },
    { meal: 'Snack 1', timing: false, food: false, missed: false },
    { meal: 'Lunch', timing: false, food: false, missed: false },
    { meal: 'Snack 2', timing: false, food: false, missed: false },
    { meal: 'Dinner', timing: false, food: false, missed: false },
    { meal: 'Snack 3', timing: false, food: false, missed: false }
  ];
  displayedColumns: string[] = ['meal', 'timing', 'food', 'missed', 'water'];
  dataSource = this.mealTracker;
}
