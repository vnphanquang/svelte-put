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
exports.CommandLineParameterProvider = void 0;
const argparse = __importStar(require("argparse"));
const BaseClasses_1 = require("../parameters/BaseClasses");
const CommandLineChoiceParameter_1 = require("../parameters/CommandLineChoiceParameter");
const CommandLineChoiceListParameter_1 = require("../parameters/CommandLineChoiceListParameter");
const CommandLineIntegerParameter_1 = require("../parameters/CommandLineIntegerParameter");
const CommandLineIntegerListParameter_1 = require("../parameters/CommandLineIntegerListParameter");
const CommandLineFlagParameter_1 = require("../parameters/CommandLineFlagParameter");
const CommandLineStringParameter_1 = require("../parameters/CommandLineStringParameter");
const CommandLineStringListParameter_1 = require("../parameters/CommandLineStringListParameter");
const CommandLineRemainder_1 = require("../parameters/CommandLineRemainder");
const Constants_1 = require("../Constants");
/**
 * This is the common base class for CommandLineAction and CommandLineParser
 * that provides functionality for defining command-line parameters.
 *
 * @public
 */
class CommandLineParameterProvider {
    /** @internal */
    // Third party code should not inherit subclasses or call this constructor
    constructor() {
        this._parameters = [];
        this._parametersByLongName = new Map();
        this._parameterGroupsByName = new Map();
        this._parametersRegistered = false;
        this._parametersProcessed = false;
    }
    /**
     * Returns a collection of the parameters that were defined for this object.
     */
    get parameters() {
        return this._parameters;
    }
    /**
     * Informs the caller if the argparse data has been processed into parameters.
     */
    get parametersProcessed() {
        return this._parametersProcessed;
    }
    /**
     * If {@link CommandLineParameterProvider.defineCommandLineRemainder} was called,
     * this object captures any remaining command line arguments after the recognized portion.
     */
    get remainder() {
        return this._remainder;
    }
    /**
     * Defines a command-line parameter whose value must be a string from a fixed set of
     * allowable choices (similar to an enum).
     *
     * @remarks
     * Example of a choice parameter:
     * ```
     * example-tool --log-level warn
     * ```
     */
    defineChoiceParameter(definition) {
        const parameter = new CommandLineChoiceParameter_1.CommandLineChoiceParameter(definition);
        this._defineParameter(parameter);
        return parameter;
    }
    /**
     * Returns the CommandLineChoiceParameter with the specified long name.
     * @remarks
     * This method throws an exception if the parameter is not defined.
     */
    getChoiceParameter(parameterLongName, parameterScope) {
        return this._getParameter(parameterLongName, BaseClasses_1.CommandLineParameterKind.Choice, parameterScope);
    }
    /**
     * Defines a command-line parameter whose value must be a string from a fixed set of
     * allowable choices (similar to an enum). The parameter can be specified multiple times to
     * build a list.
     *
     * @remarks
     * Example of a choice list parameter:
     * ```
     * example-tool --allow-color red --allow-color green
     * ```
     */
    defineChoiceListParameter(definition) {
        const parameter = new CommandLineChoiceListParameter_1.CommandLineChoiceListParameter(definition);
        this._defineParameter(parameter);
        return parameter;
    }
    /**
     * Returns the CommandLineChoiceListParameter with the specified long name.
     * @remarks
     * This method throws an exception if the parameter is not defined.
     */
    getChoiceListParameter(parameterLongName, parameterScope) {
        return this._getParameter(parameterLongName, BaseClasses_1.CommandLineParameterKind.ChoiceList, parameterScope);
    }
    /**
     * Defines a command-line switch whose boolean value is true if the switch is provided,
     * and false otherwise.
     *
     * @remarks
     * Example usage of a flag parameter:
     * ```
     * example-tool --debug
     * ```
     */
    defineFlagParameter(definition) {
        const parameter = new CommandLineFlagParameter_1.CommandLineFlagParameter(definition);
        this._defineParameter(parameter);
        return parameter;
    }
    /**
     * Returns the CommandLineFlagParameter with the specified long name.
     * @remarks
     * This method throws an exception if the parameter is not defined.
     */
    getFlagParameter(parameterLongName, parameterScope) {
        return this._getParameter(parameterLongName, BaseClasses_1.CommandLineParameterKind.Flag, parameterScope);
    }
    /**
     * Defines a command-line parameter whose argument is an integer.
     *
     * @remarks
     * Example usage of an integer parameter:
     * ```
     * example-tool --max-attempts 5
     * ```
     */
    defineIntegerParameter(definition) {
        const parameter = new CommandLineIntegerParameter_1.CommandLineIntegerParameter(definition);
        this._defineParameter(parameter);
        return parameter;
    }
    /**
     * Returns the CommandLineIntegerParameter with the specified long name.
     * @remarks
     * This method throws an exception if the parameter is not defined.
     */
    getIntegerParameter(parameterLongName, parameterScope) {
        return this._getParameter(parameterLongName, BaseClasses_1.CommandLineParameterKind.Integer, parameterScope);
    }
    /**
     * Defines a command-line parameter whose argument is an integer. The parameter can be specified
     * multiple times to build a list.
     *
     * @remarks
     * Example usage of an integer list parameter:
     * ```
     * example-tool --avoid 4 --avoid 13
     * ```
     */
    defineIntegerListParameter(definition) {
        const parameter = new CommandLineIntegerListParameter_1.CommandLineIntegerListParameter(definition);
        this._defineParameter(parameter);
        return parameter;
    }
    /**
     * Returns the CommandLineIntegerParameter with the specified long name.
     * @remarks
     * This method throws an exception if the parameter is not defined.
     */
    getIntegerListParameter(parameterLongName, parameterScope) {
        return this._getParameter(parameterLongName, BaseClasses_1.CommandLineParameterKind.IntegerList, parameterScope);
    }
    /**
     * Defines a command-line parameter whose argument is a single text string.
     *
     * @remarks
     * Example usage of a string parameter:
     * ```
     * example-tool --message "Hello, world!"
     * ```
     */
    defineStringParameter(definition) {
        const parameter = new CommandLineStringParameter_1.CommandLineStringParameter(definition);
        this._defineParameter(parameter);
        return parameter;
    }
    /**
     * Returns the CommandLineStringParameter with the specified long name.
     * @remarks
     * This method throws an exception if the parameter is not defined.
     */
    getStringParameter(parameterLongName, parameterScope) {
        return this._getParameter(parameterLongName, BaseClasses_1.CommandLineParameterKind.String, parameterScope);
    }
    /**
     * Defines a command-line parameter whose argument is a single text string.  The parameter can be
     * specified multiple times to build a list.
     *
     * @remarks
     * Example usage of a string list parameter:
     * ```
     * example-tool --add file1.txt --add file2.txt --add file3.txt
     * ```
     */
    defineStringListParameter(definition) {
        const parameter = new CommandLineStringListParameter_1.CommandLineStringListParameter(definition);
        this._defineParameter(parameter);
        return parameter;
    }
    /**
     * Defines a rule that captures any remaining command line arguments after the recognized portion.
     *
     * @remarks
     * This feature is useful for commands that pass their arguments along to an external tool, relying on
     * that tool to perform validation.  (It could also be used to parse parameters without any validation
     * or documentation, but that is not recommended.)
     *
     * Example of capturing the remainder after an optional flag parameter.
     * ```
     * example-tool --my-flag this is the remainder
     * ```
     *
     * In the "--help" documentation, the remainder rule will be represented as "...".
     */
    defineCommandLineRemainder(definition) {
        if (this._remainder) {
            throw new Error('defineRemainingArguments() has already been called for this provider');
        }
        this._remainder = new CommandLineRemainder_1.CommandLineRemainder(definition);
        return this._remainder;
    }
    /**
     * Returns the CommandLineStringListParameter with the specified long name.
     * @remarks
     * This method throws an exception if the parameter is not defined.
     */
    getStringListParameter(parameterLongName, parameterScope) {
        return this._getParameter(parameterLongName, BaseClasses_1.CommandLineParameterKind.StringList, parameterScope);
    }
    /**
     * Generates the command-line help text.
     */
    renderHelpText() {
        this._registerDefinedParameters();
        return this._getArgumentParser().formatHelp();
    }
    /**
     * Generates the command-line usage text.
     */
    renderUsageText() {
        this._registerDefinedParameters();
        return this._getArgumentParser().formatUsage();
    }
    /**
     * Returns a object which maps the long name of each parameter in this.parameters
     * to the stringified form of its value. This is useful for logging telemetry, but
     * it is not the proper way of accessing parameters or their values.
     */
    getParameterStringMap() {
        const parameterMap = {};
        for (const parameter of this.parameters) {
            const parameterName = parameter.scopedLongName || parameter.longName;
            switch (parameter.kind) {
                case BaseClasses_1.CommandLineParameterKind.Flag:
                case BaseClasses_1.CommandLineParameterKind.Choice:
                case BaseClasses_1.CommandLineParameterKind.String:
                case BaseClasses_1.CommandLineParameterKind.Integer:
                    parameterMap[parameterName] = JSON.stringify(parameter.value);
                    break;
                case BaseClasses_1.CommandLineParameterKind.StringList:
                case BaseClasses_1.CommandLineParameterKind.IntegerList:
                case BaseClasses_1.CommandLineParameterKind.ChoiceList:
                    const arrayValue = parameter.values;
                    parameterMap[parameterName] = arrayValue ? arrayValue.join(',') : '';
                    break;
            }
        }
        return parameterMap;
    }
    /**
     * Returns an object with the parsed scope (if present) and the long name of the parameter.
     */
    parseScopedLongName(scopedLongName) {
        const result = CommandLineParameterProvider._possiblyScopedLongNameRegex.exec(scopedLongName);
        if (!result || !result.groups) {
            throw new Error(`The parameter long name "${scopedLongName}" is not valid.`);
        }
        return {
            longName: `--${result.groups[CommandLineParameterProvider._longNameGroupName]}`,
            scope: result.groups[CommandLineParameterProvider._scopeGroupName]
        };
    }
    /** @internal */
    _registerDefinedParameters() {
        if (this._parametersRegistered) {
            // We prevent new parameters from being defined after the first call to _registerDefinedParameters,
            // so we can already ensure that all parameters were registered.
            return;
        }
        this._parametersRegistered = true;
        for (const longNameParameters of this._parametersByLongName.values()) {
            const useScopedLongName = longNameParameters.length > 1;
            for (const parameter of longNameParameters) {
                if (useScopedLongName && !parameter.parameterScope) {
                    throw new Error(`The parameter "${parameter.longName}" is defined multiple times with the same long name. ` +
                        'Parameters with the same long name must define a scope.');
                }
                this._registerParameter(parameter, useScopedLongName);
            }
        }
        // Need to add the remainder parameter last
        if (this._remainder) {
            const argparseOptions = {
                help: this._remainder.description,
                nargs: argparse.Const.REMAINDER,
                metavar: '"..."'
            };
            this._getArgumentParser().addArgument(argparse.Const.REMAINDER, argparseOptions);
        }
    }
    /** @internal */
    _processParsedData(parserOptions, data) {
        if (!this._parametersRegistered) {
            throw new Error('Parameters have not been registered');
        }
        if (this._parametersProcessed) {
            throw new Error('Command Line Parser Data was already processed');
        }
        // Fill in the values for the parameters
        for (const parameter of this._parameters) {
            const value = data[parameter._parserKey]; // eslint-disable-line @typescript-eslint/no-explicit-any
            parameter._setValue(value);
        }
        if (this.remainder) {
            this.remainder._setValue(data[argparse.Const.REMAINDER]);
        }
        this._parametersProcessed = true;
    }
    /** @internal */
    _defineParameter(parameter) {
        if (this._parametersRegistered) {
            throw new Error('Parameters have already been registered for this provider');
        }
        // Generate and set the parser key at definition time
        parameter._parserKey = this._generateKey();
        this._parameters.push(parameter);
        // Collect all parameters with the same long name. We will perform conflict resolution at registration.
        let longNameParameters = this._parametersByLongName.get(parameter.longName);
        if (!longNameParameters) {
            longNameParameters = [];
            this._parametersByLongName.set(parameter.longName, longNameParameters);
        }
        longNameParameters.push(parameter);
    }
    /** @internal */
    _registerParameter(parameter, useScopedLongName) {
        const names = [];
        if (parameter.shortName) {
            names.push(parameter.shortName);
        }
        // Use the original long name unless otherwise requested
        if (!useScopedLongName) {
            names.push(parameter.longName);
        }
        // Add the scoped long name if it exists
        if (parameter.scopedLongName) {
            names.push(parameter.scopedLongName);
        }
        let finalDescription = parameter.description;
        const supplementaryNotes = [];
        parameter._getSupplementaryNotes(supplementaryNotes);
        if (supplementaryNotes.length > 0) {
            // If they left the period off the end of their sentence, then add one.
            if (finalDescription.match(/[a-z0-9]"?\s*$/i)) {
                finalDescription = finalDescription.trimRight() + '.';
            }
            // Append the supplementary text
            finalDescription += ' ' + supplementaryNotes.join(' ');
        }
        // NOTE: Our "environmentVariable" feature takes precedence over argparse's "defaultValue",
        // so we have to reimplement that feature.
        const argparseOptions = {
            help: finalDescription,
            dest: parameter._parserKey,
            metavar: parameter.argumentName || undefined,
            required: parameter.required
        };
        switch (parameter.kind) {
            case BaseClasses_1.CommandLineParameterKind.Choice: {
                const choiceParameter = parameter;
                argparseOptions.choices = choiceParameter.alternatives;
                break;
            }
            case BaseClasses_1.CommandLineParameterKind.ChoiceList: {
                const choiceParameter = parameter;
                argparseOptions.choices = choiceParameter.alternatives;
                argparseOptions.action = 'append';
                break;
            }
            case BaseClasses_1.CommandLineParameterKind.Flag:
                argparseOptions.action = 'storeTrue';
                break;
            case BaseClasses_1.CommandLineParameterKind.Integer:
                argparseOptions.type = 'int';
                break;
            case BaseClasses_1.CommandLineParameterKind.IntegerList:
                argparseOptions.type = 'int';
                argparseOptions.action = 'append';
                break;
            case BaseClasses_1.CommandLineParameterKind.String:
                break;
            case BaseClasses_1.CommandLineParameterKind.StringList:
                argparseOptions.action = 'append';
                break;
        }
        let argumentGroup;
        if (parameter.parameterGroup) {
            argumentGroup = this._parameterGroupsByName.get(parameter.parameterGroup);
            if (!argumentGroup) {
                let parameterGroupName;
                if (typeof parameter.parameterGroup === 'string') {
                    parameterGroupName = parameter.parameterGroup;
                }
                else if (parameter.parameterGroup === Constants_1.SCOPING_PARAMETER_GROUP) {
                    parameterGroupName = 'scoping';
                }
                else {
                    throw new Error('Unexpected parameter group: ' + parameter.parameterGroup);
                }
                argumentGroup = this._getArgumentParser().addArgumentGroup({
                    title: `Optional ${parameterGroupName} arguments`
                });
                this._parameterGroupsByName.set(parameter.parameterGroup, argumentGroup);
            }
        }
        else {
            argumentGroup = this._getArgumentParser();
        }
        argumentGroup.addArgument(names, Object.assign({}, argparseOptions));
        if (parameter.undocumentedSynonyms && parameter.undocumentedSynonyms.length > 0) {
            argumentGroup.addArgument(parameter.undocumentedSynonyms, Object.assign(Object.assign({}, argparseOptions), { help: argparse.Const.SUPPRESS }));
        }
    }
    _generateKey() {
        return 'key_' + (CommandLineParameterProvider._keyCounter++).toString();
    }
    _getParameter(parameterLongName, expectedKind, parameterScope) {
        // Support the parameter long name being prefixed with the scope
        const { scope, longName } = this.parseScopedLongName(parameterLongName);
        parameterLongName = longName;
        parameterScope = scope || parameterScope;
        const parameters = this._parametersByLongName.get(parameterLongName);
        if (!parameters) {
            throw new Error(`The parameter "${parameterLongName}" is not defined`);
        }
        const parameter = parameters.find((p) => p.parameterScope === parameterScope);
        if (!parameter) {
            throw new Error(`The parameter "${parameterLongName}" with scope "${parameterScope}" is not defined.`);
        }
        if (parameter.kind !== expectedKind) {
            throw new Error(`The parameter "${parameterLongName}" is of type "${BaseClasses_1.CommandLineParameterKind[parameter.kind]}"` +
                ` whereas the caller was expecting "${BaseClasses_1.CommandLineParameterKind[expectedKind]}".`);
        }
        return parameter;
    }
}
exports.CommandLineParameterProvider = CommandLineParameterProvider;
CommandLineParameterProvider._scopeGroupName = 'scope';
CommandLineParameterProvider._longNameGroupName = 'longName';
CommandLineParameterProvider._possiblyScopedLongNameRegex = /^--((?<scope>[a-z0-9]+(-[a-z0-9]+)*):)?(?<longName>[a-z0-9]+((-[a-z0-9]+)+)?)$/;
CommandLineParameterProvider._keyCounter = 0;
//# sourceMappingURL=CommandLineParameterProvider.js.map