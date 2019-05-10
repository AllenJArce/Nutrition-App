import { Component, OnInit, OnDestroy } from '@angular/core';
import { Food } from 'src/app/food/food.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FoodService } from 'src/app/food/food.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { ParamMap } from '@angular/router';

@Component({
  templateUrl: './food-create.component.html',
  styleUrls: ['./food-create.component.css']
})

export class FoodCreateComponent implements OnInit, OnDestroy {
  food: Food;
  isLoading = false;
  foodForm: FormGroup;
  private mode = 'create';
  private foodId: string;
  private authStatusSub: Subscription;

  constructor(
    public foodService: FoodService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
    this.isLoading = false;
    });
    this.foodForm = new FormGroup({
      category: new FormControl(null, {
        validators: [Validators.required]
      }),
      type: new FormControl(null, {
        validators: [Validators.required ]
      }),
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      carbs: new FormControl(null, {
        validators: [Validators.required]
      }),
      protein: new FormControl(null, {
        validators: [Validators.required]
      }),
      fat: new FormControl(null, {
        validators: [Validators.required]
      }),
      kCals: new FormControl(null, {
        validators: [Validators.required]
      }),
      serving: new FormControl(null, {
        validators: [Validators.required]
      }),
      measurement: new FormControl(null, {
        validators: [Validators.required]
      }),
      exchanges: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has('foodId')) {
    //     this.mode = 'edit';
    //     this.foodId = paramMap.get('foodId');
    //     this.isLoading = true;
    //     this.foodService.getFood(this.foodId).subscribe(foodData => {
    //       this.isLoading = false;
    //       this.food = {
    //         id: foodData._id,
    //         category: foodData.category,
    //         name: foodData.name,
    //         carbs: foodData.carbs,
    //         protein: foodData.protein,
    //         fat: foodData.fat,
    //         kCals: foodData.kCals,
    //         serving: foodData.serving,
    //         measurement: foodData.measurement,
    //         exchanges: foodData.exchanges
    //       };
    //       this.foodForm.setValue({
    //         // category: foodData.category,
    //         // name: foodData.name,
    //         // carbs: foodData.carbs,
    //         // protein: foodData.protein,
    //         // fat: foodData.fat,
    //         // kCals: foodData.kCals,
    //         // serving: foodData.serving,
    //         // measurement: foodData.measurement,
    //         // exchanges: foodData.exchanges
    //         category: this.food.category,
    //         name: this.food.name,
    //         carbs: this.food.carbs,
    //         protein: this.food.protein,
    //         fat: this.food.fat,
    //         kCals: this.food.kCals,
    //         serving: this.food.serving,
    //         measurement: this.food.measurement,
    //         exchanges: this.food.exchanges
    //       });
    //     });
    //   } else {
    //     this.mode = 'create';
    //     this.foodId = null;
    //   }
    // });
    }

    onSaveFood() {
      if (this.foodForm.invalid) {
        console.log('Food form is invalid!');
        return;
      }
      this.isLoading = true;
      if (this.mode === 'create') {
        this.foodService.addFood(
          this.foodForm.value.category,
          this.foodForm.value.type,
          this.foodForm.value.name,
          this.foodForm.value.carbs,
          this.foodForm.value.protein,
          this.foodForm.value.fat,
          this.foodForm.value.kCals,
          this.foodForm.value.serving,
          this.foodForm.value.measurement,
          this.foodForm.value.exchanges
        );
        console.log('onSaveFood() hit ' + this.foodForm.value.category);
      }  else {
        this.foodService.updateFood(
          this.foodId,
          this.foodForm.value.category,
          this.foodForm.value.type,
          this.foodForm.value.name,
          this.foodForm.value.carbs,
          this.foodForm.value.protein,
          this.foodForm.value.fat,
          this.foodForm.value.kCals,
          this.foodForm.value.serving,
          this.foodForm.value.measurement,
          this.foodForm.value.exchanges
        );
      }
      this.foodForm.reset();
    }

    ngOnDestroy() {
      this.authStatusSub.unsubscribe();
    }

}


