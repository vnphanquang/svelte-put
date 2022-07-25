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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(require("os"));
const colors_1 = __importDefault(require("colors"));
const node_core_library_1 = require("@rushstack/node-core-library");
const ApiDocumenterCommandLine_1 = require("./cli/ApiDocumenterCommandLine");
const myPackageVersion = node_core_library_1.PackageJsonLookup.loadOwnPackageJson(__dirname).version;
console.log(os.EOL +
    colors_1.default.bold(`api-documenter ${myPackageVersion} ` + colors_1.default.cyan(' - https://api-extractor.com/') + os.EOL));
const parser = new ApiDocumenterCommandLine_1.ApiDocumenterCommandLine();
parser.execute().catch(console.error); // CommandLineParser.execute() should never reject the promise
//# sourceMappingURL=start.js.map