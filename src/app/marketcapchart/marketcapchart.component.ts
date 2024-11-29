import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
import { CryptoService } from '../services/crypto.service';
import { Location } from '@angular/common';
import { CryptoData } from '../model/CryptoData';

@Component({
  selector: 'app-marketcapchart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marketcapchart.component.html',
  styleUrl: './marketcapchart.component.scss'
})
export class MarketcapchartComponent implements OnInit {
  chart!: Highcharts.Chart;
  isLoading = true;

  constructor(private cryptoService: CryptoService, public location: Location) {}

  ngOnInit(): void {
    this.fetchCryptoData();
  }

  fetchCryptoData(): void {
    this.cryptoService.getCryptos().subscribe(
      (data: CryptoData[]) => {
        const topCryptos = this.processCryptoData(data);
        this.initializeChart(topCryptos);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching cryptocurrency data:', error);
        this.isLoading = false;
      }
    );
  }

  processCryptoData(data: CryptoData[]): (CryptoData & { y: number })[] {
  // Extract the top 10 cryptocurrencies by market cap
  return data
    .sort((a, b) => b.market_cap - a.market_cap)
    .slice(0, 10)
    .map((crypto) => ({
      ...crypto,
      y: crypto.market_cap,
    }));
}

initializeChart(data: (CryptoData & { y: number })[]): void {
    const chartOptions: Highcharts.Options = {
      chart: {
      type: 'column',
      zooming: {type: 'x',} as any,
      backgroundColor: '#141e22',
      style: {fontFamily: '"Mona Sans", "Roboto", sans-serif'},
    },
      title: {
        text: 'Market Capitalization of Top Cryptocurrencies',
        style: {
          color: '#c7c3c3',
          fontSize: '18px',
        },
      },
      xAxis: {
        type: 'category',
        title: {
          text: 'Cryptocurrency',
          style: {
          color: '#c7c3c3',
          },
        },
      labels: {
        style: {
          color: '#c7c3c3',
        },
      },
    },
      yAxis: {
        title: {
          text: 'Market Cap (USD)',
          style: {
            color: '#c7c3c3',
          },
        },
      labels: {
        style: {
          color: '#c7c3c3',
        },
        formatter: function () {
          return `$${Highcharts.numberFormat(this.value as number, 0)}`;
        },
      },
    },
     tooltip: {
      backgroundColor: '#141e22',
      borderColor: '#65C9F3',
      style: { color: '#c7c3c3' },
      useHTML: true,
      formatter: function () {
        const point = this.point as Highcharts.Point & CryptoData & { y: number };
        return `
          <strong>${point.name} (${point.symbol})</strong><br/>
          <strong>ID:</strong> ${point.id}<br/>
          <strong>Price:</strong> $${Highcharts.numberFormat(point.current_price, 2)}<br/>
          <strong>Market Cap:</strong> $${Highcharts.numberFormat(point.y, 0)}<br/>
          <strong>Total Volume:</strong> $${Highcharts.numberFormat(point.total_volume, 0)}<br/>
          <strong>24h High:</strong> $${Highcharts.numberFormat(point.high_24h, 2)}<br/>
          <strong>24h Low:</strong> $${Highcharts.numberFormat(point.low_24h, 2)}<br/>
          <strong>24h Change:</strong> ${Highcharts.numberFormat(point.price_change_percentage_24h, 2)}%<br/>
          <strong>Circulating Supply:</strong> ${Highcharts.numberFormat(point.circulating_supply, 0)}
        `;
      },
    },
      plotOptions: {
        column: {
          color: '#26A9E0',
          states: {
            hover: {
              color: '#0057ff',
            },
          },
        },
      },
      legend: {
      itemStyle: {
        color: '#c7c3c3',
        fontWeight: 'bold',
      },
      itemHoverStyle: {
        color: '#ffffff',
      },
    },
      series: [
      {
        type: 'column',
        name: 'Market Cap',
        data: data,
        colorByPoint: true,
      },
    ],
      credits: {
        enabled: false,
      },
    };
    this.chart = Highcharts.chart('container', chartOptions);
  }

  goBack() {
    this.location.back();
  }

}
