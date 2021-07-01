import {Component, OnInit, ViewChild} from '@angular/core';
import { Travel } from 'src/app/models/travel.model';
import { TRAVELS } from 'src/app/models/travels';
import { TravelService } from 'src/app/services/travel.service';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Sort } from "@angular/material/sort";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['year', 'country', 'city', 'weather', 'notes', 'action'];
  dataSource = TRAVELS;
  travels: Travel[] = [];
  citiesNames: string[] = [];
  data: any;

  @ViewChild(MatTable, {static:true}) table: MatTable<any>;

  constructor(
    private travelService: TravelService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getTravelsData();
    this.dataSource = this.travels.slice();
    this.getCity();
    this.getWeather();
  }

  getCity(): void {
    this.travels.forEach(item => {
      this.citiesNames.push(item.city);
      let cityName;

      for (let item in this.citiesNames){
        cityName = this.citiesNames[item];
        this.travelService.getCurrentWeather(cityName)
          .subscribe((data) => {
            this.data = data;
          });
      }
    });
  }

  getWeather(): string {
      return (this.data.main.temp - 273.15).toFixed(0);
  }


  getTravelsData(): void {
    this.travelService.getTravels()
      .subscribe((data: Travel[]) => this.travels = data);
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if(result.event == 'Update') {
        this.updateRowData(result.data);
      } else if(result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any): void {
    const d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      country: row_obj.country,
      city: row_obj.city,
      year: row_obj.year,
      notes: row_obj.notes
    });
    this.table.renderRows();
  }

  updateRowData(row_obj: any): void{
    this.dataSource = this.dataSource.filter((value,key)=>{
      if (value.id == row_obj.id){
        value.country = row_obj.country;
        value.city = row_obj.city;
        value.year = row_obj.year;
        value.notes = row_obj.notes;
      }
      return true;
    });
  }

  deleteRowData(row_obj: any): void {
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

  sortData(sort: Sort) {
    const data = this.travels.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'year': return this.compare(a.year, b.year, isAsc);
        case 'country': return this.compare(a.country, b.country, isAsc);
        case 'city': return this.compare(a.city, b.city, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
