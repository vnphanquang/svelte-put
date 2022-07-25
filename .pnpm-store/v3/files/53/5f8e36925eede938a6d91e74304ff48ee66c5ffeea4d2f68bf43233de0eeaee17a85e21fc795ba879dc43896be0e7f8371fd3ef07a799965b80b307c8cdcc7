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
exports.BaseAction = void 0;
const path = __importStar(require("path"));
const colors_1 = __importDefault(require("colors"));
const ts_command_line_1 = require("@rushstack/ts-command-line");
const node_core_library_1 = require("@rushstack/node-core-library");
const api_extractor_model_1 = require("@microsoft/api-extractor-model");
class BaseAction extends ts_command_line_1.CommandLineAction {
    onDefineParameters() {
        // override
        this._inputFolderParameter = this.defineStringParameter({
            parameterLongName: '--input-folder',
            parameterShortName: '-i',
            argumentName: 'FOLDER1',
            description: `Specifies the input folder containing the *.api.json files to be processed.` +
                ` If omitted, the default is "./input"`
        });
        this._outputFolderParameter = this.defineStringParameter({
            parameterLongName: '--output-folder',
            parameterShortName: '-o',
            argumentName: 'FOLDER2',
            description: `Specifies the output folder where the documentation will be written.` +
                ` ANY EXISTING CONTENTS WILL BE DELETED!` +
                ` If omitted, the default is "./${this.actionName}"`
        });
    }
    buildApiModel() {
        const apiModel = new api_extractor_model_1.ApiModel();
        const inputFolder = this._inputFolderParameter.value || './input';
        if (!node_core_library_1.FileSystem.exists(inputFolder)) {
            throw new Error('The input folder does not exist: ' + inputFolder);
        }
        const outputFolder = this._outputFolderParameter.value || `./${this.actionName}`;
        node_core_library_1.FileSystem.ensureFolder(outputFolder);
        for (const filename of node_core_library_1.FileSystem.readFolderItemNames(inputFolder)) {
            if (filename.match(/\.api\.json$/i)) {
                console.log(`Reading ${filename}`);
                const filenamePath = path.join(inputFolder, filename);
                apiModel.loadPackage(filenamePath);
            }
        }
        this._applyInheritDoc(apiModel, apiModel);
        return { apiModel, inputFolder, outputFolder };
    }
    // TODO: This is a temporary workaround.  The long term plan is for API Extractor's DocCommentEnhancer
    // to apply all @inheritDoc tags before the .api.json file is written.
    // See DocCommentEnhancer._applyInheritDoc() for more info.
    _applyInheritDoc(apiItem, apiModel) {
        if (apiItem instanceof api_extractor_model_1.ApiDocumentedItem) {
            if (apiItem.tsdocComment) {
                const inheritDocTag = apiItem.tsdocComment.inheritDocTag;
                if (inheritDocTag && inheritDocTag.declarationReference) {
                    // Attempt to resolve the declaration reference
                    const result = apiModel.resolveDeclarationReference(inheritDocTag.declarationReference, apiItem);
                    if (result.errorMessage) {
                        console.log(colors_1.default.yellow(`Warning: Unresolved @inheritDoc tag for ${apiItem.displayName}: ` + result.errorMessage));
                    }
                    else {
                        if (result.resolvedApiItem instanceof api_extractor_model_1.ApiDocumentedItem &&
                            result.resolvedApiItem.tsdocComment &&
                            result.resolvedApiItem !== apiItem) {
                            this._copyInheritedDocs(apiItem.tsdocComment, result.resolvedApiItem.tsdocComment);
                        }
                    }
                }
            }
        }
        // Recurse members
        if (api_extractor_model_1.ApiItemContainerMixin.isBaseClassOf(apiItem)) {
            for (const member of apiItem.members) {
                this._applyInheritDoc(member, apiModel);
            }
        }
    }
    /**
     * Copy the content from `sourceDocComment` to `targetDocComment`.
     * This code is borrowed from DocCommentEnhancer as a temporary workaround.
     */
    _copyInheritedDocs(targetDocComment, sourceDocComment) {
        targetDocComment.summarySection = sourceDocComment.summarySection;
        targetDocComment.remarksBlock = sourceDocComment.remarksBlock;
        targetDocComment.params.clear();
        for (const param of sourceDocComment.params) {
            targetDocComment.params.add(param);
        }
        for (const typeParam of sourceDocComment.typeParams) {
            targetDocComment.typeParams.add(typeParam);
        }
        targetDocComment.returnsBlock = sourceDocComment.returnsBlock;
        targetDocComment.inheritDocTag = undefined;
    }
}
exports.BaseAction = BaseAction;
//# sourceMappingURL=BaseAction.js.map