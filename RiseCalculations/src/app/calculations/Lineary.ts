export class Lineary {
   

  intervals:number[];//offset,a,b
  fmin:number; //returnvalue if input below boundaries
  fmax:number; //returnvalue if input above boundaries
  a=[]; //array to contain all a's
  b=[]; //array to contain all b's
  offsets=[]; //array to contain all right offsets (x grows right)


  //the constructor array ivs requires a defined input as follows:  offset1 x1,coefficient1 a1, y-offset1 b1, ..., xn,an,bn
  //the offsets and their respective a and b values need to be ordered ascending.
  constructor(ivs:number[],fmin:number,fmax:number){
    this.intervals = ivs;
    this.fmin=fmin;
    this.fmax=fmax;
    this.buildArrays();
  }

  //splitts each intervall's x,a and b into an array, value at index i of the 3 arrays corresponds to one intervall for the same i
  buildArrays(){

   for(let i=0; i < this.intervals.length; i+=3){
      this.offsets.push(this.intervals[i]);
      //this.offsets[i/3] = this.intervals[i];
      this.a.push(this.intervals[i+1]);
      //this.a[i/3] = this.intervals[i+1];
      this.b.push(this.intervals[i+2]);
      //this.b[i/3] = this.intervals[i+2];
    }
  }

  /*currently works with all input values, they may, though, be normalised using the normaliser service,
  if this is decided to be used generally, the constructor does not require fmax and fmin as input and fields aren't required.  */
  evaluate(x:number):number{
    if(x<this.offsets[0]){
      return this.fmin;
    }
    if(x>this.offsets[this.offsets.length-1]){
      return this.fmax;
    }
    for(let i=0; i < this.offsets.length; i++) {
      if(x<this.offsets[i]){
        let ret = this.a[i] * x +this.b[i];
       // if(ret<this.fmin){return 0;}
        // if(ret>this.fmax){return 100;}
        return ret;
      }
    }
  }

}