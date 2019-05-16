import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Food } from 'src/app/food/food.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/food/';

@Injectable({ providedIn: 'root' })
export class FoodService {
  private foods: Food[] = [];
  private foodsUpdated = new Subject<{ foods: Food[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getFoods() {
    this.http
      .get<{ message: string; foods: any }>(BACKEND_URL)
      .pipe(
        map(foodData => {
          return {
            foods: foodData.foods.map(food => {
              return {
                id: food._id,
                category: food.category,
                type: food.type,
                name: food.name,
                carbs: food.carbs,
                protein: food.protein,
                fat: food.fat,
                kCals: food.kCals,
                serving: food.serving,
                measurement: food.measurement,
                exchanges: food.exchanges
              };
            })
          };
        })
      )
      .subscribe(foodData => {
        this.foods = foodData.foods;
        this.foodsUpdated.next({
          foods: [...this.foods]
        });
      });
  }

  getCarbs() {
    this.http
      .get<{ message: string; foods: any }>(BACKEND_URL)
      .pipe(
        map(foodData => {
          return {
            foods: foodData.foods.map(food => {
              if (food.category === 'Carbs') {
                return {
                  id: food._id,
                  category: food.category,
                  type: food.type,
                  name: food.name,
                  carbs: food.carbs,
                  protein: food.protein,
                  fat: food.fat,
                  kCals: food.kCals,
                  serving: food.serving,
                  measurement: food.measurement,
                  exchanges: food.exchanges
                };
              }
            })
          };
        })
      )
      .subscribe(foodData => {
        this.foods = foodData.foods;
        this.foodsUpdated.next({
          foods: [...this.foods]
        });
      });
  }

  getCarbUpdateListener() {
    return this.foodsUpdated.asObservable();
  }


  getFoodUpdateListener() {
    return this.foodsUpdated.asObservable();
  }

  addFood(
    category: string,
    type: string,
    name: string,
    carbs: number,
    protein: number,
    fat: number,
    kCals: number,
    serving: number,
    measurement: string,
    exchanges: number

    // category: string,
    // type: string,
    // name: string,
    // carbs: string,
    // protein: string,
    // fat: string,
    // kCals: string,
    // serving: string,
    // measurement: string,
    // exchanges: string
  ) {
    const foodData: Food = {
      id: null,
      category: category,
      type: type,
      name: name,
      carbs: carbs,
      protein: protein,
      fat: fat,
      kCals: kCals,
      serving: serving,
      measurement: measurement,
      exchanges: exchanges
    };

    // const foodData = new FormData();
    // foodData.append('category', category);
    // foodData.append('type', type);
    // foodData.append('name', name);
    // foodData.append('carbs', carbs.toString());
    // foodData.append('protein', protein.toString());
    // foodData.append('fat', fat.toString());
    // foodData.append('kCals', kCals.toString());
    // foodData.append('serving', serving.toString());
    // foodData.append('measurement', measurement);
    // foodData.append('exchanges', exchanges.toString());

    // foodData.append('category', category);
    // foodData.append('type', type);
    // foodData.append('name', name);
    // foodData.append('carbs', carbs);
    // foodData.append('protein', protein);
    // foodData.append('fat', fat);
    // foodData.append('kCals', kCals);
    // foodData.append('serving', serving);
    // foodData.append('measurement', measurement);
    // foodData.append('exchanges', exchanges);

    // maybe change from formData to regular data object ex: authData
    console.log('foodService category ' + category);
    console.log('foodService name ' + name);
    console.log('foodService foodData ' + foodData);
    console.log('foodService carb ' + carbs.toString());

    this.http.post(BACKEND_URL + 'food-create', foodData).subscribe(
      () => {
        this.router.navigate(['/food-list']);
      },
      error => {
        console.log('hit http post in addFood() ' + foodData);
      }
    );

    // this.http
    //   .post<{ message: string; food: Food }>(
    //     BACKEND_URL + 'food-create',
    //     foodData
    //   )
    //   .subscribe(
    //     responseData => {
    //       this.router.navigate(['/food-list']);
    //       console.log('foodService.addFood is hit' + responseData);
    //     },
    //     error => {
    //       this.router.navigate(['/food-list']);
    //       console.error('error for subscribe' + error.message);
    //     }
    //   );
  }

  // stringNum = '3';
  // number: number;
  // can try converting to number
  updateFood(
    id: string,
    category: string,
    type: string,
    name: string,
    carbs: number,
    protein: number,
    fat: number,
    kCals: number,
    serving: number,
    measurement: string,
    exchanges: number

    // id: string,
    // category: string,
    // type: string,
    // name: string,
    // carbs: string,
    // protein: string,
    // fat: string,
    // kCals: string,
    // serving: string,
    // measurement: string,
    // exchanges: string
  ) {
    const foodData: Food = {
      id: id,
      category: category,
      type: type,
      name: name,
      carbs: carbs,
      protein: protein,
      fat: fat,
      kCals: kCals,
      serving: serving,
      measurement: measurement,
      exchanges: exchanges
    };
    // this.http.put(BACKEND_URL + id, foodData);

    // let foodData: Food | FormData;
    // foodData = new FormData();
    // foodData.append('id', id);
    // foodData.append('category', category);
    // foodData.append('type', type);
    // foodData.append('name', name);
    // foodData.append('carbs', carbs);
    // foodData.append('protein', protein);
    // foodData.append('fat', fat);
    // foodData.append('kCals', kCals);
    // foodData.append('serving', serving);
    // foodData.append('measurement', measurement);
    // foodData.append('exchanges', exchanges);

    // this.http.post(BACKEND_URL + 'food-create', foodData).subscribe(
    //   () => {
    //     this.router.navigate(['/food-list']);
    //   },
    //   error => {
    //     console.log('hit http post in addFood() ' + foodData);
    //   }
    // );

    this.http
    .put(BACKEND_URL + id, foodData)
    .subscribe(response => {
      this.router.navigate(['/food-list']);
    },
    error => {
      console.log('hit http put in addFood() ' + error);
    });
  }



  deleteFood(foodId: string) {
    return this.http.delete(BACKEND_URL + foodId);
  }

  getFood(name: string) {
    return this.http.get<{
      _id: string;
      category: string;
      type: string;
      name: string;
      carbs: number;
      protein: number;
      fat: number;
      kCals: number;
      serving: number;
      measurement: string;
      exchanges: number;
      // id: string;
      // category: string;
      // type: string;
      // name: string;
      // carbs: string;
      // protein: string;
      // fat: string;
      // kCals: string;
      // serving: string;
      // measurement: string;
      // exchanges: string;
    }>(BACKEND_URL + name);
  }
}
