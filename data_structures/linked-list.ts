interface LinkedListNode {
    value: number;
    next: LinkedListNode | null;
}

class LLNode implements LinkedListNode {

    private readonly _value: number
    private _next: LinkedListNode | null = null;

    constructor(value: number) {
        this._value = value;
    }

    public get value() {
        return this._value;
    }

    public get next() {
        return this._next;
    }

    public set next(node: LinkedListNode | null) {
        this._next = node
    }

}

class MyLinkedList {


    private headNode: LinkedListNode | null

    constructor() {
        this.headNode = null;
    }

    private getNodeByIndex(index: number): LinkedListNode {
        let node: LinkedListNode | null = this.headNode;
        if (!node) {
            throw Error('Node hasn\'t been found')
        }

        for (let i = 0; i < index; i++) {
            node = node.next
            if (node === null) {
                throw Error('Node hasn\'t been found')
            }

        }
        return node
    }

    get(index: number): number {
        try {
            const node = this.getNodeByIndex(index);
            return node.value;
        } catch (e) {
            return -1;
        }
    }

    addAtHead(val: number): void {
        const node = new LLNode(val);
        if (!this.headNode) {
            this.headNode = node
            return;
        }
        node.next = this.headNode;
        this.headNode = node
    }

    addAtTail(val: number): void {
        const node = new LLNode(val);
        if (!this.headNode) {
            this.headNode = node
            return;
        }
        let currentNode = this.headNode;
        while (currentNode.next) {
            currentNode = currentNode.next;
        }
        currentNode.next = node;
    }

    addAtIndex(index: number, val: number): void {
        const newNode = new LLNode(val);
        if (index === 0) {
            this.addAtHead(val);
            return;
        }
        try {
            const prevNode = this.getNodeByIndex(index - 1);
            newNode.next = prevNode.next;
            prevNode.next = newNode;
        } catch (e) {
            return;
        }
    }

    deleteAtIndex(index: number): void {
        if (!this.headNode) {
            return;
        }
        if (index === 0) {
            this.headNode = this.headNode.next;
        }
        try {
            const prevNode = this.getNodeByIndex(index - 1);
            const nodeToDelete = prevNode.next;
            if (!nodeToDelete) {
                return;
            }
            prevNode.next = nodeToDelete.next;
        } catch (e) {
            return;
        }
    }
}
