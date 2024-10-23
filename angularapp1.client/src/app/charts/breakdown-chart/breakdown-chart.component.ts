import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { selectCardbyId } from '../../state/app.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breakdown-chart',
  templateUrl: './breakdown-chart.component.html',
  styleUrl: './breakdown-chart.component.css',
})
export class BreakdownChartComponent implements OnInit {
  #store = inject(Store);
  #route = inject(ActivatedRoute);

  cardId: number = parseInt(this.#route.snapshot.paramMap.get('cardId')!);
  currentCard$ = this.#store.selectSignal(selectCardbyId(this.cardId));

  ngOnInit(): void {
    this.showBreakdownChart();
    this.transactionDatatoBalanceArray()
  }

  transactionDatatoBalanceArray() {
    let balanceArray = this.currentCard$()?.transactions.map(
      (a) => a.balanceChange
    );
    let initialBalance = this.currentCard$()?.openingBalance
    const balanceHistory: number[] = [];
    balanceHistory.push(initialBalance ?? 0);

    for (const balance of balanceArray!) {
      initialBalance! += balance;
      balanceHistory.push(initialBalance ?? 0);
    }
   return balanceHistory;
    }

  

  showBreakdownChart() {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root1 = am5.Root.new('chartdiv1');

    const myTheme = am5.Theme.new(root1);

    // Move minor label a bit down
    myTheme.rule('AxisLabel', ['minor']).setAll({
      dy: 1,
    });

    // Tweak minor grid opacity
    myTheme.rule('Grid', ['minor']).setAll({
      strokeOpacity: 0.08,
    });

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root1.setThemes([am5themes_Animated.new(root1), myTheme]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root1.container.children.push(
      am5xy.XYChart.new(root1, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        paddingLeft: 0,
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root1, {
        behavior: 'zoomX',
      })
    );
    cursor.lineY.set('visible', false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root1, {
        strictMinMax: false,
        renderer: am5xy.AxisRendererX.new(root1, {
          minorGridEnabled: true,
          minGridDistance: 200,
          minorLabelsEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root1, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root1, {
        renderer: am5xy.AxisRendererY.new(root1, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.LineSeries.new(root1, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root1, {
          labelText: '{valueY}',
        }),
      })
    );

    // Actual bullet
    series.bullets.push(function () {
      let bulletCircle = am5.Circle.new(root1, {
        radius: 5,
        fill: series.get('fill'),
      });
      return am5.Bullet.new(root1, {
        sprite: bulletCircle,
      });
    });

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root1, {
        orientation: 'horizontal',
      })
    );

    let data = this.transactionDatatoBalanceArray()?.map((balance, index) => {
      return { value: balance, date: index };
    });
    series.data.setAll(data ?? []);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
  }
}
