import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataRickAndMortyService } from '../../services/data-rick-and-morty.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../modules/material/material.module';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MaterialModule, HttpClientModule],
  providers: [DataRickAndMortyService],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  characterInfo: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) private dataCharacter: number,
    private dataRickAndMortyService: DataRickAndMortyService
  ) {}

  ngOnInit(): void {
    this.dataRickAndMortyService
      .characterInformation(this.dataCharacter)
      .subscribe({
        next: (data: any) => {
          this.characterInfo = data;
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }
}
