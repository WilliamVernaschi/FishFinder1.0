import Denque from "denque"

export class MovingAverage{
    private interval : number;
    private values : Denque<number>;
    private sum : number;

    constructor(interval : number){
        this.interval = interval;
        this.values = new Denque();
        this.sum = 0;
    }

    add(value : number){
        this.values.push(value);
        this.sum += value;
        if(this.values.length > this.interval){
            this.sum -= this.values.shift()!;
        }
    }

    getAverage(){
        return this.sum / this.values.length;
    }
}