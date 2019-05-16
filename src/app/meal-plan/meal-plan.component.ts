import { Component } from '@angular/core';
import { MealPlan, Carbs } from 'src/app/meal-plan/meal-plan.model';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Food } from 'src/app/food/food.model';
import { FoodService } from 'src/app/food/food.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/auth/auth.service';
import { FormControl } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';

export interface CarbsGroup {
  type: string;
  foodNames: string[];
}

export interface ProteinsGroup {
  proteinType: string;
  proteinFoodNames: string[];
}

export interface FruitsGroup {
  fruitType: string;
  fruitFoodNames: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {
  foods: Food[] = [];
  carbs: Food[];
  proteins: Food[];
  carbList: Food[];
  proteinList: Food[];
  fruitList: Food[];
  fatList: Food[];
  isLoading = false;
  private foodSub: Subscription;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  carbControl = new FormControl();
  proteinControl = new FormControl();
  fruitControl = new FormControl();
  fatControl = new FormControl();

  displayedColumns: string[] = [
    'exchanges',
    'carbs',
    'protein',
    'fat',
    'kCals'
  ];
  mealsForm: FormGroup = this.fb.group({
    carbsGroup: ''
  });

  mealOne: FormGroup = this.fb.group({
    carbGroup: [''],
    proteinGroup: [''],
    fruitGroup: [''],
    fatGroup: ['']
  });


  proteinGroups: ProteinsGroup[] = [
    {
      proteinType: 'No Legs',
      proteinFoodNames: [
        'Egg Whites',
        'Salmon',
        'Tuna (Fresh or Water Packed)',
        'Cod (Fresh or Frozen)',
        'Halibut (Fresh or Frozen)'
      ]
    },
    {
      proteinType: 'Two Legs',
      proteinFoodNames: [
        'Chicken Breast',
        'Turkey Breast',
        'Cornish Hen',
        'Duck (No Skin)'
      ]
    },
    {
      proteinType: 'Four Legs',
      proteinFoodNames: ['Lean Beef', 'Bison', 'Lamb', 'Venison']
    }
  ];

  fruitGroups: FruitsGroup[] = [
    {
      fruitType: 'Fresh',
      fruitFoodNames: ['Strawberries', 'Blueberries', 'Mango']
    },
    {
      fruitType: 'Frozen',
      fruitFoodNames: ['Blueberries', 'Pineapple', 'Raspberries']
    },
    {
      fruitType: 'Dried',
      fruitFoodNames: ['Cherries', 'Mango', 'Apples']
    }
  ];

  carbGroupOptions: Observable<Food[]>;
  proteinGroupOptions: Observable<ProteinsGroup[]>;
  fruitGroupOptions: Observable<FruitsGroup[]>;
  dataSource: Food[];
  constructor(
    private fb: FormBuilder,
    public foodService: FoodService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.foodService.getFoods();
    this.foodSub = this.foodService
      .getFoodUpdateListener()
      .subscribe((foodsData: { foods: Food[] }) => {
        this.isLoading = false;
        this.foods = foodsData.foods;
        this.carbList = this.filterCarbs(this.foods);
        this.proteinList = this.filterProtein(this.foods);
        this.fruitList = this.filterFruit(this.foods);
        this.fatList = this.filterFat(this.foods);
        this.dataSource = this.foods;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.carbGroupOptions = this.mealOne.get('carbGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value))
    );
    console.log('carbGroupOptions: ' + this.carbGroupOptions );

    // this.proteinGroupOptions = this.mealOne
    //   .get('proteinGroup')!
    //   .valueChanges.pipe(
    //     startWith(''),
    //     map(value => this._filterProteinGroup(value))
    //   );

    // this.fruitGroupOptions = this.mealOne.get('fruitGroup')!.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filterFruitGroup(value))
    // );
  }

  private filterCarbs(foods: Food[]): Food[] {
    this.carbList = foods.filter(carb => carb.category === 'Carbs');
    return this.carbList;
  }

  private filterProtein(foods: Food[]): Food[] {
    this.proteinList = foods.filter(protein => protein.category === 'Protein');
    return this.proteinList;
  }

  private filterFruit(foods: Food[]): Food[] {
    this.fruitList = foods.filter(fruit => fruit.category === 'Fruit');
    return this.fruitList;
  }

  private filterFat(foods: Food[]): Food[] {
    this.fatList = foods.filter(fat => fat.category === 'Fat');
    return this.fatList;
  }

  private _filterGroup(value: string): Food[] {
    if (value) {
      return this.carbs
        .map(carbList => ({
          id: carbList.id,
          category: carbList.category,
          type: carbList.type,
          // name: _filter(carbList.name, value),
          // name: carbList.filter(carb => carb.category === 'Carbs'),
          name: carbList.name,
          carbs: carbList.carbs,
          protein: carbList.protein,
          fat: carbList.fat,
          kCals: carbList.kCals,
          serving: carbList.serving,
          measurement: carbList.measurement,
          exchanges: carbList.exchanges
        }))
        .filter(group => group.name.length > 0);
    }

    return this.carbs;
  }

  // private _filterProteinGroup(value: string): ProteinsGroup[] {
  //   if (value) {
  //     return this.proteinGroups
  //       .map(proteinGroup => ({
  //         proteinType: proteinGroup.proteinType,
  //         proteinFoodNames: _filter(proteinGroup.proteinFoodNames, value)
  //       }))
  //       .filter(proteinGroup => proteinGroup.proteinFoodNames.length > 0);
  //   }

  //   return this.proteinGroups;
  // }

  // private _filterFruitGroup(value: string): FruitsGroup[] {
  //   if (value) {
  //     return this.fruitGroups
  //       .map(fruitGroup => ({
  //         fruitType: fruitGroup.fruitType,
  //         fruitFoodNames: _filter(fruitGroup.fruitFoodNames, value)
  //       }))
  //       .filter(fruitGroup => fruitGroup.fruitFoodNames.length > 0);
  //   }

  //   return this.fruitGroups;
  // }
}
