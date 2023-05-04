import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {AgenciesService} from '../services/agencies.service'

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([
    {
      id: 1,
      name: "Agency 1",
      createdAt: "2023-05-03"
    },
    {
      id: 2,
      name: "Agency 2",
      createdAt: "2023-05-03"
    },
    {
      id: 3,
      name: "Agency 3",
      createdAt: "2023-05-03"
    }
  ])

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  constructor(private dialog: MatDialog, private api: AgenciesService) {}

  ngOnInit(): void {
    this.getAgencies()
  }

  getAgencies(){
    console.log("Get Agencies");
    this.api.getAgencies().subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        console.log(result);
      },
      error: (err)=> {
        console.error(err)
      }
    })
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
