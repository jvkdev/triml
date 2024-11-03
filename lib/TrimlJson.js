"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrimlJsonProperty = exports.TrimlJsonNode = void 0;
exports.trimlToJsonNode = trimlToJsonNode;
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
    var _a, _b;
    const jsonNode = new TrimlJsonNode();
    if (trimlNode.name)
        (_a = jsonNode.properties) === null || _a === void 0 ? void 0 : _a.push(new TrimlJsonProperty("name", trimlNode.name));
    if (trimlNode.label)
        (_b = jsonNode.properties) === null || _b === void 0 ? void 0 : _b.push(new TrimlJsonProperty("label", trimlNode.label));
    trimlNode.childNodes.forEach((childNode) => {
        var _a;
        const jsonChild = childNode.toJsonNode();
        console.log("jsonChild: ", jsonChild);
        if (jsonChild) {
            (_a = jsonNode.childNodes) === null || _a === void 0 ? void 0 : _a.push(jsonChild);
        }
    });
    return jsonNode;
}
//# sourceMappingURL=TrimlJson.js.map