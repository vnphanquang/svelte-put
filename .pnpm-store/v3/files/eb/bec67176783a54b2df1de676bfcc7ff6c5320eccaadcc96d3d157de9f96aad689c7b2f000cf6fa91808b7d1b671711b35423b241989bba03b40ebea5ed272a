"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigCache = void 0;
const tsdoc_config_1 = require("@microsoft/tsdoc-config");
const path = __importStar(require("path"));
const Debug_1 = require("./Debug");
// How often to check for modified input files.  If a file's modification timestamp has changed, then we will
// evict the cache entry immediately.
const CACHE_CHECK_INTERVAL_MS = 3 * 1000;
// Evict old entries from the cache after this much time, regardless of whether the file was detected as being
// modified or not.
const CACHE_EXPIRE_MS = 20 * 1000;
// If this many objects accumulate in the cache, then it is cleared to avoid a memory leak.
const CACHE_MAX_SIZE = 100;
class ConfigCache {
    /**
     * Node.js equivalent of performance.now().
     */
    static _getTimeInMs() {
        const [seconds, nanoseconds] = process.hrtime();
        return seconds * 1000 + nanoseconds / 1000000;
    }
    static getForSourceFile(sourceFilePath) {
        const sourceFileFolder = path.dirname(path.resolve(sourceFilePath));
        // First, determine the file to be loaded. If not found, the configFilePath will be an empty string.
        const configFilePath = tsdoc_config_1.TSDocConfigFile.findConfigPathForFolder(sourceFileFolder);
        // If configFilePath is an empty string, then we'll use the folder of sourceFilePath as our cache key
        // (instead of an empty string)
        const cacheKey = configFilePath || sourceFileFolder + '/';
        Debug_1.Debug.log(`Cache key: "${cacheKey}"`);
        const nowMs = ConfigCache._getTimeInMs();
        let cachedConfig = undefined;
        // Do we have a cached object?
        cachedConfig = ConfigCache._cachedConfigs.get(cacheKey);
        if (cachedConfig) {
            Debug_1.Debug.log('Cache hit');
            // Is the cached object still valid?
            const loadAgeMs = nowMs - cachedConfig.loadTimeMs;
            const lastCheckAgeMs = nowMs - cachedConfig.lastCheckTimeMs;
            if (loadAgeMs > CACHE_EXPIRE_MS || loadAgeMs < 0) {
                Debug_1.Debug.log('Evicting because item is expired');
                cachedConfig = undefined;
                ConfigCache._cachedConfigs.delete(cacheKey);
            }
            else if (lastCheckAgeMs > CACHE_CHECK_INTERVAL_MS || lastCheckAgeMs < 0) {
                Debug_1.Debug.log('Checking for modifications');
                cachedConfig.lastCheckTimeMs = nowMs;
                if (cachedConfig.configFile.checkForModifiedFiles()) {
                    // Invalidate the cache because it failed to load completely
                    Debug_1.Debug.log('Evicting because item was modified');
                    cachedConfig = undefined;
                    ConfigCache._cachedConfigs.delete(cacheKey);
                }
            }
        }
        // Load the object
        if (!cachedConfig) {
            if (ConfigCache._cachedConfigs.size > CACHE_MAX_SIZE) {
                Debug_1.Debug.log('Clearing cache');
                ConfigCache._cachedConfigs.clear(); // avoid a memory leak
            }
            const configFile = tsdoc_config_1.TSDocConfigFile.loadFile(configFilePath);
            if (configFile.fileNotFound) {
                Debug_1.Debug.log(`File not found: "${configFilePath}"`);
            }
            else {
                Debug_1.Debug.log(`Loaded: "${configFilePath}"`);
            }
            cachedConfig = {
                configFile,
                lastCheckTimeMs: nowMs,
                loadTimeMs: nowMs
            };
            ConfigCache._cachedConfigs.set(cacheKey, cachedConfig);
        }
        return cachedConfig.configFile;
    }
}
exports.ConfigCache = ConfigCache;
// findConfigPathForFolder() result --> loaded tsdoc.json configuration
ConfigCache._cachedConfigs = new Map();
//# sourceMappingURL=ConfigCache.js.map