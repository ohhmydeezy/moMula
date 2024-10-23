import {
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/app.selectors';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
})
export class ChartsComponent implements OnInit {
  #store = inject(Store);
  user$ = this.#store.selectSignal(selectUser);


  computedDataSignal = computed(() => {
    const mappedData =
      this.user$()?.cards?.map((card) => {
        return {
          value: card.accountBalance,
          category: card.accountName,
        };
      }) ?? [];
    return mappedData;
  });

  ngOnInit(): void {
      setTimeout(() => {
        this.showChart();
      }, 1000);
  }

  // AMchart for userCards together

  showChart(): void {
    let root = am5.Root.new('chartdiv');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        startAngle: 180,
        endAngle: 360,
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        startAngle: 180,
        endAngle: 360,
        valueField: 'value',
        categoryField: 'category',
        legendValueText: '{value}',
      })
    );

    series.slices.template.set('tooltipText', '{category}: £{value}');
    series.labels.template.set('forceHidden', true);



    series.states.create('hidden', {
      startAngle: 180,
      endAngle: 180,
    });

    series.slices.template.setAll({
      cornerRadius: 5,
    });

    series.ticks.template.setAll({
      forceHidden: true,
    });

    // dynamically Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data

    series.data.setAll(this.computedDataSignal());
    series.appear(1000, 100);
  }
}
