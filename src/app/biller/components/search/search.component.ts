import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillerService } from '../../services/biller.services';

@Component({
  selector: 'biller-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Output() search = new EventEmitter<string>();

  onSearch(term: string) {
    this.search.emit(term);
  }

}
