"use strict";
const tsdoc_1 = require("@microsoft/tsdoc");
const Debug_1 = require("./Debug");
const ConfigCache_1 = require("./ConfigCache");
const tsdocMessageIds = {};
const defaultTSDocConfiguration = new tsdoc_1.TSDocConfiguration();
defaultTSDocConfiguration.allTsdocMessageIds.forEach((messageId) => {
    tsdocMessageIds[messageId] = `${messageId}: {{unformattedText}}`;
});
const plugin = {
    rules: {
        // NOTE: The actual ESLint rule name will be "tsdoc/syntax".  It is calculated by deleting "eslint-plugin-"
        // from the NPM package name, and then appending this string.
        syntax: {
            meta: {
                messages: Object.assign({ 'error-loading-config-file': 'Error loading TSDoc config file:\n{{details}}', 'error-applying-config': 'Error applying TSDoc configuration: {{details}}' }, tsdocMessageIds),
                type: 'problem',
                docs: {
                    description: 'Validates that TypeScript documentation comments conform to the TSDoc standard',
                    category: 'Stylistic Issues',
                    // This package is experimental
                    recommended: false,
                    url: 'https://tsdoc.org/pages/packages/eslint-plugin-tsdoc'
                }
            },
            create: (context) => {
                const sourceFilePath = context.getFilename();
                Debug_1.Debug.log(`Linting: "${sourceFilePath}"`);
                const tsdocConfiguration = new tsdoc_1.TSDocConfiguration();
                try {
                    const tsdocConfigFile = ConfigCache_1.ConfigCache.getForSourceFile(sourceFilePath);
                    if (!tsdocConfigFile.fileNotFound) {
                        if (tsdocConfigFile.hasErrors) {
                            context.report({
                                loc: { line: 1, column: 1 },
                                messageId: 'error-loading-config-file',
                                data: {
                                    details: tsdocConfigFile.getErrorSummary()
                                }
                            });
                        }
                        try {
                            tsdocConfigFile.configureParser(tsdocConfiguration);
                        }
                        catch (e) {
                            context.report({
                                loc: { line: 1, column: 1 },
                                messageId: 'error-applying-config',
                                data: {
                                    details: e.message
                                }
                            });
                        }
                    }
                }
                catch (e) {
                    context.report({
                        loc: { line: 1, column: 1 },
                        messageId: 'error-loading-config-file',
                        data: {
                            details: `Unexpected exception: ${e.message}`
                        }
                    });
                }
                const tsdocParser = new tsdoc_1.TSDocParser(tsdocConfiguration);
                const sourceCode = context.getSourceCode();
                const checkCommentBlocks = function (node) {
                    for (const comment of sourceCode.getAllComments()) {
                        if (comment.type !== 'Block') {
                            continue;
                        }
                        if (!comment.range) {
                            continue;
                        }
                        const textRange = tsdoc_1.TextRange.fromStringRange(sourceCode.text, comment.range[0], comment.range[1]);
                        // Smallest comment is "/***/"
                        if (textRange.length < 5) {
                            continue;
                        }
                        // Make sure it starts with "/**"
                        if (textRange.buffer[textRange.pos + 2] !== '*') {
                            continue;
                        }
                        const parserContext = tsdocParser.parseRange(textRange);
                        for (const message of parserContext.log.messages) {
                            context.report({
                                loc: {
                                    start: sourceCode.getLocFromIndex(message.textRange.pos),
                                    end: sourceCode.getLocFromIndex(message.textRange.end)
                                },
                                messageId: message.messageId,
                                data: {
                                    unformattedText: message.unformattedText
                                }
                            });
                        }
                    }
                };
                return {
                    Program: checkCommentBlocks
                };
            }
        }
    }
};
module.exports = plugin;
//# sourceMappingURL=index.js.map