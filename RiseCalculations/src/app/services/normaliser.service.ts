import { Injectable } from '@angular/core';


@Injectable()
export class NormaliserService {


  //function to normaliSe boundaries and input to 100  
  public normalise(min:number,max:number,x:number):number{
    //If x is equal to or exceeding the boundaries, scaling and offset is irrelevant
    if (x<=min)return 0;
    if (x>=max)return 100;
    // x value in percent of the boundary width, adapted to the input range
    return (x-min)/((max-min)/100); 
  }



    
}