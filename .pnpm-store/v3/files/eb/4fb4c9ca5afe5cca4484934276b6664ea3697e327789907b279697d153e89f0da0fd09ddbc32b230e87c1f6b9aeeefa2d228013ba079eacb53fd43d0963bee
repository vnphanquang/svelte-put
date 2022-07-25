"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertUDPYamlToSDP = void 0;
const path_1 = __importDefault(require("path"));
const node_core_library_1 = require("@rushstack/node-core-library");
const yaml = require("js-yaml");
function convertUDPYamlToSDP(folderPath) {
    convert(folderPath, folderPath);
}
exports.convertUDPYamlToSDP = convertUDPYamlToSDP;
function convert(inputPath, outputPath) {
    console.log();
    if (!node_core_library_1.FileSystem.exists(inputPath)) {
        console.error(`input path: ${inputPath} is not exist`);
        return;
    }
    node_core_library_1.FileSystem.readFolderItemNames(inputPath).forEach((name) => {
        const fpath = path_1.default.join(inputPath, name);
        if (node_core_library_1.FileSystem.getStatistics(fpath).isFile()) {
            // only convert yaml
            if (!name.endsWith('.yml')) {
                return;
            }
            // parse file
            const yamlContent = node_core_library_1.FileSystem.readFile(fpath, { encoding: node_core_library_1.Encoding.Utf8 });
            // only convert universalreference yaml
            const isLegacyYaml = yamlContent.startsWith('### YamlMime:UniversalReference');
            if (!isLegacyYaml) {
                return;
            }
            console.log(`convert file ${fpath} from udp to sdp`);
            const file = yaml.safeLoad(yamlContent);
            const result = convertToSDP(file);
            if (result && result.model) {
                const stringified = `### YamlMime:TS${result.type}\n${yaml.safeDump(result.model, {
                    lineWidth: 120
                })}`;
                node_core_library_1.FileSystem.writeFile(`${outputPath}/${name}`, stringified, {
                    convertLineEndings: node_core_library_1.NewlineKind.CrLf,
                    ensureFolderExists: true
                });
            }
            else {
                console.log('not target file ', fpath);
            }
        }
        else {
            // read contents
            convert(fpath, path_1.default.join(outputPath, name));
        }
    });
}
function convertToPackageSDP(transfomredClass) {
    const element = transfomredClass.items[0];
    const packageModel = {
        uid: element.uid,
        name: element.name,
        type: 'package'
    };
    if (element.summary) {
        packageModel.summary = element.summary;
    }
    else {
        packageModel.summary = '';
    }
    // search in children
    if (element.children) {
        element.children.forEach((child) => {
            if (child.endsWith(':class')) {
                assignPackageModelFields(packageModel, 'classes', child);
            }
            else if (child.endsWith(':interface')) {
                assignPackageModelFields(packageModel, 'interfaces', child);
            }
            else if (child.endsWith(':enum')) {
                assignPackageModelFields(packageModel, 'enums', child);
            }
            else if (child.endsWith(':type')) {
                assignPackageModelFields(packageModel, 'typeAliases', child);
            }
            else {
                // console.log("other type: ", child)
            }
        });
    }
    for (let i = 1; i < transfomredClass.items.length; i++) {
        const ele = transfomredClass.items[i];
        switch (ele.type) {
            case 'typealias':
                // need generate typeAlias file for this
                break;
            case 'function':
                if (!packageModel.functions) {
                    packageModel.functions = [];
                }
                packageModel.functions.push(convertToFunctionSDP(ele, element.uid, transfomredClass));
                break;
            default:
                // console.log(transfomredClass.items[0].name)
                console.log('[warning] not applied type(package): ', ele.type);
        }
    }
    return packageModel;
}
function assignPackageModelFields(packageModel, name, uid) {
    if (!packageModel[name]) {
        packageModel[name] = [];
    }
    packageModel[name].push(uid);
}
function convertToSDP(transfomredClass) {
    const element = transfomredClass.items[0];
    switch (element.type) {
        case 'class':
        case 'interface':
            return {
                model: convertToTypeSDP(transfomredClass, element.type === 'class'),
                type: 'Type'
            };
        case 'enum':
            if (transfomredClass.items.length < 2) {
                console.log(`[warning] enum ${element.uid}/${element.name} does not have fields`);
                return undefined;
            }
            return { model: convertToEnumSDP(transfomredClass), type: 'Enum' };
        case 'typealias':
            return { model: convertToTypeAliasSDP(element, transfomredClass), type: 'TypeAlias' };
        case 'package':
            return {
                model: convertToPackageSDP(transfomredClass),
                type: 'Package'
            };
        default:
            console.log('not applied type: ', element.type);
            return undefined;
    }
}
function convertToEnumSDP(transfomredClass) {
    const element = transfomredClass.items[0];
    const fields = [];
    for (let i = 1; i < transfomredClass.items.length; i++) {
        const ele = transfomredClass.items[i];
        const field = {
            name: ele.name,
            uid: ele.uid,
            package: element.package
        };
        if (ele.summary) {
            field.summary = ele.summary;
        }
        else {
            field.summary = '';
        }
        if (ele.numericValue) {
            field.value = ele.numericValue;
        }
        fields.push(field);
    }
    const result = Object.assign(Object.assign({}, convertCommonYamlModel(element, element.package, transfomredClass)), { fields: fields });
    return result;
}
function convertToTypeAliasSDP(element, transfomredClass) {
    const result = Object.assign({}, convertCommonYamlModel(element, element.package, transfomredClass));
    if (element.syntax) {
        result.syntax = element.syntax.content;
    }
    return result;
}
function convertToTypeSDP(transfomredClass, isClass) {
    const element = transfomredClass.items[0];
    const constructors = [];
    const properties = [];
    const methods = [];
    const events = [];
    for (let i = 1; i < transfomredClass.items.length; i++) {
        const ele = transfomredClass.items[i];
        const item = convertCommonYamlModel(ele, element.package, transfomredClass);
        if (ele.type === 'constructor') {
            // interface does not need this field
            if (isClass) {
                constructors.push(item);
            }
        }
        else if (ele.type === 'property') {
            properties.push(item);
        }
        else if (ele.type === 'method') {
            methods.push(item);
        }
        else if (ele.type === 'event') {
            events.push(item);
        }
        else {
            console.log(`[warning] ${ele.uid}#${ele.name} is not applied sub type ${ele.type} for type yaml`);
        }
    }
    const result = Object.assign(Object.assign({}, convertCommonYamlModel(element, element.package, transfomredClass)), { type: isClass ? 'class' : 'interface' });
    delete result.syntax;
    if (constructors.length > 0) {
        result.constructors = constructors;
    }
    if (properties.length > 0) {
        result.properties = properties;
    }
    if (methods.length > 0) {
        result.methods = methods;
    }
    if (events.length > 0) {
        result.events = events;
    }
    if (element.extends && element.extends.length > 0) {
        result.extends = convertSelfTypeToXref(element.extends[0], transfomredClass);
    }
    return result;
}
function convertToFunctionSDP(element, packageName, transfomredClass) {
    const model = convertCommonYamlModel(element, packageName, transfomredClass);
    // don't need these fields
    delete model.fullName;
    return model;
}
function convertCommonYamlModel(element, packageName, transfomredClass) {
    var _a;
    const result = {
        name: element.name,
        uid: element.uid,
        package: packageName
    };
    if (element.fullName) {
        result.fullName = element.fullName;
    }
    if (element.summary) {
        result.summary = element.summary;
    }
    else {
        result.summary = '';
    }
    // because mustache meet same variable in different level
    // such as: { "pre": true, "list": [{}]}
    // if item in list wants to use pre but the pre is not assigned, it will use outer pre field.
    // so, there need to set below variable explict
    if (element.remarks) {
        result.remarks = element.remarks;
    }
    else {
        result.remarks = '';
    }
    if (element.example) {
        result.example = element.example;
    }
    else {
        result.example = [];
    }
    result.isPreview = element.isPreview;
    if (!result.isPreview) {
        result.isPreview = false;
    }
    if (element.deprecated) {
        result.isDeprecated = true;
        result.customDeprecatedMessage = element.deprecated.content;
    }
    else {
        result.isDeprecated = false;
    }
    if (element.syntax) {
        result.syntax = {};
        const syntax = element.syntax;
        result.syntax.content = syntax.content;
        if (syntax.parameters && syntax.parameters.length > 0) {
            (_a = syntax.parameters) === null || _a === void 0 ? void 0 : _a.forEach((it) => {
                delete it.optional;
                delete it.defaultValue;
            });
            result.syntax.parameters = syntax.parameters.map((it) => {
                return Object.assign(Object.assign({}, it), { id: it.id, type: convertSelfTypeToXref(escapeMarkdown(it.type[0]), transfomredClass) });
            });
        }
        if (syntax.return) {
            result.syntax.return = Object.assign(Object.assign({}, syntax.return), { type: convertSelfTypeToXref(escapeMarkdown(syntax.return.type[0]), transfomredClass) });
        }
    }
    return result;
}
function escapeMarkdown(name) {
    // eg: [key: string]: string
    const markdownLinkRegEx = /^\s*(\[.+\]):(.+)/g;
    return name.replace(markdownLinkRegEx, `$1\\:$2`);
}
function convertSelfTypeToXref(name, transfomredClass) {
    var _a, _b, _c;
    let result = name;
    // if complex type, need to get real type from references
    if (result.endsWith(':complex')) {
        const specs = (_b = (_a = transfomredClass.references) === null || _a === void 0 ? void 0 : _a.find((item) => {
            return item.uid === name;
        })) === null || _b === void 0 ? void 0 : _b['spec.typeScript'];
        if (specs && specs.length > 0) {
            result = '';
            for (const spec of specs) {
                // start with ! will be node base type
                if (spec.uid && !spec.uid.startsWith('!')) {
                    result += spec.uid;
                }
                else {
                    result += spec.name;
                }
            }
        }
    }
    else if (result.startsWith('!')) {
        // uid: '!Object:interface'
        // name: Object
        // start with !, not complex type, use reference name directly
        const ref = (_c = transfomredClass.references) === null || _c === void 0 ? void 0 : _c.find((item) => {
            return item.uid === name;
        });
        if (ref && ref.name) {
            result = ref.name;
        }
    }
    // parse < >
    result = result.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const uidRegEx = /(@?[\w\d\-/!~\.]+\:[\w\d\-\(/]+)/g;
    return result.replace(uidRegEx, `<xref uid="$1" />`);
}
//# sourceMappingURL=ToSdpConvertHelper.js.map