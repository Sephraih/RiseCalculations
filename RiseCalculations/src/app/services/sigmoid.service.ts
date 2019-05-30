
import { Injectable } from '@angular/core';

//service-implementation of the Sigmoid class
@Injectable()
export class SigmoidService {


    // Chosen sigmoid function : tanh(x) ; Hyperbolic tangent function 
    // Output range normed to [0-100]
    // Function input should be normed: normalise values using normalisation
    public evaluateSigmoid(x:number,s:number):number{
        /*
        //boundary value returns; may be checked for each call.
        //with n calls including one max and one min call, it may be more efficient 
        //to run 2 more calculations instead of checking 2(n-2)+3 if statements
        if(x==100){return 100;}
        if(x==0){return 0;}
        */

        //could throw exception / abbort calculation /could be left out if only called with normalised values.
        if(x<0 || x>100){console.error("please use normalisation service on x before evaluating it.");}
        
        // normalise so that the input range is double the scale, centered around zero
        x = x/(100/(2*s))-s;
        // get result of the chosen sigmoid function
        x = Math.tanh(x);
        // normalise boundaries to 1; the tanh of the maximal input(=scale) returns a value less than 1, 
        // normalisation factor applied to all output values, so they range from -1 to 1 
        x = x* (1/Math.tanh(s));
        // the result between -1 and 1 is to be normalised to range between 0 and 100, rounded and returned.
        return  Math.round((x+1)*50); 
    }

    
}