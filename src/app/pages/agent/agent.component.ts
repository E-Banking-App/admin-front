import {Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {AgentService} from '../../services/agent/agent.service'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AgenciesService} from '../../services/agencies/agencies.service'

export interface Agency {
  name: string;
}


@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  constructor(private api: AgentService, private apiAgencies: AgenciesService, private _snackBar: MatSnackBar) { }

  hide = true;


  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar(message:string, type:string) {
    this._snackBar.open(message, type, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  agentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    emailConfirmation: new FormControl('', [Validators.required, Validators.email]),
    cin: new FormControl('', [Validators.required]),
    cinFront: new FormControl('', [Validators.required]),
    cinBack: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    irc: new FormControl('', [Validators.required]),
    ice: new FormControl('', [Validators.required]),
    agencies: new FormControl<string | Agency>('', [Validators.required]),
  })

  onCinFrontSelected(event: any) {
    const file = event.target.files[0];
    console.log("file",file)
    this.agentForm!.get('cinFront')?.setValue(file);
  }

  onCinBackSelected(event: any) {
    const file = event.target.files[0];
    console.log("file",file)
    this.agentForm!.get('cinFront')?.setValue(file);
  }

  onSubmit() {
    console.log(this.agentForm.value);
    if(this.agentForm.valid) {
      this.api.postAgent(this.agentForm.value).subscribe({
        next: (result : any) => {
          console.log(result);
          this.agentForm.reset()
          this.openSnackBar("Agent Added Successfully", "Success")
        },
        error: (err: any)=> {
          console.error(err)
          this.openSnackBar("Something went wrong", "Error")
        }
      })
    }
  }

  agencies: Agency[] = [{name: 'Agency 1'}, {name: 'Agency 2'}, {name: 'Agency 3'}];
  filteredAgencies: Observable<Agency[]> = new Observable<Agency[]>();

  getAgencies(){
    console.log("Get Agencies");
    this.apiAgencies.getAgencies().subscribe({
      next: (result: any) => {
        this.agencies = result
        console.log(result);
      },
      error: (err: any)=> {
        console.error(err)
      }
    })
  }

  ngOnInit() {
    this.getAgencies()
    this.filteredAgencies = this.agentForm!.get('agencies')?.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.agencies.slice();
      }),
    ) as Observable<Agency[]>;
  }

  displayFn(agency: Agency): string {
    return agency && agency.name ? agency.name : '';
  }

  private _filter(name: string): Agency[] {
    const filterValue = name.toLowerCase();
    return this.agencies.filter(agency => agency.name.toLowerCase().includes(filterValue));
  }
}
