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
    }
  ])

  columnsAgents: string[] = ['id', 'firstName','lastName','username','cin','location','birthDate','phoneNumber','agency', 'irc','ice','actions'];
  dataAgents: MatTableDataSource<any> = new MatTableDataSource([
    {
      id: 1,
      firstName: "Agent 1",
      lastName: "Agent 1",
      username: "agent1@gmail.com",
      cin: "12345678",
      location: "Casablanca",
      birthDate: "2023-05-03",
      phoneNumber: "0612345678",
      agency: "Agency 1",
      irc: "12345678",
      ice: "12345678",
    },
  ])

  columnsClients: string[] = ['id', 'firstName','lastName','username', 'email', 'actions'];
  dataClients: MatTableDataSource<any> = new MatTableDataSource([
    {
      id: 1,
      firstName: "Agent 1",
      lastName: "Agent 1",
      username: "074543566543",
      email: "agent1@gmail.com",
    },
  ])

  columnsAdmins: string[] = ['id', 'firstName','lastName','username', 'phoneNumber', 'actions'];
  dataAdmins: MatTableDataSource<any> = new MatTableDataSource([
    {
      id: 1,
      firstName: "Agent 1",
      lastName: "Agent 1",
      email: "agent1@gmail.com",
      phoneNumber: "06045436465"
    },
  ])

  @ViewChild(MatPaginator) paginatorAgencies!: MatPaginator;
  @ViewChild(MatSort) sortAgencies!: MatSort;

  @ViewChild(MatPaginator) paginatorAgents!: MatPaginator;
  @ViewChild(MatSort) sortAgents!: MatSort;

  @ViewChild(MatPaginator) paginatorClients!: MatPaginator;
  @ViewChild(MatSort) sortClients!: MatSort;

  @ViewChild(MatPaginator) paginatorAdmins!: MatPaginator;
  @ViewChild(MatSort) sortAdmins!: MatSort;

  ngAfterViewInit() {
    this.dataAgencies.paginator = this.paginatorAgencies;
    this.dataAgencies.sort = this.sortAgencies;

    this.dataAgents.paginator = this.paginatorAgents;
    this.dataAgents.sort = this.sortAgents;

    this.dataClients.paginator = this.paginatorClients;
    this.dataClients.sort = this.sortClients;

    this.dataAdmins.paginator = this.paginatorAdmins;
    this.dataAdmins.sort = this.sortAdmins;
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

  applyFilterClients(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataClients.filter = filterValue.trim().toLowerCase();

    if (this.dataClients.paginator) {
      this.dataClients.paginator.firstPage();
    }
  }

  applyFilterAdmins(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataAdmins.filter = filterValue.trim().toLowerCase();

    if (this.dataAdmins.paginator) {
      this.dataAdmins.paginator.firstPage();
    }
  }


  constructor(private dialog: MatDialog, private apiAgencies: AgenciesService, private apiAgent: AgentService, private apiClient: ClientService, private apiAdmin: AdminService) {}

  ngOnInit(): void {
    this.getAgencies()
    this.getAgents()
    this.getClients()
    this.getAdmins()
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

  getClients(){
    console.log("Get Clients");
    this.apiClient.getClients().subscribe({
      next: (result: any) => {
        this.dataClients = new MatTableDataSource(result);
        this.dataClients.paginator = this.paginatorClients
        this.dataClients.sort = this.sortClients
        console.log(result);
      },
      error: (err: any)=> {
        console.error(err)
      }
    })
  }

  getAdmins(){
    console.log("Get Admins");
    this.apiAdmin.getAdmins().subscribe({
      next: (result: any) => {
        this.dataAdmins = new MatTableDataSource(result);
        this.dataAdmins.paginator = this.paginatorAdmins
        this.dataAdmins.sort = this.sortAdmins
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
