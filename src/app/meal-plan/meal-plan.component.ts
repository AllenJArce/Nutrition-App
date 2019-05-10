import { Component } from '@angular/core';
import { MealPlan, Carbs } from 'src/app/meal-plan/meal-plan.model';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

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
  mealsForm: FormGroup = this.fb.group({
    carbsGroup: ''
  });

  mealOne: FormGroup = this.fb.group({
    carbGroup: [''],
    proteinGroup: [''],
    fruitGroup: ['']
  });

  carbs: Carbs[] = [
    {
      type: 'Breads',
      food: 'Bread (Whole Wheat, Rye)'
      // numCarbs: 15,
      // numProtein: 3,
      // fat: 1,
      // kCals: 81,
      // serving: '1 slice'
    },
    {
      type: 'Breads',
      food: 'Udi\'s '
      // numCarbs: 12,
      // numProtein: 1,
      // fat: 2.25,
      // kCals: 70,
      // serving: '1 slice'
    },
    {
      type: 'Cereals',
      food: 'Oatmeal,Dry (Uncooked)'
      // numCarbs: 27,
      // numProtein: 4.5,
      // fat: 2.5,
      // kCals: 148.5,
      // serving: '0.5 cups'
    },
    {
      type: 'Chips',
      food: 'Tortilla Chips'
      // numCarbs: 38,
      // numProtein: 4,
      // fat: 14,
      // kCals: 294,
      // serving: '22 chips'
    }
  ];

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

  carbGroupOptions: Observable<CarbsGroup[]>;
  proteinGroupOptions: Observable<ProteinsGroup[]>;
  fruitGroupOptions: Observable<FruitsGroup[]>;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.carbGroupOptions = this.mealOne.get('carbGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value))
    );

    this.proteinGroupOptions = this.mealOne
      .get('proteinGroup')!
      .valueChanges.pipe(
        startWith(''),
        map(value => this._filterProteinGroup(value))
      );

    this.fruitGroupOptions = this.mealOne.get('fruitGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterFruitGroup(value))
    );
  }

  private _filterGroup(value: string): CarbsGroup[] {
    if (value) {
      return this.carbGroups
        .map(group => ({
          type: group.type,
          foodNames: _filter(group.foodNames, value)
        }))
        .filter(group => group.foodNames.length > 0);
    }

    return this.carbGroups;
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
