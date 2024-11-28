import * as triml from "./TrimlNode";

export class TrimlJsonNode implements TrimlJsonNode {
    nodeType?: string;
    properties?: TrimlJsonProperty[] = [];
    nodes?: TrimlJsonNode[] = [];
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

    if (trimlNode instanceof triml.Model) { jsonNode.nodeType = "model"; }
    else if (trimlNode instanceof triml.Input) { jsonNode.nodeType = "input"; }
    else if (trimlNode instanceof triml.Option) { jsonNode.nodeType = "option"; }
    else if (trimlNode instanceof triml.Graphic) { jsonNode.nodeType = "graphic"; }
    else if (trimlNode instanceof triml.Data) { jsonNode.nodeType = "data"; }
    else { jsonNode.nodeType = "node"; }

    if (trimlNode.type) jsonNode.properties?.push(new TrimlJsonProperty("type", trimlNode.type));
    if (trimlNode.name) jsonNode.properties?.push(new TrimlJsonProperty("name", trimlNode.name));
    if (trimlNode.condition) jsonNode.properties?.push(new TrimlJsonProperty("condition", trimlNode.condition));
    if (trimlNode.source) jsonNode.properties?.push(new TrimlJsonProperty("source", trimlNode.source));
    if (trimlNode.format) jsonNode.properties?.push(new TrimlJsonProperty("format", trimlNode.format));
    if (trimlNode.value) jsonNode.properties?.push(new TrimlJsonProperty("value", trimlNode.value));

    if (trimlNode instanceof triml.Graphic) {
        if (trimlNode.style) jsonNode.properties?.push(new TrimlJsonProperty("style", trimlNode.style));
    }

    trimlNode.nodes.forEach((childNode) => {
        const jsonChild = childNode.toJsonNode();
        if (jsonChild) {
            jsonNode.nodes?.push(jsonChild);
        }
    });

    return jsonNode;
}

export function trimlFromJsonNode(jsonNode: TrimlJsonNode, parentNode: triml.TrimlNode | null): triml.TrimlNode {
    let trimlNode: triml.TrimlNode;

    // if (!parentNode) { parentNode = null; }

    // console.log(cJsonNode, ", parent: ", parentNode);

    switch (jsonNode.nodeType) {
        case "model":
            trimlNode = new triml.Model(parentNode);
            break;
        case "input":
            trimlNode = new triml.Input(parentNode);
            break;
        case "option":
            trimlNode = new triml.Option(parentNode);
            break;
        case "graphic":
            trimlNode = new triml.Graphic(parentNode);
            break;
        case "data":
            trimlNode = new triml.Data(parentNode);
            break;
        default:
            trimlNode = new triml.Node(parentNode);
            break;
    }

    //console.log("type: " + jsonNode.nodeType + ", result: " + trimlNode);

    jsonNode.properties?.forEach((jsonProp) => {
        if (jsonProp.name) {
            Reflect.set(trimlNode, jsonProp.name, jsonProp.value)
        }
    });

    jsonNode.nodes?.forEach((jsonChild) => {
        const trimlChild = trimlFromJsonNode(jsonChild, trimlNode);
        if (trimlChild) {
            trimlNode.nodes.push(trimlChild);
        }
    });

    return trimlNode;
}