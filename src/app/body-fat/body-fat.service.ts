import { Injectable } from '@angular/core';
import { BodyFat } from './body-fat.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { stringify } from '@angular/core/src/render3/util';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/body-fat/';

@Injectable({ providedIn: 'root' })
export class BodyFatService {
  // bF = Body Fat
  private bodyFats: BodyFat[] = [];
  private bFResultsUpdated = new Subject<{ bodyFats: BodyFat[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getBodyFats() {
    this.http
      .get<{ message: string; bodyFats: any }>(BACKEND_URL)
      .pipe(
        map(bodyFatData => {
          return {
            bodyFats: bodyFatData.bodyFats.map(bodyFat => {
              return {
                id: bodyFat._id,
                date: bodyFat.date,
                weight: bodyFat.weight,
                // weightChange: bodyFat.weightChange,
                fatPercent: bodyFat.fatPercent,
                // percentChange: bodyFat.percentChange,
                fatMass: bodyFat.fatMass,
                // fatChange: bodyFat.fatChange,
                leanMass: bodyFat.leanMass,
                // leanChange: bodyFat.leanChange
              };
            })
          };
        })
      )
      .subscribe(bodyFatData => {
        this.bodyFats = bodyFatData.bodyFats;
        this.bFResultsUpdated.next({
          bodyFats: [...this.bodyFats]
        });
      });
  }

  getBFResultsUpdateListener() {
    return this.bFResultsUpdated.asObservable();
  }

  getBodyFat(name: string) {
    return this.http.get<{
      _id: string;
      date: Date;
      weight: number;
      weightChange: number;
      fatPercent: number;
      percentChange: number;
      fatMass: number;
      fatChange: number;
      leanMass: number;
      leanChange: number;
    }>(BACKEND_URL + name);
  }

  addBodyFat(
    date: Date,
    weight: number,
    // weightChange: number,
    fatPercent: number,
    // percentChange: number,
    fatMass: number,
    // fatChange: number,
    leanMass: number
    // leanChange: number
  ) {
    const bodyFatData: BodyFat = {
      id: null,
      date: date,
      weight: weight,
      // weightChange: weightChange,
      fatPercent: fatPercent,
      // percentChange: percentChange,
      fatMass: fatMass,
      // fatChange: fatChange,
      leanMass: leanMass,
      // leanChange: leanChange
    };
    console.log('this is addBodyFat ' + weight);

    this.http.post(BACKEND_URL + 'body-fat-create', bodyFatData).subscribe(
      () => {
        this.router.navigate(['/body-fat-list']);
      },
      error => {
        console.log('hit http post in addBodyFat()' + bodyFatData);
      }
    );
  }
}
