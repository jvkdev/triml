import { TrimlNode } from "./TrimlNode";

export class TrimlJsonNode implements TrimlJsonNode {
    nodeType?: string;
    properties?: TrimlJsonProperty[] = [];
    childNodes?: TrimlJsonNode[] = [];
}
export class TrimlJsonProperty implements TrimlJsonProperty {
    name?: string;
    value?: string;

    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }
}
export function trimlToJsonNode(trimlNode: TrimlNode) {
    const jsonNode = new TrimlJsonNode();

    if (trimlNode.name) jsonNode.properties?.push(new TrimlJsonProperty("name", trimlNode.name));
    if (trimlNode.label) jsonNode.properties?.push(new TrimlJsonProperty("label", trimlNode.label));

    trimlNode.childNodes.forEach((childNode) => {
        const jsonChild = childNode.toJsonNode();
        console.log("jsonChild: ", jsonChild);
        if (jsonChild) {
            jsonNode.childNodes?.push(jsonChild);
        }
    });

    return jsonNode;
}