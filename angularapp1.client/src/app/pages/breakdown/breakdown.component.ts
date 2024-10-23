import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import {
  faArrowTrendDown,
  faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';
import { Card } from '../../models/card';
import { Store } from '@ngrx/store';
import { selectCardbyId, selectUser } from '../../state/app.selectors';
import { ActivatedRoute } from '@angular/router';
import { RemoveCard } from '../../state/app.actions';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-breakdown',
  templateUrl: './breakdown.component.html',
  styleUrl: './breakdown.component.css',
})
export class BreakdownComponent implements OnInit {
  faArrowDown = faArrowTrendDown;
  faArrowUp = faArrowTrendUp;

  card: Card | undefined = undefined;

  #store = inject(Store);
  #route = inject(ActivatedRoute);

  user$ = this.#store.selectSignal(selectUser);
  cardId: number = parseInt(this.#route.snapshot.paramMap.get('cardId')!);
  currentCard$ = this.#store.selectSignal(selectCardbyId(this.cardId));



  expense = (this.user$()!.monthlyIncome / 3) * 0.9;

  minCard: Signal<Card | undefined> = computed(() =>
    this.user$()?.cards?.reduce((r, e) =>
      r.accountBalance < e.accountBalance ? r : e
    )
  );

  hasTransactions()
  {
    return !!this.currentCard$()?.transactions!.length
  } 

  ngOnInit(): void {
      setTimeout(() => {
        this.showOverview()
      }, 1000);
  }

  totalPaid: Signal<number | undefined> = computed(() =>
    this.currentCard$()
      ?.transactions.map((a) => a.balanceChange)
      .reduce(function (a, b) {
        return a + b;
      })
  );

  celebrate() {
    const duration = 3000;
  
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.6 },
      colors: ['#FF4500', '#008080', '#FFD700'],
    });
  
    setTimeout(() => confetti.reset(), duration);
  }

  deleteCard() {
    this.#store.dispatch(RemoveCard({ cardId: this.currentCard$()!.id }));
    this.celebrate()
  }

  showOverview() {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root2 = am5.Root.new('chartdiv2');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root2.setThemes([am5themes_Animated.new(root2)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart = root2.container.children.push(
      am5percent.PieChart.new(root2, {
        layout: root2.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    var series = chart.series.push(
      am5percent.PieSeries.new(root2, {
        valueField: 'value',
        categoryField: 'category',
        alignLabels: false,
      })
    );

    series.labels.template.setAll({
      textType: 'circular',
      centerX: 0,
      centerY: 0,
    });

    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll([
      { value: this.currentCard$()?.accountBalance, category: 'Left' },
      { value: Math.abs(this.totalPaid() ?? 0), category: 'Paid Off' },
    ]);


    series.slices.template.set('tooltipText', '{category}: £{value}');
    series.labels.template.set('forceHidden', true);

    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    var legend = chart.children.push(
      am5.Legend.new(root2, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );

    legend.data.setAll(series.dataItems);

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);
  }
}


