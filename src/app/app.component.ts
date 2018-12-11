import { Component, OnInit, Input, Output } from '@angular/core';
import { CarBrand } from './models/CarBrand';
import { ApiService } from './api.service';
import { CarModel } from './models/CarModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @Input('model') model: CarModel;

  CarBrands: CarBrand[] = [];
  CurrentCarModels: CarModel[] = [];
  currentCarBrand = null;
  addMode: boolean;
  message: string;
  title = 'quintor-rest-frontend';
  currentBrandName: string;

  constructor(private api: ApiService){}

  ngOnInit(): void {
    this.api.getBrands().subscribe((data: CarBrand[]) => {
      this.CarBrands = data;
    });
    this.model = new CarModel();

  }

  onModelDeleted(m: CarModel){
      for(let i = 0; i < this.CurrentCarModels.length; i++){
        if(this.CurrentCarModels[i].id == m.id){
          this.CurrentCarModels.splice(i, 1);
          break;
        }
      }
  }
  addModelInput() {
    this.addMode = true;
  }
  save() {
    if(this.model.brand_id && this.model.name) {
      this.api.saveModel(this.model).subscribe((data: CarModel)=>{
        this.model = data;
        // console.log("model added", this.model);
        if(this.currentCarBrand){
          if(this.model.brand_id == this.currentCarBrand.id) {
            this.CurrentCarModels.push(this.model);

            }
        }
          this.model = new CarModel();

      });

      this.message = "";
      this.addMode = false;
    } else {
      this.message = "model name and brand are required!";
    }
    
  }
  searchModels() {
    if(this.currentBrandName) {
      // console.log(this.currentBrandName);

      this.api.getBrandByName(this.currentBrandName).subscribe((data: CarBrand)=>{

        if(data) {
          this.currentCarBrand = data;
  
          this.api.getModels(this.currentCarBrand.id).subscribe((models) => {
            if (models.length > 0) {
              // console.log(models);
              this.CurrentCarModels = models;
              this.message = "";
            } else {
              this.message = "Brand '" + this.currentBrandName + "' has no models yet";
              this.CurrentCarModels = [];
            }
          });
        } else {
          this.message = "Brand '" + this.currentBrandName + "' not found";
          this.CurrentCarModels = [];

        }
        

      });

    }
  }

  
}
