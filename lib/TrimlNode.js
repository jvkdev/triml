"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = exports.Graphic = exports.Option = exports.Input = exports.Model = exports.Node = exports.TrimlNode = void 0;
const TrimlJson_1 = require("./TrimlJson");
class TrimlNode {
    constructor(parentNode) {
        this.instanceId = crypto.randomUUID();
        this.nodes = [];
        this.parent = parentNode;
    }
    add(node) {
        this.nodes.push(node);
        node.parent = this;
    }
    removeFromParent() {
        var _a, _b, _c;
        if (this.parent) {
            const index = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.nodes.indexOf(this)) !== null && _b !== void 0 ? _b : -1;
            if (index > 0) {
                (_c = this.parent) === null || _c === void 0 ? void 0 : _c.nodes.splice(index, 1);
            }
        }
    }
    putBeforeOnParent(node) {
        var _a;
        if (this.parent && node.hasSameParent(this) && this.isAddedToParent()) {
            node.removeFromParent();
            (_a = this.parent) === null || _a === void 0 ? void 0 : _a.nodes.splice(this.parent.nodes.indexOf(this), 0, node);
        }
    }
    isAddedToParent() {
        var _a;
        if ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.nodes.includes(this)) {
            return true;
        }
        else {
            return false;
        }
    }
    hasSameParent(node) {
        if (node.parent === this.parent) {
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
        if (node === null || node === void 0 ? void 0 : node.nodes.includes(this)) {
            return true;
        }
        else {
            node === null || node === void 0 ? void 0 : node.nodes.forEach((node) => {
                if (node.isDescendentOf(node, visited)) {
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
class Node extends TrimlNode {
}
exports.Node = Node;
class Model extends TrimlNode {
}
exports.Model = Model;
class Input extends TrimlNode {
    constructor(parentNode, name) {
        super(parentNode);
        this.name = name;
    }
}
exports.Input = Input;
class Option extends TrimlNode {
    constructor(parentNode, value) {
        super(parentNode);
        this.value = value;
    }
}
exports.Option = Option;
class Graphic extends TrimlNode {
}
exports.Graphic = Graphic;
class Data extends TrimlNode {
}
exports.Data = Data;
//# sourceMappingURL=TrimlNode.js.map