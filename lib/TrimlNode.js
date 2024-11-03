"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = exports.Option = exports.Input = exports.Model = exports.TrimlNode = void 0;
const TrimlJson_1 = require("./TrimlJson");
class TrimlNode {
    constructor(parentNode) {
        this.instanceId = crypto.randomUUID();
        this.childNodes = [];
        this.parentNode = parentNode;
    }
    addChild(child) {
        this.childNodes.push(child);
        child.parentNode = this;
    }
    removeFromParent() {
        var _a, _b, _c;
        if (this.parentNode) {
            const index = (_b = (_a = this.parentNode) === null || _a === void 0 ? void 0 : _a.childNodes.indexOf(this)) !== null && _b !== void 0 ? _b : -1;
            if (index > 0) {
                (_c = this.parentNode) === null || _c === void 0 ? void 0 : _c.childNodes.splice(index, 1);
            }
        }
    }
    putBeforeOnParent(node) {
        var _a;
        if (this.parentNode && node.hasSameParent(this) && this.isAddedToParent()) {
            node.removeFromParent();
            (_a = this.parentNode) === null || _a === void 0 ? void 0 : _a.childNodes.splice(this.parentNode.childNodes.indexOf(this), 0, node);
        }
    }
    isAddedToParent() {
        var _a;
        if ((_a = this.parentNode) === null || _a === void 0 ? void 0 : _a.childNodes.includes(this)) {
            return true;
        }
        else {
            return false;
        }
    }
    hasSameParent(node) {
        if (node.parentNode === this.parentNode) {
            return true;
        }
        else {
            return false;
        }
    }
    isDescendentOf(node, visited = new Set()) {
        if (visited.has(node)) {
            return false;
        }
        visited.add(node);
        if (node === null || node === void 0 ? void 0 : node.childNodes.includes(this)) {
            return true;
        }
        else {
            node === null || node === void 0 ? void 0 : node.childNodes.forEach((child) => {
                if (node.isDescendentOf(child, visited)) {
                    return true;
                }
            });
        }
        return false;
    }
    toJsonNode() {
        return (0, TrimlJson_1.trimlToJsonNode)(this);
    }
}
exports.TrimlNode = TrimlNode;
class Model extends TrimlNode {
    // public addSelect(name: string, options?: string[]) {
    //     this.childNodes.push(new Select(this, name, options));
    // }    
    toJsonNode() {
        const jsonNode = (0, TrimlJson_1.trimlToJsonNode)(this);
        jsonNode.nodeType = "model";
        return jsonNode;
    }
}
exports.Model = Model;
class Input extends TrimlNode {
    constructor(parentNode, name, options) {
        super(parentNode);
        this.name = name;
        options === null || options === void 0 ? void 0 : options.forEach((optionValue) => {
            this.childNodes.push(new Option(this, optionValue));
        });
    }
    toJsonNode() {
        const jsonNode = (0, TrimlJson_1.trimlToJsonNode)(this);
        jsonNode.nodeType = "input";
        return jsonNode;
    }
}
exports.Input = Input;
class Option extends TrimlNode {
    constructor(parentNode, value) {
        super(parentNode);
        this.value = value;
    }
    toJsonNode() {
        var _a;
        const jsonNode = (0, TrimlJson_1.trimlToJsonNode)(this);
        jsonNode.nodeType = "option";
        if (this.value)
            (_a = jsonNode.properties) === null || _a === void 0 ? void 0 : _a.push(new TrimlJson_1.TrimlJsonProperty("value", this.value));
        return jsonNode;
    }
}
exports.Option = Option;
class Scope extends TrimlNode {
    toJsonNode() {
        const jsonNode = (0, TrimlJson_1.trimlToJsonNode)(this);
        jsonNode.nodeType = "scope";
        return jsonNode;
    }
}
exports.Scope = Scope;
//# sourceMappingURL=TrimlNode.js.map