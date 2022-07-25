/**
 * API Documenter generates an API reference website from the .api.json files created by API Extractor.
 * The `@microsoft/api-documenter` package provides the command-line tool.  It also exposes a developer API that you
 * can use to create plugins that customize how API Documenter generates documentation.
 *
 * @packageDocumentation
 */

import { ApiItem } from '@microsoft/api-extractor-model';
import { ApiModel } from '@microsoft/api-extractor-model';

/**
 * The manifest for an API Documenter plugin.
 *
 * @remarks
 * An API documenter plugin is an NPM package. By convention, the NPM package name should have the prefix
 * `doc-plugin-`.  Its main entry point should export an object named `apiDocumenterPluginManifest` which implements
 * the `IApiDocumenterPluginManifest` interface.
 *
 * For example:
 * ```ts
 * class MyMarkdownDocumenter extends MarkdownDocumenterFeature {
 *   public onInitialized(): void {
 *     console.log('MyMarkdownDocumenter: onInitialized()');
 *   }
 * }
 *
 * export const apiDocumenterPluginManifest: IApiDocumenterPluginManifest = {
 *   manifestVersion: 1000,
 *   features: [
 *     {
 *       featureName: 'my-markdown-documenter',
 *       kind: 'MarkdownDocumenterFeature',
 *       subclass: MyMarkdownDocumenter
 *     }
 *   ]
 * };
 * ```
 * @public
 */
export declare interface IApiDocumenterPluginManifest {
    /**
     * The manifest version number.  For now, this must always be `1000`.
     */
    manifestVersion: 1000;
    /**
     * The list of features provided by this plugin.
     */
    features: IFeatureDefinition[];
}

/**
 * Defines a "feature" that is provided by an API Documenter plugin.  A feature is a user-defined module
 * that customizes the behavior of API Documenter.
 *
 * @public
 */
export declare interface IFeatureDefinition {
    /**
     * The name of this feature, as it will appear in the config file.
     *
     * The name should consist of one or more words separated by hyphens.  Each word should consist of lower case
     * letters and numbers.  Example: `my-feature`
     */
    featureName: string;
    /**
     * Determines the kind of feature.  The specified value is the name of the base class that `subclass` inherits from.
     *
     * @remarks
     * For now, `MarkdownDocumenterFeature` is the only supported value.
     */
    kind: 'MarkdownDocumenterFeature';
    /**
     * Your subclass that extends from the base class.
     */
    subclass: {
        new (initialization: PluginFeatureInitialization): MarkdownDocumenterFeature;
    };
}

/** @internal */
declare interface IMarkdownDocumenterAccessorImplementation {
    getLinkForApiItem(apiItem: ApiItem): string | undefined;
}

/**
 * Event arguments for MarkdownDocumenterFeature.onBeforeWritePage()
 * @public
 */
export declare interface IMarkdownDocumenterFeatureOnBeforeWritePageArgs {
    /**
     * The API item corresponding to this page.
     */
    readonly apiItem: ApiItem;
    /**
     * The page content.  The {@link MarkdownDocumenterFeature.onBeforeWritePage} handler can reassign this
     * string to customize the page appearance.
     */
    pageContent: string;
    /**
     * The filename where the output will be written.
     */
    readonly outputFilename: string;
}

/**
 * Event arguments for MarkdownDocumenterFeature.onFinished()
 * @public
 */
export declare interface IMarkdownDocumenterFeatureOnFinishedArgs {
}

/**
 * Provides access to the documenter that is generating the output.
 *
 * @privateRemarks
 * This class is wrapper that provides access to the underlying MarkdownDocumenter, while hiding the implementation
 * details to ensure that the plugin API contract is stable.
 *
 * @public
 */
export declare class MarkdownDocumenterAccessor {
    private _implementation;
    /** @internal */
    constructor(implementation: IMarkdownDocumenterAccessorImplementation);
    /**
     * For a given `ApiItem`, return its markdown hyperlink.
     *
     * @returns The hyperlink, or `undefined` if the `ApiItem` object does not have a hyperlink.
     */
    getLinkForApiItem(apiItem: ApiItem): string | undefined;
}

/**
 * Inherit from this base class to implement an API Documenter plugin feature that customizes
 * the generation of markdown output.
 *
 * @public
 */
export declare class MarkdownDocumenterFeature extends PluginFeature {
    /** {@inheritdoc PluginFeature.context} */
    context: MarkdownDocumenterFeatureContext;
    /**
     * This event occurs before each markdown file is written.  It provides an opportunity to customize the
     * content of the file.
     * @virtual
     */
    onBeforeWritePage(eventArgs: IMarkdownDocumenterFeatureOnBeforeWritePageArgs): void;
    /**
     * This event occurs after all output files have been written.
     * @virtual
     */
    onFinished(eventArgs: IMarkdownDocumenterFeatureOnFinishedArgs): void;
    static [Symbol.hasInstance](instance: object): boolean;
}

/**
 * Context object for {@link MarkdownDocumenterFeature}.
 * Exposes various services that can be used by a plugin.
 *
 * @public
 */
export declare class MarkdownDocumenterFeatureContext {
    /**
     * Provides access to the `ApiModel` for the documentation being generated.
     */
    readonly apiModel: ApiModel;
    /**
     * The full path to the output folder.
     */
    readonly outputFolder: string;
    /**
     * Exposes functionality of the documenter.
     */
    readonly documenter: MarkdownDocumenterAccessor;
    /** @internal */
    constructor(options: MarkdownDocumenterFeatureContext);
}

/**
 * The abstract base class for all API Documenter plugin features.
 * @public
 */
export declare abstract class PluginFeature {
    /**
     * Exposes various services that can be used by a plugin.
     */
    context: PluginFeatureContext;
    /**
     * The subclass should pass the `initialization` through to the base class.
     * Do not put custom initialization code in the constructor.  Instead perform your initialization in the
     * `onInitialized()` event function.
     * @internal
     */
    constructor(initialization: PluginFeatureInitialization);
    /**
     * This event function is called after the feature is initialized, but before any processing occurs.
     * @virtual
     */
    onInitialized(): void;
    static [Symbol.hasInstance](instance: object): boolean;
}

/**
 * Context object for {@link PluginFeature}.
 * Exposes various services that can be used by a plugin.
 *
 * @public
 */
export declare class PluginFeatureContext {
}

/**
 * This is an internal part of the plugin infrastructure.
 *
 * @remarks
 * This object is the constructor parameter for API Documenter plugin features.
 *
 * @public
 */
export declare class PluginFeatureInitialization {
    /** @internal */
    _context: PluginFeatureContext;
    /** @internal */
    constructor();
}

export { }
