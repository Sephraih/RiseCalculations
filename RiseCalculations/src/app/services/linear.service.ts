import { Injectable } from '@angular/core';
import { LinearModel } from '../models/function.models';

@Injectable()
export class LinearService {

    readonly upperLimit = 100;
    readonly lowerLimit = 0;  

    // takes an x vlaue to be evaluated and a linear model, containing all values for a, b and x offset
    public evaluateLinear(x: number, model: LinearModel){
      //values outside the boundary are calculated with the first and last interval's values, allowing inverse functions to be defined
      if(x<=model.offset[0]){
        return model.a[0]*x + model.b[0];
      }
      if(x>=model.offset[model.offset.length-1]){
        return model.a[model.a.length-1]*x +model.b[model.b.length-1];
      }
      //checking from bottom up whether the input is smaller than the interval offsets, 
      //if so, return that interval's ax+b, if result out of bounds, boundary values are returned
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