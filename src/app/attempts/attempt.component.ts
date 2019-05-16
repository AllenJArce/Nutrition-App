import { Component } from '@angular/core';
import { MealPlan, Carbs } from 'src/app/meal-plan/meal-plan.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';

export interface CarbsGroup {
  type: string;
  foodNames: string[];
}

export interface CarbOptions {
  type: string;
  food: string;
  numCarbs: number;
  numProtein: number;
  fat: number;
  kCals: number;
  servingNum: number;
  serving: string;
  exchanges: number;
}

export interface ProteinOptions {
  type: string;
  food: string;
  numCarbs: number;
  numProtein: number;
  fat: number;
  kCals: number;
  servingNum: number;
  serving: string;
  exchanges: number;
}

export interface FruitOptions {
  type: string;
  food: string;
  numCarbs: number;
  numProtein: number;
  fat: number;
  kCals: number;
  servingNum: number;
  serving: string;
  exchanges: number;
}

export interface FatOptions {
  type: string;
  food: string;
  numCarbs: number;
  numProtein: number;
  fat: number;
  kCals: number;
  servingNum: number;
  serving: string;
  exchanges: number;
}

export interface ProteinsGroup {
  proteinType: string;
  proteinFoodNames: string[];
}

// export interface MealOne {
// }

export interface FruitsGroup {
  fruitType: string;
  fruitFoodNames: string[];
}

// export const _filter = (opt: string[], value: string): string[] => {
//   const filterValue = value.toLowerCase();

//   return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
// };

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface MealData {
  mealType: string;
  mealTime: Time;
  carbs: CarbOptions[];
  proteins: ProteinOptions[];
  fruit: FruitOptions[];
  fat: FatOptions[];
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

const mealData: MealData[] = [
  {
    mealType: 'Breakfast',
    mealTime: { hours: 6, minutes: 30 },
    carbs: [
      {
        type: 'Breads',
        food: 'Bread (Whole wheat, Rye)',
        numCarbs: 12,
        numProtein: 3,
        fat: 1,
        kCals: 81,
        servingNum: 1,
        serving: 'slice',
        exchanges: 1
      },
      {
        type: 'Breads',
        food: 'Udi\'s Multigrain Bread',
        numCarbs: 12,
        numProtein: 1,
        fat: 2.25,
        kCals: 70,
        servingNum: 1,
        serving: 'slice',
        exchanges: 1
      },
      {
        type: 'Cereals',
        food: 'Oatmeal, Dry (Uncooked)',
        numCarbs: 27,
        numProtein: 4.5,
        fat: 2.5,
        kCals: 148.5,
        servingNum: 0.5,
        serving: 'cups',
        exchanges: 2
      },
      {
        type: 'Chips',
        food: 'Tortilla Chips',
        numCarbs: 38,
        numProtein: 4,
        fat: 14,
        kCals: 294,
        servingNum: 22,
        serving: 'chips',
        exchanges: 2
      }
    ],
    proteins: [
      {
        type: 'No Legs',
        food: 'Liquid Egg Whites',
        numCarbs: 0,
        numProtein: 15,
        fat: 0,
        kCals: 100,
        servingNum: 3,
        serving: 'tbsps',
        exchanges: 1
      },
      {
        type: 'No Legs',
        food: 'Salmon',
        numCarbs: 0,
        numProtein: 7,
        fat: 3,
        kCals: 55,
        servingNum: 1,
        serving: 'ozs',
        exchanges: 1
      },
      {
        type: 'No Legs',
        food: 'Tuna (Fresh or Water Packed)',
        numCarbs: 0,
        numProtein: 7,
        fat: 1,
        kCals: 37,
        servingNum: 1,
        serving: 'ozs',
        exchanges: 1
      },
      {
        type: 'Two Legs',
        food: 'Chicken Breast',
        numCarbs: 0,
        numProtein: 7,
        fat: 1,
        kCals: 37,
        servingNum: 1,
        serving: 'ozs',
        exchanges: 1
      },
      {
        type: 'Four Legs',
        food: 'Sirloin',
        numCarbs: 0,
        numProtein: 7,
        fat: 3,
        kCals: 55,
        servingNum: 1,
        serving: 'ozs',
        exchanges: 1
      }
    ],
    fruit: [
      {
        type: 'Fresh',
        food: 'Apple, Raw (3 inch diameter)',
        numCarbs: 25,
        numProtein: 0.5,
        fat: 0.3,
        kCals: 45,
        servingNum: 1,
        serving: 'apple',
        exchanges: 2
      },
      {
        type: 'Frozen',
        food: 'Blueberries (Frozen)',
        numCarbs: 17,
        numProtein: 1,
        fat: 0,
        kCals: 72,
        servingNum: 1,
        serving: 'cups',
        exchanges: 1
      },
      {
        type: 'Dried',
        food: 'Prunes',
        numCarbs: 15,
        numProtein: 0.2,
        fat: 0,
        kCals: 24.8,
        servingNum: 1,
        serving: 'prunes',
        exchanges: 1
      }
    ],
    fat: [
      {
        type: 'Nuts',
        food: 'Almonds',
        numCarbs: 2.25,
        numProtein: 2.1,
        fat: 5.25,
        kCals: 64.65,
        servingNum: 9,
        serving: 'almonds',
        exchanges: 1
      },
      {
        type: 'Monounsaturated Fats',
        food: 'Peanut Butter',
        numCarbs: 0,
        numProtein: 3,
        fat: 5,
        kCals: 61,
        servingNum: 2,
        serving: 'tsps',
        exchanges: 1
      },
      {
        type: 'Polyunsaturated Fats',
        food: 'Mayonnaise (Regular)',
        numCarbs: 0,
        numProtein: 0,
        fat: 5,
        kCals: 45,
        servingNum: 0.5,
        serving: 'Tbsps',
        exchanges: 1
      }
    ]
  }
];

// const MEAL_DATA:

@Component({
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.css']
})
export class AttemptComponent implements OnInit {
  mealsForm: FormGroup = this.fb.group({
    // proteinGroup: '',
    carbGroup: ''
  });

  mealOne: FormGroup = this.fb.group({
    carbGroup: [''],
    proteinGroup: [''],
    fruitGroup: [''],
    fatGroup: ['']
  });

  // mealOneProtein: FormGroup = this.fb.group({
  //   proteinGroup: ['']
  // });
  carbGroups: CarbsGroup[] = [
    {
      type: 'Breads',
      foodNames: [
        'Udi\'s Multigrain Bread',
        'Bread (Whole wheat, Rye)',
        'English Muffin',
        'Bagel (Plain)'
      ]
    },
    {
      type: 'Chips',
      foodNames: ['Tostitos Tortilla Chips', 'Costco Tortilla Chips']
    },
    {
      type: 'Snacks',
      foodNames: ['Pretzels', 'Rice Cakes', 'Mini Rice Cakes']
    },
    {
      type: 'Grains',
      foodNames: ['Rice (Brown)', 'Rice (White)', 'Quinoa']
    }
  ];

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

  mealData: MealData[] = [
    {
      mealType: 'Breakfast',
      mealTime: { hours: 6, minutes: 30 },
      carbs: [
        {
          type: 'Breads',
          food: 'Bread (Whole wheat, Rye)',
          numCarbs: 12,
          numProtein: 3,
          fat: 1,
          kCals: 81,
          servingNum: 1,
          serving: 'slice',
          exchanges: 1
        },
        {
          type: 'Breads',
          food: 'Udi\'s Multigrain Bread',
          numCarbs: 12,
          numProtein: 1,
          fat: 2.25,
          kCals: 70,
          servingNum: 1,
          serving: 'slice',
          exchanges: 1
        },
        {
          type: 'Cereals',
          food: 'Oatmeal, Dry (Uncooked)',
          numCarbs: 27,
          numProtein: 4.5,
          fat: 2.5,
          kCals: 148.5,
          servingNum: 0.5,
          serving: 'cups',
          exchanges: 2
        },
        {
          type: 'Chips',
          food: 'Tortilla Chips',
          numCarbs: 38,
          numProtein: 4,
          fat: 14,
          kCals: 294,
          servingNum: 22,
          serving: 'chips',
          exchanges: 2
        }
      ],
      proteins: [
        {
          type: 'No Legs',
          food: 'Liquid Egg Whites',
          numCarbs: 0,
          numProtein: 15,
          fat: 0,
          kCals: 100,
          servingNum: 3,
          serving: 'tbsps',
          exchanges: 1
        },
        {
          type: 'No Legs',
          food: 'Salmon',
          numCarbs: 0,
          numProtein: 7,
          fat: 3,
          kCals: 55,
          servingNum: 1,
          serving: 'ozs',
          exchanges: 1
        },
        {
          type: 'No Legs',
          food: 'Tuna (Fresh or Water Packed)',
          numCarbs: 0,
          numProtein: 7,
          fat: 1,
          kCals: 37,
          servingNum: 1,
          serving: 'ozs',
          exchanges: 1
        },
        {
          type: 'Two Legs',
          food: 'Chicken Breast',
          numCarbs: 0,
          numProtein: 7,
          fat: 1,
          kCals: 37,
          servingNum: 1,
          serving: 'ozs',
          exchanges: 1
        },
        {
          type: 'Four Legs',
          food: 'Sirloin',
          numCarbs: 0,
          numProtein: 7,
          fat: 3,
          kCals: 55,
          servingNum: 1,
          serving: 'ozs',
          exchanges: 1
        }
      ],
      fruit: [
        {
          type: 'Fresh',
          food: 'Apple, Raw (3 inch diameter)',
          numCarbs: 25,
          numProtein: 0.5,
          fat: 0.3,
          kCals: 45,
          servingNum: 1,
          serving: 'apple',
          exchanges: 2
        },
        {
          type: 'Frozen',
          food: 'Blueberries (Frozen)',
          numCarbs: 17,
          numProtein: 1,
          fat: 0,
          kCals: 72,
          servingNum: 1,
          serving: 'cups',
          exchanges: 1
        },
        {
          type: 'Dried',
          food: 'Prunes',
          numCarbs: 15,
          numProtein: 0.2,
          fat: 0,
          kCals: 24.8,
          servingNum: 1,
          serving: 'prunes',
          exchanges: 1
        }
      ],
      fat: [
        {
          type: 'Nuts',
          food: 'Almonds',
          numCarbs: 2.25,
          numProtein: 2.1,
          fat: 5.25,
          kCals: 64.65,
          servingNum: 9,
          serving: 'almonds',
          exchanges: 1
        },
        {
          type: 'Monounsaturated Fats',
          food: 'Peanut Butter',
          numCarbs: 0,
          numProtein: 3,
          fat: 5,
          kCals: 61,
          servingNum: 2,
          serving: 'tsps',
          exchanges: 1
        },
        {
          type: 'Polyunsaturated Fats',
          food: 'Mayonnaise (Regular)',
          numCarbs: 0,
          numProtein: 0,
          fat: 5,
          kCals: 45,
          servingNum: 0.5,
          serving: 'Tbsps',
          exchanges: 1
        }
      ]
    }
  ];
  carbs: CarbOptions[] = [
    {
      type: 'Breads',
      food: 'Bread (Whole wheat, Rye)',
      numCarbs: 12,
      numProtein: 3,
      fat: 1,
      kCals: 81,
      servingNum: 1,
      serving: 'slice',
      exchanges: 1
    },
    {
      type: 'Breads',
      food: 'Udi\'s Multigrain Bread',
      numCarbs: 12,
      numProtein: 1,
      fat: 2.25,
      kCals: 70,
      servingNum: 1,
      serving: 'slice',
      exchanges: 1
    },
    {
      type: 'Cereals',
      food: 'Oatmeal, Dry (Uncooked)',
      numCarbs: 27,
      numProtein: 4.5,
      fat: 2.5,
      kCals: 148.5,
      servingNum: 0.5,
      serving: 'cups',
      exchanges: 2
    },
    {
      type: 'Chips',
      food: 'Tortilla Chips',
      numCarbs: 38,
      numProtein: 4,
      fat: 14,
      kCals: 294,
      servingNum: 22,
      serving: 'chips',
      exchanges: 2
    }
  ];

  proteins: ProteinOptions[] = [
    {
      type: 'No Legs',
      food: 'Liquid Egg Whites',
      numCarbs: 0,
      numProtein: 15,
      fat: 0,
      kCals: 100,
      servingNum: 3,
      serving: 'tbsps',
      exchanges: 1
    },
    {
      type: 'No Legs',
      food: 'Salmon',
      numCarbs: 0,
      numProtein: 7,
      fat: 3,
      kCals: 55,
      servingNum: 1,
      serving: 'ozs',
      exchanges: 1
    },
    {
      type: 'No Legs',
      food: 'Tuna (Fresh or Water Packed)',
      numCarbs: 0,
      numProtein: 7,
      fat: 1,
      kCals: 37,
      servingNum: 1,
      serving: 'ozs',
      exchanges: 1
    },
    {
      type: 'Two Legs',
      food: 'Chicken Breast',
      numCarbs: 0,
      numProtein: 7,
      fat: 1,
      kCals: 37,
      servingNum: 1,
      serving: 'ozs',
      exchanges: 1
    },
    {
      type: 'Four Legs',
      food: 'Sirloin',
      numCarbs: 0,
      numProtein: 7,
      fat: 3,
      kCals: 55,
      servingNum: 1,
      serving: 'ozs',
      exchanges: 1
    }
  ];

  fruits: FruitOptions[] = [
    {
      type: 'Fresh',
      food: 'Apple, Raw (3 inch diameter)',
      numCarbs: 25,
      numProtein: 0.5,
      fat: 0.3,
      kCals: 45,
      servingNum: 1,
      serving: 'apple',
      exchanges: 2
    },
    {
      type: 'Frozen',
      food: 'Blueberries (Frozen)',
      numCarbs: 17,
      numProtein: 1,
      fat: 0,
      kCals: 72,
      servingNum: 1,
      serving: 'cups',
      exchanges: 1
    },
    {
      type: 'Dried',
      food: 'Prunes',
      numCarbs: 15,
      numProtein: 0.2,
      fat: 0,
      kCals: 24.8,
      servingNum: 1,
      serving: 'prunes',
      exchanges: 1
    }
  ];

  fats: FatOptions[] = [
    {
      type: 'Nuts',
      food: 'Almonds',
      numCarbs: 2.25,
      numProtein: 2.1,
      fat: 5.25,
      kCals: 64.65,
      servingNum: 9,
      serving: 'almonds',
      exchanges: 1
    },
    {
      type: 'Monounsaturated Fats',
      food: 'Peanut Butter',
      numCarbs: 0,
      numProtein: 3,
      fat: 5,
      kCals: 61,
      servingNum: 2,
      serving: 'tsps',
      exchanges: 1
    },
    {
      type: 'Polyunsaturated Fats',
      food: 'Mayonnaise (Regular)',
      numCarbs: 0,
      numProtein: 0,
      fat: 5,
      kCals: 45,
      servingNum: 0.5,
      serving: 'Tbsps',
      exchanges: 1
    }
  ];

  // carbGroupOptions: Observable<CarbsGroup[]>;
  carbGroupOptions: Observable<CarbOptions[]>;
  proteinGroupOptions: Observable<ProteinsGroup[]>;
  fruitGroupOptions: Observable<FruitsGroup[]>;

  // displayedColumns: string[] = [
  //   'mealOne',
  //   'exchanges',
  //   'carbs',
  //   'protein',
  //   'fat',
  //   'kCals'
  // ];
  displayedColumns: string[] = [
    'carbs',
    'protein',
    'fruit',
    'fat',
  ];
  dataSource = mealData;
  // dataSource = new DataSource();
  // filterControl = new FormControl();
  // filteredFoodNames: Observable<string[]>;
  // unfilteredFoodNames: string[];

  constructor(private fb: FormBuilder) {}

  carbFoods: string[];


  ngOnInit() {
    // this.filteredFoodNames = this.filterControl.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(value => this._filterOptions(value))
    // );

  //   for (const food of this.carbs) {
  //     console.log('food= ' + this.carbs);
  //     this.carbFoods = this.carbs;
  //   }

  //   this.carbGroupOptions = this.mealOne.get('carbGroup')!.valueChanges.pipe(
  //     startWith(''),
  //     map(value => this._filterGroup(value))
  //   );

  //   this.proteinGroupOptions = this.mealOne
  //     .get('proteinGroup')!
  //     .valueChanges.pipe(
  //       startWith(''),
  //       map(value => this._filterProteinGroup(value))
  //     );

  //   this.fruitGroupOptions = this.mealOne.get('fruitGroup')!.valueChanges.pipe(
  //     startWith(''),
  //     map(value => this._filterFruitGroup(value))
  //   );
  // }

  // private _filterOptions(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

  // private _filterGroup(value: string): CarbsGroup[] {
  //   if (value) {
  //     return this.carbGroups
  //       .map(group => ({
  //         type: group.type,
  //         foodNames: _filter(group.foodNames, value)
  //       }))
  //       .filter(group => group.foodNames.length > 0);
  //   }

  //   return this.carbGroups;
  // }

  // private _filterGroup(value: string): CarbOptions[] {
  //   if (value) {
  //     return this.carbs
  //       .map(group => ({
  //         type: group.type,
  //         food: _filter(group.food, value),
  //         numCarbs: group.numCarbs,
  //         numProtein: group.numProtein,
  //         fat: group.fat,
  //         kCals: group.kCals,
  //         servingNum: group.servingNum,
  //         serving: group.serving,
  //         exchanges: group.exchanges
  //       }))
  //       .filter(group => group.food.length > 0);
  //   }

  //   return this.carbGroups;
  }
  private _filterProteinGroup(value: string): ProteinsGroup[] {
    if (value) {
      return this.proteinGroups
        .map(proteinGroup => ({
          proteinType: proteinGroup.proteinType,
          proteinFoodNames: _filter(proteinGroup.proteinFoodNames, value)
        }))
        .filter(proteinGroup => proteinGroup.proteinFoodNames.length > 0);
    }

    return this.proteinGroups;
  }

  private _filterFruitGroup(value: string): FruitsGroup[] {
    if (value) {
      return this.fruitGroups
        .map(fruitGroup => ({
          fruitType: fruitGroup.fruitType,
          fruitFoodNames: _filter(fruitGroup.fruitFoodNames, value)
        }))
        .filter(fruitGroup => fruitGroup.fruitFoodNames.length > 0);
    }

    return this.fruitGroups;
  }
}
