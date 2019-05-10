import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Food } from 'src/app/food/food.model';
import { AuthService } from 'src/app/auth/auth.service';
import { FoodService } from 'src/app/food/food.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  foods: Food[] = [];
  isLoading = false;

  userIsAuthenticated = false;
  userId: string;
  private foodSub: Subscription;
  private authStatusSub: Subscription;
  // dataSource: Food[];
  dataSource = new MatTableDataSource(this.foods);
  displayedColumns: string[] = [
    'category',
    'type',
    'name',
    'carbs',
    'protein',
    'fat',
    'kCals',
    'serving',
    'measurement',
    'exchanges'
  ];

  constructor(
    public foodService: FoodService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.foodService.getFoods();
    this.userId = this.authService.getUserId();
    this.foodSub = this.foodService
      .getFoodUpdateListener()
      .subscribe((foodData: { foods: Food[] }) => {
        this.isLoading = false;
        this.foods = foodData.foods;
        this.dataSource = new MatTableDataSource(this.foods);
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });

    // this.dataSource = this.foods;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
