import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorsService } from '../doctors.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {

  //* columns for the table
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'phone number', 'city', 'website'];

  //* holds the data for all doctors
  doctorsData:any[]=[]

  //* holder for the subscription in the doctors service
  subscription?: Subscription;


  constructor(
    private data:DoctorsService
  ) { }

  //* calls and subscribes to the getDoctors method in the doctors service
  getItems():void {
    this.data.getDoctors()
    .subscribe((res)=>{
      console.log(res)
      this.doctorsData=res
    })
  }

  //* holds the item being searched
  searchItem = new FormControl('')

  handleFilter = () => {
    return this.doctorsData
      .filter((element) => {
        if (this.searchItem.value.name !== "" || this.searchItem.value.username) {
          return element?.name?.toLowerCase()?.includes(this.searchItem?.value?.toLowerCase()) ||
          element?.username?.toLowerCase()?.includes(this.searchItem?.value?.toLowerCase())
        }
        return element
      })
  }

  //* when the app initializes fetch all doctors
  ngOnInit(): void {
     this.getItems()
    this.subscription = this.data.additionalDoctor.subscribe(item =>{
      console.log(item)
      this.doctorsData.push(item)
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
