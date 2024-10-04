import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../services/biller.services';
import { ActivatedRoute } from '@angular/router';
import { Biller } from '../../interfaces/biller.interface';

@Component({
  selector: 'app-create-view',
  templateUrl: './create-view.component.html',
  styleUrls: ['./create-view.component.css']
})
export class CreateViewComponent implements OnInit {


  biller: Biller | undefined;


  constructor(
    private billerService: BillerService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const billerId = this._route.snapshot.params['billerId'];
    this.loadBiller(billerId);
  }

  loadBiller(billerId: string) {
    this.biller = this.billerService.getBiller(billerId);
  }

}
