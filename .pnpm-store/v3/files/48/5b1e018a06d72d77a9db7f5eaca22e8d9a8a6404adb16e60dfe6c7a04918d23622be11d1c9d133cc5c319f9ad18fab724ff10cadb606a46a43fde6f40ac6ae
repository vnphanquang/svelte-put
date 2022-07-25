"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginFeature = exports.PluginFeatureContext = exports.PluginFeatureInitialization = void 0;
const node_core_library_1 = require("@rushstack/node-core-library");
/**
 * This is an internal part of the plugin infrastructure.
 *
 * @remarks
 * This object is the constructor parameter for API Documenter plugin features.
 *
 * @public
 */
class PluginFeatureInitialization {
    /** @internal */
    constructor() {
        // reserved for future use
    }
}
exports.PluginFeatureInitialization = PluginFeatureInitialization;
/**
 * Context object for {@link PluginFeature}.
 * Exposes various services that can be used by a plugin.
 *
 * @public
 */
class PluginFeatureContext {
}
exports.PluginFeatureContext = PluginFeatureContext;
const uuidPluginFeature = '56876472-7134-4812-819e-533de0ee10e6';
/**
 * The abstract base class for all API Documenter plugin features.
 * @public
 */
class PluginFeature {
    /**
     * The subclass should pass the `initialization` through to the base class.
     * Do not put custom initialization code in the constructor.  Instead perform your initialization in the
     * `onInitialized()` event function.
     * @internal
     */
    constructor(initialization) {
        // reserved for future expansion
        this.context = initialization._context;
    }
    /**
     * This event function is called after the feature is initialized, but before any processing occurs.
     * @virtual
     */
    onInitialized() {
        // (implemented by child class)
    }
    static [Symbol.hasInstance](instance) {
        return node_core_library_1.TypeUuid.isInstanceOf(instance, uuidPluginFeature);
    }
}
exports.PluginFeature = PluginFeature;
node_core_library_1.TypeUuid.registerClass(PluginFeature, uuidPluginFeature);
//# sourceMappingURL=PluginFeature.js.map