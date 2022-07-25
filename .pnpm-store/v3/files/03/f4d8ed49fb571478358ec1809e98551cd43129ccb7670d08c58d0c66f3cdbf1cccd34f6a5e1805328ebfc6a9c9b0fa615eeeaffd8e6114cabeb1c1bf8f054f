/** @param {Partial<import('types').ResponseHeaders> | undefined} object */
function to_headers(object) {
	const headers = new Headers();

	if (object) {
		for (const key in object) {
			const value = object[key];
			if (!value) continue;

			if (Array.isArray(value)) {
				value.forEach((value) => {
					headers.append(key, /** @type {string} */ (value));
				});
			} else {
				headers.set(key, /** @type {string} */ (value));
			}
		}
	}

	return headers;
}

/**
 * Given an Accept header and a list of possible content types, pick
 * the most suitable one to respond with
 * @param {string} accept
 * @param {string[]} types
 */
function negotiate(accept, types) {
	/** @type {Array<{ type: string, subtype: string, q: number, i: number }>} */
	const parts = [];

	accept.split(',').forEach((str, i) => {
		const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);

		// no match equals invalid header — ignore
		if (match) {
			const [, type, subtype, q = '1'] = match;
			parts.push({ type, subtype, q: +q, i });
		}
	});

	parts.sort((a, b) => {
		if (a.q !== b.q) {
			return b.q - a.q;
		}

		if ((a.subtype === '*') !== (b.subtype === '*')) {
			return a.subtype === '*' ? 1 : -1;
		}

		if ((a.type === '*') !== (b.type === '*')) {
			return a.type === '*' ? 1 : -1;
		}

		return a.i - b.i;
	});

	let accepted;
	let min_priority = Infinity;

	for (const mimetype of types) {
		const [type, subtype] = mimetype.split('/');
		const priority = parts.findIndex(
			(part) =>
				(part.type === type || part.type === '*') &&
				(part.subtype === subtype || part.subtype === '*')
		);

		if (priority !== -1 && priority < min_priority) {
			accepted = mimetype;
			min_priority = priority;
		}
	}

	return accepted;
}

/**
 * Hash using djb2
 * @param {import('types').StrictBody} value
 */
function hash(value) {
	let hash = 5381;
	let i = value.length;

	if (typeof value === 'string') {
		while (i) hash = (hash * 33) ^ value.charCodeAt(--i);
	} else {
		while (i) hash = (hash * 33) ^ value[--i];
	}

	return (hash >>> 0).toString(36);
}

/** @param {Record<string, any>} obj */
function lowercase_keys(obj) {
	/** @type {Record<string, any>} */
	const clone = {};

	for (const key in obj) {
		clone[key.toLowerCase()] = obj[key];
	}

	return clone;
}

/** @param {any} body */
function is_pojo(body) {
	if (typeof body !== 'object') return false;

	if (body) {
		if (body instanceof Uint8Array) return false;
		if (body instanceof ReadableStream) return false;

		// if body is a node Readable, throw an error
		// TODO remove this for 1.0
		if (body._readableState && typeof body.pipe === 'function') {
			throw new Error('Node streams are no longer supported — use a ReadableStream instead');
		}
	}

	return true;
}

/**
 * Serialize an error into a JSON string, by copying its `name`, `message`
 * and (in dev) `stack`, plus any custom properties, plus recursively
 * serialized `cause` properties. This is necessary because
 * `JSON.stringify(error) === '{}'`
 * @param {Error} error
 * @param {(error: Error) => string | undefined} get_stack
 */
function serialize_error(error, get_stack) {
	return JSON.stringify(clone_error(error, get_stack));
}

/**
 * @param {Error} error
 * @param {(error: Error) => string | undefined} get_stack
 */
function clone_error(error, get_stack) {
	const {
		name,
		message,
		stack,
		// @ts-expect-error i guess typescript doesn't know about error.cause yet
		cause,
		...custom
	} = error;

	/** @type {Record<string, any>} */
	const object = { name, message, stack: get_stack(error) };

	if (cause) object.cause = clone_error(cause, get_stack);

	for (const key in custom) {
		// @ts-expect-error
		object[key] = custom[key];
	}

	return object;
}

// TODO: Remove for 1.0
/** @param {Record<string, any>} mod */
function check_method_names(mod) {
	['get', 'post', 'put', 'patch', 'del'].forEach((m) => {
		if (m in mod) {
			const replacement = m === 'del' ? 'DELETE' : m.toUpperCase();
			throw Error(
				`Endpoint method "${m}" has changed to "${replacement}". See https://github.com/sveltejs/kit/discussions/5359 for more information.`
			);
		}
	});
}

/** @type {import('types').SSRErrorPage} */
const GENERIC_ERROR = {
	id: '__error'
};

/** @param {string} body */
function error(body) {
	return new Response(body, {
		status: 500
	});
}

/** @param {unknown} s */
function is_string(s) {
	return typeof s === 'string' || s instanceof String;
}

const text_types = new Set([
	'application/xml',
	'application/json',
	'application/x-www-form-urlencoded',
	'multipart/form-data'
]);

const bodyless_status_codes = new Set([101, 204, 205, 304]);

/**
 * Decides how the body should be parsed based on its mime type
 *
 * @param {string | undefined | null} content_type The `content-type` header of a request/response.
 * @returns {boolean}
 */
function is_text(content_type) {
	if (!content_type) return true; // defaults to json
	const type = content_type.split(';')[0].toLowerCase(); // get the mime type

	return type.startsWith('text/') || type.endsWith('+xml') || text_types.has(type);
}

/**
 * @param {import('types').RequestEvent} event
 * @param {{ [method: string]: import('types').RequestHandler }} mod
 * @param {import('types').SSROptions} options
 * @returns {Promise<Response>}
 */
async function render_endpoint(event, mod, options) {
	const { method } = event.request;

	check_method_names(mod);

	/** @type {import('types').RequestHandler} */
	let handler = mod[method];

	if (!handler && method === 'HEAD') {
		handler = mod.GET;
	}

	if (!handler) {
		const allowed = [];

		for (const method in ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']) {
			if (mod[method]) allowed.push(method);
		}

		if (mod.GET || mod.HEAD) allowed.push('HEAD');

		return event.request.headers.get('x-sveltekit-load')
			? // TODO would be nice to avoid these requests altogether,
			  // by noting whether or not page endpoints export `get`
			  new Response(undefined, {
					status: 204
			  })
			: new Response(`${method} method not allowed`, {
					status: 405,
					headers: {
						// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
						// "The server must generate an Allow header field in a 405 status code response"
						allow: allowed.join(', ')
					}
			  });
	}

	const response = await handler(event);
	const preface = `Invalid response from route ${event.url.pathname}`;

	if (typeof response !== 'object') {
		return error(`${preface}: expected an object, got ${typeof response}`);
	}

	// TODO remove for 1.0
	// @ts-expect-error
	if (response.fallthrough) {
		throw new Error(
			'fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching'
		);
	}

	const { status = 200, body = {} } = response;
	const headers =
		response.headers instanceof Headers
			? new Headers(response.headers)
			: to_headers(response.headers);

	const type = headers.get('content-type');

	if (
		!is_text(type) &&
		!(body instanceof Uint8Array || body instanceof ReadableStream || is_string(body))
	) {
		return error(
			`${preface}: body must be an instance of string, Uint8Array or ReadableStream if content-type is not a supported textual content-type`
		);
	}

	/** @type {import('types').StrictBody} */
	let normalized_body;

	if (is_pojo(body) && (!type || type.startsWith('application/json'))) {
		headers.set('content-type', 'application/json; charset=utf-8');
		normalized_body =
			body instanceof Error ? serialize_error(body, options.get_stack) : JSON.stringify(body);
	} else {
		normalized_body = /** @type {import('types').StrictBody} */ (body);
	}

	if (
		(typeof normalized_body === 'string' || normalized_body instanceof Uint8Array) &&
		!headers.has('etag')
	) {
		const cache_control = headers.get('cache-control');
		if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
			headers.set('etag', `"${hash(normalized_body)}"`);
		}
	}

	return new Response(
		method !== 'HEAD' && !bodyless_status_codes.has(status) ? normalized_body : undefined,
		{
			status,
			headers
		}
	);
}

var chars$1 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return "new RegExp(" + stringifyString(thing.source) + ", \"" + thing.flags + "\")";
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars$1[num % chars$1.length] + name;
        num = ~~(num / chars$1.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped) {
            result += escaped[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

function noop() { }
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
Promise.resolve();

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

/**
 * @param {unknown} err
 * @return {Error}
 */
function coalesce_to_error(err) {
	return err instanceof Error ||
		(err && /** @type {any} */ (err).name && /** @type {any} */ (err).message)
		? /** @type {Error} */ (err)
		: new Error(JSON.stringify(err));
}

/**
 * Inside a script element, only `</script` and `<!--` hold special meaning to the HTML parser.
 *
 * The first closes the script element, so everything after is treated as raw HTML.
 * The second disables further parsing until `-->`, so the script element might be unexpectedly
 * kept open until until an unrelated HTML comment in the page.
 *
 * U+2028 LINE SEPARATOR and U+2029 PARAGRAPH SEPARATOR are escaped for the sake of pre-2018
 * browsers.
 *
 * @see tests for unsafe parsing examples.
 * @see https://html.spec.whatwg.org/multipage/scripting.html#restrictions-for-contents-of-script-elements
 * @see https://html.spec.whatwg.org/multipage/syntax.html#cdata-rcdata-restrictions
 * @see https://html.spec.whatwg.org/multipage/parsing.html#script-data-state
 * @see https://html.spec.whatwg.org/multipage/parsing.html#script-data-double-escaped-state
 * @see https://github.com/tc39/proposal-json-superset
 * @type {Record<string, string>}
 */
const render_json_payload_script_dict = {
	'<': '\\u003C',
	'\u2028': '\\u2028',
	'\u2029': '\\u2029'
};

const render_json_payload_script_regex = new RegExp(
	`[${Object.keys(render_json_payload_script_dict).join('')}]`,
	'g'
);

/**
 * Generates a raw HTML string containing a safe script element carrying JSON data and associated attributes.
 *
 * It escapes all the special characters needed to guarantee the element is unbroken, but care must
 * be taken to ensure it is inserted in the document at an acceptable position for a script element,
 * and that the resulting string isn't further modified.
 *
 * Attribute names must be type-checked so we don't need to escape them.
 *
 * @param {import('types').PayloadScriptAttributes} attrs A list of attributes to be added to the element.
 * @param {import('types').JSONValue} payload The data to be carried by the element. Must be serializable to JSON.
 * @returns {string} The raw HTML of a script element carrying the JSON payload.
 * @example const html = render_json_payload_script({ type: 'data', url: '/data.json' }, { foo: 'bar' });
 */
function render_json_payload_script(attrs, payload) {
	const safe_payload = JSON.stringify(payload).replace(
		render_json_payload_script_regex,
		(match) => render_json_payload_script_dict[match]
	);

	let safe_attrs = '';
	for (const [key, value] of Object.entries(attrs)) {
		if (value === undefined) continue;
		safe_attrs += ` sveltekit:data-${key}=${escape_html_attr(value)}`;
	}

	return `<script type="application/json"${safe_attrs}>${safe_payload}</script>`;
}

/**
 * When inside a double-quoted attribute value, only `&` and `"` hold special meaning.
 * @see https://html.spec.whatwg.org/multipage/parsing.html#attribute-value-(double-quoted)-state
 * @type {Record<string, string>}
 */
const escape_html_attr_dict = {
	'&': '&amp;',
	'"': '&quot;'
};

const escape_html_attr_regex = new RegExp(
	// special characters
	`[${Object.keys(escape_html_attr_dict).join('')}]|` +
		// high surrogate without paired low surrogate
		'[\\ud800-\\udbff](?![\\udc00-\\udfff])|' +
		// a valid surrogate pair, the only match with 2 code units
		// we match it so that we can match unpaired low surrogates in the same pass
		// TODO: use lookbehind assertions once they are widely supported: (?<![\ud800-udbff])[\udc00-\udfff]
		'[\\ud800-\\udbff][\\udc00-\\udfff]|' +
		// unpaired low surrogate (see previous match)
		'[\\udc00-\\udfff]',
	'g'
);

/**
 * Formats a string to be used as an attribute's value in raw HTML.
 *
 * It escapes unpaired surrogates (which are allowed in js strings but invalid in HTML), escapes
 * characters that are special in attributes, and surrounds the whole string in double-quotes.
 *
 * @param {string} str
 * @returns {string} Escaped string surrounded by double-quotes.
 * @example const html = `<tag data-value=${escape_html_attr('value')}>...</tag>`;
 */
function escape_html_attr(str) {
	const escaped_str = str.replace(escape_html_attr_regex, (match) => {
		if (match.length === 2) {
			// valid surrogate pair
			return match;
		}

		return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
	});

	return `"${escaped_str}"`;
}

const s = JSON.stringify;

const encoder = new TextEncoder();

/**
 * SHA-256 hashing function adapted from https://bitwiseshiftleft.github.io/sjcl
 * modified and redistributed under BSD license
 * @param {string} data
 */
function sha256(data) {
	if (!key[0]) precompute();

	const out = init.slice(0);
	const array = encode$1(data);

	for (let i = 0; i < array.length; i += 16) {
		const w = array.subarray(i, i + 16);

		let tmp;
		let a;
		let b;

		let out0 = out[0];
		let out1 = out[1];
		let out2 = out[2];
		let out3 = out[3];
		let out4 = out[4];
		let out5 = out[5];
		let out6 = out[6];
		let out7 = out[7];

		/* Rationale for placement of |0 :
		 * If a value can overflow is original 32 bits by a factor of more than a few
		 * million (2^23 ish), there is a possibility that it might overflow the
		 * 53-bit mantissa and lose precision.
		 *
		 * To avoid this, we clamp back to 32 bits by |'ing with 0 on any value that
		 * propagates around the loop, and on the hash state out[]. I don't believe
		 * that the clamps on out4 and on out0 are strictly necessary, but it's close
		 * (for out4 anyway), and better safe than sorry.
		 *
		 * The clamps on out[] are necessary for the output to be correct even in the
		 * common case and for short inputs.
		 */

		for (let i = 0; i < 64; i++) {
			// load up the input word for this round

			if (i < 16) {
				tmp = w[i];
			} else {
				a = w[(i + 1) & 15];

				b = w[(i + 14) & 15];

				tmp = w[i & 15] =
					(((a >>> 7) ^ (a >>> 18) ^ (a >>> 3) ^ (a << 25) ^ (a << 14)) +
						((b >>> 17) ^ (b >>> 19) ^ (b >>> 10) ^ (b << 15) ^ (b << 13)) +
						w[i & 15] +
						w[(i + 9) & 15]) |
					0;
			}

			tmp =
				tmp +
				out7 +
				((out4 >>> 6) ^ (out4 >>> 11) ^ (out4 >>> 25) ^ (out4 << 26) ^ (out4 << 21) ^ (out4 << 7)) +
				(out6 ^ (out4 & (out5 ^ out6))) +
				key[i]; // | 0;

			// shift register
			out7 = out6;
			out6 = out5;
			out5 = out4;

			out4 = (out3 + tmp) | 0;

			out3 = out2;
			out2 = out1;
			out1 = out0;

			out0 =
				(tmp +
					((out1 & out2) ^ (out3 & (out1 ^ out2))) +
					((out1 >>> 2) ^
						(out1 >>> 13) ^
						(out1 >>> 22) ^
						(out1 << 30) ^
						(out1 << 19) ^
						(out1 << 10))) |
				0;
		}

		out[0] = (out[0] + out0) | 0;
		out[1] = (out[1] + out1) | 0;
		out[2] = (out[2] + out2) | 0;
		out[3] = (out[3] + out3) | 0;
		out[4] = (out[4] + out4) | 0;
		out[5] = (out[5] + out5) | 0;
		out[6] = (out[6] + out6) | 0;
		out[7] = (out[7] + out7) | 0;
	}

	const bytes = new Uint8Array(out.buffer);
	reverse_endianness(bytes);

	return base64(bytes);
}

/** The SHA-256 initialization vector */
const init = new Uint32Array(8);

/** The SHA-256 hash key */
const key = new Uint32Array(64);

/** Function to precompute init and key. */
function precompute() {
	/** @param {number} x */
	function frac(x) {
		return (x - Math.floor(x)) * 0x100000000;
	}

	let prime = 2;

	for (let i = 0; i < 64; prime++) {
		let is_prime = true;

		for (let factor = 2; factor * factor <= prime; factor++) {
			if (prime % factor === 0) {
				is_prime = false;

				break;
			}
		}

		if (is_prime) {
			if (i < 8) {
				init[i] = frac(prime ** (1 / 2));
			}

			key[i] = frac(prime ** (1 / 3));

			i++;
		}
	}
}

/** @param {Uint8Array} bytes */
function reverse_endianness(bytes) {
	for (let i = 0; i < bytes.length; i += 4) {
		const a = bytes[i + 0];
		const b = bytes[i + 1];
		const c = bytes[i + 2];
		const d = bytes[i + 3];

		bytes[i + 0] = d;
		bytes[i + 1] = c;
		bytes[i + 2] = b;
		bytes[i + 3] = a;
	}
}

/** @param {string} str */
function encode$1(str) {
	const encoded = encoder.encode(str);
	const length = encoded.length * 8;

	// result should be a multiple of 512 bits in length,
	// with room for a 1 (after the data) and two 32-bit
	// words containing the original input bit length
	const size = 512 * Math.ceil((length + 65) / 512);
	const bytes = new Uint8Array(size / 8);
	bytes.set(encoded);

	// append a 1
	bytes[encoded.length] = 0b10000000;

	reverse_endianness(bytes);

	// add the input bit length
	const words = new Uint32Array(bytes.buffer);
	words[words.length - 2] = Math.floor(length / 0x100000000); // this will always be zero for us
	words[words.length - 1] = length;

	return words;
}

/*
	Based on https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727

	MIT License
	Copyright (c) 2020 Egor Nepomnyaschih
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/** @param {Uint8Array} bytes */
function base64(bytes) {
	const l = bytes.length;

	let result = '';
	let i;

	for (i = 2; i < l; i += 3) {
		result += chars[bytes[i - 2] >> 2];
		result += chars[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
		result += chars[((bytes[i - 1] & 0x0f) << 2) | (bytes[i] >> 6)];
		result += chars[bytes[i] & 0x3f];
	}

	if (i === l + 1) {
		// 1 octet yet to write
		result += chars[bytes[i - 2] >> 2];
		result += chars[(bytes[i - 2] & 0x03) << 4];
		result += '==';
	}

	if (i === l) {
		// 2 octets yet to write
		result += chars[bytes[i - 2] >> 2];
		result += chars[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
		result += chars[(bytes[i - 1] & 0x0f) << 2];
		result += '=';
	}

	return result;
}

const array = new Uint8Array(16);

function generate_nonce() {
	crypto.getRandomValues(array);
	return base64(array);
}

const quoted = new Set([
	'self',
	'unsafe-eval',
	'unsafe-hashes',
	'unsafe-inline',
	'none',
	'strict-dynamic',
	'report-sample'
]);

const crypto_pattern = /^(nonce|sha\d\d\d)-/;

// CSP and CSP Report Only are extremely similar with a few caveats
// the easiest/DRYest way to express this is with some private encapsulation
class BaseProvider {
	/** @type {boolean} */
	#use_hashes;

	/** @type {boolean} */
	#script_needs_csp;

	/** @type {boolean} */
	#style_needs_csp;

	/** @type {import('types').CspDirectives} */
	#directives;

	/** @type {import('types').Csp.Source[]} */
	#script_src;

	/** @type {import('types').Csp.Source[]} */
	#style_src;

	/** @type {string} */
	#nonce;

	/**
	 * @param {boolean} use_hashes
	 * @param {import('types').CspDirectives} directives
	 * @param {string} nonce
	 * @param {boolean} dev
	 */
	constructor(use_hashes, directives, nonce, dev) {
		this.#use_hashes = use_hashes;
		this.#directives = dev ? { ...directives } : directives; // clone in dev so we can safely mutate

		const d = this.#directives;

		if (dev) {
			// remove strict-dynamic in dev...
			// TODO reinstate this if we can figure out how to make strict-dynamic work
			// if (d['default-src']) {
			// 	d['default-src'] = d['default-src'].filter((name) => name !== 'strict-dynamic');
			// 	if (d['default-src'].length === 0) delete d['default-src'];
			// }

			// if (d['script-src']) {
			// 	d['script-src'] = d['script-src'].filter((name) => name !== 'strict-dynamic');
			// 	if (d['script-src'].length === 0) delete d['script-src'];
			// }

			const effective_style_src = d['style-src'] || d['default-src'];

			// ...and add unsafe-inline so we can inject <style> elements
			if (effective_style_src && !effective_style_src.includes('unsafe-inline')) {
				d['style-src'] = [...effective_style_src, 'unsafe-inline'];
			}
		}

		this.#script_src = [];
		this.#style_src = [];

		const effective_script_src = d['script-src'] || d['default-src'];
		const effective_style_src = d['style-src'] || d['default-src'];

		this.#script_needs_csp =
			!!effective_script_src &&
			effective_script_src.filter((value) => value !== 'unsafe-inline').length > 0;

		this.#style_needs_csp =
			!dev &&
			!!effective_style_src &&
			effective_style_src.filter((value) => value !== 'unsafe-inline').length > 0;

		this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
		this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
		this.#nonce = nonce;
	}

	/** @param {string} content */
	add_script(content) {
		if (this.#script_needs_csp) {
			if (this.#use_hashes) {
				this.#script_src.push(`sha256-${sha256(content)}`);
			} else if (this.#script_src.length === 0) {
				this.#script_src.push(`nonce-${this.#nonce}`);
			}
		}
	}

	/** @param {string} content */
	add_style(content) {
		if (this.#style_needs_csp) {
			if (this.#use_hashes) {
				this.#style_src.push(`sha256-${sha256(content)}`);
			} else if (this.#style_src.length === 0) {
				this.#style_src.push(`nonce-${this.#nonce}`);
			}
		}
	}

	/**
	 * @param {boolean} [is_meta]
	 */
	get_header(is_meta = false) {
		const header = [];

		// due to browser inconsistencies, we can't append sources to default-src
		// (specifically, Firefox appears to not ignore nonce-{nonce} directives
		// on default-src), so we ensure that script-src and style-src exist

		const directives = { ...this.#directives };

		if (this.#style_src.length > 0) {
			directives['style-src'] = [
				...(directives['style-src'] || directives['default-src'] || []),
				...this.#style_src
			];
		}

		if (this.#script_src.length > 0) {
			directives['script-src'] = [
				...(directives['script-src'] || directives['default-src'] || []),
				...this.#script_src
			];
		}

		for (const key in directives) {
			if (is_meta && (key === 'frame-ancestors' || key === 'report-uri' || key === 'sandbox')) {
				// these values cannot be used with a <meta> tag
				// TODO warn?
				continue;
			}

			// @ts-expect-error gimme a break typescript, `key` is obviously a member of internal_directives
			const value = /** @type {string[] | true} */ (directives[key]);

			if (!value) continue;

			const directive = [key];
			if (Array.isArray(value)) {
				value.forEach((value) => {
					if (quoted.has(value) || crypto_pattern.test(value)) {
						directive.push(`'${value}'`);
					} else {
						directive.push(value);
					}
				});
			}

			header.push(directive.join(' '));
		}

		return header.join('; ');
	}
}

class CspProvider extends BaseProvider {
	get_meta() {
		const content = escape_html_attr(this.get_header(true));
		return `<meta http-equiv="content-security-policy" content=${content}>`;
	}
}

class CspReportOnlyProvider extends BaseProvider {
	/**
	 * @param {boolean} use_hashes
	 * @param {import('types').CspDirectives} directives
	 * @param {string} nonce
	 * @param {boolean} dev
	 */
	constructor(use_hashes, directives, nonce, dev) {
		super(use_hashes, directives, nonce, dev);

		if (Object.values(directives).filter((v) => !!v).length > 0) {
			// If we're generating content-security-policy-report-only,
			// if there are any directives, we need a report-uri or report-to (or both)
			// else it's just an expensive noop.
			const has_report_to = directives['report-to']?.length ?? 0 > 0;
			const has_report_uri = directives['report-uri']?.length ?? 0 > 0;
			if (!has_report_to && !has_report_uri) {
				throw Error(
					'`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both'
				);
			}
		}
	}
}

class Csp {
	/** @readonly */
	nonce = generate_nonce();

	/** @type {CspProvider} */
	csp_provider;

	/** @type {CspReportOnlyProvider} */
	report_only_provider;

	/**
	 * @param {import('./types').CspConfig} config
	 * @param {import('./types').CspOpts} opts
	 */
	constructor({ mode, directives, reportOnly }, { prerender, dev }) {
		const use_hashes = mode === 'hash' || (mode === 'auto' && prerender);
		this.csp_provider = new CspProvider(use_hashes, directives, this.nonce, dev);
		this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce, dev);
	}

	get script_needs_nonce() {
		return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
	}

	get style_needs_nonce() {
		return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
	}

	/** @param {string} content */
	add_script(content) {
		this.csp_provider.add_script(content);
		this.report_only_provider.add_script(content);
	}

	/** @param {string} content */
	add_style(content) {
		this.csp_provider.add_style(content);
		this.report_only_provider.add_style(content);
	}
}

const absolute = /^([a-z]+:)?\/?\//;
const scheme = /^[a-z]+:/;

/**
 * @param {string} base
 * @param {string} path
 */
function resolve(base, path) {
	if (scheme.test(path)) return path;

	const base_match = absolute.exec(base);
	const path_match = absolute.exec(path);

	if (!base_match) {
		throw new Error(`bad base path: "${base}"`);
	}

	const baseparts = path_match ? [] : base.slice(base_match[0].length).split('/');
	const pathparts = path_match ? path.slice(path_match[0].length).split('/') : path.split('/');

	baseparts.pop();

	for (let i = 0; i < pathparts.length; i += 1) {
		const part = pathparts[i];
		if (part === '.') continue;
		else if (part === '..') baseparts.pop();
		else baseparts.push(part);
	}

	const prefix = (path_match && path_match[0]) || (base_match && base_match[0]) || '';

	return `${prefix}${baseparts.join('/')}`;
}

/** @param {string} path */
function is_root_relative(path) {
	return path[0] === '/' && path[1] !== '/';
}

/**
 * @param {string} path
 * @param {import('types').TrailingSlash} trailing_slash
 */
function normalize_path(path, trailing_slash) {
	if (path === '/' || trailing_slash === 'ignore') return path;

	if (trailing_slash === 'never') {
		return path.endsWith('/') ? path.slice(0, -1) : path;
	} else if (trailing_slash === 'always' && !path.endsWith('/')) {
		return path + '/';
	}

	return path;
}

/** @param {Record<string, string>} params */
function decode_params(params) {
	for (const key in params) {
		// input has already been decoded by decodeURI
		// now handle the rest that decodeURIComponent would do
		params[key] = params[key]
			.replace(/%23/g, '#')
			.replace(/%3[Bb]/g, ';')
			.replace(/%2[Cc]/g, ',')
			.replace(/%2[Ff]/g, '/')
			.replace(/%3[Ff]/g, '?')
			.replace(/%3[Aa]/g, ':')
			.replace(/%40/g, '@')
			.replace(/%26/g, '&')
			.replace(/%3[Dd]/g, '=')
			.replace(/%2[Bb]/g, '+')
			.replace(/%24/g, '$');
	}

	return params;
}

class LoadURL extends URL {
	/** @returns {string} */
	get hash() {
		throw new Error(
			'url.hash is inaccessible from load. Consider accessing hash from the page store within the script tag of your component.'
		);
	}
}

class PrerenderingURL extends URL {
	/** @returns {string} */
	get search() {
		throw new Error('Cannot access url.search on a page with prerendering enabled');
	}

	/** @returns {URLSearchParams} */
	get searchParams() {
		throw new Error('Cannot access url.searchParams on a page with prerendering enabled');
	}
}

// TODO rename this function/module

const updated = {
	...readable(false),
	check: () => false
};

/**
 * Creates the HTML response.
 * @param {{
 *   branch: Array<import('./types').Loaded>;
 *   options: import('types').SSROptions;
 *   state: import('types').SSRState;
 *   $session: any;
 *   page_config: { hydrate: boolean, router: boolean };
 *   status: number;
 *   error: Error | null;
 *   event: import('types').RequestEvent;
 *   resolve_opts: import('types').RequiredResolveOptions;
 *   stuff: Record<string, any>;
 * }} opts
 */
async function render_response({
	branch,
	options,
	state,
	$session,
	page_config,
	status,
	error = null,
	event,
	resolve_opts,
	stuff
}) {
	if (state.prerendering) {
		if (options.csp.mode === 'nonce') {
			throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
		}

		if (options.template_contains_nonce) {
			throw new Error('Cannot use prerendering if page template contains %sveltekit.nonce%');
		}
	}

	const { entry } = options.manifest._;

	const stylesheets = new Set(entry.stylesheets);
	const modulepreloads = new Set(entry.imports);

	/** @type {Map<string, string>} */
	// TODO if we add a client entry point one day, we will need to include inline_styles with the entry, otherwise stylesheets will be linked even if they are below inlineStyleThreshold
	const inline_styles = new Map();

	/** @type {Array<import('./types').Fetched>} */
	const serialized_data = [];

	let shadow_props;

	let rendered;

	let is_private = false;
	/** @type {import('types').NormalizedLoadOutputCache | undefined} */
	let cache;

	const stack = error?.stack;

	if (options.dev && error) {
		error.stack = options.get_stack(error);
	}

	if (resolve_opts.ssr) {
		const leaf = /** @type {import('./types.js').Loaded} */ (branch.at(-1));

		if (leaf.loaded.status) {
			// explicit status returned from `load` or a page endpoint trumps
			// initial status
			status = leaf.loaded.status;
		}

		for (const { node, props, loaded, fetched, uses_credentials } of branch) {
			if (node.imports) {
				node.imports.forEach((url) => modulepreloads.add(url));
			}

			if (node.stylesheets) {
				node.stylesheets.forEach((url) => stylesheets.add(url));
			}

			if (node.inline_styles) {
				Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
			}

			// TODO probably better if `fetched` wasn't populated unless `hydrate`
			if (fetched && page_config.hydrate) serialized_data.push(...fetched);
			if (props) shadow_props = props;

			cache = loaded?.cache;
			is_private = cache?.private ?? uses_credentials;
		}

		const session = writable($session);
		// Even if $session isn't accessed, it still ends up serialized in the rendered HTML
		is_private = is_private || (cache?.private ?? (!!$session && Object.keys($session).length > 0));

		/** @type {Record<string, any>} */
		const props = {
			stores: {
				page: writable(null),
				navigating: writable(null),
				session,
				updated
			},
			/** @type {import('types').Page} */
			page: {
				error,
				params: event.params,
				routeId: event.routeId,
				status,
				stuff,
				url: state.prerendering ? new PrerenderingURL(event.url) : event.url
			},
			components: branch.map(({ node }) => node.module.default)
		};

		// TODO remove this for 1.0
		/**
		 * @param {string} property
		 * @param {string} replacement
		 */
		const print_error = (property, replacement) => {
			Object.defineProperty(props.page, property, {
				get: () => {
					throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
				}
			});
		};

		print_error('origin', 'origin');
		print_error('path', 'pathname');
		print_error('query', 'searchParams');

		// props_n (instead of props[n]) makes it easy to avoid
		// unnecessary updates for layout components
		for (let i = 0; i < branch.length; i += 1) {
			props[`props_${i}`] = await branch[i].loaded.props;
		}

		rendered = options.root.render(props);
	} else {
		rendered = { head: '', html: '', css: { code: '', map: null } };
	}

	let { head, html: body } = rendered;

	const csp = new Csp(options.csp, {
		dev: options.dev,
		prerender: !!state.prerendering
	});

	const target = hash(body);

	// prettier-ignore
	const init_app = `
		import { start } from ${s(options.prefix + entry.file)};
		start({
			target: document.querySelector('[data-sveltekit-hydrate="${target}"]').parentNode,
			paths: ${s(options.paths)},
			session: ${try_serialize($session, (error) => {
				throw new Error(`Failed to serialize session data: ${error.message}`);
			})},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s(options.trailing_slash)},
			hydrate: ${resolve_opts.ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${error && serialize_error(error, e => e.stack)},
				nodes: [${branch.map(({ node }) => node.index).join(', ')}],
				params: ${devalue(event.params)},
				routeId: ${s(event.routeId)}
			}` : 'null'}
		});
	`;

	// we use an anonymous function instead of an arrow function to support
	// older browsers (https://github.com/sveltejs/kit/pull/5417)
	const init_service_worker = `
		if ('serviceWorker' in navigator) {
			addEventListener('load', function () {
				navigator.serviceWorker.register('${options.service_worker}');
			});
		}
	`;

	if (inline_styles.size > 0) {
		const content = Array.from(inline_styles.values()).join('\n');

		const attributes = [];
		if (options.dev) attributes.push(' data-sveltekit');
		if (csp.style_needs_nonce) attributes.push(` nonce="${csp.nonce}"`);

		csp.add_style(content);

		head += `\n\t<style${attributes.join('')}>${content}</style>`;
	}

	// prettier-ignore
	head += Array.from(stylesheets)
		.map((dep) => {
			const attributes = [
				'rel="stylesheet"',
				`href="${options.prefix + dep}"`
			];

			if (csp.style_needs_nonce) {
				attributes.push(`nonce="${csp.nonce}"`);
			}

			if (inline_styles.has(dep)) {
				// don't load stylesheets that are already inlined
				// include them in disabled state so that Vite can detect them and doesn't try to add them
				attributes.push('disabled', 'media="(max-width: 0)"');
			}

			return `\n\t<link ${attributes.join(' ')}>`;
		})
		.join('');

	if (page_config.router || page_config.hydrate) {
		head += Array.from(modulepreloads)
			.map((dep) => `\n\t<link rel="modulepreload" href="${options.prefix + dep}">`)
			.join('');

		const attributes = ['type="module"', `data-sveltekit-hydrate="${target}"`];

		csp.add_script(init_app);

		if (csp.script_needs_nonce) {
			attributes.push(`nonce="${csp.nonce}"`);
		}

		body += `\n\t\t<script ${attributes.join(' ')}>${init_app}</script>`;

		body += serialized_data
			.map(({ url, body, response }) =>
				render_json_payload_script(
					{ type: 'data', url, body: typeof body === 'string' ? hash(body) : undefined },
					response
				)
			)
			.join('\n\t');

		if (shadow_props) {
			body += render_json_payload_script({ type: 'props' }, shadow_props);
		}
	}

	if (options.service_worker) {
		// always include service worker unless it's turned off explicitly
		csp.add_script(init_service_worker);

		head += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ''}>${init_service_worker}</script>`;
	}

	if (state.prerendering) {
		const http_equiv = [];

		const csp_headers = csp.csp_provider.get_meta();
		if (csp_headers) {
			http_equiv.push(csp_headers);
		}

		if (cache) {
			http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${cache.maxage}">`);
		}

		if (http_equiv.length > 0) {
			head = http_equiv.join('\n') + head;
		}
	}

	const segments = event.url.pathname.slice(options.paths.base.length).split('/').slice(2);
	const assets =
		options.paths.assets || (segments.length > 0 ? segments.map(() => '..').join('/') : '.');

	// TODO flush chunks as early as we can
	const html =
		(await resolve_opts.transformPageChunk({
			html: options.template({ head, body, assets, nonce: /** @type {string} */ (csp.nonce) }),
			done: true
		})) || '';

	const headers = new Headers({
		'content-type': 'text/html',
		etag: `"${hash(html)}"`
	});

	if (cache) {
		headers.set('cache-control', `${is_private ? 'private' : 'public'}, max-age=${cache.maxage}`);
	}

	if (!state.prerendering) {
		const csp_header = csp.csp_provider.get_header();
		if (csp_header) {
			headers.set('content-security-policy', csp_header);
		}
		const report_only_header = csp.report_only_provider.get_header();
		if (report_only_header) {
			headers.set('content-security-policy-report-only', report_only_header);
		}
	}

	if (options.dev && error) {
		// reset stack, otherwise it may be 'fixed' a second time
		error.stack = stack;
	}

	return new Response(html, {
		status,
		headers
	});
}

/**
 * @param {any} data
 * @param {(error: Error) => void} [fail]
 */
function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(coalesce_to_error(err));
		return null;
	}
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse$1;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var __toString = Object.prototype.toString;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse$1(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;

  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf('=', index);

    // no more cookie pairs
    if (eqIdx === -1) {
      break
    }

    var endIdx = str.indexOf(';', index);

    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      // backtrack on prior semicolon
      index = str.lastIndexOf(';', eqIdx - 1) + 1;
      continue
    }

    var key = str.slice(index, eqIdx).trim();

    // only assign once
    if (undefined === obj[key]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();

      // quoted values
      if (val.charCodeAt(0) === 0x22) {
        val = val.slice(1, -1);
      }

      obj[key] = tryDecode(val, dec);
    }

    index = endIdx + 1;
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;

    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError('option maxAge is invalid')
    }

    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    var expires = opt.expires;

    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.priority) {
    var priority = typeof opt.priority === 'string'
      ? opt.priority.toLowerCase()
      : opt.priority;

    switch (priority) {
      case 'low':
        str += '; Priority=Low';
        break
      case 'medium':
        str += '; Priority=Medium';
        break
      case 'high':
        str += '; Priority=High';
        break
      default:
        throw new TypeError('option priority is invalid')
    }
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * URL-decode string value. Optimized to skip native call when no %.
 *
 * @param {string} str
 * @returns {string}
 */

function decode (str) {
  return str.indexOf('%') !== -1
    ? decodeURIComponent(str)
    : str
}

/**
 * URL-encode value.
 *
 * @param {string} str
 * @returns {string}
 */

function encode (val) {
  return encodeURIComponent(val)
}

/**
 * Determine if value is a Date.
 *
 * @param {*} val
 * @private
 */

function isDate (val) {
  return __toString.call(val) === '[object Date]' ||
    val instanceof Date
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var setCookie = {exports: {}};

var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false,
};

function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}

function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValue = parts.shift().split("=");
  var name = nameValue.shift();
  var value = nameValue.join("="); // everything after the first =, joined by a "=" if there was more than one part

  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;

  try {
    value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
  } catch (e) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" +
        value +
        "'. Set options.decodeValues to false to disable this feature.",
      e
    );
  }

  var cookie = {
    name: name, // grab everything before the first =
    value: value,
  };

  parts.forEach(function (part) {
    var sides = part.split("=");
    var key = sides.shift().trimLeft().toLowerCase();
    var value = sides.join("=");
    if (key === "expires") {
      cookie.expires = new Date(value);
    } else if (key === "max-age") {
      cookie.maxAge = parseInt(value, 10);
    } else if (key === "secure") {
      cookie.secure = true;
    } else if (key === "httponly") {
      cookie.httpOnly = true;
    } else if (key === "samesite") {
      cookie.sameSite = value;
    } else {
      cookie[key] = value;
    }
  });

  return cookie;
}

function parse(input, options) {
  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;

  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }

  if (input.headers && input.headers["set-cookie"]) {
    // fast-path for node.js (which automatically normalizes header names to lower-case
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    // slow-path for other environments - see #25
    var sch =
      input.headers[
        Object.keys(input.headers).find(function (key) {
          return key.toLowerCase() === "set-cookie";
        })
      ];
    // warn if called on a request-like object with a cookie header rather than a set-cookie header - see #34, 36
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn(
        "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
      );
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }

  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;

  if (!options.map) {
    return input.filter(isNonEmptyString).map(function (str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function (cookies, str) {
      var cookie = parseString(str, options);
      cookies[cookie.name] = cookie;
      return cookies;
    }, cookies);
  }
}

/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.

  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.

  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }

  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;

  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }

  function notSpecialChar() {
    ch = cookiesString.charAt(pos);

    return ch !== "=" && ch !== ";" && ch !== ",";
  }

  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;

    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        // ',' is a cookie separator if we have later first '=', not ';' or ','
        lastComma = pos;
        pos += 1;

        skipWhitespace();
        nextStart = pos;

        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }

        // currently special character
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          // we found cookies separator
          cookiesSeparatorFound = true;
          // pos is inside the next cookie, so back up and return it.
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          // in param ',' or param separator ';',
          // we continue from that comma
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }

    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }

  return cookiesStrings;
}

setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;

/**
 * @param {import('types').LoadOutput | void} loaded
 * @returns {import('types').NormalizedLoadOutput}
 */
function normalize(loaded) {
	if (!loaded) {
		return {};
	}

	// TODO remove for 1.0
	// @ts-expect-error
	if (loaded.fallthrough) {
		throw new Error(
			'fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching'
		);
	}

	// TODO remove for 1.0
	if ('maxage' in loaded) {
		throw new Error('maxage should be replaced with cache: { maxage }');
	}

	const has_error_status =
		loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
	if (loaded.error || has_error_status) {
		const status = loaded.status;

		if (!loaded.error && has_error_status) {
			return {
				status: status || 500,
				error: new Error(`${status}`)
			};
		}

		const error = typeof loaded.error === 'string' ? new Error(loaded.error) : loaded.error;

		if (!(error instanceof Error)) {
			return {
				status: 500,
				error: new Error(
					`"error" property returned from load() must be a string or instance of Error, received type "${typeof error}"`
				)
			};
		}

		if (!status || status < 400 || status > 599) {
			console.warn('"error" returned from load() without a valid status code — defaulting to 500');
			return { status: 500, error };
		}

		return { status, error };
	}

	if (loaded.redirect) {
		if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
			throw new Error(
				'"redirect" property returned from load() must be accompanied by a 3xx status code'
			);
		}

		if (typeof loaded.redirect !== 'string') {
			throw new Error('"redirect" property returned from load() must be a string');
		}
	}

	if (loaded.dependencies) {
		if (
			!Array.isArray(loaded.dependencies) ||
			loaded.dependencies.some((dep) => typeof dep !== 'string')
		) {
			throw new Error('"dependencies" property returned from load() must be of type string[]');
		}
	}

	// TODO remove before 1.0
	if (/** @type {any} */ (loaded).context) {
		throw new Error(
			'You are returning "context" from a load function. ' +
				'"context" was renamed to "stuff", please adjust your code accordingly.'
		);
	}

	return /** @type {import('types').NormalizedLoadOutput} */ (loaded);
}

/**
 * @param {string} hostname
 * @param {string} [constraint]
 */
function domain_matches(hostname, constraint) {
	if (!constraint) return true;

	const normalized = constraint[0] === '.' ? constraint.slice(1) : constraint;

	if (hostname === normalized) return true;
	return hostname.endsWith('.' + normalized);
}

/**
 * @param {string} path
 * @param {string} [constraint]
 */
function path_matches(path, constraint) {
	if (!constraint) return true;

	const normalized = constraint.endsWith('/') ? constraint.slice(0, -1) : constraint;

	if (path === normalized) return true;
	return path.startsWith(normalized + '/');
}

/**
 * Calls the user's `load` function.
 * @param {{
 *   event: import('types').RequestEvent;
 *   options: import('types').SSROptions;
 *   state: import('types').SSRState;
 *   route: import('types').SSRPage | import('types').SSRErrorPage;
 *   node: import('types').SSRNode;
 *   $session: any;
 *   stuff: Record<string, any>;
 *   is_error: boolean;
 *   is_leaf: boolean;
 *   status?: number;
 *   error?: Error;
 * }} opts
 * @returns {Promise<import('./types').Loaded>}
 */
async function load_node({
	event,
	options,
	state,
	route,
	node,
	$session,
	stuff,
	is_error,
	is_leaf,
	status,
	error
}) {
	const { module } = node;

	let uses_credentials = false;

	/** @type {Array<import('./types').Fetched>} */
	const fetched = [];

	const cookies = parse_1(event.request.headers.get('cookie') || '');

	/** @type {import('set-cookie-parser').Cookie[]} */
	const new_cookies = [];

	/** @type {import('types').NormalizedLoadOutput} */
	let loaded;

	const should_prerender = node.module.prerender ?? options.prerender.default;

	/** @type {import('types').ShadowData} */
	const shadow = is_leaf
		? await load_shadow_data(
				/** @type {import('types').SSRPage} */ (route),
				event,
				options,
				should_prerender
		  )
		: {};

	if (shadow.cookies) {
		shadow.cookies.forEach((header) => {
			new_cookies.push(parseString_1(header));
		});
	}

	if (shadow.error) {
		loaded = {
			error: shadow.error
		};
	} else if (shadow.redirect) {
		loaded = {
			redirect: shadow.redirect
		};
	} else if (module.load) {
		/** @type {import('types').LoadEvent} */
		const load_input = {
			url: state.prerendering ? new PrerenderingURL(event.url) : new LoadURL(event.url),
			params: event.params,
			props: shadow.body || {},
			routeId: event.routeId,
			get session() {
				if (node.module.prerender ?? options.prerender.default) {
					throw Error(
						'Attempted to access session from a prerendered page. Session would never be populated.'
					);
				}
				uses_credentials = true;
				return $session;
			},
			/**
			 * @param {RequestInfo} resource
			 * @param {RequestInit} opts
			 */
			fetch: async (resource, opts = {}) => {
				/** @type {string} */
				let requested;

				if (typeof resource === 'string') {
					requested = resource;
				} else {
					requested = resource.url;

					opts = {
						method: resource.method,
						headers: resource.headers,
						body: resource.body,
						mode: resource.mode,
						credentials: resource.credentials,
						cache: resource.cache,
						redirect: resource.redirect,
						referrer: resource.referrer,
						integrity: resource.integrity,
						...opts
					};
				}

				opts.headers = new Headers(opts.headers);

				// merge headers from request
				for (const [key, value] of event.request.headers) {
					if (
						key !== 'authorization' &&
						key !== 'connection' &&
						key !== 'cookie' &&
						key !== 'host' &&
						key !== 'if-none-match' &&
						!opts.headers.has(key)
					) {
						opts.headers.set(key, value);
					}
				}

				const resolved = resolve(event.url.pathname, requested.split('?')[0]);

				/** @type {Response} */
				let response;

				/** @type {import('types').PrerenderDependency} */
				let dependency;

				// handle fetch requests for static assets. e.g. prebaked data, etc.
				// we need to support everything the browser's fetch supports
				const prefix = options.paths.assets || options.paths.base;
				const filename = decodeURIComponent(
					resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved
				).slice(1);
				const filename_html = `${filename}/index.html`; // path may also match path/index.html

				const is_asset = options.manifest.assets.has(filename);
				const is_asset_html = options.manifest.assets.has(filename_html);

				if (is_asset || is_asset_html) {
					const file = is_asset ? filename : filename_html;

					if (options.read) {
						const type = is_asset
							? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf('.'))]
							: 'text/html';

						response = new Response(options.read(file), {
							headers: type ? { 'content-type': type } : {}
						});
					} else {
						response = await fetch(
							`${event.url.origin}/${file}`,
							/** @type {RequestInit} */ (opts)
						);
					}
				} else if (is_root_relative(resolved)) {
					if (opts.credentials !== 'omit') {
						uses_credentials = true;

						const authorization = event.request.headers.get('authorization');

						// combine cookies from the initiating request with any that were
						// added via set-cookie
						const combined_cookies = { ...cookies };

						for (const cookie of new_cookies) {
							if (!domain_matches(event.url.hostname, cookie.domain)) continue;
							if (!path_matches(resolved, cookie.path)) continue;

							combined_cookies[cookie.name] = cookie.value;
						}

						const cookie = Object.entries(combined_cookies)
							.map(([name, value]) => `${name}=${value}`)
							.join('; ');

						if (cookie) {
							opts.headers.set('cookie', cookie);
						}

						if (authorization && !opts.headers.has('authorization')) {
							opts.headers.set('authorization', authorization);
						}
					}

					if (opts.body && typeof opts.body !== 'string') {
						// per https://developer.mozilla.org/en-US/docs/Web/API/Request/Request, this can be a
						// Blob, BufferSource, FormData, URLSearchParams, USVString, or ReadableStream object.
						// non-string bodies are irksome to deal with, but luckily aren't particularly useful
						// in this context anyway, so we take the easy route and ban them
						throw new Error('Request body must be a string');
					}

					response = await respond(
						new Request(new URL(requested, event.url).href, { ...opts }),
						options,
						{
							...state,
							initiator: route
						}
					);

					if (state.prerendering) {
						dependency = { response, body: null };
						state.prerendering.dependencies.set(resolved, dependency);
					}
				} else {
					// external
					if (resolved.startsWith('//')) {
						requested = event.url.protocol + requested;
					}

					// external fetch
					// allow cookie passthrough for "same-origin"
					// if SvelteKit is serving my.domain.com:
					// -        domain.com WILL NOT receive cookies
					// -     my.domain.com WILL receive cookies
					// -    api.domain.dom WILL NOT receive cookies
					// - sub.my.domain.com WILL receive cookies
					// ports do not affect the resolution
					// leading dot prevents mydomain.com matching domain.com
					if (
						`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) &&
						opts.credentials !== 'omit'
					) {
						uses_credentials = true;

						const cookie = event.request.headers.get('cookie');
						if (cookie) opts.headers.set('cookie', cookie);
					}

					// we need to delete the connection header, as explained here:
					// https://github.com/nodejs/undici/issues/1470#issuecomment-1140798467
					// TODO this may be a case for being selective about which headers we let through
					opts.headers.delete('connection');

					const external_request = new Request(requested, /** @type {RequestInit} */ (opts));
					response = await options.hooks.externalFetch.call(null, external_request);
				}

				const set_cookie = response.headers.get('set-cookie');
				if (set_cookie) {
					new_cookies.push(
						...splitCookiesString_1(set_cookie)
							.map((str) => parseString_1(str))
					);
				}

				const proxy = new Proxy(response, {
					get(response, key, _receiver) {
						async function text() {
							const body = await response.text();

							/** @type {import('types').ResponseHeaders} */
							const headers = {};
							for (const [key, value] of response.headers) {
								// TODO skip others besides set-cookie and etag?
								if (key !== 'set-cookie' && key !== 'etag') {
									headers[key] = value;
								}
							}

							if (!opts.body || typeof opts.body === 'string') {
								const status_number = Number(response.status);
								if (isNaN(status_number)) {
									throw new Error(
										`response.status is not a number. value: "${
											response.status
										}" type: ${typeof response.status}`
									);
								}

								fetched.push({
									url: requested,
									body: opts.body,
									response: {
										status: status_number,
										statusText: response.statusText,
										headers,
										body
									}
								});
							}

							if (dependency) {
								dependency.body = body;
							}

							return body;
						}

						if (key === 'arrayBuffer') {
							return async () => {
								const buffer = await response.arrayBuffer();

								if (dependency) {
									dependency.body = new Uint8Array(buffer);
								}

								// TODO should buffer be inlined into the page (albeit base64'd)?
								// any conditions in which it shouldn't be?

								return buffer;
							};
						}

						if (key === 'text') {
							return text;
						}

						if (key === 'json') {
							return async () => {
								return JSON.parse(await text());
							};
						}

						// TODO arrayBuffer?

						return Reflect.get(response, key, response);
					}
				});

				return proxy;
			},
			stuff: { ...stuff },
			status: (is_error ? status : shadow.status) ?? null,
			error: is_error ? error ?? null : null
		};

		if (options.dev) {
			// TODO remove this for 1.0
			Object.defineProperty(load_input, 'page', {
				get: () => {
					throw new Error('`page` in `load` functions has been replaced by `url` and `params`');
				}
			});
		}

		loaded = normalize(await module.load.call(null, load_input));
	} else if (shadow.body) {
		loaded = {
			props: shadow.body
		};
	} else {
		loaded = {};
	}

	loaded.status = loaded.status ?? shadow.status;

	// generate __data.json files when prerendering
	if (shadow.body && state.prerendering) {
		const pathname = `${event.url.pathname.replace(/\/$/, '')}/__data.json`;

		const dependency = {
			response: new Response(undefined),
			body: JSON.stringify(shadow.body)
		};

		state.prerendering.dependencies.set(pathname, dependency);
	}

	return {
		node,
		props: shadow.body,
		loaded,
		stuff: loaded.stuff || stuff,
		fetched,
		set_cookie_headers: new_cookies.map((new_cookie) => {
			const { name, value, ...options } = new_cookie;
			// @ts-expect-error
			return serialize_1(name, value, options);
		}),
		uses_credentials
	};
}

/**
 *
 * @param {import('types').SSRPage} route
 * @param {import('types').RequestEvent} event
 * @param {import('types').SSROptions} options
 * @param {boolean} prerender
 * @returns {Promise<import('types').ShadowData>}
 */
async function load_shadow_data(route, event, options, prerender) {
	if (!route.shadow) return {};

	try {
		const mod = await route.shadow();

		check_method_names(mod);

		if (prerender && (mod.POST || mod.PUT || mod.DELETE || mod.PATCH)) {
			throw new Error('Cannot prerender pages that have endpoints with mutative methods');
		}

		const { method } = event.request;
		const is_get = method === 'HEAD' || method === 'GET';
		const handler = method === 'HEAD' ? mod.HEAD || mod.GET : mod[method];

		if (!handler && !is_get) {
			return {
				status: 405,
				error: new Error(`${method} method not allowed`)
			};
		}

		/** @type {import('types').ShadowData} */
		const data = {
			status: undefined,
			cookies: [],
			body: {}
		};

		if (!is_get) {
			const { status, headers, body } = validate_shadow_output(await handler(event));
			add_cookies(/** @type {string[]} */ (data.cookies), headers);
			data.status = status;

			// explicit errors cause an error page...
			if (body instanceof Error) {
				if (status < 400) {
					data.status = 500;
					data.error = new Error('A non-error status code was returned with an error body');
				} else {
					data.error = body;
				}

				return data;
			}

			// ...redirects are respected...
			if (status >= 300 && status < 400) {
				data.redirect = /** @type {string} */ (
					headers instanceof Headers ? headers.get('location') : headers.location
				);
				return data;
			}

			// ...but 4xx and 5xx status codes _don't_ result in the error page
			// rendering for non-GET requests — instead, we allow the page
			// to render with any validation errors etc that were returned
			data.body = body;
		}

		const get = (method === 'HEAD' && mod.HEAD) || mod.GET;
		if (get) {
			const { status, headers, body } = validate_shadow_output(await get(event));
			add_cookies(/** @type {string[]} */ (data.cookies), headers);

			if (body instanceof Error) {
				if (status < 400) {
					data.status = 500;
					data.error = new Error('A non-error status code was returned with an error body');
				} else {
					data.status = status;
					data.error = body;
				}

				return data;
			}

			if (status >= 400) {
				data.status = status;
				data.error = new Error('Failed to load data');
				return data;
			}

			if (status >= 300) {
				data.status = status;
				data.redirect = /** @type {string} */ (
					headers instanceof Headers ? headers.get('location') : headers.location
				);
				return data;
			}

			data.body = { ...body, ...data.body };
		}

		return data;
	} catch (e) {
		const error = coalesce_to_error(e);
		options.handle_error(error, event);

		return {
			status: 500,
			error
		};
	}
}

/**
 * @param {string[]} target
 * @param {Partial<import('types').ResponseHeaders>} headers
 */
function add_cookies(target, headers) {
	const cookies = headers['set-cookie'];
	if (cookies) {
		if (Array.isArray(cookies)) {
			target.push(...cookies);
		} else {
			target.push(/** @type {string} */ (cookies));
		}
	}
}

/**
 * @param {import('types').ShadowEndpointOutput} result
 */
function validate_shadow_output(result) {
	// TODO remove for 1.0
	// @ts-expect-error
	if (result.fallthrough) {
		throw new Error(
			'fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching'
		);
	}

	const { status = 200, body = {} } = result;
	let headers = result.headers || {};

	if (headers instanceof Headers) {
		if (headers.has('set-cookie')) {
			throw new Error(
				'Endpoint request handler cannot use Headers interface with Set-Cookie headers'
			);
		}
	} else {
		headers = lowercase_keys(/** @type {Record<string, string>} */ (headers));
	}

	if (!is_pojo(body)) {
		throw new Error(
			'Body returned from endpoint request handler must be a plain object or an Error'
		);
	}

	return { status, headers, body };
}

/**
 * @typedef {import('./types.js').Loaded} Loaded
 * @typedef {import('types').SSROptions} SSROptions
 * @typedef {import('types').SSRState} SSRState
 */

/**
 * @param {{
 *   event: import('types').RequestEvent;
 *   options: SSROptions;
 *   state: SSRState;
 *   $session: any;
 *   status: number;
 *   error: Error;
 *   resolve_opts: import('types').RequiredResolveOptions;
 * }} opts
 */
async function respond_with_error({
	event,
	options,
	state,
	$session,
	status,
	error,
	resolve_opts
}) {
	try {
		const branch = [];
		let stuff = {};

		if (resolve_opts.ssr) {
			const default_layout = await options.manifest._.nodes[0](); // 0 is always the root layout
			const default_error = await options.manifest._.nodes[1](); // 1 is always the root error

			const layout_loaded = /** @type {Loaded} */ (
				await load_node({
					event,
					options,
					state,
					route: GENERIC_ERROR,
					node: default_layout,
					$session,
					stuff: {},
					is_error: false,
					is_leaf: false
				})
			);

			if (layout_loaded.loaded.error) {
				throw layout_loaded.loaded.error;
			}

			const error_loaded = /** @type {Loaded} */ (
				await load_node({
					event,
					options,
					state,
					route: GENERIC_ERROR,
					node: default_error,
					$session,
					stuff: layout_loaded ? layout_loaded.stuff : {},
					is_error: true,
					is_leaf: false,
					status,
					error
				})
			);

			branch.push(layout_loaded, error_loaded);
			stuff = error_loaded.stuff;
		}

		return await render_response({
			options,
			state,
			$session,
			page_config: {
				hydrate: options.hydrate,
				router: options.router
			},
			stuff,
			status,
			error,
			branch,
			event,
			resolve_opts
		});
	} catch (err) {
		const error = coalesce_to_error(err);

		options.handle_error(error, event);

		return new Response(error.stack, {
			status: 500
		});
	}
}

/**
 * @typedef {import('./types.js').Loaded} Loaded
 * @typedef {import('types').SSRNode} SSRNode
 * @typedef {import('types').SSROptions} SSROptions
 * @typedef {import('types').SSRState} SSRState
 */

/**
 * Gets the nodes, calls `load` for each of them, and then calls render to build the HTML response.
 * @param {{
 *   event: import('types').RequestEvent;
 *   options: SSROptions;
 *   state: SSRState;
 *   $session: any;
 *   resolve_opts: import('types').RequiredResolveOptions;
 *   route: import('types').SSRPage;
 * }} opts
 * @returns {Promise<Response>}
 */
async function respond$1(opts) {
	const { event, options, state, $session, route, resolve_opts } = opts;

	/** @type {Array<SSRNode | undefined>} */
	let nodes;

	if (!resolve_opts.ssr) {
		return await render_response({
			...opts,
			branch: [],
			page_config: {
				hydrate: true,
				router: true
			},
			status: 200,
			error: null,
			event,
			stuff: {}
		});
	}

	try {
		nodes = await Promise.all(
			// we use == here rather than === because [undefined] serializes as "[null]"
			route.a.map((n) => (n == undefined ? n : options.manifest._.nodes[n]()))
		);
	} catch (err) {
		const error = coalesce_to_error(err);

		options.handle_error(error, event);

		return await respond_with_error({
			event,
			options,
			state,
			$session,
			status: 500,
			error,
			resolve_opts
		});
	}

	// the leaf node will be present. only layouts may be undefined
	const leaf = /** @type {SSRNode} */ (nodes[nodes.length - 1]).module;

	let page_config = get_page_config(leaf, options);

	if (state.prerendering) {
		// if the page isn't marked as prerenderable (or is explicitly
		// marked NOT prerenderable, if `prerender.default` is `true`),
		// then bail out at this point
		const should_prerender = leaf.prerender ?? options.prerender.default;
		if (!should_prerender) {
			return new Response(undefined, {
				status: 204
			});
		}
	}

	/** @type {Array<Loaded>} */
	let branch = [];

	/** @type {number} */
	let status = 200;

	/** @type {Error | null} */
	let error = null;

	/** @type {string[]} */
	let set_cookie_headers = [];

	let stuff = {};

	ssr: {
		for (let i = 0; i < nodes.length; i += 1) {
			const node = nodes[i];

			/** @type {Loaded | undefined} */
			let loaded;

			if (node) {
				try {
					loaded = await load_node({
						...opts,
						node,
						stuff,
						is_error: false,
						is_leaf: i === nodes.length - 1
					});

					set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);

					if (loaded.loaded.redirect) {
						return with_cookies(
							new Response(undefined, {
								status: loaded.loaded.status,
								headers: {
									location: loaded.loaded.redirect
								}
							}),
							set_cookie_headers
						);
					}

					if (loaded.loaded.error) {
						error = loaded.loaded.error;
						status = loaded.loaded.status ?? 500;
					}
				} catch (err) {
					const e = coalesce_to_error(err);

					options.handle_error(e, event);

					status = 500;
					error = e;
				}

				if (loaded && !error) {
					branch.push(loaded);
				}

				if (error) {
					while (i--) {
						if (route.b[i]) {
							const index = /** @type {number} */ (route.b[i]);
							const error_node = await options.manifest._.nodes[index]();

							/** @type {Loaded} */
							let node_loaded;
							let j = i;
							while (!(node_loaded = branch[j])) {
								j -= 1;
							}

							try {
								const error_loaded = /** @type {import('./types').Loaded} */ (
									await load_node({
										...opts,
										node: error_node,
										stuff: node_loaded.stuff,
										is_error: true,
										is_leaf: false,
										status,
										error
									})
								);

								if (error_loaded.loaded.error) {
									continue;
								}

								page_config = get_page_config(error_node.module, options);
								branch = branch.slice(0, j + 1).concat(error_loaded);
								stuff = { ...node_loaded.stuff, ...error_loaded.stuff };
								break ssr;
							} catch (err) {
								const e = coalesce_to_error(err);

								options.handle_error(e, event);

								continue;
							}
						}
					}

					// TODO backtrack until we find an __error.svelte component
					// that we can use as the leaf node
					// for now just return regular error page
					return with_cookies(
						await respond_with_error({
							event,
							options,
							state,
							$session,
							status,
							error,
							resolve_opts
						}),
						set_cookie_headers
					);
				}
			}

			if (loaded && loaded.loaded.stuff) {
				stuff = {
					...stuff,
					...loaded.loaded.stuff
				};
			}
		}
	}

	try {
		return with_cookies(
			await render_response({
				...opts,
				stuff,
				event,
				page_config,
				status,
				error,
				branch: branch.filter(Boolean)
			}),
			set_cookie_headers
		);
	} catch (err) {
		const error = coalesce_to_error(err);

		options.handle_error(error, event);

		return with_cookies(
			await respond_with_error({
				...opts,
				status: 500,
				error
			}),
			set_cookie_headers
		);
	}
}

/**
 * @param {import('types').SSRComponent} leaf
 * @param {SSROptions} options
 */
function get_page_config(leaf, options) {
	// TODO remove for 1.0
	if ('ssr' in leaf) {
		throw new Error(
			'`export const ssr` has been removed — use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle'
		);
	}

	return {
		router: 'router' in leaf ? !!leaf.router : options.router,
		hydrate: 'hydrate' in leaf ? !!leaf.hydrate : options.hydrate
	};
}

/**
 * @param {Response} response
 * @param {string[]} set_cookie_headers
 */
function with_cookies(response, set_cookie_headers) {
	if (set_cookie_headers.length) {
		set_cookie_headers.forEach((value) => {
			response.headers.append('set-cookie', value);
		});
	}
	return response;
}

/**
 * @param {import('types').RequestEvent} event
 * @param {import('types').SSRPage} route
 * @param {import('types').SSROptions} options
 * @param {import('types').SSRState} state
 * @param {import('types').RequiredResolveOptions} resolve_opts
 * @returns {Promise<Response>}
 */
async function render_page(event, route, options, state, resolve_opts) {
	if (state.initiator === route) {
		// infinite request cycle detected
		return new Response(`Not found: ${event.url.pathname}`, {
			status: 404
		});
	}

	if (route.shadow) {
		const type = negotiate(event.request.headers.get('accept') || 'text/html', [
			'text/html',
			'application/json'
		]);

		if (type === 'application/json') {
			return render_endpoint(event, await route.shadow(), options);
		}
	}

	const $session = await options.hooks.getSession(event);

	return respond$1({
		event,
		options,
		state,
		$session,
		resolve_opts,
		route
	});
}

/**
 * @param {RegExpMatchArray} match
 * @param {string[]} names
 * @param {string[]} types
 * @param {Record<string, import('types').ParamMatcher>} matchers
 */
function exec(match, names, types, matchers) {
	/** @type {Record<string, string>} */
	const params = {};

	for (let i = 0; i < names.length; i += 1) {
		const name = names[i];
		const type = types[i];
		const value = match[i + 1] || '';

		if (type) {
			const matcher = matchers[type];
			if (!matcher) throw new Error(`Missing "${type}" param matcher`); // TODO do this ahead of time?

			if (!matcher(value)) return;
		}

		params[name] = value;
	}

	return params;
}

/* global __SVELTEKIT_ADAPTER_NAME__ */

const DATA_SUFFIX = '/__data.json';

/** @param {{ html: string }} opts */
const default_transform = ({ html }) => html;

/** @type {import('types').Respond} */
async function respond(request, options, state) {
	let url = new URL(request.url);

	const { parameter, allowed } = options.method_override;
	const method_override = url.searchParams.get(parameter)?.toUpperCase();

	if (method_override) {
		if (request.method === 'POST') {
			if (allowed.includes(method_override)) {
				request = new Proxy(request, {
					get: (target, property, _receiver) => {
						if (property === 'method') return method_override;
						return Reflect.get(target, property, target);
					}
				});
			} else {
				const verb = allowed.length === 0 ? 'enabled' : 'allowed';
				const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;

				return new Response(body, {
					status: 400
				});
			}
		} else {
			throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
		}
	}

	let decoded;
	try {
		decoded = decodeURI(url.pathname);
	} catch {
		return new Response('Malformed URI', { status: 400 });
	}

	/** @type {import('types').SSRRoute | null} */
	let route = null;

	/** @type {Record<string, string>} */
	let params = {};

	if (options.paths.base && !state.prerendering?.fallback) {
		if (!decoded.startsWith(options.paths.base)) {
			return new Response('Not found', { status: 404 });
		}
		decoded = decoded.slice(options.paths.base.length) || '/';
	}

	const is_data_request = decoded.endsWith(DATA_SUFFIX);

	if (is_data_request) {
		const data_suffix_length = DATA_SUFFIX.length - (options.trailing_slash === 'always' ? 1 : 0);
		decoded = decoded.slice(0, -data_suffix_length) || '/';
		url = new URL(url.origin + url.pathname.slice(0, -data_suffix_length) + url.search);
	}

	if (!state.prerendering?.fallback) {
		const matchers = await options.manifest._.matchers();

		for (const candidate of options.manifest._.routes) {
			const match = candidate.pattern.exec(decoded);
			if (!match) continue;

			const matched = exec(match, candidate.names, candidate.types, matchers);
			if (matched) {
				route = candidate;
				params = decode_params(matched);
				break;
			}
		}
	}

	if (route) {
		if (route.type === 'page') {
			const normalized = normalize_path(url.pathname, options.trailing_slash);

			if (normalized !== url.pathname && !state.prerendering?.fallback) {
				return new Response(undefined, {
					status: 301,
					headers: {
						'x-sveltekit-normalize': '1',
						location:
							// ensure paths starting with '//' are not treated as protocol-relative
							(normalized.startsWith('//') ? url.origin + normalized : normalized) +
							(url.search === '?' ? '' : url.search)
					}
				});
			}
		} else if (is_data_request) {
			// requesting /__data.json should fail for a standalone endpoint
			return new Response(undefined, {
				status: 404
			});
		}
	}

	/** @type {import('types').RequestEvent} */
	const event = {
		get clientAddress() {
			if (!state.getClientAddress) {
				throw new Error(
					`${__SVELTEKIT_ADAPTER_NAME__} does not specify getClientAddress. Please raise an issue`
				);
			}

			Object.defineProperty(event, 'clientAddress', {
				value: state.getClientAddress()
			});

			return event.clientAddress;
		},
		locals: {},
		params,
		platform: state.platform,
		request,
		routeId: route && route.id,
		url
	};

	// TODO remove this for 1.0
	/**
	 * @param {string} property
	 * @param {string} replacement
	 * @param {string} suffix
	 */
	const removed = (property, replacement, suffix = '') => ({
		get: () => {
			throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
		}
	});

	const details = '. See https://github.com/sveltejs/kit/pull/3384 for details';

	const body_getter = {
		get: () => {
			throw new Error(
				'To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`' +
					details
			);
		}
	};

	Object.defineProperties(event, {
		method: removed('method', 'request.method', details),
		headers: removed('headers', 'request.headers', details),
		origin: removed('origin', 'url.origin'),
		path: removed('path', 'url.pathname'),
		query: removed('query', 'url.searchParams'),
		body: body_getter,
		rawBody: body_getter
	});

	/** @type {import('types').RequiredResolveOptions} */
	let resolve_opts = {
		ssr: true,
		transformPageChunk: default_transform
	};

	// TODO match route before calling handle?

	try {
		const response = await options.hooks.handle({
			event,
			resolve: async (event, opts) => {
				if (opts) {
					// TODO remove for 1.0
					// @ts-expect-error
					if (opts.transformPage) {
						throw new Error(
							'transformPage has been replaced by transformPageChunk — see https://github.com/sveltejs/kit/pull/5657 for more information'
						);
					}

					resolve_opts = {
						ssr: opts.ssr !== false,
						transformPageChunk: opts.transformPageChunk || default_transform
					};
				}

				if (state.prerendering?.fallback) {
					return await render_response({
						event,
						options,
						state,
						$session: await options.hooks.getSession(event),
						page_config: { router: true, hydrate: true },
						stuff: {},
						status: 200,
						error: null,
						branch: [],
						resolve_opts: {
							...resolve_opts,
							ssr: false
						}
					});
				}

				if (route) {
					/** @type {Response} */
					let response;

					if (is_data_request && route.type === 'page' && route.shadow) {
						response = await render_endpoint(event, await route.shadow(), options);

						// loading data for a client-side transition is a special case
						if (request.headers.has('x-sveltekit-load')) {
							// since redirects are opaque to the browser, we need to repackage
							// 3xx responses as 200s with a custom header
							if (response.status >= 300 && response.status < 400) {
								const location = response.headers.get('location');

								if (location) {
									const headers = new Headers(response.headers);
									headers.set('x-sveltekit-location', location);
									response = new Response(undefined, {
										status: 204,
										headers
									});
								}
							}
						}
					} else {
						response =
							route.type === 'endpoint'
								? await render_endpoint(event, await route.load(), options)
								: await render_page(event, route, options, state, resolve_opts);
					}

					if (response) {
						// respond with 304 if etag matches
						if (response.status === 200 && response.headers.has('etag')) {
							let if_none_match_value = request.headers.get('if-none-match');

							// ignore W/ prefix https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match#directives
							if (if_none_match_value?.startsWith('W/"')) {
								if_none_match_value = if_none_match_value.substring(2);
							}

							const etag = /** @type {string} */ (response.headers.get('etag'));

							if (if_none_match_value === etag) {
								const headers = new Headers({ etag });

								// https://datatracker.ietf.org/doc/html/rfc7232#section-4.1
								for (const key of [
									'cache-control',
									'content-location',
									'date',
									'expires',
									'vary'
								]) {
									const value = response.headers.get(key);
									if (value) headers.set(key, value);
								}

								return new Response(undefined, {
									status: 304,
									headers
								});
							}
						}

						return response;
					}
				}

				if (state.initiator === GENERIC_ERROR) {
					return new Response('Internal Server Error', {
						status: 500
					});
				}

				// if this request came direct from the user, rather than
				// via a `fetch` in a `load`, render a 404 page
				if (!state.initiator) {
					const $session = await options.hooks.getSession(event);
					return await respond_with_error({
						event,
						options,
						state,
						$session,
						status: 404,
						error: new Error(`Not found: ${event.url.pathname}`),
						resolve_opts
					});
				}

				if (state.prerendering) {
					return new Response('not found', { status: 404 });
				}

				// we can't load the endpoint from our own manifest,
				// so we need to make an actual HTTP request
				return await fetch(request);
			},

			// TODO remove for 1.0
			// @ts-expect-error
			get request() {
				throw new Error('request in handle has been replaced with event' + details);
			}
		});

		// TODO for 1.0, change the error message to point to docs rather than PR
		if (response && !(response instanceof Response)) {
			throw new Error('handle must return a Response object' + details);
		}

		return response;
	} catch (/** @type {unknown} */ e) {
		const error = coalesce_to_error(e);

		options.handle_error(error, event);

		const type = negotiate(event.request.headers.get('accept') || 'text/html', [
			'text/html',
			'application/json'
		]);

		if (is_data_request || type === 'application/json') {
			return new Response(serialize_error(error, options.get_stack), {
				status: 500,
				headers: { 'content-type': 'application/json; charset=utf-8' }
			});
		}

		// TODO is this necessary? should we just return a plain 500 at this point?
		try {
			const $session = await options.hooks.getSession(event);
			return await respond_with_error({
				event,
				options,
				state,
				$session,
				status: 500,
				error,
				resolve_opts
			});
		} catch (/** @type {unknown} */ e) {
			const error = coalesce_to_error(e);

			return new Response(options.dev ? error.stack : error.message, {
				status: 500
			});
		}
	}
}

export { respond };
