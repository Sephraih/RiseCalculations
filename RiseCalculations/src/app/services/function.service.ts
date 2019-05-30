import { Injectable } from '@angular/core';
import { LinearModel } from '../models/function.models';

@Injectable()
export class LinearService {

    readonly upperLimit = 100;
    readonly lowerLimit = 0;  

    public evaluateLinear(x: number, model: LinearModel){
        if(x<=model.offset[0]){
            return model.a[0]*x + model.b[0];
          }
          if(x>=model.offset[model.offset.length-1]){
            return model.a[model.a.length-1]*x +model.b[model.b.length-1];
          }
          for(let i=0; i < model.offset.length; i++) {
            if(x<model.offset[i]){
              let result = model.a[i] * x +model.b[i];
              if(result<this.lowerLimit){return this.lowerLimit;}
              if(result>this.upperLimit){return this.upperLimit;}
              return result;
            }
          }
    }
    
}