import { TrimlJsonNode, TrimlJsonProperty, trimlToJsonNode } from "./TrimlJson";


export class TrimlNode {
    instanceId: string = crypto.randomUUID();
    parentNode: TrimlNode | null;
    childNodes: TrimlNode[] = [];

    name?: string;
    label?: string;

    constructor(parentNode: TrimlNode | null) {
        this.parentNode = parentNode;
    }

    public addChild(child: TrimlNode) {
        this.childNodes.push(child);
        child.parentNode = this;
    }

    public removeFromParent() {
        if (this.parentNode) {
            const index = this.parentNode?.childNodes.indexOf(this) ?? -1;
            if (index > 0) {
                this.parentNode?.childNodes.splice(index, 1);
            }
        }
    }

    public putBeforeOnParent(node: TrimlNode) {
        if (this.parentNode && node.hasSameParent(this) && this.isAddedToParent()) {
            node.removeFromParent();
            this.parentNode?.childNodes.splice(this.parentNode.childNodes.indexOf(this), 0, node);
        }
    }

    public isAddedToParent(): boolean {
        if (this.parentNode?.childNodes.includes(this)) {
            return true;
        } else {
            return false;
        }
    }

    public hasSameParent(node: TrimlNode): boolean {
        if (node.parentNode === this.parentNode) {
            return true;
        } else {
            return false;
        }
    }

    public isDescendentOf(node: TrimlNode, visited: Set<TrimlNode> = new Set<TrimlNode>()): boolean {
        if (visited.has(node)) { return false; }
        visited.add(node);

        if (node?.childNodes.includes(this)) { return true; }
        else {
            node?.childNodes.forEach((child) => {
                if (node.isDescendentOf(child, visited)) { return true; }
            });
        }
        return false;
    }

    toJsonNode(): TrimlJsonNode {
        return trimlToJsonNode(this);
    }
}



export class Model extends TrimlNode {
    // public addSelect(name: string, options?: string[]) {
    //     this.childNodes.push(new Select(this, name, options));
    // }    

    toJsonNode(): TrimlJsonNode {
        const jsonNode = trimlToJsonNode(this);
        jsonNode.nodeType = "model";

        return jsonNode;
    }
}

export class Input extends TrimlNode {
    defaultOption?: string;

    constructor(parentNode: TrimlNode | null, name?: string, options?: string[]) {
        super(parentNode);
        this.name = name;
        options?.forEach((optionValue) => {
            this.childNodes.push(new Option(this, optionValue));
        });
    }

    toJsonNode(): TrimlJsonNode {
        const jsonNode = trimlToJsonNode(this);
        jsonNode.nodeType = "input";

        return jsonNode;
    }
}

export class Option extends TrimlNode {
    value?: string;

    constructor(parentNode: TrimlNode | null, value?: string) {
        super(parentNode);
        this.value = value;
    }

    toJsonNode(): TrimlJsonNode {
        const jsonNode = trimlToJsonNode(this);
        jsonNode.nodeType = "option";

        if (this.value) jsonNode.properties?.push(new TrimlJsonProperty("value", this.value));

        return jsonNode;
    }
}

export class Scope extends TrimlNode {
    toJsonNode(): TrimlJsonNode {
        const jsonNode = trimlToJsonNode(this);
        jsonNode.nodeType = "scope";

        return jsonNode;
    }
}

export class Shape extends TrimlNode {
    name?: string;
    type?: string;
    label?: string;
    source?: string;
    data?: string;

    toJsonNode(): TrimlJsonNode {
        const jsonNode = trimlToJsonNode(this);
        jsonNode.nodeType = "shape";

        if (this.name) jsonNode.properties?.push(new TrimlJsonProperty("name", this.name));
        if (this.type) jsonNode.properties?.push(new TrimlJsonProperty("type", this.type));
        if (this.label) jsonNode.properties?.push(new TrimlJsonProperty("label", this.label));
        if (this.source) jsonNode.properties?.push(new TrimlJsonProperty("source", this.source));
        if (this.data) jsonNode.properties?.push(new TrimlJsonProperty("data", this.data));

        return jsonNode;
    }
}

export class Group extends TrimlNode {
    name?: string;
    condition?: string;

    toJsonNode(): TrimlJsonNode {
        const jsonNode = trimlToJsonNode(this);
        jsonNode.nodeType = "group";

        if (this.name) jsonNode.properties?.push(new TrimlJsonProperty("name", this.name));
        if (this.condition) jsonNode.properties?.push(new TrimlJsonProperty("condition", this.condition));

        return jsonNode;
    }
}
