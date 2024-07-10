import { Component, OnInit } from '@angular/core';
import {
  DataPage,
  DataRickAndMortyService,
} from '../../services/data-rick-and-morty.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { CardComponent } from '../card/card.component';
import { MaterialModule } from '../../modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MaterialModule, PaginatorComponent],
  providers: [DataRickAndMortyService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  dataPage: DataPage = {} as DataPage;
  constructor(
    private dataRickAndMortyService: DataRickAndMortyService,
    private dialog: MatDialog
  ) {}

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

  openCharacter(idCharacter: number) {
    this.dialog.open(CardComponent, {
      data: idCharacter,
    });
  }
}
