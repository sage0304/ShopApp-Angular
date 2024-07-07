import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-order-admin',
  templateUrl: './detail.order.admin.component.html',
  styleUrls: [
    './detail.order.admin.component.scss',        
  ]
})
export class DetailOrderAdminComponent implements OnInit {
    constructor(
        private router: Router,
    ) {

    }
    ngOnInit() {

    }
}