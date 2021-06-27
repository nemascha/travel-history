import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models';
import { Travel } from 'src/app/models/travel.model';
import { TRAVELS } from 'src/app/models/travels';
import { UserService } from 'src/app/services/user.service';
import { TravelService } from 'src/app/services/travel.service';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface TravelHistory {
  city: string;
  country: string;
  weather: string;
  year: string;
  notes: string
}

const TRAVEL_DATA: TravelHistory[] = [
  { country: 'USA', city: 'New-york', weather: '+35', year: '2021', notes: 'notes' },
  { country: 'Canada', city: 'Winnipeg', weather: '+30', year: '2020', notes: 'notes' }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['year', 'country', 'city', 'weather', 'notes'];
  dataSource = new MatTableDataSource<TravelHistory>(TRAVEL_DATA);
  travels: Travel[] = [];

  @ViewChild(MatSort) sort: MatSort;

  users: User[] = [];
  

  constructor(
    private userService: UserService,
    private travelService: TravelService
  ) {
    this.users = [];
  }

  ngAfterViewInit() {
     this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getTravelsData();
    //this.userService
    //.getUsers()
    //.subscribe((users: User[]) => this.users = users);
  }

  getTravelsData(): void {
    this.travelService.getTravels()
      .subscribe((data: Travel[]) => this.travels = data);
  } 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addData() {
    this.dataSource.data = TRAVEL_DATA;
  }
}
