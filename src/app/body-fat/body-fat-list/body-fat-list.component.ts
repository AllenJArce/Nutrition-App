import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { BodyFatService } from '../body-fat.service';
import { BodyFat } from '../body-fat.model';

@Component({
  templateUrl: './body-fat-list.component.html',
  styleUrls: ['./body-fat-list.component.css']
})
export class BodyFatListComponent {
  bodyFats: BodyFat[] = [];
  isLoading = false;
  userId: string;
  userIsAuthenticated = false;

  private bodyFatSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public bodyFatService: BodyFatService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.bodyFatService.getBodyFats();
    this.bodyFatSub = this.bodyFatService
      .getBFResultsUpdateListener()
      .subscribe((bodyFatData: { bodyFats: BodyFat[] }) => {
        this.isLoading = false;
        this.bodyFats = bodyFatData.bodyFats;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }
}
