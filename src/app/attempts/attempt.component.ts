import { Component } from '@angular/core';
import { MealPlan, Carbs } from 'src/app/meal-plan/meal-plan.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { Food } from 'src/app/food/food.model';
import { FoodService } from 'src/app/food/food.service';
import { AuthService } from 'src/app/auth/auth.service';



// export const _filter = (opt: string[], value: string): string[] => {
//   const filterValue = value.toLowerCase();

//   return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
// };

// export const _filter = (opt: string[], value: string): string[] => {
//   const filterValue = value.toLowerCase();

//   return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
// };
@Component({
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.css']
})
export class AttemptComponent implements OnInit {
  foods: Food[] = [];
  carbs: Food[];
  proteins: Food[];
  carbList: Food[];
  proteinList: Food[];
  suppProteinList: Food[];
  fruitList: Food[];
  vegetableList: Food[];
  fatList: Food[];
  isLoading = false;
  selectedValue: string;
  private foodSub: Subscription;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  carbControl = new FormControl();
  proteinControl = new FormControl();
  fruitControl = new FormControl();
  fatControl = new FormControl();
  selectedCarb: string;
  selectedCarb2: string;
  selectedCarb3: string;
  selectedCarb4: string;
  selectedCarb5: string;
  selectedProtein: string;
  selectedProtein2: string;
  selectedProtein3: string;
  selectedSuppProtein: string;
  selectedSuppProtein2: string;
  selectedSuppProtein3: string;
  selectedFruit: string;
  selectedVegetable: string;
  selectedVegetable2: string;
  selectedFat: string;
  selectedFat2: string;
  selectedFat3: string;
  selectedFat4: string;
  selectedFat5: string;
  selectedFat6: string;

  defaultChosen: Food = {
    id: '',
    category: '',
    type: '',
    name: '',
    carbs: 0,
    protein: 0,
    fat: 0,
    kCals: 0,
    serving: 0,
    measurement: '',
    exchanges: 0
  };

  carbChosen: Food = this.defaultChosen;
  carbChosen2: Food = this.defaultChosen;
  carbChosen3: Food = this.defaultChosen;
  carbChosen4: Food = this.defaultChosen;
  carbChosen5: Food = this.defaultChosen;
  proteinChosen: Food = this.defaultChosen;
  proteinChosen2: Food = this.defaultChosen;
  proteinChosen3: Food = this.defaultChosen;
  fruitChosen: Food = this.defaultChosen;
  vegetableChosen: Food = this.defaultChosen;
  vegetableChosen2: Food = this.defaultChosen;
  fatChosen: Food = this.defaultChosen;
  fatChosen2: Food = this.defaultChosen;
  fatChosen3: Food = this.defaultChosen;
  fatChosen4: Food = this.defaultChosen;
  fatChosen5: Food = this.defaultChosen;
  fatChosen6: Food = this.defaultChosen;
  suppProteinChosen: Food = this.defaultChosen;
  suppProteinChosen2: Food = this.defaultChosen;
  suppProteinChosen3: Food = this.defaultChosen;

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

  // mealOne: FormGroup = this.fb.group({
  //   carbGroup: [''],
  //   proteinGroup: [''],
  //   fruitGroup: [''],
  //   fatGroup: ['']
  // });

  carbGroupOptions: Observable<Food[]>;
  dataSource: Food[];
  mealOne: Food[];
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
        this.suppProteinList = this.filterSuppProtein(this.foods);
        this.fruitList = this.filterFruit(this.foods);
        this.vegetableList = this.filterVegetable(this.foods);
        this.fatList = this.filterFat(this.foods);
        console.log('current selection: ' + this.selectedCarb);
        console.log('thiis is the food: ' + this.carbChosen.name + this.carbChosen.carbs);
        // this.carbs = this.getFoodInfo(this.selectedCarb);
        // this.proteinList = this.filterProtein(this.foods);
        // this.fruitList = this.filterFruit(this.foods);
        // this.fatList = this.filterFat(this.foods);
        // this.mealOne.push(this.carbChosen);
        // this.dataSource = this.mealOne;
        // console.log('dataSource: ' + this.dataSource);
      });
    this.userIsAuthenticated = this.authService.getIsAuth();

    // this.carbGroupOptions = this.mealOne.get('carbGroup')!.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filterGroup(value))
    // );
    // console.log('carbGroupOptions: ' + this.carbGroupOptions );


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

  private filterSuppProtein(foods: Food[]): Food[] {
    this.suppProteinList = foods.filter(suppProtein => suppProtein.category === 'Protein Supplement');
    return this.suppProteinList;
  }

  private filterFruit(foods: Food[]): Food[] {
    this.fruitList = foods.filter(fruit => fruit.category === 'Fruit');
    return this.fruitList;
  }

  private filterVegetable(foods: Food[]): Food[] {
    this.vegetableList = foods.filter(vegetable => vegetable.category === 'Vegetable');
    return this.vegetableList;
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

  private carbSelected(foodList: Food[], selectedFood: string) {
    this.carbChosen = foodList.find(food => food.name === selectedFood);
  }

  private carbSelected2(foodList: Food[], selectedFood: string) {
    this.carbChosen2 = foodList.find(food => food.name === selectedFood);
  }

  private carbSelected3(foodList: Food[], selectedFood: string) {
    this.carbChosen3 = foodList.find(food => food.name === selectedFood);
  }

  private carbSelected4(foodList: Food[], selectedFood: string) {
    this.carbChosen4 = foodList.find(food => food.name === selectedFood);
  }

  private carbSelected5(foodList: Food[], selectedFood: string) {
    this.carbChosen5 = foodList.find(food => food.name === selectedFood);
  }

  private proteinSelected(foodList: Food[], selectedFood: string) {
    this.proteinChosen = foodList.find(food => food.name === selectedFood);
  }

  private proteinSelected2(foodList: Food[], selectedFood: string) {
    this.proteinChosen2 = foodList.find(food => food.name === selectedFood);
  }

  private proteinSelected3(foodList: Food[], selectedFood: string) {
    this.proteinChosen3 = foodList.find(food => food.name === selectedFood);
  }

  private suppProteinSelected(foodList: Food[], selectedFood: string) {
    this.suppProteinChosen = foodList.find(food => food.name === selectedFood);
  }

  private suppProteinSelected2(foodList: Food[], selectedFood: string) {
    this.suppProteinChosen2 = foodList.find(food => food.name === selectedFood);
  }

  private suppProteinSelected3(foodList: Food[], selectedFood: string) {
    this.suppProteinChosen3 = foodList.find(food => food.name === selectedFood);
  }

  private fruitSelected(foodList: Food[], selectedFood: string) {
    this.fruitChosen = foodList.find(food => food.name === selectedFood);
  }

  private vegetableSelected(foodList: Food[], selectedFood: string) {
    this.vegetableChosen = foodList.find(food => food.name === selectedFood);
  }

  private vegetableSelected2(foodList: Food[], selectedFood: string) {
    this.vegetableChosen2 = foodList.find(food => food.name === selectedFood);
  }

  private fatSelected(foodList: Food[], selectedFood: string) {
    this.fatChosen = foodList.find(food => food.name === selectedFood);
  }

  private fatSelected2(foodList: Food[], selectedFood: string) {
    this.fatChosen2 = foodList.find(food => food.name === selectedFood);
  }

  private fatSelected3(foodList: Food[], selectedFood: string) {
    this.fatChosen3 = foodList.find(food => food.name === selectedFood);
  }

  private fatSelected4(foodList: Food[], selectedFood: string) {
    this.fatChosen4 = foodList.find(food => food.name === selectedFood);
  }

  private fatSelected5(foodList: Food[], selectedFood: string) {
    this.fatChosen5 = foodList.find(food => food.name === selectedFood);
  }

  private fatSelected6(foodList: Food[], selectedFood: string) {
    this.fatChosen6 = foodList.find(food => food.name === selectedFood);
  }


}
