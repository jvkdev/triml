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
        this.childNodes = [];
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
    var _a, _b, _c, _d;
    const jsonNode = new TrimlJsonNode();
    if (trimlNode.name)
        (_a = jsonNode.properties) === null || _a === void 0 ? void 0 : _a.push(new TrimlJsonProperty("name", trimlNode.name));
    if (trimlNode.label)
        (_b = jsonNode.properties) === null || _b === void 0 ? void 0 : _b.push(new TrimlJsonProperty("label", trimlNode.label));
    if (trimlNode.condition)
        (_c = jsonNode.properties) === null || _c === void 0 ? void 0 : _c.push(new TrimlJsonProperty("condition", trimlNode.condition));
    if (trimlNode.source)
        (_d = jsonNode.properties) === null || _d === void 0 ? void 0 : _d.push(new TrimlJsonProperty("source", trimlNode.source));
    trimlNode.childNodes.forEach((childNode) => {
        var _a;
        const jsonChild = childNode.toJsonNode();
        //console.log("trimlChild: ", jsonChild);
        if (jsonChild) {
            (_a = jsonNode.childNodes) === null || _a === void 0 ? void 0 : _a.push(jsonChild);
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
    (_a = jsonNode.properties) === null || _a === void 0 ? void 0 : _a.forEach((jsonProp) => {
        if (jsonProp.name) {
            Reflect.set(trimlNode, jsonProp.name, jsonProp.value);
        }
    });
    (_b = jsonNode.childNodes) === null || _b === void 0 ? void 0 : _b.forEach((jsonChild) => {
        const trimlChild = trimlFromJsonNode(jsonChild, trimlNode);
        if (trimlChild) {
            trimlNode.childNodes.push(trimlChild);
        }
    });
    return trimlNode;
}
//# sourceMappingURL=TrimlJson.js.map