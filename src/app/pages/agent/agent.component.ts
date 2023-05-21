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
    username: new FormControl('', [Validators.required, Validators.email]),
    usernameConfirmation: new FormControl('', [Validators.required, Validators.email]),
    cin: new FormControl('', [Validators.required]),
    cinFront: new FormControl('', [Validators.required]),
    cinBack: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    irc: new FormControl('', [Validators.required]),
    ice: new FormControl('', [Validators.required]),
    agency: new FormControl<string | Agency>('', [Validators.required]),
  })



  onCinFrontSelected(event: any) {
    const file = event.target.files[0];
    console.log("file",file)
    this.agentForm!.get('cinFront')?.setValue(file);
  }

  onCinBackSelected(event: any) {
    const file = event.target.files[0];
    console.log("file",file)
    this.agentForm!.get('cinBack')?.setValue(file);
  }

  onSubmit() {
    console.log(this.agentForm.value);
    const formData = new FormData();
    Object.keys(this.agentForm.controls).forEach((key) => {
      formData.append(key, this.agentForm.get(key)?.value);
    });
    console.log(formData)
    if(this.agentForm.get('username')?.value === this.agentForm.get('usernameConfirmation')?.value && this.agentForm.valid) {
      this.api.postAgent(formData).subscribe({
      // this.api.postAgent(this.agentForm.value).subscribe({
        next: (result : any) => {
          console.log("res",result);
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

  agencies: Agency[] = [];
  filteredAgencies: Observable<Agency[]> = new Observable<Agency[]>();

  getAgencies(){
    console.log("Get Agencies");
    this.apiAgencies.getAgencies().subscribe({
      next: (result: any) => {
        this.agencies = result.map(({ id, ...rest }: any) => rest);
        console.log("result",result.map(({ id, ...rest }: any) => rest));
        this.filteredAgencies = this.agentForm!.get('agency')?.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.name;
            return name ? this._filter(name as string) : this.agencies.slice();
          }),
        ) as Observable<Agency[]>;
      },
      error: (err: any)=> {
        console.error(err)
      }
    })
  }

  ngOnInit() {
    this.getAgencies()
  }

  displayFn(agency: Agency): string {
    return agency && agency.name ? agency.name : '';
  }

  private _filter(name: string): Agency[] {
    const filterValue = name.toLowerCase();
    return this.agencies.filter(agency => agency.name.toLowerCase().includes(filterValue));
  }
}
