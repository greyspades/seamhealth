import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validator, Validators, ValidatorFn  } from '@angular/forms';
import { DoctorsService } from '../doctors.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private form:FormBuilder,
    private data:DoctorsService
  ) { }

  ngOnInit(): void {

  }


//* initialize form control handlers for each field in a form group and validates al fields
registerForm=new FormGroup({
  name: new FormControl('',[
    Validators.required,
    Validators.minLength(4),
  ]),
  username: new FormControl('',[
    Validators.required,
    Validators.minLength(4),
  ]),
  email: new FormControl('',[
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  ]),
  phone: new FormControl('',[
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(13)
  ]),
  city: new FormControl('',[
    Validators.required,
  ]),
  website: new FormControl('',[
    Validators.required,
    Validators.minLength(4),
  ]
    
  ),
})

//* ensures only numbers are inputed into the phone field
numericOnly(event:any): boolean {    
  let patt = /^([0-9])$/;
  let result = patt.test(event.key);
  return result;
}

//*getters for retrieving form field instance
get name() { return this.registerForm.get('name'); }

get username() { return this.registerForm.get('username'); }

get phone() { return this.registerForm.get('phone'); }

get email() { return this.registerForm.get('email'); }

get city() { return this.registerForm.get('city'); }

get website() { return this.registerForm.get('website'); }


//* submits the form data 
onSubmit() {
  this.data.addDoctor(this.registerForm.value)
  this.registerForm.reset()
}
  


}
