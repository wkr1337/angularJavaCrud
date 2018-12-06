import { Component, OnInit, Input, Output } from '@angular/core';
import { CarModel } from '../models/CarModel';
import { EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-car-model-item',
  templateUrl: './car-model-item.component.html',
  styleUrls: ['./car-model-item.component.css']
})
export class CarModelItemComponent implements OnInit {

  @Input('model') model: CarModel;
  @Output('onDeleted') onDeleted: EventEmitter<CarModel> = new EventEmitter();
  editMode: boolean;
  
  constructor(private api: ApiService) { }
 
  ngOnInit() {

  }

  onEdit() {
    this.editMode = true;
  }

  onDelete() {
    //iets api doen bv api.editCarBrand(this.model)
    this.api.deleteModel(this.model).subscribe(()=>{
      console.log("deleted model", this.model);
      this.onDeleted.emit(this.model);
    });
    
  }

  save() {
    //iets api doen bv api.editCarBrand(this.model)
    this.api.editModel(this.model).subscribe(()=>{
      console.log("updated model", this.model);
    });
    this.editMode = false;
  }

}
