"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrimlJsonProperty = exports.TrimlJsonNode = void 0;
exports.trimlToJsonNode = trimlToJsonNode;
exports.trimlFromJsonNode = trimlFromJsonNode;
const triml = __importStar(require("./TrimlNode"));
class TrimlJsonNode {
    constructor() {
        this.properties = [];
        this.nodes = [];
    }
}
exports.TrimlJsonNode = TrimlJsonNode;
class TrimlJsonProperty {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
exports.TrimlJsonProperty = TrimlJsonProperty;
function trimlToJsonNode(trimlNode) {
    var _a, _b, _c, _d, _e, _f, _g;
    const jsonNode = new TrimlJsonNode();
    if (trimlNode instanceof triml.Model) {
        jsonNode.nodeType = "model";
    }
    else if (trimlNode instanceof triml.Input) {
        jsonNode.nodeType = "input";
    }
    else if (trimlNode instanceof triml.Option) {
        jsonNode.nodeType = "option";
    }
    else if (trimlNode instanceof triml.Graphic) {
        jsonNode.nodeType = "graphic";
    }
    else if (trimlNode instanceof triml.Data) {
        jsonNode.nodeType = "data";
    }
    else {
        jsonNode.nodeType = "node";
    }
    if (trimlNode.type)
        (_a = jsonNode.properties) === null || _a === void 0 ? void 0 : _a.push(new TrimlJsonProperty("type", trimlNode.type));
    if (trimlNode.name)
        (_b = jsonNode.properties) === null || _b === void 0 ? void 0 : _b.push(new TrimlJsonProperty("name", trimlNode.name));
    if (trimlNode.condition)
        (_c = jsonNode.properties) === null || _c === void 0 ? void 0 : _c.push(new TrimlJsonProperty("condition", trimlNode.condition));
    if (trimlNode.source)
        (_d = jsonNode.properties) === null || _d === void 0 ? void 0 : _d.push(new TrimlJsonProperty("source", trimlNode.source));
    if (trimlNode.format)
        (_e = jsonNode.properties) === null || _e === void 0 ? void 0 : _e.push(new TrimlJsonProperty("format", trimlNode.format));
    if (trimlNode.value)
        (_f = jsonNode.properties) === null || _f === void 0 ? void 0 : _f.push(new TrimlJsonProperty("value", trimlNode.value));
    if (trimlNode instanceof triml.Graphic) {
        if (trimlNode.style)
            (_g = jsonNode.properties) === null || _g === void 0 ? void 0 : _g.push(new TrimlJsonProperty("style", trimlNode.style));
    }
    trimlNode.nodes.forEach((childNode) => {
        var _a;
        const jsonChild = childNode.toJsonNode();
        if (jsonChild) {
            (_a = jsonNode.nodes) === null || _a === void 0 ? void 0 : _a.push(jsonChild);
        }
    });
    return jsonNode;
}
function trimlFromJsonNode(jsonNode, parentNode) {
    var _a, _b;
    let trimlNode;
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
    (_a = jsonNode.properties) === null || _a === void 0 ? void 0 : _a.forEach((jsonProp) => {
        if (jsonProp.name) {
            Reflect.set(trimlNode, jsonProp.name, jsonProp.value);
        }
    });
    (_b = jsonNode.nodes) === null || _b === void 0 ? void 0 : _b.forEach((jsonChild) => {
        const trimlChild = trimlFromJsonNode(jsonChild, trimlNode);
        if (trimlChild) {
            trimlNode.nodes.push(trimlChild);
        }
    });
    return trimlNode;
}
//# sourceMappingURL=TrimlJson.js.map