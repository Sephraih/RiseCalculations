import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { SigmoidService } from '../services/sigmoid.service';
import { ExponentialApproachService } from '../services/exponentialApproach.service';
import { Lineary } from '../calculations/Lineary';
import { LinearFunctionModel } from '../models/function.models';
import { LinearService } from '../services/linear.service';


/* Url: localhost:4200/charts */

@Component({
  selector: 'app-charts',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

    title = 'Function Chart';

    data: any;

    svg: any;
    margin = {top: 20, right: 80, bottom: 30, left: 50};
    g: any;
    width: number;
    height: number;
    x;
    y;
    z;
    line;
    ltest=new Lineary([0,1,0,100,1,0],0,100);

	// empty array, built on init
    datascource = [];

	private _numberOfVerticalGridlines: number = 10;
	private _numberOfHorizontalGridlines: number = 10;

    constructor(private sigmoidService: SigmoidService,
                private exponentialApproeachService:ExponentialApproachService,
                private linearService: LinearService) {}

    ngOnInit() {
        

        // testing environment, predefined calls to draw some functions
        //load sigmoids sigmoids with scale 1,2 and 3
        for(let j=1; j <= 3; j+=1){
            this.addSigmoid(j);
        }
        /*
        
        this.addSigmoid(0.5)
        
        this.addSigmoid(0.7);
        

        //load exp approach with base 7
        this.addExpApp(7);

        //load GreenhouseGasBilance example; see appold.ts for reference, this is the forumua from the excel sheet
        this.addGreenhouse();
        //simulate the GreenhouseGasBilance example with the Lineary function,using the example's parameters to build it
        //both functions return the exact same graph, graph is the same as in the excel sheet as well, they are hardcoded examples
        this.addGreenhouseLineary();
        */
        this.linearServiceTest();

        
        this.data = this.datascource.map((v) => v.values.map((v) => v.xValue ))[0];
        //.reduce((a, b) => a.concat(b), []);

        this.initChart();
        this.drawAxis();
        this.drawPath();
    }

    private initChart(): void {
        this.svg = d3.select('svg');

        this.width = this.svg.attr('width') - this.margin.left - this.margin.right;
        this.height = this.svg.attr('height') - this.margin.top - this.margin.bottom;

        this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        this.x = d3Scale.scaleLinear().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        this.z = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

        this.line = d3Shape.line()
            .curve(d3Shape.curveBasis)
            .x( (d: any) => this.x(d.xValue) )
            .y( (d: any) => this.y(d.yValue) );

        this.x.domain(d3Array.extent(this.data, (d: any) => d ));

        this.y.domain([
            d3Array.min(this.datascource, function(c) { return d3Array.min(c.values, function(d) { return d.yValue; }); }),
            d3Array.max(this.datascource, function(c) { return d3Array.max(c.values, function(d) { return d.yValue; }); })
        ]);

		this.z.domain(this.datascource.map(function(c) { return c.id; }));

    }

    private drawAxis(): void {

        this.g.append('g')
            .attr('class', 'axis axis--x')
			.attr('transform', 'translate(0,' + this.height + ')')
			// Horizontal gridlines are added by '.ticks(10).tickSize(-this.height)'
            .call(d3Axis.axisBottom(this.x).ticks(this._numberOfVerticalGridlines).tickSize(-this.height))
            .append('text')
            .attr('transform', 'rotate(0)')
            .attr('y', 15)
            .attr('x', 853)
            .attr('dy', '0.71em')
            .attr('fill', '#000')
            .text('Output Value');


        this.g.append('g')
			.attr('class', 'axis axis--y')
			// Vertical gridlines are added by '.ticks(10).tickSize(-this.width)'
            .call(d3Axis.axisLeft(this.y).ticks(this._numberOfHorizontalGridlines).tickSize(-this.width))
            .append('text')
            .attr('transform', 'rotate(0)')
            .attr('y', -20)
            .attr('x', 20)
            .attr('dy', '0.71em')
            .attr('fill', '#000')
            .text('Input Value');
    }

    private drawPath(): void {
        let functionType = this.g.selectAll('.x')
            .data(this.datascource)
            .enter().append('g')
            .attr('class', 'x');

        functionType.append('path')
            .attr('class', 'line')
            .attr('d', (d) => this.line(d.values) )
            .style('stroke', (d) => this.z(d.id) );
        let i=0;
        functionType.append('text')
            .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 4]};}) //6th data entry, last element is always (100,100)
            .attr('transform', (d) => 'translate(' + this.x(d.value.xValue) + ',' + this.y(d.value.yValue) + ')' )
            .attr('dy', '0.35em')
            .attr('y',-10)
            .style('font', '10px sans-serif')
            .text(function(d) { return d.id; });
            

    }

    //pushes an entry to the dataset for each x : 0 <= x <= 100 ; x%10 =0,  j = scale, y = Sigmoid(x,j).
    addSigmoid(j:number):void{
        let inner= [];
            for(let i=0; i <= 100; i+=10){
                inner.push({'xValue': i, 'yValue': this.sigmoidService.evaluate(i,j)});
            }   
            this.datascource.push(
                {   'id': 'Sig('+j+')',
                    'values':inner
                });
    }
    
    //pushes an entry to the dataset for each x : 0 <= x <= 100 ; x%10 =0,  j = base, y = expApproach(x,j).
    addExpApp(j:number):void{
        let inner= [];
            for(let i=0; i <= 100; i+=10){
                inner.push({'xValue': i, 'yValue': this.exponentialApproeachService.evaluate(i,j)});
            }   
            this.datascource.push(
                {   'id': 'exp('+j+')',
                    'values':inner
                });
    }


    //loads the specific greenhouse example
    addGreenhouse():void{
        let inner= [];
            for(let i=0; i <= 100; i+=10){
                inner.push({'xValue': i, 'yValue': this.greenHouseGasBalance(i)});
            }   
            this.datascource.push(
                {   'id': 'GH',
                    'values':inner
                });
    }

    //this is a specific example for the proof of concept, hence hardcoded, 
    //may be deleted along with "addGreenhouse" function and their method calls when no longer required.
    greenHouseGasBalance(x:number):number{
        x= x*60; //original input values ranged from 1100 to 5000, this generates a plot from 0 to 6000 
        x = x/100; //all return value calculations were simplied by /100 too (see appold.ts for reference)
        if (x < 11) { // a=0, b=100 // 
            return 100;
        }
        if(x < 20){ 
            return -3.5555*x + 139.111; //all calculations simplified ; a =-3.555 , b = 139.111
        }
        if(x < 25){
            return -3.6* x + 140;
        }
        if(x < 50){
            return -2 * x + 100;
        }
        return 0; //values from 50 give zero points
    }

    /*linearServiceTest(){
        let linearModel = new LinearFunctionModel([0,50,100],[1,1,1],[0,0,0]);
        let inner=[];
        for(let i=0; i <= 100; i+=10){
            inner.push({'xValue': i, 'yValue': this.linearService.evaluateLinear(i, linearModel)});
        }   
        this.datascource.push(
            {   'id': 'linearService',
                'values':inner
            });
    }*/

    linearServiceTest(){
        let linearModel = new LinearFunctionModel([0,11,20,25,50,100],[0,0,-3.555,-3.6,-2,0],[100,100,139.111,140,100,0]);
        let inner=[];
        for(let i=0; i <= 100; i+=10){
            inner.push({'xValue': i, 'yValue': this.linearService.evaluateLinear(i*0.6, linearModel)});
            console.log('x: '+i + 'y: '+ this.linearService.evaluateLinear(i*0.6, linearModel));
        }   
        this.datascource.push(
            {   'id': 'greenhouseService',
                'values':inner
            });
    }

    //hardcoded linear function, could work with parameters generated from xml
    addGreenhouseLineary():void{
        //created with the greenhouse offset's, a's n b's
        //the cration array of lineary defined as follows: ordered offset1,a1,b1, ..., offsetn,an,bn
        //Lineary checks for each offset whether x is smalle than the offset and returns ax + b if true 
        let l = new Lineary([0,0,100,11,0,100,20,-3.555,139.111,25,-3.6,140,50,-2,100,100,0,0],0,100);
        let inner= [];
        for(let i=0; i <= 100; i+=10){
            inner.push({'xValue': i, 'yValue': l.evaluate(i*0.6)});
        }   
        this.datascource.push(
            {   'id': 'lin',
                'values':inner
            });
    }

}
