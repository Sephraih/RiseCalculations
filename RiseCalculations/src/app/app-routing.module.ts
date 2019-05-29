import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { ParserOutputComponent } from './parser-output/parser-output.component';

// Base-Url: localhost:4200/
// to automatically add a new component, run: ng g c calculations/newcomponent
const routes: Routes = [
	{  
		path: 'xml',
		component: ParserOutputComponent
	},
	{  
		path: 'charts',
		component: ChartsComponent
	}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
