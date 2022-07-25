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
exports.PluginLoader = void 0;
const path = __importStar(require("path"));
const resolve = __importStar(require("resolve"));
const MarkdownDocumenterFeature_1 = require("./MarkdownDocumenterFeature");
const PluginFeature_1 = require("./PluginFeature");
class PluginLoader {
    load(documenterConfig, createContext) {
        const configFileFolder = path.dirname(documenterConfig.configFilePath);
        for (const configPlugin of documenterConfig.configFile.plugins || []) {
            try {
                // Look for the package name in the same place as the config file
                const resolvedEntryPointPath = resolve.sync(configPlugin.packageName, {
                    basedir: configFileFolder
                });
                // Load the package
                const entryPoint = require(resolvedEntryPointPath);
                if (!entryPoint) {
                    throw new Error('Invalid entry point');
                }
                if (!entryPoint.apiDocumenterPluginManifest) {
                    throw new Error(`The package is not an API documenter plugin;` +
                        ` the "apiDocumenterPluginManifest" export was not found`);
                }
                const manifest = entryPoint.apiDocumenterPluginManifest;
                if (manifest.manifestVersion !== 1000) {
                    throw new Error(`The plugin is not compatible with this version of API Documenter;` +
                        ` unsupported manifestVersion`);
                }
                const loadedPlugin = {
                    packageName: configPlugin.packageName,
                    manifest
                };
                const featureDefinitionsByName = new Map();
                for (const featureDefinition of manifest.features) {
                    featureDefinitionsByName.set(featureDefinition.featureName, featureDefinition);
                }
                for (const featureName of configPlugin.enabledFeatureNames) {
                    const featureDefinition = featureDefinitionsByName.get(featureName);
                    if (!featureDefinition) {
                        throw new Error(`The plugin ${loadedPlugin.packageName} does not have a feature with name "${featureName}"`);
                    }
                    if (featureDefinition.kind === 'MarkdownDocumenterFeature') {
                        if (this.markdownDocumenterFeature) {
                            throw new Error('A MarkdownDocumenterFeature is already loaded');
                        }
                        const initialization = new PluginFeature_1.PluginFeatureInitialization();
                        initialization._context = createContext();
                        let markdownDocumenterFeature = undefined;
                        try {
                            markdownDocumenterFeature = new featureDefinition.subclass(initialization);
                        }
                        catch (e) {
                            throw new Error(`Failed to construct feature subclass:\n` + e.toString());
                        }
                        if (!(markdownDocumenterFeature instanceof MarkdownDocumenterFeature_1.MarkdownDocumenterFeature)) {
                            throw new Error('The constructed subclass was not an instance of MarkdownDocumenterFeature');
                        }
                        try {
                            markdownDocumenterFeature.onInitialized();
                        }
                        catch (e) {
                            throw new Error('Error occurred during the onInitialized() event: ' + e.toString());
                        }
                        this.markdownDocumenterFeature = markdownDocumenterFeature;
                    }
                    else {
                        throw new Error(`Unknown feature definition kind: "${featureDefinition.kind}"`);
                    }
                }
            }
            catch (e) {
                throw new Error(`Error loading plugin ${configPlugin.packageName}: ` + e.message);
            }
        }
    }
}
exports.PluginLoader = PluginLoader;
//# sourceMappingURL=PluginLoader.js.map