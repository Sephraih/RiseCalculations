import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {

	// scripted version of the excel example, for reference.

// the complex formula from the sheet in code (see bottom of file) simplified.
function greenHouseGasBilance(x:number):number{
  x = x/100
  if (x < 11) { // a=0, b=100
      return 100;
  }
  if(x < 20){ 
      return 100-(32/9)*(x-11); //  - 3.5555x + 139.111 ; a =-3.555 , b = 139.111
  }
  if(x < 25){
      return 68-(18/5)*(x-20); // -3.6x + 140
  }
  if(x < 50){
      return 50-(50/25)*(x-25); // -2x + 100
  }
  return 0;
}

//Energy Management
//questionary
const monitoredEnergy = "Yes";
let renEnergused = "Partly";
let activeManagement ="No";
//questionary -> ref data
let potEnergyPoints = 165;
let realEnergyPoints =3500;
let enSavPot = realEnergyPoints/potEnergyPoints;

function ynp(a:String):number{
  if(a==="No"|| a==="No"){return 0;}
  if(a==="Yes"|| a==="Yes"){return 100;}
  return 50;
}
let generalAspectPoints = (ynp(monitoredEnergy) + ynp(renEnergused))/2;
let energySavingPotPoints = ((enSavPot + ynp(activeManagement))/2);
//result energy management
let energyManagement = 0.4*generalAspectPoints + 0.6*energySavingPotPoints;
console.log(energyManagement);



//energy efficiency
let energyConsumption =173554;
let renewableEnergyConsumption=11290.6;
let renewablePercent = 100/energyConsumption*renewableEnergyConsumption;

function energyConsumptionScore(ec:number,rp:number):number{
  let a =1.25 +(rp/1000)**0.5;
  let b =1.1;
  let c= 400;
  let d=0.83;
  let r = 1400+rp**1.6;
  return 100-(100/(1+Math.exp((a)-(ec**d-b*r)/c)));
}
//result energy intensity
let energyIntensity =energyConsumptionScore(energyConsumption,renewablePercent);
console.log(energyIntensity);


//green house balance
//livestock
let crops =0; //deci tons from datasheet
let feedstuff = 698.8; //deci tons from ds
let dryMatter =69.68; //tons from ds
let methaneEmissionRuminants =0;
if(dryMatter!=0){ methaneEmissionRuminants= (5.93+0.92*dryMatter*1000/365)*28/50.01*365;}
console.log(methaneEmissionRuminants);
let methaneEmissionNonRuminants = 197.5;
let meanAnnualTemperature =10;
let methaneEmissionSlurry =1056.8;
let GHGfromliveStock =methaneEmissionRuminants + methaneEmissionSlurry + methaneEmissionNonRuminants;
//fuel n fertilizer
let co2EmissionFarmEnergy = 5579.0; //kg from ds
let co2EmissionImpExpMachineWork = -42.1; //kg from ds
let nitrousSupplyAnimalHusb = 8284; //quest
let nitrousSupplyFertilizers = 0; //quest
let nitrousSupplyLegumes = 9066.9; //quest
let nitrousSupplyAir = 5000; //quest
let totalNitrousSupply = nitrousSupplyAir + nitrousSupplyAnimalHusb + nitrousSupplyFertilizers + nitrousSupplyLegumes;
let noxNitroPerc = 1;
let noxCO2Conv = 298;
let n2ONton2OConv = 1.57;
let NitrousOxideEmission = totalNitrousSupply/100*noxNitroPerc*noxCO2Conv*n2ONton2OConv;
console.log(NitrousOxideEmission);
let GHGFuelFertilizer = NitrousOxideEmission +co2EmissionImpExpMachineWork + co2EmissionFarmEnergy;
//harvest Residues
let burnedHvRes = 214.1; //dt from ds
let co2emArable = 14084.3; //dt ds
let co2emPermGrassLand = 4280; //dt ds
let GHGEmissionBurnHvRes = co2emArable + co2emPermGrassLand;
//Cultivation Sequestration
let CSeqPotMeasures = -18500; //kg from ds
//Afforestation and Forest Clearing
let lostWoodedArea =2; //ha quest
let vegetationZone ="Temperate Oceanic"; //quest
let gainedWoodedArea =2; //quest
let analysisYear = 2016; //quest
let AfforestationYear = 1990; //quest
let yearsSinceAfforestation = analysisYear - AfforestationYear;
let vZoneAffYears =100; // data depending on zone TODO switch
let vZoneForestEm = 336; // also
let vegetZonePropAfforest = yearsSinceAfforestation/vZoneAffYears;
let GHGBalanceAfforestation = (lostWoodedArea*vZoneForestEm-gainedWoodedArea*vZoneForestEm*vegetZonePropAfforest)*1000;
//Rice Production (unanswered questions)
let GHGEmissionsRice =0;
//total greenhouse gas emissions
let GHGFarmTotal =  GHGFuelFertilizer + GHGEmissionBurnHvRes + CSeqPotMeasures + GHGfromliveStock + GHGBalanceAfforestation + GHGEmissionsRice;
console.log(GHGFarmTotal);
//reference area
let infrArea = 1; //ha questionary
let waterArea =5; //ha q
let woodArea =0; //ha q
let agrictArea = 33.1; //ha q
let farmArea = infrArea + waterArea + woodArea + agrictArea;
let GHGEmissionArea = GHGFarmTotal / farmArea;
//endresult of ghg
let GreenHouseGasBalance = ghgBilance(GHGEmissionArea);

function ghgBilance(ghgea:number):number{
  if (ghgea < 1100) {
      return 100;
  }
  if(ghgea < 2000){
      return 100-(32/900)*(ghgea-1100);
  }
  if(ghgea < 2500){
      return 68-(18/500)*(ghgea-2000);
  }
  if(ghgea < 5000){
      return 50-(50/2500)*(ghgea-2500);
  }
  return 0;
}

//total score
let totalScore = (energyManagement + GreenHouseGasBalance + energyIntensity)/3;
console.log(Math.round(totalScore));

  }

}
