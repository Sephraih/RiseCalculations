

// TODO: other function models
	export class StandardLinearModel {
		
		offset: number[];
		a: number[];
		b: number[];
		limitsInverted: boolean;
		
		constructor(offset:number[], a:number[], b:number[]){
			this.offset = offset;
			this.a = a;
			this.b = b;
			this.limitsInverted = false;
		}
	}


	export class InvertedLinearModel {		
		offset: number[];
		a: number[];
		b: number[];
		limitsInverted: boolean;
		
		constructor(offset:number[], a:number[], b:number[]){
			this.offset = offset;
			this.a = a;
			this.b = b;
			this.limitsInverted = true;
		}
	}



