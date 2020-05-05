import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';

import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ReadingService } from "../../services/reading.service";
import { Color, BaseChartDirective, Label, ThemeService } from 'ng2-charts';
import { Chart } from 'chart.js'
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import * as moment from 'moment';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ShareService } from '@ngx-share/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: true }) readingChart: BaseChartDirective;
  @ViewChild(BaseChartDirective, { static: true }) consChart: BaseChartDirective;

  @ViewChild('infoModal') public infoModal: ModalDirective;

  constructor(
    private readingService: ReadingService,
    public share: ShareService,
    private router: Router,
  ) {
  }


  public canvasWidth = 200
  public centralLabel = ''
  public gaugeNeedleValue = 50;
  public name = 'Current level'
  public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['#4D0000', '#8b0202', '#8b0202', '#d9534f', '#ff8d00', '#f0ad4e', '#5cb85c', '#5cb85c'],
    arcDelimiters: [5, 10.5, 17, 25, 33, 50, 75],
    rangeLabel: ['0', '150'],
    needleStartValue: 0,
  }

  public formatDate(date, format) {
    return moment(date.toString()).format(format);
  }

  public isOutDated() {
    let isOutDated = moment().isAfter(moment(this.time).add(11, 'minutes'));
    return isOutDated;
  }

  radioModel: string = '24';

  public today: string = '';
  public tankHeight: number = 150.0;
  public tankCapacity: number = 8.0;
  public severity_class: string = 'bg-primary';
  public severity_simple = '';
  public severity = '';

  public currentLevel: number = 0;
  public currentLevel_percentage: number = 0;
  public currentCapacity: number = 0;
  public lable: string = '';
  public time: string = '';

  public averageConsumption: number = 0;
  public dConsLst: number[] = [];
  public dConsPercLst: number[] = [];

  public timeToRefill: number = 0;
  public dayToRefill: string;

  // readingChart setup ***
  public readingChartData: Array<number> = [];
  public readingChartDataset: Array<any> = [
    {
      data: this.readingChartData,
      label: 'Level'
    }
  ];
  public readingChartDatasetColors: Array<any> = [{
    borderColor: getStyle('--info'),
    borderWidth: 2,
    backgroundColor: getStyle('--info'),
  }];
  public readingChartType = "line";
  public readingChartLegend = false;
  public readingChartLabels: Array<any> = [];
  public readingChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      plugins: [ChartAnnotation],
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            minute: 'HH:MM'
          }
        },
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          autoSkip: true
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(this.tankHeight / 5),
          max: this.tankHeight
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 1,
        borderColor: 'white',
        borderWidth: 1,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
        hoverBackgroundColor: 'white'
      }
    },
    legend: {
      display: false
    },
    annotation: {
      annotations: [{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 135,
        borderColor: getStyle('--success'),
        borderWidth: 1
      }, {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 75,
        borderColor: '#f0ad4e',
        borderWidth: 1
      }, {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 49,
        borderColor: '#ff8d00',
        borderWidth: 1
      }, {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 25.5,
        borderColor: '#d9534f',
        borderWidth: 1
      }, {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 15,
        borderColor: 'rgb(139, 2, 2)',
        borderWidth: 1
      }]
    }
  };


  public reading_controller(timestamp, currentlevel) {
    var t = [112.5, 75, 49.5, 37.5, 25.5, 15, 7.5, 0];
    var labeles = ["Normal", "Normal", "Low", "Medium", "High", "Critical", "Critical", "Critical", "Unknown"];
    var color = ["#5cb85c", "#5cb85c", "#f0ad4e", "#ff8d00", "#d9534f", "#8b0202", "#8b0202", "#4D0000", "#382724"];
    var shape = ["fa-smile-o", "fa-smile-o", "fa-meh-o", "fa-meh-o", "fa-frown-o", "fa-frown-o", "fa-frown-o", "fa-frown-o", "fa-cubes"];
    var bar = ["bar-normal", "bar-normal", "bar-low", "bar-medium", "bar-high", "bar-critical", "bar-critical", "bar-critical", ""];
    var severity_class = ["status-normal", " status-normal", " status-low", " status-medium", " status-high", " status-critical", " status-critical", " status-critical", ""];
    var severity_label = ["Normal", "Normal", "Low", "Medium", "High", "Critical", "Critical", "Critical", ""];

    var result = 0;
    if (currentlevel > t[0]) {
      result = 0;
    } else if (currentlevel <= t[0] && currentlevel > t[1]) {
      result = 1;
    } else if (currentlevel <= t[1] && currentlevel > t[2]) {
      result = 2;
    } else if (currentlevel <= t[2] && currentlevel > t[3]) {
      result = 3;
    } else if (currentlevel <= t[3] && currentlevel > t[4]) {
      result = 4;
    } else if (currentlevel <= t[4] && currentlevel > t[5]) {
      result = 5;
    } else if (currentlevel <= t[5] && currentlevel > t[6]) {
      result = 6;
    } else if (currentlevel <= t[6] && currentlevel > t[7]) {
      result = 7;
    } else {
      result = 8;
    }

    this.currentLevel = isNaN(currentlevel) ? 0 : currentlevel;
    this.lable = labeles[result];
    this.time = timestamp.substring(0, 19);
    this.severity_class = severity_class[result];
    this.severity = severity_label[result];
    this.severity_simple = shape[result];

    this.gaugeNeedleValue = (this.currentLevel / this.tankHeight * 100);//normalize from e.g. 150 scale to 100

    this.currentLevel_percentage = Math.round((this.currentLevel / this.tankHeight) * 100 * 10) / 10;
    this.currentCapacity = Math.round(this.currentLevel * (this.tankCapacity / this.tankHeight) * 10) / 10;
  }

  // consumpiton chart setyo
  public consChartType = "bar";
  public consChartLegend = true;
  public consChartDataset: any[] = [
    { data: [], label: 'First Quarter', key: 'q1' },
    { data: [], label: 'Second Quarter', key: 'q2' },
    { data: [], label: 'Third Quarter', key: 'q3' },
    { data: [], label: 'Fourth Quarter', key: 'q4' },
    { data: [], label: 'Full Day', key: 'd' }];
  public consChartLabels: Array<any> = [];
  public consChartOptions: any = {
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    responsive: true
  };


  public getRoundedNumber(num, dum) {
    return Math.round((num / dum) * 100 * 10) / 10;
  }

  public limit: number = 280;

  //switch betwwen waterlevel 6 hrs and 24 hrs
  public getData(limit) {
    this.readingChartLabels = [];
    this.readingChartData = [];
    this.limit = limit;
    this.readingService.getItemsLimit(this.limit).subscribe(
      res => {
        let self = this;
        res[0].reverse().forEach(function (value) {
          self.readingChartLabels.push(value['timestamp']);
          self.readingChartData.push(+(value['level']));
        });

        this.readingChart.datasets[0].data = this.readingChartData;
        this.readingChart.update();

        let lastRecord = res[0][res[0].length - 1];
        this.reading_controller(lastRecord['timestamp'], lastRecord['level']);
      },
      error => {
        if(error['error']!=undefined && error.error== "jwt expired"){
          this.router.navigate(["/login"]);
        }
      }
    );
  }



  public genPDF(elementId) {
    var data = document.getElementById(elementId);
    var dropdowns = data.getElementsByClassName('dropdown-menu');
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove('show');
    }
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 200;
      var pageHeight = 500;
      var imgHeight = 500;
      //    if(canvas.width < canvas.height){
      //    imgHeight = canvas.height + pageHeight;
      //}else{
      imgHeight = (canvas.height * imgWidth) / canvas.width;
      //}
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      var pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var top_position = 5;
      var left_position = 5;
      // pdf.addImage(agency_logo.src, 'PNG', logo_sizes.centered_x, _y, logo_sizes.w, logo_sizes.h);
      pdf.addImage(contentDataURL, 'PNG', left_position, top_position, imgWidth, imgHeight);
      pdf.save(elementId + '.pdf'); // Generated PDF
    });
  }

  public fixIfNaN(number) {
    return isNaN(number) ? '-' : number;
  }


  public refreshContent() {
    this.readingChartLabels = [];
    this.readingChartData = [];
    this.today = moment().format("YYYY-MM-DD");
    this.readingService.getItemsLimit(this.limit).subscribe(
      res => {
        let self = this;
        res[0].reverse().forEach(function (value) {
          self.readingChartLabels.push(value['timestamp']);
          self.readingChartData.push(+(value['level']));
        });

        this.readingChart.datasets[0].data = this.readingChartData;
        this.readingChart.update();

        let lastRecord = res[0][res[0].length - 1];
        this.reading_controller(lastRecord['timestamp'], lastRecord['level']);
      },
      error => {
      }
    );

    //Assign quarters 0 as init.
    this.consChartLabels = [];
    for (let i = 0; i < 4; i++) {
      this.consChartDataset[i]['data'] = [];
      this.consChartLabels.push('');
      for (let j = 0; j < 7; j++) {
        this.consChartDataset[i]['data'].push(0);
      }
    }
    this.readingService.getItemsConsumptionLimit(28).subscribe(
      res => {
        let self = this;
        let revInx = 6;
        res[0].forEach(function (record) {
          let diff = record['consumption'];
          let day = record['day'];
          let q = record['quarter'];

          self.averageConsumption = self.averageConsumption + diff;

          let index = self.consChartLabels.indexOf(day);
          if (revInx == -1 && index == -1) {
            return;
          }
          if (index == -1) {
            self.consChartLabels[revInx] = day;
            self.consChartDataset[4]['data'][revInx] = diff;
            //add quarter cons. in corresponding data list
            self.consChartDataset[q - 1]['data'][revInx] = diff;
            revInx--;
          } else {
            //update day total            
            let d_total = self.consChartDataset[4]['data'][index] + diff;
            self.consChartDataset[4]['data'][index] = d_total;
            self.consChartDataset[q - 1]['data'][index] = (diff);
          }
          self.consChart.datasets = self.consChartDataset;
          self.consChart.update();
        });

        this.averageConsumption = this.fixIfNaN(this.getRoundedNumber(this.averageConsumption, this.consChartLabels.length));
        //calculate today's consumption
        let todayIndex = this.consChartLabels.indexOf(this.today);
        for (let i = 0; i < 5; i++) {
          let temp = this.consChartDataset[i]['data'][todayIndex];
          this.dConsLst.push(this.fixIfNaN(temp));
          this.dConsPercLst.push(this.fixIfNaN(this.getRoundedNumber(this.consChartDataset[i]['data'][todayIndex], this.tankHeight)));
          document.getElementById('q' + (i + 1) + 'ProgressBar').style.width = (this.dConsPercLst[i] | 0) + '%';
        }

        //calculate yesterday's consumption
        let yesterdayIndex = this.consChartLabels.indexOf(moment().add(-1, 'day').format("YYYY-MM-DD"));
        console.log(moment().add(-1, 'day').format("YYYY-MM-DD"));
        for (let i = 0; i < 5; i++) {
          let temp = this.consChartDataset[i]['data'][yesterdayIndex];
          this.dConsLst.push(this.fixIfNaN(temp));
        }

        //calculate time to refill
        this.timeToRefill = Math.ceil(this.currentLevel / this.averageConsumption) - 1;
        if (isNaN(this.timeToRefill)) {
          this.timeToRefill = 0;
        }
        this.dayToRefill = moment().add(this.timeToRefill, 'day').format('ddd D MMM HH:mm');
      },
      error => {
        if(error['error']!=undefined && error.error== "jwt expired"){
          this.router.navigate(["/login"]);
        }
      }
    );
  }


  private refreshSubscription: Subscription;
  private refreshInterval: number = (+localStorage.getItem("refreshInterval"));//300000 every 5 minutes
  public counter: number = 1;

  public setRefreshInterval(minutes) {
    if (this.refreshSubscription != null) {
      this.refreshSubscription.unsubscribe();
    }
    if (minutes != 'M') {
      this.refreshInterval = (minutes * 60 * 1000);
      this.refreshSubscription = interval(this.refreshInterval).subscribe(
        (val) => {
          this.refreshContent();
          this.counter++;
        });
    } else {
      this.refreshInterval = -1;
    }
    localStorage.setItem("refreshInterval", minutes+ '');
  }

  public isRefreshInterval(minutes) {
    if (minutes != 'M') {
      const tmp = (minutes * 60 * 1000);
      return (this.refreshInterval === tmp);
    } else {
      return (this.refreshInterval === -1);
    }
  }

  ngOnInit(): void {

    this.today = moment().format("YYYY-MM-DD");

    this.readingService.getItemsLimit(280).subscribe(
      res => {
        let self = this;
        res[0].reverse().forEach(function (value) {
          self.readingChartLabels.push(value['timestamp']);
          self.readingChartData.push(+(value['level']));
        });
        let lastRecord = res[0][res[0].length - 1];
        this.reading_controller(lastRecord['timestamp'], lastRecord['level']);
      },
      error => {
        if(error['error']!=undefined && error.error== "jwt expired"){
          this.router.navigate(["/login"]);
        }
      }
    );

    //Assign quarters 0 as init.
    for (let i = 0; i < 4; i++) {
      this.consChartLabels.push('');
      for (let j = 0; j < 7; j++) {
        this.consChartDataset[i]['data'].push(0);
      }
    }
    this.readingService.getItemsConsumptionLimit(28).subscribe(
      res => {
        let self = this;
        let revInx = 6;
        res[0].forEach(function (record) {
          let diff = record['consumption'];
          let day = record['day'];
          let q = record['quarter'];

          self.averageConsumption = self.averageConsumption + diff;

          let index = self.consChartLabels.indexOf(day);
          if (revInx == -1 && index == -1) {
            return;
          }
          if (index == -1) {
            self.consChartLabels[revInx] = day;
            self.consChartDataset[4]['data'][revInx] = diff;
            //add quarter cons. in corresponding data list
            self.consChartDataset[q - 1]['data'][revInx] = diff;
            revInx--;
          } else {
            //update day total            
            let d_total = self.consChartDataset[4]['data'][index] + diff;
            self.consChartDataset[4]['data'][index] = d_total;
            self.consChartDataset[q - 1]['data'][index] = (diff);
          }
        });
        this.averageConsumption = this.fixIfNaN(this.getRoundedNumber(this.averageConsumption, this.consChartLabels.length));
        //calculate today's consumption
        let todayIndex = this.consChartLabels.indexOf(this.today);
        for (let i = 0; i < 5; i++) {
          let temp = this.consChartDataset[i]['data'][todayIndex];
          this.dConsLst.push(this.fixIfNaN(temp));
          this.dConsPercLst.push(this.fixIfNaN(this.getRoundedNumber(this.consChartDataset[i]['data'][todayIndex], this.tankHeight)));
          document.getElementById('q' + (i + 1) + 'ProgressBar').style.width = (this.dConsPercLst[i] | 0) + '%';
        }
        //calculate yesterday's consumption
        let yesterdayIndex = this.consChartLabels.indexOf(moment().add(-1, 'day').format("YYYY-MM-DD"));
        for (let i = 0; i < 5; i++) {
          let temp = this.consChartDataset[i]['data'][yesterdayIndex];
          this.dConsLst.push(this.fixIfNaN(temp));
        }
        //calculate time to refill
        this.timeToRefill = Math.ceil(this.currentLevel / this.averageConsumption) - 1;
        if (isNaN(this.timeToRefill)) {
          this.timeToRefill = 0;
        }
        this.dayToRefill = moment().add(this.timeToRefill, 'day').format('ddd D MMM HH:mm');

      },
      error => {
        if(error['error']!=undefined && error.error== "jwt expired"){
          this.router.navigate(["/login"]);
        }
      }
    );

    this.setRefreshInterval(+(localStorage.getItem('refreshInterval') ) | 5);
  }


}
