"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.
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
exports.DocumenterConfig = void 0;
const path = __importStar(require("path"));
const node_core_library_1 = require("@rushstack/node-core-library");
/**
 * Helper for loading the api-documenter.json file format.  Later when the schema is more mature,
 * this class will be used to represent the validated and normalized configuration, whereas `IConfigFile`
 * represents the raw JSON file structure.
 */
class DocumenterConfig {
    constructor(filePath, configFile) {
        this.configFilePath = filePath;
        this.configFile = configFile;
        switch (configFile.newlineKind) {
            case 'lf':
                this.newlineKind = node_core_library_1.NewlineKind.Lf;
                break;
            case 'os':
                this.newlineKind = node_core_library_1.NewlineKind.OsDefault;
                break;
            default:
                this.newlineKind = node_core_library_1.NewlineKind.CrLf;
                break;
        }
    }
    /**
     * Load and validate an api-documenter.json file.
     */
    static loadFile(configFilePath) {
        const configFile = node_core_library_1.JsonFile.loadAndValidate(configFilePath, DocumenterConfig.jsonSchema);
        return new DocumenterConfig(path.resolve(configFilePath), configFile);
    }
}
exports.DocumenterConfig = DocumenterConfig;
/**
 * The JSON Schema for API Documenter config file (api-documenter.schema.json).
 */
DocumenterConfig.jsonSchema = node_core_library_1.JsonSchema.fromFile(path.join(__dirname, '..', 'schemas', 'api-documenter.schema.json'));
/**
 * The config file name "api-documenter.json".
 */
DocumenterConfig.FILENAME = 'api-documenter.json';
//# sourceMappingURL=DocumenterConfig.js.map