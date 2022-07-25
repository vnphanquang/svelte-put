'use strict';

var process$1 = require('node:process');
var os = require('node:os');
var tty = require('node:tty');
var Table = require('cli-table3');
var cardinal = require('cardinal');
var emoji = require('node-emoji');
var supportsHyperlinks = require('supports-hyperlinks');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var process__default = /*#__PURE__*/_interopDefaultLegacy(process$1);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var tty__default = /*#__PURE__*/_interopDefaultLegacy(tty);
var Table__default = /*#__PURE__*/_interopDefaultLegacy(Table);
var cardinal__default = /*#__PURE__*/_interopDefaultLegacy(cardinal);
var emoji__default = /*#__PURE__*/_interopDefaultLegacy(emoji);
var supportsHyperlinks__default = /*#__PURE__*/_interopDefaultLegacy(supportsHyperlinks);

const ANSI_BACKGROUND_OFFSET = 10;

const wrapAnsi16 = (offset = 0) => code => `\u001B[${code + offset}m`;

const wrapAnsi256 = (offset = 0) => code => `\u001B[${38 + offset};5;${code}m`;

const wrapAnsi16m = (offset = 0) => (red, green, blue) => `\u001B[${38 + offset};2;${red};${green};${blue}m`;

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			overline: [53, 55],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29],
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],

			// Bright color
			blackBright: [90, 39],
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39],
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49],
		},
	};

	// Alias bright black as gray (and grey)
	styles.color.gray = styles.color.blackBright;
	styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
	styles.color.grey = styles.color.blackBright;
	styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

	for (const [groupName, group] of Object.entries(styles)) {
		for (const [styleName, style] of Object.entries(group)) {
			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`,
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false,
		});
	}

	Object.defineProperty(styles, 'codes', {
		value: codes,
		enumerable: false,
	});

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = wrapAnsi16();
	styles.color.ansi256 = wrapAnsi256();
	styles.color.ansi16m = wrapAnsi16m();
	styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
	styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
	styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);

	// From https://github.com/Qix-/color-convert/blob/3f0e0d4e92e235796ccb17f6e85c72094a651f49/conversions.js
	Object.defineProperties(styles, {
		rgbToAnsi256: {
			value: (red, green, blue) => {
				// We use the extended greyscale palette here, with the exception of
				// black and white. normal palette only has 4 greyscale shades.
				if (red === green && green === blue) {
					if (red < 8) {
						return 16;
					}

					if (red > 248) {
						return 231;
					}

					return Math.round(((red - 8) / 247) * 24) + 232;
				}

				return 16
					+ (36 * Math.round(red / 255 * 5))
					+ (6 * Math.round(green / 255 * 5))
					+ Math.round(blue / 255 * 5);
			},
			enumerable: false,
		},
		hexToRgb: {
			value: hex => {
				const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
				if (!matches) {
					return [0, 0, 0];
				}

				let {colorString} = matches.groups;

				if (colorString.length === 3) {
					colorString = [...colorString].map(character => character + character).join('');
				}

				const integer = Number.parseInt(colorString, 16);

				return [
					/* eslint-disable no-bitwise */
					(integer >> 16) & 0xFF,
					(integer >> 8) & 0xFF,
					integer & 0xFF,
					/* eslint-enable no-bitwise */
				];
			},
			enumerable: false,
		},
		hexToAnsi256: {
			value: hex => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
			enumerable: false,
		},
		ansi256ToAnsi: {
			value: code => {
				if (code < 8) {
					return 30 + code;
				}

				if (code < 16) {
					return 90 + (code - 8);
				}

				let red;
				let green;
				let blue;

				if (code >= 232) {
					red = (((code - 232) * 10) + 8) / 255;
					green = red;
					blue = red;
				} else {
					code -= 16;

					const remainder = code % 36;

					red = Math.floor(code / 36) / 5;
					green = Math.floor(remainder / 6) / 5;
					blue = (remainder % 6) / 5;
				}

				const value = Math.max(red, green, blue) * 2;

				if (value === 0) {
					return 30;
				}

				// eslint-disable-next-line no-bitwise
				let result = 30 + ((Math.round(blue) << 2) | (Math.round(green) << 1) | Math.round(red));

				if (value === 2) {
					result += 60;
				}

				return result;
			},
			enumerable: false,
		},
		rgbToAnsi: {
			value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
			enumerable: false,
		},
		hexToAnsi: {
			value: hex => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
			enumerable: false,
		},
	});

	return styles;
}

const ansiStyles = assembleStyles();

// From: https://github.com/sindresorhus/has-flag/blob/main/index.js
function hasFlag(flag, argv = process__default["default"].argv) {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}

const {env} = process__default["default"];

let flagForceColor;
if (
	hasFlag('no-color')
	|| hasFlag('no-colors')
	|| hasFlag('color=false')
	|| hasFlag('color=never')
) {
	flagForceColor = 0;
} else if (
	hasFlag('color')
	|| hasFlag('colors')
	|| hasFlag('color=true')
	|| hasFlag('color=always')
) {
	flagForceColor = 1;
}

function envForceColor() {
	if ('FORCE_COLOR' in env) {
		if (env.FORCE_COLOR === 'true') {
			return 1;
		}

		if (env.FORCE_COLOR === 'false') {
			return 0;
		}

		return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3,
	};
}

function _supportsColor(haveStream, {streamIsTTY, sniffFlags = true} = {}) {
	const noFlagForceColor = envForceColor();
	if (noFlagForceColor !== undefined) {
		flagForceColor = noFlagForceColor;
	}

	const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;

	if (forceColor === 0) {
		return 0;
	}

	if (sniffFlags) {
		if (hasFlag('color=16m')
			|| hasFlag('color=full')
			|| hasFlag('color=truecolor')) {
			return 3;
		}

		if (hasFlag('color=256')) {
			return 2;
		}
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process__default["default"].platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os__default["default"].release().split('.');
		if (
			Number(osRelease[0]) >= 10
			&& Number(osRelease[2]) >= 10_586
		) {
			return Number(osRelease[2]) >= 14_931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE', 'DRONE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	// Check for Azure DevOps pipelines
	if ('TF_BUILD' in env && 'AGENT_NAME' in env) {
		return 1;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = Number.parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function createSupportsColor(stream, options = {}) {
	const level = _supportsColor(stream, {
		streamIsTTY: stream && stream.isTTY,
		...options,
	});

	return translateLevel(level);
}

const supportsColor = {
	stdout: createSupportsColor({isTTY: tty__default["default"].isatty(1)}),
	stderr: createSupportsColor({isTTY: tty__default["default"].isatty(2)}),
};

// TODO: When targeting Node.js 16, use `String.prototype.replaceAll`.
function stringReplaceAll(string, substring, replacer) {
	let index = string.indexOf(substring);
	if (index === -1) {
		return string;
	}

	const substringLength = substring.length;
	let endIndex = 0;
	let returnValue = '';
	do {
		returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
		endIndex = index + substringLength;
		index = string.indexOf(substring, endIndex);
	} while (index !== -1);

	returnValue += string.slice(endIndex);
	return returnValue;
}

function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
	let endIndex = 0;
	let returnValue = '';
	do {
		const gotCR = string[index - 1] === '\r';
		returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? '\r\n' : '\n') + postfix;
		endIndex = index + 1;
		index = string.indexOf('\n', endIndex);
	} while (index !== -1);

	returnValue += string.slice(endIndex);
	return returnValue;
}

const {stdout: stdoutColor, stderr: stderrColor} = supportsColor;

const GENERATOR = Symbol('GENERATOR');
const STYLER = Symbol('STYLER');
const IS_EMPTY = Symbol('IS_EMPTY');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = [
	'ansi',
	'ansi',
	'ansi256',
	'ansi16m',
];

const styles = Object.create(null);

const applyOptions = (object, options = {}) => {
	if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
		throw new Error('The `level` option should be an integer from 0 to 3');
	}

	// Detect level if not set manually
	const colorLevel = stdoutColor ? stdoutColor.level : 0;
	object.level = options.level === undefined ? colorLevel : options.level;
};

const chalkFactory = options => {
	const chalk = (...strings) => strings.join(' ');
	applyOptions(chalk, options);

	Object.setPrototypeOf(chalk, createChalk.prototype);

	return chalk;
};

function createChalk(options) {
	return chalkFactory(options);
}

Object.setPrototypeOf(createChalk.prototype, Function.prototype);

for (const [styleName, style] of Object.entries(ansiStyles)) {
	styles[styleName] = {
		get() {
			const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
			Object.defineProperty(this, styleName, {value: builder});
			return builder;
		},
	};
}

styles.visible = {
	get() {
		const builder = createBuilder(this, this[STYLER], true);
		Object.defineProperty(this, 'visible', {value: builder});
		return builder;
	},
};

const getModelAnsi = (model, level, type, ...arguments_) => {
	if (model === 'rgb') {
		if (level === 'ansi16m') {
			return ansiStyles[type].ansi16m(...arguments_);
		}

		if (level === 'ansi256') {
			return ansiStyles[type].ansi256(ansiStyles.rgbToAnsi256(...arguments_));
		}

		return ansiStyles[type].ansi(ansiStyles.rgbToAnsi(...arguments_));
	}

	if (model === 'hex') {
		return getModelAnsi('rgb', level, type, ...ansiStyles.hexToRgb(...arguments_));
	}

	return ansiStyles[type][model](...arguments_);
};

const usedModels = ['rgb', 'hex', 'ansi256'];

for (const model of usedModels) {
	styles[model] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(getModelAnsi(model, levelMapping[level], 'color', ...arguments_), ansiStyles.color.close, this[STYLER]);
				return createBuilder(this, styler, this[IS_EMPTY]);
			};
		},
	};

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(getModelAnsi(model, levelMapping[level], 'bgColor', ...arguments_), ansiStyles.bgColor.close, this[STYLER]);
				return createBuilder(this, styler, this[IS_EMPTY]);
			};
		},
	};
}

const proto = Object.defineProperties(() => {}, {
	...styles,
	level: {
		enumerable: true,
		get() {
			return this[GENERATOR].level;
		},
		set(level) {
			this[GENERATOR].level = level;
		},
	},
});

const createStyler = (open, close, parent) => {
	let openAll;
	let closeAll;
	if (parent === undefined) {
		openAll = open;
		closeAll = close;
	} else {
		openAll = parent.openAll + open;
		closeAll = close + parent.closeAll;
	}

	return {
		open,
		close,
		openAll,
		closeAll,
		parent,
	};
};

const createBuilder = (self, _styler, _isEmpty) => {
	// Single argument is hot path, implicit coercion is faster than anything
	// eslint-disable-next-line no-implicit-coercion
	const builder = (...arguments_) => applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));

	// We alter the prototype because we must return a function, but there is
	// no way to create a function with a different prototype
	Object.setPrototypeOf(builder, proto);

	builder[GENERATOR] = self;
	builder[STYLER] = _styler;
	builder[IS_EMPTY] = _isEmpty;

	return builder;
};

const applyStyle = (self, string) => {
	if (self.level <= 0 || !string) {
		return self[IS_EMPTY] ? '' : string;
	}

	let styler = self[STYLER];

	if (styler === undefined) {
		return string;
	}

	const {openAll, closeAll} = styler;
	if (string.includes('\u001B')) {
		while (styler !== undefined) {
			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			string = stringReplaceAll(string, styler.close, styler.open);

			styler = styler.parent;
		}
	}

	// We can move both next actions out of loop, because remaining actions in loop won't have
	// any/visible effect on parts we add here. Close the styling before a linebreak and reopen
	// after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
	const lfIndex = string.indexOf('\n');
	if (lfIndex !== -1) {
		string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
	}

	return openAll + string + closeAll;
};

Object.defineProperties(createChalk.prototype, styles);

const chalk = createChalk();
createChalk({level: stderrColor ? stderrColor.level : 0});

const ESC = '\u001B[';
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';
const isTerminalApp = process.env.TERM_PROGRAM === 'Apple_Terminal';

const ansiEscapes = {};

ansiEscapes.cursorTo = (x, y) => {
	if (typeof x !== 'number') {
		throw new TypeError('The `x` argument is required');
	}

	if (typeof y !== 'number') {
		return ESC + (x + 1) + 'G';
	}

	return ESC + (y + 1) + ';' + (x + 1) + 'H';
};

ansiEscapes.cursorMove = (x, y) => {
	if (typeof x !== 'number') {
		throw new TypeError('The `x` argument is required');
	}

	let returnValue = '';

	if (x < 0) {
		returnValue += ESC + (-x) + 'D';
	} else if (x > 0) {
		returnValue += ESC + x + 'C';
	}

	if (y < 0) {
		returnValue += ESC + (-y) + 'A';
	} else if (y > 0) {
		returnValue += ESC + y + 'B';
	}

	return returnValue;
};

ansiEscapes.cursorUp = (count = 1) => ESC + count + 'A';
ansiEscapes.cursorDown = (count = 1) => ESC + count + 'B';
ansiEscapes.cursorForward = (count = 1) => ESC + count + 'C';
ansiEscapes.cursorBackward = (count = 1) => ESC + count + 'D';

ansiEscapes.cursorLeft = ESC + 'G';
ansiEscapes.cursorSavePosition = isTerminalApp ? '\u001B7' : ESC + 's';
ansiEscapes.cursorRestorePosition = isTerminalApp ? '\u001B8' : ESC + 'u';
ansiEscapes.cursorGetPosition = ESC + '6n';
ansiEscapes.cursorNextLine = ESC + 'E';
ansiEscapes.cursorPrevLine = ESC + 'F';
ansiEscapes.cursorHide = ESC + '?25l';
ansiEscapes.cursorShow = ESC + '?25h';

ansiEscapes.eraseLines = count => {
	let clear = '';

	for (let i = 0; i < count; i++) {
		clear += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : '');
	}

	if (count) {
		clear += ansiEscapes.cursorLeft;
	}

	return clear;
};

ansiEscapes.eraseEndLine = ESC + 'K';
ansiEscapes.eraseStartLine = ESC + '1K';
ansiEscapes.eraseLine = ESC + '2K';
ansiEscapes.eraseDown = ESC + 'J';
ansiEscapes.eraseUp = ESC + '1J';
ansiEscapes.eraseScreen = ESC + '2J';
ansiEscapes.scrollUp = ESC + 'S';
ansiEscapes.scrollDown = ESC + 'T';

ansiEscapes.clearScreen = '\u001Bc';

ansiEscapes.clearTerminal = process.platform === 'win32' ?
	`${ansiEscapes.eraseScreen}${ESC}0f` :
	// 1. Erases the screen (Only done in case `2` is not supported)
	// 2. Erases the whole screen including scrollback buffer
	// 3. Moves cursor to the top-left position
	// More info: https://www.real-world-systems.com/docs/ANSIcode.html
	`${ansiEscapes.eraseScreen}${ESC}3J${ESC}H`;

ansiEscapes.beep = BEL;

ansiEscapes.link = (text, url) => {
	return [
		OSC,
		'8',
		SEP,
		SEP,
		url,
		BEL,
		text,
		OSC,
		'8',
		SEP,
		SEP,
		BEL
	].join('');
};

ansiEscapes.image = (buffer, options = {}) => {
	let returnValue = `${OSC}1337;File=inline=1`;

	if (options.width) {
		returnValue += `;width=${options.width}`;
	}

	if (options.height) {
		returnValue += `;height=${options.height}`;
	}

	if (options.preserveAspectRatio === false) {
		returnValue += ';preserveAspectRatio=0';
	}

	return returnValue + ':' + buffer.toString('base64') + BEL;
};

ansiEscapes.iTerm = {
	setCwd: (cwd = process.cwd()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,

	annotation: (message, options = {}) => {
		let returnValue = `${OSC}1337;`;

		const hasX = typeof options.x !== 'undefined';
		const hasY = typeof options.y !== 'undefined';
		if ((hasX || hasY) && !(hasX && hasY && typeof options.length !== 'undefined')) {
			throw new Error('`x`, `y` and `length` must be defined when `x` or `y` is defined');
		}

		message = message.replace(/\|/g, '');

		returnValue += options.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation=';

		if (options.length > 0) {
			returnValue +=
					(hasX ?
						[message, options.length, options.x, options.y] :
						[options.length, message]).join('|');
		} else {
			returnValue += message;
		}

		return returnValue + BEL;
	}
};

var TABLE_CELL_SPLIT = '^*||*^';
var TABLE_ROW_WRAP = '*|*|*|*';
var TABLE_ROW_WRAP_REGEXP = new RegExp(escapeRegExp(TABLE_ROW_WRAP), 'g');

var COLON_REPLACER = '*#COLON|*';
var COLON_REPLACER_REGEXP = new RegExp(escapeRegExp(COLON_REPLACER), 'g');

var TAB_ALLOWED_CHARACTERS = ['\t'];

// HARD_RETURN holds a character sequence used to indicate text has a
// hard (no-reflowing) line break.  Previously \r and \r\n were turned
// into \n in marked's lexer- preprocessing step. So \r is safe to use
// to indicate a hard (non-reflowed) return.
var HARD_RETURN = '\r',
  HARD_RETURN_RE = new RegExp(HARD_RETURN),
  HARD_RETURN_GFM_RE = new RegExp(HARD_RETURN + '|<br />');

var defaultOptions = {
  code: chalk.yellow,
  blockquote: chalk.gray.italic,
  html: chalk.gray,
  heading: chalk.green.bold,
  firstHeading: chalk.magenta.underline.bold,
  hr: chalk.reset,
  listitem: chalk.reset,
  list: list,
  table: chalk.reset,
  paragraph: chalk.reset,
  strong: chalk.bold,
  em: chalk.italic,
  codespan: chalk.yellow,
  del: chalk.dim.gray.strikethrough,
  link: chalk.blue,
  href: chalk.blue.underline,
  text: identity,
  unescape: true,
  emoji: true,
  width: 80,
  showSectionPrefix: true,
  reflowText: false,
  tab: 4,
  tableOptions: {}
};

function Renderer(options, highlightOptions) {
  this.o = Object.assign({}, defaultOptions, options);
  this.tab = sanitizeTab(this.o.tab, defaultOptions.tab);
  this.tableSettings = this.o.tableOptions;
  this.emoji = this.o.emoji ? insertEmojis : identity;
  this.unescape = this.o.unescape ? unescapeEntities : identity;
  this.highlightOptions = highlightOptions || {};

  this.transform = compose(undoColon, this.unescape, this.emoji);
}

// Compute length of str not including ANSI escape codes.
// See http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
function textLength(str) {
  return str.replace(/\u001b\[(?:\d{1,3})(?:;\d{1,3})*m/g, '').length;
}

Renderer.prototype.textLength = textLength;

function fixHardReturn(text, reflow) {
  return reflow ? text.replace(HARD_RETURN, /\n/g) : text;
}

Renderer.prototype.text = function (text) {
  return this.o.text(text);
};

Renderer.prototype.code = function (code, lang, escaped) {
  return section(
    indentify(this.tab, highlight(code, lang, this.o, this.highlightOptions))
  );
};

Renderer.prototype.blockquote = function (quote) {
  return section(this.o.blockquote(indentify(this.tab, quote.trim())));
};

Renderer.prototype.html = function (html) {
  return this.o.html(html);
};

Renderer.prototype.heading = function (text, level, raw) {
  text = this.transform(text);

  var prefix = this.o.showSectionPrefix
    ? new Array(level + 1).join('#') + ' '
    : '';
  text = prefix + text;
  if (this.o.reflowText) {
    text = reflowText(text, this.o.width, this.options.gfm);
  }
  return section(
    level === 1 ? this.o.firstHeading(text) : this.o.heading(text)
  );
};

Renderer.prototype.hr = function () {
  return section(this.o.hr(hr('-', this.o.reflowText && this.o.width)));
};

Renderer.prototype.list = function (body, ordered) {
  body = this.o.list(body, ordered, this.tab);
  return section(fixNestedLists(indentLines(this.tab, body), this.tab));
};

Renderer.prototype.listitem = function (text) {
  var transform = compose(this.o.listitem, this.transform);
  var isNested = text.indexOf('\n') !== -1;
  if (isNested) text = text.trim();

  // Use BULLET_POINT as a marker for ordered or unordered list item
  return '\n' + BULLET_POINT + transform(text);
};

Renderer.prototype.checkbox = function (checked) {
  return '[' + (checked ? 'X' : ' ') + '] ';
};

Renderer.prototype.paragraph = function (text) {
  var transform = compose(this.o.paragraph, this.transform);
  text = transform(text);
  if (this.o.reflowText) {
    text = reflowText(text, this.o.width, this.options.gfm);
  }
  return section(text);
};

Renderer.prototype.table = function (header, body) {
  var table = new Table__default["default"](
    Object.assign(
      {},
      {
        head: generateTableRow(header)[0]
      },
      this.tableSettings
    )
  );

  generateTableRow(body, this.transform).forEach(function (row) {
    table.push(row);
  });
  return section(this.o.table(table.toString()));
};

Renderer.prototype.tablerow = function (content) {
  return TABLE_ROW_WRAP + content + TABLE_ROW_WRAP + '\n';
};

Renderer.prototype.tablecell = function (content, flags) {
  return content + TABLE_CELL_SPLIT;
};

// span level renderer
Renderer.prototype.strong = function (text) {
  return this.o.strong(text);
};

Renderer.prototype.em = function (text) {
  text = fixHardReturn(text, this.o.reflowText);
  return this.o.em(text);
};

Renderer.prototype.codespan = function (text) {
  text = fixHardReturn(text, this.o.reflowText);
  return this.o.codespan(text.replace(/:/g, COLON_REPLACER));
};

Renderer.prototype.br = function () {
  return this.o.reflowText ? HARD_RETURN : '\n';
};

Renderer.prototype.del = function (text) {
  return this.o.del(text);
};

Renderer.prototype.link = function (href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0) {
      return '';
    }
  }

  var hasText = text && text !== href;

  var out = '';

  if (supportsHyperlinks__default["default"].stdout) {
    let link = '';
    if (text) {
      link = this.o.href(this.emoji(text));
    } else {
      link = this.o.href(href);
    }
    out = ansiEscapes.link(link, href);
  } else {
    if (hasText) out += this.emoji(text) + ' (';
    out += this.o.href(href);
    if (hasText) out += ')';
  }
  return this.o.link(out);
};

Renderer.prototype.image = function (href, title, text) {
  if (typeof this.o.image === 'function') {
    return this.o.image(href, title, text);
  }
  var out = '![' + text;
  if (title) out += ' – ' + title;
  return out + '](' + href + ')\n';
};

// Munge \n's and spaces in "text" so that the number of
// characters between \n's is less than or equal to "width".
function reflowText(text, width, gfm) {
  // Hard break was inserted by Renderer.prototype.br or is
  // <br /> when gfm is true
  var splitRe = gfm ? HARD_RETURN_GFM_RE : HARD_RETURN_RE,
    sections = text.split(splitRe),
    reflowed = [];

  sections.forEach(function (section) {
    // Split the section by escape codes so that we can
    // deal with them separately.
    var fragments = section.split(/(\u001b\[(?:\d{1,3})(?:;\d{1,3})*m)/g);
    var column = 0;
    var currentLine = '';
    var lastWasEscapeChar = false;

    while (fragments.length) {
      var fragment = fragments[0];

      if (fragment === '') {
        fragments.splice(0, 1);
        lastWasEscapeChar = false;
        continue;
      }

      // This is an escape code - leave it whole and
      // move to the next fragment.
      if (!textLength(fragment)) {
        currentLine += fragment;
        fragments.splice(0, 1);
        lastWasEscapeChar = true;
        continue;
      }

      var words = fragment.split(/[ \t\n]+/);

      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var addSpace = column != 0;
        if (lastWasEscapeChar) addSpace = false;

        // If adding the new word overflows the required width
        if (column + word.length + addSpace > width) {
          if (word.length <= width) {
            // If the new word is smaller than the required width
            // just add it at the beginning of a new line
            reflowed.push(currentLine);
            currentLine = word;
            column = word.length;
          } else {
            // If the new word is longer than the required width
            // split this word into smaller parts.
            var w = word.substr(0, width - column - addSpace);
            if (addSpace) currentLine += ' ';
            currentLine += w;
            reflowed.push(currentLine);
            currentLine = '';
            column = 0;

            word = word.substr(w.length);
            while (word.length) {
              var w = word.substr(0, width);

              if (!w.length) break;

              if (w.length < width) {
                currentLine = w;
                column = w.length;
                break;
              } else {
                reflowed.push(w);
                word = word.substr(width);
              }
            }
          }
        } else {
          if (addSpace) {
            currentLine += ' ';
            column++;
          }

          currentLine += word;
          column += word.length;
        }

        lastWasEscapeChar = false;
      }

      fragments.splice(0, 1);
    }

    if (textLength(currentLine)) reflowed.push(currentLine);
  });

  return reflowed.join('\n');
}

function indentLines(indent, text) {
  return text.replace(/(^|\n)(.+)/g, '$1' + indent + '$2');
}

function indentify(indent, text) {
  if (!text) return text;
  return indent + text.split('\n').join('\n' + indent);
}

var BULLET_POINT_REGEX = '\\*';
var NUMBERED_POINT_REGEX = '\\d+\\.';
var POINT_REGEX =
  '(?:' + [BULLET_POINT_REGEX, NUMBERED_POINT_REGEX].join('|') + ')';

// Prevents nested lists from joining their parent list's last line
function fixNestedLists(body, indent) {
  var regex = new RegExp(
    '' +
      '(\\S(?: |  )?)' + // Last char of current point, plus one or two spaces
      // to allow trailing spaces
      '((?:' +
      indent +
      ')+)' + // Indentation of sub point
      '(' +
      POINT_REGEX +
      '(?:.*)+)$',
    'gm'
  ); // Body of subpoint
  return body.replace(regex, '$1\n' + indent + '$2$3');
}

var isPointedLine = function (line, indent) {
  return line.match('^(?:' + indent + ')*' + POINT_REGEX);
};

function toSpaces(str) {
  return ' '.repeat(str.length);
}

var BULLET_POINT = '* ';
function bulletPointLine(indent, line) {
  return isPointedLine(line, indent) ? line : toSpaces(BULLET_POINT) + line;
}

function bulletPointLines(lines, indent) {
  var transform = bulletPointLine.bind(null, indent);
  return lines.split('\n').filter(identity).map(transform).join('\n');
}

var numberedPoint = function (n) {
  return n + '. ';
};
function numberedLine(indent, line, num) {
  return isPointedLine(line, indent)
    ? {
        num: num + 1,
        line: line.replace(BULLET_POINT, numberedPoint(num + 1))
      }
    : {
        num: num,
        line: toSpaces(numberedPoint(num)) + line
      };
}

function numberedLines(lines, indent) {
  var transform = numberedLine.bind(null, indent);
  let num = 0;
  return lines
    .split('\n')
    .filter(identity)
    .map((line) => {
      const numbered = transform(line, num);
      num = numbered.num;

      return numbered.line;
    })
    .join('\n');
}

function list(body, ordered, indent) {
  body = body.trim();
  body = ordered ? numberedLines(body, indent) : bulletPointLines(body, indent);
  return body;
}

function section(text) {
  return text + '\n\n';
}

function highlight(code, lang, opts, hightlightOpts) {
  if (chalk.level === 0) return code;

  var style = opts.code;

  code = fixHardReturn(code, opts.reflowText);
  if (lang !== 'javascript' && lang !== 'js') {
    return style(code);
  }

  try {
    return cardinal__default["default"].highlight(code, hightlightOpts);
  } catch (e) {
    return style(code);
  }
}

function insertEmojis(text) {
  return text.replace(/:([A-Za-z0-9_\-\+]+?):/g, function (emojiString) {
    var emojiSign = emoji__default["default"].get(emojiString);
    if (!emojiSign) return emojiString;
    return emojiSign + ' ';
  });
}

function hr(inputHrStr, length) {
  length = length || process.stdout.columns;
  return new Array(length).join(inputHrStr);
}

function undoColon(str) {
  return str.replace(COLON_REPLACER_REGEXP, ':');
}

function generateTableRow(text, escape) {
  if (!text) return [];
  escape = escape || identity;
  var lines = escape(text).split('\n');

  var data = [];
  lines.forEach(function (line) {
    if (!line) return;
    var parsed = line
      .replace(TABLE_ROW_WRAP_REGEXP, '')
      .split(TABLE_CELL_SPLIT);

    data.push(parsed.splice(0, parsed.length - 1));
  });
  return data;
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function unescapeEntities(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function identity(str) {
  return str;
}

function compose() {
  var funcs = arguments;
  return function () {
    var args = arguments;
    for (var i = funcs.length; i-- > 0; ) {
      args = [funcs[i].apply(this, args)];
    }
    return args[0];
  };
}

function isAllowedTabString(string) {
  return TAB_ALLOWED_CHARACTERS.some(function (char) {
    return string.match('^(' + char + ')+$');
  });
}

function sanitizeTab(tab, fallbackTab) {
  if (typeof tab === 'number') {
    return new Array(tab + 1).join(' ');
  } else if (typeof tab === 'string' && isAllowedTabString(tab)) {
    return tab;
  } else {
    return new Array(fallbackTab + 1).join(' ');
  }
}

module.exports = Renderer;
