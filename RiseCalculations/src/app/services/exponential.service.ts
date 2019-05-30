import { Injectable } from '@angular/core';


@Injectable()
export class ExponentialService {

   
  // the exponential approach builds a sigmoid function s(x) with the function f(x)=x^2: 
  // the result of the evaluation, s(x) = 50+f(x) if x>50, s(x) = 50-f(x) if x<50
  // takes a normalised x; see normaliser service. (x ranges from 0 to 100)
  // base: input will further be normalised to range between 0 and the maximal base; in other words: f(x) =base^2
    public evaluate(x:number,base:number):number{
      //boundary returns, these are optional.
      if(x==100){return 100;}
      if(x==0){return 0;}
      //decideable logic (see sigmoid.service class for elaboration)
      if(x<0 || x>100){console.log("please use normalisation service on x before evaluating it.");}
       

      //temporarily store input value as a
      let a:number = x;
      // with x values between 0 and 2, the curve barely develops. 
      // accepted input from 0 to 100 is scaled to the new range: 2 to base
      // scaling the input to the range : 100/(exp*2) = scale factor ; input x /scale factor - a = input range from -a to a
      x = Math.abs(x/(100/((base-2)*2))-(base-2))+2
      x = x**2;

      if(a<50){return Math.round(50-x);}
      if(a>50){return Math.round(50+x);}
      return 50;
    }



    
}