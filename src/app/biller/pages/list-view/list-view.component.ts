import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../services/biller.services';
import { Biller } from '../../interfaces/biller.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  billerList: Biller[] = [];

  constructor(
    private billerService: BillerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.billerList = this.billerService.getBillers();
  }

  onEdit(billerId: string) {
    this.router.navigate([`create-view/edit-form/${billerId}`]);
  }




}
