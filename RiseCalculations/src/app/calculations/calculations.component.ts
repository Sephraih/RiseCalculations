	import { Component, OnInit } from '@angular/core';
	import { ParserService } from '../services/parser.service';
	import { LinearyFunction, SigmoidFunction } from '../models/calculation-units.models';
	import { FunctionType } from '../models/function-types.model';
	import { SigmoidService } from '../services/sigmoid.service';



	/* Url: localhost:4200/xml */

	@Component({
	selector: 'app-calculations',
	templateUrl: './calculations.component.html',
	styleUrls: ['./calculations.component.css']
	})
	export class CalculationsComponent implements OnInit {


	title = 'RiseCalc';

	// File must be stored in folder 'assets/docs'
	fileName = 'functions.xml'

	// Will contain the functions extracted from xml
	calculationUnits: any[] = []

	constructor(private parserService: ParserService,
				private sigmoidService: SigmoidService){ }

	ngOnInit() {

		this.getJsonFromXml(this.fileName, (json: string)=>{

			var functionObjectArray = this.parserService.convertToObjects(json);
						
			console.log(functionObjectArray);

		})
	}


	private getJsonFromXml(fileName: string, onSuccess:(json:string) => void) {

		this.parserService.getJsonFromXmlFile(fileName).subscribe((json: any) => {
			console.log(json);
			onSuccess(json);
		});
	}







	isLineary(functionType: any){
		return functionType.constructor.name === FunctionType.Lineary;
	}

	isSigmoid(functionType: any){
		console.log(functionType);
		return functionType.constructor.name === FunctionType.Sigmoid;
	}
}

