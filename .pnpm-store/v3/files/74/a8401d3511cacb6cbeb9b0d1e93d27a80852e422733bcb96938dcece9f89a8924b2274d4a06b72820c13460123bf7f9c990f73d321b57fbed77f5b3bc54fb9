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
exports.MarkdownDocumenter = void 0;
const path = __importStar(require("path"));
const node_core_library_1 = require("@rushstack/node-core-library");
const tsdoc_1 = require("@microsoft/tsdoc");
const api_extractor_model_1 = require("@microsoft/api-extractor-model");
const CustomDocNodeKind_1 = require("../nodes/CustomDocNodeKind");
const DocHeading_1 = require("../nodes/DocHeading");
const DocTable_1 = require("../nodes/DocTable");
const DocEmphasisSpan_1 = require("../nodes/DocEmphasisSpan");
const DocTableRow_1 = require("../nodes/DocTableRow");
const DocTableCell_1 = require("../nodes/DocTableCell");
const DocNoteBox_1 = require("../nodes/DocNoteBox");
const Utilities_1 = require("../utils/Utilities");
const CustomMarkdownEmitter_1 = require("../markdown/CustomMarkdownEmitter");
const PluginLoader_1 = require("../plugin/PluginLoader");
const MarkdownDocumenterFeature_1 = require("../plugin/MarkdownDocumenterFeature");
const MarkdownDocumenterAccessor_1 = require("../plugin/MarkdownDocumenterAccessor");
/**
 * Renders API documentation in the Markdown file format.
 * For more info:  https://en.wikipedia.org/wiki/Markdown
 */
class MarkdownDocumenter {
    constructor(options) {
        this._apiModel = options.apiModel;
        this._documenterConfig = options.documenterConfig;
        this._outputFolder = options.outputFolder;
        this._tsdocConfiguration = CustomDocNodeKind_1.CustomDocNodes.configuration;
        this._markdownEmitter = new CustomMarkdownEmitter_1.CustomMarkdownEmitter(this._apiModel);
        this._pluginLoader = new PluginLoader_1.PluginLoader();
    }
    generateFiles() {
        if (this._documenterConfig) {
            this._pluginLoader.load(this._documenterConfig, () => {
                return new MarkdownDocumenterFeature_1.MarkdownDocumenterFeatureContext({
                    apiModel: this._apiModel,
                    outputFolder: this._outputFolder,
                    documenter: new MarkdownDocumenterAccessor_1.MarkdownDocumenterAccessor({
                        getLinkForApiItem: (apiItem) => {
                            return this._getLinkFilenameForApiItem(apiItem);
                        }
                    })
                });
            });
        }
        console.log();
        this._deleteOldOutputFiles();
        this._writeApiItemPage(this._apiModel);
        if (this._pluginLoader.markdownDocumenterFeature) {
            this._pluginLoader.markdownDocumenterFeature.onFinished({});
        }
    }
    _writeApiItemPage(apiItem) {
        const configuration = this._tsdocConfiguration;
        const output = new tsdoc_1.DocSection({ configuration });
        this._writeBreadcrumb(output, apiItem);
        const scopedName = apiItem.getScopedNameWithinPackage();
        switch (apiItem.kind) {
            case api_extractor_model_1.ApiItemKind.Class:
                output.appendNode(new DocHeading_1.DocHeading({ configuration, title: `${scopedName} class` }));
                break;
            case api_extractor_model_1.ApiItemKind.Enum:
                output.appendNode(new DocHeading_1.DocHeading({ configuration, title: `${scopedName} enum` }));
                break;
            case api_extractor_model_1.ApiItemKind.Interface:
                output.appendNode(new DocHeading_1.DocHeading({ configuration, title: `${scopedName} interface` }));
                break;
            case api_extractor_model_1.ApiItemKind.Constructor:
            case api_extractor_model_1.ApiItemKind.ConstructSignature:
                output.appendNode(new DocHeading_1.DocHeading({ configuration, title: scopedName }));
                break;
            case api_extractor_model_1.ApiItemKind.Method:
            case api_extractor_model_1.ApiItemKind.MethodSignature:
                output.appendNode(new DocHeading_1.DocHeading({ configuration, title: `${scopedName} method` }));
                break;
            case api_extractor_model_1.ApiItemKind.Function:
                output.appendNode(new DocHeading_1.DocHeading({ configuration, title: `${scopedName} function` }));
                break;
            case api_extractor_model_1.ApiItemKind.Model:
                output.appendNode(new DocHeading_1.DocHeading({ configuration, title: `API Reference` }));
                break;
            case api_extractor_model_1.ApiItemKind.Namespace:
                output.appendNode(new DocHeading_1.DocHeading({ configuration, title: `${scopedName} namespace` }));
                break;
            case api_extractor_model_1.ApiItemKind.Package:
                console.log(`Writing ${apiItem.displayName} package`);
                const unscopedPackageName = node_core_library_1.PackageName.getUnscopedName(apiItem.displayName);
                output.appendNode(new DocHeading_1.DocHeading({ configuration, title: `${unscopedPackageName} package` }));
                break;
            case api_extractor_model_1.ApiItemKind.Property:
            case api_extractor_model_1.ApiItemKind.PropertySignature:
                output.appendNode(new DocHeading_1.DocHeading({ configuration, title: `${scopedName} property` }));
                break;
            case api_extractor_model_1.ApiItemKind.TypeAlias:
                output.appendNode(new DocHeading_1.DocHeading({ configuration, title: `${scopedName} type` }));
                break;
            case api_extractor_model_1.ApiItemKind.Variable:
                output.appendNode(new DocHeading_1.DocHeading({ configuration, title: `${scopedName} variable` }));
                break;
            default:
                throw new Error('Unsupported API item kind: ' + apiItem.kind);
        }
        if (api_extractor_model_1.ApiReleaseTagMixin.isBaseClassOf(apiItem)) {
            if (apiItem.releaseTag === api_extractor_model_1.ReleaseTag.Beta) {
                this._writeBetaWarning(output);
            }
        }
        const decoratorBlocks = [];
        if (apiItem instanceof api_extractor_model_1.ApiDocumentedItem) {
            const tsdocComment = apiItem.tsdocComment;
            if (tsdocComment) {
                decoratorBlocks.push(...tsdocComment.customBlocks.filter((block) => block.blockTag.tagNameWithUpperCase === tsdoc_1.StandardTags.decorator.tagNameWithUpperCase));
                if (tsdocComment.deprecatedBlock) {
                    output.appendNode(new DocNoteBox_1.DocNoteBox({ configuration }, [
                        new tsdoc_1.DocParagraph({ configuration }, [
                            new tsdoc_1.DocPlainText({
                                configuration,
                                text: 'Warning: This API is now obsolete. '
                            })
                        ]),
                        ...tsdocComment.deprecatedBlock.content.nodes
                    ]));
                }
                this._appendSection(output, tsdocComment.summarySection);
            }
        }
        if (apiItem instanceof api_extractor_model_1.ApiDeclaredItem) {
            if (apiItem.excerpt.text.length > 0) {
                output.appendNode(new tsdoc_1.DocParagraph({ configuration }, [
                    new DocEmphasisSpan_1.DocEmphasisSpan({ configuration, bold: true }, [
                        new tsdoc_1.DocPlainText({ configuration, text: 'Signature:' })
                    ])
                ]));
                output.appendNode(new tsdoc_1.DocFencedCode({
                    configuration,
                    code: apiItem.getExcerptWithModifiers(),
                    language: 'typescript'
                }));
            }
            this._writeHeritageTypes(output, apiItem);
        }
        if (decoratorBlocks.length > 0) {
            output.appendNode(new tsdoc_1.DocParagraph({ configuration }, [
                new DocEmphasisSpan_1.DocEmphasisSpan({ configuration, bold: true }, [
                    new tsdoc_1.DocPlainText({ configuration, text: 'Decorators:' })
                ])
            ]));
            for (const decoratorBlock of decoratorBlocks) {
                output.appendNodes(decoratorBlock.content.nodes);
            }
        }
        let appendRemarks = true;
        switch (apiItem.kind) {
            case api_extractor_model_1.ApiItemKind.Class:
            case api_extractor_model_1.ApiItemKind.Interface:
            case api_extractor_model_1.ApiItemKind.Namespace:
            case api_extractor_model_1.ApiItemKind.Package:
                this._writeRemarksSection(output, apiItem);
                appendRemarks = false;
                break;
        }
        switch (apiItem.kind) {
            case api_extractor_model_1.ApiItemKind.Class:
                this._writeClassTables(output, apiItem);
                break;
            case api_extractor_model_1.ApiItemKind.Enum:
                this._writeEnumTables(output, apiItem);
                break;
            case api_extractor_model_1.ApiItemKind.Interface:
                this._writeInterfaceTables(output, apiItem);
                break;
            case api_extractor_model_1.ApiItemKind.Constructor:
            case api_extractor_model_1.ApiItemKind.ConstructSignature:
            case api_extractor_model_1.ApiItemKind.Method:
            case api_extractor_model_1.ApiItemKind.MethodSignature:
            case api_extractor_model_1.ApiItemKind.Function:
                this._writeParameterTables(output, apiItem);
                this._writeThrowsSection(output, apiItem);
                break;
            case api_extractor_model_1.ApiItemKind.Namespace:
                this._writePackageOrNamespaceTables(output, apiItem);
                break;
            case api_extractor_model_1.ApiItemKind.Model:
                this._writeModelTable(output, apiItem);
                break;
            case api_extractor_model_1.ApiItemKind.Package:
                this._writePackageOrNamespaceTables(output, apiItem);
                break;
            case api_extractor_model_1.ApiItemKind.Property:
            case api_extractor_model_1.ApiItemKind.PropertySignature:
                break;
            case api_extractor_model_1.ApiItemKind.TypeAlias:
                break;
            case api_extractor_model_1.ApiItemKind.Variable:
                break;
            default:
                throw new Error('Unsupported API item kind: ' + apiItem.kind);
        }
        if (appendRemarks) {
            this._writeRemarksSection(output, apiItem);
        }
        const filename = path.join(this._outputFolder, this._getFilenameForApiItem(apiItem));
        const stringBuilder = new tsdoc_1.StringBuilder();
        stringBuilder.append('<!-- Do not edit this file. It is automatically generated by API Documenter. -->\n\n');
        this._markdownEmitter.emit(stringBuilder, output, {
            contextApiItem: apiItem,
            onGetFilenameForApiItem: (apiItemForFilename) => {
                return this._getLinkFilenameForApiItem(apiItemForFilename);
            }
        });
        let pageContent = stringBuilder.toString();
        if (this._pluginLoader.markdownDocumenterFeature) {
            // Allow the plugin to customize the pageContent
            const eventArgs = {
                apiItem: apiItem,
                outputFilename: filename,
                pageContent: pageContent
            };
            this._pluginLoader.markdownDocumenterFeature.onBeforeWritePage(eventArgs);
            pageContent = eventArgs.pageContent;
        }
        node_core_library_1.FileSystem.writeFile(filename, pageContent, {
            convertLineEndings: this._documenterConfig ? this._documenterConfig.newlineKind : node_core_library_1.NewlineKind.CrLf
        });
    }
    _writeHeritageTypes(output, apiItem) {
        const configuration = this._tsdocConfiguration;
        if (apiItem instanceof api_extractor_model_1.ApiClass) {
            if (apiItem.extendsType) {
                const extendsParagraph = new tsdoc_1.DocParagraph({ configuration }, [
                    new DocEmphasisSpan_1.DocEmphasisSpan({ configuration, bold: true }, [
                        new tsdoc_1.DocPlainText({ configuration, text: 'Extends: ' })
                    ])
                ]);
                this._appendExcerptWithHyperlinks(extendsParagraph, apiItem.extendsType.excerpt);
                output.appendNode(extendsParagraph);
            }
            if (apiItem.implementsTypes.length > 0) {
                const implementsParagraph = new tsdoc_1.DocParagraph({ configuration }, [
                    new DocEmphasisSpan_1.DocEmphasisSpan({ configuration, bold: true }, [
                        new tsdoc_1.DocPlainText({ configuration, text: 'Implements: ' })
                    ])
                ]);
                let needsComma = false;
                for (const implementsType of apiItem.implementsTypes) {
                    if (needsComma) {
                        implementsParagraph.appendNode(new tsdoc_1.DocPlainText({ configuration, text: ', ' }));
                    }
                    this._appendExcerptWithHyperlinks(implementsParagraph, implementsType.excerpt);
                    needsComma = true;
                }
                output.appendNode(implementsParagraph);
            }
        }
        if (apiItem instanceof api_extractor_model_1.ApiInterface) {
            if (apiItem.extendsTypes.length > 0) {
                const extendsParagraph = new tsdoc_1.DocParagraph({ configuration }, [
                    new DocEmphasisSpan_1.DocEmphasisSpan({ configuration, bold: true }, [
                        new tsdoc_1.DocPlainText({ configuration, text: 'Extends: ' })
                    ])
                ]);
                let needsComma = false;
                for (const extendsType of apiItem.extendsTypes) {
                    if (needsComma) {
                        extendsParagraph.appendNode(new tsdoc_1.DocPlainText({ configuration, text: ', ' }));
                    }
                    this._appendExcerptWithHyperlinks(extendsParagraph, extendsType.excerpt);
                    needsComma = true;
                }
                output.appendNode(extendsParagraph);
            }
        }
        if (apiItem instanceof api_extractor_model_1.ApiTypeAlias) {
            const refs = apiItem.excerptTokens.filter((token) => token.kind === api_extractor_model_1.ExcerptTokenKind.Reference &&
                token.canonicalReference &&
                this._apiModel.resolveDeclarationReference(token.canonicalReference, undefined).resolvedApiItem);
            if (refs.length > 0) {
                const referencesParagraph = new tsdoc_1.DocParagraph({ configuration }, [
                    new DocEmphasisSpan_1.DocEmphasisSpan({ configuration, bold: true }, [
                        new tsdoc_1.DocPlainText({ configuration, text: 'References: ' })
                    ])
                ]);
                let needsComma = false;
                const visited = new Set();
                for (const ref of refs) {
                    if (visited.has(ref.text)) {
                        continue;
                    }
                    visited.add(ref.text);
                    if (needsComma) {
                        referencesParagraph.appendNode(new tsdoc_1.DocPlainText({ configuration, text: ', ' }));
                    }
                    this._appendExcerptTokenWithHyperlinks(referencesParagraph, ref);
                    needsComma = true;
                }
                output.appendNode(referencesParagraph);
            }
        }
    }
    _writeRemarksSection(output, apiItem) {
        const configuration = this._tsdocConfiguration;
        if (apiItem instanceof api_extractor_model_1.ApiDocumentedItem) {
            const tsdocComment = apiItem.tsdocComment;
            if (tsdocComment) {
                // Write the @remarks block
                if (tsdocComment.remarksBlock) {
                    output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Remarks' }));
                    this._appendSection(output, tsdocComment.remarksBlock.content);
                }
                // Write the @example blocks
                const exampleBlocks = tsdocComment.customBlocks.filter((x) => x.blockTag.tagNameWithUpperCase === tsdoc_1.StandardTags.example.tagNameWithUpperCase);
                let exampleNumber = 1;
                for (const exampleBlock of exampleBlocks) {
                    const heading = exampleBlocks.length > 1 ? `Example ${exampleNumber}` : 'Example';
                    output.appendNode(new DocHeading_1.DocHeading({ configuration, title: heading }));
                    this._appendSection(output, exampleBlock.content);
                    ++exampleNumber;
                }
            }
        }
    }
    _writeThrowsSection(output, apiItem) {
        const configuration = this._tsdocConfiguration;
        if (apiItem instanceof api_extractor_model_1.ApiDocumentedItem) {
            const tsdocComment = apiItem.tsdocComment;
            if (tsdocComment) {
                // Write the @throws blocks
                const throwsBlocks = tsdocComment.customBlocks.filter((x) => x.blockTag.tagNameWithUpperCase === tsdoc_1.StandardTags.throws.tagNameWithUpperCase);
                if (throwsBlocks.length > 0) {
                    const heading = 'Exceptions';
                    output.appendNode(new DocHeading_1.DocHeading({ configuration, title: heading }));
                    for (const throwsBlock of throwsBlocks) {
                        this._appendSection(output, throwsBlock.content);
                    }
                }
            }
        }
    }
    /**
     * GENERATE PAGE: MODEL
     */
    _writeModelTable(output, apiModel) {
        const configuration = this._tsdocConfiguration;
        const packagesTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Package', 'Description']
        });
        for (const apiMember of apiModel.members) {
            const row = new DocTableRow_1.DocTableRow({ configuration }, [
                this._createTitleCell(apiMember),
                this._createDescriptionCell(apiMember)
            ]);
            switch (apiMember.kind) {
                case api_extractor_model_1.ApiItemKind.Package:
                    packagesTable.addRow(row);
                    this._writeApiItemPage(apiMember);
                    break;
            }
        }
        if (packagesTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Packages' }));
            output.appendNode(packagesTable);
        }
    }
    /**
     * GENERATE PAGE: PACKAGE or NAMESPACE
     */
    _writePackageOrNamespaceTables(output, apiContainer) {
        const configuration = this._tsdocConfiguration;
        const classesTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Class', 'Description']
        });
        const enumerationsTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Enumeration', 'Description']
        });
        const functionsTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Function', 'Description']
        });
        const interfacesTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Interface', 'Description']
        });
        const namespacesTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Namespace', 'Description']
        });
        const variablesTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Variable', 'Description']
        });
        const typeAliasesTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Type Alias', 'Description']
        });
        const apiMembers = apiContainer.kind === api_extractor_model_1.ApiItemKind.Package
            ? apiContainer.entryPoints[0].members
            : apiContainer.members;
        for (const apiMember of apiMembers) {
            const row = new DocTableRow_1.DocTableRow({ configuration }, [
                this._createTitleCell(apiMember),
                this._createDescriptionCell(apiMember)
            ]);
            switch (apiMember.kind) {
                case api_extractor_model_1.ApiItemKind.Class:
                    classesTable.addRow(row);
                    this._writeApiItemPage(apiMember);
                    break;
                case api_extractor_model_1.ApiItemKind.Enum:
                    enumerationsTable.addRow(row);
                    this._writeApiItemPage(apiMember);
                    break;
                case api_extractor_model_1.ApiItemKind.Interface:
                    interfacesTable.addRow(row);
                    this._writeApiItemPage(apiMember);
                    break;
                case api_extractor_model_1.ApiItemKind.Namespace:
                    namespacesTable.addRow(row);
                    this._writeApiItemPage(apiMember);
                    break;
                case api_extractor_model_1.ApiItemKind.Function:
                    functionsTable.addRow(row);
                    this._writeApiItemPage(apiMember);
                    break;
                case api_extractor_model_1.ApiItemKind.TypeAlias:
                    typeAliasesTable.addRow(row);
                    this._writeApiItemPage(apiMember);
                    break;
                case api_extractor_model_1.ApiItemKind.Variable:
                    variablesTable.addRow(row);
                    this._writeApiItemPage(apiMember);
                    break;
            }
        }
        if (classesTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Classes' }));
            output.appendNode(classesTable);
        }
        if (enumerationsTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Enumerations' }));
            output.appendNode(enumerationsTable);
        }
        if (functionsTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Functions' }));
            output.appendNode(functionsTable);
        }
        if (interfacesTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Interfaces' }));
            output.appendNode(interfacesTable);
        }
        if (namespacesTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Namespaces' }));
            output.appendNode(namespacesTable);
        }
        if (variablesTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Variables' }));
            output.appendNode(variablesTable);
        }
        if (typeAliasesTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Type Aliases' }));
            output.appendNode(typeAliasesTable);
        }
    }
    /**
     * GENERATE PAGE: CLASS
     */
    _writeClassTables(output, apiClass) {
        const configuration = this._tsdocConfiguration;
        const eventsTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Property', 'Modifiers', 'Type', 'Description']
        });
        const constructorsTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Constructor', 'Modifiers', 'Description']
        });
        const propertiesTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Property', 'Modifiers', 'Type', 'Description']
        });
        const methodsTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Method', 'Modifiers', 'Description']
        });
        const apiMembers = this._getMembersAndWriteIncompleteWarning(apiClass, output);
        for (const apiMember of apiMembers) {
            const isInherited = apiMember.parent !== apiClass;
            switch (apiMember.kind) {
                case api_extractor_model_1.ApiItemKind.Constructor: {
                    constructorsTable.addRow(new DocTableRow_1.DocTableRow({ configuration }, [
                        this._createTitleCell(apiMember),
                        this._createModifiersCell(apiMember),
                        this._createDescriptionCell(apiMember, isInherited)
                    ]));
                    this._writeApiItemPage(apiMember);
                    break;
                }
                case api_extractor_model_1.ApiItemKind.Method: {
                    methodsTable.addRow(new DocTableRow_1.DocTableRow({ configuration }, [
                        this._createTitleCell(apiMember),
                        this._createModifiersCell(apiMember),
                        this._createDescriptionCell(apiMember, isInherited)
                    ]));
                    this._writeApiItemPage(apiMember);
                    break;
                }
                case api_extractor_model_1.ApiItemKind.Property: {
                    if (apiMember.isEventProperty) {
                        eventsTable.addRow(new DocTableRow_1.DocTableRow({ configuration }, [
                            this._createTitleCell(apiMember),
                            this._createModifiersCell(apiMember),
                            this._createPropertyTypeCell(apiMember),
                            this._createDescriptionCell(apiMember, isInherited)
                        ]));
                    }
                    else {
                        propertiesTable.addRow(new DocTableRow_1.DocTableRow({ configuration }, [
                            this._createTitleCell(apiMember),
                            this._createModifiersCell(apiMember),
                            this._createPropertyTypeCell(apiMember),
                            this._createDescriptionCell(apiMember, isInherited)
                        ]));
                    }
                    this._writeApiItemPage(apiMember);
                    break;
                }
            }
        }
        if (eventsTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Events' }));
            output.appendNode(eventsTable);
        }
        if (constructorsTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Constructors' }));
            output.appendNode(constructorsTable);
        }
        if (propertiesTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Properties' }));
            output.appendNode(propertiesTable);
        }
        if (methodsTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Methods' }));
            output.appendNode(methodsTable);
        }
    }
    /**
     * GENERATE PAGE: ENUM
     */
    _writeEnumTables(output, apiEnum) {
        const configuration = this._tsdocConfiguration;
        const enumMembersTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Member', 'Value', 'Description']
        });
        for (const apiEnumMember of apiEnum.members) {
            enumMembersTable.addRow(new DocTableRow_1.DocTableRow({ configuration }, [
                new DocTableCell_1.DocTableCell({ configuration }, [
                    new tsdoc_1.DocParagraph({ configuration }, [
                        new tsdoc_1.DocPlainText({ configuration, text: Utilities_1.Utilities.getConciseSignature(apiEnumMember) })
                    ])
                ]),
                this._createInitializerCell(apiEnumMember),
                this._createDescriptionCell(apiEnumMember)
            ]));
        }
        if (enumMembersTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Enumeration Members' }));
            output.appendNode(enumMembersTable);
        }
    }
    /**
     * GENERATE PAGE: INTERFACE
     */
    _writeInterfaceTables(output, apiInterface) {
        const configuration = this._tsdocConfiguration;
        const eventsTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Property', 'Modifiers', 'Type', 'Description']
        });
        const propertiesTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Property', 'Modifiers', 'Type', 'Description']
        });
        const methodsTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Method', 'Description']
        });
        const apiMembers = this._getMembersAndWriteIncompleteWarning(apiInterface, output);
        for (const apiMember of apiMembers) {
            const isInherited = apiMember.parent !== apiInterface;
            switch (apiMember.kind) {
                case api_extractor_model_1.ApiItemKind.ConstructSignature:
                case api_extractor_model_1.ApiItemKind.MethodSignature: {
                    methodsTable.addRow(new DocTableRow_1.DocTableRow({ configuration }, [
                        this._createTitleCell(apiMember),
                        this._createDescriptionCell(apiMember, isInherited)
                    ]));
                    this._writeApiItemPage(apiMember);
                    break;
                }
                case api_extractor_model_1.ApiItemKind.PropertySignature: {
                    if (apiMember.isEventProperty) {
                        eventsTable.addRow(new DocTableRow_1.DocTableRow({ configuration }, [
                            this._createTitleCell(apiMember),
                            this._createModifiersCell(apiMember),
                            this._createPropertyTypeCell(apiMember),
                            this._createDescriptionCell(apiMember, isInherited)
                        ]));
                    }
                    else {
                        propertiesTable.addRow(new DocTableRow_1.DocTableRow({ configuration }, [
                            this._createTitleCell(apiMember),
                            this._createModifiersCell(apiMember),
                            this._createPropertyTypeCell(apiMember),
                            this._createDescriptionCell(apiMember, isInherited)
                        ]));
                    }
                    this._writeApiItemPage(apiMember);
                    break;
                }
            }
        }
        if (eventsTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Events' }));
            output.appendNode(eventsTable);
        }
        if (propertiesTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Properties' }));
            output.appendNode(propertiesTable);
        }
        if (methodsTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Methods' }));
            output.appendNode(methodsTable);
        }
    }
    /**
     * GENERATE PAGE: FUNCTION-LIKE
     */
    _writeParameterTables(output, apiParameterListMixin) {
        const configuration = this._tsdocConfiguration;
        const parametersTable = new DocTable_1.DocTable({
            configuration,
            headerTitles: ['Parameter', 'Type', 'Description']
        });
        for (const apiParameter of apiParameterListMixin.parameters) {
            const parameterDescription = new tsdoc_1.DocSection({ configuration });
            if (apiParameter.isOptional) {
                parameterDescription.appendNodesInParagraph([
                    new DocEmphasisSpan_1.DocEmphasisSpan({ configuration, italic: true }, [
                        new tsdoc_1.DocPlainText({ configuration, text: '(Optional)' })
                    ]),
                    new tsdoc_1.DocPlainText({ configuration, text: ' ' })
                ]);
            }
            if (apiParameter.tsdocParamBlock) {
                this._appendAndMergeSection(parameterDescription, apiParameter.tsdocParamBlock.content);
            }
            parametersTable.addRow(new DocTableRow_1.DocTableRow({ configuration }, [
                new DocTableCell_1.DocTableCell({ configuration }, [
                    new tsdoc_1.DocParagraph({ configuration }, [
                        new tsdoc_1.DocPlainText({ configuration, text: apiParameter.name })
                    ])
                ]),
                new DocTableCell_1.DocTableCell({ configuration }, [
                    this._createParagraphForTypeExcerpt(apiParameter.parameterTypeExcerpt)
                ]),
                new DocTableCell_1.DocTableCell({ configuration }, parameterDescription.nodes)
            ]));
        }
        if (parametersTable.rows.length > 0) {
            output.appendNode(new DocHeading_1.DocHeading({ configuration, title: 'Parameters' }));
            output.appendNode(parametersTable);
        }
        if (api_extractor_model_1.ApiReturnTypeMixin.isBaseClassOf(apiParameterListMixin)) {
            const returnTypeExcerpt = apiParameterListMixin.returnTypeExcerpt;
            output.appendNode(new tsdoc_1.DocParagraph({ configuration }, [
                new DocEmphasisSpan_1.DocEmphasisSpan({ configuration, bold: true }, [
                    new tsdoc_1.DocPlainText({ configuration, text: 'Returns:' })
                ])
            ]));
            output.appendNode(this._createParagraphForTypeExcerpt(returnTypeExcerpt));
            if (apiParameterListMixin instanceof api_extractor_model_1.ApiDocumentedItem) {
                if (apiParameterListMixin.tsdocComment && apiParameterListMixin.tsdocComment.returnsBlock) {
                    this._appendSection(output, apiParameterListMixin.tsdocComment.returnsBlock.content);
                }
            }
        }
    }
    _createParagraphForTypeExcerpt(excerpt) {
        const configuration = this._tsdocConfiguration;
        const paragraph = new tsdoc_1.DocParagraph({ configuration });
        if (!excerpt.text.trim()) {
            paragraph.appendNode(new tsdoc_1.DocPlainText({ configuration, text: '(not declared)' }));
        }
        else {
            this._appendExcerptWithHyperlinks(paragraph, excerpt);
        }
        return paragraph;
    }
    _appendExcerptWithHyperlinks(docNodeContainer, excerpt) {
        for (const token of excerpt.spannedTokens) {
            this._appendExcerptTokenWithHyperlinks(docNodeContainer, token);
        }
    }
    _appendExcerptTokenWithHyperlinks(docNodeContainer, token) {
        const configuration = this._tsdocConfiguration;
        // Markdown doesn't provide a standardized syntax for hyperlinks inside code spans, so we will render
        // the type expression as DocPlainText.  Instead of creating multiple DocParagraphs, we can simply
        // discard any newlines and let the renderer do normal word-wrapping.
        const unwrappedTokenText = token.text.replace(/[\r\n]+/g, ' ');
        // If it's hyperlinkable, then append a DocLinkTag
        if (token.kind === api_extractor_model_1.ExcerptTokenKind.Reference && token.canonicalReference) {
            const apiItemResult = this._apiModel.resolveDeclarationReference(token.canonicalReference, undefined);
            if (apiItemResult.resolvedApiItem) {
                docNodeContainer.appendNode(new tsdoc_1.DocLinkTag({
                    configuration,
                    tagName: '@link',
                    linkText: unwrappedTokenText,
                    urlDestination: this._getLinkFilenameForApiItem(apiItemResult.resolvedApiItem)
                }));
                return;
            }
        }
        // Otherwise append non-hyperlinked text
        docNodeContainer.appendNode(new tsdoc_1.DocPlainText({ configuration, text: unwrappedTokenText }));
    }
    _createTitleCell(apiItem) {
        const configuration = this._tsdocConfiguration;
        let linkText = Utilities_1.Utilities.getConciseSignature(apiItem);
        if (api_extractor_model_1.ApiOptionalMixin.isBaseClassOf(apiItem) && apiItem.isOptional) {
            linkText += '?';
        }
        return new DocTableCell_1.DocTableCell({ configuration }, [
            new tsdoc_1.DocParagraph({ configuration }, [
                new tsdoc_1.DocLinkTag({
                    configuration,
                    tagName: '@link',
                    linkText: linkText,
                    urlDestination: this._getLinkFilenameForApiItem(apiItem)
                })
            ])
        ]);
    }
    /**
     * This generates a DocTableCell for an ApiItem including the summary section and "(BETA)" annotation.
     *
     * @remarks
     * We mostly assume that the input is an ApiDocumentedItem, but it's easier to perform this as a runtime
     * check than to have each caller perform a type cast.
     */
    _createDescriptionCell(apiItem, isInherited = false) {
        const configuration = this._tsdocConfiguration;
        const section = new tsdoc_1.DocSection({ configuration });
        if (api_extractor_model_1.ApiReleaseTagMixin.isBaseClassOf(apiItem)) {
            if (apiItem.releaseTag === api_extractor_model_1.ReleaseTag.Beta) {
                section.appendNodesInParagraph([
                    new DocEmphasisSpan_1.DocEmphasisSpan({ configuration, bold: true, italic: true }, [
                        new tsdoc_1.DocPlainText({ configuration, text: '(BETA)' })
                    ]),
                    new tsdoc_1.DocPlainText({ configuration, text: ' ' })
                ]);
            }
        }
        if (api_extractor_model_1.ApiOptionalMixin.isBaseClassOf(apiItem) && apiItem.isOptional) {
            section.appendNodesInParagraph([
                new DocEmphasisSpan_1.DocEmphasisSpan({ configuration, italic: true }, [
                    new tsdoc_1.DocPlainText({ configuration, text: '(Optional)' })
                ]),
                new tsdoc_1.DocPlainText({ configuration, text: ' ' })
            ]);
        }
        if (apiItem instanceof api_extractor_model_1.ApiDocumentedItem) {
            if (apiItem.tsdocComment !== undefined) {
                this._appendAndMergeSection(section, apiItem.tsdocComment.summarySection);
            }
        }
        if (isInherited && apiItem.parent) {
            section.appendNode(new tsdoc_1.DocParagraph({ configuration }, [
                new tsdoc_1.DocPlainText({ configuration, text: '(Inherited from ' }),
                new tsdoc_1.DocLinkTag({
                    configuration,
                    tagName: '@link',
                    linkText: apiItem.parent.displayName,
                    urlDestination: this._getLinkFilenameForApiItem(apiItem.parent)
                }),
                new tsdoc_1.DocPlainText({ configuration, text: ')' })
            ]));
        }
        return new DocTableCell_1.DocTableCell({ configuration }, section.nodes);
    }
    _createModifiersCell(apiItem) {
        const configuration = this._tsdocConfiguration;
        const section = new tsdoc_1.DocSection({ configuration });
        if (api_extractor_model_1.ApiProtectedMixin.isBaseClassOf(apiItem)) {
            if (apiItem.isProtected) {
                section.appendNode(new tsdoc_1.DocParagraph({ configuration }, [new tsdoc_1.DocCodeSpan({ configuration, code: 'protected' })]));
            }
        }
        if (api_extractor_model_1.ApiReadonlyMixin.isBaseClassOf(apiItem)) {
            if (apiItem.isReadonly) {
                section.appendNode(new tsdoc_1.DocParagraph({ configuration }, [new tsdoc_1.DocCodeSpan({ configuration, code: 'readonly' })]));
            }
        }
        if (api_extractor_model_1.ApiStaticMixin.isBaseClassOf(apiItem)) {
            if (apiItem.isStatic) {
                section.appendNode(new tsdoc_1.DocParagraph({ configuration }, [new tsdoc_1.DocCodeSpan({ configuration, code: 'static' })]));
            }
        }
        return new DocTableCell_1.DocTableCell({ configuration }, section.nodes);
    }
    _createPropertyTypeCell(apiItem) {
        const configuration = this._tsdocConfiguration;
        const section = new tsdoc_1.DocSection({ configuration });
        if (apiItem instanceof api_extractor_model_1.ApiPropertyItem) {
            section.appendNode(this._createParagraphForTypeExcerpt(apiItem.propertyTypeExcerpt));
        }
        return new DocTableCell_1.DocTableCell({ configuration }, section.nodes);
    }
    _createInitializerCell(apiItem) {
        const configuration = this._tsdocConfiguration;
        const section = new tsdoc_1.DocSection({ configuration });
        if (api_extractor_model_1.ApiInitializerMixin.isBaseClassOf(apiItem)) {
            if (apiItem.initializerExcerpt) {
                section.appendNodeInParagraph(new tsdoc_1.DocCodeSpan({ configuration, code: apiItem.initializerExcerpt.text }));
            }
        }
        return new DocTableCell_1.DocTableCell({ configuration }, section.nodes);
    }
    _writeBreadcrumb(output, apiItem) {
        const configuration = this._tsdocConfiguration;
        output.appendNodeInParagraph(new tsdoc_1.DocLinkTag({
            configuration,
            tagName: '@link',
            linkText: 'Home',
            urlDestination: this._getLinkFilenameForApiItem(this._apiModel)
        }));
        for (const hierarchyItem of apiItem.getHierarchy()) {
            switch (hierarchyItem.kind) {
                case api_extractor_model_1.ApiItemKind.Model:
                case api_extractor_model_1.ApiItemKind.EntryPoint:
                    // We don't show the model as part of the breadcrumb because it is the root-level container.
                    // We don't show the entry point because today API Extractor doesn't support multiple entry points;
                    // this may change in the future.
                    break;
                default:
                    output.appendNodesInParagraph([
                        new tsdoc_1.DocPlainText({
                            configuration,
                            text: ' > '
                        }),
                        new tsdoc_1.DocLinkTag({
                            configuration,
                            tagName: '@link',
                            linkText: hierarchyItem.displayName,
                            urlDestination: this._getLinkFilenameForApiItem(hierarchyItem)
                        })
                    ]);
            }
        }
    }
    _writeBetaWarning(output) {
        const configuration = this._tsdocConfiguration;
        const betaWarning = 'This API is provided as a preview for developers and may change' +
            ' based on feedback that we receive.  Do not use this API in a production environment.';
        output.appendNode(new DocNoteBox_1.DocNoteBox({ configuration }, [
            new tsdoc_1.DocParagraph({ configuration }, [new tsdoc_1.DocPlainText({ configuration, text: betaWarning })])
        ]));
    }
    _appendSection(output, docSection) {
        for (const node of docSection.nodes) {
            output.appendNode(node);
        }
    }
    _appendAndMergeSection(output, docSection) {
        let firstNode = true;
        for (const node of docSection.nodes) {
            if (firstNode) {
                if (node.kind === tsdoc_1.DocNodeKind.Paragraph) {
                    output.appendNodesInParagraph(node.getChildNodes());
                    firstNode = false;
                    continue;
                }
            }
            firstNode = false;
            output.appendNode(node);
        }
    }
    _getMembersAndWriteIncompleteWarning(apiClassOrInterface, output) {
        var _a;
        const configuration = this._tsdocConfiguration;
        const showInheritedMembers = !!((_a = this._documenterConfig) === null || _a === void 0 ? void 0 : _a.configFile.showInheritedMembers);
        if (!showInheritedMembers) {
            return apiClassOrInterface.members;
        }
        const result = apiClassOrInterface.findMembersWithInheritance();
        // If the result is potentially incomplete, write a short warning communicating this.
        if (result.maybeIncompleteResult) {
            output.appendNode(new tsdoc_1.DocParagraph({ configuration }, [
                new DocEmphasisSpan_1.DocEmphasisSpan({ configuration, italic: true }, [
                    new tsdoc_1.DocPlainText({
                        configuration,
                        text: '(Some inherited members may not be shown because they are not represented in the documentation.)'
                    })
                ])
            ]));
        }
        // Log the messages for diagnostic purposes.
        for (const message of result.messages) {
            console.log(`Diagnostic message for findMembersWithInheritance: ${message.text}`);
        }
        return result.items;
    }
    _getFilenameForApiItem(apiItem) {
        if (apiItem.kind === api_extractor_model_1.ApiItemKind.Model) {
            return 'index.md';
        }
        let baseName = '';
        for (const hierarchyItem of apiItem.getHierarchy()) {
            // For overloaded methods, add a suffix such as "MyClass.myMethod_2".
            let qualifiedName = Utilities_1.Utilities.getSafeFilenameForName(hierarchyItem.displayName);
            if (api_extractor_model_1.ApiParameterListMixin.isBaseClassOf(hierarchyItem)) {
                if (hierarchyItem.overloadIndex > 1) {
                    // Subtract one for compatibility with earlier releases of API Documenter.
                    // (This will get revamped when we fix GitHub issue #1308)
                    qualifiedName += `_${hierarchyItem.overloadIndex - 1}`;
                }
            }
            switch (hierarchyItem.kind) {
                case api_extractor_model_1.ApiItemKind.Model:
                case api_extractor_model_1.ApiItemKind.EntryPoint:
                case api_extractor_model_1.ApiItemKind.EnumMember:
                    break;
                case api_extractor_model_1.ApiItemKind.Package:
                    baseName = Utilities_1.Utilities.getSafeFilenameForName(node_core_library_1.PackageName.getUnscopedName(hierarchyItem.displayName));
                    break;
                default:
                    baseName += '.' + qualifiedName;
            }
        }
        return baseName + '.md';
    }
    _getLinkFilenameForApiItem(apiItem) {
        return './' + this._getFilenameForApiItem(apiItem);
    }
    _deleteOldOutputFiles() {
        console.log('Deleting old output from ' + this._outputFolder);
        node_core_library_1.FileSystem.ensureEmptyFolder(this._outputFolder);
    }
}
exports.MarkdownDocumenter = MarkdownDocumenter;
//# sourceMappingURL=MarkdownDocumenter.js.map