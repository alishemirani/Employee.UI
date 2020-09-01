import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../models/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.sass']
})
export class AddressComponent implements OnInit {

  @Input() address: Address;

  constructor() { }

  ngOnInit(): void {
  }

  toNumber() {
    if (isNaN(this.address.zipCode)) {
      this.address.zipCode = null
    }
    this.address.zipCode=+this.address.zipCode
  }

}
