import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import {AgenciesService} from '../../services/agencies/agencies.service'
import {AgentService} from '../../services/agent/agent.service'
import {ClientService} from '../../services/client/client.service'
import {AdminService} from '../../services/admin/admin.service'

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit, AfterViewInit {
  columnsAgencies: string[] = ['id', 'name', 'createdAt', 'actions'];
  dataAgencies: MatTableDataSource<any> = new MatTableDataSource([
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

  columnsAgents: string[] = ['id', 'firstName','lastName','email','cin','location','birthDate','phoneNumber','agency', 'irc','ice','actions'];
  dataAgents: MatTableDataSource<any> = new MatTableDataSource([
    {
      id: 1,
      firstName: "Agent 1",
      lastName: "Agent 1",
      email: "agent1@gmail.com",
      cin: "12345678",
      location: "Casablanca",
      birthDate: "2023-05-03",
      phoneNumber: "0612345678",
      agency: "Agency 1",
      irc: "12345678",
      ice: "12345678",
    },
    {
      id: 2,
      firstName: "Agent 2",
      lastName: "Agent 2",
      email: "agent2@gmail.com",
      cin: "12345678",
      location: "Casablanca",
      birthDate: "2023-05-03",
      phoneNumber: "0612345678",
      agency: "Agency 2",
      irc: "12345678",
      ice: "12345678",
    },
  ])

  @ViewChild(MatPaginator) paginatorAgencies!: MatPaginator;
  @ViewChild(MatSort) sortAgencies!: MatSort;

  @ViewChild(MatPaginator) paginatorAgents!: MatPaginator;
  @ViewChild(MatSort) sortAgents!: MatSort;

  ngAfterViewInit() {
    this.dataAgencies.paginator = this.paginatorAgencies;
    this.dataAgencies.sort = this.sortAgencies;
    this.dataAgents.paginator = this.paginatorAgents;
    this.dataAgents.sort = this.sortAgents;
  }

  applyFilterAgencies(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataAgencies.filter = filterValue.trim().toLowerCase();

    if (this.dataAgencies.paginator) {
      this.dataAgencies.paginator.firstPage();
    }
  }

  applyFilterAgents(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataAgents.filter = filterValue.trim().toLowerCase();

    if (this.dataAgents.paginator) {
      this.dataAgents.paginator.firstPage();
    }
  }


  constructor(private dialog: MatDialog, private apiAgencies: AgenciesService, private apiAgent: AgentService, private apiClient: ClientService, private apiAdmin: AdminService) {}

  ngOnInit(): void {
    this.getAgencies()
  }

  getAgencies(){
    console.log("Get Agencies");
    this.apiAgencies.getAgencies().subscribe({
      next: (result: any) => {
        this.dataAgencies = new MatTableDataSource(result);
        this.dataAgencies.paginator = this.paginatorAgencies
        this.dataAgencies.sort = this.sortAgencies
        console.log(result);
      },
      error: (err: any)=> {
        console.error(err)
      }
    })
  }

  getAgents(){
    console.log("Get Agents");
    this.apiAgent.getAgents().subscribe({
      next: (result: any) => {
        this.dataAgents = new MatTableDataSource(result);
        this.dataAgents.paginator = this.paginatorAgents
        this.dataAgents.sort = this.sortAgents
        console.log(result);
      },
      error: (err: any)=> {
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
