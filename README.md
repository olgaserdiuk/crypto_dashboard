# CryptoDashboard
This is a Crypto Dashboard project built using Angular. The dashboard integrates with the CoinGecko API to provide real-time cryptocurrency data. The project demonstrates functionality such as data filtering, sorting, searching, and visualization using advanced charts, along with state management using NgRx and RxJS.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9 using Standalone components.

#Features.
1. Cryptocurrency Data Table.
Displays a list of cryptocurrencies with their real-time prices, market caps, and other relevant information.
Supports: Sorting, Filtering, Searching, Pagination. Reordering columns between each other and sticky first column.
2. Data Visualization.
Visualize cryptocurrency trends and performance using bar Highcharts.

#Real-Time API Integration.
Fetches cryptocurrency data from the CoinGecko API ('https://api.coingecko.com/api/v3/coins/markets').

#Responsive Design.
Fully responsive design, optimized for both desktop and mobile devices.
Styled with Angular Material and custom CSS.

## Development server
Istallation Steps:
1. Clone the repository:
1.1. git clone https://github.com/olgaserdiuk/crypto_dashboard.git
1.2. cd crypto_dashboard/
2. Install dependencies.
npm install
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
