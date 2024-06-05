import Denque from 'denque'

interface Item{
  value : any
  time : number
}
export class MinQueue<element>{

  private l : number
  private r : number
  private deque : Denque<Item>



  constructor(){
    this.l = 1
    this.r = 1
    this.deque = new Denque();

  }
  push(value : any){
    // @ts-ignore
    while(!this.deque.isEmpty() && value < this.deque.peekBack().value){
      this.deque.pop()
    }

    this.deque.push({value, time : this.r})
    this.r++
  }

  pop() : void {
    // @ts-ignore
    if (!this.deque.isEmpty() && this.l < this.deque.peekFront().time) {
      this.deque.shift()
    }

    this.l++

  }

  get getMin() : element | null{
    return this.deque.peekFront()?.value
  }

  get size() : number {
    return this.deque.size();
  }
}
