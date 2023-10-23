import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent {
  operacaoAnterior:any = '';
  operacaoAtual:any = ''; 
  primeiraoperacao = true;

  adicionarAovisor(value:any){
   if(this.primeiraoperacao){
    if(+value >=0 || value === "."){
      this.adicionarDigito(value)  
    }else{
      this.processaOperacao(value)
    }
   }
   else{
    this.operacaoAnterior = "";
    this.operacaoAtual = "";
    this.primeiraoperacao = true;
    if (+value >= 0 || value === "."){
      this.adicionarDigito(value)
    }else{
      this.processaOperacao(value)
    }
   }

  }

  adicionarDigito(digito:any){
    if(digito === "." && this.operacaoAtual.includes(".")){
        return
    }
    this.operacaoAtual += digito;
    this.atualizarVisor(null,null,null,null)
  }

    processaOperacao(operacao:any){
      if(this.operacaoAtual === "" && operacao !== "C"){
        if(this.operacaoAnterior !== ""){
          this.alteraroperacao(operacao)
        }
        return
      }

      let valoroperacao:any;
      let anterior = +this.operacaoAnterior.split(" ")[0];
      let atual = +this.operacaoAtual;

      switch(operacao){
        case"+":
        valoroperacao = anterior + atual;
        this.atualizarVisor(valoroperacao,operacao,atual,anterior);
        break;  
        case"-":
        valoroperacao = anterior - atual;
        this.atualizarVisor(valoroperacao,operacao,atual,anterior);
        break;  
        case"*":
        valoroperacao = anterior * atual;
        this.atualizarVisor(valoroperacao,operacao,atual,anterior);
        break;  
        case"/":
        valoroperacao = anterior / atual;
        this.atualizarVisor(valoroperacao,operacao,atual,anterior);
        break;  
        case"DEl":
        this.processaOperacaoDel()
        break
        case"CE":
        this.processaOperacaoCE()
        break
        case"C":
        this.processaOperacaoC()
        break
        case"=":
        this.processaOperacaoIgual()
        break
      }
    }

    alteraroperacao(operacao:any){

      const operacoesMat = ["+","-","/","*"]
      if(operacao.includes(operacao)){
        return
      }
      this.operacaoAnterior = this.operacaoAnterior.trim().slice(0, -1) + operacao;

    }

    atualizarVisor(
      valoroperacao = null,
      operacao = null,
      atual:any,
      anterior:any
    ){
          
    if(valoroperacao !== null){
      if(anterior === 0){
        valoroperacao = atual;
      }
      this.operacaoAnterior = `${atual} ${operacao}`
        if(anterior > 0){
          this.operacaoAnterior =  `${anterior} ${operacao} ${atual}`
          this.operacaoAtual = valoroperacao;
        }else{
          this.operacaoAtual = "";

        }
     }  

      
    }

    processaOperacaoDel(){
      this.operacaoAtual = this.operacaoAtual.slice(0,-1);
    }
    processaOperacaoCE(){
      this.operacaoAtual = "";
      
    }
    processaOperacaoC(){
      this.operacaoAtual = "";
      this.operacaoAnterior = "";
    }
    processaOperacaoIgual(){
      let operacao = this.operacaoAnterior.split(" ")[1];
      this.primeiraoperacao = false;
      this.processaOperacao(operacao);
      
    }

}
