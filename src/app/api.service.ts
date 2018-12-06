import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CarBrand } from './models/CarBrand';
import { CarModel } from './models/CarModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host:string = "http://localhost:8081/quintorrest/webapi/";

  constructor(private http: HttpClient) { }

  getBrands() {
    return this.http.get<CarBrand[]>(this.host + "brands");
  }

  getModels(brandid: number) {
    return this.http.get<CarModel[]>(this.host + "models/brands/"+brandid);
  }

  editModel(m: CarModel){
    return this.http.patch(this.host + 'models/model', m);
  }

  deleteModel(m: CarModel){
    return this.http.delete(this.host +'models/model/' + m.id);
  }

}
