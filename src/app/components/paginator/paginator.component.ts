import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { JsonPipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  DataPage,
  DataRickAndMortyService,
} from '../../services/data-rick-and-morty.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    JsonPipe,
    HttpClientModule,
  ],
  providers: [DataRickAndMortyService],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent implements OnInit {
  constructor(private dataRickAndMortyService: DataRickAndMortyService) {}
  dataPage: DataPage = {} as DataPage;
  length: number = 0;
  pageSize: number = 0;
  pageIndex = 0;

  @Output() emisor = new EventEmitter<number>();

  ngOnInit(): void {
    this.dataRickAndMortyService.charactersPage(1).subscribe({
      next: (data: any) => {
        this.dataPage = data;
        this.length = this.dataPage.info.count;
        this.pageSize = this.dataPage.results.length;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  pageEvent: PageEvent = new PageEvent();

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.emisor.emit(e.pageIndex + 1);
  }
}
