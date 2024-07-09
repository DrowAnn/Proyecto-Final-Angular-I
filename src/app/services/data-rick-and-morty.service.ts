import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface DataPage {
  info: {
    count: number;
  };
  results: [{ name: string; species: string }];
}

@Injectable({
  providedIn: 'root',
})
export class DataRickAndMortyService {
  private urlApi = 'https://rickandmortyapi.com/api';
  constructor(private http: HttpClient) {}

  charactersPage(pageNumber: number) {
    return this.http.get(`${this.urlApi}/character/?page=${pageNumber}`);
  }

  characterInformation(characterId: number) {
    return this.http.get(`${this.urlApi}/character/${characterId}`);
  }
}
