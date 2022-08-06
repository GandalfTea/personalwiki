

// QUEUE

export interface IQueue<T> {
	enqueue(item: T): void;
	dequeue(): T | undefined;
	size(): number;
}

export class Queue<T> implements IQueue<T> {
	private storage: T[] = [];

	constructor( private capacity: number = Infinity) {}

	enqueue(item: T): void {
		if( this.size() === this.capacity) {
			throw Error("Queue has reached maximum capacity.");
		}
		this.storage.push(item);
	}

	dequeue(): T | undefined {
		return this.storage.shift();
	}

	size(): number {
		return this.storage.length;
	}
}


// STACK
/* This also contains a method for removing the first element,
   to contain stack within the capacity and allow access to
   newest undo.                                             */

export interface IStack<T> {
	push(item: T): void;
	pop(): T | undefined;
	pop_last(): void;
	size(): number;
}

export class Stack<T> implements IStack<T> {
	private storage: T[] = [];

	constructor( private capacity: number = 100 ) {}

	push(item: T): void {
		if( this.size() === this.capacity) {
			this.pop_last();
		}
		this.storage.push(item);
	}

	pop(): T | undefined {
		return this.storage[this.size()-1];
	}

	size(): number {
		return this.storage.length;
	}

	pop_last(): void {
		this.storage.shift();
	}
}

