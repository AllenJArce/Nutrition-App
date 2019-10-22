import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BodyFatService } from '../body-fat.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './body-fat-create.component.html',
  styleUrls: ['./body-fat-create.component.css']
})
export class BodyFatCreateComponent implements OnInit {
  isLoading = false;
  bodyFatForm: FormGroup;
  private mode = 'create';
  private bodyFatId: string;
  private authStatusSub: Subscription;
  weightChange: number;
  percentChange: number;
  fatChange: number;
  leanChange: number;

  constructor(
    public bodyFatService: BodyFatService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.bodyFatForm = new FormGroup({
      date: new FormControl(null, {
        validators: [Validators.required]
      }),
      weight: new FormControl(null, {
        validators: [Validators.required]
      }),
      // weightChange: new FormControl(null, {
      //   validators: [Validators.required ]
      // }),
      fatPercent: new FormControl(null, {
        validators: [Validators.required]
      }),
      // percentChange: new FormControl(null, {
      //   validators: [Validators.required ]
      // }),
      fatMass: new FormControl(null, {
        validators: [Validators.required]
      }),
      // fatChange: new FormControl(null, {
      //   validators: [Validators.required ]
      // }),
      leanMass: new FormControl(null, {
        validators: [Validators.required]
      })
      // leanChange: new FormControl(null, {
      //   validators: [Validators.required ]
      // })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('bodyFatId')) {
        this.mode = 'edit';
        this.bodyFatId = paramMap.get('bodyFatId');
        this.isLoading = true;
        this.bodyFatService
          .getBodyFat(this.bodyFatId)
          .subscribe(BodyFatData => {});
      }
    });
  }

  onAddBodyFat() {
    if (this.bodyFatForm.invalid) {
      console.log('Body Fat Form is invalid!');
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.bodyFatService.addBodyFat(
        this.bodyFatForm.value.date,
        this.bodyFatForm.value.weight,
        // add a way to get previous weight/fat/lean and subtract from current
        this.weightChange =
        this.bodyFatForm.value.fatPercent,
        this.bodyFatForm.value.fatMass,
        this.bodyFatForm.value.leanMass
      );
    }
  }
}
