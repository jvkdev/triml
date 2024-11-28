import { TrimlJsonNode, TrimlJsonProperty, trimlToJsonNode } from "./TrimlJson";


export class TrimlNode {
    instanceId: string = crypto.randomUUID();
    parent: TrimlNode | null;
    nodes: TrimlNode[] = [];

    type?: string | null;
    name?: string | null;
    condition?: string | null;
    source?: string | null;
    format?: string | null;
    value?: string | null;

    constructor(parentNode: TrimlNode | null) {
        this.parent = parentNode;
    }

    public add(node: TrimlNode) {
        this.nodes.push(node);
        node.parent = this;
    }

    public removeFromParent() {
        if (this.parent) {
            const index = this.parent?.nodes.indexOf(this) ?? -1;
            if (index > 0) {
                this.parent?.nodes.splice(index, 1);
            }
        }
    }

    public putBeforeOnParent(node: TrimlNode) {
        if (this.parent && node.hasSameParent(this) && this.isAddedToParent()) {
            node.removeFromParent();
            this.parent?.nodes.splice(this.parent.nodes.indexOf(this), 0, node);
        }
    }

    public isAddedToParent(): boolean {
        if (this.parent?.nodes.includes(this)) {
            return true;
        } else {
            return false;
        }
    }

    public hasSameParent(node: TrimlNode): boolean {
        if (node.parent === this.parent) {
            return true;
        } else {
            return false;
        }
    }

    public isDescendentOf(node: TrimlNode, visited: Set<TrimlNode> = new Set<TrimlNode>()): boolean {
        if (visited.has(node)) { return false; }
        visited.add(node);

        if (node?.nodes.includes(this)) { return true; }
        else {
            node?.nodes.forEach((node) => {
                if (node.isDescendentOf(node, visited)) { return true; }
            });
        }
        return false;
    }

    toJsonNode(): TrimlJsonNode {
        return trimlToJsonNode(this);
    }
}

export class Node extends TrimlNode {

}

export class Model extends TrimlNode {

}

export class Input extends TrimlNode {
    constructor(parentNode: TrimlNode | null, name?: string) {
        super(parentNode);
        this.name = name;
    }
}

export class Option extends TrimlNode {
    constructor(parentNode: TrimlNode | null, value?: string) {
        super(parentNode);
        this.value = value;
    }
}

export class Graphic extends TrimlNode {
    style?: string | null;
}

export class Data extends TrimlNode {

}
