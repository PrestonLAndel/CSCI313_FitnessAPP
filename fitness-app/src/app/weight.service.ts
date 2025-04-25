import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  private weights: number[] = [];
  private numberOfWeights: number[] = [];

  addWeight(num: number){
    this.weights.push(num);
  }

  getWeights(): number[]{
    return this.weights;
  }

  addNumberOfWeights(){
    let currentNumber = this.numberOfWeights.length;
    this.numberOfWeights.push(currentNumber+1);
  }

  getNumberOfWeights(): number[]{
    return this.numberOfWeights;
  }

  numToString(num: number[]): string[]{
    let newNum: string[] = [];
    for(let i = 0; i < num.length; i++){
      newNum[i] = num[i].toString();
    }
    return newNum;
  }
}
