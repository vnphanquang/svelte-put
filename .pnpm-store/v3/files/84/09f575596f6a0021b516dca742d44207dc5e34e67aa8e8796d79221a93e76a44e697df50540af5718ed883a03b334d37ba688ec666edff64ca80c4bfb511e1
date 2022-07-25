import { Plugin, OutputOptions } from "rollup";
import { partial } from "filesize";

export interface FileSizeInfo {
	minSize: string;
	gzipSize: string;
	brotliSize: string;
	bundleSize: string;
	fileName: string;
	lastVersion?: string;
	bundleSizeBefore?: string;
	brotliSizeBefore?: string;
	minSizeBefore?: string;
	gzipSizeBefore?: string;
}

export type FileSizeRender<T> = (
	options: FileSizeOptions,
	outputOptions: OutputOptions,
	info: FileSizeInfo
) => T;

export interface FileSizeOptions {
	showMinifiedSize?: boolean;
	showGzippedSize?: boolean;
	showBrotliSize?: boolean;
	showBeforeSizes?: "release" | "build" | "none";
	format?: Parameters<typeof partial>[0];
	render?: FileSizeRender<string>;
	theme?: "dark" | "light";
}

export type FileSizeReporter =
	| "boxen"
	| FileSizeRender<string | Promise<string>>;

export interface FileSizePluginOptions extends FileSizeOptions {
	reporter?: FileSizeReporter | FileSizeReporter[];
}

declare const filesize: (options?: FileSizePluginOptions) => Plugin;

export default filesize;
