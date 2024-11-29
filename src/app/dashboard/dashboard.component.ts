import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from "@angular/material/table";
import { MatTableDataSource } from '@angular/material/table';
import { CryptoService } from '../services/crypto.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import {MatSort} from "@angular/material/sort";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { CryptoData } from '../model/CryptoData';
import { CdkDragDrop, DragDropModule, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatSelectModule, MatOptionModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('tableElement', { static: false, read: ElementRef }) tableElement: ElementRef | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'name',
    'symbol',
    'current_price',
    'market_cap',
    'total_volume',
    'high_24h',
    'low_24h',
    'price_change_percentage_24h',
    'circulating_supply',
  ];
  columnHeaders: { [key: string]: string } = {
    id: 'ID',
    name: 'Name',
    symbol: 'Symbol',
    current_price: 'Price (USD)',
    market_cap: 'Market Cap',
    total_volume: 'Total Volume',
    high_24h: 'High (24h)',
    low_24h: 'Low (24h)',
    price_change_percentage_24h: 'Change (24h %)',
    circulating_supply: 'Circulating Supply',
};
  dataSource = new MatTableDataSource<CryptoData>();
  isLoading = true;
  filterCrypto: FormGroup;
  names: string[] = [];
  symbols: string[] = [];
  marketCaps: number[] = [];
  showTable: boolean = false;
  currentDragPosition: { x: number, y: number } = { x: 0, y: 0 };
  searchControl: FormControl = new FormControl();


  constructor(private cryptoService: CryptoService, private fb: FormBuilder, private router: Router) {
    this.filterCrypto = this.fb.group({
      name: [null],
      symbol: [null],
      marketCap: [null],
    });
  }

  ngOnInit() {
    this.fetchCryptoData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterCrypto.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }


  fetchCryptoData(): void {
    this.isLoading = true;
    this.cryptoService.getCryptos().subscribe(
      (data: CryptoData[]) => {
        this.dataSource = new MatTableDataSource<CryptoData>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // Populate dropdown arrays
        this.names = [...new Set(data.map((item: any) => item.name))];
        this.symbols = [...new Set(data.map((item: any) => item.symbol))];
        this.marketCaps = [...new Set(data.map((item: any) => item.market_cap))];

        this.isLoading = false;
        this.showTable = true;
      },
      (error) => {
        console.error('Error fetching cryptocurrencies:', error);
        this.isLoading = false;
        this.showTable = true;
      }
    );
  }

  filterSearch(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(): void {
    const { name, symbol, marketCap } = this.filterCrypto.value;

    this.dataSource.filterPredicate = (data: CryptoData) => {
      const matchesName = name ? data.name === name : true;
      const matchesSymbol = symbol ? data.symbol === symbol : true;
      const matchesMarketCap = marketCap ? data.market_cap === marketCap : true;

      return matchesName && matchesSymbol && matchesMarketCap;
    };

    this.dataSource.filter = Math.random().toString();
  }

  clearAll(): void {
    this.filterCrypto.reset();
    this.applyFilter();
  }

  showMarket() {
    this.router.navigate(['/chart']).then();
  }

  dropColumn(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  filterOptions(searchTerm: string, options: any[]): any[] {
    if (!searchTerm) {
      return options;
    }
    return options.filter(option => option.value.toLowerCase().includes(searchTerm.toLowerCase()));
  }

}
