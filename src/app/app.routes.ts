import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'chart',
    loadComponent: () =>
      import('./marketcapchart/marketcapchart.component').then(
        (m) => m.MarketcapchartComponent
      ),
  },

];
