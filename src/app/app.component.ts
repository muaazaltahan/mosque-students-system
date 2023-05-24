import { Component } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { getDutchPaginatorIntl } from './shared-data/paginator-intl';
import { FooterComponent } from './views/global/footer/footer.component';
import { NavbarComponent } from './views/global/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
    HttpClientModule,
    NavbarComponent,
    FooterComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
    AuthService
  ]
})
export class AppComponent { }
