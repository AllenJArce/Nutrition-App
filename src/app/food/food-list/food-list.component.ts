import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Food } from 'src/app/food/food.model';
import { AuthService } from 'src/app/auth/auth.service';
import { FoodService } from 'src/app/food/food.service';
import { MatTableDataSource } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
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
  expandedFood: Food | null;
  // displayedColumns: string[] = [
  //   'category',
  //   'type',
  //   'name',
  //   'carbs',
  //   'protein',
  //   'fat',
  //   'kCals',
  //   'serving',
  //   'measurement',
  //   'exchanges'
  // ];

  displayedColumns: string[] = [
    'category',
    'type',
    'name',
    // 'carbs',
    // 'protein',
    // 'fat',
    // 'kCals',
    // 'serving',
    // 'measurement',
    // 'exchanges'
  ];

  // collapsedColumns: string[] = [
  //   'category',
  //   'type',
  //   'name',
  //   'carbs',
  //   'protein',
  //   'Fat',
  //   'KCals',
  //   'Serving',
  //   'Measurement',
  //   'Exchanges'
  // ];

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

  onDelete(foodId: string) {
    this.isLoading = true;
    this.foodService.deleteFood(foodId).subscribe(() => {
      this.foodService.getFoods();
    }, () => {
      this.isLoading = false;
      console.log('foodId is ' + foodId);
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
