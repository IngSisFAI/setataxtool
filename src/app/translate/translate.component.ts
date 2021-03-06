import { Component, OnInit, ViewChild } from '@angular/core';
import { StrategyCNFComponent } from './strategy-cnf/strategy-cnf.component';
import { Datasheet } from '../clases/Datasheet';
import { StrategyUsComponent } from './strategy-us/strategy-us.component';
import { StrategySOLVERComponent } from './strategy-solver/strategy-solver.component';
import {ScenarioProvider} from "../provider/scenario";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  salida: string = "";
  resultados: string = "";
  preResultados: string = "";
  structureUnderlying:Datasheet= null;
  private datasheet ="";
  @ViewChild(StrategySOLVERComponent) StrategySOLVER: StrategySOLVERComponent;
  private index: number;


  constructor(private strategyCnf: StrategyCNFComponent,
              private strategyUsComponent:StrategyUsComponent,
              private strategySOLVER:StrategySOLVERComponent,
              public scenario:ScenarioProvider,
              private activatedRoute: ActivatedRoute

  ) {

  }

  ngOnInit() {

    this.activatedRoute
      .params
      .map(params => params['id'])
      .subscribe(id => {
            this.index = id;
            this.activatedRoute
              .params
              .map(params => params['id1'])
              .subscribe(id1 => {
                this.scenario.getDatasheet(this.index,id1).subscribe(data =>
                {console.log("aaaaaaaa", data);
                  this.datasheet = data;
                });

              });



        });


  }



  public generarEstructura(json){
    this.structureUnderlying= this.strategyUsComponent.generarEstructura(json);
  }
  public analyse_False_Optional_bt(){
    console.log("INIT FALSE OPTIONAL BT");
    console.log(this.salida);


    this.resultados= this.strategySOLVER.analyse_false_optional(this.salida,this.structureUnderlying);
  }
  public load_cnf(){

    this.salida =  this.preResultados;

  }
// scope scenarios
  public mandatory_specific_bt(){
    this.resultados ="";
    this.resultados = this.strategySOLVER.analyse_mandatory_specific(this.structureUnderlying);
  }


// fin scope scenarios

  public analyse_self_dependency_bt(){
    this.resultados = this.strategySOLVER.analyse_self_dependency(this.structureUnderlying);
  }
  public constraint_contradition_bt(){
    this.resultados ="";
    this.resultados = this.strategySOLVER.analyse_constraint_contradition(this.structureUnderlying);
  }
  public alternative_inclusion_bt(){
    this.resultados ="";
    this.resultados = this.strategySOLVER.analyse_alternative_inclusion(this.structureUnderlying);
  }
  public parent_exclusion_bt(){
    this.resultados ="";
    this.resultados = this.strategySOLVER.analyse_parent_exclusion(this.structureUnderlying);
  }
  public mandatory_exclusion_bt(){
    this.resultados ="";
    this.resultados = this.strategySOLVER.analyse_mandatory_exclusion(this.structureUnderlying);
  }
  public mandatory_inclusion_bt(){
    this.resultados ="";
    this.resultados = this.strategySOLVER.analyse_mandatory_inclusion(this.structureUnderlying);
  }
  transitive_inconsistency_bt(){
    this.resultados ="";
    this.resultados = this.strategySOLVER.analyse_transitive_inconsistency(this.structureUnderlying);
  }
  transitive_redundancy_bt(){
    this.resultados ="";
    this.resultados = this.strategySOLVER.analyse_transitive_redundancy(this.structureUnderlying);
  }
  public parent_inclusion_bt(){
    this.resultados ="";
    this.resultados = this.strategySOLVER.analyse_parent_inclusion(this.structureUnderlying);
  }
 public run_sat_solver(cnf){
    this.salida = cnf;

  }

  traducirJson(json){
    this.strategyCnf.traducirJson(json);
    this.salida ="";
    this.salida=this.strategyCnf.confeccionarStringFinal();
  }
  public getStructureUnderlying(){
    return this.structureUnderlying;

}
public getCnfCorpus(){
    return this.salida;
}
public getCnfHead(){
    return this.salida;
  }
  public getCnf(){
    return this.salida;
  }

}


