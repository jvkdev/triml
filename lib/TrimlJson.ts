import * as triml from "./TrimlNode";

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
export function trimlToJsonNode(trimlNode: triml.TrimlNode) {
    const jsonNode = new TrimlJsonNode();

    if (trimlNode.name) jsonNode.properties?.push(new TrimlJsonProperty("name", trimlNode.name));
    if (trimlNode.label) jsonNode.properties?.push(new TrimlJsonProperty("label", trimlNode.label));
    if (trimlNode.condition) jsonNode.properties?.push(new TrimlJsonProperty("condition", trimlNode.condition));
    if (trimlNode.source) jsonNode.properties?.push(new TrimlJsonProperty("source", trimlNode.source));

    trimlNode.childNodes.forEach((childNode) => {
        const jsonChild = childNode.toJsonNode();
        //console.log("trimlChild: ", jsonChild);
        if (jsonChild) {
            jsonNode.childNodes?.push(jsonChild);
        }
    });

    return jsonNode;
}

export function trimlFromJsonNode(jsonNode: TrimlJsonNode, parentNode: triml.TrimlNode | null): triml.TrimlNode {
    let trimlNode: triml.TrimlNode;

    // if (!parentNode) { parentNode = null; }

    // console.log(cJsonNode, ", parent: ", parentNode);

    switch (jsonNode.nodeType) {
        default:
        case "model":
            trimlNode = new triml.Model(parentNode);
            break;
        case "input":
            trimlNode = new triml.Input(parentNode);
            break;
        case "option":
            trimlNode = new triml.Option(parentNode);
            break;
        case "scope":
            trimlNode = new triml.Scope(parentNode);
            break;
        case "group":
            trimlNode = new triml.Group(parentNode);
            break;
        case "shape":
            trimlNode = new triml.Shape(parentNode);
            break;
    }

    //console.log("type: " + jsonNode.nodeType + ", result: " + trimlNode);

    jsonNode.properties?.forEach((jsonProp) => {
        if (jsonProp.name) {
            Reflect.set(trimlNode, jsonProp.name, jsonProp.value)
        }
    });

    jsonNode.childNodes?.forEach((jsonChild) => {
        const trimlChild = trimlFromJsonNode(jsonChild, trimlNode);
        if (trimlChild) {
            trimlNode.childNodes.push(trimlChild);
        }
    });

    return trimlNode;
}