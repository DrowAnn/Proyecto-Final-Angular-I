import { Component, OnInit } from '@angular/core';
import {
  DataPage,
  DataRickAndMortyService,
} from '../../services/data-rick-and-morty.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatListModule, MatButtonModule, PaginatorComponent],
  providers: [DataRickAndMortyService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  dataPage: DataPage = {} as DataPage;
  constructor(private dataRickAndMortyService: DataRickAndMortyService) {}

  ngOnInit(): void {
    this.dataRickAndMortyService.charactersPage(1).subscribe({
      next: (data: any) => {
        this.dataPage = data;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  changePage(pageIndex: number) {
    this.dataRickAndMortyService.charactersPage(pageIndex).subscribe({
      next: (data: any) => {
        this.dataPage = data;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  save() {}
}
