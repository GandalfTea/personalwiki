
interface IQueue<T> {
	enqueue(item: T): void;
	dequeue(): T | undefined;
	size(): number;
}

class Queue<T> implements IQueue<T> {
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

export default Queue;
