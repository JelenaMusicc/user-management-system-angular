import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  allUser: Object;
  managerCount: number;
  developerCount: number;
  devopsCount: number;
  category = [];
  canvas = [];

  constructor(private userService: UserService) {
  }

  getLatestUser() {
    this.userService.getAllUser().subscribe((response) => {
      this.allUser = response;
      this.calculateCount();
    })
  }

  ngOnInit() {
    this.getLatestUser();

  }
  ngAfterViewInit(){
    this.getChart();
  }
  calculateCount() {
    this.devopsCount = 0;
    this.developerCount = 0;
    this.managerCount = 0;
    for (let user of Array.prototype.slice.call(this.allUser)) {
      if (user.category.name == 'devops') {
        this.devopsCount += 1;
      } else if (user.category.name == 'developer') {
        this.developerCount += 1;
      } else if (user.category.name == 'manager') {
        this.managerCount += 1;
      }
    }
  }
 async getChart() {
    await this.getLatestUser();
      this.canvas = new Chart('canvas', {
        type: 'line',
        data: {
          labels: ['devops', 'developer', 'manager'],
          datasets: [
            {
              data: this.devopsCount,
              borderColor: '#3cba9f',
              fill: true
            },
            {
              data: this.developerCount,
              borderColor: '#ffcc00',
              fill: true
            },
            {
              data: this.managerCount,
              borderColor: '#1a73e8',
              fill: true
            },
          ]
        },
        options: {
          legent: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      }
    )

  }

}
