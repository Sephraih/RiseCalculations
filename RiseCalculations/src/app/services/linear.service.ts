import { Injectable } from '@angular/core';
import { StandardLinearModel, InvertedLinearModel } from '../models/function.models';

//service-implementation of the Sigmoid class
@Injectable()
export class LinearService {

    readonly upperLimit = 100;
    readonly lowerLimit = 0;  

    public evaluateLinear(x: number, model: StandardLinearModel | InvertedLinearModel){
        if(x<=model.offset[0]){
            return model.limitsInverted ? this.upperLimit : this.lowerLimit;
          }
          if(x>=model.offset[model.offset.length-1]){
            return model.limitsInverted ? this.lowerLimit : this.upperLimit;
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