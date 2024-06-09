import Denque from 'denque'

interface Item<T>{
  value : T
  time : number
}
export class MinQueue<element>{

  private l : number
  private r : number
  public deque : Denque<Item<element>>



  constructor(){
    this.l = 1
    this.r = 1
    this.deque = new Denque();
  }
  push(value : element){
    // @ts-ignore
    while(!this.deque.isEmpty() && value > this.deque.peekBack().value){
      this.deque.pop()
    }

    this.deque.push({value : value, time : this.r})
    this.r++
  }

  pop() : void {
    // @ts-ignore
    if (!this.deque.isEmpty() && this.l == this.deque.peekFront().time) {
      this.deque.shift()
    }

    this.l++

  }

  get getMin() : element | undefined{
    return this.deque.peekFront()?.value
  }

  get size() : number {
    return this.deque.size();
  }
}
