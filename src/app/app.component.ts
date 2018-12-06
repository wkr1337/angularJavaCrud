import { Component, OnInit } from '@angular/core';
import { CarBrand } from './models/CarBrand';
import { ApiService } from './api.service';
import { CarModel } from './models/CarModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  CarBrands: CarBrand[] = [];
  CurrentCarModels: CarModel[] = [];

  title = 'quintor-rest-frontend';

  constructor(private api: ApiService){}

  ngOnInit(): void {
    this.api.getBrands().subscribe((data: CarBrand[]) => {
      this.CarBrands = data;

      this.api.getModels(this.CarBrands[1].id).subscribe((models) => {
        this.CurrentCarModels = models;
      });

    });
  }

  onModelDeleted(m: CarModel){
      for(let i = 0; i < this.CurrentCarModels.length; i++){
        if(this.CurrentCarModels[i].id == m.id){
          this.CurrentCarModels.splice(i, 1);
          break;
        }
      }
  }


}
