import require$$0$1 from 'assert';
import require$$4 from 'net';
import require$$2 from 'http';
import require$$0$2, { Readable as Readable$3 } from 'stream';
import require$$6 from 'buffer';
import require$$0 from 'util';
import require$$10, { ReadableStream as ReadableStream$2, TransformStream, WritableStream } from 'stream/web';
import require$$1 from 'perf_hooks';
import require$$9 from 'util/types';
import require$$0$3 from 'events';
import require$$4$1 from 'tls';
import require$$3 from 'async_hooks';
import 'console';
import require$$3$1 from 'zlib';
import http from 'node:http';
import 'node:https';
import 'node:zlib';
import Stream, { PassThrough as PassThrough$1 } from 'node:stream';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promisify, deprecate, types } from 'node:util';
import { format } from 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import { webcrypto } from 'crypto';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var symbols$1 = {
  kClose: Symbol('close'),
  kDestroy: Symbol('destroy'),
  kDispatch: Symbol('dispatch'),
  kUrl: Symbol('url'),
  kWriting: Symbol('writing'),
  kResuming: Symbol('resuming'),
  kQueue: Symbol('queue'),
  kConnect: Symbol('connect'),
  kConnecting: Symbol('connecting'),
  kHeadersList: Symbol('headers list'),
  kKeepAliveDefaultTimeout: Symbol('default keep alive timeout'),
  kKeepAliveMaxTimeout: Symbol('max keep alive timeout'),
  kKeepAliveTimeoutThreshold: Symbol('keep alive timeout threshold'),
  kKeepAliveTimeoutValue: Symbol('keep alive timeout'),
  kKeepAlive: Symbol('keep alive'),
  kHeadersTimeout: Symbol('headers timeout'),
  kBodyTimeout: Symbol('body timeout'),
  kServerName: Symbol('server name'),
  kHost: Symbol('host'),
  kNoRef: Symbol('no ref'),
  kBodyUsed: Symbol('used'),
  kRunning: Symbol('running'),
  kBlocking: Symbol('blocking'),
  kPending: Symbol('pending'),
  kSize: Symbol('size'),
  kBusy: Symbol('busy'),
  kQueued: Symbol('queued'),
  kFree: Symbol('free'),
  kConnected: Symbol('connected'),
  kClosed: Symbol('closed'),
  kNeedDrain: Symbol('need drain'),
  kReset: Symbol('reset'),
  kDestroyed: Symbol('destroyed'),
  kMaxHeadersSize: Symbol('max headers size'),
  kRunningIdx: Symbol('running index'),
  kPendingIdx: Symbol('pending index'),
  kError: Symbol('error'),
  kClients: Symbol('clients'),
  kClient: Symbol('client'),
  kParser: Symbol('parser'),
  kOnDestroyed: Symbol('destroy callbacks'),
  kPipelining: Symbol('pipelinig'),
  kSocket: Symbol('socket'),
  kHostHeader: Symbol('host header'),
  kConnector: Symbol('connector'),
  kStrictContentLength: Symbol('strict content length'),
  kMaxRedirections: Symbol('maxRedirections'),
  kMaxRequests: Symbol('maxRequestsPerClient'),
  kProxy: Symbol('proxy agent options'),
  kCounter: Symbol('socket request counter')
};

class UndiciError extends Error {
  constructor (message) {
    super(message);
    this.name = 'UndiciError';
    this.code = 'UND_ERR';
  }
}

class ConnectTimeoutError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, ConnectTimeoutError$1);
    this.name = 'ConnectTimeoutError';
    this.message = message || 'Connect Timeout Error';
    this.code = 'UND_ERR_CONNECT_TIMEOUT';
  }
}

class HeadersTimeoutError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, HeadersTimeoutError$1);
    this.name = 'HeadersTimeoutError';
    this.message = message || 'Headers Timeout Error';
    this.code = 'UND_ERR_HEADERS_TIMEOUT';
  }
}

class HeadersOverflowError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, HeadersOverflowError$1);
    this.name = 'HeadersOverflowError';
    this.message = message || 'Headers Overflow Error';
    this.code = 'UND_ERR_HEADERS_OVERFLOW';
  }
}

class BodyTimeoutError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, BodyTimeoutError$1);
    this.name = 'BodyTimeoutError';
    this.message = message || 'Body Timeout Error';
    this.code = 'UND_ERR_BODY_TIMEOUT';
  }
}

class ResponseStatusCodeError$1 extends UndiciError {
  constructor (message, statusCode, headers, body) {
    super(message);
    Error.captureStackTrace(this, ResponseStatusCodeError$1);
    this.name = 'ResponseStatusCodeError';
    this.message = message || 'Response Status Code Error';
    this.code = 'UND_ERR_RESPONSE_STATUS_CODE';
    this.body = body;
    this.status = statusCode;
    this.statusCode = statusCode;
    this.headers = headers;
  }
}

class InvalidArgumentError$f extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, InvalidArgumentError$f);
    this.name = 'InvalidArgumentError';
    this.message = message || 'Invalid Argument Error';
    this.code = 'UND_ERR_INVALID_ARG';
  }
}

class InvalidReturnValueError$2 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, InvalidReturnValueError$2);
    this.name = 'InvalidReturnValueError';
    this.message = message || 'Invalid Return Value Error';
    this.code = 'UND_ERR_INVALID_RETURN_VALUE';
  }
}

class RequestAbortedError$8 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, RequestAbortedError$8);
    this.name = 'AbortError';
    this.message = message || 'Request aborted';
    this.code = 'UND_ERR_ABORTED';
  }
}

class InformationalError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, InformationalError$1);
    this.name = 'InformationalError';
    this.message = message || 'Request information';
    this.code = 'UND_ERR_INFO';
  }
}

class RequestContentLengthMismatchError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, RequestContentLengthMismatchError$1);
    this.name = 'RequestContentLengthMismatchError';
    this.message = message || 'Request body length does not match content-length header';
    this.code = 'UND_ERR_REQ_CONTENT_LENGTH_MISMATCH';
  }
}

class ResponseContentLengthMismatchError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, ResponseContentLengthMismatchError$1);
    this.name = 'ResponseContentLengthMismatchError';
    this.message = message || 'Response body length does not match content-length header';
    this.code = 'UND_ERR_RES_CONTENT_LENGTH_MISMATCH';
  }
}

class ClientDestroyedError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, ClientDestroyedError$1);
    this.name = 'ClientDestroyedError';
    this.message = message || 'The client is destroyed';
    this.code = 'UND_ERR_DESTROYED';
  }
}

class ClientClosedError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, ClientClosedError$1);
    this.name = 'ClientClosedError';
    this.message = message || 'The client is closed';
    this.code = 'UND_ERR_CLOSED';
  }
}

class SocketError$3 extends UndiciError {
  constructor (message, socket) {
    super(message);
    Error.captureStackTrace(this, SocketError$3);
    this.name = 'SocketError';
    this.message = message || 'Socket error';
    this.code = 'UND_ERR_SOCKET';
    this.socket = socket;
  }
}

class NotSupportedError$2 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, NotSupportedError$2);
    this.name = 'NotSupportedError';
    this.message = message || 'Not supported error';
    this.code = 'UND_ERR_NOT_SUPPORTED';
  }
}

class BalancedPoolMissingUpstreamError extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, NotSupportedError$2);
    this.name = 'MissingUpstreamError';
    this.message = message || 'No upstream has been added to the BalancedPool';
    this.code = 'UND_ERR_BPL_MISSING_UPSTREAM';
  }
}

class HTTPParserError$1 extends Error {
  constructor (message, code, data) {
    super(message);
    Error.captureStackTrace(this, HTTPParserError$1);
    this.name = 'HTTPParserError';
    this.code = code ? `HPE_${code}` : undefined;
    this.data = data ? data.toString() : undefined;
  }
}

var errors$1 = {
  HTTPParserError: HTTPParserError$1,
  UndiciError,
  HeadersTimeoutError: HeadersTimeoutError$1,
  HeadersOverflowError: HeadersOverflowError$1,
  BodyTimeoutError: BodyTimeoutError$1,
  RequestContentLengthMismatchError: RequestContentLengthMismatchError$1,
  ConnectTimeoutError: ConnectTimeoutError$1,
  ResponseStatusCodeError: ResponseStatusCodeError$1,
  InvalidArgumentError: InvalidArgumentError$f,
  InvalidReturnValueError: InvalidReturnValueError$2,
  RequestAbortedError: RequestAbortedError$8,
  ClientDestroyedError: ClientDestroyedError$1,
  ClientClosedError: ClientClosedError$1,
  InformationalError: InformationalError$1,
  SocketError: SocketError$3,
  NotSupportedError: NotSupportedError$2,
  ResponseContentLengthMismatchError: ResponseContentLengthMismatchError$1,
  BalancedPoolMissingUpstreamError
};

const assert$7 = require$$0$1;
const { kDestroyed: kDestroyed$1, kBodyUsed: kBodyUsed$1 } = symbols$1;
const { IncomingMessage } = require$$2;
const stream$1 = require$$0$2;
const net$2 = require$$4;
const { InvalidArgumentError: InvalidArgumentError$e } = errors$1;
const { Blob: Blob$2 } = require$$6;
const nodeUtil = require$$0;

function nop () {}

function isStream (obj) {
  return obj && typeof obj.pipe === 'function'
}

// based on https://github.com/node-fetch/fetch-blob/blob/8ab587d34080de94140b54f07168451e7d0b655e/index.js#L229-L241 (MIT License)
function isBlobLike (object) {
  return (Blob$2 && object instanceof Blob$2) || (
    object &&
    typeof object === 'object' &&
    (typeof object.stream === 'function' ||
      typeof object.arrayBuffer === 'function') &&
    /^(Blob|File)$/.test(object[Symbol.toStringTag])
  )
}

function isObject (val) {
  return val !== null && typeof val === 'object'
}

// this escapes all non-uri friendly characters
function encode (val) {
  return encodeURIComponent(val)
}

// based on https://github.com/axios/axios/blob/63e559fa609c40a0a460ae5d5a18c3470ffc6c9e/lib/helpers/buildURL.js (MIT license)
function buildURL (url, queryParams) {
  if (url.includes('?') || url.includes('#')) {
    throw new Error('Query params cannot be passed when url already contains "?" or "#".')
  }
  if (!isObject(queryParams)) {
    throw new Error('Query params must be an object')
  }

  const parts = [];
  for (let [key, val] of Object.entries(queryParams)) {
    if (val === null || typeof val === 'undefined') {
      continue
    }

    if (!Array.isArray(val)) {
      val = [val];
    }

    for (const v of val) {
      if (isObject(v)) {
        throw new Error('Passing object as a query param is not supported, please serialize to string up-front')
      }
      parts.push(encode(key) + '=' + encode(v));
    }
  }

  const serializedParams = parts.join('&');

  if (serializedParams) {
    url += '?' + serializedParams;
  }

  return url
}

function parseURL (url) {
  if (typeof url === 'string') {
    url = new URL(url);
  }

  if (!url || typeof url !== 'object') {
    throw new InvalidArgumentError$e('invalid url')
  }

  if (url.port != null && url.port !== '' && !Number.isFinite(parseInt(url.port))) {
    throw new InvalidArgumentError$e('invalid port')
  }

  if (url.path != null && typeof url.path !== 'string') {
    throw new InvalidArgumentError$e('invalid path')
  }

  if (url.pathname != null && typeof url.pathname !== 'string') {
    throw new InvalidArgumentError$e('invalid pathname')
  }

  if (url.hostname != null && typeof url.hostname !== 'string') {
    throw new InvalidArgumentError$e('invalid hostname')
  }

  if (url.origin != null && typeof url.origin !== 'string') {
    throw new InvalidArgumentError$e('invalid origin')
  }

  if (!/^https?:/.test(url.origin || url.protocol)) {
    throw new InvalidArgumentError$e('invalid protocol')
  }

  if (!(url instanceof URL)) {
    const port = url.port != null
      ? url.port
      : (url.protocol === 'https:' ? 443 : 80);
    const origin = url.origin != null
      ? url.origin
      : `${url.protocol}//${url.hostname}:${port}`;
    const path = url.path != null
      ? url.path
      : `${url.pathname || ''}${url.search || ''}`;

    url = new URL(path, origin);
  }

  return url
}

function parseOrigin (url) {
  url = parseURL(url);

  if (url.pathname !== '/' || url.search || url.hash) {
    throw new InvalidArgumentError$e('invalid url')
  }

  return url
}

function getHostname (host) {
  if (host[0] === '[') {
    const idx = host.indexOf(']');

    assert$7(idx !== -1);
    return host.substr(1, idx - 1)
  }

  const idx = host.indexOf(':');
  if (idx === -1) return host

  return host.substr(0, idx)
}

// IP addresses are not valid server names per RFC6066
// > Currently, the only server names supported are DNS hostnames
function getServerName (host) {
  if (!host) {
    return null
  }

  assert$7.strictEqual(typeof host, 'string');

  const servername = getHostname(host);
  if (net$2.isIP(servername)) {
    return ''
  }

  return servername
}

function deepClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function isAsyncIterable (obj) {
  return !!(obj != null && typeof obj[Symbol.asyncIterator] === 'function')
}

function isIterable (obj) {
  return !!(obj != null && (typeof obj[Symbol.iterator] === 'function' || typeof obj[Symbol.asyncIterator] === 'function'))
}

function bodyLength (body) {
  if (body == null) {
    return 0
  } else if (isStream(body)) {
    const state = body._readableState;
    return state && state.ended === true && Number.isFinite(state.length)
      ? state.length
      : null
  } else if (isBlobLike(body)) {
    return body.size != null ? body.size : null
  } else if (isBuffer(body)) {
    return body.byteLength
  }

  return null
}

function isDestroyed (stream) {
  return !stream || !!(stream.destroyed || stream[kDestroyed$1])
}

function isReadableAborted (stream) {
  const state = stream && stream._readableState;
  return isDestroyed(stream) && state && !state.endEmitted
}

function destroy (stream, err) {
  if (!isStream(stream) || isDestroyed(stream)) {
    return
  }

  if (typeof stream.destroy === 'function') {
    if (Object.getPrototypeOf(stream).constructor === IncomingMessage) {
      // See: https://github.com/nodejs/node/pull/38505/files
      stream.socket = null;
    }
    stream.destroy(err);
  } else if (err) {
    process.nextTick((stream, err) => {
      stream.emit('error', err);
    }, stream, err);
  }

  if (stream.destroyed !== true) {
    stream[kDestroyed$1] = true;
  }
}

const KEEPALIVE_TIMEOUT_EXPR = /timeout=(\d+)/;
function parseKeepAliveTimeout (val) {
  const m = val.toString().match(KEEPALIVE_TIMEOUT_EXPR);
  return m ? parseInt(m[1], 10) * 1000 : null
}

function parseHeaders (headers, obj = {}) {
  for (let i = 0; i < headers.length; i += 2) {
    const key = headers[i].toString().toLowerCase();
    let val = obj[key];
    if (!val) {
      obj[key] = headers[i + 1].toString();
    } else {
      if (!Array.isArray(val)) {
        val = [val];
        obj[key] = val;
      }
      val.push(headers[i + 1].toString());
    }
  }
  return obj
}

function parseRawHeaders (headers) {
  return headers.map(header => header.toString())
}

function isBuffer (buffer) {
  // See, https://github.com/mcollina/undici/pull/319
  return buffer instanceof Uint8Array || Buffer.isBuffer(buffer)
}

function validateHandler (handler, method, upgrade) {
  if (!handler || typeof handler !== 'object') {
    throw new InvalidArgumentError$e('handler must be an object')
  }

  if (typeof handler.onConnect !== 'function') {
    throw new InvalidArgumentError$e('invalid onConnect method')
  }

  if (typeof handler.onError !== 'function') {
    throw new InvalidArgumentError$e('invalid onError method')
  }

  if (typeof handler.onBodySent !== 'function' && handler.onBodySent !== undefined) {
    throw new InvalidArgumentError$e('invalid onBodySent method')
  }

  if (upgrade || method === 'CONNECT') {
    if (typeof handler.onUpgrade !== 'function') {
      throw new InvalidArgumentError$e('invalid onUpgrade method')
    }
  } else {
    if (typeof handler.onHeaders !== 'function') {
      throw new InvalidArgumentError$e('invalid onHeaders method')
    }

    if (typeof handler.onData !== 'function') {
      throw new InvalidArgumentError$e('invalid onData method')
    }

    if (typeof handler.onComplete !== 'function') {
      throw new InvalidArgumentError$e('invalid onComplete method')
    }
  }
}

// A body is disturbed if it has been read from and it cannot
// be re-used without losing state or data.
function isDisturbed (body) {
  return !!(body && (
    stream$1.isDisturbed
      ? stream$1.isDisturbed(body) || body[kBodyUsed$1] // TODO (fix): Why is body[kBodyUsed] needed?
      : body[kBodyUsed$1] ||
        body.readableDidRead ||
        (body._readableState && body._readableState.dataEmitted) ||
        isReadableAborted(body)
  ))
}

function isErrored (body) {
  return !!(body && (
    stream$1.isErrored
      ? stream$1.isErrored(body)
      : /state: 'errored'/.test(nodeUtil.inspect(body)
      )))
}

function isReadable (body) {
  return !!(body && (
    stream$1.isReadable
      ? stream$1.isReadable(body)
      : /state: 'readable'/.test(nodeUtil.inspect(body)
      )))
}

function getSocketInfo (socket) {
  return {
    localAddress: socket.localAddress,
    localPort: socket.localPort,
    remoteAddress: socket.remoteAddress,
    remotePort: socket.remotePort,
    remoteFamily: socket.remoteFamily,
    timeout: socket.timeout,
    bytesWritten: socket.bytesWritten,
    bytesRead: socket.bytesRead
  }
}

let ReadableStream$1;
function ReadableStreamFrom$1 (iterable) {
  if (!ReadableStream$1) {
    ReadableStream$1 = require$$10.ReadableStream;
  }

  if (ReadableStream$1.from) {
    // https://github.com/whatwg/streams/pull/1083
    return ReadableStream$1.from(iterable)
  }

  let iterator;
  return new ReadableStream$1(
    {
      async start () {
        iterator = iterable[Symbol.asyncIterator]();
      },
      async pull (controller) {
        const { done, value } = await iterator.next();
        if (done) {
          queueMicrotask(() => {
            controller.close();
          });
        } else {
          const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
          controller.enqueue(new Uint8Array(buf));
        }
        return controller.desiredSize > 0
      },
      async cancel (reason) {
        await iterator.return();
      }
    },
    0
  )
}

function isFormDataLike (chunk) {
  return chunk && chunk.constructor && chunk.constructor.name === 'FormData'
}

const kEnumerableProperty = Object.create(null);
kEnumerableProperty.enumerable = true;

var util$e = {
  kEnumerableProperty,
  nop,
  isDisturbed,
  isErrored,
  isReadable,
  toUSVString: nodeUtil.toUSVString || ((val) => `${val}`),
  isReadableAborted,
  isBlobLike,
  parseOrigin,
  parseURL,
  getServerName,
  isStream,
  isIterable,
  isAsyncIterable,
  isDestroyed,
  parseRawHeaders,
  parseHeaders,
  parseKeepAliveTimeout,
  destroy,
  bodyLength,
  deepClone,
  ReadableStreamFrom: ReadableStreamFrom$1,
  isBuffer,
  validateHandler,
  getSocketInfo,
  isFormDataLike,
  buildURL
};

var constants$2;
var hasRequiredConstants$1;

function requireConstants$1 () {
	if (hasRequiredConstants$1) return constants$2;
	hasRequiredConstants$1 = 1;

	const corsSafeListedMethods = ['GET', 'HEAD', 'POST'];

	const nullBodyStatus = [101, 204, 205, 304];

	const redirectStatus = [301, 302, 303, 307, 308];

	const referrerPolicy = [
	  '',
	  'no-referrer',
	  'no-referrer-when-downgrade',
	  'same-origin',
	  'origin',
	  'strict-origin',
	  'origin-when-cross-origin',
	  'strict-origin-when-cross-origin',
	  'unsafe-url'
	];

	const requestRedirect = ['follow', 'manual', 'error'];

	const safeMethods = ['GET', 'HEAD', 'OPTIONS', 'TRACE'];

	const requestMode = ['navigate', 'same-origin', 'no-cors', 'cors'];

	const requestCredentials = ['omit', 'same-origin', 'include'];

	const requestCache = [
	  'default',
	  'no-store',
	  'reload',
	  'no-cache',
	  'force-cache',
	  'only-if-cached'
	];

	const requestBodyHeader = [
	  'content-encoding',
	  'content-language',
	  'content-location',
	  'content-type'
	];

	// http://fetch.spec.whatwg.org/#forbidden-method
	const forbiddenMethods = ['CONNECT', 'TRACE', 'TRACK'];

	const subresource = [
	  'audio',
	  'audioworklet',
	  'font',
	  'image',
	  'manifest',
	  'paintworklet',
	  'script',
	  'style',
	  'track',
	  'video',
	  'xslt',
	  ''
	];

	/** @type {globalThis['DOMException']} */
	const DOMException = globalThis.DOMException ?? (() => {
	  // DOMException was only made a global in Node v17.0.0,
	  // but fetch supports >= v16.5.
	  try {
	    atob('~');
	  } catch (err) {
	    return Object.getPrototypeOf(err).constructor
	  }
	})();

	constants$2 = {
	  DOMException,
	  subresource,
	  forbiddenMethods,
	  requestBodyHeader,
	  referrerPolicy,
	  requestRedirect,
	  requestMode,
	  requestCredentials,
	  requestCache,
	  redirectStatus,
	  corsSafeListedMethods,
	  nullBodyStatus,
	  safeMethods
	};
	return constants$2;
}

var symbols;
var hasRequiredSymbols;

function requireSymbols () {
	if (hasRequiredSymbols) return symbols;
	hasRequiredSymbols = 1;

	symbols = {
	  kUrl: Symbol('url'),
	  kHeaders: Symbol('headers'),
	  kSignal: Symbol('signal'),
	  kState: Symbol('state'),
	  kGuard: Symbol('guard'),
	  kRealm: Symbol('realm')
	};
	return symbols;
}

var webidl_1;
var hasRequiredWebidl;

function requireWebidl () {
	if (hasRequiredWebidl) return webidl_1;
	hasRequiredWebidl = 1;

	const { toUSVString, types } = require$$0;

	const webidl = {};
	webidl.converters = {};
	webidl.util = {};
	webidl.errors = {};

	/**
	 *
	 * @param {{
	 *   header: string
	 *   message: string
	 * }} message
	 */
	webidl.errors.exception = function (message) {
	  throw new TypeError(`${message.header}: ${message.message}`)
	};

	/**
	 * Throw an error when conversion from one type to another has failed
	 * @param {{
	 *   prefix: string
	 *   argument: string
	 *   types: string[]
	 * }} context
	 */
	webidl.errors.conversionFailed = function (context) {
	  const plural = context.types.length === 1 ? '' : ' one of';
	  const message =
	    `${context.argument} could not be converted to` +
	    `${plural}: ${context.types.join(', ')}.`;

	  return webidl.errors.exception({
	    header: context.prefix,
	    message
	  })
	};

	/**
	 * Throw an error when an invalid argument is provided
	 * @param {{
	 *   prefix: string
	 *   value: string
	 *   type: string
	 * }} context
	 */
	webidl.errors.invalidArgument = function (context) {
	  return webidl.errors.exception({
	    header: context.prefix,
	    message: `"${context.value}" is an invalid ${context.type}.`
	  })
	};

	// https://tc39.es/ecma262/#sec-ecmascript-data-types-and-values
	webidl.util.Type = function (V) {
	  switch (typeof V) {
	    case 'undefined': return 'Undefined'
	    case 'boolean': return 'Boolean'
	    case 'string': return 'String'
	    case 'symbol': return 'Symbol'
	    case 'number': return 'Number'
	    case 'bigint': return 'BigInt'
	    case 'function':
	    case 'object': {
	      if (V === null) {
	        return 'Null'
	      }

	      return 'Object'
	    }
	  }
	};

	// https://webidl.spec.whatwg.org/#abstract-opdef-converttoint
	webidl.util.ConvertToInt = function (V, bitLength, signedness, opts = {}) {
	  let upperBound;
	  let lowerBound;

	  // 1. If bitLength is 64, then:
	  if (bitLength === 64) {
	    // 1. Let upperBound be 2^53 − 1.
	    upperBound = Math.pow(2, 53) - 1;

	    // 2. If signedness is "unsigned", then let lowerBound be 0.
	    if (signedness === 'unsigned') {
	      lowerBound = 0;
	    } else {
	      // 3. Otherwise let lowerBound be −2^53 + 1.
	      lowerBound = Math.pow(-2, 53) + 1;
	    }
	  } else if (signedness === 'unsigned') {
	    // 2. Otherwise, if signedness is "unsigned", then:

	    // 1. Let lowerBound be 0.
	    lowerBound = 0;

	    // 2. Let upperBound be 2^bitLength − 1.
	    upperBound = Math.pow(2, bitLength) - 1;
	  } else {
	    // 3. Otherwise:

	    // 1. Let lowerBound be -2^bitLength − 1.
	    lowerBound = Math.pow(-2, bitLength) - 1;

	    // 2. Let upperBound be 2^bitLength − 1 − 1.
	    upperBound = Math.pow(2, bitLength - 1) - 1;
	  }

	  // 4. Let x be ? ToNumber(V).
	  let x = Number(V);

	  // 5. If x is −0, then set x to +0.
	  if (Object.is(-0, x)) {
	    x = 0;
	  }

	  // 6. If the conversion is to an IDL type associated
	  //    with the [EnforceRange] extended attribute, then:
	  if (opts.enforceRange === true) {
	    // 1. If x is NaN, +∞, or −∞, then throw a TypeError.
	    if (
	      Number.isNaN(x) ||
	      x === Number.POSITIVE_INFINITY ||
	      x === Number.NEGATIVE_INFINITY
	    ) {
	      webidl.errors.exception({
	        header: 'Integer conversion',
	        message: `Could not convert ${V} to an integer.`
	      });
	    }

	    // 2. Set x to IntegerPart(x).
	    x = webidl.util.IntegerPart(x);

	    // 3. If x < lowerBound or x > upperBound, then
	    //    throw a TypeError.
	    if (x < lowerBound || x > upperBound) {
	      webidl.errors.exception({
	        header: 'Integer conversion',
	        message: `Value must be between ${lowerBound}-${upperBound}, got ${x}.`
	      });
	    }

	    // 4. Return x.
	    return x
	  }

	  // 7. If x is not NaN and the conversion is to an IDL
	  //    type associated with the [Clamp] extended
	  //    attribute, then:
	  if (!Number.isNaN(x) && opts.clamp === true) {
	    // 1. Set x to min(max(x, lowerBound), upperBound).
	    x = Math.min(Math.max(x, lowerBound), upperBound);

	    // 2. Round x to the nearest integer, choosing the
	    //    even integer if it lies halfway between two,
	    //    and choosing +0 rather than −0.
	    if (Math.floor(x) % 2 === 0) {
	      x = Math.floor(x);
	    } else {
	      x = Math.ceil(x);
	    }

	    // 3. Return x.
	    return x
	  }

	  // 8. If x is NaN, +0, +∞, or −∞, then return +0.
	  if (
	    Number.isNaN(x) ||
	    Object.is(0, x) ||
	    x === Number.POSITIVE_INFINITY ||
	    x === Number.NEGATIVE_INFINITY
	  ) {
	    return 0
	  }

	  // 9. Set x to IntegerPart(x).
	  x = webidl.util.IntegerPart(x);

	  // 10. Set x to x modulo 2^bitLength.
	  x = x % Math.pow(2, bitLength);

	  // 11. If signedness is "signed" and x ≥ 2^bitLength − 1,
	  //    then return x − 2^bitLength.
	  if (signedness === 'signed' && x >= Math.pow(2, bitLength) - 1) {
	    return x - Math.pow(2, bitLength)
	  }

	  // 12. Otherwise, return x.
	  return x
	};

	// https://webidl.spec.whatwg.org/#abstract-opdef-integerpart
	webidl.util.IntegerPart = function (n) {
	  // 1. Let r be floor(abs(n)).
	  const r = Math.floor(Math.abs(n));

	  // 2. If n < 0, then return -1 × r.
	  if (n < 0) {
	    return -1 * r
	  }

	  // 3. Otherwise, return r.
	  return r
	};

	// https://webidl.spec.whatwg.org/#es-sequence
	webidl.sequenceConverter = function (converter) {
	  return (V) => {
	    // 1. If Type(V) is not Object, throw a TypeError.
	    if (webidl.util.Type(V) !== 'Object') {
	      webidl.errors.exception({
	        header: 'Sequence',
	        message: `Value of type ${webidl.util.Type(V)} is not an Object.`
	      });
	    }

	    // 2. Let method be ? GetMethod(V, @@iterator).
	    /** @type {Generator} */
	    const method = V?.[Symbol.iterator]?.();
	    const seq = [];

	    // 3. If method is undefined, throw a TypeError.
	    if (
	      method === undefined ||
	      typeof method.next !== 'function'
	    ) {
	      webidl.errors.exception({
	        header: 'Sequence',
	        message: 'Object is not an iterator.'
	      });
	    }

	    // https://webidl.spec.whatwg.org/#create-sequence-from-iterable
	    while (true) {
	      const { done, value } = method.next();

	      if (done) {
	        break
	      }

	      seq.push(converter(value));
	    }

	    return seq
	  }
	};

	webidl.recordConverter = function (keyConverter, valueConverter) {
	  return (V) => {
	    const record = {};
	    const type = webidl.util.Type(V);

	    if (type === 'Undefined' || type === 'Null') {
	      return record
	    }

	    if (type !== 'Object') {
	      webidl.errors.exception({
	        header: 'Record',
	        message: `Expected ${V} to be an Object type.`
	      });
	    }

	    for (let [key, value] of Object.entries(V)) {
	      key = keyConverter(key);
	      value = valueConverter(value);

	      record[key] = value;
	    }

	    return record
	  }
	};

	webidl.interfaceConverter = function (i) {
	  return (V, opts = {}) => {
	    if (opts.strict !== false && !(V instanceof i)) {
	      webidl.errors.exception({
	        header: i.name,
	        message: `Expected ${V} to be an instance of ${i.name}.`
	      });
	    }

	    return V
	  }
	};

	/**
	 * @param {{
	 *   key: string,
	 *   defaultValue?: any,
	 *   required?: boolean,
	 *   converter: (...args: unknown[]) => unknown,
	 *   allowedValues?: any[]
	 * }[]} converters
	 * @returns
	 */
	webidl.dictionaryConverter = function (converters) {
	  return (dictionary) => {
	    const type = webidl.util.Type(dictionary);
	    const dict = {};

	    if (type !== 'Null' && type !== 'Undefined' && type !== 'Object') {
	      webidl.errors.exception({
	        header: 'Dictionary',
	        message: `Expected ${dictionary} to be one of: Null, Undefined, Object.`
	      });
	    }

	    for (const options of converters) {
	      const { key, defaultValue, required, converter } = options;

	      if (required === true) {
	        if (!Object.hasOwn(dictionary, key)) {
	          webidl.errors.exception({
	            header: 'Dictionary',
	            message: `Missing required key "${key}".`
	          });
	        }
	      }

	      let value = dictionary[key];
	      const hasDefault = Object.hasOwn(options, 'defaultValue');

	      // Only use defaultValue if value is undefined and
	      // a defaultValue options was provided.
	      if (hasDefault && value !== null) {
	        value = value ?? defaultValue;
	      }

	      // A key can be optional and have no default value.
	      // When this happens, do not perform a conversion,
	      // and do not assign the key a value.
	      if (required || hasDefault || value !== undefined) {
	        value = converter(value);

	        if (
	          options.allowedValues &&
	          !options.allowedValues.includes(value)
	        ) {
	          webidl.errors.exception({
	            header: 'Dictionary',
	            message: `${value} is not an accepted type. Expected one of ${options.allowedValues.join(', ')}.`
	          });
	        }

	        dict[key] = value;
	      }
	    }

	    return dict
	  }
	};

	webidl.nullableConverter = function (converter) {
	  return (V) => {
	    if (V === null) {
	      return V
	    }

	    return converter(V)
	  }
	};

	// https://webidl.spec.whatwg.org/#es-DOMString
	webidl.converters.DOMString = function (V, opts = {}) {
	  // 1. If V is null and the conversion is to an IDL type
	  //    associated with the [LegacyNullToEmptyString]
	  //    extended attribute, then return the DOMString value
	  //    that represents the empty string.
	  if (V === null && opts.legacyNullToEmptyString) {
	    return ''
	  }

	  // 2. Let x be ? ToString(V).
	  if (typeof V === 'symbol') {
	    throw new TypeError('Could not convert argument of type symbol to string.')
	  }

	  // 3. Return the IDL DOMString value that represents the
	  //    same sequence of code units as the one the
	  //    ECMAScript String value x represents.
	  return String(V)
	};

	// eslint-disable-next-line no-control-regex
	const isNotLatin1 = /[^\u0000-\u00ff]/;

	// https://webidl.spec.whatwg.org/#es-ByteString
	webidl.converters.ByteString = function (V) {
	  // 1. Let x be ? ToString(V).
	  // Note: DOMString converter perform ? ToString(V)
	  const x = webidl.converters.DOMString(V);

	  // 2. If the value of any element of x is greater than
	  //    255, then throw a TypeError.
	  if (isNotLatin1.test(x)) {
	    throw new TypeError('Argument is not a ByteString')
	  }

	  // 3. Return an IDL ByteString value whose length is the
	  //    length of x, and where the value of each element is
	  //    the value of the corresponding element of x.
	  return x
	};

	// https://webidl.spec.whatwg.org/#es-USVString
	// TODO: ensure that util.toUSVString follows webidl spec
	webidl.converters.USVString = toUSVString;

	// https://webidl.spec.whatwg.org/#es-boolean
	webidl.converters.boolean = function (V) {
	  // 1. Let x be the result of computing ToBoolean(V).
	  const x = Boolean(V);

	  // 2. Return the IDL boolean value that is the one that represents
	  //    the same truth value as the ECMAScript Boolean value x.
	  return x
	};

	// https://webidl.spec.whatwg.org/#es-any
	webidl.converters.any = function (V) {
	  return V
	};

	// https://webidl.spec.whatwg.org/#es-long-long
	webidl.converters['long long'] = function (V, opts) {
	  // 1. Let x be ? ConvertToInt(V, 64, "signed").
	  const x = webidl.util.ConvertToInt(V, 64, 'signed', opts);

	  // 2. Return the IDL long long value that represents
	  //    the same numeric value as x.
	  return x
	};

	// https://webidl.spec.whatwg.org/#es-unsigned-short
	webidl.converters['unsigned short'] = function (V) {
	  // 1. Let x be ? ConvertToInt(V, 16, "unsigned").
	  const x = webidl.util.ConvertToInt(V, 16, 'unsigned');

	  // 2. Return the IDL unsigned short value that represents
	  //    the same numeric value as x.
	  return x
	};

	// https://webidl.spec.whatwg.org/#idl-ArrayBuffer
	webidl.converters.ArrayBuffer = function (V, opts = {}) {
	  // 1. If Type(V) is not Object, or V does not have an
	  //    [[ArrayBufferData]] internal slot, then throw a
	  //    TypeError.
	  // see: https://tc39.es/ecma262/#sec-properties-of-the-arraybuffer-instances
	  // see: https://tc39.es/ecma262/#sec-properties-of-the-sharedarraybuffer-instances
	  if (
	    webidl.util.Type(V) !== 'Object' ||
	    !types.isAnyArrayBuffer(V)
	  ) {
	    webidl.errors.conversionFailed({
	      prefix: `${V}`,
	      argument: `${V}`,
	      types: ['ArrayBuffer']
	    });
	  }

	  // 2. If the conversion is not to an IDL type associated
	  //    with the [AllowShared] extended attribute, and
	  //    IsSharedArrayBuffer(V) is true, then throw a
	  //    TypeError.
	  if (opts.allowShared === false && types.isSharedArrayBuffer(V)) {
	    webidl.errors.exception({
	      header: 'ArrayBuffer',
	      message: 'SharedArrayBuffer is not allowed.'
	    });
	  }

	  // 3. If the conversion is not to an IDL type associated
	  //    with the [AllowResizable] extended attribute, and
	  //    IsResizableArrayBuffer(V) is true, then throw a
	  //    TypeError.
	  // Note: resizable ArrayBuffers are currently a proposal.

	  // 4. Return the IDL ArrayBuffer value that is a
	  //    reference to the same object as V.
	  return V
	};

	webidl.converters.TypedArray = function (V, T, opts = {}) {
	  // 1. Let T be the IDL type V is being converted to.

	  // 2. If Type(V) is not Object, or V does not have a
	  //    [[TypedArrayName]] internal slot with a value
	  //    equal to T’s name, then throw a TypeError.
	  if (
	    webidl.util.Type(V) !== 'Object' ||
	    !types.isTypedArray(V) ||
	    V.constructor.name !== T.name
	  ) {
	    webidl.errors.conversionFailed({
	      prefix: `${T.name}`,
	      argument: `${V}`,
	      types: [T.name]
	    });
	  }

	  // 3. If the conversion is not to an IDL type associated
	  //    with the [AllowShared] extended attribute, and
	  //    IsSharedArrayBuffer(V.[[ViewedArrayBuffer]]) is
	  //    true, then throw a TypeError.
	  if (opts.allowShared === false && types.isSharedArrayBuffer(V.buffer)) {
	    webidl.errors.exception({
	      header: 'ArrayBuffer',
	      message: 'SharedArrayBuffer is not allowed.'
	    });
	  }

	  // 4. If the conversion is not to an IDL type associated
	  //    with the [AllowResizable] extended attribute, and
	  //    IsResizableArrayBuffer(V.[[ViewedArrayBuffer]]) is
	  //    true, then throw a TypeError.
	  // Note: resizable array buffers are currently a proposal

	  // 5. Return the IDL value of type T that is a reference
	  //    to the same object as V.
	  return V
	};

	webidl.converters.DataView = function (V, opts = {}) {
	  // 1. If Type(V) is not Object, or V does not have a
	  //    [[DataView]] internal slot, then throw a TypeError.
	  if (webidl.util.Type(V) !== 'Object' || !types.isDataView(V)) {
	    webidl.errors.exception({
	      header: 'DataView',
	      message: 'Object is not a DataView.'
	    });
	  }

	  // 2. If the conversion is not to an IDL type associated
	  //    with the [AllowShared] extended attribute, and
	  //    IsSharedArrayBuffer(V.[[ViewedArrayBuffer]]) is true,
	  //    then throw a TypeError.
	  if (opts.allowShared === false && types.isSharedArrayBuffer(V.buffer)) {
	    webidl.errors.exception({
	      header: 'ArrayBuffer',
	      message: 'SharedArrayBuffer is not allowed.'
	    });
	  }

	  // 3. If the conversion is not to an IDL type associated
	  //    with the [AllowResizable] extended attribute, and
	  //    IsResizableArrayBuffer(V.[[ViewedArrayBuffer]]) is
	  //    true, then throw a TypeError.
	  // Note: resizable ArrayBuffers are currently a proposal

	  // 4. Return the IDL DataView value that is a reference
	  //    to the same object as V.
	  return V
	};

	// https://webidl.spec.whatwg.org/#BufferSource
	webidl.converters.BufferSource = function (V, opts = {}) {
	  if (types.isAnyArrayBuffer(V)) {
	    return webidl.converters.ArrayBuffer(V, opts)
	  }

	  if (types.isTypedArray(V)) {
	    return webidl.converters.TypedArray(V, V.constructor)
	  }

	  if (types.isDataView(V)) {
	    return webidl.converters.DataView(V, opts)
	  }

	  throw new TypeError(`Could not convert ${V} to a BufferSource.`)
	};

	webidl.converters['sequence<ByteString>'] = webidl.sequenceConverter(
	  webidl.converters.ByteString
	);

	webidl.converters['sequence<sequence<ByteString>>'] = webidl.sequenceConverter(
	  webidl.converters['sequence<ByteString>']
	);

	webidl.converters['record<ByteString, ByteString>'] = webidl.recordConverter(
	  webidl.converters.ByteString,
	  webidl.converters.ByteString
	);

	webidl_1 = {
	  webidl
	};
	return webidl_1;
}

var file;
var hasRequiredFile;

function requireFile () {
	if (hasRequiredFile) return file;
	hasRequiredFile = 1;

	const { Blob } = require$$6;
	const { types } = require$$0;
	const { kState } = requireSymbols();
	const { isBlobLike } = requireUtil();
	const { webidl } = requireWebidl();

	class File extends Blob {
	  constructor (fileBits, fileName, options = {}) {
	    // The File constructor is invoked with two or three parameters, depending
	    // on whether the optional dictionary parameter is used. When the File()
	    // constructor is invoked, user agents must run the following steps:
	    if (arguments.length < 2) {
	      throw new TypeError('2 arguments required')
	    }

	    fileBits = webidl.converters['sequence<BlobPart>'](fileBits);
	    fileName = webidl.converters.USVString(fileName);
	    options = webidl.converters.FilePropertyBag(options);

	    // 1. Let bytes be the result of processing blob parts given fileBits and
	    // options.
	    // Note: Blob handles this for us

	    // 2. Let n be the fileName argument to the constructor.
	    const n = fileName;

	    // 3. Process FilePropertyBag dictionary argument by running the following
	    // substeps:

	    //    1. If the type member is provided and is not the empty string, let t
	    //    be set to the type dictionary member. If t contains any characters
	    //    outside the range U+0020 to U+007E, then set t to the empty string
	    //    and return from these substeps.
	    //    2. Convert every character in t to ASCII lowercase.
	    // Note: Blob handles both of these steps for us

	    //    3. If the lastModified member is provided, let d be set to the
	    //    lastModified dictionary member. If it is not provided, set d to the
	    //    current date and time represented as the number of milliseconds since
	    //    the Unix Epoch (which is the equivalent of Date.now() [ECMA-262]).
	    const d = options.lastModified;

	    // 4. Return a new File object F such that:
	    // F refers to the bytes byte sequence.
	    // F.size is set to the number of total bytes in bytes.
	    // F.name is set to n.
	    // F.type is set to t.
	    // F.lastModified is set to d.

	    super(processBlobParts(fileBits, options), { type: options.type });
	    this[kState] = {
	      name: n,
	      lastModified: d
	    };
	  }

	  get name () {
	    if (!(this instanceof File)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].name
	  }

	  get lastModified () {
	    if (!(this instanceof File)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].lastModified
	  }

	  get [Symbol.toStringTag] () {
	    return this.constructor.name
	  }
	}

	class FileLike {
	  constructor (blobLike, fileName, options = {}) {
	    // TODO: argument idl type check

	    // The File constructor is invoked with two or three parameters, depending
	    // on whether the optional dictionary parameter is used. When the File()
	    // constructor is invoked, user agents must run the following steps:

	    // 1. Let bytes be the result of processing blob parts given fileBits and
	    // options.

	    // 2. Let n be the fileName argument to the constructor.
	    const n = fileName;

	    // 3. Process FilePropertyBag dictionary argument by running the following
	    // substeps:

	    //    1. If the type member is provided and is not the empty string, let t
	    //    be set to the type dictionary member. If t contains any characters
	    //    outside the range U+0020 to U+007E, then set t to the empty string
	    //    and return from these substeps.
	    //    TODO
	    const t = options.type;

	    //    2. Convert every character in t to ASCII lowercase.
	    //    TODO

	    //    3. If the lastModified member is provided, let d be set to the
	    //    lastModified dictionary member. If it is not provided, set d to the
	    //    current date and time represented as the number of milliseconds since
	    //    the Unix Epoch (which is the equivalent of Date.now() [ECMA-262]).
	    const d = options.lastModified ?? Date.now();

	    // 4. Return a new File object F such that:
	    // F refers to the bytes byte sequence.
	    // F.size is set to the number of total bytes in bytes.
	    // F.name is set to n.
	    // F.type is set to t.
	    // F.lastModified is set to d.

	    this[kState] = {
	      blobLike,
	      name: n,
	      type: t,
	      lastModified: d
	    };
	  }

	  stream (...args) {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].blobLike.stream(...args)
	  }

	  arrayBuffer (...args) {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].blobLike.arrayBuffer(...args)
	  }

	  slice (...args) {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].blobLike.slice(...args)
	  }

	  text (...args) {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].blobLike.text(...args)
	  }

	  get size () {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].blobLike.size
	  }

	  get type () {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].blobLike.type
	  }

	  get name () {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].name
	  }

	  get lastModified () {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].lastModified
	  }

	  get [Symbol.toStringTag] () {
	    return 'File'
	  }
	}

	webidl.converters.Blob = webidl.interfaceConverter(Blob);

	webidl.converters.BlobPart = function (V, opts) {
	  if (webidl.util.Type(V) === 'Object') {
	    if (isBlobLike(V)) {
	      return webidl.converters.Blob(V, { strict: false })
	    }

	    return webidl.converters.BufferSource(V, opts)
	  } else {
	    return webidl.converters.USVString(V, opts)
	  }
	};

	webidl.converters['sequence<BlobPart>'] = webidl.sequenceConverter(
	  webidl.converters.BlobPart
	);

	// https://www.w3.org/TR/FileAPI/#dfn-FilePropertyBag
	webidl.converters.FilePropertyBag = webidl.dictionaryConverter([
	  {
	    key: 'lastModified',
	    converter: webidl.converters['long long'],
	    get defaultValue () {
	      return Date.now()
	    }
	  },
	  {
	    key: 'type',
	    converter: webidl.converters.DOMString,
	    defaultValue: ''
	  },
	  {
	    key: 'endings',
	    converter: (value) => {
	      value = webidl.converters.DOMString(value);
	      value = value.toLowerCase();

	      if (value !== 'native') {
	        value = 'transparent';
	      }

	      return value
	    },
	    defaultValue: 'transparent'
	  }
	]);

	/**
	 * @see https://www.w3.org/TR/FileAPI/#process-blob-parts
	 * @param {(NodeJS.TypedArray|Blob|string)[]} parts
	 * @param {{ type: string, endings: string }} options
	 */
	function processBlobParts (parts, options) {
	  // 1. Let bytes be an empty sequence of bytes.
	  /** @type {NodeJS.TypedArray[]} */
	  const bytes = [];

	  // 2. For each element in parts:
	  for (const element of parts) {
	    // 1. If element is a USVString, run the following substeps:
	    if (typeof element === 'string') {
	      // 1. Let s be element.
	      let s = element;

	      // 2. If the endings member of options is "native", set s
	      //    to the result of converting line endings to native
	      //    of element.
	      if (options.endings === 'native') {
	        s = convertLineEndingsNative(s);
	      }

	      // 3. Append the result of UTF-8 encoding s to bytes.
	      bytes.push(new TextEncoder().encode(s));
	    } else if (
	      types.isAnyArrayBuffer(element) ||
	      types.isTypedArray(element)
	    ) {
	      // 2. If element is a BufferSource, get a copy of the
	      //    bytes held by the buffer source, and append those
	      //    bytes to bytes.
	      if (!element.buffer) { // ArrayBuffer
	        bytes.push(new Uint8Array(element));
	      } else {
	        bytes.push(element.buffer);
	      }
	    } else if (isBlobLike(element)) {
	      // 3. If element is a Blob, append the bytes it represents
	      //    to bytes.
	      bytes.push(element);
	    }
	  }

	  // 3. Return bytes.
	  return bytes
	}

	/**
	 * @see https://www.w3.org/TR/FileAPI/#convert-line-endings-to-native
	 * @param {string} s
	 */
	function convertLineEndingsNative (s) {
	  // 1. Let native line ending be be the code point U+000A LF.
	  let nativeLineEnding = '\n';

	  // 2. If the underlying platform’s conventions are to
	  //    represent newlines as a carriage return and line feed
	  //    sequence, set native line ending to the code point
	  //    U+000D CR followed by the code point U+000A LF.
	  if (process.platform === 'win32') {
	    nativeLineEnding = '\r\n';
	  }

	  return s.replace(/\r?\n/g, nativeLineEnding)
	}

	file = { File, FileLike };
	return file;
}

var util$d;
var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util$d;
	hasRequiredUtil = 1;

	const { redirectStatus } = requireConstants$1();
	const { performance } = require$$1;
	const { isBlobLike, toUSVString, ReadableStreamFrom } = util$e;
	const assert = require$$0$1;

	let File;

	// https://fetch.spec.whatwg.org/#block-bad-port
	const badPorts = [
	  '1', '7', '9', '11', '13', '15', '17', '19', '20', '21', '22', '23', '25', '37', '42', '43', '53', '69', '77', '79',
	  '87', '95', '101', '102', '103', '104', '109', '110', '111', '113', '115', '117', '119', '123', '135', '137',
	  '139', '143', '161', '179', '389', '427', '465', '512', '513', '514', '515', '526', '530', '531', '532',
	  '540', '548', '554', '556', '563', '587', '601', '636', '989', '990', '993', '995', '1719', '1720', '1723',
	  '2049', '3659', '4045', '5060', '5061', '6000', '6566', '6665', '6666', '6667', '6668', '6669', '6697',
	  '10080'
	];

	function responseURL (response) {
	  // https://fetch.spec.whatwg.org/#responses
	  // A response has an associated URL. It is a pointer to the last URL
	  // in response’s URL list and null if response’s URL list is empty.
	  const urlList = response.urlList;
	  const length = urlList.length;
	  return length === 0 ? null : urlList[length - 1].toString()
	}

	// https://fetch.spec.whatwg.org/#concept-response-location-url
	function responseLocationURL (response, requestFragment) {
	  // 1. If response’s status is not a redirect status, then return null.
	  if (!redirectStatus.includes(response.status)) {
	    return null
	  }

	  // 2. Let location be the result of extracting header list values given
	  // `Location` and response’s header list.
	  let location = response.headersList.get('location');

	  // 3. If location is a value, then set location to the result of parsing
	  // location with response’s URL.
	  location = location ? new URL(location, responseURL(response)) : null;

	  // 4. If location is a URL whose fragment is null, then set location’s
	  // fragment to requestFragment.
	  if (location && !location.hash) {
	    location.hash = requestFragment;
	  }

	  // 5. Return location.
	  return location
	}

	/** @returns {URL} */
	function requestCurrentURL (request) {
	  return request.urlList[request.urlList.length - 1]
	}

	function requestBadPort (request) {
	  // 1. Let url be request’s current URL.
	  const url = requestCurrentURL(request);

	  // 2. If url’s scheme is an HTTP(S) scheme and url’s port is a bad port,
	  // then return blocked.
	  if (/^https?:/.test(url.protocol) && badPorts.includes(url.port)) {
	    return 'blocked'
	  }

	  // 3. Return allowed.
	  return 'allowed'
	}

	function isFileLike (object) {
	  if (!File) {
	    File = requireFile().File;
	  }
	  return object instanceof File || (
	    object &&
	    (typeof object.stream === 'function' ||
	     typeof object.arrayBuffer === 'function') &&
	    /^(File)$/.test(object[Symbol.toStringTag])
	  )
	}

	// Check whether |statusText| is a ByteString and
	// matches the Reason-Phrase token production.
	// RFC 2616: https://tools.ietf.org/html/rfc2616
	// RFC 7230: https://tools.ietf.org/html/rfc7230
	// "reason-phrase = *( HTAB / SP / VCHAR / obs-text )"
	// https://github.com/chromium/chromium/blob/94.0.4604.1/third_party/blink/renderer/core/fetch/response.cc#L116
	function isValidReasonPhrase (statusText) {
	  for (let i = 0; i < statusText.length; ++i) {
	    const c = statusText.charCodeAt(i);
	    if (
	      !(
	        (
	          c === 0x09 || // HTAB
	          (c >= 0x20 && c <= 0x7e) || // SP / VCHAR
	          (c >= 0x80 && c <= 0xff)
	        ) // obs-text
	      )
	    ) {
	      return false
	    }
	  }
	  return true
	}

	function isTokenChar (c) {
	  return !(
	    c >= 0x7f ||
	    c <= 0x20 ||
	    c === '(' ||
	    c === ')' ||
	    c === '<' ||
	    c === '>' ||
	    c === '@' ||
	    c === ',' ||
	    c === ';' ||
	    c === ':' ||
	    c === '\\' ||
	    c === '"' ||
	    c === '/' ||
	    c === '[' ||
	    c === ']' ||
	    c === '?' ||
	    c === '=' ||
	    c === '{' ||
	    c === '}'
	  )
	}

	// See RFC 7230, Section 3.2.6.
	// https://github.com/chromium/chromium/blob/d7da0240cae77824d1eda25745c4022757499131/third_party/blink/renderer/platform/network/http_parsers.cc#L321
	function isValidHTTPToken (characters) {
	  if (!characters || typeof characters !== 'string') {
	    return false
	  }
	  for (let i = 0; i < characters.length; ++i) {
	    const c = characters.charCodeAt(i);
	    if (c > 0x7f || !isTokenChar(c)) {
	      return false
	    }
	  }
	  return true
	}

	// https://fetch.spec.whatwg.org/#header-name
	// https://github.com/chromium/chromium/blob/b3d37e6f94f87d59e44662d6078f6a12de845d17/net/http/http_util.cc#L342
	function isValidHeaderName (potentialValue) {
	  if (potentialValue.length === 0) {
	    return false
	  }

	  for (const char of potentialValue) {
	    if (!isValidHTTPToken(char)) {
	      return false
	    }
	  }

	  return true
	}

	/**
	 * @see https://fetch.spec.whatwg.org/#header-value
	 * @param {string} potentialValue
	 */
	function isValidHeaderValue (potentialValue) {
	  // - Has no leading or trailing HTTP tab or space bytes.
	  // - Contains no 0x00 (NUL) or HTTP newline bytes.
	  if (
	    potentialValue.startsWith('\t') ||
	    potentialValue.startsWith(' ') ||
	    potentialValue.endsWith('\t') ||
	    potentialValue.endsWith(' ')
	  ) {
	    return false
	  }

	  if (
	    potentialValue.includes('\0') ||
	    potentialValue.includes('\r') ||
	    potentialValue.includes('\n')
	  ) {
	    return false
	  }

	  return true
	}

	// https://w3c.github.io/webappsec-referrer-policy/#set-requests-referrer-policy-on-redirect
	function setRequestReferrerPolicyOnRedirect (request, actualResponse) {
	}

	// https://fetch.spec.whatwg.org/#cross-origin-resource-policy-check
	function crossOriginResourcePolicyCheck () {
	  // TODO
	  return 'allowed'
	}

	// https://fetch.spec.whatwg.org/#concept-cors-check
	function corsCheck () {
	  // TODO
	  return 'success'
	}

	// https://fetch.spec.whatwg.org/#concept-tao-check
	function TAOCheck () {
	  // TODO
	  return 'success'
	}

	function appendFetchMetadata (httpRequest) {
	  //  https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-dest-header
	  //  TODO

	  //  https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-mode-header

	  //  1. Assert: r’s url is a potentially trustworthy URL.
	  //  TODO

	  //  2. Let header be a Structured Header whose value is a token.
	  let header = null;

	  //  3. Set header’s value to r’s mode.
	  header = httpRequest.mode;

	  //  4. Set a structured field value `Sec-Fetch-Mode`/header in r’s header list.
	  httpRequest.headersList.set('sec-fetch-mode', header);

	  //  https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-site-header
	  //  TODO

	  //  https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-user-header
	  //  TODO
	}

	// https://fetch.spec.whatwg.org/#append-a-request-origin-header
	function appendRequestOriginHeader (request) {
	  // 1. Let serializedOrigin be the result of byte-serializing a request origin with request.
	  let serializedOrigin = request.origin;

	  // 2. If request’s response tainting is "cors" or request’s mode is "websocket", then append (`Origin`, serializedOrigin) to request’s header list.
	  if (request.responseTainting === 'cors' || request.mode === 'websocket') {
	    if (serializedOrigin) {
	      request.headersList.append('Origin', serializedOrigin);
	    }

	  // 3. Otherwise, if request’s method is neither `GET` nor `HEAD`, then:
	  } else if (request.method !== 'GET' && request.method !== 'HEAD') {
	    // 1. Switch on request’s referrer policy:
	    switch (request.referrerPolicy) {
	      case 'no-referrer':
	        // Set serializedOrigin to `null`.
	        serializedOrigin = null;
	        break
	      case 'no-referrer-when-downgrade':
	      case 'strict-origin':
	      case 'strict-origin-when-cross-origin':
	        // If request’s origin is a tuple origin, its scheme is "https", and request’s current URL’s scheme is not "https", then set serializedOrigin to `null`.
	        if (/^https:/.test(request.origin) && !/^https:/.test(requestCurrentURL(request))) {
	          serializedOrigin = null;
	        }
	        break
	      case 'same-origin':
	        // If request’s origin is not same origin with request’s current URL’s origin, then set serializedOrigin to `null`.
	        if (!sameOrigin(request, requestCurrentURL(request))) {
	          serializedOrigin = null;
	        }
	        break
	        // Do nothing.
	    }

	    if (serializedOrigin) {
	      // 2. Append (`Origin`, serializedOrigin) to request’s header list.
	      request.headersList.append('Origin', serializedOrigin);
	    }
	  }
	}

	function coarsenedSharedCurrentTime (crossOriginIsolatedCapability) {
	  // TODO
	  return performance.now()
	}

	// https://fetch.spec.whatwg.org/#create-an-opaque-timing-info
	function createOpaqueTimingInfo (timingInfo) {
	  return {
	    startTime: timingInfo.startTime ?? 0,
	    redirectStartTime: 0,
	    redirectEndTime: 0,
	    postRedirectStartTime: timingInfo.startTime ?? 0,
	    finalServiceWorkerStartTime: 0,
	    finalNetworkResponseStartTime: 0,
	    finalNetworkRequestStartTime: 0,
	    endTime: 0,
	    encodedBodySize: 0,
	    decodedBodySize: 0,
	    finalConnectionTimingInfo: null
	  }
	}

	// https://html.spec.whatwg.org/multipage/origin.html#policy-container
	function makePolicyContainer () {
	  // TODO
	  return {}
	}

	// https://html.spec.whatwg.org/multipage/origin.html#clone-a-policy-container
	function clonePolicyContainer () {
	  // TODO
	  return {}
	}

	// https://w3c.github.io/webappsec-referrer-policy/#determine-requests-referrer
	function determineRequestsReferrer (request) {
	  // TODO
	  return 'no-referrer'
	}

	function matchRequestIntegrity (request, bytes) {
	  return false
	}

	// https://w3c.github.io/webappsec-upgrade-insecure-requests/#upgrade-request
	function tryUpgradeRequestToAPotentiallyTrustworthyURL (request) {
	  // TODO
	}

	/**
	 * @link {https://html.spec.whatwg.org/multipage/origin.html#same-origin}
	 * @param {URL} A
	 * @param {URL} B
	 */
	function sameOrigin (A, B) {
	  // 1. If A and B are the same opaque origin, then return true.
	  // "opaque origin" is an internal value we cannot access, ignore.

	  // 2. If A and B are both tuple origins and their schemes,
	  //    hosts, and port are identical, then return true.
	  if (A.protocol === B.protocol && A.hostname === B.hostname && A.port === B.port) {
	    return true
	  }

	  // 3. Return false.
	  return false
	}

	function createDeferredPromise () {
	  let res;
	  let rej;
	  const promise = new Promise((resolve, reject) => {
	    res = resolve;
	    rej = reject;
	  });

	  return { promise, resolve: res, reject: rej }
	}

	function isAborted (fetchParams) {
	  return fetchParams.controller.state === 'aborted'
	}

	function isCancelled (fetchParams) {
	  return fetchParams.controller.state === 'aborted' ||
	    fetchParams.controller.state === 'terminated'
	}

	// https://fetch.spec.whatwg.org/#concept-method-normalize
	function normalizeMethod (method) {
	  return /^(DELETE|GET|HEAD|OPTIONS|POST|PUT)$/i.test(method)
	    ? method.toUpperCase()
	    : method
	}

	// https://infra.spec.whatwg.org/#serialize-a-javascript-value-to-a-json-string
	function serializeJavascriptValueToJSONString (value) {
	  // 1. Let result be ? Call(%JSON.stringify%, undefined, « value »).
	  const result = JSON.stringify(value);

	  // 2. If result is undefined, then throw a TypeError.
	  if (result === undefined) {
	    throw new TypeError('Value is not JSON serializable')
	  }

	  // 3. Assert: result is a string.
	  assert(typeof result === 'string');

	  // 4. Return result.
	  return result
	}

	// https://tc39.es/ecma262/#sec-%25iteratorprototype%25-object
	const esIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));

	// https://webidl.spec.whatwg.org/#dfn-iterator-prototype-object
	function makeIterator (iterator, name) {
	  const i = {
	    next () {
	      if (Object.getPrototypeOf(this) !== i) {
	        throw new TypeError(
	          `'next' called on an object that does not implement interface ${name} Iterator.`
	        )
	      }

	      return iterator.next()
	    },
	    // The class string of an iterator prototype object for a given interface is the
	    // result of concatenating the identifier of the interface and the string " Iterator".
	    [Symbol.toStringTag]: `${name} Iterator`
	  };

	  // The [[Prototype]] internal slot of an iterator prototype object must be %IteratorPrototype%.
	  Object.setPrototypeOf(i, esIteratorPrototype);
	  // esIteratorPrototype needs to be the prototype of i
	  // which is the prototype of an empty object. Yes, it's confusing.
	  return Object.setPrototypeOf({}, i)
	}

	util$d = {
	  isAborted,
	  isCancelled,
	  createDeferredPromise,
	  ReadableStreamFrom,
	  toUSVString,
	  tryUpgradeRequestToAPotentiallyTrustworthyURL,
	  coarsenedSharedCurrentTime,
	  matchRequestIntegrity,
	  determineRequestsReferrer,
	  makePolicyContainer,
	  clonePolicyContainer,
	  appendFetchMetadata,
	  appendRequestOriginHeader,
	  TAOCheck,
	  corsCheck,
	  crossOriginResourcePolicyCheck,
	  createOpaqueTimingInfo,
	  setRequestReferrerPolicyOnRedirect,
	  isValidHTTPToken,
	  requestBadPort,
	  requestCurrentURL,
	  responseURL,
	  responseLocationURL,
	  isBlobLike,
	  isFileLike,
	  isValidReasonPhrase,
	  sameOrigin,
	  normalizeMethod,
	  serializeJavascriptValueToJSONString,
	  makeIterator,
	  isValidHeaderName,
	  isValidHeaderValue
	};
	return util$d;
}

var formdata;
var hasRequiredFormdata;

function requireFormdata () {
	if (hasRequiredFormdata) return formdata;
	hasRequiredFormdata = 1;

	const { isBlobLike, isFileLike, toUSVString, makeIterator } = requireUtil();
	const { kState } = requireSymbols();
	const { File, FileLike } = requireFile();
	const { webidl } = requireWebidl();
	const { Blob } = require$$6;

	// https://xhr.spec.whatwg.org/#formdata
	class FormData {
	  static name = 'FormData'

	  constructor (form) {
	    if (arguments.length > 0 && form != null) {
	      webidl.errors.conversionFailed({
	        prefix: 'FormData constructor',
	        argument: 'Argument 1',
	        types: ['null']
	      });
	    }

	    this[kState] = [];
	  }

	  append (name, value, filename = undefined) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 2) {
	      throw new TypeError(
	        `Failed to execute 'append' on 'FormData': 2 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    if (arguments.length === 3 && !isBlobLike(value)) {
	      throw new TypeError(
	        "Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'"
	      )
	    }

	    // 1. Let value be value if given; otherwise blobValue.

	    name = webidl.converters.USVString(name);
	    value = isBlobLike(value)
	      ? webidl.converters.Blob(value, { strict: false })
	      : webidl.converters.USVString(value);
	    filename = arguments.length === 3
	      ? webidl.converters.USVString(filename)
	      : undefined;

	    // 2. Let entry be the result of creating an entry with
	    // name, value, and filename if given.
	    const entry = makeEntry(name, value, filename);

	    // 3. Append entry to this’s entry list.
	    this[kState].push(entry);
	  }

	  delete (name) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'delete' on 'FormData': 1 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.USVString(name);

	    // The delete(name) method steps are to remove all entries whose name
	    // is name from this’s entry list.
	    const next = [];
	    for (const entry of this[kState]) {
	      if (entry.name !== name) {
	        next.push(entry);
	      }
	    }

	    this[kState] = next;
	  }

	  get (name) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'get' on 'FormData': 1 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.USVString(name);

	    // 1. If there is no entry whose name is name in this’s entry list,
	    // then return null.
	    const idx = this[kState].findIndex((entry) => entry.name === name);
	    if (idx === -1) {
	      return null
	    }

	    // 2. Return the value of the first entry whose name is name from
	    // this’s entry list.
	    return this[kState][idx].value
	  }

	  getAll (name) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'getAll' on 'FormData': 1 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.USVString(name);

	    // 1. If there is no entry whose name is name in this’s entry list,
	    // then return the empty list.
	    // 2. Return the values of all entries whose name is name, in order,
	    // from this’s entry list.
	    return this[kState]
	      .filter((entry) => entry.name === name)
	      .map((entry) => entry.value)
	  }

	  has (name) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'has' on 'FormData': 1 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.USVString(name);

	    // The has(name) method steps are to return true if there is an entry
	    // whose name is name in this’s entry list; otherwise false.
	    return this[kState].findIndex((entry) => entry.name === name) !== -1
	  }

	  set (name, value, filename = undefined) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 2) {
	      throw new TypeError(
	        `Failed to execute 'set' on 'FormData': 2 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    if (arguments.length === 3 && !isBlobLike(value)) {
	      throw new TypeError(
	        "Failed to execute 'set' on 'FormData': parameter 2 is not of type 'Blob'"
	      )
	    }

	    // The set(name, value) and set(name, blobValue, filename) method steps
	    // are:

	    // 1. Let value be value if given; otherwise blobValue.

	    name = webidl.converters.USVString(name);
	    value = isBlobLike(value)
	      ? webidl.converters.Blob(value, { strict: false })
	      : webidl.converters.USVString(value);
	    filename = arguments.length === 3
	      ? toUSVString(filename)
	      : undefined;

	    // 2. Let entry be the result of creating an entry with name, value, and
	    // filename if given.
	    const entry = makeEntry(name, value, filename);

	    // 3. If there are entries in this’s entry list whose name is name, then
	    // replace the first such entry with entry and remove the others.
	    const idx = this[kState].findIndex((entry) => entry.name === name);
	    if (idx !== -1) {
	      this[kState] = [
	        ...this[kState].slice(0, idx),
	        entry,
	        ...this[kState].slice(idx + 1).filter((entry) => entry.name !== name)
	      ];
	    } else {
	      // 4. Otherwise, append entry to this’s entry list.
	      this[kState].push(entry);
	    }
	  }

	  get [Symbol.toStringTag] () {
	    return this.constructor.name
	  }

	  entries () {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return makeIterator(
	      makeIterable(this[kState], 'entries'),
	      'FormData'
	    )
	  }

	  keys () {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return makeIterator(
	      makeIterable(this[kState], 'keys'),
	      'FormData'
	    )
	  }

	  values () {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return makeIterator(
	      makeIterable(this[kState], 'values'),
	      'FormData'
	    )
	  }

	  /**
	   * @param {(value: string, key: string, self: FormData) => void} callbackFn
	   * @param {unknown} thisArg
	   */
	  forEach (callbackFn, thisArg = globalThis) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'forEach' on 'FormData': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    if (typeof callbackFn !== 'function') {
	      throw new TypeError(
	        "Failed to execute 'forEach' on 'FormData': parameter 1 is not of type 'Function'."
	      )
	    }

	    for (const [key, value] of this) {
	      callbackFn.apply(thisArg, [value, key, this]);
	    }
	  }
	}

	FormData.prototype[Symbol.iterator] = FormData.prototype.entries;

	/**
	 * @see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#create-an-entry
	 * @param {string} name
	 * @param {string|Blob} value
	 * @param {?string} filename
	 * @returns
	 */
	function makeEntry (name, value, filename) {
	  // 1. Set name to the result of converting name into a scalar value string.
	  // "To convert a string into a scalar value string, replace any surrogates
	  //  with U+FFFD."
	  // see: https://nodejs.org/dist/latest-v18.x/docs/api/buffer.html#buftostringencoding-start-end
	  name = Buffer.from(name).toString('utf8');

	  // 2. If value is a string, then set value to the result of converting
	  //    value into a scalar value string.
	  if (typeof value === 'string') {
	    value = Buffer.from(value).toString('utf8');
	  } else {
	    // 3. Otherwise:

	    // 1. If value is not a File object, then set value to a new File object,
	    //    representing the same bytes, whose name attribute value is "blob"
	    if (!isFileLike(value)) {
	      value = value instanceof Blob
	        ? new File([value], 'blob', { type: value.type })
	        : new FileLike(value, 'blob', { type: value.type });
	    }

	    // 2. If filename is given, then set value to a new File object,
	    //    representing the same bytes, whose name attribute is filename.
	    if (filename !== undefined) {
	      value = value instanceof File
	        ? new File([value], filename, { type: value.type })
	        : new FileLike(value, filename, { type: value.type });
	    }
	  }

	  // 4. Return an entry whose name is name and whose value is value.
	  return { name, value }
	}

	function * makeIterable (entries, type) {
	  // The value pairs to iterate over are this’s entry list’s entries
	  // with the key being the name and the value being the value.
	  for (const { name, value } of entries) {
	    if (type === 'entries') {
	      yield [name, value];
	    } else if (type === 'values') {
	      yield value;
	    } else {
	      yield name;
	    }
	  }
	}

	formdata = { FormData };
	return formdata;
}

var body;
var hasRequiredBody;

function requireBody () {
	if (hasRequiredBody) return body;
	hasRequiredBody = 1;

	const util = util$e;
	const { ReadableStreamFrom, toUSVString, isBlobLike } = requireUtil();
	const { FormData } = requireFormdata();
	const { kState } = requireSymbols();
	const { webidl } = requireWebidl();
	const { Blob } = require$$6;
	const { kBodyUsed } = symbols$1;
	const assert = require$$0$1;
	const { NotSupportedError } = errors$1;
	const { isErrored } = util$e;
	const { isUint8Array, isArrayBuffer } = require$$9;

	let ReadableStream;

	async function * blobGen (blob) {
	  if (blob.stream) {
	    yield * blob.stream();
	  } else {
	    // istanbul ignore next: node < 16.7
	    yield await blob.arrayBuffer();
	  }
	}

	// https://fetch.spec.whatwg.org/#concept-bodyinit-extract
	function extractBody (object, keepalive = false) {
	  if (!ReadableStream) {
	    ReadableStream = require$$10.ReadableStream;
	  }

	  // 1. Let stream be object if object is a ReadableStream object.
	  // Otherwise, let stream be a new ReadableStream, and set up stream.
	  let stream = null;

	  // 2. Let action be null.
	  let action = null;

	  // 3. Let source be null.
	  let source = null;

	  // 4. Let length be null.
	  let length = null;

	  // 5. Let Content-Type be null.
	  let contentType = null;

	  // 6. Switch on object:
	  if (object == null) ; else if (object instanceof URLSearchParams) {
	    // URLSearchParams

	    // spec says to run application/x-www-form-urlencoded on body.list
	    // this is implemented in Node.js as apart of an URLSearchParams instance toString method
	    // See: https://github.com/nodejs/node/blob/e46c680bf2b211bbd52cf959ca17ee98c7f657f5/lib/internal/url.js#L490
	    // and https://github.com/nodejs/node/blob/e46c680bf2b211bbd52cf959ca17ee98c7f657f5/lib/internal/url.js#L1100

	    // Set source to the result of running the application/x-www-form-urlencoded serializer with object’s list.
	    source = object.toString();

	    // Set Content-Type to `application/x-www-form-urlencoded;charset=UTF-8`.
	    contentType = 'application/x-www-form-urlencoded;charset=UTF-8';
	  } else if (isArrayBuffer(object) || ArrayBuffer.isView(object)) {
	    // BufferSource

	    if (object instanceof DataView) {
	      // TODO: Blob doesn't seem to work with DataView?
	      object = object.buffer;
	    }

	    // Set source to a copy of the bytes held by object.
	    source = new Uint8Array(object);
	  } else if (util.isFormDataLike(object)) {
	    const boundary = '----formdata-undici-' + Math.random();
	    const prefix = `--${boundary}\r\nContent-Disposition: form-data`;

	    /*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
	    const escape = (str) =>
	      str.replace(/\n/g, '%0A').replace(/\r/g, '%0D').replace(/"/g, '%22');
	    const normalizeLinefeeds = (value) => value.replace(/\r?\n|\r/g, '\r\n');

	    // Set action to this step: run the multipart/form-data
	    // encoding algorithm, with object’s entry list and UTF-8.
	    action = async function * (object) {
	      const enc = new TextEncoder();

	      for (const [name, value] of object) {
	        if (typeof value === 'string') {
	          yield enc.encode(
	            prefix +
	              `; name="${escape(normalizeLinefeeds(name))}"` +
	              `\r\n\r\n${normalizeLinefeeds(value)}\r\n`
	          );
	        } else {
	          yield enc.encode(
	            prefix +
	              `; name="${escape(normalizeLinefeeds(name))}"` +
	              (value.name ? `; filename="${escape(value.name)}"` : '') +
	              '\r\n' +
	              `Content-Type: ${
	                value.type || 'application/octet-stream'
	              }\r\n\r\n`
	          );

	          yield * blobGen(value);

	          yield enc.encode('\r\n');
	        }
	      }

	      yield enc.encode(`--${boundary}--`);
	    };

	    // Set source to object.
	    source = object;

	    // Set length to unclear, see html/6424 for improving this.
	    // TODO

	    // Set Content-Type to `multipart/form-data; boundary=`,
	    // followed by the multipart/form-data boundary string generated
	    // by the multipart/form-data encoding algorithm.
	    contentType = 'multipart/form-data; boundary=' + boundary;
	  } else if (isBlobLike(object)) {
	    // Blob

	    // Set action to this step: read object.
	    action = blobGen;

	    // Set source to object.
	    source = object;

	    // Set length to object’s size.
	    length = object.size;

	    // If object’s type attribute is not the empty byte sequence, set
	    // Content-Type to its value.
	    if (object.type) {
	      contentType = object.type;
	    }
	  } else if (typeof object[Symbol.asyncIterator] === 'function') {
	    // If keepalive is true, then throw a TypeError.
	    if (keepalive) {
	      throw new TypeError('keepalive')
	    }

	    // If object is disturbed or locked, then throw a TypeError.
	    if (util.isDisturbed(object) || object.locked) {
	      throw new TypeError(
	        'Response body object should not be disturbed or locked'
	      )
	    }

	    stream =
	      object instanceof ReadableStream ? object : ReadableStreamFrom(object);
	  } else {
	    // TODO: byte sequence?
	    // TODO: scalar value string?
	    // TODO: else?
	    source = toUSVString(object);
	    contentType = 'text/plain;charset=UTF-8';
	  }

	  // 7. If source is a byte sequence, then set action to a
	  // step that returns source and length to source’s length.
	  // TODO: What is a "byte sequence?"
	  if (typeof source === 'string' || util.isBuffer(source)) {
	    length = Buffer.byteLength(source);
	  }

	  // 8. If action is non-null, then run these steps in in parallel:
	  if (action != null) {
	    // Run action.
	    let iterator;
	    stream = new ReadableStream({
	      async start () {
	        iterator = action(object)[Symbol.asyncIterator]();
	      },
	      async pull (controller) {
	        const { value, done } = await iterator.next();
	        if (done) {
	          // When running action is done, close stream.
	          queueMicrotask(() => {
	            controller.close();
	          });
	        } else {
	          // Whenever one or more bytes are available and stream is not errored,
	          // enqueue a Uint8Array wrapping an ArrayBuffer containing the available
	          // bytes into stream.
	          if (!isErrored(stream)) {
	            controller.enqueue(new Uint8Array(value));
	          }
	        }
	        return controller.desiredSize > 0
	      },
	      async cancel (reason) {
	        await iterator.return();
	      }
	    });
	  } else if (!stream) {
	    // TODO: Spec doesn't say anything about this?
	    stream = new ReadableStream({
	      async pull (controller) {
	        controller.enqueue(
	          typeof source === 'string' ? new TextEncoder().encode(source) : source
	        );
	        queueMicrotask(() => {
	          controller.close();
	        });
	      }
	    });
	  }

	  // 9. Let body be a body whose stream is stream, source is source,
	  // and length is length.
	  const body = { stream, source, length };

	  // 10. Return body and Content-Type.
	  return [body, contentType]
	}

	// https://fetch.spec.whatwg.org/#bodyinit-safely-extract
	function safelyExtractBody (object, keepalive = false) {
	  if (!ReadableStream) {
	    // istanbul ignore next
	    ReadableStream = require$$10.ReadableStream;
	  }

	  // To safely extract a body and a `Content-Type` value from
	  // a byte sequence or BodyInit object object, run these steps:

	  // 1. If object is a ReadableStream object, then:
	  if (object instanceof ReadableStream) {
	    // Assert: object is neither disturbed nor locked.
	    // istanbul ignore next
	    assert(!util.isDisturbed(object), 'disturbed');
	    // istanbul ignore next
	    assert(!object.locked, 'locked');
	  }

	  // 2. Return the results of extracting object.
	  return extractBody(object, keepalive)
	}

	function cloneBody (body) {
	  // To clone a body body, run these steps:

	  // https://fetch.spec.whatwg.org/#concept-body-clone

	  // 1. Let « out1, out2 » be the result of teeing body’s stream.
	  const [out1, out2] = body.stream.tee();

	  // 2. Set body’s stream to out1.
	  body.stream = out1;

	  // 3. Return a body whose stream is out2 and other members are copied from body.
	  return {
	    stream: out2,
	    length: body.length,
	    source: body.source
	  }
	}

	function bodyMixinMethods (instance) {
	  const methods = {
	    async blob () {
	      if (!(this instanceof instance)) {
	        throw new TypeError('Illegal invocation')
	      }

	      const chunks = [];

	      if (this[kState].body) {
	        if (isUint8Array(this[kState].body)) {
	          chunks.push(this[kState].body);
	        } else {
	          const stream = this[kState].body.stream;

	          if (util.isDisturbed(stream)) {
	            throw new TypeError('disturbed')
	          }

	          if (stream.locked) {
	            throw new TypeError('locked')
	          }

	          // Compat.
	          stream[kBodyUsed] = true;

	          for await (const chunk of stream) {
	            chunks.push(chunk);
	          }
	        }
	      }

	      return new Blob(chunks, { type: this.headers.get('Content-Type') || '' })
	    },

	    async arrayBuffer () {
	      if (!(this instanceof instance)) {
	        throw new TypeError('Illegal invocation')
	      }

	      const blob = await this.blob();
	      return await blob.arrayBuffer()
	    },

	    async text () {
	      if (!(this instanceof instance)) {
	        throw new TypeError('Illegal invocation')
	      }

	      const blob = await this.blob();
	      return toUSVString(await blob.text())
	    },

	    async json () {
	      if (!(this instanceof instance)) {
	        throw new TypeError('Illegal invocation')
	      }

	      return JSON.parse(await this.text())
	    },

	    async formData () {
	      if (!(this instanceof instance)) {
	        throw new TypeError('Illegal invocation')
	      }

	      const contentType = this.headers.get('Content-Type');

	      // If mimeType’s essence is "multipart/form-data", then:
	      if (/multipart\/form-data/.test(contentType)) {
	        throw new NotSupportedError('multipart/form-data not supported')
	      } else if (/application\/x-www-form-urlencoded/.test(contentType)) {
	        // Otherwise, if mimeType’s essence is "application/x-www-form-urlencoded", then:

	        // 1. Let entries be the result of parsing bytes.
	        let entries;
	        try {
	          entries = new URLSearchParams(await this.text());
	        } catch (err) {
	          // istanbul ignore next: Unclear when new URLSearchParams can fail on a string.
	          // 2. If entries is failure, then throw a TypeError.
	          throw Object.assign(new TypeError(), { cause: err })
	        }

	        // 3. Return a new FormData object whose entries are entries.
	        const formData = new FormData();
	        for (const [name, value] of entries) {
	          formData.append(name, value);
	        }
	        return formData
	      } else {
	        // Otherwise, throw a TypeError.
	        webidl.errors.exception({
	          header: `${instance.name}.formData`,
	          value: 'Could not parse content as FormData.'
	        });
	      }
	    }
	  };

	  return methods
	}

	const properties = {
	  body: {
	    enumerable: true,
	    get () {
	      if (!this || !this[kState]) {
	        throw new TypeError('Illegal invocation')
	      }

	      return this[kState].body ? this[kState].body.stream : null
	    }
	  },
	  bodyUsed: {
	    enumerable: true,
	    get () {
	      if (!this || !this[kState]) {
	        throw new TypeError('Illegal invocation')
	      }

	      return !!this[kState].body && util.isDisturbed(this[kState].body.stream)
	    }
	  }
	};

	function mixinBody (prototype) {
	  Object.assign(prototype.prototype, bodyMixinMethods(prototype));
	  Object.defineProperties(prototype.prototype, properties);
	}

	body = {
	  extractBody,
	  safelyExtractBody,
	  cloneBody,
	  mixinBody
	};
	return body;
}

const {
  InvalidArgumentError: InvalidArgumentError$d,
  NotSupportedError: NotSupportedError$1
} = errors$1;
const assert$6 = require$$0$1;
const util$c = util$e;

const kHandler = Symbol('handler');

const channels$1 = {};

let extractBody;

const nodeVersion$1 = process.versions.node.split('.');
const nodeMajor$1 = Number(nodeVersion$1[0]);
const nodeMinor$1 = Number(nodeVersion$1[1]);

try {
  const diagnosticsChannel = require('diagnostics_channel');
  channels$1.create = diagnosticsChannel.channel('undici:request:create');
  channels$1.bodySent = diagnosticsChannel.channel('undici:request:bodySent');
  channels$1.headers = diagnosticsChannel.channel('undici:request:headers');
  channels$1.trailers = diagnosticsChannel.channel('undici:request:trailers');
  channels$1.error = diagnosticsChannel.channel('undici:request:error');
} catch {
  channels$1.create = { hasSubscribers: false };
  channels$1.bodySent = { hasSubscribers: false };
  channels$1.headers = { hasSubscribers: false };
  channels$1.trailers = { hasSubscribers: false };
  channels$1.error = { hasSubscribers: false };
}

class Request$3 {
  constructor (origin, {
    path,
    method,
    body,
    headers,
    query,
    idempotent,
    blocking,
    upgrade,
    headersTimeout,
    bodyTimeout,
    throwOnError
  }, handler) {
    if (typeof path !== 'string') {
      throw new InvalidArgumentError$d('path must be a string')
    } else if (
      path[0] !== '/' &&
      !(path.startsWith('http://') || path.startsWith('https://')) &&
      method !== 'CONNECT'
    ) {
      throw new InvalidArgumentError$d('path must be an absolute URL or start with a slash')
    }

    if (typeof method !== 'string') {
      throw new InvalidArgumentError$d('method must be a string')
    }

    if (upgrade && typeof upgrade !== 'string') {
      throw new InvalidArgumentError$d('upgrade must be a string')
    }

    if (headersTimeout != null && (!Number.isFinite(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError$d('invalid headersTimeout')
    }

    if (bodyTimeout != null && (!Number.isFinite(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError$d('invalid bodyTimeout')
    }

    this.headersTimeout = headersTimeout;

    this.bodyTimeout = bodyTimeout;

    this.throwOnError = throwOnError === true;

    this.method = method;

    if (body == null) {
      this.body = null;
    } else if (util$c.isStream(body)) {
      this.body = body;
    } else if (util$c.isBuffer(body)) {
      this.body = body.byteLength ? body : null;
    } else if (ArrayBuffer.isView(body)) {
      this.body = body.buffer.byteLength ? Buffer.from(body.buffer, body.byteOffset, body.byteLength) : null;
    } else if (body instanceof ArrayBuffer) {
      this.body = body.byteLength ? Buffer.from(body) : null;
    } else if (typeof body === 'string') {
      this.body = body.length ? Buffer.from(body) : null;
    } else if (util$c.isFormDataLike(body) || util$c.isIterable(body) || util$c.isBlobLike(body)) {
      this.body = body;
    } else {
      throw new InvalidArgumentError$d('body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable')
    }

    this.completed = false;

    this.aborted = false;

    this.upgrade = upgrade || null;

    this.path = query ? util$c.buildURL(path, query) : path;

    this.origin = origin;

    this.idempotent = idempotent == null
      ? method === 'HEAD' || method === 'GET'
      : idempotent;

    this.blocking = blocking == null ? false : blocking;

    this.host = null;

    this.contentLength = null;

    this.contentType = null;

    this.headers = '';

    if (Array.isArray(headers)) {
      if (headers.length % 2 !== 0) {
        throw new InvalidArgumentError$d('headers array must be even')
      }
      for (let i = 0; i < headers.length; i += 2) {
        processHeader(this, headers[i], headers[i + 1]);
      }
    } else if (headers && typeof headers === 'object') {
      const keys = Object.keys(headers);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        processHeader(this, key, headers[key]);
      }
    } else if (headers != null) {
      throw new InvalidArgumentError$d('headers must be an object or an array')
    }

    if (util$c.isFormDataLike(this.body)) {
      if (nodeMajor$1 < 16 || (nodeMajor$1 === 16 && nodeMinor$1 < 5)) {
        throw new InvalidArgumentError$d('Form-Data bodies are only supported in node v16.5 and newer.')
      }

      if (!extractBody) {
        extractBody = requireBody().extractBody;
      }

      const [bodyStream, contentType] = extractBody(body);
      if (this.contentType == null) {
        this.contentType = contentType;
        this.headers += `content-type: ${contentType}\r\n`;
      }
      this.body = bodyStream.stream;
    } else if (util$c.isBlobLike(body) && this.contentType == null && body.type) {
      this.contentType = body.type;
      this.headers += `content-type: ${body.type}\r\n`;
    }

    util$c.validateHandler(handler, method, upgrade);

    this.servername = util$c.getServerName(this.host);

    this[kHandler] = handler;

    if (channels$1.create.hasSubscribers) {
      channels$1.create.publish({ request: this });
    }
  }

  onBodySent (chunk) {
    if (this[kHandler].onBodySent) {
      try {
        this[kHandler].onBodySent(chunk);
      } catch (err) {
        this.onError(err);
      }
    }
  }

  onRequestSent () {
    if (channels$1.bodySent.hasSubscribers) {
      channels$1.bodySent.publish({ request: this });
    }
  }

  onConnect (abort) {
    assert$6(!this.aborted);
    assert$6(!this.completed);

    return this[kHandler].onConnect(abort)
  }

  onHeaders (statusCode, headers, resume, statusText) {
    assert$6(!this.aborted);
    assert$6(!this.completed);

    if (channels$1.headers.hasSubscribers) {
      channels$1.headers.publish({ request: this, response: { statusCode, headers, statusText } });
    }

    return this[kHandler].onHeaders(statusCode, headers, resume, statusText)
  }

  onData (chunk) {
    assert$6(!this.aborted);
    assert$6(!this.completed);

    return this[kHandler].onData(chunk)
  }

  onUpgrade (statusCode, headers, socket) {
    assert$6(!this.aborted);
    assert$6(!this.completed);

    return this[kHandler].onUpgrade(statusCode, headers, socket)
  }

  onComplete (trailers) {
    assert$6(!this.aborted);

    this.completed = true;
    if (channels$1.trailers.hasSubscribers) {
      channels$1.trailers.publish({ request: this, trailers });
    }
    return this[kHandler].onComplete(trailers)
  }

  onError (error) {
    if (channels$1.error.hasSubscribers) {
      channels$1.error.publish({ request: this, error });
    }

    if (this.aborted) {
      return
    }
    this.aborted = true;
    return this[kHandler].onError(error)
  }

  addHeader (key, value) {
    processHeader(this, key, value);
    return this
  }
}

function processHeader (request, key, val) {
  if (val && typeof val === 'object') {
    throw new InvalidArgumentError$d(`invalid ${key} header`)
  } else if (val === undefined) {
    return
  }

  if (
    request.host === null &&
    key.length === 4 &&
    key.toLowerCase() === 'host'
  ) {
    // Consumed by Client
    request.host = val;
  } else if (
    request.contentLength === null &&
    key.length === 14 &&
    key.toLowerCase() === 'content-length'
  ) {
    request.contentLength = parseInt(val, 10);
    if (!Number.isFinite(request.contentLength)) {
      throw new InvalidArgumentError$d('invalid content-length header')
    }
  } else if (
    request.contentType === null &&
    key.length === 12 &&
    key.toLowerCase() === 'content-type'
  ) {
    request.contentType = val;
    request.headers += `${key}: ${val}\r\n`;
  } else if (
    key.length === 17 &&
    key.toLowerCase() === 'transfer-encoding'
  ) {
    throw new InvalidArgumentError$d('invalid transfer-encoding header')
  } else if (
    key.length === 10 &&
    key.toLowerCase() === 'connection'
  ) {
    throw new InvalidArgumentError$d('invalid connection header')
  } else if (
    key.length === 10 &&
    key.toLowerCase() === 'keep-alive'
  ) {
    throw new InvalidArgumentError$d('invalid keep-alive header')
  } else if (
    key.length === 7 &&
    key.toLowerCase() === 'upgrade'
  ) {
    throw new InvalidArgumentError$d('invalid upgrade header')
  } else if (
    key.length === 6 &&
    key.toLowerCase() === 'expect'
  ) {
    throw new NotSupportedError$1('expect header not supported')
  } else {
    request.headers += `${key}: ${val}\r\n`;
  }
}

var request$2 = Request$3;

const EventEmitter = require$$0$3;

class Dispatcher$2 extends EventEmitter {
  dispatch () {
    throw new Error('not implemented')
  }

  close () {
    throw new Error('not implemented')
  }

  destroy () {
    throw new Error('not implemented')
  }
}

var dispatcher = Dispatcher$2;

const Dispatcher$1 = dispatcher;
const {
  ClientDestroyedError,
  ClientClosedError,
  InvalidArgumentError: InvalidArgumentError$c
} = errors$1;
const { kDestroy: kDestroy$3, kClose: kClose$3, kDispatch: kDispatch$3 } = symbols$1;

const kDestroyed = Symbol('destroyed');
const kClosed = Symbol('closed');
const kOnDestroyed = Symbol('onDestroyed');
const kOnClosed = Symbol('onClosed');

class DispatcherBase$3 extends Dispatcher$1 {
  constructor () {
    super();

    this[kDestroyed] = false;
    this[kOnDestroyed] = [];
    this[kClosed] = false;
    this[kOnClosed] = [];
  }

  get destroyed () {
    return this[kDestroyed]
  }

  get closed () {
    return this[kClosed]
  }

  close (callback) {
    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        this.close((err, data) => {
          return err ? reject(err) : resolve(data)
        });
      })
    }

    if (typeof callback !== 'function') {
      throw new InvalidArgumentError$c('invalid callback')
    }

    if (this[kDestroyed]) {
      queueMicrotask(() => callback(new ClientDestroyedError(), null));
      return
    }

    if (this[kClosed]) {
      if (this[kOnClosed]) {
        this[kOnClosed].push(callback);
      } else {
        queueMicrotask(() => callback(null, null));
      }
      return
    }

    this[kClosed] = true;
    this[kOnClosed].push(callback);

    const onClosed = () => {
      const callbacks = this[kOnClosed];
      this[kOnClosed] = null;
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](null, null);
      }
    };

    // Should not error.
    this[kClose$3]()
      .then(() => this.destroy())
      .then(() => {
        queueMicrotask(onClosed);
      });
  }

  destroy (err, callback) {
    if (typeof err === 'function') {
      callback = err;
      err = null;
    }

    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        this.destroy(err, (err, data) => {
          return err ? /* istanbul ignore next: should never error */ reject(err) : resolve(data)
        });
      })
    }

    if (typeof callback !== 'function') {
      throw new InvalidArgumentError$c('invalid callback')
    }

    if (this[kDestroyed]) {
      if (this[kOnDestroyed]) {
        this[kOnDestroyed].push(callback);
      } else {
        queueMicrotask(() => callback(null, null));
      }
      return
    }

    if (!err) {
      err = new ClientDestroyedError();
    }

    this[kDestroyed] = true;
    this[kOnDestroyed].push(callback);

    const onDestroyed = () => {
      const callbacks = this[kOnDestroyed];
      this[kOnDestroyed] = null;
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](null, null);
      }
    };

    // Should not error.
    this[kDestroy$3](err).then(() => {
      queueMicrotask(onDestroyed);
    });
  }

  dispatch (opts, handler) {
    if (!handler || typeof handler !== 'object') {
      throw new InvalidArgumentError$c('handler must be an object')
    }

    try {
      if (!opts || typeof opts !== 'object') {
        throw new InvalidArgumentError$c('opts must be an object.')
      }

      if (this[kDestroyed]) {
        throw new ClientDestroyedError()
      }

      if (this[kClosed]) {
        throw new ClientClosedError()
      }

      return this[kDispatch$3](opts, handler)
    } catch (err) {
      if (typeof handler.onError !== 'function') {
        throw new InvalidArgumentError$c('invalid onError method')
      }

      handler.onError(err);

      return false
    }
  }
}

var dispatcherBase = DispatcherBase$3;

const util$b = util$e;
const { kBodyUsed } = symbols$1;
const assert$5 = require$$0$1;
const { InvalidArgumentError: InvalidArgumentError$b } = errors$1;
const EE = require$$0$3;

const redirectableStatusCodes = [300, 301, 302, 303, 307, 308];

const kBody$1 = Symbol('body');

class BodyAsyncIterable {
  constructor (body) {
    this[kBody$1] = body;
    this[kBodyUsed] = false;
  }

  async * [Symbol.asyncIterator] () {
    assert$5(!this[kBodyUsed], 'disturbed');
    this[kBodyUsed] = true;
    yield * this[kBody$1];
  }
}

class RedirectHandler$2 {
  constructor (dispatcher, maxRedirections, opts, handler) {
    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError$b('maxRedirections must be a positive number')
    }

    util$b.validateHandler(handler, opts.method, opts.upgrade);

    this.dispatcher = dispatcher;
    this.location = null;
    this.abort = null;
    this.opts = { ...opts, maxRedirections: 0 }; // opts must be a copy
    this.maxRedirections = maxRedirections;
    this.handler = handler;
    this.history = [];

    if (util$b.isStream(this.opts.body)) {
      // TODO (fix): Provide some way for the user to cache the file to e.g. /tmp
      // so that it can be dispatched again?
      // TODO (fix): Do we need 100-expect support to provide a way to do this properly?
      if (util$b.bodyLength(this.opts.body) === 0) {
        this.opts.body
          .on('data', function () {
            assert$5(false);
          });
      }

      if (typeof this.opts.body.readableDidRead !== 'boolean') {
        this.opts.body[kBodyUsed] = false;
        EE.prototype.on.call(this.opts.body, 'data', function () {
          this[kBodyUsed] = true;
        });
      }
    } else if (this.opts.body && typeof this.opts.body.pipeTo === 'function') {
      // TODO (fix): We can't access ReadableStream internal state
      // to determine whether or not it has been disturbed. This is just
      // a workaround.
      this.opts.body = new BodyAsyncIterable(this.opts.body);
    } else if (
      this.opts.body &&
      typeof this.opts.body !== 'string' &&
      !ArrayBuffer.isView(this.opts.body) &&
      util$b.isIterable(this.opts.body)
    ) {
      // TODO: Should we allow re-using iterable if !this.opts.idempotent
      // or through some other flag?
      this.opts.body = new BodyAsyncIterable(this.opts.body);
    }
  }

  onConnect (abort) {
    this.abort = abort;
    this.handler.onConnect(abort, { history: this.history });
  }

  onUpgrade (statusCode, headers, socket) {
    this.handler.onUpgrade(statusCode, headers, socket);
  }

  onError (error) {
    this.handler.onError(error);
  }

  onHeaders (statusCode, headers, resume, statusText) {
    this.location = this.history.length >= this.maxRedirections || util$b.isDisturbed(this.opts.body)
      ? null
      : parseLocation(statusCode, headers);

    if (this.opts.origin) {
      this.history.push(new URL(this.opts.path, this.opts.origin));
    }

    if (!this.location) {
      return this.handler.onHeaders(statusCode, headers, resume, statusText)
    }

    const { origin, pathname, search } = util$b.parseURL(new URL(this.location, this.opts.origin && new URL(this.opts.path, this.opts.origin)));
    const path = search ? `${pathname}${search}` : pathname;

    // Remove headers referring to the original URL.
    // By default it is Host only, unless it's a 303 (see below), which removes also all Content-* headers.
    // https://tools.ietf.org/html/rfc7231#section-6.4
    this.opts.headers = cleanRequestHeaders(this.opts.headers, statusCode === 303, this.opts.origin !== origin);
    this.opts.path = path;
    this.opts.origin = origin;
    this.opts.maxRedirections = 0;

    // https://tools.ietf.org/html/rfc7231#section-6.4.4
    // In case of HTTP 303, always replace method to be either HEAD or GET
    if (statusCode === 303 && this.opts.method !== 'HEAD') {
      this.opts.method = 'GET';
      this.opts.body = null;
    }
  }

  onData (chunk) {
    if (this.location) ; else {
      return this.handler.onData(chunk)
    }
  }

  onComplete (trailers) {
    if (this.location) {
      /*
        https://tools.ietf.org/html/rfc7231#section-6.4

        TLDR: undici always ignores 3xx response trailers as they are not expected in case of redirections
        and neither are useful if present.

        See comment on onData method above for more detailed informations.
      */

      this.location = null;
      this.abort = null;

      this.dispatcher.dispatch(this.opts, this);
    } else {
      this.handler.onComplete(trailers);
    }
  }

  onBodySent (chunk) {
    if (this.handler.onBodySent) {
      this.handler.onBodySent(chunk);
    }
  }
}

function parseLocation (statusCode, headers) {
  if (redirectableStatusCodes.indexOf(statusCode) === -1) {
    return null
  }

  for (let i = 0; i < headers.length; i += 2) {
    if (headers[i].toString().toLowerCase() === 'location') {
      return headers[i + 1]
    }
  }
}

// https://tools.ietf.org/html/rfc7231#section-6.4.4
function shouldRemoveHeader (header, removeContent, unknownOrigin) {
  return (
    (header.length === 4 && header.toString().toLowerCase() === 'host') ||
    (removeContent && header.toString().toLowerCase().indexOf('content-') === 0) ||
    (unknownOrigin && header.length === 13 && header.toString().toLowerCase() === 'authorization')
  )
}

// https://tools.ietf.org/html/rfc7231#section-6.4
function cleanRequestHeaders (headers, removeContent, unknownOrigin) {
  const ret = [];
  if (Array.isArray(headers)) {
    for (let i = 0; i < headers.length; i += 2) {
      if (!shouldRemoveHeader(headers[i], removeContent, unknownOrigin)) {
        ret.push(headers[i], headers[i + 1]);
      }
    }
  } else if (headers && typeof headers === 'object') {
    for (const key of Object.keys(headers)) {
      if (!shouldRemoveHeader(key, removeContent, unknownOrigin)) {
        ret.push(key, headers[key]);
      }
    }
  } else {
    assert$5(headers == null, 'headers must be an object or an array');
  }
  return ret
}

var redirect = RedirectHandler$2;

const net$1 = require$$4;
const assert$4 = require$$0$1;
const util$a = util$e;
const { InvalidArgumentError: InvalidArgumentError$a, ConnectTimeoutError } = errors$1;
let tls; // include tls conditionally since it is not always available

// TODO: session re-use does not wait for the first
// connection to resolve the session and might therefore
// resolve the same servername multiple times even when
// re-use is enabled.

function buildConnector$2 ({ maxCachedSessions, socketPath, timeout, ...opts }) {
  if (maxCachedSessions != null && (!Number.isInteger(maxCachedSessions) || maxCachedSessions < 0)) {
    throw new InvalidArgumentError$a('maxCachedSessions must be a positive integer or zero')
  }

  const options = { path: socketPath, ...opts };
  const sessionCache = new Map();
  timeout = timeout == null ? 10e3 : timeout;
  maxCachedSessions = maxCachedSessions == null ? 100 : maxCachedSessions;

  return function connect ({ hostname, host, protocol, port, servername, httpSocket }, callback) {
    let socket;
    if (protocol === 'https:') {
      if (!tls) {
        tls = require$$4$1;
      }
      servername = servername || options.servername || util$a.getServerName(host) || null;

      const sessionKey = servername || hostname;
      const session = sessionCache.get(sessionKey) || null;

      assert$4(sessionKey);

      socket = tls.connect({
        highWaterMark: 16384, // TLS in node can't have bigger HWM anyway...
        ...options,
        servername,
        session,
        socket: httpSocket, // upgrade socket connection
        port: port || 443,
        host: hostname
      });

      socket
        .on('session', function (session) {
          // cache is disabled
          if (maxCachedSessions === 0) {
            return
          }

          if (sessionCache.size >= maxCachedSessions) {
            // remove the oldest session
            const { value: oldestKey } = sessionCache.keys().next();
            sessionCache.delete(oldestKey);
          }

          sessionCache.set(sessionKey, session);
        })
        .on('error', function (err) {
          if (sessionKey && err.code !== 'UND_ERR_INFO') {
            // TODO (fix): Only delete for session related errors.
            sessionCache.delete(sessionKey);
          }
        });
    } else {
      assert$4(!httpSocket, 'httpSocket can only be sent on TLS update');
      socket = net$1.connect({
        highWaterMark: 64 * 1024, // Same as nodejs fs streams.
        ...options,
        port: port || 80,
        host: hostname
      });
    }

    const timeoutId = timeout
      ? setTimeout(onConnectTimeout, timeout, socket)
      : null;

    socket
      .setNoDelay(true)
      .once(protocol === 'https:' ? 'secureConnect' : 'connect', function () {
        clearTimeout(timeoutId);

        if (callback) {
          const cb = callback;
          callback = null;
          cb(null, this);
        }
      })
      .on('error', function (err) {
        clearTimeout(timeoutId);

        if (callback) {
          const cb = callback;
          callback = null;
          cb(err);
        }
      });

    return socket
  }
}

function onConnectTimeout (socket) {
  util$a.destroy(socket, new ConnectTimeoutError());
}

var connect$2 = buildConnector$2;

var constants$1 = {};

var utils = {};

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	Object.defineProperty(utils, "__esModule", { value: true });
	utils.enumToMap = void 0;
	function enumToMap(obj) {
	    const res = {};
	    Object.keys(obj).forEach((key) => {
	        const value = obj[key];
	        if (typeof value === 'number') {
	            res[key] = value;
	        }
	    });
	    return res;
	}
	utils.enumToMap = enumToMap;
	
	return utils;
}

var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants$1;
	hasRequiredConstants = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.SPECIAL_HEADERS = exports.HEADER_STATE = exports.MINOR = exports.MAJOR = exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS = exports.TOKEN = exports.STRICT_TOKEN = exports.HEX = exports.URL_CHAR = exports.STRICT_URL_CHAR = exports.USERINFO_CHARS = exports.MARK = exports.ALPHANUM = exports.NUM = exports.HEX_MAP = exports.NUM_MAP = exports.ALPHA = exports.FINISH = exports.H_METHOD_MAP = exports.METHOD_MAP = exports.METHODS_RTSP = exports.METHODS_ICE = exports.METHODS_HTTP = exports.METHODS = exports.LENIENT_FLAGS = exports.FLAGS = exports.TYPE = exports.ERROR = void 0;
		const utils_1 = requireUtils();
		(function (ERROR) {
		    ERROR[ERROR["OK"] = 0] = "OK";
		    ERROR[ERROR["INTERNAL"] = 1] = "INTERNAL";
		    ERROR[ERROR["STRICT"] = 2] = "STRICT";
		    ERROR[ERROR["LF_EXPECTED"] = 3] = "LF_EXPECTED";
		    ERROR[ERROR["UNEXPECTED_CONTENT_LENGTH"] = 4] = "UNEXPECTED_CONTENT_LENGTH";
		    ERROR[ERROR["CLOSED_CONNECTION"] = 5] = "CLOSED_CONNECTION";
		    ERROR[ERROR["INVALID_METHOD"] = 6] = "INVALID_METHOD";
		    ERROR[ERROR["INVALID_URL"] = 7] = "INVALID_URL";
		    ERROR[ERROR["INVALID_CONSTANT"] = 8] = "INVALID_CONSTANT";
		    ERROR[ERROR["INVALID_VERSION"] = 9] = "INVALID_VERSION";
		    ERROR[ERROR["INVALID_HEADER_TOKEN"] = 10] = "INVALID_HEADER_TOKEN";
		    ERROR[ERROR["INVALID_CONTENT_LENGTH"] = 11] = "INVALID_CONTENT_LENGTH";
		    ERROR[ERROR["INVALID_CHUNK_SIZE"] = 12] = "INVALID_CHUNK_SIZE";
		    ERROR[ERROR["INVALID_STATUS"] = 13] = "INVALID_STATUS";
		    ERROR[ERROR["INVALID_EOF_STATE"] = 14] = "INVALID_EOF_STATE";
		    ERROR[ERROR["INVALID_TRANSFER_ENCODING"] = 15] = "INVALID_TRANSFER_ENCODING";
		    ERROR[ERROR["CB_MESSAGE_BEGIN"] = 16] = "CB_MESSAGE_BEGIN";
		    ERROR[ERROR["CB_HEADERS_COMPLETE"] = 17] = "CB_HEADERS_COMPLETE";
		    ERROR[ERROR["CB_MESSAGE_COMPLETE"] = 18] = "CB_MESSAGE_COMPLETE";
		    ERROR[ERROR["CB_CHUNK_HEADER"] = 19] = "CB_CHUNK_HEADER";
		    ERROR[ERROR["CB_CHUNK_COMPLETE"] = 20] = "CB_CHUNK_COMPLETE";
		    ERROR[ERROR["PAUSED"] = 21] = "PAUSED";
		    ERROR[ERROR["PAUSED_UPGRADE"] = 22] = "PAUSED_UPGRADE";
		    ERROR[ERROR["PAUSED_H2_UPGRADE"] = 23] = "PAUSED_H2_UPGRADE";
		    ERROR[ERROR["USER"] = 24] = "USER";
		})(exports.ERROR || (exports.ERROR = {}));
		(function (TYPE) {
		    TYPE[TYPE["BOTH"] = 0] = "BOTH";
		    TYPE[TYPE["REQUEST"] = 1] = "REQUEST";
		    TYPE[TYPE["RESPONSE"] = 2] = "RESPONSE";
		})(exports.TYPE || (exports.TYPE = {}));
		(function (FLAGS) {
		    FLAGS[FLAGS["CONNECTION_KEEP_ALIVE"] = 1] = "CONNECTION_KEEP_ALIVE";
		    FLAGS[FLAGS["CONNECTION_CLOSE"] = 2] = "CONNECTION_CLOSE";
		    FLAGS[FLAGS["CONNECTION_UPGRADE"] = 4] = "CONNECTION_UPGRADE";
		    FLAGS[FLAGS["CHUNKED"] = 8] = "CHUNKED";
		    FLAGS[FLAGS["UPGRADE"] = 16] = "UPGRADE";
		    FLAGS[FLAGS["CONTENT_LENGTH"] = 32] = "CONTENT_LENGTH";
		    FLAGS[FLAGS["SKIPBODY"] = 64] = "SKIPBODY";
		    FLAGS[FLAGS["TRAILING"] = 128] = "TRAILING";
		    // 1 << 8 is unused
		    FLAGS[FLAGS["TRANSFER_ENCODING"] = 512] = "TRANSFER_ENCODING";
		})(exports.FLAGS || (exports.FLAGS = {}));
		(function (LENIENT_FLAGS) {
		    LENIENT_FLAGS[LENIENT_FLAGS["HEADERS"] = 1] = "HEADERS";
		    LENIENT_FLAGS[LENIENT_FLAGS["CHUNKED_LENGTH"] = 2] = "CHUNKED_LENGTH";
		    LENIENT_FLAGS[LENIENT_FLAGS["KEEP_ALIVE"] = 4] = "KEEP_ALIVE";
		})(exports.LENIENT_FLAGS || (exports.LENIENT_FLAGS = {}));
		var METHODS;
		(function (METHODS) {
		    METHODS[METHODS["DELETE"] = 0] = "DELETE";
		    METHODS[METHODS["GET"] = 1] = "GET";
		    METHODS[METHODS["HEAD"] = 2] = "HEAD";
		    METHODS[METHODS["POST"] = 3] = "POST";
		    METHODS[METHODS["PUT"] = 4] = "PUT";
		    /* pathological */
		    METHODS[METHODS["CONNECT"] = 5] = "CONNECT";
		    METHODS[METHODS["OPTIONS"] = 6] = "OPTIONS";
		    METHODS[METHODS["TRACE"] = 7] = "TRACE";
		    /* WebDAV */
		    METHODS[METHODS["COPY"] = 8] = "COPY";
		    METHODS[METHODS["LOCK"] = 9] = "LOCK";
		    METHODS[METHODS["MKCOL"] = 10] = "MKCOL";
		    METHODS[METHODS["MOVE"] = 11] = "MOVE";
		    METHODS[METHODS["PROPFIND"] = 12] = "PROPFIND";
		    METHODS[METHODS["PROPPATCH"] = 13] = "PROPPATCH";
		    METHODS[METHODS["SEARCH"] = 14] = "SEARCH";
		    METHODS[METHODS["UNLOCK"] = 15] = "UNLOCK";
		    METHODS[METHODS["BIND"] = 16] = "BIND";
		    METHODS[METHODS["REBIND"] = 17] = "REBIND";
		    METHODS[METHODS["UNBIND"] = 18] = "UNBIND";
		    METHODS[METHODS["ACL"] = 19] = "ACL";
		    /* subversion */
		    METHODS[METHODS["REPORT"] = 20] = "REPORT";
		    METHODS[METHODS["MKACTIVITY"] = 21] = "MKACTIVITY";
		    METHODS[METHODS["CHECKOUT"] = 22] = "CHECKOUT";
		    METHODS[METHODS["MERGE"] = 23] = "MERGE";
		    /* upnp */
		    METHODS[METHODS["M-SEARCH"] = 24] = "M-SEARCH";
		    METHODS[METHODS["NOTIFY"] = 25] = "NOTIFY";
		    METHODS[METHODS["SUBSCRIBE"] = 26] = "SUBSCRIBE";
		    METHODS[METHODS["UNSUBSCRIBE"] = 27] = "UNSUBSCRIBE";
		    /* RFC-5789 */
		    METHODS[METHODS["PATCH"] = 28] = "PATCH";
		    METHODS[METHODS["PURGE"] = 29] = "PURGE";
		    /* CalDAV */
		    METHODS[METHODS["MKCALENDAR"] = 30] = "MKCALENDAR";
		    /* RFC-2068, section 19.6.1.2 */
		    METHODS[METHODS["LINK"] = 31] = "LINK";
		    METHODS[METHODS["UNLINK"] = 32] = "UNLINK";
		    /* icecast */
		    METHODS[METHODS["SOURCE"] = 33] = "SOURCE";
		    /* RFC-7540, section 11.6 */
		    METHODS[METHODS["PRI"] = 34] = "PRI";
		    /* RFC-2326 RTSP */
		    METHODS[METHODS["DESCRIBE"] = 35] = "DESCRIBE";
		    METHODS[METHODS["ANNOUNCE"] = 36] = "ANNOUNCE";
		    METHODS[METHODS["SETUP"] = 37] = "SETUP";
		    METHODS[METHODS["PLAY"] = 38] = "PLAY";
		    METHODS[METHODS["PAUSE"] = 39] = "PAUSE";
		    METHODS[METHODS["TEARDOWN"] = 40] = "TEARDOWN";
		    METHODS[METHODS["GET_PARAMETER"] = 41] = "GET_PARAMETER";
		    METHODS[METHODS["SET_PARAMETER"] = 42] = "SET_PARAMETER";
		    METHODS[METHODS["REDIRECT"] = 43] = "REDIRECT";
		    METHODS[METHODS["RECORD"] = 44] = "RECORD";
		    /* RAOP */
		    METHODS[METHODS["FLUSH"] = 45] = "FLUSH";
		})(METHODS = exports.METHODS || (exports.METHODS = {}));
		exports.METHODS_HTTP = [
		    METHODS.DELETE,
		    METHODS.GET,
		    METHODS.HEAD,
		    METHODS.POST,
		    METHODS.PUT,
		    METHODS.CONNECT,
		    METHODS.OPTIONS,
		    METHODS.TRACE,
		    METHODS.COPY,
		    METHODS.LOCK,
		    METHODS.MKCOL,
		    METHODS.MOVE,
		    METHODS.PROPFIND,
		    METHODS.PROPPATCH,
		    METHODS.SEARCH,
		    METHODS.UNLOCK,
		    METHODS.BIND,
		    METHODS.REBIND,
		    METHODS.UNBIND,
		    METHODS.ACL,
		    METHODS.REPORT,
		    METHODS.MKACTIVITY,
		    METHODS.CHECKOUT,
		    METHODS.MERGE,
		    METHODS['M-SEARCH'],
		    METHODS.NOTIFY,
		    METHODS.SUBSCRIBE,
		    METHODS.UNSUBSCRIBE,
		    METHODS.PATCH,
		    METHODS.PURGE,
		    METHODS.MKCALENDAR,
		    METHODS.LINK,
		    METHODS.UNLINK,
		    METHODS.PRI,
		    // TODO(indutny): should we allow it with HTTP?
		    METHODS.SOURCE,
		];
		exports.METHODS_ICE = [
		    METHODS.SOURCE,
		];
		exports.METHODS_RTSP = [
		    METHODS.OPTIONS,
		    METHODS.DESCRIBE,
		    METHODS.ANNOUNCE,
		    METHODS.SETUP,
		    METHODS.PLAY,
		    METHODS.PAUSE,
		    METHODS.TEARDOWN,
		    METHODS.GET_PARAMETER,
		    METHODS.SET_PARAMETER,
		    METHODS.REDIRECT,
		    METHODS.RECORD,
		    METHODS.FLUSH,
		    // For AirPlay
		    METHODS.GET,
		    METHODS.POST,
		];
		exports.METHOD_MAP = utils_1.enumToMap(METHODS);
		exports.H_METHOD_MAP = {};
		Object.keys(exports.METHOD_MAP).forEach((key) => {
		    if (/^H/.test(key)) {
		        exports.H_METHOD_MAP[key] = exports.METHOD_MAP[key];
		    }
		});
		(function (FINISH) {
		    FINISH[FINISH["SAFE"] = 0] = "SAFE";
		    FINISH[FINISH["SAFE_WITH_CB"] = 1] = "SAFE_WITH_CB";
		    FINISH[FINISH["UNSAFE"] = 2] = "UNSAFE";
		})(exports.FINISH || (exports.FINISH = {}));
		exports.ALPHA = [];
		for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
		    // Upper case
		    exports.ALPHA.push(String.fromCharCode(i));
		    // Lower case
		    exports.ALPHA.push(String.fromCharCode(i + 0x20));
		}
		exports.NUM_MAP = {
		    0: 0, 1: 1, 2: 2, 3: 3, 4: 4,
		    5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
		};
		exports.HEX_MAP = {
		    0: 0, 1: 1, 2: 2, 3: 3, 4: 4,
		    5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
		    A: 0XA, B: 0XB, C: 0XC, D: 0XD, E: 0XE, F: 0XF,
		    a: 0xa, b: 0xb, c: 0xc, d: 0xd, e: 0xe, f: 0xf,
		};
		exports.NUM = [
		    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		];
		exports.ALPHANUM = exports.ALPHA.concat(exports.NUM);
		exports.MARK = ['-', '_', '.', '!', '~', '*', '\'', '(', ')'];
		exports.USERINFO_CHARS = exports.ALPHANUM
		    .concat(exports.MARK)
		    .concat(['%', ';', ':', '&', '=', '+', '$', ',']);
		// TODO(indutny): use RFC
		exports.STRICT_URL_CHAR = [
		    '!', '"', '$', '%', '&', '\'',
		    '(', ')', '*', '+', ',', '-', '.', '/',
		    ':', ';', '<', '=', '>',
		    '@', '[', '\\', ']', '^', '_',
		    '`',
		    '{', '|', '}', '~',
		].concat(exports.ALPHANUM);
		exports.URL_CHAR = exports.STRICT_URL_CHAR
		    .concat(['\t', '\f']);
		// All characters with 0x80 bit set to 1
		for (let i = 0x80; i <= 0xff; i++) {
		    exports.URL_CHAR.push(i);
		}
		exports.HEX = exports.NUM.concat(['a', 'b', 'c', 'd', 'e', 'f', 'A', 'B', 'C', 'D', 'E', 'F']);
		/* Tokens as defined by rfc 2616. Also lowercases them.
		 *        token       = 1*<any CHAR except CTLs or separators>
		 *     separators     = "(" | ")" | "<" | ">" | "@"
		 *                    | "," | ";" | ":" | "\" | <">
		 *                    | "/" | "[" | "]" | "?" | "="
		 *                    | "{" | "}" | SP | HT
		 */
		exports.STRICT_TOKEN = [
		    '!', '#', '$', '%', '&', '\'',
		    '*', '+', '-', '.',
		    '^', '_', '`',
		    '|', '~',
		].concat(exports.ALPHANUM);
		exports.TOKEN = exports.STRICT_TOKEN.concat([' ']);
		/*
		 * Verify that a char is a valid visible (printable) US-ASCII
		 * character or %x80-FF
		 */
		exports.HEADER_CHARS = ['\t'];
		for (let i = 32; i <= 255; i++) {
		    if (i !== 127) {
		        exports.HEADER_CHARS.push(i);
		    }
		}
		// ',' = \x44
		exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS.filter((c) => c !== 44);
		exports.MAJOR = exports.NUM_MAP;
		exports.MINOR = exports.MAJOR;
		var HEADER_STATE;
		(function (HEADER_STATE) {
		    HEADER_STATE[HEADER_STATE["GENERAL"] = 0] = "GENERAL";
		    HEADER_STATE[HEADER_STATE["CONNECTION"] = 1] = "CONNECTION";
		    HEADER_STATE[HEADER_STATE["CONTENT_LENGTH"] = 2] = "CONTENT_LENGTH";
		    HEADER_STATE[HEADER_STATE["TRANSFER_ENCODING"] = 3] = "TRANSFER_ENCODING";
		    HEADER_STATE[HEADER_STATE["UPGRADE"] = 4] = "UPGRADE";
		    HEADER_STATE[HEADER_STATE["CONNECTION_KEEP_ALIVE"] = 5] = "CONNECTION_KEEP_ALIVE";
		    HEADER_STATE[HEADER_STATE["CONNECTION_CLOSE"] = 6] = "CONNECTION_CLOSE";
		    HEADER_STATE[HEADER_STATE["CONNECTION_UPGRADE"] = 7] = "CONNECTION_UPGRADE";
		    HEADER_STATE[HEADER_STATE["TRANSFER_ENCODING_CHUNKED"] = 8] = "TRANSFER_ENCODING_CHUNKED";
		})(HEADER_STATE = exports.HEADER_STATE || (exports.HEADER_STATE = {}));
		exports.SPECIAL_HEADERS = {
		    'connection': HEADER_STATE.CONNECTION,
		    'content-length': HEADER_STATE.CONTENT_LENGTH,
		    'proxy-connection': HEADER_STATE.CONNECTION,
		    'transfer-encoding': HEADER_STATE.TRANSFER_ENCODING,
		    'upgrade': HEADER_STATE.UPGRADE,
		};
		
} (constants$1));
	return constants$1;
}

var llhttp_wasm;
var hasRequiredLlhttp_wasm;

function requireLlhttp_wasm () {
	if (hasRequiredLlhttp_wasm) return llhttp_wasm;
	hasRequiredLlhttp_wasm = 1;
	llhttp_wasm = 'AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAAzk4AwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAYGAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAAMEBQFwAQ4OBQMBAAIGCAF/AUGgtwQLB/UEHwZtZW1vcnkCAAtfaW5pdGlhbGl6ZQAJGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBAAtsbGh0dHBfaW5pdAAKGGxsaHR0cF9zaG91bGRfa2VlcF9hbGl2ZQA1DGxsaHR0cF9hbGxvYwAMBm1hbGxvYwA6C2xsaHR0cF9mcmVlAA0EZnJlZQA8D2xsaHR0cF9nZXRfdHlwZQAOFWxsaHR0cF9nZXRfaHR0cF9tYWpvcgAPFWxsaHR0cF9nZXRfaHR0cF9taW5vcgAQEWxsaHR0cF9nZXRfbWV0aG9kABEWbGxodHRwX2dldF9zdGF0dXNfY29kZQASEmxsaHR0cF9nZXRfdXBncmFkZQATDGxsaHR0cF9yZXNldAAUDmxsaHR0cF9leGVjdXRlABUUbGxodHRwX3NldHRpbmdzX2luaXQAFg1sbGh0dHBfZmluaXNoABcMbGxodHRwX3BhdXNlABgNbGxodHRwX3Jlc3VtZQAZG2xsaHR0cF9yZXN1bWVfYWZ0ZXJfdXBncmFkZQAaEGxsaHR0cF9nZXRfZXJybm8AGxdsbGh0dHBfZ2V0X2Vycm9yX3JlYXNvbgAcF2xsaHR0cF9zZXRfZXJyb3JfcmVhc29uAB0UbGxodHRwX2dldF9lcnJvcl9wb3MAHhFsbGh0dHBfZXJybm9fbmFtZQAfEmxsaHR0cF9tZXRob2RfbmFtZQAgGmxsaHR0cF9zZXRfbGVu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QZx/akHkAEkNACAAQcwBRg0AIABBsAJGDQBBBCEFIARBiARxQYAERg0CIARBKHFFDQILQQAPC0EAQQMgACkDIFAbIQULIAULXQECf0EAIQECQCAALQAoQQFGDQAgAC8BMiICQZx/akHkAEkNACACQcwBRg0AIAJBsAJGDQAgAC8BMCIAQcAAcQ0AQQEhASAAQYgEcUGABEYNACAAQShxRSEBCyABC6IBAQN/AkACQAJAIAAtACpFDQAgAC0AK0UNAEEAIQMgAC8BMCIEQQJxRQ0BDAILQQAhAyAALwEwIgRBAXFFDQELQQEhAyAALQAoQQFGDQAgAC8BMiIFQZx/akHkAEkNACAFQcwBRg0AIAVBsAJGDQAgBEHAAHENAEEAIQMgBEGIBHFBgARGDQAgBEEocUEARyEDCyAAQQA7ATAgAEEAOgAvIAMLlAEBAn8CQAJAAkAgAC0AKkUNACAALQArRQ0AQQAhASAALwEwIgJBAnFFDQEMAgtBACEBIAAvATAiAkEBcUUNAQtBASEBIAAtAChBAUYNACAALwEyIgBBnH9qQeQASQ0AIABBzAFGDQAgAEGwAkYNACACQcAAcQ0AQQAhASACQYgEcUGABEYNACACQShxQQBHIQELIAELTwAgAEEYakIANwMAIABCADcDACAAQTBqQgA3AwAgAEEoakIANwMAIABBIGpCADcDACAAQRBqQgA3AwAgAEEIakIANwMAIABBuAE2AhxBAAt7AQF/AkAgACgCDCIDDQACQCAAKAIERQ0AIAAgATYCBAsCQCAAIAEgAhC4gICAACIDDQAgACgCDA8LIAAgAzYCHEEAIQMgACgCBCIBRQ0AIAAgASACIAAoAggRgYCAgAAAIgFFDQAgACACNgIUIAAgATYCDCABIQMLIAML8soBAxl/A34FfyOAgICAAEEQayIDJICAgIAAIAEhBCABIQUgASEGIAEhByABIQggASEJIAEhCiABIQsgASEMIAEhDSABIQ4gASEPIAEhECABIREgASESIAEhEyABIRQgASEVIAEhFiABIRcgASEYIAEhGSABIRoCQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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QQEhGwwPC0GbASEbDA4LQZwBIRsMDQtBngEhGwwMC0GgASEbDAsLQZ8BIRsMCgtBoQEhGwwJC0GiASEbDAgLQaMBIRsMBwtBpAEhGwwGC0GlASEbDAULQaYBIRsMBAtBpwEhGwwDC0GoASEbDAILQakBIRsMAQtBrwEhGwsDQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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IAAgIDYCAAybAgsgAEEANgIAIB8gI2tBBWohAUEjIRsMswELAkAgASIEIAJHDQBB6wAhGwyaAgsCQAJAIAQtAABBtH9qDggAtgG2AbYBtgG2AbYBAbYBCyAEQQFqIQFB3QAhGwyPAgsgBEEBaiEBQd4AIRsMjgILAkAgASIEIAJHDQBB7AAhGwyZAgsgBC0AAEHFAEcNswEgBEEBaiEBDOQBC0HtACEbIAEiHyACRg2XAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFBqLKAgABqLQAARw2zASABQQNGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMmAILIABBADYCACAfICNrQQRqIQFBLSEbDLABC0HuACEbIAEiHyACRg2WAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFB8LKAgABqLQAARw2yASABQQhGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMlwILIABBADYCACAfICNrQQlqIQFBKSEbDK8BCwJAIAEiASACRw0AQe8AIRsMlgILQQEhGyABLQAAQd8ARw2uASABQQFqIQEM4gELQfAAIRsgASIfIAJGDZQCIAIgH2sgACgCACIjaiEgIB8hBCAjIQEDQCAELQAAIAFBrLKAgABqLQAARw2vASABQQFGDfoBIAFBAWohASAEQQFqIgQgAkcNAAsgACAgNgIADJQCC0HxACEbIAEiHyACRg2TAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFBrrKAgABqLQAARw2vASABQQJGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMlAILIABBADYCACAfICNrQQNqIQFBAiEbDKwBC0HyACEbIAEiHyACRg2SAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFBkLOAgABqLQAARw2uASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMkwILIABBADYCACAfICNrQQJqIQFBHyEbDKsBC0HzACEbIAEiHyACRg2RAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFBkrOAgABqLQAARw2tASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMkgILIABBADYCACAfICNrQQJqIQFBCSEbDKoBCwJAIAEiBCACRw0AQfQAIRsMkQILAkACQCAELQAAQbd/ag4HAK0BrQGtAa0BrQEBrQELIARBAWohAUHmACEbDIYCCyAEQQFqIQFB5wAhGwyFAgsCQCABIhsgAkcNAEH1ACEbDJACCyACIBtrIAAoAgAiH2ohIyAbIQQgHyEBAkADQCAELQAAIAFBsbKAgABqLQAARw2rASABQQVGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICM2AgBB9QAhGwyQAgsgAEEANgIAIBsgH2tBBmohAUEYIRsMqAELAkAgASIbIAJHDQBB9gAhGwyPAgsgAiAbayAAKAIAIh9qISMgGyEEIB8hAQJAA0AgBC0AACABQbeygIAAai0AAEcNqgEgAUECRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAjNgIAQfYAIRsMjwILIABBADYCACAbIB9rQQNqIQFBFyEbDKcBCwJAIAEiGyACRw0AQfcAIRsMjgILIAIgG2sgACgCACIfaiEjIBshBCAfIQECQANAIAQtAAAgAUG6soCAAGotAABHDakBIAFBBkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgIzYCAEH3ACEbDI4CCyAAQQA2AgAgGyAfa0EHaiEBQRUhGwymAQsCQCABIhsgAkcNAEH4ACEbDI0CCyACIBtrIAAoAgAiH2ohIyAbIQQgHyEBAkADQCAELQAAIAFBwbKAgABqLQAARw2oASABQQVGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICM2AgBB+AAhGwyNAgsgAEEANgIAIBsgH2tBBmohAUEeIRsMpQELAkAgASIEIAJHDQBB+QAhGwyMAgsgBC0AAEHMAEcNpgEgBEEBaiEBQQohGwykAQsCQCABIgQgAkcNAEH6ACEbDIsCCwJAAkAgBC0AAEG/f2oODwCnAacBpwGnAacBpwGnAacBpwGnAacBpwGnAQGnAQsgBEEBaiEBQewAIRsMgAILIARBAWohAUHtACEbDP8BCwJAIAEiBCACRw0AQfsAIRsMigILAkACQCAELQAAQb9/ag4DAKYBAaYBCyAEQQFqIQFB6wAhGwz/AQsgBEEBaiEBQe4AIRsM/gELAkAgASIbIAJHDQBB/AAhGwyJAgsgAiAbayAAKAIAIh9qISMgGyEEIB8hAQJAA0AgBC0AACABQceygIAAai0AAEcNpAEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAjNgIAQfwAIRsMiQILIABBADYCACAbIB9rQQJqIQFBCyEbDKEBCwJAIAEiBCACRw0AQf0AIRsMiAILAkACQAJAAkAgBC0AAEFTag4jAKYBpgGmAaYBpgGmAaYBpgGmAaYBpgGmAaYBpgGmAaYBpgGmAaYBpgGmAaYBpgEBpgGmAaYBpgGmAQKmAaYBpgEDpgELIARBAWohAUHpACEbDP8BCyAEQQFqIQFB6gAhGwz+AQsgBEEBaiEBQe8AIRsM/QELIARBAWohAUHwACEbDPwBCwJAIAEiGyACRw0AQf4AIRsMhwILIAIgG2sgACgCACIfaiEjIBshBCAfIQECQANAIAQtAAAgAUHJsoCAAGotAABHDaIBIAFBBEYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgIzYCAEH+ACEbDIcCCyAAQQA2AgAgGyAfa0EFaiEBQRkhGwyfAQsCQCABIh8gAkcNAEH/ACEbDIYCCyACIB9rIAAoAgAiI2ohGyAfIQQgIyEBAkADQCAELQAAIAFBzrKAgABqLQAARw2hASABQQVGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIBs2AgBB/wAhGwyGAgsgAEEANgIAQQYhGyAfICNrQQZqIQEMngELAkAgASIbIAJHDQBBgAEhGwyFAgsgAiAbayAAKAIAIh9qISMgGyEEIB8hAQJAA0AgBC0AACABQdSygIAAai0AAEcNoAEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAjNgIAQYABIRsMhQILIABBADYCACAbIB9rQQJqIQFBHCEbDJ0BCwJAIAEiGyACRw0AQYEBIRsMhAILIAIgG2sgACgCACIfaiEjIBshBCAfIQECQANAIAQtAAAgAUHWsoCAAGotAABHDZ8BIAFBAUYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgIzYCAEGBASEbDIQCCyAAQQA2AgAgGyAfa0ECaiEBQSchGwycAQsCQCABIgQgAkcNAEGCASEbDIMCCwJAAkAgBC0AAEGsf2oOAgABnwELIARBAWohAUH0ACEbDPgBCyAEQQFqIQFB9QAhGwz3AQsCQCABIhsgAkcNAEGDASEbDIICCyACIBtrIAAoAgAiH2ohIyAbIQQgHyEBAkADQCAELQAAIAFB2LKAgABqLQAARw2dASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICM2AgBBgwEhGwyCAgsgAEEANgIAIBsgH2tBAmohAUEmIRsMmgELAkAgASIbIAJHDQBBhAEhGwyBAgsgAiAbayAAKAIAIh9qISMgGyEEIB8hAQJAA0AgBC0AACABQdqygIAAai0AAEcNnAEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAjNgIAQYQBIRsMgQILIABBADYCACAbIB9rQQJqIQFBAyEbDJkBCwJAIAEiGyACRw0AQYUBIRsMgAILIAIgG2sgACgCACIfaiEjIBshBCAfIQECQANAIAQtAAAgAUGNs4CAAGotAABHDZsBIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgIzYCAEGFASEbDIACCyAAQQA2AgAgGyAfa0EDaiEBQQwhGwyYAQsCQCABIhsgAkcNAEGGASEbDP8BCyACIBtrIAAoAgAiH2ohIyAbIQQgHyEBAkADQCAELQAAIAFB3LKAgABqLQAARw2aASABQQNGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICM2AgBBhgEhGwz/AQsgAEEANgIAIBsgH2tBBGohAUENIRsMlwELAkAgASIEIAJHDQBBhwEhGwz+AQsCQAJAIAQtAABBun9qDgsAmgGaAZoBmgGaAZoBmgGaAZoBAZoBCyAEQQFqIQFB+QAhGwzzAQsgBEEBaiEBQfoAIRsM8gELAkAgASIEIAJHDQBBiAEhGwz9AQsgBC0AAEHQAEcNlwEgBEEBaiEBDMoBCwJAIAEiBCACRw0AQYkBIRsM/AELAkACQCAELQAAQbd/ag4HAZgBmAGYAZgBmAEAmAELIARBAWohAUH8ACEbDPEBCyAEQQFqIQFBIiEbDJQBCwJAIAEiGyACRw0AQYoBIRsM+wELIAIgG2sgACgCACIfaiEjIBshBCAfIQECQANAIAQtAAAgAUHgsoCAAGotAABHDZYBIAFBAUYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgIzYCAEGKASEbDPsBCyAAQQA2AgAgGyAfa0ECaiEBQR0hGwyTAQsCQCABIgQgAkcNAEGLASEbDPoBCwJAAkAgBC0AAEGuf2oOAwCWAQGWAQsgBEEBaiEBQf4AIRsM7wELIARBAWohAUEEIRsMkgELAkAgASIEIAJHDQBBjAEhGwz5AQsCQAJAAkACQAJAIAQtAABBv39qDhUAmAGYAZgBmAGYAZgBmAGYAZgBmAEBmAGYAQKYAZgBA5gBmAEEmAELIARBAWohAUH2ACEbDPEBCyAEQQFqIQFB9wAhGwzwAQsgBEEBaiEBQfgAIRsM7wELIARBAWohAUH9ACEbDO4BCyAEQQFqIQFB/wAhGwztAQsCQCABIhsgAkcNAEGNASEbDPgBCyACIBtrIAAoAgAiH2ohIyAbIQQgHyEBAkADQCAELQAAIAFBjbOAgABqLQAARw2TASABQQJGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICM2AgBBjQEhGwz4AQsgAEEANgIAIBsgH2tBA2ohAUERIRsMkAELAkAgASIbIAJHDQBBjgEhGwz3AQsgAiAbayAAKAIAIh9qISMgGyEEIB8hAQJAA0AgBC0AACABQeKygIAAai0AAEcNkgEgAUECRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAjNgIAQY4BIRsM9wELIABBADYCACAbIB9rQQNqIQFBLCEbDI8BCwJAIAEiGyACRw0AQY8BIRsM9gELIAIgG2sgACgCACIfaiEjIBshBCAfIQECQANAIAQtAAAgAUHlsoCAAGotAABHDZEBIAFBBEYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgIzYCAEGPASEbDPYBCyAAQQA2AgAgGyAfa0EFaiEBQSshGwyOAQsCQCABIhsgAkcNAEGQASEbDPUBCyACIBtrIAAoAgAiH2ohIyAbIQQgHyEBAkADQCAELQAAIAFB6rKAgABqLQAARw2QASABQQJGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICM2AgBBkAEhGwz1AQsgAEEANgIAIBsgH2tBA2ohAUEUIRsMjQELAkAgBCACRw0AQZEBIRsM9AELAkACQAJAAkAgBC0AAEG+f2oODwABApIBkgGSAZIBkgGSAZIBkgGSAZIBkgEDkgELIARBAWohAUGBASEbDOsBCyAEQQFqIQFBggEhGwzqAQsgBEEBaiEBQYMBIRsM6QELIARBAWohAUGEASEbDOgBCwJAIAQgAkcNAEGSASEbDPMBCyAELQAAQcUARw2NASAEQQFqIQQMwQELAkAgBSACRw0AQZMBIRsM8gELIAIgBWsgACgCACIbaiEfIAUhBCAbIQECQANAIAQtAAAgAUHtsoCAAGotAABHDY0BIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgHzYCAEGTASEbDPIBCyAAQQA2AgAgBSAba0EDaiEBQQ4hGwyKAQsCQCAEIAJHDQBBlAEhGwzxAQsgBC0AAEHQAEcNiwEgBEEBaiEBQSUhGwyJAQsCQCAGIAJHDQBBlQEhGwzwAQsgAiAGayAAKAIAIhtqIR8gBiEEIBshAQJAA0AgBC0AACABQfCygIAAai0AAEcNiwEgAUEIRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAfNgIAQZUBIRsM8AELIABBADYCACAGIBtrQQlqIQFBKiEbDIgBCwJAIAQgAkcNAEGWASEbDO8BCwJAAkAgBC0AAEGrf2oOCwCLAYsBiwGLAYsBiwGLAYsBiwEBiwELIARBAWohBEGIASEbDOQBCyAEQQFqIQZBiQEhGwzjAQsCQCAEIAJHDQBBlwEhGwzuAQsCQAJAIAQtAABBv39qDhQAigGKAYoBigGKAYoBigGKAYoBigGKAYoBigGKAYoBigGKAYoBAYoBCyAEQQFqIQVBhwEhGwzjAQsgBEEBaiEEQYoBIRsM4gELAkAgByACRw0AQZgBIRsM7QELIAIgB2sgACgCACIbaiEfIAchBCAbIQECQANAIAQtAAAgAUH5soCAAGotAABHDYgBIAFBA0YNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgHzYCAEGYASEbDO0BCyAAQQA2AgAgByAba0EEaiEBQSEhGwyFAQsCQCAIIAJHDQBBmQEhGwzsAQsgAiAIayAAKAIAIhtqIR8gCCEEIBshAQJAA0AgBC0AACABQf2ygIAAai0AAEcNhwEgAUEGRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAfNgIAQZkBIRsM7AELIABBADYCACAIIBtrQQdqIQFBGiEbDIQBCwJAIAQgAkcNAEGaASEbDOsBCwJAAkACQCAELQAAQbt/ag4RAIgBiAGIAYgBiAGIAYgBiAGIAQGIAYgBiAGIAYgBAogBCyAEQQFqIQRBiwEhGwzhAQsgBEEBaiEHQYwBIRsM4AELIARBAWohCEGNASEbDN8BCwJAIAkgAkcNAEGbASEbDOoBCyACIAlrIAAoAgAiG2ohHyAJIQQgGyEBAkADQCAELQAAIAFBhLOAgABqLQAARw2FASABQQVGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIB82AgBBmwEhGwzqAQsgAEEANgIAIAkgG2tBBmohAUEoIRsMggELAkAgCiACRw0AQZwBIRsM6QELIAIgCmsgACgCACIbaiEfIAohBCAbIQECQANAIAQtAAAgAUGKs4CAAGotAABHDYQBIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgHzYCAEGcASEbDOkBCyAAQQA2AgAgCiAba0EDaiEBQQchGwyBAQsCQCAEIAJHDQBBnQEhGwzoAQsCQAJAIAQtAABBu39qDg4AhAGEAYQBhAGEAYQBhAGEAYQBhAGEAYQBAYQBCyAEQQFqIQlBjwEhGwzdAQsgBEEBaiEKQZABIRsM3AELAkAgCyACRw0AQZ4BIRsM5wELIAIgC2sgACgCACIbaiEfIAshBCAbIQECQANAIAQtAAAgAUGNs4CAAGotAABHDYIBIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgHzYCAEGeASEbDOcBCyAAQQA2AgAgCyAba0EDaiEBQRIhGwx/CwJAIAwgAkcNAEGfASEbDOYBCyACIAxrIAAoAgAiG2ohHyAMIQQgGyEBAkADQCAELQAAIAFBkLOAgABqLQAARw2BASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIB82AgBBnwEhGwzmAQsgAEEANgIAIAwgG2tBAmohAUEgIRsMfgsCQCANIAJHDQBBoAEhGwzlAQsgAiANayAAKAIAIhtqIR8gDSEEIBshAQJAA0AgBC0AACABQZKzgIAAai0AAEcNgAEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAfNgIAQaABIRsM5QELIABBADYCACANIBtrQQJqIQFBDyEbDH0LAkAgBCACRw0AQaEBIRsM5AELAkACQCAELQAAQbd/ag4HAIABgAGAAYABgAEBgAELIARBAWohDEGTASEbDNkBCyAEQQFqIQ1BlAEhGwzYAQsCQCAOIAJHDQBBogEhGwzjAQsgAiAOayAAKAIAIhtqIR8gDiEEIBshAQJAA0AgBC0AACABQZSzgIAAai0AAEcNfiABQQdGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIB82AgBBogEhGwzjAQsgAEEANgIAIA4gG2tBCGohAUEbIRsMewsCQCAEIAJHDQBBowEhGwziAQsCQAJAAkAgBC0AAEG+f2oOEgB/f39/f39/f38Bf39/f39/An8LIARBAWohC0GSASEbDNgBCyAEQQFqIQRBlQEhGwzXAQsgBEEBaiEOQZYBIRsM1gELAkAgBCACRw0AQaQBIRsM4QELIAQtAABBzgBHDXsgBEEBaiEEDLABCwJAIAQgAkcNAEGlASEbDOABCwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAQtAABBv39qDhUAAQIDigEEBQaKAYoBigEHCAkKC4oBDA0OD4oBCyAEQQFqIQFB1gAhGwzjAQsgBEEBaiEBQdcAIRsM4gELIARBAWohAUHcACEbDOEBCyAEQQFqIQFB4AAhGwzgAQsgBEEBaiEBQeEAIRsM3wELIARBAWohAUHkACEbDN4BCyAEQQFqIQFB5QAhGwzdAQsgBEEBaiEBQegAIRsM3AELIARBAWohAUHxACEbDNsBCyAEQQFqIQFB8gAhGwzaAQsgBEEBaiEBQfMAIRsM2QELIARBAWohAUGAASEbDNgBCyAEQQFqIQRBhgEhGwzXAQsgBEEBaiEEQY4BIRsM1gELIARBAWohBEGRASEbDNUBCyAEQQFqIQRBmAEhGwzUAQsCQCAQIAJHDQBBpwEhGwzfAQsgEEEBaiEPDHsLA0ACQCAbLQAAQXZqDgR7AAB+AAsgG0EBaiIbIAJHDQALQagBIRsM3QELAkAgESACRg0AIABBjYCAgAA2AgggACARNgIEIBEhAUEBIRsM0gELQakBIRsM3AELAkAgESACRw0AQaoBIRsM3AELAkACQCARLQAAQXZqDgQBsQGxAQCxAQsgEUEBaiEQDHwLIBFBAWohDwx4CyAAIA8gAhCngICAABogDyEBDEkLAkAgESACRw0AQasBIRsM2gELAkACQCARLQAAQXZqDhcBfX0BfX19fX19fX19fX19fX19fX19AH0LIBFBAWohEQtBnAEhGwzOAQsCQCASIAJHDQBBrQEhGwzZAQsgEi0AAEEgRw17IABBADsBMiASQQFqIQFBoAEhGwzNAQsgASEjAkADQCAjIhEgAkYNASARLQAAQVBqQf8BcSIbQQpPDa4BAkAgAC8BMiIfQZkzSw0AIAAgH0EKbCIfOwEyIBtB//8DcyAfQf7/A3FJDQAgEUEBaiEjIAAgHyAbaiIbOwEyIBtB//8DcUHoB0kNAQsLQQAhGyAAQQA2AhwgAEGdiYCAADYCECAAQQ02AgwgACARQQFqNgIUDNgBC0GsASEbDNcBCwJAIBMgAkcNAEGuASEbDNcBC0EAIRsCQAJAAkACQAJAAkACQAJAIBMtAABBUGoOCoMBggEAAQIDBAUGB4QBC0ECIRsMggELQQMhGwyBAQtBBCEbDIABC0EFIRsMfwtBBiEbDH4LQQchGwx9C0EIIRsMfAtBCSEbDHsLAkAgFCACRw0AQa8BIRsM1gELIBQtAABBLkcNfCAUQQFqIRMMrAELAkAgFSACRw0AQbABIRsM1QELQQAhGwJAAkACQAJAAkACQAJAAkAgFS0AAEFQag4KhQGEAQABAgMEBQYHhgELQQIhGwyEAQtBAyEbDIMBC0EEIRsMggELQQUhGwyBAQtBBiEbDIABC0EHIRsMfwtBCCEbDH4LQQkhGwx9CwJAIAQgAkcNAEGxASEbDNQBCyACIARrIAAoAgAiH2ohIyAEIRUgHyEbA0AgFS0AACAbQZyzgIAAai0AAEcNfyAbQQRGDbcBIBtBAWohGyAVQQFqIhUgAkcNAAsgACAjNgIAQbEBIRsM0wELAkAgFiACRw0AQbIBIRsM0wELIAIgFmsgACgCACIbaiEfIBYhBCAbIQEDQCAELQAAIAFBobOAgABqLQAARw1/IAFBAUYNuQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIB82AgBBsgEhGwzSAQsCQCAXIAJHDQBBswEhGwzSAQsgAiAXayAAKAIAIhVqIR8gFyEEIBUhGwNAIAQtAAAgG0Gjs4CAAGotAABHDX4gG0ECRg2AASAbQQFqIRsgBEEBaiIEIAJHDQALIAAgHzYCAEGzASEbDNEBCwJAIAQgAkcNAEG0ASEbDNEBCwJAAkAgBC0AAEG7f2oOEAB/f39/f39/f39/f39/fwF/CyAEQQFqIRZBpQEhGwzGAQsgBEEBaiEXQaYBIRsMxQELAkAgBCACRw0AQbUBIRsM0AELIAQtAABByABHDXwgBEEBaiEEDKgBCwJAIAQgAkcNAEG2ASEbDM8BCyAELQAAQcgARg2oASAAQQE6ACgMnwELA0ACQCAELQAAQXZqDgQAfn4AfgsgBEEBaiIEIAJHDQALQbgBIRsMzQELIABBADoALyAALQAtQQRxRQ3GAQsgAEEAOgAvIAEhAQx9CyAbQRVGDawBIABBADYCHCAAIAE2AhQgAEGrjICAADYCECAAQRI2AgxBACEbDMoBCwJAIAAgGyACEK2AgIAAIgQNACAbIQEMwwELAkAgBEEVRw0AIABBAzYCHCAAIBs2AhQgAEGGkoCAADYCECAAQRU2AgxBACEbDMoBCyAAQQA2AhwgACAbNgIUIABBq4yAgAA2AhAgAEESNgIMQQAhGwzJAQsgG0EVRg2oASAAQQA2AhwgACABNgIUIABBiIyAgAA2AhAgAEEUNgIMQQAhGwzIAQsgACgCBCEjIABBADYCBCAbIBynaiIgIQEgACAjIBsgICAfGyIbEK6AgIAAIh9FDX8gAEEHNgIcIAAgGzYCFCAAIB82AgxBACEbDMcBCyAAIAAvATBBgAFyOwEwIAEhAQw1CyAbQRVGDaQBIABBADYCHCAAIAE2AhQgAEHFi4CAADYCECAAQRM2AgxBACEbDMUBCyAAQQA2AhwgACABNgIUIABBi4uAgAA2AhAgAEECNgIMQQAhGwzEAQsgG0E7Rw0BIAFBAWohAQtBCCEbDLcBC0EAIRsgAEEANgIcIAAgATYCFCAAQaOQgIAANgIQIABBDDYCDAzBAQtCASEcCyAbQQFqIQECQCAAKQMgIh1C//////////8PVg0AIAAgHUIEhiAchDcDICABIQEMfAsgAEEANgIcIAAgATYCFCAAQYmJgIAANgIQIABBDDYCDEEAIRsMvwELIABBADYCHCAAIBs2AhQgAEGjkICAADYCECAAQQw2AgxBACEbDL4BCyAAKAIEISMgAEEANgIEIBsgHKdqIiAhASAAICMgGyAgIB8bIhsQroCAgAAiH0UNcyAAQQU2AhwgACAbNgIUIAAgHzYCDEEAIRsMvQELIABBADYCHCAAIBs2AhQgAEGNlICAADYCECAAQQ82AgxBACEbDLwBCyAAIBsgAhCtgICAACIBDQEgGyEBC0EQIRsMrwELAkAgAUEVRw0AIABBAjYCHCAAIBs2AhQgAEGGkoCAADYCECAAQRU2AgxBACEbDLoBCyAAQQA2AhwgACAbNgIUIABBq4yAgAA2AhAgAEESNgIMQQAhGwy5AQsgAUEBaiEbAkAgAC8BMCIBQYABcUUNAAJAIAAgGyACELCAgIAAIgENACAbIQEMcAsgAUEVRw2aASAAQQU2AhwgACAbNgIUIABB7pGAgAA2AhAgAEEVNgIMQQAhGwy5AQsCQCABQaAEcUGgBEcNACAALQAtQQJxDQAgAEEANgIcIAAgGzYCFCAAQeyPgIAANgIQIABBBDYCDEEAIRsMuQELIAAgGyACELGAgIAAGiAbIQECQAJAAkACQAJAIAAgGyACEKyAgIAADhYCAQAEBAQEBAQEBAQEBAQEBAQEBAQDBAsgAEEBOgAuCyAAIAAvATBBwAByOwEwIBshAQtBHiEbDK8BCyAAQRU2AhwgACAbNgIUIABBkZGAgAA2AhAgAEEVNgIMQQAhGwy5AQsgAEEANgIcIAAgGzYCFCAAQbGLgIAANgIQIABBETYCDEEAIRsMuAELIAAtAC1BAXFFDQFBqgEhGwysAQsCQCAYIAJGDQADQAJAIBgtAABBIEYNACAYIQEMpwELIBhBAWoiGCACRw0AC0EXIRsMtwELQRchGwy2AQsgACgCBCEEIABBADYCBCAAIAQgGBCogICAACIERQ2TASAAQRg2AhwgACAENgIMIAAgGEEBajYCFEEAIRsMtQELIABBGTYCHCAAIAE2AhQgACAbNgIMQQAhGwy0AQsgGyEBQQEhHwJAAkACQAJAAkACQAJAIAAtACxBfmoOBwYFBQMBAgAFCyAAIAAvATBBCHI7ATAMAwtBAiEfDAELQQQhHwsgAEEBOgAsIAAgAC8BMCAfcjsBMAsgGyEBC0EhIRsMqQELIABBADYCHCAAIBs2AhQgAEGBj4CAADYCECAAQQs2AgxBACEbDLMBCyAbIQFBASEfAkACQAJAAkACQCAALQAsQXtqDgQCAAEDBQtBAiEfDAELQQQhHwsgAEEBOgAsIAAgAC8BMCAfcjsBMAwBCyAAIAAvATBBCHI7ATALIBshAQtBqwEhGwymAQsgACABIAIQq4CAgAAaDB8LAkAgASIbIAJGDQAgGyEBAkACQCAbLQAAQXZqDgQBb28AbwsgG0EBaiEBC0EfIRsMpQELQT8hGwyvAQsgAEEANgIcIAAgATYCFCAAQeqQgIAANgIQIABBAzYCDEEAIRsMrgELIAAoAgQhASAAQQA2AgQCQCAAIAEgGRCqgICAACIBDQAgGUEBaiEBDG0LIABBHjYCHCAAIAE2AgwgACAZQQFqNgIUQQAhGwytAQsgAC0ALUEBcUUNA0GtASEbDKEBCwJAIBkgAkcNAEEfIRsMrAELA0ACQCAZLQAAQXZqDgQCAAADAAsgGUEBaiIZIAJHDQALQR8hGwyrAQsgACgCBCEBIABBADYCBAJAIAAgASAZEKqAgIAAIgENACAZIQEMagsgAEEeNgIcIAAgGTYCFCAAIAE2AgxBACEbDKoBCyAAKAIEIQEgAEEANgIEAkAgACABIBkQqoCAgAAiAQ0AIBlBAWohAQxpCyAAQR42AhwgACABNgIMIAAgGUEBajYCFEEAIRsMqQELIABBADYCHCAAIBk2AhQgAEHujICAADYCECAAQQo2AgxBACEbDKgBCyAbQSxHDQEgAUEBaiEbQQEhAQJAAkACQAJAAkAgAC0ALEF7ag4EAwECBAALIBshAQwEC0ECIQEMAQtBBCEBCyAAQQE6ACwgACAALwEwIAFyOwEwIBshAQwBCyAAIAAvATBBCHI7ATAgGyEBC0EuIRsMmwELIABBADoALCABIQELQSohGwyZAQsgAEEANgIAICAgIWtBCWohAUEFIRsMkwELIABBADYCACAgICFrQQZqIQFBByEbDJIBCyAAIAAvATBBIHI7ATAgASEBDAILIAAoAgQhBCAAQQA2AgQCQCAAIAQgARCqgICAACIEDQAgASEBDJcBCyAAQSg2AhwgACABNgIUIAAgBDYCDEEAIRsMoAELIABBCDoALCABIQELQSYhGwyTAQsgAC0AMEEgcQ15Qa4BIRsMkgELAkAgGiACRg0AAkADQAJAIBotAABBUGoiAUH/AXFBCkkNACAaIQFBKyEbDJUBCyAAKQMgIhxCmbPmzJmz5swZVg0BIAAgHEIKfiIcNwMgIBwgAa0iHUJ/hUKAfoRWDQEgACAcIB1C/wGDfDcDICAaQQFqIhogAkcNAAtBKiEbDJ4BCyAAKAIEIQQgAEEANgIEIAAgBCAaQQFqIgEQqoCAgAAiBA16IAEhAQyUAQtBKiEbDJwBCyAAIAAvATBB9/sDcUGABHI7ATAgGiEBC0EsIRsMjwELIAAgAC8BMEEQcjsBMAsgAEEAOgAsIBohAQxYCyAAQTI2AhwgACABNgIMIAAgGEEBajYCFEEAIRsMlwELIAEtAABBOkcNAiAAKAIEIRsgAEEANgIEIAAgGyABEKiAgIAAIhsNASABQQFqIQELQTEhGwyKAQsgAEEyNgIcIAAgGzYCDCAAIAFBAWo2AhRBACEbDJQBCyAAQQA2AhwgACABNgIUIABBh46AgAA2AhAgAEEKNgIMQQAhGwyTAQsgAUEBaiEBCyAAQYASOwEqIAAgASACEKWAgIAAGiABIQELQawBIRsMhQELIAAoAgQhGyAAQQA2AgQCQCAAIBsgARCkgICAACIbDQAgASEBDFILIABBwAA2AhwgACABNgIUIAAgGzYCDEEAIRsMjwELIABBADYCHCAAIB82AhQgAEGVmICAADYCECAAQQc2AgwgAEEANgIAQQAhGwyOAQsgACgCBCEbIABBADYCBAJAIAAgGyABEKSAgIAAIhsNACABIQEMUQsgAEHBADYCHCAAIAE2AhQgACAbNgIMQQAhGwyNAQtBACEbIABBADYCHCAAIAE2AhQgAEHrjYCAADYCECAAQQk2AgwMjAELQQEhGwsgACAbOgArIAFBAWohASAALQApQSJGDYUBDE4LIABBADYCHCAAIAE2AhQgAEGijYCAADYCECAAQQk2AgxBACEbDIkBCyAAQQA2AhwgACABNgIUIABBxYqAgAA2AhAgAEEJNgIMQQAhGwyIAQtBASEbCyAAIBs6ACogAUEBaiEBDEwLIABBADYCHCAAIAE2AhQgAEG4jYCAADYCECAAQQk2AgxBACEbDIUBCyAAQQA2AgAgIyAga0EEaiEBAkAgAC0AKUEjTw0AIAEhAQxMCyAAQQA2AhwgACABNgIUIABBr4mAgAA2AhAgAEEINgIMQQAhGwyEAQsgAEEANgIAC0EAIRsgAEEANgIcIAAgATYCFCAAQdmagIAANgIQIABBCDYCDAyCAQsgAEEANgIAICMgIGtBA2ohAQJAIAAtAClBIUcNACABIQEMSQsgAEEANgIcIAAgATYCFCAAQfeJgIAANgIQIABBCDYCDEEAIRsMgQELIABBADYCACAjICBrQQRqIQECQCAALQApIhtBXWpBC08NACABIQEMSAsCQCAbQQZLDQBBASAbdEHKAHFFDQAgASEBDEgLQQAhGyAAQQA2AhwgACABNgIUIABB04mAgAA2AhAgAEEINgIMDIABCyAAKAIEIRsgAEEANgIEAkAgACAbIAEQpICAgAAiGw0AIAEhAQxICyAAQcwANgIcIAAgATYCFCAAIBs2AgxBACEbDH8LIAAoAgQhGyAAQQA2AgQCQCAAIBsgARCkgICAACIbDQAgASEBDEELIABBwAA2AhwgACABNgIUIAAgGzYCDEEAIRsMfgsgACgCBCEbIABBADYCBAJAIAAgGyABEKSAgIAAIhsNACABIQEMQQsgAEHBADYCHCAAIAE2AhQgACAbNgIMQQAhGwx9CyAAKAIEIRsgAEEANgIEAkAgACAbIAEQpICAgAAiGw0AIAEhAQxFCyAAQcwANgIcIAAgATYCFCAAIBs2AgxBACEbDHwLIABBADYCHCAAIAE2AhQgAEGiioCAADYCECAAQQc2AgxBACEbDHsLIAAoAgQhGyAAQQA2AgQCQCAAIBsgARCkgICAACIbDQAgASEBDD0LIABBwAA2AhwgACABNgIUIAAgGzYCDEEAIRsMegsgACgCBCEbIABBADYCBAJAIAAgGyABEKSAgIAAIhsNACABIQEMPQsgAEHBADYCHCAAIAE2AhQgACAbNgIMQQAhGwx5CyAAKAIEIRsgAEEANgIEAkAgACAbIAEQpICAgAAiGw0AIAEhAQxBCyAAQcwANgIcIAAgATYCFCAAIBs2AgxBACEbDHgLIABBADYCHCAAIAE2AhQgAEG4iICAADYCECAAQQc2AgxBACEbDHcLIBtBP0cNASABQQFqIQELQQUhGwxqC0EAIRsgAEEANgIcIAAgATYCFCAAQdOPgIAANgIQIABBBzYCDAx0CyAAKAIEIRsgAEEANgIEAkAgACAbIAEQpICAgAAiGw0AIAEhAQw2CyAAQcAANgIcIAAgATYCFCAAIBs2AgxBACEbDHMLIAAoAgQhGyAAQQA2AgQCQCAAIBsgARCkgICAACIbDQAgASEBDDYLIABBwQA2AhwgACABNgIUIAAgGzYCDEEAIRsMcgsgACgCBCEbIABBADYCBAJAIAAgGyABEKSAgIAAIhsNACABIQEMOgsgAEHMADYCHCAAIAE2AhQgACAbNgIMQQAhGwxxCyAAKAIEIQEgAEEANgIEAkAgACABIB8QpICAgAAiAQ0AIB8hAQwzCyAAQcAANgIcIAAgHzYCFCAAIAE2AgxBACEbDHALIAAoAgQhASAAQQA2AgQCQCAAIAEgHxCkgICAACIBDQAgHyEBDDMLIABBwQA2AhwgACAfNgIUIAAgATYCDEEAIRsMbwsgACgCBCEBIABBADYCBAJAIAAgASAfEKSAgIAAIgENACAfIQEMNwsgAEHMADYCHCAAIB82AhQgACABNgIMQQAhGwxuCyAAQQA2AhwgACAfNgIUIABB0IyAgAA2AhAgAEEHNgIMQQAhGwxtCyAAQQA2AhwgACABNgIUIABB0IyAgAA2AhAgAEEHNgIMQQAhGwxsC0EAIRsgAEEANgIcIAAgHzYCFCAAQe+TgIAANgIQIABBBzYCDAxrCyAAQQA2AhwgACAfNgIUIABB75OAgAA2AhAgAEEHNgIMQQAhGwxqCyAAQQA2AhwgACAfNgIUIABB1I6AgAA2AhAgAEEHNgIMQQAhGwxpCyAAQQA2AhwgACABNgIUIABB8ZKAgAA2AhAgAEEGNgIMQQAhGwxoCyAAQQA2AgAgHyAja0EGaiEBQSQhGwsgACAbOgApIAEhAQxNCyAAQQA2AgALQQAhGyAAQQA2AhwgACAENgIUIABB1JOAgAA2AhAgAEEGNgIMDGQLIAAoAgQhDyAAQQA2AgQgACAPIBsQpoCAgAAiDw0BIBtBAWohDwtBnQEhGwxXCyAAQaYBNgIcIAAgDzYCDCAAIBtBAWo2AhRBACEbDGELIAAoAgQhECAAQQA2AgQgACAQIBsQpoCAgAAiEA0BIBtBAWohEAtBmgEhGwxUCyAAQacBNgIcIAAgEDYCDCAAIBtBAWo2AhRBACEbDF4LIABBADYCHCAAIBE2AhQgAEHzioCAADYCECAAQQ02AgxBACEbDF0LIABBADYCHCAAIBI2AhQgAEHOjYCAADYCECAAQQk2AgxBACEbDFwLQQEhGwsgACAbOgArIBNBAWohEgwwCyAAQQA2AhwgACATNgIUIABBoo2AgAA2AhAgAEEJNgIMQQAhGwxZCyAAQQA2AhwgACAUNgIUIABBxYqAgAA2AhAgAEEJNgIMQQAhGwxYC0EBIRsLIAAgGzoAKiAVQQFqIRQMLgsgAEEANgIcIAAgFTYCFCAAQbiNgIAANgIQIABBCTYCDEEAIRsMVQsgAEEANgIcIAAgFTYCFCAAQdmagIAANgIQIABBCDYCDCAAQQA2AgBBACEbDFQLIABBADYCAAtBACEbIABBADYCHCAAIAQ2AhQgAEG7k4CAADYCECAAQQg2AgwMUgsgAEECOgAoIABBADYCACAXIBVrQQNqIRUMNQsgAEECOgAvIAAgBCACEKOAgIAAIhsNAUGvASEbDEULIAAtAChBf2oOAiAiIQsgG0EVRw0pIABBtwE2AhwgACAENgIUIABB15GAgAA2AhAgAEEVNgIMQQAhGwxOC0EAIRsMQgtBAiEbDEELQQwhGwxAC0EPIRsMPwtBESEbDD4LQR0hGww9C0EVIRsMPAtBFyEbDDsLQRghGww6C0EaIRsMOQtBGyEbDDgLQTohGww3C0EkIRsMNgtBJSEbDDULQS8hGww0C0EwIRsMMwtBOyEbDDILQTwhGwwxC0E+IRsMMAtBPyEbDC8LQcAAIRsMLgtBwQAhGwwtC0HFACEbDCwLQccAIRsMKwtByAAhGwwqC0HKACEbDCkLQd8AIRsMKAtB4gAhGwwnC0H7ACEbDCYLQYUBIRsMJQtBlwEhGwwkC0GZASEbDCMLQakBIRsMIgtBpAEhGwwhC0GbASEbDCALQZ4BIRsMHwtBnwEhGwweC0GhASEbDB0LQaIBIRsMHAtBpwEhGwwbC0GoASEbDBoLIABBADYCHCAAIAQ2AhQgAEHmi4CAADYCECAAQRA2AgxBACEbDCQLIABBADYCHCAAIBo2AhQgAEG6j4CAADYCECAAQQQ2AgxBACEbDCMLIABBJzYCHCAAIAE2AhQgACAENgIMQQAhGwwiCyAYQQFqIQEMGQsgAEEKNgIcIAAgATYCFCAAQcGRgIAANgIQIABBFTYCDEEAIRsMIAsgAEEQNgIcIAAgATYCFCAAQe6RgIAANgIQIABBFTYCDEEAIRsMHwsgAEEANgIcIAAgGzYCFCAAQYiMgIAANgIQIABBFDYCDEEAIRsMHgsgAEEENgIcIAAgATYCFCAAQYaSgIAANgIQIABBFTYCDEEAIRsMHQsgAEEANgIAIAQgH2tBBWohFQtBowEhGwwQCyAAQQA2AgAgHyAja0ECaiEBQeMAIRsMDwsgAEEANgIAIABBgQQ7ASggFiAba0ECaiEBC0HTACEbDA0LIAEhAQJAIAAtAClBBUcNAEHSACEbDA0LQdEAIRsMDAtBACEbIABBADYCHCAAQbqOgIAANgIQIABBBzYCDCAAIB9BAWo2AhQMFgsgAEEANgIAICMgIGtBAmohAUE0IRsMCgsgASEBC0EtIRsMCAsgAUEBaiEBQSMhGwwHC0EgIRsMBgsgAEEANgIAICAgIWtBBGohAUEGIRsLIAAgGzoALCABIQFBDiEbDAQLIABBADYCACAjICBrQQdqIQFBDSEbDAMLIABBADYCACAfIQFBCyEbDAILIABBADYCAAsgAEEAOgAsIBghAUEJIRsMAAsLQQAhGyAAQQA2AhwgACABNgIUIABBlo+AgAA2AhAgAEELNgIMDAkLQQAhGyAAQQA2AhwgACABNgIUIABB8YiAgAA2AhAgAEELNgIMDAgLQQAhGyAAQQA2AhwgACABNgIUIABBiI2AgAA2AhAgAEEKNgIMDAcLIABBAjYCHCAAIAE2AhQgAEGgkoCAADYCECAAQRY2AgxBACEbDAYLQQEhGwwFC0HCACEbIAEiBCACRg0EIANBCGogACAEIAJB+KWAgABBChC5gICAACADKAIMIQQgAygCCA4DAQQCAAsQv4CAgAAACyAAQQA2AhwgAEG5koCAADYCECAAQRc2AgwgACAEQQFqNgIUQQAhGwwCCyAAQQA2AhwgACAENgIUIABBzpKAgAA2AhAgAEEJNgIMQQAhGwwBCwJAIAEiBCACRw0AQRQhGwwBCyAAQYmAgIAANgIIIAAgBDYCBEETIRsLIANBEGokgICAgAAgGwuvAQECfyABKAIAIQYCQAJAIAIgA0YNACAEIAZqIQQgBiADaiACayEHIAIgBkF/cyAFaiIGaiEFA0ACQCACLQAAIAQtAABGDQBBAiEEDAMLAkAgBg0AQQAhBCAFIQIMAwsgBkF/aiEGIARBAWohBCACQQFqIgIgA0cNAAsgByEGIAMhAgsgAEEBNgIAIAEgBjYCACAAIAI2AgQPCyABQQA2AgAgACAENgIAIAAgAjYCBAsKACAAELuAgIAAC5U3AQt/I4CAgIAAQRBrIgEkgICAgAACQEEAKALAs4CAAA0AQQAQvoCAgABBoLeEgABrIgJB2QBJDQBBACEDAkBBACgCgLeAgAAiBA0AQQBCfzcCjLeAgABBAEKAgISAgIDAADcChLeAgABBACABQQhqQXBxQdiq1aoFcyIENgKAt4CAAEEAQQA2ApS3gIAAQQBBADYC5LaAgAALQQAgAjYC7LaAgABBAEGgt4SAADYC6LaAgABBAEGgt4SAADYCuLOAgABBACAENgLMs4CAAEEAQX82AsizgIAAA0AgA0Hks4CAAGogA0HYs4CAAGoiBDYCACAEIANB0LOAgABqIgU2AgAgA0Hcs4CAAGogBTYCACADQeyzgIAAaiADQeCzgIAAaiIFNgIAIAUgBDYCACADQfSzgIAAaiADQeizgIAAaiIENgIAIAQgBTYCACADQfCzgIAAaiAENgIAIANBIGoiA0GAAkcNAAtBoLeEgABBeEGgt4SAAGtBD3FBAEGgt4SAAEEIakEPcRsiA2oiBEEEaiACIANrQUhqIgNBAXI2AgBBAEEAKAKQt4CAADYCxLOAgABBACAENgLAs4CAAEEAIAM2ArSzgIAAIAJBoLeEgABqQUxqQTg2AgALAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABB7AFLDQACQEEAKAKos4CAACIGQRAgAEETakFwcSAAQQtJGyICQQN2IgR2IgNBA3FFDQAgA0EBcSAEckEBcyIFQQN0IgBB2LOAgABqKAIAIgRBCGohAwJAAkAgBCgCCCICIABB0LOAgABqIgBHDQBBACAGQX4gBXdxNgKos4CAAAwBCyAAIAI2AgggAiAANgIMCyAEIAVBA3QiBUEDcjYCBCAEIAVqQQRqIgQgBCgCAEEBcjYCAAwMCyACQQAoArCzgIAAIgdNDQECQCADRQ0AAkACQCADIAR0QQIgBHQiA0EAIANrcnEiA0EAIANrcUF/aiIDIANBDHZBEHEiA3YiBEEFdkEIcSIFIANyIAQgBXYiA0ECdkEEcSIEciADIAR2IgNBAXZBAnEiBHIgAyAEdiIDQQF2QQFxIgRyIAMgBHZqIgVBA3QiAEHYs4CAAGooAgAiBCgCCCIDIABB0LOAgABqIgBHDQBBACAGQX4gBXdxIgY2AqizgIAADAELIAAgAzYCCCADIAA2AgwLIARBCGohAyAEIAJBA3I2AgQgBCAFQQN0IgVqIAUgAmsiBTYCACAEIAJqIgAgBUEBcjYCBAJAIAdFDQAgB0EDdiIIQQN0QdCzgIAAaiECQQAoAryzgIAAIQQCQAJAIAZBASAIdCIIcQ0AQQAgBiAIcjYCqLOAgAAgAiEIDAELIAIoAgghCAsgCCAENgIMIAIgBDYCCCAEIAI2AgwgBCAINgIIC0EAIAA2AryzgIAAQQAgBTYCsLOAgAAMDAtBACgCrLOAgAAiCUUNASAJQQAgCWtxQX9qIgMgA0EMdkEQcSIDdiIEQQV2QQhxIgUgA3IgBCAFdiIDQQJ2QQRxIgRyIAMgBHYiA0EBdkECcSIEciADIAR2IgNBAXZBAXEiBHIgAyAEdmpBAnRB2LWAgABqKAIAIgAoAgRBeHEgAmshBCAAIQUCQANAAkAgBSgCECIDDQAgBUEUaigCACIDRQ0CCyADKAIEQXhxIAJrIgUgBCAFIARJIgUbIQQgAyAAIAUbIQAgAyEFDAALCyAAKAIYIQoCQCAAKAIMIgggAEYNAEEAKAK4s4CAACAAKAIIIgNLGiAIIAM2AgggAyAINgIMDAsLAkAgAEEUaiIFKAIAIgMNACAAKAIQIgNFDQMgAEEQaiEFCwNAIAUhCyADIghBFGoiBSgCACIDDQAgCEEQaiEFIAgoAhAiAw0ACyALQQA2AgAMCgtBfyECIABBv39LDQAgAEETaiIDQXBxIQJBACgCrLOAgAAiB0UNAEEAIQsCQCACQYACSQ0AQR8hCyACQf///wdLDQAgA0EIdiIDIANBgP4/akEQdkEIcSIDdCIEIARBgOAfakEQdkEEcSIEdCIFIAVBgIAPakEQdkECcSIFdEEPdiADIARyIAVyayIDQQF0IAIgA0EVanZBAXFyQRxqIQsLQQAgAmshBAJAAkACQAJAIAtBAnRB2LWAgABqKAIAIgUNAEEAIQNBACEIDAELQQAhAyACQQBBGSALQQF2ayALQR9GG3QhAEEAIQgDQAJAIAUoAgRBeHEgAmsiBiAETw0AIAYhBCAFIQggBg0AQQAhBCAFIQggBSEDDAMLIAMgBUEUaigCACIGIAYgBSAAQR12QQRxakEQaigCACIFRhsgAyAGGyEDIABBAXQhACAFDQALCwJAIAMgCHINAEEAIQhBAiALdCIDQQAgA2tyIAdxIgNFDQMgA0EAIANrcUF/aiIDIANBDHZBEHEiA3YiBUEFdkEIcSIAIANyIAUgAHYiA0ECdkEEcSIFciADIAV2IgNBAXZBAnEiBXIgAyAFdiIDQQF2QQFxIgVyIAMgBXZqQQJ0Qdi1gIAAaigCACEDCyADRQ0BCwNAIAMoAgRBeHEgAmsiBiAESSEAAkAgAygCECIFDQAgA0EUaigCACEFCyAGIAQgABshBCADIAggABshCCAFIQMgBQ0ACwsgCEUNACAEQQAoArCzgIAAIAJrTw0AIAgoAhghCwJAIAgoAgwiACAIRg0AQQAoArizgIAAIAgoAggiA0saIAAgAzYCCCADIAA2AgwMCQsCQCAIQRRqIgUoAgAiAw0AIAgoAhAiA0UNAyAIQRBqIQULA0AgBSEGIAMiAEEUaiIFKAIAIgMNACAAQRBqIQUgACgCECIDDQALIAZBADYCAAwICwJAQQAoArCzgIAAIgMgAkkNAEEAKAK8s4CAACEEAkACQCADIAJrIgVBEEkNACAEIAJqIgAgBUEBcjYCBEEAIAU2ArCzgIAAQQAgADYCvLOAgAAgBCADaiAFNgIAIAQgAkEDcjYCBAwBCyAEIANBA3I2AgQgAyAEakEEaiIDIAMoAgBBAXI2AgBBAEEANgK8s4CAAEEAQQA2ArCzgIAACyAEQQhqIQMMCgsCQEEAKAK0s4CAACIAIAJNDQBBACgCwLOAgAAiAyACaiIEIAAgAmsiBUEBcjYCBEEAIAU2ArSzgIAAQQAgBDYCwLOAgAAgAyACQQNyNgIEIANBCGohAwwKCwJAAkBBACgCgLeAgABFDQBBACgCiLeAgAAhBAwBC0EAQn83Aoy3gIAAQQBCgICEgICAwAA3AoS3gIAAQQAgAUEMakFwcUHYqtWqBXM2AoC3gIAAQQBBADYClLeAgABBAEEANgLktoCAAEGAgAQhBAtBACEDAkAgBCACQccAaiIHaiIGQQAgBGsiC3EiCCACSw0AQQBBMDYCmLeAgAAMCgsCQEEAKALgtoCAACIDRQ0AAkBBACgC2LaAgAAiBCAIaiIFIARNDQAgBSADTQ0BC0EAIQNBAEEwNgKYt4CAAAwKC0EALQDktoCAAEEEcQ0EAkACQAJAQQAoAsCzgIAAIgRFDQBB6LaAgAAhAwNAAkAgAygCACIFIARLDQAgBSADKAIEaiAESw0DCyADKAIIIgMNAAsLQQAQvoCAgAAiAEF/Rg0FIAghBgJAQQAoAoS3gIAAIgNBf2oiBCAAcUUNACAIIABrIAQgAGpBACADa3FqIQYLIAYgAk0NBSAGQf7///8HSw0FAkBBACgC4LaAgAAiA0UNAEEAKALYtoCAACIEIAZqIgUgBE0NBiAFIANLDQYLIAYQvoCAgAAiAyAARw0BDAcLIAYgAGsgC3EiBkH+////B0sNBCAGEL6AgIAAIgAgAygCACADKAIEakYNAyAAIQMLAkAgA0F/Rg0AIAJByABqIAZNDQACQCAHIAZrQQAoAoi3gIAAIgRqQQAgBGtxIgRB/v///wdNDQAgAyEADAcLAkAgBBC+gICAAEF/Rg0AIAQgBmohBiADIQAMBwtBACAGaxC+gICAABoMBAsgAyEAIANBf0cNBQwDC0EAIQgMBwtBACEADAULIABBf0cNAgtBAEEAKALktoCAAEEEcjYC5LaAgAALIAhB/v///wdLDQEgCBC+gICAACEAQQAQvoCAgAAhAyAAQX9GDQEgA0F/Rg0BIAAgA08NASADIABrIgYgAkE4ak0NAQtBAEEAKALYtoCAACAGaiIDNgLYtoCAAAJAIANBACgC3LaAgABNDQBBACADNgLctoCAAAsCQAJAAkACQEEAKALAs4CAACIERQ0AQei2gIAAIQMDQCAAIAMoAgAiBSADKAIEIghqRg0CIAMoAggiAw0ADAMLCwJAAkBBACgCuLOAgAAiA0UNACAAIANPDQELQQAgADYCuLOAgAALQQAhA0EAIAY2Auy2gIAAQQAgADYC6LaAgABBAEF/NgLIs4CAAEEAQQAoAoC3gIAANgLMs4CAAEEAQQA2AvS2gIAAA0AgA0Hks4CAAGogA0HYs4CAAGoiBDYCACAEIANB0LOAgABqIgU2AgAgA0Hcs4CAAGogBTYCACADQeyzgIAAaiADQeCzgIAAaiIFNgIAIAUgBDYCACADQfSzgIAAaiADQeizgIAAaiIENgIAIAQgBTYCACADQfCzgIAAaiAENgIAIANBIGoiA0GAAkcNAAsgAEF4IABrQQ9xQQAgAEEIakEPcRsiA2oiBCAGIANrQUhqIgNBAXI2AgRBAEEAKAKQt4CAADYCxLOAgABBACAENgLAs4CAAEEAIAM2ArSzgIAAIAYgAGpBTGpBODYCAAwCCyADLQAMQQhxDQAgBSAESw0AIAAgBE0NACAEQXggBGtBD3FBACAEQQhqQQ9xGyIFaiIAQQAoArSzgIAAIAZqIgsgBWsiBUEBcjYCBCADIAggBmo2AgRBAEEAKAKQt4CAADYCxLOAgABBACAFNgK0s4CAAEEAIAA2AsCzgIAAIAsgBGpBBGpBODYCAAwBCwJAIABBACgCuLOAgAAiC08NAEEAIAA2ArizgIAAIAAhCwsgACAGaiEIQei2gIAAIQMCQAJAAkACQAJAAkACQANAIAMoAgAgCEYNASADKAIIIgMNAAwCCwsgAy0ADEEIcUUNAQtB6LaAgAAhAwNAAkAgAygCACIFIARLDQAgBSADKAIEaiIFIARLDQMLIAMoAgghAwwACwsgAyAANgIAIAMgAygCBCAGajYCBCAAQXggAGtBD3FBACAAQQhqQQ9xG2oiBiACQQNyNgIEIAhBeCAIa0EPcUEAIAhBCGpBD3EbaiIIIAYgAmoiAmshBQJAIAQgCEcNAEEAIAI2AsCzgIAAQQBBACgCtLOAgAAgBWoiAzYCtLOAgAAgAiADQQFyNgIEDAMLAkBBACgCvLOAgAAgCEcNAEEAIAI2AryzgIAAQQBBACgCsLOAgAAgBWoiAzYCsLOAgAAgAiADQQFyNgIEIAIgA2ogAzYCAAwDCwJAIAgoAgQiA0EDcUEBRw0AIANBeHEhBwJAAkAgA0H/AUsNACAIKAIIIgQgA0EDdiILQQN0QdCzgIAAaiIARhoCQCAIKAIMIgMgBEcNAEEAQQAoAqizgIAAQX4gC3dxNgKos4CAAAwCCyADIABGGiADIAQ2AgggBCADNgIMDAELIAgoAhghCQJAAkAgCCgCDCIAIAhGDQAgCyAIKAIIIgNLGiAAIAM2AgggAyAANgIMDAELAkAgCEEUaiIDKAIAIgQNACAIQRBqIgMoAgAiBA0AQQAhAAwBCwNAIAMhCyAEIgBBFGoiAygCACIEDQAgAEEQaiEDIAAoAhAiBA0ACyALQQA2AgALIAlFDQACQAJAIAgoAhwiBEECdEHYtYCAAGoiAygCACAIRw0AIAMgADYCACAADQFBAEEAKAKss4CAAEF+IAR3cTYCrLOAgAAMAgsgCUEQQRQgCSgCECAIRhtqIAA2AgAgAEUNAQsgACAJNgIYAkAgCCgCECIDRQ0AIAAgAzYCECADIAA2AhgLIAgoAhQiA0UNACAAQRRqIAM2AgAgAyAANgIYCyAHIAVqIQUgCCAHaiEICyAIIAgoAgRBfnE2AgQgAiAFaiAFNgIAIAIgBUEBcjYCBAJAIAVB/wFLDQAgBUEDdiIEQQN0QdCzgIAAaiEDAkACQEEAKAKos4CAACIFQQEgBHQiBHENAEEAIAUgBHI2AqizgIAAIAMhBAwBCyADKAIIIQQLIAQgAjYCDCADIAI2AgggAiADNgIMIAIgBDYCCAwDC0EfIQMCQCAFQf///wdLDQAgBUEIdiIDIANBgP4/akEQdkEIcSIDdCIEIARBgOAfakEQdkEEcSIEdCIAIABBgIAPakEQdkECcSIAdEEPdiADIARyIAByayIDQQF0IAUgA0EVanZBAXFyQRxqIQMLIAIgAzYCHCACQgA3AhAgA0ECdEHYtYCAAGohBAJAQQAoAqyzgIAAIgBBASADdCIIcQ0AIAQgAjYCAEEAIAAgCHI2AqyzgIAAIAIgBDYCGCACIAI2AgggAiACNgIMDAMLIAVBAEEZIANBAXZrIANBH0YbdCEDIAQoAgAhAANAIAAiBCgCBEF4cSAFRg0CIANBHXYhACADQQF0IQMgBCAAQQRxakEQaiIIKAIAIgANAAsgCCACNgIAIAIgBDYCGCACIAI2AgwgAiACNgIIDAILIABBeCAAa0EPcUEAIABBCGpBD3EbIgNqIgsgBiADa0FIaiIDQQFyNgIEIAhBTGpBODYCACAEIAVBNyAFa0EPcUEAIAVBSWpBD3EbakFBaiIIIAggBEEQakkbIghBIzYCBEEAQQAoApC3gIAANgLEs4CAAEEAIAs2AsCzgIAAQQAgAzYCtLOAgAAgCEEQakEAKQLwtoCAADcCACAIQQApAui2gIAANwIIQQAgCEEIajYC8LaAgABBACAGNgLstoCAAEEAIAA2Aui2gIAAQQBBADYC9LaAgAAgCEEkaiEDA0AgA0EHNgIAIAUgA0EEaiIDSw0ACyAIIARGDQMgCCAIKAIEQX5xNgIEIAggCCAEayIGNgIAIAQgBkEBcjYCBAJAIAZB/wFLDQAgBkEDdiIFQQN0QdCzgIAAaiEDAkACQEEAKAKos4CAACIAQQEgBXQiBXENAEEAIAAgBXI2AqizgIAAIAMhBQwBCyADKAIIIQULIAUgBDYCDCADIAQ2AgggBCADNgIMIAQgBTYCCAwEC0EfIQMCQCAGQf///wdLDQAgBkEIdiIDIANBgP4/akEQdkEIcSIDdCIFIAVBgOAfakEQdkEEcSIFdCIAIABBgIAPakEQdkECcSIAdEEPdiADIAVyIAByayIDQQF0IAYgA0EVanZBAXFyQRxqIQMLIARCADcCECAEQRxqIAM2AgAgA0ECdEHYtYCAAGohBQJAQQAoAqyzgIAAIgBBASADdCIIcQ0AIAUgBDYCAEEAIAAgCHI2AqyzgIAAIARBGGogBTYCACAEIAQ2AgggBCAENgIMDAQLIAZBAEEZIANBAXZrIANBH0YbdCEDIAUoAgAhAANAIAAiBSgCBEF4cSAGRg0DIANBHXYhACADQQF0IQMgBSAAQQRxakEQaiIIKAIAIgANAAsgCCAENgIAIARBGGogBTYCACAEIAQ2AgwgBCAENgIIDAMLIAQoAggiAyACNgIMIAQgAjYCCCACQQA2AhggAiAENgIMIAIgAzYCCAsgBkEIaiEDDAULIAUoAggiAyAENgIMIAUgBDYCCCAEQRhqQQA2AgAgBCAFNgIMIAQgAzYCCAtBACgCtLOAgAAiAyACTQ0AQQAoAsCzgIAAIgQgAmoiBSADIAJrIgNBAXI2AgRBACADNgK0s4CAAEEAIAU2AsCzgIAAIAQgAkEDcjYCBCAEQQhqIQMMAwtBACEDQQBBMDYCmLeAgAAMAgsCQCALRQ0AAkACQCAIIAgoAhwiBUECdEHYtYCAAGoiAygCAEcNACADIAA2AgAgAA0BQQAgB0F+IAV3cSIHNgKss4CAAAwCCyALQRBBFCALKAIQIAhGG2ogADYCACAARQ0BCyAAIAs2AhgCQCAIKAIQIgNFDQAgACADNgIQIAMgADYCGAsgCEEUaigCACIDRQ0AIABBFGogAzYCACADIAA2AhgLAkACQCAEQQ9LDQAgCCAEIAJqIgNBA3I2AgQgAyAIakEEaiIDIAMoAgBBAXI2AgAMAQsgCCACaiIAIARBAXI2AgQgCCACQQNyNgIEIAAgBGogBDYCAAJAIARB/wFLDQAgBEEDdiIEQQN0QdCzgIAAaiEDAkACQEEAKAKos4CAACIFQQEgBHQiBHENAEEAIAUgBHI2AqizgIAAIAMhBAwBCyADKAIIIQQLIAQgADYCDCADIAA2AgggACADNgIMIAAgBDYCCAwBC0EfIQMCQCAEQf///wdLDQAgBEEIdiIDIANBgP4/akEQdkEIcSIDdCIFIAVBgOAfakEQdkEEcSIFdCICIAJBgIAPakEQdkECcSICdEEPdiADIAVyIAJyayIDQQF0IAQgA0EVanZBAXFyQRxqIQMLIAAgAzYCHCAAQgA3AhAgA0ECdEHYtYCAAGohBQJAIAdBASADdCICcQ0AIAUgADYCAEEAIAcgAnI2AqyzgIAAIAAgBTYCGCAAIAA2AgggACAANgIMDAELIARBAEEZIANBAXZrIANBH0YbdCEDIAUoAgAhAgJAA0AgAiIFKAIEQXhxIARGDQEgA0EddiECIANBAXQhAyAFIAJBBHFqQRBqIgYoAgAiAg0ACyAGIAA2AgAgACAFNgIYIAAgADYCDCAAIAA2AggMAQsgBSgCCCIDIAA2AgwgBSAANgIIIABBADYCGCAAIAU2AgwgACADNgIICyAIQQhqIQMMAQsCQCAKRQ0AAkACQCAAIAAoAhwiBUECdEHYtYCAAGoiAygCAEcNACADIAg2AgAgCA0BQQAgCUF+IAV3cTYCrLOAgAAMAgsgCkEQQRQgCigCECAARhtqIAg2AgAgCEUNAQsgCCAKNgIYAkAgACgCECIDRQ0AIAggAzYCECADIAg2AhgLIABBFGooAgAiA0UNACAIQRRqIAM2AgAgAyAINgIYCwJAAkAgBEEPSw0AIAAgBCACaiIDQQNyNgIEIAMgAGpBBGoiAyADKAIAQQFyNgIADAELIAAgAmoiBSAEQQFyNgIEIAAgAkEDcjYCBCAFIARqIAQ2AgACQCAHRQ0AIAdBA3YiCEEDdEHQs4CAAGohAkEAKAK8s4CAACEDAkACQEEBIAh0IgggBnENAEEAIAggBnI2AqizgIAAIAIhCAwBCyACKAIIIQgLIAggAzYCDCACIAM2AgggAyACNgIMIAMgCDYCCAtBACAFNgK8s4CAAEEAIAQ2ArCzgIAACyAAQQhqIQMLIAFBEGokgICAgAAgAwsKACAAEL2AgIAAC/ANAQd/AkAgAEUNACAAQXhqIgEgAEF8aigCACICQXhxIgBqIQMCQCACQQFxDQAgAkEDcUUNASABIAEoAgAiAmsiAUEAKAK4s4CAACIESQ0BIAIgAGohAAJAQQAoAryzgIAAIAFGDQACQCACQf8BSw0AIAEoAggiBCACQQN2IgVBA3RB0LOAgABqIgZGGgJAIAEoAgwiAiAERw0AQQBBACgCqLOAgABBfiAFd3E2AqizgIAADAMLIAIgBkYaIAIgBDYCCCAEIAI2AgwMAgsgASgCGCEHAkACQCABKAIMIgYgAUYNACAEIAEoAggiAksaIAYgAjYCCCACIAY2AgwMAQsCQCABQRRqIgIoAgAiBA0AIAFBEGoiAigCACIEDQBBACEGDAELA0AgAiEFIAQiBkEUaiICKAIAIgQNACAGQRBqIQIgBigCECIEDQALIAVBADYCAAsgB0UNAQJAAkAgASgCHCIEQQJ0Qdi1gIAAaiICKAIAIAFHDQAgAiAGNgIAIAYNAUEAQQAoAqyzgIAAQX4gBHdxNgKss4CAAAwDCyAHQRBBFCAHKAIQIAFGG2ogBjYCACAGRQ0CCyAGIAc2AhgCQCABKAIQIgJFDQAgBiACNgIQIAIgBjYCGAsgASgCFCICRQ0BIAZBFGogAjYCACACIAY2AhgMAQsgAygCBCICQQNxQQNHDQAgAyACQX5xNgIEQQAgADYCsLOAgAAgASAAaiAANgIAIAEgAEEBcjYCBA8LIAMgAU0NACADKAIEIgJBAXFFDQACQAJAIAJBAnENAAJAQQAoAsCzgIAAIANHDQBBACABNgLAs4CAAEEAQQAoArSzgIAAIABqIgA2ArSzgIAAIAEgAEEBcjYCBCABQQAoAryzgIAARw0DQQBBADYCsLOAgABBAEEANgK8s4CAAA8LAkBBACgCvLOAgAAgA0cNAEEAIAE2AryzgIAAQQBBACgCsLOAgAAgAGoiADYCsLOAgAAgASAAQQFyNgIEIAEgAGogADYCAA8LIAJBeHEgAGohAAJAAkAgAkH/AUsNACADKAIIIgQgAkEDdiIFQQN0QdCzgIAAaiIGRhoCQCADKAIMIgIgBEcNAEEAQQAoAqizgIAAQX4gBXdxNgKos4CAAAwCCyACIAZGGiACIAQ2AgggBCACNgIMDAELIAMoAhghBwJAAkAgAygCDCIGIANGDQBBACgCuLOAgAAgAygCCCICSxogBiACNgIIIAIgBjYCDAwBCwJAIANBFGoiAigCACIEDQAgA0EQaiICKAIAIgQNAEEAIQYMAQsDQCACIQUgBCIGQRRqIgIoAgAiBA0AIAZBEGohAiAGKAIQIgQNAAsgBUEANgIACyAHRQ0AAkACQCADKAIcIgRBAnRB2LWAgABqIgIoAgAgA0cNACACIAY2AgAgBg0BQQBBACgCrLOAgABBfiAEd3E2AqyzgIAADAILIAdBEEEUIAcoAhAgA0YbaiAGNgIAIAZFDQELIAYgBzYCGAJAIAMoAhAiAkUNACAGIAI2AhAgAiAGNgIYCyADKAIUIgJFDQAgBkEUaiACNgIAIAIgBjYCGAsgASAAaiAANgIAIAEgAEEBcjYCBCABQQAoAryzgIAARw0BQQAgADYCsLOAgAAPCyADIAJBfnE2AgQgASAAaiAANgIAIAEgAEEBcjYCBAsCQCAAQf8BSw0AIABBA3YiAkEDdEHQs4CAAGohAAJAAkBBACgCqLOAgAAiBEEBIAJ0IgJxDQBBACAEIAJyNgKos4CAACAAIQIMAQsgACgCCCECCyACIAE2AgwgACABNgIIIAEgADYCDCABIAI2AggPC0EfIQICQCAAQf///wdLDQAgAEEIdiICIAJBgP4/akEQdkEIcSICdCIEIARBgOAfakEQdkEEcSIEdCIGIAZBgIAPakEQdkECcSIGdEEPdiACIARyIAZyayICQQF0IAAgAkEVanZBAXFyQRxqIQILIAFCADcCECABQRxqIAI2AgAgAkECdEHYtYCAAGohBAJAAkBBACgCrLOAgAAiBkEBIAJ0IgNxDQAgBCABNgIAQQAgBiADcjYCrLOAgAAgAUEYaiAENgIAIAEgATYCCCABIAE2AgwMAQsgAEEAQRkgAkEBdmsgAkEfRht0IQIgBCgCACEGAkADQCAGIgQoAgRBeHEgAEYNASACQR12IQYgAkEBdCECIAQgBkEEcWpBEGoiAygCACIGDQALIAMgATYCACABQRhqIAQ2AgAgASABNgIMIAEgATYCCAwBCyAEKAIIIgAgATYCDCAEIAE2AgggAUEYakEANgIAIAEgBDYCDCABIAA2AggLQQBBACgCyLOAgABBf2oiAUF/IAEbNgLIs4CAAAsLTgACQCAADQA/AEEQdA8LAkAgAEH//wNxDQAgAEF/TA0AAkAgAEEQdkAAIgBBf0cNAEEAQTA2Api3gIAAQX8PCyAAQRB0DwsQv4CAgAAACwQAAAALC64rAQBBgAgLpisBAAAAAgAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEludmFsaWQgY2hhciBpbiB1cmwgcXVlcnkAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9ib2R5AENvbnRlbnQtTGVuZ3RoIG92ZXJmbG93AENodW5rIHNpemUgb3ZlcmZsb3cAUmVzcG9uc2Ugb3ZlcmZsb3cASW52YWxpZCBtZXRob2QgZm9yIEhUVFAveC54IHJlcXVlc3QASW52YWxpZCBtZXRob2QgZm9yIFJUU1AveC54IHJlcXVlc3QARXhwZWN0ZWQgU09VUkNFIG1ldGhvZCBmb3IgSUNFL3gueCByZXF1ZXN0AEludmFsaWQgY2hhciBpbiB1cmwgZnJhZ21lbnQgc3RhcnQARXhwZWN0ZWQgZG90AFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fc3RhdHVzAEludmFsaWQgcmVzcG9uc2Ugc3RhdHVzAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIHBhcmFtZXRlcnMAVXNlciBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfaGVhZGVyYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9iZWdpbmAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzZXJ2ZXIASW52YWxpZCBoZWFkZXIgdmFsdWUgY2hhcgBJbnZhbGlkIGhlYWRlciBmaWVsZCBjaGFyAEludmFsaWQgbWlub3IgdmVyc2lvbgBJbnZhbGlkIG1ham9yIHZlcnNpb24ARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgdmVyc2lvbgBFeHBlY3RlZCBDUkxGIGFmdGVyIHZlcnNpb24ASW52YWxpZCBoZWFkZXIgdG9rZW4AU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl91cmwASW52YWxpZCBjaGFyYWN0ZXJzIGluIHVybABVbmV4cGVjdGVkIHN0YXJ0IGNoYXIgaW4gdXJsAERvdWJsZSBAIGluIHVybABFbXB0eSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXJhY3RlciBpbiBDb250ZW50LUxlbmd0aABEdXBsaWNhdGUgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyIGluIHVybCBwYXRoAENvbnRlbnQtTGVuZ3RoIGNhbid0IGJlIHByZXNlbnQgd2l0aCBUcmFuc2Zlci1FbmNvZGluZwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBzaXplAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX3ZhbHVlAE1pc3NpbmcgZXhwZWN0ZWQgTEYgYWZ0ZXIgaGVhZGVyIHZhbHVlAFBhdXNlZCBieSBvbl9oZWFkZXJzX2NvbXBsZXRlAEludmFsaWQgRU9GIHN0YXRlAG9uX2NodW5rX2hlYWRlciBwYXVzZQBvbl9tZXNzYWdlX2JlZ2luIHBhdXNlAG9uX2NodW5rX2NvbXBsZXRlIHBhdXNlAG9uX21lc3NhZ2VfY29tcGxldGUgcGF1c2UAUGF1c2Ugb24gQ09OTkVDVC9VcGdyYWRlAFBhdXNlIG9uIFBSSS9VcGdyYWRlAEV4cGVjdGVkIEhUVFAvMiBDb25uZWN0aW9uIFByZWZhY2UARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgbWV0aG9kAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX2ZpZWxkAFBhdXNlZABJbnZhbGlkIHdvcmQgZW5jb3VudGVyZWQASW52YWxpZCBtZXRob2QgZW5jb3VudGVyZWQAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzY2hlbWEAUmVxdWVzdCBoYXMgaW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgAE1LQUNUSVZJVFkAQ09QWQBOT1RJRlkAUExBWQBQVVQAQ0hFQ0tPVVQAUE9TVABSRVBPUlQASFBFX0lOVkFMSURfQ09OU1RBTlQAR0VUAEhQRV9TVFJJQ1QAUkVESVJFQ1QAQ09OTkVDVABIUEVfSU5WQUxJRF9TVEFUVVMAT1BUSU9OUwBTRVRfUEFSQU1FVEVSAEdFVF9QQVJBTUVURVIASFBFX1VTRVIASFBFX0NCX0NIVU5LX0hFQURFUgBNS0NBTEVOREFSAFNFVFVQAFRFQVJET1dOAEhQRV9DTE9TRURfQ09OTkVDVElPTgBIUEVfSU5WQUxJRF9WRVJTSU9OAEhQRV9DQl9NRVNTQUdFX0JFR0lOAEhQRV9JTlZBTElEX0hFQURFUl9UT0tFTgBIUEVfSU5WQUxJRF9VUkwATUtDT0wAQUNMAEhQRV9JTlRFUk5BTABIUEVfT0sAVU5MSU5LAFVOTE9DSwBQUkkASFBFX0lOVkFMSURfQ09OVEVOVF9MRU5HVEgASFBFX1VORVhQRUNURURfQ09OVEVOVF9MRU5HVEgARkxVU0gAUFJPUFBBVENIAE0tU0VBUkNIAEhQRV9JTlZBTElEX1RSQU5TRkVSX0VOQ09ESU5HAEV4cGVjdGVkIENSTEYASFBFX0lOVkFMSURfQ0hVTktfU0laRQBNT1ZFAEhQRV9DQl9IRUFERVJTX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19DT01QTEVURQBIUEVfQ0JfTUVTU0FHRV9DT01QTEVURQBERUxFVEUASFBFX0lOVkFMSURfRU9GX1NUQVRFAFBBVVNFAFBVUkdFAE1FUkdFAEhQRV9QQVVTRURfVVBHUkFERQBIUEVfUEFVU0VEX0gyX1VQR1JBREUAU09VUkNFAEFOTk9VTkNFAFRSQUNFAERFU0NSSUJFAFVOU1VCU0NSSUJFAFJFQ09SRABIUEVfSU5WQUxJRF9NRVRIT0QAUFJPUEZJTkQAVU5CSU5EAFJFQklORABIUEVfTEZfRVhQRUNURUQASFBFX1BBVVNFRABIRUFEAEV4cGVjdGVkIEhUVFAvAIwLAAB/CwAAgwoAADkNAADACwAADQsAAA8NAABlCwAAagoAACMLAABMCwAApQsAACMMAACfCgAAjAwAAPcLAAA3CwAAPwwAAG0MAADfCgAAVwwAAEkNAAC0DAAAxwwAANYKAACFDAAAfwoAAFQNAABeCgAAUQoAAJcKAACyCgAA7QwAAEAKAACcCwAAdQsAADoMAAAiDQAA5AsAAPALAACaCwAANA0AADINAAArDQAAewsAAGMKAAA1CgAAVQoAAK4MAADuCwAARQoAAP4MAAD8DAAA6AsAAKgMAADzCgAAlQsAAJMLAADdDAAAoQsAAPMMAADkDAAA/goAAEwKAACiDAAABAsAAMgKAAC6CgAAjgoAAAgNAADeCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAWxvc2VlZXAtYWxpdmUAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQECAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAWNodW5rZWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAEBAQEBAAABAQABAQABAQEBAQEBAQEBAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZWN0aW9uZW50LWxlbmd0aG9ucm94eS1jb25uZWN0aW9uAAAAAAAAAAAAAAAAAAAAcmFuc2Zlci1lbmNvZGluZ3BncmFkZQ0KDQoNClNNDQoNClRUUC9DRS9UU1AvAAAAAAAAAAAAAAAAAQIAAQMAAAAAAAAAAAAAAAAAAAAAAAAEAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAECAAEDAAAAAAAAAAAAAAAAAAAAAAAABAEBBQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAEAAAIAAAAAAAAAAAAAAAAAAAAAAAADBAAABAQEBAQEBAQEBAQFBAQEBAQEBAQEBAQEAAQABgcEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAACAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATk9VTkNFRUNLT1VUTkVDVEVURUNSSUJFTFVTSEVURUFEU0VBUkNIUkdFQ1RJVklUWUxFTkRBUlZFT1RJRllQVElPTlNDSFNFQVlTVEFUQ0hHRU9SRElSRUNUT1JUUkNIUEFSQU1FVEVSVVJDRUJTQ1JJQkVBUkRPV05BQ0VJTkROS0NLVUJTQ1JJQkVIVFRQL0FEVFAv';
	return llhttp_wasm;
}

var llhttp_simd_wasm;
var hasRequiredLlhttp_simd_wasm;

function requireLlhttp_simd_wasm () {
	if (hasRequiredLlhttp_simd_wasm) return llhttp_simd_wasm;
	hasRequiredLlhttp_simd_wasm = 1;
	llhttp_simd_wasm = 'AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAAzk4AwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAYGAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAAMEBQFwAQ4OBQMBAAIGCAF/AUGgtwQLB/UEHwZtZW1vcnkCAAtfaW5pdGlhbGl6ZQAJGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBAAtsbGh0dHBfaW5pdAAKGGxsaHR0cF9zaG91bGRfa2VlcF9hbGl2ZQA1DGxsaHR0cF9hbGxvYwAMBm1hbGxvYwA6C2xsaHR0cF9mcmVlAA0EZnJlZQA8D2xsaHR0cF9nZXRfdHlwZQAOFWxsaHR0cF9nZXRfaHR0cF9tYWpvcgAPFWxsaHR0cF9nZXRfaHR0cF9taW5vcgAQEWxsaHR0cF9nZXRfbWV0aG9kABEWbGxodHRwX2dldF9zdGF0dXNfY29kZQASEmxsaHR0cF9nZXRfdXBncmFkZQATDGxsaHR0cF9yZXNldAAUDmxsaHR0cF9leGVjdXRlABUUbGxodHRwX3NldHRpbmdzX2luaXQAFg1sbGh0dHBfZmluaXNoABcMbGxodHRwX3BhdXNlABgNbGxodHRwX3Jlc3VtZQAZG2xsaHR0cF9yZXN1bWVfYWZ0ZXJfdXBncmFkZQAaEGxsaHR0cF9nZXRfZXJybm8AGxdsbGh0dHBfZ2V0X2Vycm9yX3JlYXNvbgAcF2xsaHR0cF9zZXRfZXJyb3JfcmVhc29uAB0UbGxodHRwX2dldF9lcnJvcl9wb3MAHhFsbGh0dHBfZXJybm9fbmFtZQAfEmxsaHR0cF9tZXRob2RfbmFtZQAgGmxsaHR0cF9zZXRfbGVuaWVudF9oZWFkZXJzACEhbGxodHRwX3NldF9sZW5pZW50X2NodW5rZWRfbGVuZ3RoACIYbGxodHRwX21lc3NhZ2VfbmVlZHNfZW9mADMJEwEAQQELDQECAwQFCwYHLiooJCYK2aQCOAIACwgAEIiAgIAACxkAIAAQtoCAgAAaIAAgAjYCNCAAIAE6ACgLHAAgACAALwEyIAAtAC4gABC1gICAABCAgICAAAspAQF/QTgQuoCAgAAiARC2gICAABogAUGAiICAADYCNCABIAA6ACggAQsKACAAELyAgIAACwcAIAAtACgLBwAgAC0AKgsHACAALQArCwcAIAAtACkLBwAgAC8BMgsHACAALQAuC0UBBH8gACgCGCEBIAAtAC0hAiAALQAoIQMgACgCNCEEIAAQtoCAgAAaIAAgBDYCNCAAIAM6ACggACACOgAtIAAgATYCGAsRACAAIAEgASACahC3gICAAAs+AQF7IAD9DAAAAAAAAAAAAAAAAAAAAAAiAf0LAgAgAEEwakIANwIAIABBIGogAf0LAgAgAEEQaiAB/QsCAAtnAQF/QQAhAQJAIAAoAgwNAAJAAkACQAJAIAAtAC8OAwEAAwILIAAoAjQiAUUNACABKAIcIgFFDQAgACABEYCAgIAAACIBDQMLQQAPCxC/gICAAAALIABBr5GAgAA2AhBBDiEBCyABCx4AAkAgACgCDA0AIABBtJOAgAA2AhAgAEEVNgIMCwsWAAJAIAAoAgxBFUcNACAAQQA2AgwLCxYAAkAgACgCDEEWRw0AIABBADYCDAsLBwAgACgCDAsHACAAKAIQCwkAIAAgATYCEAsHACAAKAIUCyIAAkAgAEEZSQ0AEL+AgIAAAAsgAEECdEHomoCAAGooAgALIgACQCAAQS5JDQAQv4CAgAAACyAAQQJ0QcybgIAAaigCAAsWACAAIAAtAC1B/gFxIAFBAEdyOgAtCxkAIAAgAC0ALUH9AXEgAUEAR0EBdHI6AC0LLgECf0EAIQMCQCAAKAI0IgRFDQAgBCgCACIERQ0AIAAgBBGAgICAAAAhAwsgAwtJAQJ/QQAhAwJAIAAoAjQiBEUNACAEKAIEIgRFDQAgACABIAIgAWsgBBGBgICAAAAiA0F/Rw0AIABBnI6AgAA2AhBBGCEDCyADCy4BAn9BACEDAkAgACgCNCIERQ0AIAQoAigiBEUNACAAIAQRgICAgAAAIQMLIAMLSQECf0EAIQMCQCAAKAI0IgRFDQAgBCgCCCIERQ0AIAAgASACIAFrIAQRgYCAgAAAIgNBf0cNACAAQdKKgIAANgIQQRghAwsgAwsuAQJ/QQAhAwJAIAAoAjQiBEUNACAEKAIsIgRFDQAgACAEEYCAgIAAACEDCyADC0kBAn9BACEDAkAgACgCNCIERQ0AIAQoAgwiBEUNACAAIAEgAiABayAEEYGAgIAAACIDQX9HDQAgAEGNk4CAADYCEEEYIQMLIAMLLgECf0EAIQMCQCAAKAI0IgRFDQAgBCgCMCIERQ0AIAAgBBGAgICAAAAhAwsgAwtJAQJ/QQAhAwJAIAAoAjQiBEUNACAEKAIQIgRFDQAgACABIAIgAWsgBBGBgICAAAAiA0F/Rw0AIABBw5CAgAA2AhBBGCEDCyADCy4BAn9BACEDAkAgACgCNCIERQ0AIAQoAjQiBEUNACAAIAQRgICAgAAAIQMLIAMLLgECf0EAIQMCQCAAKAI0IgRFDQAgBCgCFCIERQ0AIAAgBBGAgICAAAAhAwsgAwsuAQJ/QQAhAwJAIAAoAjQiBEUNACAEKAIcIgRFDQAgACAEEYCAgIAAACEDCyADC0kBAn9BACEDAkAgACgCNCIERQ0AIAQoAhgiBEUNACAAIAEgAiABayAEEYGAgIAAACIDQX9HDQAgAEHSiICAADYCEEEYIQMLIAMLLgECf0EAIQMCQCAAKAI0IgRFDQAgBCgCICIERQ0AIAAgBBGAgICAAAAhAwsgAwsuAQJ/QQAhAwJAIAAoAjQiBEUNACAEKAIkIgRFDQAgACAEEYCAgIAAACEDCyADC0UBAX8CQAJAIAAvATBBFHFBFEcNAEEBIQMgAC0AKEEBRg0BIAAvATJB5QBGIQMMAQsgAC0AKUEFRiEDCyAAIAM6AC5BAAv0AQEDf0EBIQMCQCAALwEwIgRBCHENACAAKQMgQgBSIQMLAkACQCAALQAuRQ0AQQEhBSAALQApQQVGDQFBASEFIARBwABxRSADcUEBRw0BC0EAIQUgBEHAAHENAEECIQUgBEEIcQ0AAkAgBEGABHFFDQACQCAALQAoQQFHDQBBBSEFIAAtAC1BAnFFDQILQQQPCwJAIARBIHENAAJAIAAtAChBAUYNACAALwEyIgBBnH9qQeQASQ0AIABBzAFGDQAgAEGwAkYNAEEEIQUgBEGIBHFBgARGDQIgBEEocUUNAgtBAA8LQQBBAyAAKQMgUBshBQsgBQtdAQJ/QQAhAQJAIAAtAChBAUYNACAALwEyIgJBnH9qQeQASQ0AIAJBzAFGDQAgAkGwAkYNACAALwEwIgBBwABxDQBBASEBIABBiARxQYAERg0AIABBKHFFIQELIAELogEBA38CQAJAAkAgAC0AKkUNACAALQArRQ0AQQAhAyAALwEwIgRBAnFFDQEMAgtBACEDIAAvATAiBEEBcUUNAQtBASEDIAAtAChBAUYNACAALwEyIgVBnH9qQeQASQ0AIAVBzAFGDQAgBUGwAkYNACAEQcAAcQ0AQQAhAyAEQYgEcUGABEYNACAEQShxQQBHIQMLIABBADsBMCAAQQA6AC8gAwuUAQECfwJAAkACQCAALQAqRQ0AIAAtACtFDQBBACEBIAAvATAiAkECcUUNAQwCC0EAIQEgAC8BMCICQQFxRQ0BC0EBIQEgAC0AKEEBRg0AIAAvATIiAEGcf2pB5ABJDQAgAEHMAUYNACAAQbACRg0AIAJBwABxDQBBACEBIAJBiARxQYAERg0AIAJBKHFBAEchAQsgAQtIAQF7IABBEGr9DAAAAAAAAAAAAAAAAAAAAAAiAf0LAwAgACAB/QsDACAAQTBqQgA3AwAgAEEgaiAB/QsDACAAQbgBNgIcQQALewEBfwJAIAAoAgwiAw0AAkAgACgCBEUNACAAIAE2AgQLAkAgACABIAIQuICAgAAiAw0AIAAoAgwPCyAAIAM2AhxBACEDIAAoAgQiAUUNACAAIAEgAiAAKAIIEYGAgIAAACIBRQ0AIAAgAjYCFCAAIAE2AgwgASEDCyADC/LKAQMZfwN+BX8jgICAgABBEGsiAySAgICAACABIQQgASEFIAEhBiABIQcgASEIIAEhCSABIQogASELIAEhDCABIQ0gASEOIAEhDyABIRAgASERIAEhEiABIRMgASEUIAEhFSABIRYgASEXIAEhGCABIRkgASEaAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAKAIcIhtBf2oOuAG1AQG0AQIDBAUGBwgJCgsMDQ4PELsBugEREhOzARQVFhcYGRobHB0eHyAhsgGxASIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTq2ATs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4ABgQGCAYMBhAGFAYYBhwGIAYkBigGLAYwBjQGOAY8BkAGRAZIBkwGUAZUBlgGXAZgBmQGaAZsBnAGdAZ4BnwGgAaEBogGjAaQBpQGmAacBqAGpAaoBqwGsAa0BrgGvAQC3AQtBACEbDK8BC0EQIRsMrgELQQ8hGwytAQtBESEbDKwBC0ESIRsMqwELQRUhGwyqAQtBFiEbDKkBC0EXIRsMqAELQRghGwynAQtBGSEbDKYBC0EIIRsMpQELQRohGwykAQtBGyEbDKMBC0EUIRsMogELQRMhGwyhAQtBHCEbDKABC0EdIRsMnwELQR4hGwyeAQtBHyEbDJ0BC0GqASEbDJwBC0GrASEbDJsBC0EhIRsMmgELQSIhGwyZAQtBIyEbDJgBC0EkIRsMlwELQSUhGwyWAQtBrQEhGwyVAQtBJiEbDJQBC0EqIRsMkwELQQ4hGwySAQtBJyEbDJEBC0EoIRsMkAELQSkhGwyPAQtBLiEbDI4BC0ErIRsMjQELQa4BIRsMjAELQQ0hGwyLAQtBDCEbDIoBC0EvIRsMiQELQQshGwyIAQtBLCEbDIcBC0EtIRsMhgELQQohGwyFAQtBMSEbDIQBC0EwIRsMgwELQQkhGwyCAQtBICEbDIEBC0EyIRsMgAELQTMhGwx/C0E0IRsMfgtBNSEbDH0LQTYhGwx8C0E3IRsMewtBOCEbDHoLQTkhGwx5C0E6IRsMeAtBrAEhGwx3C0E7IRsMdgtBPCEbDHULQT0hGwx0C0E+IRsMcwtBPyEbDHILQcAAIRsMcQtBwQAhGwxwC0HCACEbDG8LQcMAIRsMbgtBxAAhGwxtC0EHIRsMbAtBxQAhGwxrC0EGIRsMagtBxgAhGwxpC0EFIRsMaAtBxwAhGwxnC0EEIRsMZgtByAAhGwxlC0HJACEbDGQLQcoAIRsMYwtBywAhGwxiC0EDIRsMYQtBzAAhGwxgC0HNACEbDF8LQc4AIRsMXgtB0AAhGwxdC0HPACEbDFwLQdEAIRsMWwtB0gAhGwxaC0ECIRsMWQtB0wAhGwxYC0HUACEbDFcLQdUAIRsMVgtB1gAhGwxVC0HXACEbDFQLQdgAIRsMUwtB2QAhGwxSC0HaACEbDFELQdsAIRsMUAtB3AAhGwxPC0HdACEbDE4LQd4AIRsMTQtB3wAhGwxMC0HgACEbDEsLQeEAIRsMSgtB4gAhGwxJC0HjACEbDEgLQeQAIRsMRwtB5QAhGwxGC0HmACEbDEULQecAIRsMRAtB6AAhGwxDC0HpACEbDEILQeoAIRsMQQtB6wAhGwxAC0HsACEbDD8LQe0AIRsMPgtB7gAhGww9C0HvACEbDDwLQfAAIRsMOwtB8QAhGww6C0HyACEbDDkLQfMAIRsMOAtB9AAhGww3C0H1ACEbDDYLQfYAIRsMNQtB9wAhGww0C0H4ACEbDDMLQfkAIRsMMgtB+gAhGwwxC0H7ACEbDDALQfwAIRsMLwtB/QAhGwwuC0H+ACEbDC0LQf8AIRsMLAtBgAEhGwwrC0GBASEbDCoLQYIBIRsMKQtBgwEhGwwoC0GEASEbDCcLQYUBIRsMJgtBhgEhGwwlC0GHASEbDCQLQYgBIRsMIwtBiQEhGwwiC0GKASEbDCELQYsBIRsMIAtBjAEhGwwfC0GNASEbDB4LQY4BIRsMHQtBjwEhGwwcC0GQASEbDBsLQZEBIRsMGgtBkgEhGwwZC0GTASEbDBgLQZQBIRsMFwtBlQEhGwwWC0GWASEbDBULQZcBIRsMFAtBmAEhGwwTC0GZASEbDBILQZ0BIRsMEQtBmgEhGwwQC0EBIRsMDwtBmwEhGwwOC0GcASEbDA0LQZ4BIRsMDAtBoAEhGwwLC0GfASEbDAoLQaEBIRsMCQtBogEhGwwIC0GjASEbDAcLQaQBIRsMBgtBpQEhGwwFC0GmASEbDAQLQacBIRsMAwtBqAEhGwwCC0GpASEbDAELQa8BIRsLA0ACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIBsO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aG9kIGZvciBSVFNQL3gueCByZXF1ZXN0AEV4cGVjdGVkIFNPVVJDRSBtZXRob2QgZm9yIElDRS94LnggcmVxdWVzdABJbnZhbGlkIGNoYXIgaW4gdXJsIGZyYWdtZW50IHN0YXJ0AEV4cGVjdGVkIGRvdABTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3N0YXR1cwBJbnZhbGlkIHJlc3BvbnNlIHN0YXR1cwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBwYXJhbWV0ZXJzAFVzZXIgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2hlYWRlcmAgY2FsbGJhY2sgZXJyb3IAYG9uX21lc3NhZ2VfYmVnaW5gIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX21lc3NhZ2VfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2VydmVyAEludmFsaWQgaGVhZGVyIHZhbHVlIGNoYXIASW52YWxpZCBoZWFkZXIgZmllbGQgY2hhcgBJbnZhbGlkIG1pbm9yIHZlcnNpb24ASW52YWxpZCBtYWpvciB2ZXJzaW9uAEV4cGVjdGVkIHNwYWNlIGFmdGVyIHZlcnNpb24ARXhwZWN0ZWQgQ1JMRiBhZnRlciB2ZXJzaW9uAEludmFsaWQgaGVhZGVyIHRva2VuAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fdXJsAEludmFsaWQgY2hhcmFjdGVycyBpbiB1cmwAVW5leHBlY3RlZCBzdGFydCBjaGFyIGluIHVybABEb3VibGUgQCBpbiB1cmwARW1wdHkgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyYWN0ZXIgaW4gQ29udGVudC1MZW5ndGgARHVwbGljYXRlIENvbnRlbnQtTGVuZ3RoAEludmFsaWQgY2hhciBpbiB1cmwgcGF0aABDb250ZW50LUxlbmd0aCBjYW4ndCBiZSBwcmVzZW50IHdpdGggVHJhbnNmZXItRW5jb2RpbmcASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgc2l6ZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2hlYWRlcl92YWx1ZQBNaXNzaW5nIGV4cGVjdGVkIExGIGFmdGVyIGhlYWRlciB2YWx1ZQBQYXVzZWQgYnkgb25faGVhZGVyc19jb21wbGV0ZQBJbnZhbGlkIEVPRiBzdGF0ZQBvbl9jaHVua19oZWFkZXIgcGF1c2UAb25fbWVzc2FnZV9iZWdpbiBwYXVzZQBvbl9jaHVua19jb21wbGV0ZSBwYXVzZQBvbl9tZXNzYWdlX2NvbXBsZXRlIHBhdXNlAFBhdXNlIG9uIENPTk5FQ1QvVXBncmFkZQBQYXVzZSBvbiBQUkkvVXBncmFkZQBFeHBlY3RlZCBIVFRQLzIgQ29ubmVjdGlvbiBQcmVmYWNlAEV4cGVjdGVkIHNwYWNlIGFmdGVyIG1ldGhvZABTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2hlYWRlcl9maWVsZABQYXVzZWQASW52YWxpZCB3b3JkIGVuY291bnRlcmVkAEludmFsaWQgbWV0aG9kIGVuY291bnRlcmVkAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2NoZW1hAFJlcXVlc3QgaGFzIGludmFsaWQgYFRyYW5zZmVyLUVuY29kaW5nYABNS0FDVElWSVRZAENPUFkATk9USUZZAFBMQVkAUFVUAENIRUNLT1VUAFBPU1QAUkVQT1JUAEhQRV9JTlZBTElEX0NPTlNUQU5UAEdFVABIUEVfU1RSSUNUAFJFRElSRUNUAENPTk5FQ1QASFBFX0lOVkFMSURfU1RBVFVTAE9QVElPTlMAU0VUX1BBUkFNRVRFUgBHRVRfUEFSQU1FVEVSAEhQRV9VU0VSAEhQRV9DQl9DSFVOS19IRUFERVIATUtDQUxFTkRBUgBTRVRVUABURUFSRE9XTgBIUEVfQ0xPU0VEX0NPTk5FQ1RJT04ASFBFX0lOVkFMSURfVkVSU0lPTgBIUEVfQ0JfTUVTU0FHRV9CRUdJTgBIUEVfSU5WQUxJRF9IRUFERVJfVE9LRU4ASFBFX0lOVkFMSURfVVJMAE1LQ09MAEFDTABIUEVfSU5URVJOQUwASFBFX09LAFVOTElOSwBVTkxPQ0sAUFJJAEhQRV9JTlZBTElEX0NPTlRFTlRfTEVOR1RIAEhQRV9VTkVYUEVDVEVEX0NPTlRFTlRfTEVOR1RIAEZMVVNIAFBST1BQQVRDSABNLVNFQVJDSABIUEVfSU5WQUxJRF9UUkFOU0ZFUl9FTkNPRElORwBFeHBlY3RlZCBDUkxGAEhQRV9JTlZBTElEX0NIVU5LX1NJWkUATU9WRQBIUEVfQ0JfSEVBREVSU19DT01QTEVURQBIUEVfQ0JfQ0hVTktfQ09NUExFVEUASFBFX0NCX01FU1NBR0VfQ09NUExFVEUAREVMRVRFAEhQRV9JTlZBTElEX0VPRl9TVEFURQBQQVVTRQBQVVJHRQBNRVJHRQBIUEVfUEFVU0VEX1VQR1JBREUASFBFX1BBVVNFRF9IMl9VUEdSQURFAFNPVVJDRQBBTk5PVU5DRQBUUkFDRQBERVNDUklCRQBVTlNVQlNDUklCRQBSRUNPUkQASFBFX0lOVkFMSURfTUVUSE9EAFBST1BGSU5EAFVOQklORABSRUJJTkQASFBFX0xGX0VYUEVDVEVEAEhQRV9QQVVTRUQASEVBRABFeHBlY3RlZCBIVFRQLwCMCwAAfwsAAIMKAAA5DQAAwAsAAA0LAAAPDQAAZQsAAGoKAAAjCwAATAsAAKULAAAjDAAAnwoAAIwMAAD3CwAANwsAAD8MAABtDAAA3woAAFcMAABJDQAAtAwAAMcMAADWCgAAhQwAAH8KAABUDQAAXgoAAFEKAACXCgAAsgoAAO0MAABACgAAnAsAAHULAAA6DAAAIg0AAOQLAADwCwAAmgsAADQNAAAyDQAAKw0AAHsLAABjCgAANQoAAFUKAACuDAAA7gsAAEUKAAD+DAAA/AwAAOgLAACoDAAA8woAAJULAACTCwAA3QwAAKELAADzDAAA5AwAAP4KAABMCgAAogwAAAQLAADICgAAugoAAI4KAAAIDQAA3gsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQFsb3NlZWVwLWFsaXZlAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQFjaHVua2VkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQABAQEBAQAAAQEAAQEAAQEBAQEBAQEBAQAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGVjdGlvbmVudC1sZW5ndGhvbnJveHktY29ubmVjdGlvbgAAAAAAAAAAAAAAAAAAAHJhbnNmZXItZW5jb2RpbmdwZ3JhZGUNCg0KDQpTTQ0KDQpUVFAvQ0UvVFNQLwAAAAAAAAAAAAAAAAECAAEDAAAAAAAAAAAAAAAAAAAAAAAABAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAgABAwAAAAAAAAAAAAAAAAAAAAAAAAQBAQUBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAABAAACAAAAAAAAAAAAAAAAAAAAAAAAAwQAAAQEBAQEBAQEBAQEBQQEBAQEBAQEBAQEBAAEAAYHBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAgAAAAACAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE5PVU5DRUVDS09VVE5FQ1RFVEVDUklCRUxVU0hFVEVBRFNFQVJDSFJHRUNUSVZJVFlMRU5EQVJWRU9USUZZUFRJT05TQ0hTRUFZU1RBVENIR0VPUkRJUkVDVE9SVFJDSFBBUkFNRVRFUlVSQ0VCU0NSSUJFQVJET1dOQUNFSU5ETktDS1VCU0NSSUJFSFRUUC9BRFRQLw==';
	return llhttp_simd_wasm;
}

/* global WebAssembly */

const assert$3 = require$$0$1;
const net = require$$4;
const util$9 = util$e;
const Request$2 = request$2;
const DispatcherBase$2 = dispatcherBase;
const RedirectHandler$1 = redirect;
const {
  RequestContentLengthMismatchError,
  ResponseContentLengthMismatchError,
  InvalidArgumentError: InvalidArgumentError$9,
  RequestAbortedError: RequestAbortedError$7,
  HeadersTimeoutError,
  HeadersOverflowError,
  SocketError: SocketError$2,
  InformationalError,
  BodyTimeoutError,
  HTTPParserError
} = errors$1;
const buildConnector$1 = connect$2;
const {
  kUrl: kUrl$2,
  kReset,
  kServerName,
  kClient,
  kBusy: kBusy$1,
  kParser,
  kConnect,
  kBlocking,
  kResuming,
  kRunning: kRunning$3,
  kPending: kPending$2,
  kSize: kSize$4,
  kWriting,
  kQueue: kQueue$1,
  kConnected: kConnected$3,
  kConnecting,
  kNeedDrain: kNeedDrain$2,
  kNoRef,
  kKeepAliveDefaultTimeout,
  kHostHeader,
  kPendingIdx,
  kRunningIdx,
  kError,
  kPipelining,
  kSocket,
  kKeepAliveTimeoutValue,
  kMaxHeadersSize,
  kKeepAliveMaxTimeout,
  kKeepAliveTimeoutThreshold,
  kHeadersTimeout,
  kBodyTimeout,
  kStrictContentLength,
  kConnector,
  kMaxRedirections: kMaxRedirections$1,
  kMaxRequests,
  kCounter,
  kClose: kClose$2,
  kDestroy: kDestroy$2,
  kDispatch: kDispatch$2
} = symbols$1;

const kClosedResolve$1 = Symbol('kClosedResolve');

const channels = {};

try {
  const diagnosticsChannel = require('diagnostics_channel');
  channels.sendHeaders = diagnosticsChannel.channel('undici:client:sendHeaders');
  channels.beforeConnect = diagnosticsChannel.channel('undici:client:beforeConnect');
  channels.connectError = diagnosticsChannel.channel('undici:client:connectError');
  channels.connected = diagnosticsChannel.channel('undici:client:connected');
} catch {
  channels.sendHeaders = { hasSubscribers: false };
  channels.beforeConnect = { hasSubscribers: false };
  channels.connectError = { hasSubscribers: false };
  channels.connected = { hasSubscribers: false };
}

class Client$2 extends DispatcherBase$2 {
  constructor (url, {
    maxHeaderSize,
    headersTimeout,
    socketTimeout,
    requestTimeout,
    connectTimeout,
    bodyTimeout,
    idleTimeout,
    keepAlive,
    keepAliveTimeout,
    maxKeepAliveTimeout,
    keepAliveMaxTimeout,
    keepAliveTimeoutThreshold,
    socketPath,
    pipelining,
    tls,
    strictContentLength,
    maxCachedSessions,
    maxRedirections,
    connect,
    maxRequestsPerClient
  } = {}) {
    super();

    if (keepAlive !== undefined) {
      throw new InvalidArgumentError$9('unsupported keepAlive, use pipelining=0 instead')
    }

    if (socketTimeout !== undefined) {
      throw new InvalidArgumentError$9('unsupported socketTimeout, use headersTimeout & bodyTimeout instead')
    }

    if (requestTimeout !== undefined) {
      throw new InvalidArgumentError$9('unsupported requestTimeout, use headersTimeout & bodyTimeout instead')
    }

    if (idleTimeout !== undefined) {
      throw new InvalidArgumentError$9('unsupported idleTimeout, use keepAliveTimeout instead')
    }

    if (maxKeepAliveTimeout !== undefined) {
      throw new InvalidArgumentError$9('unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead')
    }

    if (maxHeaderSize != null && !Number.isFinite(maxHeaderSize)) {
      throw new InvalidArgumentError$9('invalid maxHeaderSize')
    }

    if (socketPath != null && typeof socketPath !== 'string') {
      throw new InvalidArgumentError$9('invalid socketPath')
    }

    if (connectTimeout != null && (!Number.isFinite(connectTimeout) || connectTimeout < 0)) {
      throw new InvalidArgumentError$9('invalid connectTimeout')
    }

    if (keepAliveTimeout != null && (!Number.isFinite(keepAliveTimeout) || keepAliveTimeout <= 0)) {
      throw new InvalidArgumentError$9('invalid keepAliveTimeout')
    }

    if (keepAliveMaxTimeout != null && (!Number.isFinite(keepAliveMaxTimeout) || keepAliveMaxTimeout <= 0)) {
      throw new InvalidArgumentError$9('invalid keepAliveMaxTimeout')
    }

    if (keepAliveTimeoutThreshold != null && !Number.isFinite(keepAliveTimeoutThreshold)) {
      throw new InvalidArgumentError$9('invalid keepAliveTimeoutThreshold')
    }

    if (headersTimeout != null && (!Number.isInteger(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError$9('headersTimeout must be a positive integer or zero')
    }

    if (bodyTimeout != null && (!Number.isInteger(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError$9('bodyTimeout must be a positive integer or zero')
    }

    if (connect != null && typeof connect !== 'function' && typeof connect !== 'object') {
      throw new InvalidArgumentError$9('connect must be a function or an object')
    }

    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError$9('maxRedirections must be a positive number')
    }

    if (maxRequestsPerClient != null && (!Number.isInteger(maxRequestsPerClient) || maxRequestsPerClient < 0)) {
      throw new InvalidArgumentError$9('maxRequestsPerClient must be a positive number')
    }

    if (typeof connect !== 'function') {
      connect = buildConnector$1({
        ...tls,
        maxCachedSessions,
        socketPath,
        timeout: connectTimeout,
        ...connect
      });
    }

    this[kUrl$2] = util$9.parseOrigin(url);
    this[kConnector] = connect;
    this[kSocket] = null;
    this[kPipelining] = pipelining != null ? pipelining : 1;
    this[kMaxHeadersSize] = maxHeaderSize || 16384;
    this[kKeepAliveDefaultTimeout] = keepAliveTimeout == null ? 4e3 : keepAliveTimeout;
    this[kKeepAliveMaxTimeout] = keepAliveMaxTimeout == null ? 600e3 : keepAliveMaxTimeout;
    this[kKeepAliveTimeoutThreshold] = keepAliveTimeoutThreshold == null ? 1e3 : keepAliveTimeoutThreshold;
    this[kKeepAliveTimeoutValue] = this[kKeepAliveDefaultTimeout];
    this[kServerName] = null;
    this[kResuming] = 0; // 0, idle, 1, scheduled, 2 resuming
    this[kNeedDrain$2] = 0; // 0, idle, 1, scheduled, 2 resuming
    this[kHostHeader] = `host: ${this[kUrl$2].hostname}${this[kUrl$2].port ? `:${this[kUrl$2].port}` : ''}\r\n`;
    this[kBodyTimeout] = bodyTimeout != null ? bodyTimeout : 30e3;
    this[kHeadersTimeout] = headersTimeout != null ? headersTimeout : 30e3;
    this[kStrictContentLength] = strictContentLength == null ? true : strictContentLength;
    this[kMaxRedirections$1] = maxRedirections;
    this[kMaxRequests] = maxRequestsPerClient;
    this[kClosedResolve$1] = null;

    // kQueue is built up of 3 sections separated by
    // the kRunningIdx and kPendingIdx indices.
    // |   complete   |   running   |   pending   |
    //                ^ kRunningIdx ^ kPendingIdx ^ kQueue.length
    // kRunningIdx points to the first running element.
    // kPendingIdx points to the first pending element.
    // This implements a fast queue with an amortized
    // time of O(1).

    this[kQueue$1] = [];
    this[kRunningIdx] = 0;
    this[kPendingIdx] = 0;
  }

  get pipelining () {
    return this[kPipelining]
  }

  set pipelining (value) {
    this[kPipelining] = value;
    resume(this, true);
  }

  get [kPending$2] () {
    return this[kQueue$1].length - this[kPendingIdx]
  }

  get [kRunning$3] () {
    return this[kPendingIdx] - this[kRunningIdx]
  }

  get [kSize$4] () {
    return this[kQueue$1].length - this[kRunningIdx]
  }

  get [kConnected$3] () {
    return !!this[kSocket] && !this[kConnecting] && !this[kSocket].destroyed
  }

  get [kBusy$1] () {
    const socket = this[kSocket];
    return (
      (socket && (socket[kReset] || socket[kWriting] || socket[kBlocking])) ||
      (this[kSize$4] >= (this[kPipelining] || 1)) ||
      this[kPending$2] > 0
    )
  }

  /* istanbul ignore: only used for test */
  [kConnect] (cb) {
    connect$1(this);
    this.once('connect', cb);
  }

  [kDispatch$2] (opts, handler) {
    const { maxRedirections = this[kMaxRedirections$1] } = opts;
    if (maxRedirections) {
      handler = new RedirectHandler$1(this, maxRedirections, opts, handler);
    }

    const origin = opts.origin || this[kUrl$2].origin;

    const request = new Request$2(origin, opts, handler);

    this[kQueue$1].push(request);
    if (this[kResuming]) ; else if (util$9.bodyLength(request.body) == null && util$9.isIterable(request.body)) {
      // Wait a tick in case stream/iterator is ended in the same tick.
      this[kResuming] = 1;
      process.nextTick(resume, this);
    } else {
      resume(this, true);
    }

    if (this[kResuming] && this[kNeedDrain$2] !== 2 && this[kBusy$1]) {
      this[kNeedDrain$2] = 2;
    }

    return this[kNeedDrain$2] < 2
  }

  async [kClose$2] () {
    return new Promise((resolve) => {
      if (!this[kSize$4]) {
        this.destroy(resolve);
      } else {
        this[kClosedResolve$1] = resolve;
      }
    })
  }

  async [kDestroy$2] (err) {
    return new Promise((resolve) => {
      const requests = this[kQueue$1].splice(this[kPendingIdx]);
      for (let i = 0; i < requests.length; i++) {
        const request = requests[i];
        errorRequest(this, request, err);
      }

      const callback = () => {
        if (this[kClosedResolve$1]) {
          this[kClosedResolve$1]();
          this[kClosedResolve$1] = null;
        }
        resolve();
      };

      if (!this[kSocket]) {
        queueMicrotask(callback);
      } else {
        util$9.destroy(this[kSocket].on('close', callback), err);
      }

      resume(this);
    })
  }
}

const constants = requireConstants();
const EMPTY_BUF = Buffer.alloc(0);

async function lazyllhttp () {
  const llhttpWasmData = process.env.JEST_WORKER_ID ? requireLlhttp_wasm() : undefined;

  let mod;
  try {
    mod = await WebAssembly.compile(Buffer.from(requireLlhttp_simd_wasm(), 'base64'));
  } catch (e) {
    /* istanbul ignore next */

    // We could check if the error was caused by the simd option not
    // being enabled, but the occurring of this other error
    // * https://github.com/emscripten-core/emscripten/issues/11495
    // got me to remove that check to avoid breaking Node 12.
    mod = await WebAssembly.compile(Buffer.from(llhttpWasmData || requireLlhttp_wasm(), 'base64'));
  }

  return await WebAssembly.instantiate(mod, {
    env: {
      /* eslint-disable camelcase */

      wasm_on_url: (p, at, len) => {
        /* istanbul ignore next */
        return 0
      },
      wasm_on_status: (p, at, len) => {
        assert$3.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr;
        const end = start + len;
        return currentParser.onStatus(currentBufferRef.slice(start, end)) || 0
      },
      wasm_on_message_begin: (p) => {
        assert$3.strictEqual(currentParser.ptr, p);
        return currentParser.onMessageBegin() || 0
      },
      wasm_on_header_field: (p, at, len) => {
        assert$3.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr;
        const end = start + len;
        return currentParser.onHeaderField(currentBufferRef.slice(start, end)) || 0
      },
      wasm_on_header_value: (p, at, len) => {
        assert$3.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr;
        const end = start + len;
        return currentParser.onHeaderValue(currentBufferRef.slice(start, end)) || 0
      },
      wasm_on_headers_complete: (p, statusCode, upgrade, shouldKeepAlive) => {
        assert$3.strictEqual(currentParser.ptr, p);
        return currentParser.onHeadersComplete(statusCode, Boolean(upgrade), Boolean(shouldKeepAlive)) || 0
      },
      wasm_on_body: (p, at, len) => {
        assert$3.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr;
        const end = start + len;
        return currentParser.onBody(currentBufferRef.slice(start, end)) || 0
      },
      wasm_on_message_complete: (p) => {
        assert$3.strictEqual(currentParser.ptr, p);
        return currentParser.onMessageComplete() || 0
      }

      /* eslint-enable camelcase */
    }
  })
}

let llhttpInstance = null;
let llhttpPromise = lazyllhttp()
  .catch(() => {
  });

let currentParser = null;
let currentBufferRef = null;
let currentBufferSize = 0;
let currentBufferPtr = null;

const TIMEOUT_HEADERS = 1;
const TIMEOUT_BODY = 2;
const TIMEOUT_IDLE = 3;

class Parser {
  constructor (client, socket, { exports }) {
    assert$3(Number.isFinite(client[kMaxHeadersSize]) && client[kMaxHeadersSize] > 0);

    this.llhttp = exports;
    this.ptr = this.llhttp.llhttp_alloc(constants.TYPE.RESPONSE);
    this.client = client;
    this.socket = socket;
    this.timeout = null;
    this.timeoutValue = null;
    this.timeoutType = null;
    this.statusCode = null;
    this.statusText = '';
    this.upgrade = false;
    this.headers = [];
    this.headersSize = 0;
    this.headersMaxSize = client[kMaxHeadersSize];
    this.shouldKeepAlive = false;
    this.paused = false;
    this.resume = this.resume.bind(this);

    this.bytesRead = 0;

    this.keepAlive = '';
    this.contentLength = '';
  }

  setTimeout (value, type) {
    this.timeoutType = type;
    if (value !== this.timeoutValue) {
      clearTimeout(this.timeout);
      if (value) {
        this.timeout = setTimeout(onParserTimeout, value, this);
        // istanbul ignore else: only for jest
        if (this.timeout.unref) {
          this.timeout.unref();
        }
      } else {
        this.timeout = null;
      }
      this.timeoutValue = value;
    } else if (this.timeout) {
      // istanbul ignore else: only for jest
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
  }

  resume () {
    if (this.socket.destroyed || !this.paused) {
      return
    }

    assert$3(this.ptr != null);
    assert$3(currentParser == null);

    this.llhttp.llhttp_resume(this.ptr);

    assert$3(this.timeoutType === TIMEOUT_BODY);
    if (this.timeout) {
      // istanbul ignore else: only for jest
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }

    this.paused = false;
    this.execute(this.socket.read() || EMPTY_BUF); // Flush parser.
    this.readMore();
  }

  readMore () {
    while (!this.paused && this.ptr) {
      const chunk = this.socket.read();
      if (chunk === null) {
        break
      }
      this.execute(chunk);
    }
  }

  execute (data) {
    assert$3(this.ptr != null);
    assert$3(currentParser == null);
    assert$3(!this.paused);

    const { socket, llhttp } = this;

    if (data.length > currentBufferSize) {
      if (currentBufferPtr) {
        llhttp.free(currentBufferPtr);
      }
      currentBufferSize = Math.ceil(data.length / 4096) * 4096;
      currentBufferPtr = llhttp.malloc(currentBufferSize);
    }

    new Uint8Array(llhttp.memory.buffer, currentBufferPtr, currentBufferSize).set(data);

    // Call `execute` on the wasm parser.
    // We pass the `llhttp_parser` pointer address, the pointer address of buffer view data,
    // and finally the length of bytes to parse.
    // The return value is an error code or `constants.ERROR.OK`.
    try {
      let ret;

      try {
        currentBufferRef = data;
        currentParser = this;
        ret = llhttp.llhttp_execute(this.ptr, currentBufferPtr, data.length);
        /* eslint-disable-next-line no-useless-catch */
      } catch (err) {
        /* istanbul ignore next: difficult to make a test case for */
        throw err
      } finally {
        currentParser = null;
        currentBufferRef = null;
      }

      const offset = llhttp.llhttp_get_error_pos(this.ptr) - currentBufferPtr;

      if (ret === constants.ERROR.PAUSED_UPGRADE) {
        this.onUpgrade(data.slice(offset));
      } else if (ret === constants.ERROR.PAUSED) {
        this.paused = true;
        socket.unshift(data.slice(offset));
      } else if (ret !== constants.ERROR.OK) {
        const ptr = llhttp.llhttp_get_error_reason(this.ptr);
        let message = '';
        /* istanbul ignore else: difficult to make a test case for */
        if (ptr) {
          const len = new Uint8Array(llhttp.memory.buffer, ptr).indexOf(0);
          message = Buffer.from(llhttp.memory.buffer, ptr, len).toString();
        }
        throw new HTTPParserError(message, constants.ERROR[ret], data.slice(offset))
      }
    } catch (err) {
      util$9.destroy(socket, err);
    }
  }

  finish () {
    try {
      try {
        currentParser = this;
      } finally {
        currentParser = null;
      }
    } catch (err) {
      /* istanbul ignore next: difficult to make a test case for */
      util$9.destroy(this.socket, err);
    }
  }

  destroy () {
    assert$3(this.ptr != null);
    assert$3(currentParser == null);

    this.llhttp.llhttp_free(this.ptr);
    this.ptr = null;

    clearTimeout(this.timeout);
    this.timeout = null;
    this.timeoutValue = null;
    this.timeoutType = null;

    this.paused = false;
  }

  onStatus (buf) {
    this.statusText = buf.toString();
  }

  onMessageBegin () {
    const { socket, client } = this;

    /* istanbul ignore next: difficult to make a test case for */
    if (socket.destroyed) {
      return -1
    }

    const request = client[kQueue$1][client[kRunningIdx]];
    if (!request) {
      return -1
    }
  }

  onHeaderField (buf) {
    const len = this.headers.length;

    if ((len & 1) === 0) {
      this.headers.push(buf);
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
    }

    this.trackHeader(buf.length);
  }

  onHeaderValue (buf) {
    let len = this.headers.length;

    if ((len & 1) === 1) {
      this.headers.push(buf);
      len += 1;
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
    }

    const key = this.headers[len - 2];
    if (key.length === 10 && key.toString().toLowerCase() === 'keep-alive') {
      this.keepAlive += buf.toString();
    } else if (key.length === 14 && key.toString().toLowerCase() === 'content-length') {
      this.contentLength += buf.toString();
    }

    this.trackHeader(buf.length);
  }

  trackHeader (len) {
    this.headersSize += len;
    if (this.headersSize >= this.headersMaxSize) {
      util$9.destroy(this.socket, new HeadersOverflowError());
    }
  }

  onUpgrade (head) {
    const { upgrade, client, socket, headers, statusCode } = this;

    assert$3(upgrade);

    const request = client[kQueue$1][client[kRunningIdx]];
    assert$3(request);

    assert$3(!socket.destroyed);
    assert$3(socket === client[kSocket]);
    assert$3(!this.paused);
    assert$3(request.upgrade || request.method === 'CONNECT');

    this.statusCode = null;
    this.statusText = '';
    this.shouldKeepAlive = null;

    assert$3(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;

    socket.unshift(head);

    socket[kParser].destroy();
    socket[kParser] = null;

    socket[kClient] = null;
    socket[kError] = null;
    socket
      .removeListener('error', onSocketError)
      .removeListener('readable', onSocketReadable)
      .removeListener('end', onSocketEnd)
      .removeListener('close', onSocketClose);

    client[kSocket] = null;
    client[kQueue$1][client[kRunningIdx]++] = null;
    client.emit('disconnect', client[kUrl$2], [client], new InformationalError('upgrade'));

    try {
      request.onUpgrade(statusCode, headers, socket);
    } catch (err) {
      util$9.destroy(socket, err);
    }

    resume(client);
  }

  onHeadersComplete (statusCode, upgrade, shouldKeepAlive) {
    const { client, socket, headers, statusText } = this;

    /* istanbul ignore next: difficult to make a test case for */
    if (socket.destroyed) {
      return -1
    }

    const request = client[kQueue$1][client[kRunningIdx]];

    /* istanbul ignore next: difficult to make a test case for */
    if (!request) {
      return -1
    }

    assert$3(!this.upgrade);
    assert$3(this.statusCode < 200);

    if (statusCode === 100) {
      util$9.destroy(socket, new SocketError$2('bad response', util$9.getSocketInfo(socket)));
      return -1
    }

    /* this can only happen if server is misbehaving */
    if (upgrade && !request.upgrade) {
      util$9.destroy(socket, new SocketError$2('bad upgrade', util$9.getSocketInfo(socket)));
      return -1
    }

    assert$3.strictEqual(this.timeoutType, TIMEOUT_HEADERS);

    this.statusCode = statusCode;
    this.shouldKeepAlive = shouldKeepAlive;

    if (this.statusCode >= 200) {
      const bodyTimeout = request.bodyTimeout != null
        ? request.bodyTimeout
        : client[kBodyTimeout];
      this.setTimeout(bodyTimeout, TIMEOUT_BODY);
    } else if (this.timeout) {
      // istanbul ignore else: only for jest
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }

    if (request.method === 'CONNECT') {
      assert$3(client[kRunning$3] === 1);
      this.upgrade = true;
      return 2
    }

    if (upgrade) {
      assert$3(client[kRunning$3] === 1);
      this.upgrade = true;
      return 2
    }

    assert$3(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;

    if (shouldKeepAlive && client[kPipelining]) {
      const keepAliveTimeout = this.keepAlive ? util$9.parseKeepAliveTimeout(this.keepAlive) : null;

      if (keepAliveTimeout != null) {
        const timeout = Math.min(
          keepAliveTimeout - client[kKeepAliveTimeoutThreshold],
          client[kKeepAliveMaxTimeout]
        );
        if (timeout <= 0) {
          socket[kReset] = true;
        } else {
          client[kKeepAliveTimeoutValue] = timeout;
        }
      } else {
        client[kKeepAliveTimeoutValue] = client[kKeepAliveDefaultTimeout];
      }
    } else {
      // Stop more requests from being dispatched.
      socket[kReset] = true;
    }

    let pause;
    try {
      pause = request.onHeaders(statusCode, headers, this.resume, statusText) === false;
    } catch (err) {
      util$9.destroy(socket, err);
      return -1
    }

    if (request.method === 'HEAD') {
      assert$3(socket[kReset]);
      return 1
    }

    if (statusCode < 200) {
      return 1
    }

    if (socket[kBlocking]) {
      socket[kBlocking] = false;
      resume(client);
    }

    return pause ? constants.ERROR.PAUSED : 0
  }

  onBody (buf) {
    const { client, socket, statusCode } = this;

    if (socket.destroyed) {
      return -1
    }

    const request = client[kQueue$1][client[kRunningIdx]];
    assert$3(request);

    assert$3.strictEqual(this.timeoutType, TIMEOUT_BODY);
    if (this.timeout) {
      // istanbul ignore else: only for jest
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }

    assert$3(statusCode >= 200);

    this.bytesRead += buf.length;

    try {
      if (request.onData(buf) === false) {
        return constants.ERROR.PAUSED
      }
    } catch (err) {
      util$9.destroy(socket, err);
      return -1
    }
  }

  onMessageComplete () {
    const { client, socket, statusCode, upgrade, headers, contentLength, bytesRead, shouldKeepAlive } = this;

    if (socket.destroyed && (!statusCode || shouldKeepAlive)) {
      return -1
    }

    if (upgrade) {
      return
    }

    const request = client[kQueue$1][client[kRunningIdx]];
    assert$3(request);

    assert$3(statusCode >= 100);

    this.statusCode = null;
    this.statusText = '';
    this.bytesRead = 0;
    this.contentLength = '';
    this.keepAlive = '';

    assert$3(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;

    if (statusCode < 200) {
      return
    }

    /* istanbul ignore next: should be handled by llhttp? */
    if (request.method !== 'HEAD' && contentLength && bytesRead !== parseInt(contentLength, 10)) {
      util$9.destroy(socket, new ResponseContentLengthMismatchError());
      return -1
    }

    try {
      request.onComplete(headers);
    } catch (err) {
      errorRequest(client, request, err);
    }

    client[kQueue$1][client[kRunningIdx]++] = null;

    if (socket[kWriting]) {
      assert$3.strictEqual(client[kRunning$3], 0);
      // Response completed before request.
      util$9.destroy(socket, new InformationalError('reset'));
      return constants.ERROR.PAUSED
    } else if (!shouldKeepAlive) {
      util$9.destroy(socket, new InformationalError('reset'));
      return constants.ERROR.PAUSED
    } else if (socket[kReset] && client[kRunning$3] === 0) {
      // Destroy socket once all requests have completed.
      // The request at the tail of the pipeline is the one
      // that requested reset and no further requests should
      // have been queued since then.
      util$9.destroy(socket, new InformationalError('reset'));
      return constants.ERROR.PAUSED
    } else if (client[kPipelining] === 1) {
      // We must wait a full event loop cycle to reuse this socket to make sure
      // that non-spec compliant servers are not closing the connection even if they
      // said they won't.
      setImmediate(resume, client);
    } else {
      resume(client);
    }
  }
}

function onParserTimeout (parser) {
  const { socket, timeoutType, client } = parser;

  /* istanbul ignore else */
  if (timeoutType === TIMEOUT_HEADERS) {
    assert$3(!parser.paused, 'cannot be paused while waiting for headers');
    util$9.destroy(socket, new HeadersTimeoutError());
  } else if (timeoutType === TIMEOUT_BODY) {
    if (!parser.paused) {
      util$9.destroy(socket, new BodyTimeoutError());
    }
  } else if (timeoutType === TIMEOUT_IDLE) {
    assert$3(client[kRunning$3] === 0 && client[kKeepAliveTimeoutValue]);
    util$9.destroy(socket, new InformationalError('socket idle timeout'));
  }
}

function onSocketReadable () {
  const { [kParser]: parser } = this;
  parser.readMore();
}

function onSocketError (err) {
  const { [kParser]: parser } = this;

  assert$3(err.code !== 'ERR_TLS_CERT_ALTNAME_INVALID');

  // On Mac OS, we get an ECONNRESET even if there is a full body to be forwarded
  // to the user.
  if (err.code === 'ECONNRESET' && parser.statusCode && !parser.shouldKeepAlive) {
    // We treat all incoming data so for as a valid response.
    parser.finish();
    return
  }

  this[kError] = err;

  onError(this[kClient], err);
}

function onError (client, err) {
  if (
    client[kRunning$3] === 0 &&
    err.code !== 'UND_ERR_INFO' &&
    err.code !== 'UND_ERR_SOCKET'
  ) {
    // Error is not caused by running request and not a recoverable
    // socket error.

    assert$3(client[kPendingIdx] === client[kRunningIdx]);

    const requests = client[kQueue$1].splice(client[kRunningIdx]);
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      errorRequest(client, request, err);
    }
    assert$3(client[kSize$4] === 0);
  }
}

function onSocketEnd () {
  const { [kParser]: parser } = this;

  if (parser.statusCode && !parser.shouldKeepAlive) {
    // We treat all incoming data so far as a valid response.
    parser.finish();
    return
  }

  util$9.destroy(this, new SocketError$2('other side closed', util$9.getSocketInfo(this)));
}

function onSocketClose () {
  const { [kClient]: client } = this;

  this[kParser].destroy();
  this[kParser] = null;

  const err = this[kError] || new SocketError$2('closed', util$9.getSocketInfo(this));

  client[kSocket] = null;

  if (client.destroyed) {
    assert$3(client[kPending$2] === 0);

    // Fail entire queue.
    const requests = client[kQueue$1].splice(client[kRunningIdx]);
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      errorRequest(client, request, err);
    }
  } else if (client[kRunning$3] > 0 && err.code !== 'UND_ERR_INFO') {
    // Fail head of pipeline.
    const request = client[kQueue$1][client[kRunningIdx]];
    client[kQueue$1][client[kRunningIdx]++] = null;

    errorRequest(client, request, err);
  }

  client[kPendingIdx] = client[kRunningIdx];

  assert$3(client[kRunning$3] === 0);

  client.emit('disconnect', client[kUrl$2], [client], err);

  resume(client);
}

async function connect$1 (client) {
  assert$3(!client[kConnecting]);
  assert$3(!client[kSocket]);

  let { host, hostname, protocol, port } = client[kUrl$2];

  // Resolve ipv6
  if (hostname[0] === '[') {
    const idx = hostname.indexOf(']');

    assert$3(idx !== -1);
    const ip = hostname.substr(1, idx - 1);

    assert$3(net.isIP(ip));
    hostname = ip;
  }

  client[kConnecting] = true;

  if (channels.beforeConnect.hasSubscribers) {
    channels.beforeConnect.publish({
      connectParams: {
        host,
        hostname,
        protocol,
        port,
        servername: client[kServerName]
      },
      connector: client[kConnector]
    });
  }

  try {
    const socket = await new Promise((resolve, reject) => {
      client[kConnector]({
        host,
        hostname,
        protocol,
        port,
        servername: client[kServerName]
      }, (err, socket) => {
        if (err) {
          reject(err);
        } else {
          resolve(socket);
        }
      });
    });

    if (!llhttpInstance) {
      llhttpInstance = await llhttpPromise;
      llhttpPromise = null;
    }

    client[kConnecting] = false;

    assert$3(socket);

    client[kSocket] = socket;

    socket[kNoRef] = false;
    socket[kWriting] = false;
    socket[kReset] = false;
    socket[kBlocking] = false;
    socket[kError] = null;
    socket[kParser] = new Parser(client, socket, llhttpInstance);
    socket[kClient] = client;
    socket[kCounter] = 0;
    socket[kMaxRequests] = client[kMaxRequests];
    socket
      .on('error', onSocketError)
      .on('readable', onSocketReadable)
      .on('end', onSocketEnd)
      .on('close', onSocketClose);

    if (channels.connected.hasSubscribers) {
      channels.connected.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port,
          servername: client[kServerName]
        },
        connector: client[kConnector],
        socket
      });
    }
    client.emit('connect', client[kUrl$2], [client]);
  } catch (err) {
    client[kConnecting] = false;

    if (channels.connectError.hasSubscribers) {
      channels.connectError.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port,
          servername: client[kServerName]
        },
        connector: client[kConnector],
        error: err
      });
    }

    if (err.code === 'ERR_TLS_CERT_ALTNAME_INVALID') {
      assert$3(client[kRunning$3] === 0);
      while (client[kPending$2] > 0 && client[kQueue$1][client[kPendingIdx]].servername === client[kServerName]) {
        const request = client[kQueue$1][client[kPendingIdx]++];
        errorRequest(client, request, err);
      }
    } else {
      onError(client, err);
    }

    client.emit('connectionError', client[kUrl$2], [client], err);
  }

  resume(client);
}

function emitDrain (client) {
  client[kNeedDrain$2] = 0;
  client.emit('drain', client[kUrl$2], [client]);
}

function resume (client, sync) {
  if (client[kResuming] === 2) {
    return
  }

  client[kResuming] = 2;

  _resume(client, sync);
  client[kResuming] = 0;

  if (client[kRunningIdx] > 256) {
    client[kQueue$1].splice(0, client[kRunningIdx]);
    client[kPendingIdx] -= client[kRunningIdx];
    client[kRunningIdx] = 0;
  }
}

function _resume (client, sync) {
  while (true) {
    if (client.destroyed) {
      assert$3(client[kPending$2] === 0);
      return
    }

    if (client.closed && !client[kSize$4]) {
      client.destroy();
      return
    }

    const socket = client[kSocket];

    if (socket) {
      if (client[kSize$4] === 0) {
        if (!socket[kNoRef] && socket.unref) {
          socket.unref();
          socket[kNoRef] = true;
        }
      } else if (socket[kNoRef] && socket.ref) {
        socket.ref();
        socket[kNoRef] = false;
      }

      if (client[kSize$4] === 0) {
        if (socket[kParser].timeoutType !== TIMEOUT_IDLE) {
          socket[kParser].setTimeout(client[kKeepAliveTimeoutValue], TIMEOUT_IDLE);
        }
      } else if (client[kRunning$3] > 0 && socket[kParser].statusCode < 200) {
        if (socket[kParser].timeoutType !== TIMEOUT_HEADERS) {
          const request = client[kQueue$1][client[kRunningIdx]];
          const headersTimeout = request.headersTimeout != null
            ? request.headersTimeout
            : client[kHeadersTimeout];
          socket[kParser].setTimeout(headersTimeout, TIMEOUT_HEADERS);
        }
      }
    }

    if (client[kBusy$1]) {
      client[kNeedDrain$2] = 2;
    } else if (client[kNeedDrain$2] === 2) {
      if (sync) {
        client[kNeedDrain$2] = 1;
        process.nextTick(emitDrain, client);
      } else {
        emitDrain(client);
      }
      continue
    }

    if (client[kPending$2] === 0) {
      return
    }

    if (client[kRunning$3] >= (client[kPipelining] || 1)) {
      return
    }

    const request = client[kQueue$1][client[kPendingIdx]];

    if (client[kUrl$2].protocol === 'https:' && client[kServerName] !== request.servername) {
      if (client[kRunning$3] > 0) {
        return
      }

      client[kServerName] = request.servername;

      if (socket && socket.servername !== request.servername) {
        util$9.destroy(socket, new InformationalError('servername changed'));
        return
      }
    }

    if (client[kConnecting]) {
      return
    }

    if (!socket) {
      connect$1(client);
      continue
    }

    if (socket.destroyed || socket[kWriting] || socket[kReset] || socket[kBlocking]) {
      return
    }

    if (client[kRunning$3] > 0 && !request.idempotent) {
      // Non-idempotent request cannot be retried.
      // Ensure that no other requests are inflight and
      // could cause failure.
      return
    }

    if (client[kRunning$3] > 0 && (request.upgrade || request.method === 'CONNECT')) {
      // Don't dispatch an upgrade until all preceding requests have completed.
      // A misbehaving server might upgrade the connection before all pipelined
      // request has completed.
      return
    }

    if (util$9.isStream(request.body) && util$9.bodyLength(request.body) === 0) {
      request.body
        .on('data', /* istanbul ignore next */ function () {
          /* istanbul ignore next */
          assert$3(false);
        })
        .on('error', function (err) {
          errorRequest(client, request, err);
        })
        .on('end', function () {
          util$9.destroy(this);
        });

      request.body = null;
    }

    if (client[kRunning$3] > 0 &&
      (util$9.isStream(request.body) || util$9.isAsyncIterable(request.body))) {
      // Request with stream or iterator body can error while other requests
      // are inflight and indirectly error those as well.
      // Ensure this doesn't happen by waiting for inflight
      // to complete before dispatching.

      // Request with stream or iterator body cannot be retried.
      // Ensure that no other requests are inflight and
      // could cause failure.
      return
    }

    if (!request.aborted && write(client, request)) {
      client[kPendingIdx]++;
    } else {
      client[kQueue$1].splice(client[kPendingIdx], 1);
    }
  }
}

function write (client, request) {
  const { body, method, path, host, upgrade, headers, blocking } = request;

  // https://tools.ietf.org/html/rfc7231#section-4.3.1
  // https://tools.ietf.org/html/rfc7231#section-4.3.2
  // https://tools.ietf.org/html/rfc7231#section-4.3.5

  // Sending a payload body on a request that does not
  // expect it can cause undefined behavior on some
  // servers and corrupt connection state. Do not
  // re-use the connection for further requests.

  const expectsPayload = (
    method === 'PUT' ||
    method === 'POST' ||
    method === 'PATCH'
  );

  if (body && typeof body.read === 'function') {
    // Try to read EOF in order to get length.
    body.read(0);
  }

  let contentLength = util$9.bodyLength(body);

  if (contentLength === null) {
    contentLength = request.contentLength;
  }

  if (contentLength === 0 && !expectsPayload) {
    // https://tools.ietf.org/html/rfc7230#section-3.3.2
    // A user agent SHOULD NOT send a Content-Length header field when
    // the request message does not contain a payload body and the method
    // semantics do not anticipate such a body.

    contentLength = null;
  }

  if (request.contentLength !== null && request.contentLength !== contentLength) {
    if (client[kStrictContentLength]) {
      errorRequest(client, request, new RequestContentLengthMismatchError());
      return false
    }

    process.emitWarning(new RequestContentLengthMismatchError());
  }

  const socket = client[kSocket];

  try {
    request.onConnect((err) => {
      if (request.aborted || request.completed) {
        return
      }

      errorRequest(client, request, err || new RequestAbortedError$7());

      util$9.destroy(socket, new InformationalError('aborted'));
    });
  } catch (err) {
    errorRequest(client, request, err);
  }

  if (request.aborted) {
    return false
  }

  if (method === 'HEAD') {
    // https://github.com/mcollina/undici/issues/258

    // Close after a HEAD request to interop with misbehaving servers
    // that may send a body in the response.

    socket[kReset] = true;
  }

  if (upgrade || method === 'CONNECT') {
    // On CONNECT or upgrade, block pipeline from dispatching further
    // requests on this connection.

    socket[kReset] = true;
  }

  if (client[kMaxRequests] && socket[kCounter]++ >= client[kMaxRequests]) {
    socket[kReset] = true;
  }

  if (blocking) {
    socket[kBlocking] = true;
  }

  let header = `${method} ${path} HTTP/1.1\r\n`;

  if (typeof host === 'string') {
    header += `host: ${host}\r\n`;
  } else {
    header += client[kHostHeader];
  }

  if (upgrade) {
    header += `connection: upgrade\r\nupgrade: ${upgrade}\r\n`;
  } else if (client[kPipelining]) {
    header += 'connection: keep-alive\r\n';
  } else {
    header += 'connection: close\r\n';
  }

  if (headers) {
    header += headers;
  }

  if (channels.sendHeaders.hasSubscribers) {
    channels.sendHeaders.publish({ request, headers: header, socket });
  }

  /* istanbul ignore else: assertion */
  if (!body) {
    if (contentLength === 0) {
      socket.write(`${header}content-length: 0\r\n\r\n`, 'ascii');
    } else {
      assert$3(contentLength === null, 'no body must not have content length');
      socket.write(`${header}\r\n`, 'ascii');
    }
    request.onRequestSent();
  } else if (util$9.isBuffer(body)) {
    assert$3(contentLength === body.byteLength, 'buffer body must have content length');

    socket.cork();
    socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, 'ascii');
    socket.write(body);
    socket.uncork();
    request.onBodySent(body);
    request.onRequestSent();
    if (!expectsPayload) {
      socket[kReset] = true;
    }
  } else if (util$9.isBlobLike(body)) {
    if (typeof body.stream === 'function') {
      writeIterable({ body: body.stream(), client, request, socket, contentLength, header, expectsPayload });
    } else {
      writeBlob({ body, client, request, socket, contentLength, header, expectsPayload });
    }
  } else if (util$9.isStream(body)) {
    writeStream({ body, client, request, socket, contentLength, header, expectsPayload });
  } else if (util$9.isIterable(body)) {
    writeIterable({ body, client, request, socket, contentLength, header, expectsPayload });
  } else {
    assert$3(false);
  }

  return true
}

function writeStream ({ body, client, request, socket, contentLength, header, expectsPayload }) {
  assert$3(contentLength !== 0 || client[kRunning$3] === 0, 'stream body cannot be pipelined');

  let finished = false;

  const writer = new AsyncWriter({ socket, request, contentLength, client, expectsPayload, header });

  const onData = function (chunk) {
    try {
      assert$3(!finished);

      if (!writer.write(chunk) && this.pause) {
        this.pause();
      }
    } catch (err) {
      util$9.destroy(this, err);
    }
  };
  const onDrain = function () {
    assert$3(!finished);

    if (body.resume) {
      body.resume();
    }
  };
  const onAbort = function () {
    onFinished(new RequestAbortedError$7());
  };
  const onFinished = function (err) {
    if (finished) {
      return
    }

    finished = true;

    assert$3(socket.destroyed || (socket[kWriting] && client[kRunning$3] <= 1));

    socket
      .off('drain', onDrain)
      .off('error', onFinished);

    body
      .removeListener('data', onData)
      .removeListener('end', onFinished)
      .removeListener('error', onFinished)
      .removeListener('close', onAbort);

    if (!err) {
      try {
        writer.end();
      } catch (er) {
        err = er;
      }
    }

    writer.destroy(err);

    if (err && (err.code !== 'UND_ERR_INFO' || err.message !== 'reset')) {
      util$9.destroy(body, err);
    } else {
      util$9.destroy(body);
    }
  };

  body
    .on('data', onData)
    .on('end', onFinished)
    .on('error', onFinished)
    .on('close', onAbort);

  if (body.resume) {
    body.resume();
  }

  socket
    .on('drain', onDrain)
    .on('error', onFinished);
}

async function writeBlob ({ body, client, request, socket, contentLength, header, expectsPayload }) {
  assert$3(contentLength === body.size, 'blob body must have content length');

  try {
    if (contentLength != null && contentLength !== body.size) {
      throw new RequestContentLengthMismatchError()
    }

    const buffer = Buffer.from(await body.arrayBuffer());

    socket.cork();
    socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, 'ascii');
    socket.write(buffer);
    socket.uncork();

    request.onBodySent(buffer);
    request.onRequestSent();

    if (!expectsPayload) {
      socket[kReset] = true;
    }

    resume(client);
  } catch (err) {
    util$9.destroy(socket, err);
  }
}

async function writeIterable ({ body, client, request, socket, contentLength, header, expectsPayload }) {
  assert$3(contentLength !== 0 || client[kRunning$3] === 0, 'iterator body cannot be pipelined');

  let callback = null;
  function onDrain () {
    if (callback) {
      const cb = callback;
      callback = null;
      cb();
    }
  }

  const waitForDrain = () => new Promise((resolve, reject) => {
    assert$3(callback === null);

    if (socket[kError]) {
      reject(socket[kError]);
    } else {
      callback = resolve;
    }
  });

  socket
    .on('close', onDrain)
    .on('drain', onDrain);

  const writer = new AsyncWriter({ socket, request, contentLength, client, expectsPayload, header });
  try {
    // It's up to the user to somehow abort the async iterable.
    for await (const chunk of body) {
      if (socket[kError]) {
        throw socket[kError]
      }

      if (!writer.write(chunk)) {
        await waitForDrain();
      }
    }

    writer.end();
  } catch (err) {
    writer.destroy(err);
  } finally {
    socket
      .off('close', onDrain)
      .off('drain', onDrain);
  }
}

class AsyncWriter {
  constructor ({ socket, request, contentLength, client, expectsPayload, header }) {
    this.socket = socket;
    this.request = request;
    this.contentLength = contentLength;
    this.client = client;
    this.bytesWritten = 0;
    this.expectsPayload = expectsPayload;
    this.header = header;

    socket[kWriting] = true;
  }

  write (chunk) {
    const { socket, request, contentLength, client, bytesWritten, expectsPayload, header } = this;

    if (socket[kError]) {
      throw socket[kError]
    }

    if (socket.destroyed) {
      return false
    }

    const len = Buffer.byteLength(chunk);
    if (!len) {
      return true
    }

    // We should defer writing chunks.
    if (contentLength !== null && bytesWritten + len > contentLength) {
      if (client[kStrictContentLength]) {
        throw new RequestContentLengthMismatchError()
      }

      process.emitWarning(new RequestContentLengthMismatchError());
    }

    if (bytesWritten === 0) {
      if (!expectsPayload) {
        socket[kReset] = true;
      }

      if (contentLength === null) {
        socket.write(`${header}transfer-encoding: chunked\r\n`, 'ascii');
      } else {
        socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, 'ascii');
      }
    }

    if (contentLength === null) {
      socket.write(`\r\n${len.toString(16)}\r\n`, 'ascii');
    }

    this.bytesWritten += len;

    const ret = socket.write(chunk);
    request.onBodySent(chunk);
    return ret
  }

  end () {
    const { socket, contentLength, client, bytesWritten, expectsPayload, header, request } = this;
    request.onRequestSent();

    socket[kWriting] = false;

    if (socket[kError]) {
      throw socket[kError]
    }

    if (socket.destroyed) {
      return
    }

    if (bytesWritten === 0) {
      if (expectsPayload) {
        // https://tools.ietf.org/html/rfc7230#section-3.3.2
        // A user agent SHOULD send a Content-Length in a request message when
        // no Transfer-Encoding is sent and the request method defines a meaning
        // for an enclosed payload body.

        socket.write(`${header}content-length: 0\r\n\r\n`, 'ascii');
      } else {
        socket.write(`${header}\r\n`, 'ascii');
      }
    } else if (contentLength === null) {
      socket.write('\r\n0\r\n\r\n', 'ascii');
    }

    if (contentLength !== null && bytesWritten !== contentLength) {
      if (client[kStrictContentLength]) {
        throw new RequestContentLengthMismatchError()
      } else {
        process.emitWarning(new RequestContentLengthMismatchError());
      }
    }

    if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
      // istanbul ignore else: only for jest
      if (socket[kParser].timeout.refresh) {
        socket[kParser].timeout.refresh();
      }
    }

    resume(client);
  }

  destroy (err) {
    const { socket, client } = this;

    socket[kWriting] = false;

    if (err) {
      assert$3(client[kRunning$3] <= 1, 'pipeline should only contain this request');
      util$9.destroy(socket, err);
    }
  }
}

function errorRequest (client, request, err) {
  try {
    request.onError(err);
    assert$3(request.aborted);
  } catch (err) {
    client.emit('error', err);
  }
}

var client = Client$2;

/* eslint-disable */

// Extracted from node/lib/internal/fixed_queue.js

// Currently optimal queue size, tested on V8 6.0 - 6.6. Must be power of two.
const kSize$3 = 2048;
const kMask = kSize$3 - 1;

// The FixedQueue is implemented as a singly-linked list of fixed-size
// circular buffers. It looks something like this:
//
//  head                                                       tail
//    |                                                          |
//    v                                                          v
// +-----------+ <-----\       +-----------+ <------\         +-----------+
// |  [null]   |        \----- |   next    |         \------- |   next    |
// +-----------+               +-----------+                  +-----------+
// |   item    | <-- bottom    |   item    | <-- bottom       |  [empty]  |
// |   item    |               |   item    |                  |  [empty]  |
// |   item    |               |   item    |                  |  [empty]  |
// |   item    |               |   item    |                  |  [empty]  |
// |   item    |               |   item    |       bottom --> |   item    |
// |   item    |               |   item    |                  |   item    |
// |    ...    |               |    ...    |                  |    ...    |
// |   item    |               |   item    |                  |   item    |
// |   item    |               |   item    |                  |   item    |
// |  [empty]  | <-- top       |   item    |                  |   item    |
// |  [empty]  |               |   item    |                  |   item    |
// |  [empty]  |               |  [empty]  | <-- top  top --> |  [empty]  |
// +-----------+               +-----------+                  +-----------+
//
// Or, if there is only one circular buffer, it looks something
// like either of these:
//
//  head   tail                                 head   tail
//    |     |                                     |     |
//    v     v                                     v     v
// +-----------+                               +-----------+
// |  [null]   |                               |  [null]   |
// +-----------+                               +-----------+
// |  [empty]  |                               |   item    |
// |  [empty]  |                               |   item    |
// |   item    | <-- bottom            top --> |  [empty]  |
// |   item    |                               |  [empty]  |
// |  [empty]  | <-- top            bottom --> |   item    |
// |  [empty]  |                               |   item    |
// +-----------+                               +-----------+
//
// Adding a value means moving `top` forward by one, removing means
// moving `bottom` forward by one. After reaching the end, the queue
// wraps around.
//
// When `top === bottom` the current queue is empty and when
// `top + 1 === bottom` it's full. This wastes a single space of storage
// but allows much quicker checks.

class FixedCircularBuffer {
  constructor() {
    this.bottom = 0;
    this.top = 0;
    this.list = new Array(kSize$3);
    this.next = null;
  }

  isEmpty() {
    return this.top === this.bottom;
  }

  isFull() {
    return ((this.top + 1) & kMask) === this.bottom;
  }

  push(data) {
    this.list[this.top] = data;
    this.top = (this.top + 1) & kMask;
  }

  shift() {
    const nextItem = this.list[this.bottom];
    if (nextItem === undefined)
      return null;
    this.list[this.bottom] = undefined;
    this.bottom = (this.bottom + 1) & kMask;
    return nextItem;
  }
}

var fixedQueue = class FixedQueue {
  constructor() {
    this.head = this.tail = new FixedCircularBuffer();
  }

  isEmpty() {
    return this.head.isEmpty();
  }

  push(data) {
    if (this.head.isFull()) {
      // Head is full: Creates a new queue, sets the old queue's `.next` to it,
      // and sets it as the new main queue.
      this.head = this.head.next = new FixedCircularBuffer();
    }
    this.head.push(data);
  }

  shift() {
    const tail = this.tail;
    const next = tail.shift();
    if (tail.isEmpty() && tail.next !== null) {
      // If there is another queue, it forms the new tail.
      this.tail = tail.next;
    }
    return next;
  }
};

const { kFree: kFree$1, kConnected: kConnected$2, kPending: kPending$1, kQueued: kQueued$1, kRunning: kRunning$2, kSize: kSize$2 } = symbols$1;
const kPool = Symbol('pool');

class PoolStats$1 {
  constructor (pool) {
    this[kPool] = pool;
  }

  get connected () {
    return this[kPool][kConnected$2]
  }

  get free () {
    return this[kPool][kFree$1]
  }

  get pending () {
    return this[kPool][kPending$1]
  }

  get queued () {
    return this[kPool][kQueued$1]
  }

  get running () {
    return this[kPool][kRunning$2]
  }

  get size () {
    return this[kPool][kSize$2]
  }
}

var poolStats = PoolStats$1;

const DispatcherBase$1 = dispatcherBase;
const FixedQueue = fixedQueue;
const { kConnected: kConnected$1, kSize: kSize$1, kRunning: kRunning$1, kPending, kQueued, kBusy, kFree, kUrl: kUrl$1, kClose: kClose$1, kDestroy: kDestroy$1, kDispatch: kDispatch$1 } = symbols$1;
const PoolStats = poolStats;

const kClients$2 = Symbol('clients');
const kNeedDrain$1 = Symbol('needDrain');
const kQueue = Symbol('queue');
const kClosedResolve = Symbol('closed resolve');
const kOnDrain$1 = Symbol('onDrain');
const kOnConnect$1 = Symbol('onConnect');
const kOnDisconnect$1 = Symbol('onDisconnect');
const kOnConnectionError$1 = Symbol('onConnectionError');
const kGetDispatcher$1 = Symbol('get dispatcher');
const kAddClient$1 = Symbol('add client');
const kRemoveClient = Symbol('remove client');
const kStats = Symbol('stats');

class PoolBase$1 extends DispatcherBase$1 {
  constructor () {
    super();

    this[kQueue] = new FixedQueue();
    this[kClients$2] = [];
    this[kQueued] = 0;

    const pool = this;

    this[kOnDrain$1] = function onDrain (origin, targets) {
      const queue = pool[kQueue];

      let needDrain = false;

      while (!needDrain) {
        const item = queue.shift();
        if (!item) {
          break
        }
        pool[kQueued]--;
        needDrain = !this.dispatch(item.opts, item.handler);
      }

      this[kNeedDrain$1] = needDrain;

      if (!this[kNeedDrain$1] && pool[kNeedDrain$1]) {
        pool[kNeedDrain$1] = false;
        pool.emit('drain', origin, [pool, ...targets]);
      }

      if (pool[kClosedResolve] && queue.isEmpty()) {
        Promise
          .all(pool[kClients$2].map(c => c.close()))
          .then(pool[kClosedResolve]);
      }
    };

    this[kOnConnect$1] = (origin, targets) => {
      pool.emit('connect', origin, [pool, ...targets]);
    };

    this[kOnDisconnect$1] = (origin, targets, err) => {
      pool.emit('disconnect', origin, [pool, ...targets], err);
    };

    this[kOnConnectionError$1] = (origin, targets, err) => {
      pool.emit('connectionError', origin, [pool, ...targets], err);
    };

    this[kStats] = new PoolStats(this);
  }

  get [kBusy] () {
    return this[kNeedDrain$1]
  }

  get [kConnected$1] () {
    return this[kClients$2].filter(client => client[kConnected$1]).length
  }

  get [kFree] () {
    return this[kClients$2].filter(client => client[kConnected$1] && !client[kNeedDrain$1]).length
  }

  get [kPending] () {
    let ret = this[kQueued];
    for (const { [kPending]: pending } of this[kClients$2]) {
      ret += pending;
    }
    return ret
  }

  get [kRunning$1] () {
    let ret = 0;
    for (const { [kRunning$1]: running } of this[kClients$2]) {
      ret += running;
    }
    return ret
  }

  get [kSize$1] () {
    let ret = this[kQueued];
    for (const { [kSize$1]: size } of this[kClients$2]) {
      ret += size;
    }
    return ret
  }

  get stats () {
    return this[kStats]
  }

  async [kClose$1] () {
    if (this[kQueue].isEmpty()) {
      return Promise.all(this[kClients$2].map(c => c.close()))
    } else {
      return new Promise((resolve) => {
        this[kClosedResolve] = resolve;
      })
    }
  }

  async [kDestroy$1] (err) {
    while (true) {
      const item = this[kQueue].shift();
      if (!item) {
        break
      }
      item.handler.onError(err);
    }

    return Promise.all(this[kClients$2].map(c => c.destroy(err)))
  }

  [kDispatch$1] (opts, handler) {
    const dispatcher = this[kGetDispatcher$1]();

    if (!dispatcher) {
      this[kNeedDrain$1] = true;
      this[kQueue].push({ opts, handler });
      this[kQueued]++;
    } else if (!dispatcher.dispatch(opts, handler)) {
      dispatcher[kNeedDrain$1] = true;
      this[kNeedDrain$1] = !this[kGetDispatcher$1]();
    }

    return !this[kNeedDrain$1]
  }

  [kAddClient$1] (client) {
    client
      .on('drain', this[kOnDrain$1])
      .on('connect', this[kOnConnect$1])
      .on('disconnect', this[kOnDisconnect$1])
      .on('connectionError', this[kOnConnectionError$1]);

    this[kClients$2].push(client);

    if (this[kNeedDrain$1]) {
      process.nextTick(() => {
        if (this[kNeedDrain$1]) {
          this[kOnDrain$1](client[kUrl$1], [this, client]);
        }
      });
    }

    return this
  }

  [kRemoveClient] (client) {
    client.close(() => {
      const idx = this[kClients$2].indexOf(client);
      if (idx !== -1) {
        this[kClients$2].splice(idx, 1);
      }
    });

    this[kNeedDrain$1] = this[kClients$2].some(dispatcher => (
      !dispatcher[kNeedDrain$1] &&
      dispatcher.closed !== true &&
      dispatcher.destroyed !== true
    ));
  }
}

var poolBase = {
  PoolBase: PoolBase$1,
  kClients: kClients$2,
  kNeedDrain: kNeedDrain$1,
  kAddClient: kAddClient$1,
  kRemoveClient,
  kGetDispatcher: kGetDispatcher$1
};

const {
  PoolBase,
  kClients: kClients$1,
  kNeedDrain,
  kAddClient,
  kGetDispatcher
} = poolBase;
const Client$1 = client;
const {
  InvalidArgumentError: InvalidArgumentError$8
} = errors$1;
const util$8 = util$e;
const { kUrl } = symbols$1;
const buildConnector = connect$2;

const kOptions$1 = Symbol('options');
const kConnections = Symbol('connections');
const kFactory$1 = Symbol('factory');

function defaultFactory$1 (origin, opts) {
  return new Client$1(origin, opts)
}

class Pool$1 extends PoolBase {
  constructor (origin, {
    connections,
    factory = defaultFactory$1,
    connect,
    connectTimeout,
    tls,
    maxCachedSessions,
    socketPath,
    ...options
  } = {}) {
    super();

    if (connections != null && (!Number.isFinite(connections) || connections < 0)) {
      throw new InvalidArgumentError$8('invalid connections')
    }

    if (typeof factory !== 'function') {
      throw new InvalidArgumentError$8('factory must be a function.')
    }

    if (connect != null && typeof connect !== 'function' && typeof connect !== 'object') {
      throw new InvalidArgumentError$8('connect must be a function or an object')
    }

    if (typeof connect !== 'function') {
      connect = buildConnector({
        ...tls,
        maxCachedSessions,
        socketPath,
        timeout: connectTimeout == null ? 10e3 : connectTimeout,
        ...connect
      });
    }

    this[kConnections] = connections || null;
    this[kUrl] = util$8.parseOrigin(origin);
    this[kOptions$1] = { ...util$8.deepClone(options), connect };
    this[kFactory$1] = factory;
  }

  [kGetDispatcher] () {
    let dispatcher = this[kClients$1].find(dispatcher => !dispatcher[kNeedDrain]);

    if (dispatcher) {
      return dispatcher
    }

    if (!this[kConnections] || this[kClients$1].length < this[kConnections]) {
      dispatcher = this[kFactory$1](this[kUrl], this[kOptions$1]);
      this[kAddClient](dispatcher);
    }

    return dispatcher
  }
}

var pool = Pool$1;

/* istanbul ignore file: only for Node 12 */

const { kConnected, kSize } = symbols$1;

class CompatWeakRef {
  constructor (value) {
    this.value = value;
  }

  deref () {
    return this.value[kConnected] === 0 && this.value[kSize] === 0
      ? undefined
      : this.value
  }
}

class CompatFinalizer {
  constructor (finalizer) {
    this.finalizer = finalizer;
  }

  register (dispatcher, key) {
    dispatcher.on('disconnect', () => {
      if (dispatcher[kConnected] === 0 && dispatcher[kSize] === 0) {
        this.finalizer(key);
      }
    });
  }
}

var dispatcherWeakref = function () {
  return {
    WeakRef: commonjsGlobal.WeakRef || CompatWeakRef,
    FinalizationRegistry: commonjsGlobal.FinalizationRegistry || CompatFinalizer
  }
};

const { InvalidArgumentError: InvalidArgumentError$7 } = errors$1;
const { kClients, kRunning, kClose, kDestroy, kDispatch } = symbols$1;
const DispatcherBase = dispatcherBase;
const Pool = pool;
const Client = client;
const util$7 = util$e;
const RedirectHandler = redirect;
const { WeakRef, FinalizationRegistry: FinalizationRegistry$1 } = dispatcherWeakref();

const kOnConnect = Symbol('onConnect');
const kOnDisconnect = Symbol('onDisconnect');
const kOnConnectionError = Symbol('onConnectionError');
const kMaxRedirections = Symbol('maxRedirections');
const kOnDrain = Symbol('onDrain');
const kFactory = Symbol('factory');
const kFinalizer = Symbol('finalizer');
const kOptions = Symbol('options');

function defaultFactory (origin, opts) {
  return opts && opts.connections === 1
    ? new Client(origin, opts)
    : new Pool(origin, opts)
}

class Agent$1 extends DispatcherBase {
  constructor ({ factory = defaultFactory, maxRedirections = 0, connect, ...options } = {}) {
    super();

    if (typeof factory !== 'function') {
      throw new InvalidArgumentError$7('factory must be a function.')
    }

    if (connect != null && typeof connect !== 'function' && typeof connect !== 'object') {
      throw new InvalidArgumentError$7('connect must be a function or an object')
    }

    if (!Number.isInteger(maxRedirections) || maxRedirections < 0) {
      throw new InvalidArgumentError$7('maxRedirections must be a positive number')
    }

    if (connect && typeof connect !== 'function') {
      connect = { ...connect };
    }

    this[kOptions] = { ...util$7.deepClone(options), connect };
    this[kMaxRedirections] = maxRedirections;
    this[kFactory] = factory;
    this[kClients] = new Map();
    this[kFinalizer] = new FinalizationRegistry$1(/* istanbul ignore next: gc is undeterministic */ key => {
      const ref = this[kClients].get(key);
      if (ref !== undefined && ref.deref() === undefined) {
        this[kClients].delete(key);
      }
    });

    const agent = this;

    this[kOnDrain] = (origin, targets) => {
      agent.emit('drain', origin, [agent, ...targets]);
    };

    this[kOnConnect] = (origin, targets) => {
      agent.emit('connect', origin, [agent, ...targets]);
    };

    this[kOnDisconnect] = (origin, targets, err) => {
      agent.emit('disconnect', origin, [agent, ...targets], err);
    };

    this[kOnConnectionError] = (origin, targets, err) => {
      agent.emit('connectionError', origin, [agent, ...targets], err);
    };
  }

  get [kRunning] () {
    let ret = 0;
    for (const ref of this[kClients].values()) {
      const client = ref.deref();
      /* istanbul ignore next: gc is undeterministic */
      if (client) {
        ret += client[kRunning];
      }
    }
    return ret
  }

  [kDispatch] (opts, handler) {
    let key;
    if (opts.origin && (typeof opts.origin === 'string' || opts.origin instanceof URL)) {
      key = String(opts.origin);
    } else {
      throw new InvalidArgumentError$7('opts.origin must be a non-empty string or URL.')
    }

    const ref = this[kClients].get(key);

    let dispatcher = ref ? ref.deref() : null;
    if (!dispatcher) {
      dispatcher = this[kFactory](opts.origin, this[kOptions])
        .on('drain', this[kOnDrain])
        .on('connect', this[kOnConnect])
        .on('disconnect', this[kOnDisconnect])
        .on('connectionError', this[kOnConnectionError]);

      this[kClients].set(key, new WeakRef(dispatcher));
      this[kFinalizer].register(dispatcher, key);
    }

    const { maxRedirections = this[kMaxRedirections] } = opts;
    if (maxRedirections != null && maxRedirections !== 0) {
      opts = { ...opts, maxRedirections: 0 }; // Stop sub dispatcher from also redirecting.
      handler = new RedirectHandler(this, maxRedirections, opts, handler);
    }

    return dispatcher.dispatch(opts, handler)
  }

  async [kClose] () {
    const closePromises = [];
    for (const ref of this[kClients].values()) {
      const client = ref.deref();
      /* istanbul ignore else: gc is undeterministic */
      if (client) {
        closePromises.push(client.close());
      }
    }

    await Promise.all(closePromises);
  }

  async [kDestroy] (err) {
    const destroyPromises = [];
    for (const ref of this[kClients].values()) {
      const client = ref.deref();
      /* istanbul ignore else: gc is undeterministic */
      if (client) {
        destroyPromises.push(client.destroy(err));
      }
    }

    await Promise.all(destroyPromises);
  }
}

var agent = Agent$1;

var api$1 = {};

const assert$2 = require$$0$1;
const { Readable: Readable$2 } = require$$0$2;
const { RequestAbortedError: RequestAbortedError$6, NotSupportedError } = errors$1;
const util$6 = util$e;
const { ReadableStreamFrom, toUSVString } = util$e;

let Blob$1;

const kConsume = Symbol('kConsume');
const kReading = Symbol('kReading');
const kBody = Symbol('kBody');
const kAbort = Symbol('abort');
const kContentType = Symbol('kContentType');

var readable = class BodyReadable extends Readable$2 {
  constructor (resume, abort, contentType = '') {
    super({
      autoDestroy: true,
      read: resume,
      highWaterMark: 64 * 1024 // Same as nodejs fs streams.
    });

    this._readableState.dataEmitted = false;

    this[kAbort] = abort;
    this[kConsume] = null;
    this[kBody] = null;
    this[kContentType] = contentType;

    // Is stream being consumed through Readable API?
    // This is an optimization so that we avoid checking
    // for 'data' and 'readable' listeners in the hot path
    // inside push().
    this[kReading] = false;
  }

  destroy (err) {
    if (this.destroyed) {
      // Node < 16
      return this
    }

    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError$6();
    }

    if (err) {
      this[kAbort]();
    }

    return super.destroy(err)
  }

  emit (ev, ...args) {
    if (ev === 'data') {
      // Node < 16.7
      this._readableState.dataEmitted = true;
    } else if (ev === 'error') {
      // Node < 16
      this._readableState.errorEmitted = true;
    }
    return super.emit(ev, ...args)
  }

  on (ev, ...args) {
    if (ev === 'data' || ev === 'readable') {
      this[kReading] = true;
    }
    return super.on(ev, ...args)
  }

  addListener (ev, ...args) {
    return this.on(ev, ...args)
  }

  off (ev, ...args) {
    const ret = super.off(ev, ...args);
    if (ev === 'data' || ev === 'readable') {
      this[kReading] = (
        this.listenerCount('data') > 0 ||
        this.listenerCount('readable') > 0
      );
    }
    return ret
  }

  removeListener (ev, ...args) {
    return this.off(ev, ...args)
  }

  push (chunk) {
    if (this[kConsume] && chunk !== null) {
      consumePush(this[kConsume], chunk);
      return this[kReading] ? super.push(chunk) : true
    }
    return super.push(chunk)
  }

  // https://fetch.spec.whatwg.org/#dom-body-text
  async text () {
    return consume(this, 'text')
  }

  // https://fetch.spec.whatwg.org/#dom-body-json
  async json () {
    return consume(this, 'json')
  }

  // https://fetch.spec.whatwg.org/#dom-body-blob
  async blob () {
    return consume(this, 'blob')
  }

  // https://fetch.spec.whatwg.org/#dom-body-arraybuffer
  async arrayBuffer () {
    return consume(this, 'arrayBuffer')
  }

  // https://fetch.spec.whatwg.org/#dom-body-formdata
  async formData () {
    // TODO: Implement.
    throw new NotSupportedError()
  }

  // https://fetch.spec.whatwg.org/#dom-body-bodyused
  get bodyUsed () {
    return util$6.isDisturbed(this)
  }

  // https://fetch.spec.whatwg.org/#dom-body-body
  get body () {
    if (!this[kBody]) {
      this[kBody] = ReadableStreamFrom(this);
      if (this[kConsume]) {
        // TODO: Is this the best way to force a lock?
        this[kBody].getReader(); // Ensure stream is locked.
        assert$2(this[kBody].locked);
      }
    }
    return this[kBody]
  }

  async dump (opts) {
    let limit = opts && Number.isFinite(opts.limit) ? opts.limit : 262144;
    try {
      for await (const chunk of this) {
        limit -= Buffer.byteLength(chunk);
        if (limit < 0) {
          return
        }
      }
    } catch {
      // Do nothing...
    }
  }
};

// https://streams.spec.whatwg.org/#readablestream-locked
function isLocked (self) {
  // Consume is an implicit lock.
  return (self[kBody] && self[kBody].locked === true) || self[kConsume]
}

// https://fetch.spec.whatwg.org/#body-unusable
function isUnusable (self) {
  return util$6.isDisturbed(self) || isLocked(self)
}

async function consume (stream, type) {
  if (isUnusable(stream)) {
    throw new TypeError('unusable')
  }

  assert$2(!stream[kConsume]);

  return new Promise((resolve, reject) => {
    stream[kConsume] = {
      type,
      stream,
      resolve,
      reject,
      length: 0,
      body: []
    };

    stream
      .on('error', function (err) {
        consumeFinish(this[kConsume], err);
      })
      .on('close', function () {
        if (this[kConsume].body !== null) {
          consumeFinish(this[kConsume], new RequestAbortedError$6());
        }
      });

    process.nextTick(consumeStart, stream[kConsume]);
  })
}

function consumeStart (consume) {
  if (consume.body === null) {
    return
  }

  const { _readableState: state } = consume.stream;

  for (const chunk of state.buffer) {
    consumePush(consume, chunk);
  }

  if (state.endEmitted) {
    consumeEnd(this[kConsume]);
  } else {
    consume.stream.on('end', function () {
      consumeEnd(this[kConsume]);
    });
  }

  consume.stream.resume();

  while (consume.stream.read() != null) {
    // Loop
  }
}

function consumeEnd (consume) {
  const { type, body, resolve, stream, length } = consume;

  try {
    if (type === 'text') {
      resolve(toUSVString(Buffer.concat(body)));
    } else if (type === 'json') {
      resolve(JSON.parse(Buffer.concat(body)));
    } else if (type === 'arrayBuffer') {
      const dst = new Uint8Array(length);

      let pos = 0;
      for (const buf of body) {
        dst.set(buf, pos);
        pos += buf.byteLength;
      }

      resolve(dst);
    } else if (type === 'blob') {
      if (!Blob$1) {
        Blob$1 = require('buffer').Blob;
      }
      resolve(new Blob$1(body, { type: stream[kContentType] }));
    }

    consumeFinish(consume);
  } catch (err) {
    stream.destroy(err);
  }
}

function consumePush (consume, chunk) {
  consume.length += chunk.length;
  consume.body.push(chunk);
}

function consumeFinish (consume, err) {
  if (consume.body === null) {
    return
  }

  if (err) {
    consume.reject(err);
  } else {
    consume.resolve();
  }

  consume.type = null;
  consume.stream = null;
  consume.resolve = null;
  consume.reject = null;
  consume.length = 0;
  consume.body = null;
}

const { RequestAbortedError: RequestAbortedError$5 } = errors$1;

const kListener = Symbol('kListener');
const kSignal = Symbol('kSignal');

function abort (self) {
  if (self.abort) {
    self.abort();
  } else {
    self.onError(new RequestAbortedError$5());
  }
}

function addSignal$5 (self, signal) {
  self[kSignal] = null;
  self[kListener] = null;

  if (!signal) {
    return
  }

  if (signal.aborted) {
    abort(self);
    return
  }

  self[kSignal] = signal;
  self[kListener] = () => {
    abort(self);
  };

  if ('addEventListener' in self[kSignal]) {
    self[kSignal].addEventListener('abort', self[kListener]);
  } else {
    self[kSignal].addListener('abort', self[kListener]);
  }
}

function removeSignal$5 (self) {
  if (!self[kSignal]) {
    return
  }

  if ('removeEventListener' in self[kSignal]) {
    self[kSignal].removeEventListener('abort', self[kListener]);
  } else {
    self[kSignal].removeListener('abort', self[kListener]);
  }

  self[kSignal] = null;
  self[kListener] = null;
}

var abortSignal = {
  addSignal: addSignal$5,
  removeSignal: removeSignal$5
};

const Readable$1 = readable;
const {
  InvalidArgumentError: InvalidArgumentError$6,
  RequestAbortedError: RequestAbortedError$4,
  ResponseStatusCodeError
} = errors$1;
const util$5 = util$e;
const { AsyncResource: AsyncResource$4 } = require$$3;
const { addSignal: addSignal$4, removeSignal: removeSignal$4 } = abortSignal;

class RequestHandler extends AsyncResource$4 {
  constructor (opts, callback) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError$6('invalid opts')
    }

    const { signal, method, opaque, body, onInfo, responseHeaders, throwOnError } = opts;

    try {
      if (typeof callback !== 'function') {
        throw new InvalidArgumentError$6('invalid callback')
      }

      if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
        throw new InvalidArgumentError$6('signal must be an EventEmitter or EventTarget')
      }

      if (method === 'CONNECT') {
        throw new InvalidArgumentError$6('invalid method')
      }

      if (onInfo && typeof onInfo !== 'function') {
        throw new InvalidArgumentError$6('invalid onInfo callback')
      }

      super('UNDICI_REQUEST');
    } catch (err) {
      if (util$5.isStream(body)) {
        util$5.destroy(body.on('error', util$5.nop), err);
      }
      throw err
    }

    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.callback = callback;
    this.res = null;
    this.abort = null;
    this.body = body;
    this.trailers = {};
    this.context = null;
    this.onInfo = onInfo || null;
    this.throwOnError = throwOnError;

    if (util$5.isStream(body)) {
      body.on('error', (err) => {
        this.onError(err);
      });
    }

    addSignal$4(this, signal);
  }

  onConnect (abort, context) {
    if (!this.callback) {
      throw new RequestAbortedError$4()
    }

    this.abort = abort;
    this.context = context;
  }

  onHeaders (statusCode, rawHeaders, resume, statusMessage) {
    const { callback, opaque, abort, context } = this;

    if (statusCode < 200) {
      if (this.onInfo) {
        const headers = this.responseHeaders === 'raw' ? util$5.parseRawHeaders(rawHeaders) : util$5.parseHeaders(rawHeaders);
        this.onInfo({ statusCode, headers });
      }
      return
    }

    const parsedHeaders = util$5.parseHeaders(rawHeaders);
    const contentType = parsedHeaders['content-type'];
    const body = new Readable$1(resume, abort, contentType);

    this.callback = null;
    this.res = body;
    const headers = this.responseHeaders === 'raw' ? util$5.parseRawHeaders(rawHeaders) : util$5.parseHeaders(rawHeaders);

    if (callback !== null) {
      if (this.throwOnError && statusCode >= 400) {
        this.runInAsyncScope(getResolveErrorBodyCallback, null,
          { callback, body, contentType, statusCode, statusMessage, headers }
        );
        return
      }

      this.runInAsyncScope(callback, null, null, {
        statusCode,
        headers,
        trailers: this.trailers,
        opaque,
        body,
        context
      });
    }
  }

  onData (chunk) {
    const { res } = this;
    return res.push(chunk)
  }

  onComplete (trailers) {
    const { res } = this;

    removeSignal$4(this);

    util$5.parseHeaders(trailers, this.trailers);

    res.push(null);
  }

  onError (err) {
    const { res, callback, body, opaque } = this;

    removeSignal$4(this);

    if (callback) {
      // TODO: Does this need queueMicrotask?
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }

    if (res) {
      this.res = null;
      // Ensure all queued handlers are invoked before destroying res.
      queueMicrotask(() => {
        util$5.destroy(res, err);
      });
    }

    if (body) {
      this.body = null;
      util$5.destroy(body, err);
    }
  }
}

async function getResolveErrorBodyCallback ({ callback, body, contentType, statusCode, statusMessage, headers }) {
  if (statusCode === 204 || !contentType) {
    body.dump();
    process.nextTick(callback, new ResponseStatusCodeError(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ''}`, statusCode, headers));
    return
  }

  try {
    if (contentType.startsWith('application/json')) {
      const payload = await body.json();
      process.nextTick(callback, new ResponseStatusCodeError(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ''}`, statusCode, headers, payload));
      return
    }

    if (contentType.startsWith('text/')) {
      const payload = await body.text();
      process.nextTick(callback, new ResponseStatusCodeError(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ''}`, statusCode, headers, payload));
      return
    }
  } catch (err) {
    // Process in a fallback if error
  }

  body.dump();
  process.nextTick(callback, new ResponseStatusCodeError(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ''}`, statusCode, headers));
}

function request$1 (opts, callback) {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      request$1.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data)
      });
    })
  }

  try {
    this.dispatch(opts, new RequestHandler(opts, callback));
  } catch (err) {
    if (typeof callback !== 'function') {
      throw err
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}

var apiRequest = request$1;

const { finished } = require$$0$2;
const {
  InvalidArgumentError: InvalidArgumentError$5,
  InvalidReturnValueError: InvalidReturnValueError$1,
  RequestAbortedError: RequestAbortedError$3
} = errors$1;
const util$4 = util$e;
const { AsyncResource: AsyncResource$3 } = require$$3;
const { addSignal: addSignal$3, removeSignal: removeSignal$3 } = abortSignal;

class StreamHandler extends AsyncResource$3 {
  constructor (opts, factory, callback) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError$5('invalid opts')
    }

    const { signal, method, opaque, body, onInfo, responseHeaders } = opts;

    try {
      if (typeof callback !== 'function') {
        throw new InvalidArgumentError$5('invalid callback')
      }

      if (typeof factory !== 'function') {
        throw new InvalidArgumentError$5('invalid factory')
      }

      if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
        throw new InvalidArgumentError$5('signal must be an EventEmitter or EventTarget')
      }

      if (method === 'CONNECT') {
        throw new InvalidArgumentError$5('invalid method')
      }

      if (onInfo && typeof onInfo !== 'function') {
        throw new InvalidArgumentError$5('invalid onInfo callback')
      }

      super('UNDICI_STREAM');
    } catch (err) {
      if (util$4.isStream(body)) {
        util$4.destroy(body.on('error', util$4.nop), err);
      }
      throw err
    }

    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.factory = factory;
    this.callback = callback;
    this.res = null;
    this.abort = null;
    this.context = null;
    this.trailers = null;
    this.body = body;
    this.onInfo = onInfo || null;

    if (util$4.isStream(body)) {
      body.on('error', (err) => {
        this.onError(err);
      });
    }

    addSignal$3(this, signal);
  }

  onConnect (abort, context) {
    if (!this.callback) {
      throw new RequestAbortedError$3()
    }

    this.abort = abort;
    this.context = context;
  }

  onHeaders (statusCode, rawHeaders, resume) {
    const { factory, opaque, context } = this;

    if (statusCode < 200) {
      if (this.onInfo) {
        const headers = this.responseHeaders === 'raw' ? util$4.parseRawHeaders(rawHeaders) : util$4.parseHeaders(rawHeaders);
        this.onInfo({ statusCode, headers });
      }
      return
    }

    this.factory = null;
    const headers = this.responseHeaders === 'raw' ? util$4.parseRawHeaders(rawHeaders) : util$4.parseHeaders(rawHeaders);
    const res = this.runInAsyncScope(factory, null, {
      statusCode,
      headers,
      opaque,
      context
    });

    if (
      !res ||
      typeof res.write !== 'function' ||
      typeof res.end !== 'function' ||
      typeof res.on !== 'function'
    ) {
      throw new InvalidReturnValueError$1('expected Writable')
    }

    res.on('drain', resume);
    // TODO: Avoid finished. It registers an unecessary amount of listeners.
    finished(res, { readable: false }, (err) => {
      const { callback, res, opaque, trailers, abort } = this;

      this.res = null;
      if (err || !res.readable) {
        util$4.destroy(res, err);
      }

      this.callback = null;
      this.runInAsyncScope(callback, null, err || null, { opaque, trailers });

      if (err) {
        abort();
      }
    });

    this.res = res;

    const needDrain = res.writableNeedDrain !== undefined
      ? res.writableNeedDrain
      : res._writableState && res._writableState.needDrain;

    return needDrain !== true
  }

  onData (chunk) {
    const { res } = this;

    return res.write(chunk)
  }

  onComplete (trailers) {
    const { res } = this;

    removeSignal$3(this);

    this.trailers = util$4.parseHeaders(trailers);

    res.end();
  }

  onError (err) {
    const { res, callback, opaque, body } = this;

    removeSignal$3(this);

    this.factory = null;

    if (res) {
      this.res = null;
      util$4.destroy(res, err);
    } else if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }

    if (body) {
      this.body = null;
      util$4.destroy(body, err);
    }
  }
}

function stream (opts, factory, callback) {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      stream.call(this, opts, factory, (err, data) => {
        return err ? reject(err) : resolve(data)
      });
    })
  }

  try {
    this.dispatch(opts, new StreamHandler(opts, factory, callback));
  } catch (err) {
    if (typeof callback !== 'function') {
      throw err
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}

var apiStream = stream;

const {
  Readable,
  Duplex,
  PassThrough
} = require$$0$2;
const {
  InvalidArgumentError: InvalidArgumentError$4,
  InvalidReturnValueError,
  RequestAbortedError: RequestAbortedError$2
} = errors$1;
const util$3 = util$e;
const { AsyncResource: AsyncResource$2 } = require$$3;
const { addSignal: addSignal$2, removeSignal: removeSignal$2 } = abortSignal;
const assert$1 = require$$0$1;

const kResume = Symbol('resume');

class PipelineRequest extends Readable {
  constructor () {
    super({ autoDestroy: true });

    this[kResume] = null;
  }

  _read () {
    const { [kResume]: resume } = this;

    if (resume) {
      this[kResume] = null;
      resume();
    }
  }

  _destroy (err, callback) {
    this._read();

    callback(err);
  }
}

class PipelineResponse extends Readable {
  constructor (resume) {
    super({ autoDestroy: true });
    this[kResume] = resume;
  }

  _read () {
    this[kResume]();
  }

  _destroy (err, callback) {
    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError$2();
    }

    callback(err);
  }
}

class PipelineHandler extends AsyncResource$2 {
  constructor (opts, handler) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError$4('invalid opts')
    }

    if (typeof handler !== 'function') {
      throw new InvalidArgumentError$4('invalid handler')
    }

    const { signal, method, opaque, onInfo, responseHeaders } = opts;

    if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
      throw new InvalidArgumentError$4('signal must be an EventEmitter or EventTarget')
    }

    if (method === 'CONNECT') {
      throw new InvalidArgumentError$4('invalid method')
    }

    if (onInfo && typeof onInfo !== 'function') {
      throw new InvalidArgumentError$4('invalid onInfo callback')
    }

    super('UNDICI_PIPELINE');

    this.opaque = opaque || null;
    this.responseHeaders = responseHeaders || null;
    this.handler = handler;
    this.abort = null;
    this.context = null;
    this.onInfo = onInfo || null;

    this.req = new PipelineRequest().on('error', util$3.nop);

    this.ret = new Duplex({
      readableObjectMode: opts.objectMode,
      autoDestroy: true,
      read: () => {
        const { body } = this;

        if (body && body.resume) {
          body.resume();
        }
      },
      write: (chunk, encoding, callback) => {
        const { req } = this;

        if (req.push(chunk, encoding) || req._readableState.destroyed) {
          callback();
        } else {
          req[kResume] = callback;
        }
      },
      destroy: (err, callback) => {
        const { body, req, res, ret, abort } = this;

        if (!err && !ret._readableState.endEmitted) {
          err = new RequestAbortedError$2();
        }

        if (abort && err) {
          abort();
        }

        util$3.destroy(body, err);
        util$3.destroy(req, err);
        util$3.destroy(res, err);

        removeSignal$2(this);

        callback(err);
      }
    }).on('prefinish', () => {
      const { req } = this;

      // Node < 15 does not call _final in same tick.
      req.push(null);
    });

    this.res = null;

    addSignal$2(this, signal);
  }

  onConnect (abort, context) {
    const { ret, res } = this;

    assert$1(!res, 'pipeline cannot be retried');

    if (ret.destroyed) {
      throw new RequestAbortedError$2()
    }

    this.abort = abort;
    this.context = context;
  }

  onHeaders (statusCode, rawHeaders, resume) {
    const { opaque, handler, context } = this;

    if (statusCode < 200) {
      if (this.onInfo) {
        const headers = this.responseHeaders === 'raw' ? util$3.parseRawHeaders(rawHeaders) : util$3.parseHeaders(rawHeaders);
        this.onInfo({ statusCode, headers });
      }
      return
    }

    this.res = new PipelineResponse(resume);

    let body;
    try {
      this.handler = null;
      const headers = this.responseHeaders === 'raw' ? util$3.parseRawHeaders(rawHeaders) : util$3.parseHeaders(rawHeaders);
      body = this.runInAsyncScope(handler, null, {
        statusCode,
        headers,
        opaque,
        body: this.res,
        context
      });
    } catch (err) {
      this.res.on('error', util$3.nop);
      throw err
    }

    if (!body || typeof body.on !== 'function') {
      throw new InvalidReturnValueError('expected Readable')
    }

    body
      .on('data', (chunk) => {
        const { ret, body } = this;

        if (!ret.push(chunk) && body.pause) {
          body.pause();
        }
      })
      .on('error', (err) => {
        const { ret } = this;

        util$3.destroy(ret, err);
      })
      .on('end', () => {
        const { ret } = this;

        ret.push(null);
      })
      .on('close', () => {
        const { ret } = this;

        if (!ret._readableState.ended) {
          util$3.destroy(ret, new RequestAbortedError$2());
        }
      });

    this.body = body;
  }

  onData (chunk) {
    const { res } = this;
    return res.push(chunk)
  }

  onComplete (trailers) {
    const { res } = this;
    res.push(null);
  }

  onError (err) {
    const { ret } = this;
    this.handler = null;
    util$3.destroy(ret, err);
  }
}

function pipeline (opts, handler) {
  try {
    const pipelineHandler = new PipelineHandler(opts, handler);
    this.dispatch({ ...opts, body: pipelineHandler.req }, pipelineHandler);
    return pipelineHandler.ret
  } catch (err) {
    return new PassThrough().destroy(err)
  }
}

var apiPipeline = pipeline;

const { InvalidArgumentError: InvalidArgumentError$3, RequestAbortedError: RequestAbortedError$1, SocketError: SocketError$1 } = errors$1;
const { AsyncResource: AsyncResource$1 } = require$$3;
const util$2 = util$e;
const { addSignal: addSignal$1, removeSignal: removeSignal$1 } = abortSignal;
const assert = require$$0$1;

class UpgradeHandler extends AsyncResource$1 {
  constructor (opts, callback) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError$3('invalid opts')
    }

    if (typeof callback !== 'function') {
      throw new InvalidArgumentError$3('invalid callback')
    }

    const { signal, opaque, responseHeaders } = opts;

    if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
      throw new InvalidArgumentError$3('signal must be an EventEmitter or EventTarget')
    }

    super('UNDICI_UPGRADE');

    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.callback = callback;
    this.abort = null;
    this.context = null;

    addSignal$1(this, signal);
  }

  onConnect (abort, context) {
    if (!this.callback) {
      throw new RequestAbortedError$1()
    }

    this.abort = abort;
    this.context = null;
  }

  onHeaders () {
    throw new SocketError$1('bad upgrade', null)
  }

  onUpgrade (statusCode, rawHeaders, socket) {
    const { callback, opaque, context } = this;

    assert.strictEqual(statusCode, 101);

    removeSignal$1(this);

    this.callback = null;
    const headers = this.responseHeaders === 'raw' ? util$2.parseRawHeaders(rawHeaders) : util$2.parseHeaders(rawHeaders);
    this.runInAsyncScope(callback, null, null, {
      headers,
      socket,
      opaque,
      context
    });
  }

  onError (err) {
    const { callback, opaque } = this;

    removeSignal$1(this);

    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
  }
}

function upgrade (opts, callback) {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      upgrade.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data)
      });
    })
  }

  try {
    const upgradeHandler = new UpgradeHandler(opts, callback);
    this.dispatch({
      ...opts,
      method: opts.method || 'GET',
      upgrade: opts.protocol || 'Websocket'
    }, upgradeHandler);
  } catch (err) {
    if (typeof callback !== 'function') {
      throw err
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}

var apiUpgrade = upgrade;

const { InvalidArgumentError: InvalidArgumentError$2, RequestAbortedError, SocketError } = errors$1;
const { AsyncResource } = require$$3;
const util$1 = util$e;
const { addSignal, removeSignal } = abortSignal;

class ConnectHandler extends AsyncResource {
  constructor (opts, callback) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError$2('invalid opts')
    }

    if (typeof callback !== 'function') {
      throw new InvalidArgumentError$2('invalid callback')
    }

    const { signal, opaque, responseHeaders } = opts;

    if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
      throw new InvalidArgumentError$2('signal must be an EventEmitter or EventTarget')
    }

    super('UNDICI_CONNECT');

    this.opaque = opaque || null;
    this.responseHeaders = responseHeaders || null;
    this.callback = callback;
    this.abort = null;

    addSignal(this, signal);
  }

  onConnect (abort, context) {
    if (!this.callback) {
      throw new RequestAbortedError()
    }

    this.abort = abort;
    this.context = context;
  }

  onHeaders () {
    throw new SocketError('bad connect', null)
  }

  onUpgrade (statusCode, rawHeaders, socket) {
    const { callback, opaque, context } = this;

    removeSignal(this);

    this.callback = null;
    const headers = this.responseHeaders === 'raw' ? util$1.parseRawHeaders(rawHeaders) : util$1.parseHeaders(rawHeaders);
    this.runInAsyncScope(callback, null, null, {
      statusCode,
      headers,
      socket,
      opaque,
      context
    });
  }

  onError (err) {
    const { callback, opaque } = this;

    removeSignal(this);

    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
  }
}

function connect (opts, callback) {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      connect.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data)
      });
    })
  }

  try {
    const connectHandler = new ConnectHandler(opts, callback);
    this.dispatch({ ...opts, method: 'CONNECT' }, connectHandler);
  } catch (err) {
    if (typeof callback !== 'function') {
      throw err
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}

var apiConnect = connect;

api$1.request = apiRequest;
api$1.stream = apiStream;
api$1.pipeline = apiPipeline;
api$1.upgrade = apiUpgrade;
api$1.connect = apiConnect;

// We include a version number for the Dispatcher API. In case of breaking changes,
// this version number must be increased to avoid conflicts.
const globalDispatcher = Symbol.for('undici.globalDispatcher.1');
const { InvalidArgumentError: InvalidArgumentError$1 } = errors$1;
const Agent = agent;

if (getGlobalDispatcher$1() === undefined) {
  setGlobalDispatcher$1(new Agent());
}

function setGlobalDispatcher$1 (agent) {
  if (!agent || typeof agent.dispatch !== 'function') {
    throw new InvalidArgumentError$1('Argument agent must implement Agent')
  }
  Object.defineProperty(globalThis, globalDispatcher, {
    value: agent,
    writable: true,
    enumerable: false,
    configurable: false
  });
}

function getGlobalDispatcher$1 () {
  return globalThis[globalDispatcher]
}

var global$1 = {
  setGlobalDispatcher: setGlobalDispatcher$1,
  getGlobalDispatcher: getGlobalDispatcher$1
};

var headers;
var hasRequiredHeaders;

function requireHeaders () {
	if (hasRequiredHeaders) return headers;
	hasRequiredHeaders = 1;

	const { kHeadersList } = symbols$1;
	const { kGuard } = requireSymbols();
	const { kEnumerableProperty } = util$e;
	const {
	  makeIterator,
	  isValidHeaderName,
	  isValidHeaderValue
	} = requireUtil();
	const { webidl } = requireWebidl();

	const kHeadersMap = Symbol('headers map');
	const kHeadersSortedMap = Symbol('headers map sorted');

	/**
	 * @see https://fetch.spec.whatwg.org/#concept-header-value-normalize
	 * @param {string} potentialValue
	 */
	function headerValueNormalize (potentialValue) {
	  //  To normalize a byte sequence potentialValue, remove
	  //  any leading and trailing HTTP whitespace bytes from
	  //  potentialValue.
	  return potentialValue.replace(
	    /^[\r\n\t ]+|[\r\n\t ]+$/g,
	    ''
	  )
	}

	function fill (headers, object) {
	  // To fill a Headers object headers with a given object object, run these steps:

	  // 1. If object is a sequence, then for each header in object:
	  // Note: webidl conversion to array has already been done.
	  if (Array.isArray(object)) {
	    for (const header of object) {
	      // 1. If header does not contain exactly two items, then throw a TypeError.
	      if (header.length !== 2) {
	        webidl.errors.exception({
	          header: 'Headers constructor',
	          message: `expected name/value pair to be length 2, found ${header.length}.`
	        });
	      }

	      // 2. Append (header’s first item, header’s second item) to headers.
	      headers.append(header[0], header[1]);
	    }
	  } else if (typeof object === 'object' && object !== null) {
	    // Note: null should throw

	    // 2. Otherwise, object is a record, then for each key → value in object,
	    //    append (key, value) to headers
	    for (const [key, value] of Object.entries(object)) {
	      headers.append(key, value);
	    }
	  } else {
	    webidl.errors.conversionFailed({
	      prefix: 'Headers constructor',
	      argument: 'Argument 1',
	      types: ['sequence<sequence<ByteString>>', 'record<ByteString, ByteString>']
	    });
	  }
	}

	class HeadersList {
	  constructor (init) {
	    if (init instanceof HeadersList) {
	      this[kHeadersMap] = new Map(init[kHeadersMap]);
	      this[kHeadersSortedMap] = init[kHeadersSortedMap];
	    } else {
	      this[kHeadersMap] = new Map(init);
	      this[kHeadersSortedMap] = null;
	    }
	  }

	  // https://fetch.spec.whatwg.org/#header-list-contains
	  contains (name) {
	    // A header list list contains a header name name if list
	    // contains a header whose name is a byte-case-insensitive
	    // match for name.
	    name = name.toLowerCase();

	    return this[kHeadersMap].has(name)
	  }

	  clear () {
	    this[kHeadersMap].clear();
	    this[kHeadersSortedMap] = null;
	  }

	  // https://fetch.spec.whatwg.org/#concept-header-list-append
	  append (name, value) {
	    this[kHeadersSortedMap] = null;

	    // 1. If list contains name, then set name to the first such
	    //    header’s name.
	    name = name.toLowerCase();
	    const exists = this[kHeadersMap].get(name);

	    // 2. Append (name, value) to list.
	    if (exists) {
	      this[kHeadersMap].set(name, `${exists}, ${value}`);
	    } else {
	      this[kHeadersMap].set(name, `${value}`);
	    }
	  }

	  // https://fetch.spec.whatwg.org/#concept-header-list-set
	  set (name, value) {
	    this[kHeadersSortedMap] = null;

	    // 1. If list contains name, then set the value of
	    //    the first such header to value and remove the
	    //    others.
	    // 2. Otherwise, append header (name, value) to list.
	    return this[kHeadersMap].set(name, value)
	  }

	  // https://fetch.spec.whatwg.org/#concept-header-list-delete
	  delete (name) {
	    this[kHeadersSortedMap] = null;

	    name = name.toLowerCase();
	    return this[kHeadersMap].delete(name)
	  }

	  // https://fetch.spec.whatwg.org/#concept-header-list-get
	  get (name) {
	    name = name.toLowerCase();

	    // 1. If list does not contain name, then return null.
	    if (!this.contains(name)) {
	      return null
	    }

	    // 2. Return the values of all headers in list whose name
	    //    is a byte-case-insensitive match for name,
	    //    separated from each other by 0x2C 0x20, in order.
	    return this[kHeadersMap].get(name) ?? null
	  }

	  has (name) {
	    name = name.toLowerCase();
	    return this[kHeadersMap].has(name)
	  }

	  keys () {
	    return this[kHeadersMap].keys()
	  }

	  values () {
	    return this[kHeadersMap].values()
	  }

	  entries () {
	    return this[kHeadersMap].entries()
	  }

	  [Symbol.iterator] () {
	    return this[kHeadersMap][Symbol.iterator]()
	  }
	}

	// https://fetch.spec.whatwg.org/#headers-class
	class Headers {
	  constructor (init = undefined) {
	    this[kHeadersList] = new HeadersList();

	    // The new Headers(init) constructor steps are:

	    // 1. Set this’s guard to "none".
	    this[kGuard] = 'none';

	    // 2. If init is given, then fill this with init.
	    if (init !== undefined) {
	      init = webidl.converters.HeadersInit(init);
	      fill(this, init);
	    }
	  }

	  get [Symbol.toStringTag] () {
	    return this.constructor.name
	  }

	  // https://fetch.spec.whatwg.org/#dom-headers-append
	  append (name, value) {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 2) {
	      throw new TypeError(
	        `Failed to execute 'append' on 'Headers': 2 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.ByteString(name);
	    value = webidl.converters.ByteString(value);

	    // 1. Normalize value.
	    value = headerValueNormalize(value);

	    // 2. If name is not a header name or value is not a
	    //    header value, then throw a TypeError.
	    if (!isValidHeaderName(name)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.append',
	        value: name,
	        type: 'header name'
	      });
	    } else if (!isValidHeaderValue(value)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.append',
	        value,
	        type: 'header value'
	      });
	    }

	    // 3. If headers’s guard is "immutable", then throw a TypeError.
	    // 4. Otherwise, if headers’s guard is "request" and name is a
	    //    forbidden header name, return.
	    // Note: undici does not implement forbidden header names
	    if (this[kGuard] === 'immutable') {
	      throw new TypeError('immutable')
	    } else if (this[kGuard] === 'request-no-cors') ;

	    // 6. Otherwise, if headers’s guard is "response" and name is a
	    //    forbidden response-header name, return.

	    // 7. Append (name, value) to headers’s header list.
	    // 8. If headers’s guard is "request-no-cors", then remove
	    //    privileged no-CORS request headers from headers
	    return this[kHeadersList].append(name, value)
	  }

	  // https://fetch.spec.whatwg.org/#dom-headers-delete
	  delete (name) {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'delete' on 'Headers': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.ByteString(name);

	    // 1. If name is not a header name, then throw a TypeError.
	    if (!isValidHeaderName(name)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.delete',
	        value: name,
	        type: 'header name'
	      });
	    }

	    // 2. If this’s guard is "immutable", then throw a TypeError.
	    // 3. Otherwise, if this’s guard is "request" and name is a
	    //    forbidden header name, return.
	    // 4. Otherwise, if this’s guard is "request-no-cors", name
	    //    is not a no-CORS-safelisted request-header name, and
	    //    name is not a privileged no-CORS request-header name,
	    //    return.
	    // 5. Otherwise, if this’s guard is "response" and name is
	    //    a forbidden response-header name, return.
	    // Note: undici does not implement forbidden header names
	    if (this[kGuard] === 'immutable') {
	      throw new TypeError('immutable')
	    } else if (this[kGuard] === 'request-no-cors') ;

	    // 6. If this’s header list does not contain name, then
	    //    return.
	    if (!this[kHeadersList].contains(name)) {
	      return
	    }

	    // 7. Delete name from this’s header list.
	    // 8. If this’s guard is "request-no-cors", then remove
	    //    privileged no-CORS request headers from this.
	    return this[kHeadersList].delete(name)
	  }

	  // https://fetch.spec.whatwg.org/#dom-headers-get
	  get (name) {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'get' on 'Headers': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.ByteString(name);

	    // 1. If name is not a header name, then throw a TypeError.
	    if (!isValidHeaderName(name)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.get',
	        value: name,
	        type: 'header name'
	      });
	    }

	    // 2. Return the result of getting name from this’s header
	    //    list.
	    return this[kHeadersList].get(name)
	  }

	  // https://fetch.spec.whatwg.org/#dom-headers-has
	  has (name) {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'has' on 'Headers': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.ByteString(name);

	    // 1. If name is not a header name, then throw a TypeError.
	    if (!isValidHeaderName(name)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.has',
	        value: name,
	        type: 'header name'
	      });
	    }

	    // 2. Return true if this’s header list contains name;
	    //    otherwise false.
	    return this[kHeadersList].contains(name)
	  }

	  // https://fetch.spec.whatwg.org/#dom-headers-set
	  set (name, value) {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 2) {
	      throw new TypeError(
	        `Failed to execute 'set' on 'Headers': 2 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.ByteString(name);
	    value = webidl.converters.ByteString(value);

	    // 1. Normalize value.
	    value = headerValueNormalize(value);

	    // 2. If name is not a header name or value is not a
	    //    header value, then throw a TypeError.
	    if (!isValidHeaderName(name)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.set',
	        value: name,
	        type: 'header name'
	      });
	    } else if (!isValidHeaderValue(value)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.set',
	        value,
	        type: 'header value'
	      });
	    }

	    // 3. If this’s guard is "immutable", then throw a TypeError.
	    // 4. Otherwise, if this’s guard is "request" and name is a
	    //    forbidden header name, return.
	    // 5. Otherwise, if this’s guard is "request-no-cors" and
	    //    name/value is not a no-CORS-safelisted request-header,
	    //    return.
	    // 6. Otherwise, if this’s guard is "response" and name is a
	    //    forbidden response-header name, return.
	    // Note: undici does not implement forbidden header names
	    if (this[kGuard] === 'immutable') {
	      throw new TypeError('immutable')
	    } else if (this[kGuard] === 'request-no-cors') ;

	    // 7. Set (name, value) in this’s header list.
	    // 8. If this’s guard is "request-no-cors", then remove
	    //    privileged no-CORS request headers from this
	    return this[kHeadersList].set(name, value)
	  }

	  get [kHeadersSortedMap] () {
	    this[kHeadersList][kHeadersSortedMap] ??= new Map([...this[kHeadersList]].sort((a, b) => a[0] < b[0] ? -1 : 1));
	    return this[kHeadersList][kHeadersSortedMap]
	  }

	  keys () {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return makeIterator(this[kHeadersSortedMap].keys(), 'Headers')
	  }

	  values () {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return makeIterator(this[kHeadersSortedMap].values(), 'Headers')
	  }

	  entries () {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return makeIterator(this[kHeadersSortedMap].entries(), 'Headers')
	  }

	  /**
	   * @param {(value: string, key: string, self: Headers) => void} callbackFn
	   * @param {unknown} thisArg
	   */
	  forEach (callbackFn, thisArg = globalThis) {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'forEach' on 'Headers': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    if (typeof callbackFn !== 'function') {
	      throw new TypeError(
	        "Failed to execute 'forEach' on 'Headers': parameter 1 is not of type 'Function'."
	      )
	    }

	    for (const [key, value] of this) {
	      callbackFn.apply(thisArg, [value, key, this]);
	    }
	  }

	  [Symbol.for('nodejs.util.inspect.custom')] () {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kHeadersList]
	  }
	}

	Headers.prototype[Symbol.iterator] = Headers.prototype.entries;

	Object.defineProperties(Headers.prototype, {
	  append: kEnumerableProperty,
	  delete: kEnumerableProperty,
	  get: kEnumerableProperty,
	  has: kEnumerableProperty,
	  set: kEnumerableProperty,
	  keys: kEnumerableProperty,
	  values: kEnumerableProperty,
	  entries: kEnumerableProperty,
	  forEach: kEnumerableProperty
	});

	webidl.converters.HeadersInit = function (V) {
	  if (webidl.util.Type(V) === 'Object') {
	    if (V[Symbol.iterator]) {
	      return webidl.converters['sequence<sequence<ByteString>>'](V)
	    }

	    return webidl.converters['record<ByteString, ByteString>'](V)
	  }

	  webidl.errors.conversionFailed({
	    prefix: 'Headers constructor',
	    argument: 'Argument 1',
	    types: ['sequence<sequence<ByteString>>', 'record<ByteString, ByteString>']
	  });
	};

	headers = {
	  fill,
	  Headers,
	  HeadersList
	};
	return headers;
}

var response;
var hasRequiredResponse;

function requireResponse () {
	if (hasRequiredResponse) return response;
	hasRequiredResponse = 1;

	const { Headers, HeadersList, fill } = requireHeaders();
	const { extractBody, cloneBody, mixinBody } = requireBody();
	const util = util$e;
	const { kEnumerableProperty } = util;
	const {
	  responseURL,
	  isValidReasonPhrase,
	  isCancelled,
	  isAborted,
	  isBlobLike,
	  serializeJavascriptValueToJSONString
	} = requireUtil();
	const {
	  redirectStatus,
	  nullBodyStatus,
	  DOMException
	} = requireConstants$1();
	const { kState, kHeaders, kGuard, kRealm } = requireSymbols();
	const { webidl } = requireWebidl();
	const { FormData } = requireFormdata();
	const { kHeadersList } = symbols$1;
	const assert = require$$0$1;
	const { types } = require$$0;

	const ReadableStream = globalThis.ReadableStream || require$$10.ReadableStream;

	// https://fetch.spec.whatwg.org/#response-class
	class Response {
	  // Creates network error Response.
	  static error () {
	    // TODO
	    const relevantRealm = { settingsObject: {} };

	    // The static error() method steps are to return the result of creating a
	    // Response object, given a new network error, "immutable", and this’s
	    // relevant Realm.
	    const responseObject = new Response();
	    responseObject[kState] = makeNetworkError();
	    responseObject[kRealm] = relevantRealm;
	    responseObject[kHeaders][kHeadersList] = responseObject[kState].headersList;
	    responseObject[kHeaders][kGuard] = 'immutable';
	    responseObject[kHeaders][kRealm] = relevantRealm;
	    return responseObject
	  }

	  // https://fetch.spec.whatwg.org/#dom-response-json
	  static json (data, init = {}) {
	    if (arguments.length === 0) {
	      throw new TypeError(
	        'Failed to execute \'json\' on \'Response\': 1 argument required, but 0 present.'
	      )
	    }

	    if (init !== null) {
	      init = webidl.converters.ResponseInit(init);
	    }

	    // 1. Let bytes the result of running serialize a JavaScript value to JSON bytes on data.
	    const bytes = new TextEncoder('utf-8').encode(
	      serializeJavascriptValueToJSONString(data)
	    );

	    // 2. Let body be the result of extracting bytes.
	    const body = extractBody(bytes);

	    // 3. Let responseObject be the result of creating a Response object, given a new response,
	    //    "response", and this’s relevant Realm.
	    const relevantRealm = { settingsObject: {} };
	    const responseObject = new Response();
	    responseObject[kRealm] = relevantRealm;
	    responseObject[kHeaders][kGuard] = 'response';
	    responseObject[kHeaders][kRealm] = relevantRealm;

	    // 4. Perform initialize a response given responseObject, init, and (body, "application/json").
	    initializeResponse(responseObject, init, { body: body[0], type: 'application/json' });

	    // 5. Return responseObject.
	    return responseObject
	  }

	  // Creates a redirect Response that redirects to url with status status.
	  static redirect (url, status = 302) {
	    const relevantRealm = { settingsObject: {} };

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'redirect' on 'Response': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    url = webidl.converters.USVString(url);
	    status = webidl.converters['unsigned short'](status);

	    // 1. Let parsedURL be the result of parsing url with current settings
	    // object’s API base URL.
	    // 2. If parsedURL is failure, then throw a TypeError.
	    // TODO: base-URL?
	    let parsedURL;
	    try {
	      parsedURL = new URL(url);
	    } catch (err) {
	      throw Object.assign(new TypeError('Failed to parse URL from ' + url), {
	        cause: err
	      })
	    }

	    // 3. If status is not a redirect status, then throw a RangeError.
	    if (!redirectStatus.includes(status)) {
	      throw new RangeError('Invalid status code')
	    }

	    // 4. Let responseObject be the result of creating a Response object,
	    // given a new response, "immutable", and this’s relevant Realm.
	    const responseObject = new Response();
	    responseObject[kRealm] = relevantRealm;
	    responseObject[kHeaders][kGuard] = 'immutable';
	    responseObject[kHeaders][kRealm] = relevantRealm;

	    // 5. Set responseObject’s response’s status to status.
	    responseObject[kState].status = status;

	    // 6. Let value be parsedURL, serialized and isomorphic encoded.
	    // TODO: isomorphic encoded?
	    const value = parsedURL.toString();

	    // 7. Append `Location`/value to responseObject’s response’s header list.
	    responseObject[kState].headersList.append('location', value);

	    // 8. Return responseObject.
	    return responseObject
	  }

	  // https://fetch.spec.whatwg.org/#dom-response
	  constructor (body = null, init = {}) {
	    if (body !== null) {
	      body = webidl.converters.BodyInit(body);
	    }

	    init = webidl.converters.ResponseInit(init);

	    // TODO
	    this[kRealm] = { settingsObject: {} };

	    // 1. Set this’s response to a new response.
	    this[kState] = makeResponse({});

	    // 2. Set this’s headers to a new Headers object with this’s relevant
	    // Realm, whose header list is this’s response’s header list and guard
	    // is "response".
	    this[kHeaders] = new Headers();
	    this[kHeaders][kGuard] = 'response';
	    this[kHeaders][kHeadersList] = this[kState].headersList;
	    this[kHeaders][kRealm] = this[kRealm];

	    // 3. Let bodyWithType be null.
	    let bodyWithType = null;

	    // 4. If body is non-null, then set bodyWithType to the result of extracting body.
	    if (body != null) {
	      const [extractedBody, type] = extractBody(body);
	      bodyWithType = { body: extractedBody, type };
	    }

	    // 5. Perform initialize a response given this, init, and bodyWithType.
	    initializeResponse(this, init, bodyWithType);
	  }

	  get [Symbol.toStringTag] () {
	    return this.constructor.name
	  }

	  // Returns response’s type, e.g., "cors".
	  get type () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The type getter steps are to return this’s response’s type.
	    return this[kState].type
	  }

	  // Returns response’s URL, if it has one; otherwise the empty string.
	  get url () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The url getter steps are to return the empty string if this’s
	    // response’s URL is null; otherwise this’s response’s URL,
	    // serialized with exclude fragment set to true.
	    let url = responseURL(this[kState]);

	    if (url == null) {
	      return ''
	    }

	    if (url.hash) {
	      url = new URL(url);
	      url.hash = '';
	    }

	    return url.toString()
	  }

	  // Returns whether response was obtained through a redirect.
	  get redirected () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The redirected getter steps are to return true if this’s response’s URL
	    // list has more than one item; otherwise false.
	    return this[kState].urlList.length > 1
	  }

	  // Returns response’s status.
	  get status () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The status getter steps are to return this’s response’s status.
	    return this[kState].status
	  }

	  // Returns whether response’s status is an ok status.
	  get ok () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The ok getter steps are to return true if this’s response’s status is an
	    // ok status; otherwise false.
	    return this[kState].status >= 200 && this[kState].status <= 299
	  }

	  // Returns response’s status message.
	  get statusText () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The statusText getter steps are to return this’s response’s status
	    // message.
	    return this[kState].statusText
	  }

	  // Returns response’s headers as Headers.
	  get headers () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The headers getter steps are to return this’s headers.
	    return this[kHeaders]
	  }

	  // Returns a clone of response.
	  clone () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // 1. If this is unusable, then throw a TypeError.
	    if (this.bodyUsed || (this.body && this.body.locked)) {
	      webidl.errors.exception({
	        header: 'Response.clone',
	        message: 'Body has already been consumed.'
	      });
	    }

	    // 2. Let clonedResponse be the result of cloning this’s response.
	    const clonedResponse = cloneResponse(this[kState]);

	    // 3. Return the result of creating a Response object, given
	    // clonedResponse, this’s headers’s guard, and this’s relevant Realm.
	    const clonedResponseObject = new Response();
	    clonedResponseObject[kState] = clonedResponse;
	    clonedResponseObject[kRealm] = this[kRealm];
	    clonedResponseObject[kHeaders][kHeadersList] = clonedResponse.headersList;
	    clonedResponseObject[kHeaders][kGuard] = this[kHeaders][kGuard];
	    clonedResponseObject[kHeaders][kRealm] = this[kHeaders][kRealm];

	    return clonedResponseObject
	  }
	}

	mixinBody(Response);

	Object.defineProperties(Response.prototype, {
	  type: kEnumerableProperty,
	  url: kEnumerableProperty,
	  status: kEnumerableProperty,
	  ok: kEnumerableProperty,
	  redirected: kEnumerableProperty,
	  statusText: kEnumerableProperty,
	  headers: kEnumerableProperty,
	  clone: kEnumerableProperty
	});

	// https://fetch.spec.whatwg.org/#concept-response-clone
	function cloneResponse (response) {
	  // To clone a response response, run these steps:

	  // 1. If response is a filtered response, then return a new identical
	  // filtered response whose internal response is a clone of response’s
	  // internal response.
	  if (response.internalResponse) {
	    return filterResponse(
	      cloneResponse(response.internalResponse),
	      response.type
	    )
	  }

	  // 2. Let newResponse be a copy of response, except for its body.
	  const newResponse = makeResponse({ ...response, body: null });

	  // 3. If response’s body is non-null, then set newResponse’s body to the
	  // result of cloning response’s body.
	  if (response.body != null) {
	    newResponse.body = cloneBody(response.body);
	  }

	  // 4. Return newResponse.
	  return newResponse
	}

	function makeResponse (init) {
	  return {
	    aborted: false,
	    rangeRequested: false,
	    timingAllowPassed: false,
	    requestIncludesCredentials: false,
	    type: 'default',
	    status: 200,
	    timingInfo: null,
	    cacheState: '',
	    statusText: '',
	    ...init,
	    headersList: init.headersList
	      ? new HeadersList(init.headersList)
	      : new HeadersList(),
	    urlList: init.urlList ? [...init.urlList] : []
	  }
	}

	function makeNetworkError (reason) {
	  return makeResponse({
	    type: 'error',
	    status: 0,
	    error:
	      reason instanceof Error
	        ? reason
	        : new Error(reason ? String(reason) : reason, {
	          cause: reason instanceof Error ? reason : undefined
	        }),
	    aborted: reason && reason.name === 'AbortError'
	  })
	}

	function makeFilteredResponse (response, state) {
	  state = {
	    internalResponse: response,
	    ...state
	  };

	  return new Proxy(response, {
	    get (target, p) {
	      return p in state ? state[p] : target[p]
	    },
	    set (target, p, value) {
	      assert(!(p in state));
	      target[p] = value;
	      return true
	    }
	  })
	}

	// https://fetch.spec.whatwg.org/#concept-filtered-response
	function filterResponse (response, type) {
	  // Set response to the following filtered response with response as its
	  // internal response, depending on request’s response tainting:
	  if (type === 'basic') {
	    // A basic filtered response is a filtered response whose type is "basic"
	    // and header list excludes any headers in internal response’s header list
	    // whose name is a forbidden response-header name.

	    // Note: undici does not implement forbidden response-header names
	    return makeFilteredResponse(response, {
	      type: 'basic',
	      headersList: response.headersList
	    })
	  } else if (type === 'cors') {
	    // A CORS filtered response is a filtered response whose type is "cors"
	    // and header list excludes any headers in internal response’s header
	    // list whose name is not a CORS-safelisted response-header name, given
	    // internal response’s CORS-exposed header-name list.

	    // Note: undici does not implement CORS-safelisted response-header names
	    return makeFilteredResponse(response, {
	      type: 'cors',
	      headersList: response.headersList
	    })
	  } else if (type === 'opaque') {
	    // An opaque filtered response is a filtered response whose type is
	    // "opaque", URL list is the empty list, status is 0, status message
	    // is the empty byte sequence, header list is empty, and body is null.

	    return makeFilteredResponse(response, {
	      type: 'opaque',
	      urlList: Object.freeze([]),
	      status: 0,
	      statusText: '',
	      body: null
	    })
	  } else if (type === 'opaqueredirect') {
	    // An opaque-redirect filtered response is a filtered response whose type
	    // is "opaqueredirect", status is 0, status message is the empty byte
	    // sequence, header list is empty, and body is null.

	    return makeFilteredResponse(response, {
	      type: 'opaqueredirect',
	      status: 0,
	      statusText: '',
	      headersList: [],
	      body: null
	    })
	  } else {
	    assert(false);
	  }
	}

	// https://fetch.spec.whatwg.org/#appropriate-network-error
	function makeAppropriateNetworkError (fetchParams) {
	  // 1. Assert: fetchParams is canceled.
	  assert(isCancelled(fetchParams));

	  // 2. Return an aborted network error if fetchParams is aborted;
	  // otherwise return a network error.
	  return isAborted(fetchParams)
	    ? makeNetworkError(new DOMException('The operation was aborted.', 'AbortError'))
	    : makeNetworkError(fetchParams.controller.terminated.reason)
	}

	// https://whatpr.org/fetch/1392.html#initialize-a-response
	function initializeResponse (response, init, body) {
	  // 1. If init["status"] is not in the range 200 to 599, inclusive, then
	  //    throw a RangeError.
	  if (init.status !== null && (init.status < 200 || init.status > 599)) {
	    throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.')
	  }

	  // 2. If init["statusText"] does not match the reason-phrase token production,
	  //    then throw a TypeError.
	  if ('statusText' in init && init.statusText != null) {
	    // See, https://datatracker.ietf.org/doc/html/rfc7230#section-3.1.2:
	    //   reason-phrase  = *( HTAB / SP / VCHAR / obs-text )
	    if (!isValidReasonPhrase(String(init.statusText))) {
	      throw new TypeError('Invalid statusText')
	    }
	  }

	  // 3. Set response’s response’s status to init["status"].
	  if ('status' in init && init.status != null) {
	    response[kState].status = init.status;
	  }

	  // 4. Set response’s response’s status message to init["statusText"].
	  if ('statusText' in init && init.statusText != null) {
	    response[kState].statusText = init.statusText;
	  }

	  // 5. If init["headers"] exists, then fill response’s headers with init["headers"].
	  if ('headers' in init && init.headers != null) {
	    fill(response[kState].headersList, init.headers);
	  }

	  // 6. If body was given, then:
	  if (body) {
	    // 1. If response's status is a null body status, then throw a TypeError.
	    if (nullBodyStatus.includes(response.status)) {
	      webidl.errors.exception({
	        header: 'Response constructor',
	        message: 'Invalid response status code.'
	      });
	    }

	    // 2. Set response's body to body's body.
	    response[kState].body = body.body;

	    // 3. If body's type is non-null and response's header list does not contain
	    //    `Content-Type`, then append (`Content-Type`, body's type) to response's header list.
	    if (body.type != null && !response[kState].headersList.has('Content-Type')) {
	      response[kState].headersList.append('content-type', body.type);
	    }
	  }
	}

	webidl.converters.ReadableStream = webidl.interfaceConverter(
	  ReadableStream
	);

	webidl.converters.FormData = webidl.interfaceConverter(
	  FormData
	);

	webidl.converters.URLSearchParams = webidl.interfaceConverter(
	  URLSearchParams
	);

	// https://fetch.spec.whatwg.org/#typedefdef-xmlhttprequestbodyinit
	webidl.converters.XMLHttpRequestBodyInit = function (V) {
	  if (typeof V === 'string') {
	    return webidl.converters.USVString(V)
	  }

	  if (isBlobLike(V)) {
	    return webidl.converters.Blob(V)
	  }

	  if (
	    types.isAnyArrayBuffer(V) ||
	    types.isTypedArray(V) ||
	    types.isDataView(V)
	  ) {
	    return webidl.converters.BufferSource(V)
	  }

	  if (V instanceof FormData) {
	    return webidl.converters.FormData(V)
	  }

	  if (V instanceof URLSearchParams) {
	    return webidl.converters.URLSearchParams(V)
	  }

	  return webidl.converters.DOMString(V)
	};

	// https://fetch.spec.whatwg.org/#bodyinit
	webidl.converters.BodyInit = function (V) {
	  if (V instanceof ReadableStream) {
	    return webidl.converters.ReadableStream(V)
	  }

	  // Note: the spec doesn't include async iterables,
	  // this is an undici extension.
	  if (V?.[Symbol.asyncIterator]) {
	    return V
	  }

	  return webidl.converters.XMLHttpRequestBodyInit(V)
	};

	webidl.converters.ResponseInit = webidl.dictionaryConverter([
	  {
	    key: 'status',
	    converter: webidl.converters['unsigned short'],
	    defaultValue: 200
	  },
	  {
	    key: 'statusText',
	    converter: webidl.converters.ByteString,
	    defaultValue: ''
	  },
	  {
	    key: 'headers',
	    converter: webidl.converters.HeadersInit
	  }
	]);

	response = {
	  makeNetworkError,
	  makeResponse,
	  makeAppropriateNetworkError,
	  filterResponse,
	  Response
	};
	return response;
}

/* globals AbortController */

var request;
var hasRequiredRequest;

function requireRequest () {
	if (hasRequiredRequest) return request;
	hasRequiredRequest = 1;

	const { extractBody, mixinBody, cloneBody } = requireBody();
	const { Headers, fill: fillHeaders, HeadersList } = requireHeaders();
	const util = util$e;
	const {
	  isValidHTTPToken,
	  sameOrigin,
	  normalizeMethod
	} = requireUtil();
	const {
	  forbiddenMethods,
	  corsSafeListedMethods,
	  referrerPolicy,
	  requestRedirect,
	  requestMode,
	  requestCredentials,
	  requestCache
	} = requireConstants$1();
	const { kEnumerableProperty } = util;
	const { kHeaders, kSignal, kState, kGuard, kRealm } = requireSymbols();
	const { webidl } = requireWebidl();
	const { kHeadersList } = symbols$1;
	const assert = require$$0$1;

	let TransformStream;

	const kInit = Symbol('init');

	const requestFinalizer = new FinalizationRegistry(({ signal, abort }) => {
	  signal.removeEventListener('abort', abort);
	});

	// https://fetch.spec.whatwg.org/#request-class
	class Request {
	  // https://fetch.spec.whatwg.org/#dom-request
	  constructor (input, init = {}) {
	    if (input === kInit) {
	      return
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to construct 'Request': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    input = webidl.converters.RequestInfo(input);
	    init = webidl.converters.RequestInit(init);

	    // TODO
	    this[kRealm] = { settingsObject: {} };

	    // 1. Let request be null.
	    let request = null;

	    // 2. Let fallbackMode be null.
	    let fallbackMode = null;

	    // 3. Let baseURL be this’s relevant settings object’s API base URL.
	    const baseUrl = this[kRealm].settingsObject.baseUrl;

	    // 4. Let signal be null.
	    let signal = null;

	    // 5. If input is a string, then:
	    if (typeof input === 'string') {
	      // 1. Let parsedURL be the result of parsing input with baseURL.
	      // 2. If parsedURL is failure, then throw a TypeError.
	      let parsedURL;
	      try {
	        parsedURL = new URL(input, baseUrl);
	      } catch (err) {
	        throw new TypeError('Failed to parse URL from ' + input, { cause: err })
	      }

	      // 3. If parsedURL includes credentials, then throw a TypeError.
	      if (parsedURL.username || parsedURL.password) {
	        throw new TypeError(
	          'Request cannot be constructed from a URL that includes credentials: ' +
	            input
	        )
	      }

	      // 4. Set request to a new request whose URL is parsedURL.
	      request = makeRequest({ urlList: [parsedURL] });

	      // 5. Set fallbackMode to "cors".
	      fallbackMode = 'cors';
	    } else {
	      // 6. Otherwise:

	      // 7. Assert: input is a Request object.
	      assert(input instanceof Request);

	      // 8. Set request to input’s request.
	      request = input[kState];

	      // 9. Set signal to input’s signal.
	      signal = input[kSignal];
	    }

	    // 7. Let origin be this’s relevant settings object’s origin.
	    const origin = this[kRealm].settingsObject.origin;

	    // 8. Let window be "client".
	    let window = 'client';

	    // 9. If request’s window is an environment settings object and its origin
	    // is same origin with origin, then set window to request’s window.
	    if (
	      request.window?.constructor?.name === 'EnvironmentSettingsObject' &&
	      sameOrigin(request.window, origin)
	    ) {
	      window = request.window;
	    }

	    // 10. If init["window"] exists and is non-null, then throw a TypeError.
	    if (init.window !== undefined && init.window != null) {
	      throw new TypeError(`'window' option '${window}' must be null`)
	    }

	    // 11. If init["window"] exists, then set window to "no-window".
	    if (init.window !== undefined) {
	      window = 'no-window';
	    }

	    // 12. Set request to a new request with the following properties:
	    request = makeRequest({
	      // URL request’s URL.
	      // undici implementation note: this is set as the first item in request's urlList in makeRequest
	      // method request’s method.
	      method: request.method,
	      // header list A copy of request’s header list.
	      // undici implementation note: headersList is cloned in makeRequest
	      headersList: request.headersList,
	      // unsafe-request flag Set.
	      unsafeRequest: request.unsafeRequest,
	      // client This’s relevant settings object.
	      client: this[kRealm].settingsObject,
	      // window window.
	      window,
	      // priority request’s priority.
	      priority: request.priority,
	      // origin request’s origin. The propagation of the origin is only significant for navigation requests
	      // being handled by a service worker. In this scenario a request can have an origin that is different
	      // from the current client.
	      origin: request.origin,
	      // referrer request’s referrer.
	      referrer: request.referrer,
	      // referrer policy request’s referrer policy.
	      referrerPolicy: request.referrerPolicy,
	      // mode request’s mode.
	      mode: request.mode,
	      // credentials mode request’s credentials mode.
	      credentials: request.credentials,
	      // cache mode request’s cache mode.
	      cache: request.cache,
	      // redirect mode request’s redirect mode.
	      redirect: request.redirect,
	      // integrity metadata request’s integrity metadata.
	      integrity: request.integrity,
	      // keepalive request’s keepalive.
	      keepalive: request.keepalive,
	      // reload-navigation flag request’s reload-navigation flag.
	      reloadNavigation: request.reloadNavigation,
	      // history-navigation flag request’s history-navigation flag.
	      historyNavigation: request.historyNavigation,
	      // URL list A clone of request’s URL list.
	      urlList: [...request.urlList]
	    });

	    // 13. If init is not empty, then:
	    if (Object.keys(init).length > 0) {
	      // 1. If request’s mode is "navigate", then set it to "same-origin".
	      if (request.mode === 'navigate') {
	        request.mode = 'same-origin';
	      }

	      // 2. Unset request’s reload-navigation flag.
	      request.reloadNavigation = false;

	      // 3. Unset request’s history-navigation flag.
	      request.historyNavigation = false;

	      // 4. Set request’s origin to "client".
	      request.origin = 'client';

	      // 5. Set request’s referrer to "client"
	      request.referrer = 'client';

	      // 6. Set request’s referrer policy to the empty string.
	      request.referrerPolicy = '';

	      // 7. Set request’s URL to request’s current URL.
	      request.url = request.urlList[request.urlList.length - 1];

	      // 8. Set request’s URL list to « request’s URL ».
	      request.urlList = [request.url];
	    }

	    // 14. If init["referrer"] exists, then:
	    if (init.referrer !== undefined) {
	      // 1. Let referrer be init["referrer"].
	      const referrer = init.referrer;

	      // 2. If referrer is the empty string, then set request’s referrer to "no-referrer".
	      if (referrer === '') {
	        request.referrer = 'no-referrer';
	      } else {
	        // 1. Let parsedReferrer be the result of parsing referrer with
	        // baseURL.
	        // 2. If parsedReferrer is failure, then throw a TypeError.
	        let parsedReferrer;
	        try {
	          parsedReferrer = new URL(referrer, baseUrl);
	        } catch (err) {
	          throw new TypeError(`Referrer "${referrer}" is not a valid URL.`, { cause: err })
	        }

	        // 3. If one of the following is true
	        // parsedReferrer’s cannot-be-a-base-URL is true, scheme is "about",
	        // and path contains a single string "client"
	        // parsedReferrer’s origin is not same origin with origin
	        // then set request’s referrer to "client".
	        // TODO

	        // 4. Otherwise, set request’s referrer to parsedReferrer.
	        request.referrer = parsedReferrer;
	      }
	    }

	    // 15. If init["referrerPolicy"] exists, then set request’s referrer policy
	    // to it.
	    if (init.referrerPolicy !== undefined) {
	      request.referrerPolicy = init.referrerPolicy;
	      if (!referrerPolicy.includes(request.referrerPolicy)) {
	        throw new TypeError(
	          `Failed to construct 'Request': The provided value '${request.referrerPolicy}' is not a valid enum value of type ReferrerPolicy.`
	        )
	      }
	    }

	    // 16. Let mode be init["mode"] if it exists, and fallbackMode otherwise.
	    let mode;
	    if (init.mode !== undefined) {
	      mode = init.mode;
	      if (!requestMode.includes(mode)) {
	        throw new TypeError(
	          `Failed to construct 'Request': The provided value '${request.mode}' is not a valid enum value of type RequestMode.`
	        )
	      }
	    } else {
	      mode = fallbackMode;
	    }

	    // 17. If mode is "navigate", then throw a TypeError.
	    if (mode === 'navigate') {
	      webidl.errors.exception({
	        header: 'Request constructor',
	        message: 'invalid request mode navigate.'
	      });
	    }

	    // 18. If mode is non-null, set request’s mode to mode.
	    if (mode != null) {
	      request.mode = mode;
	    }

	    // 19. If init["credentials"] exists, then set request’s credentials mode
	    // to it.
	    if (init.credentials !== undefined) {
	      request.credentials = init.credentials;
	      if (!requestCredentials.includes(request.credentials)) {
	        throw new TypeError(
	          `Failed to construct 'Request': The provided value '${request.credentials}' is not a valid enum value of type RequestCredentials.`
	        )
	      }
	    }

	    // 18. If init["cache"] exists, then set request’s cache mode to it.
	    if (init.cache !== undefined) {
	      request.cache = init.cache;
	      if (!requestCache.includes(request.cache)) {
	        throw new TypeError(
	          `Failed to construct 'Request': The provided value '${request.cache}' is not a valid enum value of type RequestCache.`
	        )
	      }
	    }

	    // 21. If request’s cache mode is "only-if-cached" and request’s mode is
	    // not "same-origin", then throw a TypeError.
	    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
	      throw new TypeError(
	        "'only-if-cached' can be set only with 'same-origin' mode"
	      )
	    }

	    // 22. If init["redirect"] exists, then set request’s redirect mode to it.
	    if (init.redirect !== undefined) {
	      request.redirect = init.redirect;
	      if (!requestRedirect.includes(request.redirect)) {
	        throw new TypeError(
	          `Failed to construct 'Request': The provided value '${request.redirect}' is not a valid enum value of type RequestRedirect.`
	        )
	      }
	    }

	    // 23. If init["integrity"] exists, then set request’s integrity metadata to it.
	    if (init.integrity !== undefined && init.integrity != null) {
	      request.integrity = String(init.integrity);
	    }

	    // 24. If init["keepalive"] exists, then set request’s keepalive to it.
	    if (init.keepalive !== undefined) {
	      request.keepalive = Boolean(init.keepalive);
	    }

	    // 25. If init["method"] exists, then:
	    if (init.method !== undefined) {
	      // 1. Let method be init["method"].
	      let method = init.method;

	      // 2. If method is not a method or method is a forbidden method, then
	      // throw a TypeError.
	      if (!isValidHTTPToken(init.method)) {
	        throw TypeError(`'${init.method}' is not a valid HTTP method.`)
	      }

	      if (forbiddenMethods.indexOf(method.toUpperCase()) !== -1) {
	        throw TypeError(`'${init.method}' HTTP method is unsupported.`)
	      }

	      // 3. Normalize method.
	      method = normalizeMethod(init.method);

	      // 4. Set request’s method to method.
	      request.method = method;
	    }

	    // 26. If init["signal"] exists, then set signal to it.
	    if (init.signal !== undefined) {
	      signal = init.signal;
	    }

	    // 27. Set this’s request to request.
	    this[kState] = request;

	    // 28. Set this’s signal to a new AbortSignal object with this’s relevant
	    // Realm.
	    const ac = new AbortController();
	    this[kSignal] = ac.signal;
	    this[kSignal][kRealm] = this[kRealm];

	    // 29. If signal is not null, then make this’s signal follow signal.
	    if (signal != null) {
	      if (
	        !signal ||
	        typeof signal.aborted !== 'boolean' ||
	        typeof signal.addEventListener !== 'function'
	      ) {
	        throw new TypeError(
	          "Failed to construct 'Request': member signal is not of type AbortSignal."
	        )
	      }

	      if (signal.aborted) {
	        ac.abort();
	      } else {
	        const abort = () => ac.abort();
	        signal.addEventListener('abort', abort, { once: true });
	        requestFinalizer.register(this, { signal, abort });
	      }
	    }

	    // 30. Set this’s headers to a new Headers object with this’s relevant
	    // Realm, whose header list is request’s header list and guard is
	    // "request".
	    this[kHeaders] = new Headers();
	    this[kHeaders][kHeadersList] = request.headersList;
	    this[kHeaders][kGuard] = 'request';
	    this[kHeaders][kRealm] = this[kRealm];

	    // 31. If this’s request’s mode is "no-cors", then:
	    if (mode === 'no-cors') {
	      // 1. If this’s request’s method is not a CORS-safelisted method,
	      // then throw a TypeError.
	      if (!corsSafeListedMethods.includes(request.method)) {
	        throw new TypeError(
	          `'${request.method} is unsupported in no-cors mode.`
	        )
	      }

	      // 2. Set this’s headers’s guard to "request-no-cors".
	      this[kHeaders][kGuard] = 'request-no-cors';
	    }

	    // 32. If init is not empty, then:
	    if (Object.keys(init).length !== 0) {
	      // 1. Let headers be a copy of this’s headers and its associated header
	      // list.
	      let headers = new Headers(this[kHeaders]);

	      // 2. If init["headers"] exists, then set headers to init["headers"].
	      if (init.headers !== undefined) {
	        headers = init.headers;
	      }

	      // 3. Empty this’s headers’s header list.
	      this[kHeaders][kHeadersList].clear();

	      // 4. If headers is a Headers object, then for each header in its header
	      // list, append header’s name/header’s value to this’s headers.
	      if (headers.constructor.name === 'Headers') {
	        for (const [key, val] of headers) {
	          this[kHeaders].append(key, val);
	        }
	      } else {
	        // 5. Otherwise, fill this’s headers with headers.
	        fillHeaders(this[kHeaders], headers);
	      }
	    }

	    // 33. Let inputBody be input’s request’s body if input is a Request
	    // object; otherwise null.
	    const inputBody = input instanceof Request ? input[kState].body : null;

	    // 34. If either init["body"] exists and is non-null or inputBody is
	    // non-null, and request’s method is `GET` or `HEAD`, then throw a
	    // TypeError.
	    if (
	      ((init.body !== undefined && init.body != null) || inputBody != null) &&
	      (request.method === 'GET' || request.method === 'HEAD')
	    ) {
	      throw new TypeError('Request with GET/HEAD method cannot have body.')
	    }

	    // 35. Let initBody be null.
	    let initBody = null;

	    // 36. If init["body"] exists and is non-null, then:
	    if (init.body !== undefined && init.body != null) {
	      // 1. Let Content-Type be null.
	      // 2. Set initBody and Content-Type to the result of extracting
	      // init["body"], with keepalive set to request’s keepalive.
	      const [extractedBody, contentType] = extractBody(
	        init.body,
	        request.keepalive
	      );
	      initBody = extractedBody;

	      // 3, If Content-Type is non-null and this’s headers’s header list does
	      // not contain `Content-Type`, then append `Content-Type`/Content-Type to
	      // this’s headers.
	      if (contentType && !this[kHeaders].has('content-type')) {
	        this[kHeaders].append('content-type', contentType);
	      }
	    }

	    // 37. Let inputOrInitBody be initBody if it is non-null; otherwise
	    // inputBody.
	    const inputOrInitBody = initBody ?? inputBody;

	    // 38. If inputOrInitBody is non-null and inputOrInitBody’s source is
	    // null, then:
	    if (inputOrInitBody != null && inputOrInitBody.source == null) {
	      // 1. If this’s request’s mode is neither "same-origin" nor "cors",
	      // then throw a TypeError.
	      if (request.mode !== 'same-origin' && request.mode !== 'cors') {
	        throw new TypeError(
	          'If request is made from ReadableStream, mode should be "same-origin" or "cors"'
	        )
	      }

	      // 2. Set this’s request’s use-CORS-preflight flag.
	      request.useCORSPreflightFlag = true;
	    }

	    // 39. Let finalBody be inputOrInitBody.
	    let finalBody = inputOrInitBody;

	    // 40. If initBody is null and inputBody is non-null, then:
	    if (initBody == null && inputBody != null) {
	      // 1. If input is unusable, then throw a TypeError.
	      if (util.isDisturbed(inputBody.stream) || inputBody.stream.locked) {
	        throw new TypeError(
	          'Cannot construct a Request with a Request object that has already been used.'
	        )
	      }

	      // 2. Set finalBody to the result of creating a proxy for inputBody.
	      if (!TransformStream) {
	        TransformStream = require$$10.TransformStream;
	      }

	      // https://streams.spec.whatwg.org/#readablestream-create-a-proxy
	      const identityTransform = new TransformStream();
	      inputBody.stream.pipeThrough(identityTransform);
	      finalBody = {
	        source: inputBody.source,
	        length: inputBody.length,
	        stream: identityTransform.readable
	      };
	    }

	    // 41. Set this’s request’s body to finalBody.
	    this[kState].body = finalBody;
	  }

	  get [Symbol.toStringTag] () {
	    return this.constructor.name
	  }

	  // Returns request’s HTTP method, which is "GET" by default.
	  get method () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The method getter steps are to return this’s request’s method.
	    return this[kState].method
	  }

	  // Returns the URL of request as a string.
	  get url () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The url getter steps are to return this’s request’s URL, serialized.
	    return this[kState].url.toString()
	  }

	  // Returns a Headers object consisting of the headers associated with request.
	  // Note that headers added in the network layer by the user agent will not
	  // be accounted for in this object, e.g., the "Host" header.
	  get headers () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The headers getter steps are to return this’s headers.
	    return this[kHeaders]
	  }

	  // Returns the kind of resource requested by request, e.g., "document"
	  // or "script".
	  get destination () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The destination getter are to return this’s request’s destination.
	    return this[kState].destination
	  }

	  // Returns the referrer of request. Its value can be a same-origin URL if
	  // explicitly set in init, the empty string to indicate no referrer, and
	  // "about:client" when defaulting to the global’s default. This is used
	  // during fetching to determine the value of the `Referer` header of the
	  // request being made.
	  get referrer () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // 1. If this’s request’s referrer is "no-referrer", then return the
	    // empty string.
	    if (this[kState].referrer === 'no-referrer') {
	      return ''
	    }

	    // 2. If this’s request’s referrer is "client", then return
	    // "about:client".
	    if (this[kState].referrer === 'client') {
	      return 'about:client'
	    }

	    // Return this’s request’s referrer, serialized.
	    return this[kState].referrer.toString()
	  }

	  // Returns the referrer policy associated with request.
	  // This is used during fetching to compute the value of the request’s
	  // referrer.
	  get referrerPolicy () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The referrerPolicy getter steps are to return this’s request’s referrer policy.
	    return this[kState].referrerPolicy
	  }

	  // Returns the mode associated with request, which is a string indicating
	  // whether the request will use CORS, or will be restricted to same-origin
	  // URLs.
	  get mode () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The mode getter steps are to return this’s request’s mode.
	    return this[kState].mode
	  }

	  // Returns the credentials mode associated with request,
	  // which is a string indicating whether credentials will be sent with the
	  // request always, never, or only when sent to a same-origin URL.
	  get credentials () {
	    // The credentials getter steps are to return this’s request’s credentials mode.
	    return this[kState].credentials
	  }

	  // Returns the cache mode associated with request,
	  // which is a string indicating how the request will
	  // interact with the browser’s cache when fetching.
	  get cache () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The cache getter steps are to return this’s request’s cache mode.
	    return this[kState].cache
	  }

	  // Returns the redirect mode associated with request,
	  // which is a string indicating how redirects for the
	  // request will be handled during fetching. A request
	  // will follow redirects by default.
	  get redirect () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The redirect getter steps are to return this’s request’s redirect mode.
	    return this[kState].redirect
	  }

	  // Returns request’s subresource integrity metadata, which is a
	  // cryptographic hash of the resource being fetched. Its value
	  // consists of multiple hashes separated by whitespace. [SRI]
	  get integrity () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The integrity getter steps are to return this’s request’s integrity
	    // metadata.
	    return this[kState].integrity
	  }

	  // Returns a boolean indicating whether or not request can outlive the
	  // global in which it was created.
	  get keepalive () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The keepalive getter steps are to return this’s request’s keepalive.
	    return this[kState].keepalive
	  }

	  // Returns a boolean indicating whether or not request is for a reload
	  // navigation.
	  get isReloadNavigation () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The isReloadNavigation getter steps are to return true if this’s
	    // request’s reload-navigation flag is set; otherwise false.
	    return this[kState].reloadNavigation
	  }

	  // Returns a boolean indicating whether or not request is for a history
	  // navigation (a.k.a. back-foward navigation).
	  get isHistoryNavigation () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The isHistoryNavigation getter steps are to return true if this’s request’s
	    // history-navigation flag is set; otherwise false.
	    return this[kState].historyNavigation
	  }

	  // Returns the signal associated with request, which is an AbortSignal
	  // object indicating whether or not request has been aborted, and its
	  // abort event handler.
	  get signal () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The signal getter steps are to return this’s signal.
	    return this[kSignal]
	  }

	  // Returns a clone of request.
	  clone () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // 1. If this is unusable, then throw a TypeError.
	    if (this.bodyUsed || this.body?.locked) {
	      throw new TypeError('unusable')
	    }

	    // 2. Let clonedRequest be the result of cloning this’s request.
	    const clonedRequest = cloneRequest(this[kState]);

	    // 3. Let clonedRequestObject be the result of creating a Request object,
	    // given clonedRequest, this’s headers’s guard, and this’s relevant Realm.
	    const clonedRequestObject = new Request(kInit);
	    clonedRequestObject[kState] = clonedRequest;
	    clonedRequestObject[kRealm] = this[kRealm];
	    clonedRequestObject[kHeaders] = new Headers();
	    clonedRequestObject[kHeaders][kHeadersList] = clonedRequest.headersList;
	    clonedRequestObject[kHeaders][kGuard] = this[kHeaders][kGuard];
	    clonedRequestObject[kHeaders][kRealm] = this[kHeaders][kRealm];

	    // 4. Make clonedRequestObject’s signal follow this’s signal.
	    const ac = new AbortController();
	    if (this.signal.aborted) {
	      ac.abort();
	    } else {
	      this.signal.addEventListener(
	        'abort',
	        function () {
	          ac.abort();
	        },
	        { once: true }
	      );
	    }
	    clonedRequestObject[kSignal] = ac.signal;

	    // 4. Return clonedRequestObject.
	    return clonedRequestObject
	  }
	}

	mixinBody(Request);

	function makeRequest (init) {
	  // https://fetch.spec.whatwg.org/#requests
	  const request = {
	    method: 'GET',
	    localURLsOnly: false,
	    unsafeRequest: false,
	    body: null,
	    client: null,
	    reservedClient: null,
	    replacesClientId: '',
	    window: 'client',
	    keepalive: false,
	    serviceWorkers: 'all',
	    initiator: '',
	    destination: '',
	    priority: null,
	    origin: 'client',
	    policyContainer: 'client',
	    referrer: 'client',
	    referrerPolicy: '',
	    mode: 'no-cors',
	    useCORSPreflightFlag: false,
	    credentials: 'same-origin',
	    useCredentials: false,
	    cache: 'default',
	    redirect: 'follow',
	    integrity: '',
	    cryptoGraphicsNonceMetadata: '',
	    parserMetadata: '',
	    reloadNavigation: false,
	    historyNavigation: false,
	    userActivation: false,
	    taintedOrigin: false,
	    redirectCount: 0,
	    responseTainting: 'basic',
	    preventNoCacheCacheControlHeaderModification: false,
	    done: false,
	    timingAllowFailed: false,
	    ...init,
	    headersList: init.headersList
	      ? new HeadersList(init.headersList)
	      : new HeadersList()
	  };
	  request.url = request.urlList[0];
	  return request
	}

	// https://fetch.spec.whatwg.org/#concept-request-clone
	function cloneRequest (request) {
	  // To clone a request request, run these steps:

	  // 1. Let newRequest be a copy of request, except for its body.
	  const newRequest = makeRequest({ ...request, body: null });

	  // 2. If request’s body is non-null, set newRequest’s body to the
	  // result of cloning request’s body.
	  if (request.body != null) {
	    newRequest.body = cloneBody(request.body);
	  }

	  // 3. Return newRequest.
	  return newRequest
	}

	Object.defineProperties(Request.prototype, {
	  method: kEnumerableProperty,
	  url: kEnumerableProperty,
	  headers: kEnumerableProperty,
	  redirect: kEnumerableProperty,
	  clone: kEnumerableProperty,
	  signal: kEnumerableProperty
	});

	webidl.converters.Request = webidl.interfaceConverter(
	  Request
	);

	// https://fetch.spec.whatwg.org/#requestinfo
	webidl.converters.RequestInfo = function (V) {
	  if (typeof V === 'string') {
	    return webidl.converters.USVString(V)
	  }

	  if (V instanceof Request) {
	    return webidl.converters.Request(V)
	  }

	  return webidl.converters.USVString(V)
	};

	webidl.converters.AbortSignal = webidl.interfaceConverter(
	  AbortSignal
	);

	// https://fetch.spec.whatwg.org/#requestinit
	webidl.converters.RequestInit = webidl.dictionaryConverter([
	  {
	    key: 'method',
	    converter: webidl.converters.ByteString
	  },
	  {
	    key: 'headers',
	    converter: webidl.converters.HeadersInit
	  },
	  {
	    key: 'body',
	    converter: webidl.nullableConverter(
	      webidl.converters.BodyInit
	    )
	  },
	  {
	    key: 'referrer',
	    converter: webidl.converters.USVString
	  },
	  {
	    key: 'referrerPolicy',
	    converter: webidl.converters.DOMString,
	    // https://w3c.github.io/webappsec-referrer-policy/#referrer-policy
	    allowedValues: [
	      '', 'no-referrer', 'no-referrer-when-downgrade',
	      'same-origin', 'origin', 'strict-origin',
	      'origin-when-cross-origin', 'strict-origin-when-cross-origin',
	      'unsafe-url'
	    ]
	  },
	  {
	    key: 'mode',
	    converter: webidl.converters.DOMString,
	    // https://fetch.spec.whatwg.org/#concept-request-mode
	    allowedValues: [
	      'same-origin', 'cors', 'no-cors', 'navigate', 'websocket'
	    ]
	  },
	  {
	    key: 'credentials',
	    converter: webidl.converters.DOMString,
	    // https://fetch.spec.whatwg.org/#requestcredentials
	    allowedValues: [
	      'omit', 'same-origin', 'include'
	    ]
	  },
	  {
	    key: 'cache',
	    converter: webidl.converters.DOMString,
	    // https://fetch.spec.whatwg.org/#requestcache
	    allowedValues: [
	      'default', 'no-store', 'reload', 'no-cache', 'force-cache',
	      'only-if-cached'
	    ]
	  },
	  {
	    key: 'redirect',
	    converter: webidl.converters.DOMString,
	    // https://fetch.spec.whatwg.org/#requestredirect
	    allowedValues: [
	      'follow', 'error', 'manual'
	    ]
	  },
	  {
	    key: 'integrity',
	    converter: webidl.converters.DOMString
	  },
	  {
	    key: 'keepalive',
	    converter: webidl.converters.boolean
	  },
	  {
	    key: 'signal',
	    converter: webidl.nullableConverter(
	      webidl.converters.AbortSignal
	    )
	  },
	  {
	    key: 'window',
	    converter: webidl.converters.any
	  }
	]);

	request = { Request, makeRequest };
	return request;
}

var dataURL;
var hasRequiredDataURL;

function requireDataURL () {
	if (hasRequiredDataURL) return dataURL;
	hasRequiredDataURL = 1;
	const assert = require$$0$1;
	const { atob } = require$$6;

	const encoder = new TextEncoder();

	// https://fetch.spec.whatwg.org/#data-url-processor
	/** @param {URL} dataURL */
	function dataURLProcessor (dataURL) {
	  // 1. Assert: dataURL’s scheme is "data".
	  assert(dataURL.protocol === 'data:');

	  // 2. Let input be the result of running the URL
	  // serializer on dataURL with exclude fragment
	  // set to true.
	  let input = URLSerializer(dataURL, true);

	  // 3. Remove the leading "data:" string from input.
	  input = input.slice(5);

	  // 4. Let position point at the start of input.
	  const position = { position: 0 };

	  // 5. Let mimeType be the result of collecting a
	  // sequence of code points that are not equal
	  // to U+002C (,), given position.
	  let mimeType = collectASequenceOfCodePoints(
	    (char) => char !== ',',
	    input,
	    position
	  );

	  // 6. Strip leading and trailing ASCII whitespace
	  // from mimeType.
	  // Note: This will only remove U+0020 SPACE code
	  // points, if any.
	  // Undici implementation note: we need to store the
	  // length because if the mimetype has spaces removed,
	  // the wrong amount will be sliced from the input in
	  // step #9
	  const mimeTypeLength = mimeType.length;
	  mimeType = mimeType.replace(/^(\u0020)+|(\u0020)+$/g, '');

	  // 7. If position is past the end of input, then
	  // return failure
	  if (position.position >= input.length) {
	    return 'failure'
	  }

	  // 8. Advance position by 1.
	  position.position++;

	  // 9. Let encodedBody be the remainder of input.
	  const encodedBody = input.slice(mimeTypeLength + 1);

	  // 10. Let body be the percent-decoding of encodedBody.
	  /** @type {Uint8Array|string} */
	  let body = stringPercentDecode(encodedBody);

	  // 11. If mimeType ends with U+003B (;), followed by
	  // zero or more U+0020 SPACE, followed by an ASCII
	  // case-insensitive match for "base64", then:
	  if (/;(\u0020){0,}base64$/i.test(mimeType)) {
	    // 1. Let stringBody be the isomorphic decode of body.
	    const stringBody = decodeURIComponent(new TextDecoder('utf-8').decode(body));
	    // 2. Set body to the forgiving-base64 decode of
	    // stringBody.
	    body = forgivingBase64(stringBody);

	    // 3. If body is failure, then return failure.
	    if (body === 'failure') {
	      return 'failure'
	    }

	    // 4. Remove the last 6 code points from mimeType.
	    mimeType = mimeType.slice(0, -6);

	    // 5. Remove trailing U+0020 SPACE code points from mimeType,
	    // if any.
	    mimeType = mimeType.replace(/(\u0020)+$/, '');

	    // 6. Remove the last U+003B (;) code point from mimeType.
	    mimeType = mimeType.slice(0, -1);
	  }

	  // 12. If mimeType starts with U+003B (;), then prepend
	  // "text/plain" to mimeType.
	  if (mimeType.startsWith(';')) {
	    mimeType = 'text/plain' + mimeType;
	  }

	  // 13. Let mimeTypeRecord be the result of parsing
	  // mimeType.
	  let mimeTypeRecord = parseMIMEType(mimeType);

	  // 14. If mimeTypeRecord is failure, then set
	  // mimeTypeRecord to text/plain;charset=US-ASCII.
	  if (mimeTypeRecord === 'failure') {
	    mimeTypeRecord = parseMIMEType('text/plain;charset=US-ASCII');
	  }

	  // 15. Return a new data: URL struct whose MIME
	  // type is mimeTypeRecord and body is body.
	  // https://fetch.spec.whatwg.org/#data-url-struct
	  return { mimeType: mimeTypeRecord, body }
	}

	// https://url.spec.whatwg.org/#concept-url-serializer
	/**
	 * @param {URL} url
	 * @param {boolean} excludeFragment
	 */
	function URLSerializer (url, excludeFragment = false) {
	  // 1. Let output be url’s scheme and U+003A (:) concatenated.
	  let output = url.protocol;

	  // 2. If url’s host is non-null:
	  if (url.host.length > 0) {
	    // 1. Append "//" to output.
	    output += '//';

	    // 2. If url includes credentials, then:
	    if (url.username.length > 0 || url.password.length > 0) {
	      // 1. Append url’s username to output.
	      output += url.username;

	      // 2. If url’s password is not the empty string, then append U+003A (:),
	      // followed by url’s password, to output.
	      if (url.password.length > 0) {
	        output += ':' + url.password;
	      }

	      // 3. Append U+0040 (@) to output.
	      output += '@';
	    }

	    // 3. Append url’s host, serialized, to output.
	    output += decodeURIComponent(url.host);

	    // 4. If url’s port is non-null, append U+003A (:) followed by url’s port,
	    // serialized, to output.
	    if (url.port.length > 0) {
	      output += ':' + url.port;
	    }
	  }

	  // 3. If url’s host is null, url does not have an opaque path,
	  // url’s path’s size is greater than 1, and url’s path[0]
	  // is the empty string, then append U+002F (/) followed by
	  // U+002E (.) to output.
	  // Note: This prevents web+demo:/.//not-a-host/ or web+demo:/path/..//not-a-host/,
	  // when parsed and then serialized, from ending up as web+demo://not-a-host/
	  // (they end up as web+demo:/.//not-a-host/).
	  // Undici implementation note: url's path[0] can never be an
	  // empty string, so we have to slightly alter what the spec says.
	  if (
	    url.host.length === 0 &&
	    url.pathname.length > 1 &&
	    url.href.slice(url.protocol.length + 1)[0] === '.'
	  ) {
	    output += '/.';
	  }

	  // 4. Append the result of URL path serializing url to output.
	  output += url.pathname;

	  // 5. If url’s query is non-null, append U+003F (?),
	  // followed by url’s query, to output.
	  if (url.search.length > 0) {
	    output += url.search;
	  }

	  // 6. If exclude fragment is false and url’s fragment is non-null,
	  // then append U+0023 (#), followed by url’s fragment, to output.
	  if (excludeFragment === false && url.hash.length > 0) {
	    output += url.hash;
	  }

	  // 7. Return output.
	  return output
	}

	// https://infra.spec.whatwg.org/#collect-a-sequence-of-code-points
	/**
	 * @param {(char: string) => boolean} condition
	 * @param {string} input
	 * @param {{ position: number }} position
	 */
	function collectASequenceOfCodePoints (condition, input, position) {
	  // 1. Let result be the empty string.
	  let result = '';

	  // 2. While position doesn’t point past the end of input and the
	  // code point at position within input meets the condition condition:
	  while (position.position < input.length && condition(input[position.position])) {
	    // 1. Append that code point to the end of result.
	    result += input[position.position];

	    // 2. Advance position by 1.
	    position.position++;
	  }

	  // 3. Return result.
	  return result
	}

	// https://url.spec.whatwg.org/#string-percent-decode
	/** @param {string} input */
	function stringPercentDecode (input) {
	  // 1. Let bytes be the UTF-8 encoding of input.
	  const bytes = encoder.encode(input);

	  // 2. Return the percent-decoding of bytes.
	  return percentDecode(bytes)
	}

	// https://url.spec.whatwg.org/#percent-decode
	/** @param {Uint8Array} input */
	function percentDecode (input) {
	  // 1. Let output be an empty byte sequence.
	  /** @type {number[]} */
	  const output = [];

	  // 2. For each byte byte in input:
	  for (let i = 0; i < input.length; i++) {
	    const byte = input[i];

	    // 1. If byte is not 0x25 (%), then append byte to output.
	    if (byte !== 0x25) {
	      output.push(byte);

	    // 2. Otherwise, if byte is 0x25 (%) and the next two bytes
	    // after byte in input are not in the ranges
	    // 0x30 (0) to 0x39 (9), 0x41 (A) to 0x46 (F),
	    // and 0x61 (a) to 0x66 (f), all inclusive, append byte
	    // to output.
	    } else if (
	      byte === 0x25 &&
	      !/^[0-9A-Fa-f]{2}$/i.test(String.fromCharCode(input[i + 1], input[i + 2]))
	    ) {
	      output.push(0x25);

	    // 3. Otherwise:
	    } else {
	      // 1. Let bytePoint be the two bytes after byte in input,
	      // decoded, and then interpreted as hexadecimal number.
	      const nextTwoBytes = String.fromCharCode(input[i + 1], input[i + 2]);
	      const bytePoint = Number.parseInt(nextTwoBytes, 16);

	      // 2. Append a byte whose value is bytePoint to output.
	      output.push(bytePoint);

	      // 3. Skip the next two bytes in input.
	      i += 2;
	    }
	  }

	  // 3. Return output.
	  return Uint8Array.of(...output)
	}

	// https://mimesniff.spec.whatwg.org/#parse-a-mime-type
	/** @param {string} input */
	function parseMIMEType (input) {
	  // 1. Remove any leading and trailing HTTP whitespace
	  // from input.
	  input = input.trim();

	  // 2. Let position be a position variable for input,
	  // initially pointing at the start of input.
	  const position = { position: 0 };

	  // 3. Let type be the result of collecting a sequence
	  // of code points that are not U+002F (/) from
	  // input, given position.
	  const type = collectASequenceOfCodePoints(
	    (char) => char !== '/',
	    input,
	    position
	  );

	  // 4. If type is the empty string or does not solely
	  // contain HTTP token code points, then return failure.
	  // https://mimesniff.spec.whatwg.org/#http-token-code-point
	  if (type.length === 0 || !/^[!#$%&'*+-.^_|~A-z0-9]+$/.test(type)) {
	    return 'failure'
	  }

	  // 5. If position is past the end of input, then return
	  // failure
	  if (position.position > input.length) {
	    return 'failure'
	  }

	  // 6. Advance position by 1. (This skips past U+002F (/).)
	  position.position++;

	  // 7. Let subtype be the result of collecting a sequence of
	  // code points that are not U+003B (;) from input, given
	  // position.
	  let subtype = collectASequenceOfCodePoints(
	    (char) => char !== ';',
	    input,
	    position
	  );

	  // 8. Remove any trailing HTTP whitespace from subtype.
	  subtype = subtype.trim();

	  // 9. If subtype is the empty string or does not solely
	  // contain HTTP token code points, then return failure.
	  if (subtype.length === 0 || !/^[!#$%&'*+-.^_|~A-z0-9]+$/.test(subtype)) {
	    return 'failure'
	  }

	  // 10. Let mimeType be a new MIME type record whose type
	  // is type, in ASCII lowercase, and subtype is subtype,
	  // in ASCII lowercase.
	  // https://mimesniff.spec.whatwg.org/#mime-type
	  const mimeType = {
	    type: type.toLowerCase(),
	    subtype: subtype.toLowerCase(),
	    /** @type {Map<string, string>} */
	    parameters: new Map()
	  };

	  // 11. While position is not past the end of input:
	  while (position.position < input.length) {
	    // 1. Advance position by 1. (This skips past U+003B (;).)
	    position.position++;

	    // 2. Collect a sequence of code points that are HTTP
	    // whitespace from input given position.
	    collectASequenceOfCodePoints(
	      // https://fetch.spec.whatwg.org/#http-whitespace
	      (char) => /(\u000A|\u000D|\u0009|\u0020)/.test(char), // eslint-disable-line
	      input,
	      position
	    );

	    // 3. Let parameterName be the result of collecting a
	    // sequence of code points that are not U+003B (;)
	    // or U+003D (=) from input, given position.
	    let parameterName = collectASequenceOfCodePoints(
	      (char) => char !== ';' && char !== '=',
	      input,
	      position
	    );

	    // 4. Set parameterName to parameterName, in ASCII
	    // lowercase.
	    parameterName = parameterName.toLowerCase();

	    // 5. If position is not past the end of input, then:
	    if (position.position < input.length) {
	      // 1. If the code point at position within input is
	      // U+003B (;), then continue.
	      if (input[position.position] === ';') {
	        continue
	      }

	      // 2. Advance position by 1. (This skips past U+003D (=).)
	      position.position++;
	    }

	    // 6. If position is past the end of input, then break.
	    if (position.position > input.length) {
	      break
	    }

	    // 7. Let parameterValue be null.
	    let parameterValue = null;

	    // 8. If the code point at position within input is
	    // U+0022 ("), then:
	    if (input[position.position] === '"') {
	      // 1. Set parameterValue to the result of collecting
	      // an HTTP quoted string from input, given position
	      // and the extract-value flag.
	      // Undici implementation note: extract-value is never
	      // defined or mentioned anywhere.
	      parameterValue = collectAnHTTPQuotedString(input, position/*, extractValue */);

	      // 2. Collect a sequence of code points that are not
	      // U+003B (;) from input, given position.
	      collectASequenceOfCodePoints(
	        (char) => char !== ';',
	        input,
	        position
	      );

	    // 9. Otherwise:
	    } else {
	      // 1. Set parameterValue to the result of collecting
	      // a sequence of code points that are not U+003B (;)
	      // from input, given position.
	      parameterValue = collectASequenceOfCodePoints(
	        (char) => char !== ';',
	        input,
	        position
	      );

	      // 2. Remove any trailing HTTP whitespace from parameterValue.
	      parameterValue = parameterValue.trim();

	      // 3. If parameterValue is the empty string, then continue.
	      if (parameterValue.length === 0) {
	        continue
	      }
	    }

	    // 10. If all of the following are true
	    // - parameterName is not the empty string
	    // - parameterName solely contains HTTP token code points
	    // - parameterValue solely contains HTTP quoted-string token code points
	    // - mimeType’s parameters[parameterName] does not exist
	    // then set mimeType’s parameters[parameterName] to parameterValue.
	    if (
	      parameterName.length !== 0 &&
	      /^[!#$%&'*+-.^_|~A-z0-9]+$/.test(parameterName) &&
	      // https://mimesniff.spec.whatwg.org/#http-quoted-string-token-code-point
	      !/^(\u0009|\x{0020}-\x{007E}|\x{0080}-\x{00FF})+$/.test(parameterValue) &&  // eslint-disable-line
	      !mimeType.parameters.has(parameterName)
	    ) {
	      mimeType.parameters.set(parameterName, parameterValue);
	    }
	  }

	  // 12. Return mimeType.
	  return mimeType
	}

	// https://infra.spec.whatwg.org/#forgiving-base64-decode
	/** @param {string} data */
	function forgivingBase64 (data) {
	  // 1. Remove all ASCII whitespace from data.
	  data = data.replace(/[\u0009\u000A\u000C\u000D\u0020]/g, '');  // eslint-disable-line

	  // 2. If data’s code point length divides by 4 leaving
	  // no remainder, then:
	  if (data.length % 4 === 0) {
	    // 1. If data ends with one or two U+003D (=) code points,
	    // then remove them from data.
	    data = data.replace(/=?=$/, '');
	  }

	  // 3. If data’s code point length divides by 4 leaving
	  // a remainder of 1, then return failure.
	  if (data.length % 4 === 1) {
	    return 'failure'
	  }

	  // 4. If data contains a code point that is not one of
	  //  U+002B (+)
	  //  U+002F (/)
	  //  ASCII alphanumeric
	  // then return failure.
	  if (/[^+/0-9A-Za-z]/.test(data)) {
	    return 'failure'
	  }

	  const binary = atob(data);
	  const bytes = new Uint8Array(binary.length);

	  for (let byte = 0; byte < binary.length; byte++) {
	    bytes[byte] = binary.charCodeAt(byte);
	  }

	  return bytes
	}

	// https://fetch.spec.whatwg.org/#collect-an-http-quoted-string
	// tests: https://fetch.spec.whatwg.org/#example-http-quoted-string
	/**
	 * @param {string} input
	 * @param {{ position: number }} position
	 * @param {boolean?} extractValue
	 */
	function collectAnHTTPQuotedString (input, position, extractValue) {
	  // 1. Let positionStart be position.
	  const positionStart = position.position;

	  // 2. Let value be the empty string.
	  let value = '';

	  // 3. Assert: the code point at position within input
	  // is U+0022 (").
	  assert(input[position.position] === '"');

	  // 4. Advance position by 1.
	  position.position++;

	  // 5. While true:
	  while (true) {
	    // 1. Append the result of collecting a sequence of code points
	    // that are not U+0022 (") or U+005C (\) from input, given
	    // position, to value.
	    value += collectASequenceOfCodePoints(
	      (char) => char !== '"' && char !== '\\',
	      input,
	      position
	    );

	    // 2. If position is past the end of input, then break.
	    if (position.position >= input.length) {
	      break
	    }

	    // 3. Let quoteOrBackslash be the code point at position within
	    // input.
	    const quoteOrBackslash = input[position.position];

	    // 4. Advance position by 1.
	    position.position++;

	    // 5. If quoteOrBackslash is U+005C (\), then:
	    if (quoteOrBackslash === '\\') {
	      // 1. If position is past the end of input, then append
	      // U+005C (\) to value and break.
	      if (position.position >= input.length) {
	        value += '\\';
	        break
	      }

	      // 2. Append the code point at position within input to value.
	      value += input[position.position];

	      // 3. Advance position by 1.
	      position.position++;

	    // 6. Otherwise:
	    } else {
	      // 1. Assert: quoteOrBackslash is U+0022 (").
	      assert(quoteOrBackslash === '"');

	      // 2. Break.
	      break
	    }
	  }

	  // 6. If the extract-value flag is set, then return value.
	  if (extractValue) {
	    return value
	  }

	  // 7. Return the code points from positionStart to position,
	  // inclusive, within input.
	  return input.slice(positionStart, position.position)
	}

	dataURL = {
	  dataURLProcessor,
	  URLSerializer,
	  collectASequenceOfCodePoints,
	  stringPercentDecode,
	  parseMIMEType,
	  collectAnHTTPQuotedString
	};
	return dataURL;
}

var fetch_1;
var hasRequiredFetch;

function requireFetch () {
	if (hasRequiredFetch) return fetch_1;
	hasRequiredFetch = 1;

	const {
	  Response,
	  makeNetworkError,
	  makeAppropriateNetworkError,
	  filterResponse,
	  makeResponse
	} = requireResponse();
	const { Headers } = requireHeaders();
	const { Request, makeRequest } = requireRequest();
	const zlib = require$$3$1;
	const {
	  matchRequestIntegrity,
	  makePolicyContainer,
	  clonePolicyContainer,
	  requestBadPort,
	  TAOCheck,
	  appendRequestOriginHeader,
	  responseLocationURL,
	  requestCurrentURL,
	  setRequestReferrerPolicyOnRedirect,
	  tryUpgradeRequestToAPotentiallyTrustworthyURL,
	  createOpaqueTimingInfo,
	  appendFetchMetadata,
	  corsCheck,
	  crossOriginResourcePolicyCheck,
	  determineRequestsReferrer,
	  coarsenedSharedCurrentTime,
	  createDeferredPromise,
	  isBlobLike,
	  sameOrigin,
	  isCancelled,
	  isAborted
	} = requireUtil();
	const { kState, kHeaders, kGuard, kRealm } = requireSymbols();
	const assert = require$$0$1;
	const { safelyExtractBody, extractBody } = requireBody();
	const {
	  redirectStatus,
	  nullBodyStatus,
	  safeMethods,
	  requestBodyHeader,
	  subresource,
	  DOMException
	} = requireConstants$1();
	const { kHeadersList } = symbols$1;
	const EE = require$$0$3;
	const { Readable, pipeline } = require$$0$2;
	const { isErrored, isReadable } = util$e;
	const { dataURLProcessor } = requireDataURL();
	const { TransformStream } = require$$10;

	/** @type {import('buffer').resolveObjectURL} */
	let resolveObjectURL;
	let ReadableStream;

	const nodeVersion = process.versions.node.split('.');
	const nodeMajor = Number(nodeVersion[0]);
	const nodeMinor = Number(nodeVersion[1]);

	class Fetch extends EE {
	  constructor (dispatcher) {
	    super();

	    this.dispatcher = dispatcher;
	    this.connection = null;
	    this.dump = false;
	    this.state = 'ongoing';
	  }

	  terminate (reason) {
	    if (this.state !== 'ongoing') {
	      return
	    }

	    this.state = 'terminated';
	    this.connection?.destroy(reason);
	    this.emit('terminated', reason);
	  }

	  abort () {
	    if (this.state !== 'ongoing') {
	      return
	    }

	    const reason = new DOMException('The operation was aborted.', 'AbortError');

	    this.state = 'aborted';
	    this.connection?.destroy(reason);
	    this.emit('terminated', reason);
	  }
	}

	// https://fetch.spec.whatwg.org/#fetch-method
	async function fetch (input, init = {}) {
	  if (arguments.length < 1) {
	    throw new TypeError(
	      `Failed to execute 'fetch' on 'Window': 1 argument required, but only ${arguments.length} present.`
	    )
	  }

	  // 1. Let p be a new promise.
	  const p = createDeferredPromise();

	  // 2. Let requestObject be the result of invoking the initial value of
	  // Request as constructor with input and init as arguments. If this throws
	  // an exception, reject p with it and return p.
	  let requestObject;

	  try {
	    requestObject = new Request(input, init);
	  } catch (e) {
	    p.reject(e);
	    return p.promise
	  }

	  // 3. Let request be requestObject’s request.
	  const request = requestObject[kState];

	  // 4. If requestObject’s signal’s aborted flag is set, then:
	  if (requestObject.signal.aborted) {
	    // 1. Abort fetch with p, request, and null.
	    abortFetch(p, request, null);

	    // 2. Return p.
	    return p.promise
	  }

	  // 5. Let globalObject be request’s client’s global object.
	  const globalObject = request.client.globalObject;

	  // 6. If globalObject is a ServiceWorkerGlobalScope object, then set
	  // request’s service-workers mode to "none".
	  if (globalObject?.constructor?.name === 'ServiceWorkerGlobalScope') {
	    request.serviceWorkers = 'none';
	  }

	  // 7. Let responseObject be null.
	  let responseObject = null;

	  // 8. Let relevantRealm be this’s relevant Realm.
	  const relevantRealm = null;

	  // 9. Let locallyAborted be false.
	  let locallyAborted = false;

	  // 10. Let controller be null.
	  let controller = null;

	  // 11. Add the following abort steps to requestObject’s signal:
	  requestObject.signal.addEventListener(
	    'abort',
	    () => {
	      // 1. Set locallyAborted to true.
	      locallyAborted = true;

	      // 2. Abort fetch with p, request, and responseObject.
	      abortFetch(p, request, responseObject);

	      // 3. If controller is not null, then abort controller.
	      if (controller != null) {
	        controller.abort();
	      }
	    },
	    { once: true }
	  );

	  // 12. Let handleFetchDone given response response be to finalize and
	  // report timing with response, globalObject, and "fetch".
	  const handleFetchDone = (response) =>
	    finalizeAndReportTiming(response, 'fetch');

	  // 13. Set controller to the result of calling fetch given request,
	  // with processResponseEndOfBody set to handleFetchDone, and processResponse
	  // given response being these substeps:

	  const processResponse = (response) => {
	    // 1. If locallyAborted is true, terminate these substeps.
	    if (locallyAborted) {
	      return
	    }

	    // 2. If response’s aborted flag is set, then abort fetch with p,
	    // request, and responseObject, and terminate these substeps.
	    if (response.aborted) {
	      abortFetch(p, request, responseObject);
	      return
	    }

	    // 3. If response is a network error, then reject p with a TypeError
	    // and terminate these substeps.
	    if (response.type === 'error') {
	      p.reject(
	        Object.assign(new TypeError('fetch failed'), { cause: response.error })
	      );
	      return
	    }

	    // 4. Set responseObject to the result of creating a Response object,
	    // given response, "immutable", and relevantRealm.
	    responseObject = new Response();
	    responseObject[kState] = response;
	    responseObject[kRealm] = relevantRealm;
	    responseObject[kHeaders][kHeadersList] = response.headersList;
	    responseObject[kHeaders][kGuard] = 'immutable';
	    responseObject[kHeaders][kRealm] = relevantRealm;

	    // 5. Resolve p with responseObject.
	    p.resolve(responseObject);
	  };

	  controller = fetching({
	    request,
	    processResponseEndOfBody: handleFetchDone,
	    processResponse,
	    dispatcher: this // undici
	  });

	  // 14. Return p.
	  return p.promise
	}

	// https://fetch.spec.whatwg.org/#finalize-and-report-timing
	function finalizeAndReportTiming (response, initiatorType = 'other') {
	  // 1. If response is an aborted network error, then return.
	  if (response.type === 'error' && response.aborted) {
	    return
	  }

	  // 2. If response’s URL list is null or empty, then return.
	  if (!response.urlList?.length) {
	    return
	  }

	  // 3. Let originalURL be response’s URL list[0].
	  const originalURL = response.urlList[0];

	  // 4. Let timingInfo be response’s timing info.
	  let timingInfo = response.timingInfo;

	  // 5. Let cacheState be response’s cache state.
	  let cacheState = response.cacheState;

	  // 6. If originalURL’s scheme is not an HTTP(S) scheme, then return.
	  if (!/^https?:/.test(originalURL.protocol)) {
	    return
	  }

	  // 7. If timingInfo is null, then return.
	  if (timingInfo === null) {
	    return
	  }

	  // 8. If response’s timing allow passed flag is not set, then:
	  if (!timingInfo.timingAllowPassed) {
	    //  1. Set timingInfo to a the result of creating an opaque timing info for timingInfo.
	    timingInfo = createOpaqueTimingInfo({
	      startTime: timingInfo.startTime
	    });

	    //  2. Set cacheState to the empty string.
	    cacheState = '';
	  }

	  // 9. Set timingInfo’s end time to the coarsened shared current time
	  // given global’s relevant settings object’s cross-origin isolated
	  // capability.
	  // TODO: given global’s relevant settings object’s cross-origin isolated
	  // capability?
	  response.timingInfo.endTime = coarsenedSharedCurrentTime();

	  // 10. Set response’s timing info to timingInfo.
	  response.timingInfo = timingInfo;

	  // 11. Mark resource timing for timingInfo, originalURL, initiatorType,
	  // global, and cacheState.
	  markResourceTiming(
	    timingInfo,
	    originalURL,
	    initiatorType,
	    globalThis,
	    cacheState
	  );
	}

	// https://w3c.github.io/resource-timing/#dfn-mark-resource-timing
	function markResourceTiming (timingInfo, originalURL, initiatorType, globalThis, cacheState) {
	  if (nodeMajor >= 18 && nodeMinor >= 2) {
	    performance.markResourceTiming(timingInfo, originalURL, initiatorType, globalThis, cacheState);
	  }
	}

	// https://fetch.spec.whatwg.org/#abort-fetch
	function abortFetch (p, request, responseObject) {
	  // 1. Let error be an "AbortError" DOMException.
	  const error = new DOMException('The operation was aborted.', 'AbortError');

	  // 2. Reject promise with error.
	  p.reject(error);

	  // 3. If request’s body is not null and is readable, then cancel request’s
	  // body with error.
	  if (request.body != null && isReadable(request.body?.stream)) {
	    request.body.stream.cancel(error).catch((err) => {
	      if (err.code === 'ERR_INVALID_STATE') {
	        // Node bug?
	        return
	      }
	      throw err
	    });
	  }

	  // 4. If responseObject is null, then return.
	  if (responseObject == null) {
	    return
	  }

	  // 5. Let response be responseObject’s response.
	  const response = responseObject[kState];

	  // 6. If response’s body is not null and is readable, then error response’s
	  // body with error.
	  if (response.body != null && isReadable(response.body?.stream)) {
	    response.body.stream.cancel(error).catch((err) => {
	      if (err.code === 'ERR_INVALID_STATE') {
	        // Node bug?
	        return
	      }
	      throw err
	    });
	  }
	}

	// https://fetch.spec.whatwg.org/#fetching
	function fetching ({
	  request,
	  processRequestBodyChunkLength,
	  processRequestEndOfBody,
	  processResponse,
	  processResponseEndOfBody,
	  processResponseConsumeBody,
	  useParallelQueue = false,
	  dispatcher // undici
	}) {
	  // 1. Let taskDestination be null.
	  let taskDestination = null;

	  // 2. Let crossOriginIsolatedCapability be false.
	  let crossOriginIsolatedCapability = false;

	  // 3. If request’s client is non-null, then:
	  if (request.client != null) {
	    // 1. Set taskDestination to request’s client’s global object.
	    taskDestination = request.client.globalObject;

	    // 2. Set crossOriginIsolatedCapability to request’s client’s cross-origin
	    // isolated capability.
	    crossOriginIsolatedCapability =
	      request.client.crossOriginIsolatedCapability;
	  }

	  // 4. If useParallelQueue is true, then set taskDestination to the result of
	  // starting a new parallel queue.
	  // TODO

	  // 5. Let timingInfo be a new fetch timing info whose start time and
	  // post-redirect start time are the coarsened shared current time given
	  // crossOriginIsolatedCapability.
	  const currenTime = coarsenedSharedCurrentTime(crossOriginIsolatedCapability);
	  const timingInfo = createOpaqueTimingInfo({
	    startTime: currenTime
	  });

	  // 6. Let fetchParams be a new fetch params whose
	  // request is request,
	  // timing info is timingInfo,
	  // process request body chunk length is processRequestBodyChunkLength,
	  // process request end-of-body is processRequestEndOfBody,
	  // process response is processResponse,
	  // process response consume body is processResponseConsumeBody,
	  // process response end-of-body is processResponseEndOfBody,
	  // task destination is taskDestination,
	  // and cross-origin isolated capability is crossOriginIsolatedCapability.
	  const fetchParams = {
	    controller: new Fetch(dispatcher),
	    request,
	    timingInfo,
	    processRequestBodyChunkLength,
	    processRequestEndOfBody,
	    processResponse,
	    processResponseConsumeBody,
	    processResponseEndOfBody,
	    taskDestination,
	    crossOriginIsolatedCapability
	  };

	  // 7. If request’s body is a byte sequence, then set request’s body to the
	  // first return value of safely extracting request’s body.
	  // NOTE: Since fetching is only called from fetch, body should already be
	  // extracted.
	  assert(!request.body || request.body.stream);

	  // 8. If request’s window is "client", then set request’s window to request’s
	  // client, if request’s client’s global object is a Window object; otherwise
	  // "no-window".
	  if (request.window === 'client') {
	    // TODO: What if request.client is null?
	    request.window =
	      request.client?.globalObject?.constructor?.name === 'Window'
	        ? request.client
	        : 'no-window';
	  }

	  // 9. If request’s origin is "client", then set request’s origin to request’s
	  // client’s origin.
	  if (request.origin === 'client') {
	    // TODO: What if request.client is null?
	    request.origin = request.client?.origin;
	  }

	  // 10. If all of the following conditions are true:
	  // TODO

	  // 11. If request’s policy container is "client", then:
	  if (request.policyContainer === 'client') {
	    // 1. If request’s client is non-null, then set request’s policy
	    // container to a clone of request’s client’s policy container. [HTML]
	    if (request.client != null) {
	      request.policyContainer = clonePolicyContainer(
	        request.client.policyContainer
	      );
	    } else {
	      // 2. Otherwise, set request’s policy container to a new policy
	      // container.
	      request.policyContainer = makePolicyContainer();
	    }
	  }

	  // 12. If request’s header list does not contain `Accept`, then:
	  if (!request.headersList.has('accept')) {
	    // 1. Let value be `*/*`.
	    const value = '*/*';

	    // 2. A user agent should set value to the first matching statement, if
	    // any, switching on request’s destination:
	    // "document"
	    // "frame"
	    // "iframe"
	    // `text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`
	    // "image"
	    // `image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5`
	    // "style"
	    // `text/css,*/*;q=0.1`
	    // TODO

	    // 3. Append `Accept`/value to request’s header list.
	    request.headersList.append('accept', value);
	  }

	  // 13. If request’s header list does not contain `Accept-Language`, then
	  // user agents should append `Accept-Language`/an appropriate value to
	  // request’s header list.
	  if (!request.headersList.has('accept-language')) {
	    request.headersList.append('accept-language', '*');
	  }

	  // 14. If request’s priority is null, then use request’s initiator and
	  // destination appropriately in setting request’s priority to a
	  // user-agent-defined object.
	  if (request.priority === null) ;

	  // 15. If request is a subresource request, then:
	  if (subresource.includes(request.destination)) ;

	  // 16. Run main fetch given fetchParams.
	  mainFetch(fetchParams)
	    .catch(err => {
	      fetchParams.controller.terminate(err);
	    });

	  // 17. Return fetchParam's controller
	  return fetchParams.controller
	}

	// https://fetch.spec.whatwg.org/#concept-main-fetch
	async function mainFetch (fetchParams, recursive = false) {
	  // 1. Let request be fetchParams’s request.
	  const request = fetchParams.request;

	  // 2. Let response be null.
	  let response = null;

	  // 3. If request’s local-URLs-only flag is set and request’s current URL is
	  // not local, then set response to a network error.
	  if (
	    request.localURLsOnly &&
	    !/^(about|blob|data):/.test(requestCurrentURL(request).protocol)
	  ) {
	    response = makeNetworkError('local URLs only');
	  }

	  // 4. Run report Content Security Policy violations for request.
	  // TODO

	  // 5. Upgrade request to a potentially trustworthy URL, if appropriate.
	  tryUpgradeRequestToAPotentiallyTrustworthyURL(request);

	  // 6. If should request be blocked due to a bad port, should fetching request
	  // be blocked as mixed content, or should request be blocked by Content
	  // Security Policy returns blocked, then set response to a network error.
	  if (requestBadPort(request) === 'blocked') {
	    response = makeNetworkError('bad port');
	  }
	  // TODO: should fetching request be blocked as mixed content?
	  // TODO: should request be blocked by Content Security Policy?

	  // 7. If request’s referrer policy is the empty string, then set request’s
	  // referrer policy to request’s policy container’s referrer policy.
	  if (request.referrerPolicy === '') {
	    request.referrerPolicy = request.policyContainer.referrerPolicy;
	  }

	  // 8. If request’s referrer is not "no-referrer", then set request’s
	  // referrer to the result of invoking determine request’s referrer.
	  if (request.referrer !== 'no-referrer') {
	    request.referrer = determineRequestsReferrer(request);
	  }

	  // 9. Set request’s current URL’s scheme to "https" if all of the following
	  // conditions are true:
	  // - request’s current URL’s scheme is "http"
	  // - request’s current URL’s host is a domain
	  // - Matching request’s current URL’s host per Known HSTS Host Domain Name
	  //   Matching results in either a superdomain match with an asserted
	  //   includeSubDomains directive or a congruent match (with or without an
	  //   asserted includeSubDomains directive). [HSTS]
	  // TODO

	  // 10. If recursive is false, then run the remaining steps in parallel.
	  // TODO

	  // 11. If response is null, then set response to the result of running
	  // the steps corresponding to the first matching statement:
	  if (response === null) {
	    response = await (async () => {
	      const currentURL = requestCurrentURL(request);

	      if (
	        // - request’s current URL’s origin is same origin with request’s origin,
	        //   and request’s response tainting is "basic"
	        (sameOrigin(currentURL, request.url) && request.responseTainting === 'basic') ||
	        // request’s current URL’s scheme is "data"
	        (currentURL.protocol === 'data:') ||
	        // - request’s mode is "navigate" or "websocket"
	        (request.mode === 'navigate' || request.mode === 'websocket')
	      ) {
	        // 1. Set request’s response tainting to "basic".
	        request.responseTainting = 'basic';

	        // 2. Return the result of running scheme fetch given fetchParams.
	        return await schemeFetch(fetchParams)
	      }

	      // request’s mode is "same-origin"
	      if (request.mode === 'same-origin') {
	        // 1. Return a network error.
	        return makeNetworkError('request mode cannot be "same-origin"')
	      }

	      // request’s mode is "no-cors"
	      if (request.mode === 'no-cors') {
	        // 1. If request’s redirect mode is not "follow", then return a network
	        // error.
	        if (request.redirect !== 'follow') {
	          return makeNetworkError(
	            'redirect mode cannot be "follow" for "no-cors" request'
	          )
	        }

	        // 2. Set request’s response tainting to "opaque".
	        request.responseTainting = 'opaque';

	        // 3. Return the result of running scheme fetch given fetchParams.
	        return await schemeFetch(fetchParams)
	      }

	      // request’s current URL’s scheme is not an HTTP(S) scheme
	      if (!/^https?:/.test(requestCurrentURL(request).protocol)) {
	        // Return a network error.
	        return makeNetworkError('URL scheme must be a HTTP(S) scheme')
	      }

	      // - request’s use-CORS-preflight flag is set
	      // - request’s unsafe-request flag is set and either request’s method is
	      //   not a CORS-safelisted method or CORS-unsafe request-header names with
	      //   request’s header list is not empty
	      //    1. Set request’s response tainting to "cors".
	      //    2. Let corsWithPreflightResponse be the result of running HTTP fetch
	      //    given fetchParams and true.
	      //    3. If corsWithPreflightResponse is a network error, then clear cache
	      //    entries using request.
	      //    4. Return corsWithPreflightResponse.
	      // TODO

	      // Otherwise
	      //    1. Set request’s response tainting to "cors".
	      request.responseTainting = 'cors';

	      //    2. Return the result of running HTTP fetch given fetchParams.
	      return await httpFetch(fetchParams)
	    })();
	  }

	  // 12. If recursive is true, then return response.
	  if (recursive) {
	    return response
	  }

	  // 13. If response is not a network error and response is not a filtered
	  // response, then:
	  if (response.status !== 0 && !response.internalResponse) {
	    // If request’s response tainting is "cors", then:
	    if (request.responseTainting === 'cors') ;

	    // Set response to the following filtered response with response as its
	    // internal response, depending on request’s response tainting:
	    if (request.responseTainting === 'basic') {
	      response = filterResponse(response, 'basic');
	    } else if (request.responseTainting === 'cors') {
	      response = filterResponse(response, 'cors');
	    } else if (request.responseTainting === 'opaque') {
	      response = filterResponse(response, 'opaque');
	    } else {
	      assert(false);
	    }
	  }

	  // 14. Let internalResponse be response, if response is a network error,
	  // and response’s internal response otherwise.
	  let internalResponse =
	    response.status === 0 ? response : response.internalResponse;

	  // 15. If internalResponse’s URL list is empty, then set it to a clone of
	  // request’s URL list.
	  if (internalResponse.urlList.length === 0) {
	    internalResponse.urlList.push(...request.urlList);
	  }

	  // 16. If request’s timing allow failed flag is unset, then set
	  // internalResponse’s timing allow passed flag.
	  if (!request.timingAllowFailed) {
	    response.timingAllowPassed = true;
	  }

	  // 17. If response is not a network error and any of the following returns
	  // blocked
	  // - should internalResponse to request be blocked as mixed content
	  // - should internalResponse to request be blocked by Content Security Policy
	  // - should internalResponse to request be blocked due to its MIME type
	  // - should internalResponse to request be blocked due to nosniff
	  // TODO

	  // 18. If response’s type is "opaque", internalResponse’s status is 206,
	  // internalResponse’s range-requested flag is set, and request’s header
	  // list does not contain `Range`, then set response and internalResponse
	  // to a network error.
	  if (
	    response.type === 'opaque' &&
	    internalResponse.status === 206 &&
	    internalResponse.rangeRequested &&
	    !request.headers.has('range')
	  ) {
	    response = internalResponse = makeNetworkError();
	  }

	  // 19. If response is not a network error and either request’s method is
	  // `HEAD` or `CONNECT`, or internalResponse’s status is a null body status,
	  // set internalResponse’s body to null and disregard any enqueuing toward
	  // it (if any).
	  if (
	    response.status !== 0 &&
	    (request.method === 'HEAD' ||
	      request.method === 'CONNECT' ||
	      nullBodyStatus.includes(internalResponse.status))
	  ) {
	    internalResponse.body = null;
	    fetchParams.controller.dump = true;
	  }

	  // 20. If request’s integrity metadata is not the empty string, then:
	  if (request.integrity) {
	    // 1. Let processBodyError be this step: run fetch finale given fetchParams
	    // and a network error.
	    const processBodyError = (reason) =>
	      fetchFinale(fetchParams, makeNetworkError(reason));

	    // 2. If request’s response tainting is "opaque", or response’s body is null,
	    // then run processBodyError and abort these steps.
	    if (request.responseTainting === 'opaque' || response.body == null) {
	      processBodyError(response.error);
	      return
	    }

	    // 3. Let processBody given bytes be these steps:
	    const processBody = (bytes) => {
	      // 1. If bytes do not match request’s integrity metadata,
	      // then run processBodyError and abort these steps. [SRI]
	      if (!matchRequestIntegrity(request, bytes)) {
	        processBodyError('integrity mismatch');
	        return
	      }

	      // 2. Set response’s body to the first return value of safely
	      // extracting bytes.
	      response.body = safelyExtractBody(bytes)[0];

	      // 3. Run fetch finale given fetchParams and response.
	      fetchFinale(fetchParams, response);
	    };

	    // 4. Fully read response’s body given processBody and processBodyError.
	    try {
	      processBody(await response.arrayBuffer());
	    } catch (err) {
	      processBodyError(err);
	    }
	  } else {
	    // 21. Otherwise, run fetch finale given fetchParams and response.
	    fetchFinale(fetchParams, response);
	  }
	}

	// https://fetch.spec.whatwg.org/#concept-scheme-fetch
	// given a fetch params fetchParams
	async function schemeFetch (fetchParams) {
	  // let request be fetchParams’s request
	  const { request } = fetchParams;

	  const {
	    protocol: scheme,
	    pathname: path
	  } = requestCurrentURL(request);

	  // switch on request’s current URL’s scheme, and run the associated steps:
	  switch (scheme) {
	    case 'about:': {
	      // If request’s current URL’s path is the string "blank", then return a new response
	      // whose status message is `OK`, header list is « (`Content-Type`, `text/html;charset=utf-8`) »,
	      // and body is the empty byte sequence.
	      if (path === 'blank') {
	        const resp = makeResponse({
	          statusText: 'OK',
	          headersList: [
	            ['content-type', 'text/html;charset=utf-8']
	          ]
	        });

	        resp.urlList = [new URL('about:blank')];
	        return resp
	      }

	      // Otherwise, return a network error.
	      return makeNetworkError('invalid path called')
	    }
	    case 'blob:': {
	      resolveObjectURL = resolveObjectURL || require$$6.resolveObjectURL;

	      // 1. Run these steps, but abort when the ongoing fetch is terminated:
	      //    1. Let blob be request’s current URL’s blob URL entry’s object.
	      //       https://w3c.github.io/FileAPI/#blob-url-entry
	      //       P.S. Thank God this method is available in node.
	      const currentURL = requestCurrentURL(request);

	      // https://github.com/web-platform-tests/wpt/blob/7b0ebaccc62b566a1965396e5be7bb2bc06f841f/FileAPI/url/resources/fetch-tests.js#L52-L56
	      // Buffer.resolveObjectURL does not ignore URL queries.
	      if (currentURL.search.length !== 0) {
	        return makeNetworkError('NetworkError when attempting to fetch resource.')
	      }

	      const blob = resolveObjectURL(currentURL.toString());

	      //    2. If request’s method is not `GET` or blob is not a Blob object, then return a network error. [FILEAPI]
	      if (request.method !== 'GET' || !isBlobLike(blob)) {
	        return makeNetworkError('invalid method')
	      }

	      //    3. Let response be a new response whose status message is `OK`.
	      const response = makeResponse({ statusText: 'OK', urlList: [currentURL] });

	      //    4. Append (`Content-Length`, blob’s size attribute value) to response’s header list.
	      response.headersList.set('content-length', `${blob.size}`);

	      //    5. Append (`Content-Type`, blob’s type attribute value) to response’s header list.
	      response.headersList.set('content-type', blob.type);

	      //    6. Set response’s body to the result of performing the read operation on blob.
	      // TODO (fix): This needs to read?
	      response.body = extractBody(blob)[0];

	      //    7. Return response.
	      return response

	      // 2. If aborted, then return the appropriate network error for fetchParams.
	      // TODO
	    }
	    case 'data:': {
	      // 1. Let dataURLStruct be the result of running the
	      //    data: URL processor on request’s current URL.
	      const currentURL = requestCurrentURL(request);
	      const dataURLStruct = dataURLProcessor(currentURL);

	      // 2. If dataURLStruct is failure, then return a
	      //    network error.
	      if (dataURLStruct === 'failure') {
	        return makeNetworkError('failed to fetch the data URL')
	      }

	      // 3. Let mimeType be dataURLStruct’s MIME type, serialized.
	      const { mimeType } = dataURLStruct;

	      /** @type {string} */
	      let contentType = `${mimeType.type}/${mimeType.subtype}`;
	      const contentTypeParams = [];

	      if (mimeType.parameters.size > 0) {
	        contentType += ';';
	      }

	      for (const [key, value] of mimeType.parameters) {
	        if (value.length > 0) {
	          contentTypeParams.push(`${key}=${value}`);
	        } else {
	          contentTypeParams.push(key);
	        }
	      }

	      contentType += contentTypeParams.join(',');

	      // 4. Return a response whose status message is `OK`,
	      //    header list is « (`Content-Type`, mimeType) »,
	      //    and body is dataURLStruct’s body.
	      return makeResponse({
	        statusText: 'OK',
	        headersList: [
	          ['content-type', contentType]
	        ],
	        body: extractBody(dataURLStruct.body)[0]
	      })
	    }
	    case 'file:': {
	      // For now, unfortunate as it is, file URLs are left as an exercise for the reader.
	      // When in doubt, return a network error.
	      return makeNetworkError('not implemented... yet...')
	    }
	    case 'http:':
	    case 'https:': {
	      // Return the result of running HTTP fetch given fetchParams.

	      return await httpFetch(fetchParams)
	        .catch((err) => makeNetworkError(err))
	    }
	    default: {
	      return makeNetworkError('unknown scheme')
	    }
	  }
	}

	// https://fetch.spec.whatwg.org/#finalize-response
	function finalizeResponse (fetchParams, response) {
	  // 1. Set fetchParams’s request’s done flag.
	  fetchParams.request.done = true;

	  // 2, If fetchParams’s process response done is not null, then queue a fetch
	  // task to run fetchParams’s process response done given response, with
	  // fetchParams’s task destination.
	  if (fetchParams.processResponseDone != null) {
	    queueMicrotask(() => fetchParams.processResponseDone(response));
	  }
	}

	// https://fetch.spec.whatwg.org/#fetch-finale
	async function fetchFinale (fetchParams, response) {
	  // 1. If response is a network error, then:
	  if (response.type === 'error') {
	    // 1. Set response’s URL list to « fetchParams’s request’s URL list[0] ».
	    response.urlList = [fetchParams.request.urlList[0]];

	    // 2. Set response’s timing info to the result of creating an opaque timing
	    // info for fetchParams’s timing info.
	    response.timingInfo = createOpaqueTimingInfo({
	      startTime: fetchParams.timingInfo.startTime
	    });
	  }

	  // 2. Let processResponseEndOfBody be the following steps:
	  const processResponseEndOfBody = () => {
	    // 1. Set fetchParams’s request’s done flag.
	    fetchParams.request.done = true;

	    // If fetchParams’s process response end-of-body is not null,
	    // then queue a fetch task to run fetchParams’s process response
	    // end-of-body given response with fetchParams’s task destination.
	    if (fetchParams.processResponseEndOfBody != null) {
	      queueMicrotask(() => fetchParams.processResponseEndOfBody(response));
	    }
	  };

	  // 3. If fetchParams’s process response is non-null, then queue a fetch task
	  // to run fetchParams’s process response given response, with fetchParams’s
	  // task destination.
	  if (fetchParams.processResponse != null) {
	    queueMicrotask(() => fetchParams.processResponse(response));
	  }

	  // 4. If response’s body is null, then run processResponseEndOfBody.
	  if (response.body == null) {
	    processResponseEndOfBody();
	  } else {
	  // 5. Otherwise:

	    // 1. Let transformStream be a new a TransformStream.

	    // 2. Let identityTransformAlgorithm be an algorithm which, given chunk,
	    // enqueues chunk in transformStream.
	    const identityTransformAlgorithm = (chunk, controller) => {
	      controller.enqueue(chunk);
	    };

	    // 3. Set up transformStream with transformAlgorithm set to identityTransformAlgorithm
	    // and flushAlgorithm set to processResponseEndOfBody.
	    const transformStream = new TransformStream({
	      start () {},
	      transform: identityTransformAlgorithm,
	      flush: processResponseEndOfBody
	    });

	    // 4. Set response’s body to the result of piping response’s body through transformStream.
	    response.body = { stream: response.body.stream.pipeThrough(transformStream) };
	  }

	  // 6. If fetchParams’s process response consume body is non-null, then:
	  if (fetchParams.processResponseConsumeBody != null) {
	    // 1. Let processBody given nullOrBytes be this step: run fetchParams’s
	    // process response consume body given response and nullOrBytes.
	    const processBody = (nullOrBytes) => fetchParams.processResponseConsumeBody(response, nullOrBytes);

	    // 2. Let processBodyError be this step: run fetchParams’s process
	    // response consume body given response and failure.
	    const processBodyError = (failure) => fetchParams.processResponseConsumeBody(response, failure);

	    // 3. If response’s body is null, then queue a fetch task to run processBody
	    // given null, with fetchParams’s task destination.
	    if (response.body == null) {
	      queueMicrotask(() => processBody(null));
	    } else {
	      // 4. Otherwise, fully read response’s body given processBody, processBodyError,
	      // and fetchParams’s task destination.
	      try {
	        processBody(await response.body.stream.arrayBuffer());
	      } catch (err) {
	        processBodyError(err);
	      }
	    }
	  }
	}

	// https://fetch.spec.whatwg.org/#http-fetch
	async function httpFetch (fetchParams) {
	  // 1. Let request be fetchParams’s request.
	  const request = fetchParams.request;

	  // 2. Let response be null.
	  let response = null;

	  // 3. Let actualResponse be null.
	  let actualResponse = null;

	  // 4. Let timingInfo be fetchParams’s timing info.
	  const timingInfo = fetchParams.timingInfo;

	  // 5. If request’s service-workers mode is "all", then:
	  if (request.serviceWorkers === 'all') ;

	  // 6. If response is null, then:
	  if (response === null) {
	    // 1. If makeCORSPreflight is true and one of these conditions is true:
	    // TODO

	    // 2. If request’s redirect mode is "follow", then set request’s
	    // service-workers mode to "none".
	    if (request.redirect === 'follow') {
	      request.serviceWorkers = 'none';
	    }

	    // 3. Set response and actualResponse to the result of running
	    // HTTP-network-or-cache fetch given fetchParams.
	    actualResponse = response = await httpNetworkOrCacheFetch(fetchParams);

	    // 4. If request’s response tainting is "cors" and a CORS check
	    // for request and response returns failure, then return a network error.
	    if (
	      request.responseTainting === 'cors' &&
	      corsCheck(request, response) === 'failure'
	    ) {
	      return makeNetworkError('cors failure')
	    }

	    // 5. If the TAO check for request and response returns failure, then set
	    // request’s timing allow failed flag.
	    if (TAOCheck(request, response) === 'failure') {
	      request.timingAllowFailed = true;
	    }
	  }

	  // 7. If either request’s response tainting or response’s type
	  // is "opaque", and the cross-origin resource policy check with
	  // request’s origin, request’s client, request’s destination,
	  // and actualResponse returns blocked, then return a network error.
	  if (
	    (request.responseTainting === 'opaque' || response.type === 'opaque') &&
	    crossOriginResourcePolicyCheck(
	      request.origin,
	      request.client,
	      request.destination,
	      actualResponse
	    ) === 'blocked'
	  ) {
	    return makeNetworkError('blocked')
	  }

	  // 8. If actualResponse’s status is a redirect status, then:
	  if (redirectStatus.includes(actualResponse.status)) {
	    // 1. If actualResponse’s status is not 303, request’s body is not null,
	    // and the connection uses HTTP/2, then user agents may, and are even
	    // encouraged to, transmit an RST_STREAM frame.
	    // See, https://github.com/whatwg/fetch/issues/1288
	    fetchParams.controller.connection.destroy();

	    // 2. Switch on request’s redirect mode:
	    if (request.redirect === 'error') {
	      // Set response to a network error.
	      response = makeNetworkError('unexpected redirect');
	    } else if (request.redirect === 'manual') {
	      // Set response to an opaque-redirect filtered response whose internal
	      // response is actualResponse.
	      // NOTE(spec): On the web this would return an `opaqueredirect` response,
	      // but that doesn't make sense server side.
	      // See https://github.com/nodejs/undici/issues/1193.
	      response = actualResponse;
	    } else if (request.redirect === 'follow') {
	      // Set response to the result of running HTTP-redirect fetch given
	      // fetchParams and response.
	      response = await httpRedirectFetch(fetchParams, response);
	    } else {
	      assert(false);
	    }
	  }

	  // 9. Set response’s timing info to timingInfo.
	  response.timingInfo = timingInfo;

	  // 10. Return response.
	  return response
	}

	// https://fetch.spec.whatwg.org/#http-redirect-fetch
	async function httpRedirectFetch (fetchParams, response) {
	  // 1. Let request be fetchParams’s request.
	  const request = fetchParams.request;

	  // 2. Let actualResponse be response, if response is not a filtered response,
	  // and response’s internal response otherwise.
	  const actualResponse = response.internalResponse
	    ? response.internalResponse
	    : response;

	  // 3. Let locationURL be actualResponse’s location URL given request’s current
	  // URL’s fragment.
	  let locationURL;

	  try {
	    locationURL = responseLocationURL(
	      actualResponse,
	      requestCurrentURL(request).hash
	    );

	    // 4. If locationURL is null, then return response.
	    if (locationURL == null) {
	      return response
	    }
	  } catch (err) {
	    // 5. If locationURL is failure, then return a network error.
	    return makeNetworkError(err)
	  }

	  // 6. If locationURL’s scheme is not an HTTP(S) scheme, then return a network
	  // error.
	  if (!/^https?:/.test(locationURL.protocol)) {
	    return makeNetworkError('URL scheme must be a HTTP(S) scheme')
	  }

	  // 7. If request’s redirect count is twenty, return a network error.
	  if (request.redirectCount === 20) {
	    return makeNetworkError('redirect count exceeded')
	  }

	  // 8. Increase request’s redirect count by one.
	  request.redirectCount += 1;

	  // 9. If request’s mode is "cors", locationURL includes credentials, and
	  // request’s origin is not same origin with locationURL’s origin, then return
	  //  a network error.
	  if (
	    request.mode === 'cors' &&
	    (locationURL.username || locationURL.password) &&
	    !sameOrigin(request, locationURL)
	  ) {
	    return makeNetworkError('cross origin not allowed for request mode "cors"')
	  }

	  // 10. If request’s response tainting is "cors" and locationURL includes
	  // credentials, then return a network error.
	  if (
	    request.responseTainting === 'cors' &&
	    (locationURL.username || locationURL.password)
	  ) {
	    return makeNetworkError(
	      'URL cannot contain credentials for request mode "cors"'
	    )
	  }

	  // 11. If actualResponse’s status is not 303, request’s body is non-null,
	  // and request’s body’s source is null, then return a network error.
	  if (
	    actualResponse.status !== 303 &&
	    request.body != null &&
	    request.body.source == null
	  ) {
	    return makeNetworkError()
	  }

	  // 12. If one of the following is true
	  // - actualResponse’s status is 301 or 302 and request’s method is `POST`
	  // - actualResponse’s status is 303 and request’s method is not `GET` or `HEAD`
	  if (
	    ([301, 302].includes(actualResponse.status) && request.method === 'POST') ||
	    (actualResponse.status === 303 &&
	      !['GET', 'HEAD'].includes(request.method))
	  ) {
	    // then:
	    // 1. Set request’s method to `GET` and request’s body to null.
	    request.method = 'GET';
	    request.body = null;

	    // 2. For each headerName of request-body-header name, delete headerName from
	    // request’s header list.
	    for (const headerName of requestBodyHeader) {
	      request.headersList.delete(headerName);
	    }
	  }

	  // 13. If request’s body is non-null, then set request’s body to the first return
	  // value of safely extracting request’s body’s source.
	  if (request.body != null) {
	    assert(request.body.source);
	    request.body = safelyExtractBody(request.body.source)[0];
	  }

	  // 14. Let timingInfo be fetchParams’s timing info.
	  const timingInfo = fetchParams.timingInfo;

	  // 15. Set timingInfo’s redirect end time and post-redirect start time to the
	  // coarsened shared current time given fetchParams’s cross-origin isolated
	  // capability.
	  timingInfo.redirectEndTime = timingInfo.postRedirectStartTime =
	    coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);

	  // 16. If timingInfo’s redirect start time is 0, then set timingInfo’s
	  //  redirect start time to timingInfo’s start time.
	  if (timingInfo.redirectStartTime === 0) {
	    timingInfo.redirectStartTime = timingInfo.startTime;
	  }

	  // 17. Append locationURL to request’s URL list.
	  request.urlList.push(locationURL);

	  // 18. Invoke set request’s referrer policy on redirect on request and
	  // actualResponse.
	  setRequestReferrerPolicyOnRedirect(request, actualResponse);

	  // 19. Return the result of running main fetch given fetchParams and true.
	  return mainFetch(fetchParams, true)
	}

	// https://fetch.spec.whatwg.org/#http-network-or-cache-fetch
	async function httpNetworkOrCacheFetch (
	  fetchParams,
	  isAuthenticationFetch = false,
	  isNewConnectionFetch = false
	) {
	  // 1. Let request be fetchParams’s request.
	  const request = fetchParams.request;

	  // 2. Let httpFetchParams be null.
	  let httpFetchParams = null;

	  // 3. Let httpRequest be null.
	  let httpRequest = null;

	  // 4. Let response be null.
	  let response = null;

	  // 8. Run these steps, but abort when the ongoing fetch is terminated:

	  //    1. If request’s window is "no-window" and request’s redirect mode is
	  //    "error", then set httpFetchParams to fetchParams and httpRequest to
	  //    request.
	  if (request.window === 'no-window' && request.redirect === 'error') {
	    httpFetchParams = fetchParams;
	    httpRequest = request;
	  } else {
	    // Otherwise:

	    // 1. Set httpRequest to a clone of request.
	    httpRequest = makeRequest(request);

	    // 2. Set httpFetchParams to a copy of fetchParams.
	    httpFetchParams = { ...fetchParams };

	    // 3. Set httpFetchParams’s request to httpRequest.
	    httpFetchParams.request = httpRequest;
	  }

	  //    3. Let includeCredentials be true if one of
	  const includeCredentials =
	    request.credentials === 'include' ||
	    (request.credentials === 'same-origin' &&
	      request.responseTainting === 'basic');

	  //    4. Let contentLength be httpRequest’s body’s length, if httpRequest’s
	  //    body is non-null; otherwise null.
	  const contentLength = httpRequest.body ? httpRequest.body.length : null;

	  //    5. Let contentLengthHeaderValue be null.
	  let contentLengthHeaderValue = null;

	  //    6. If httpRequest’s body is null and httpRequest’s method is `POST` or
	  //    `PUT`, then set contentLengthHeaderValue to `0`.
	  if (
	    httpRequest.body == null &&
	    ['POST', 'PUT'].includes(httpRequest.method)
	  ) {
	    contentLengthHeaderValue = '0';
	  }

	  //    7. If contentLength is non-null, then set contentLengthHeaderValue to
	  //    contentLength, serialized and isomorphic encoded.
	  if (contentLength != null) {
	    // TODO: isomorphic encoded
	    contentLengthHeaderValue = String(contentLength);
	  }

	  //    8. If contentLengthHeaderValue is non-null, then append
	  //    `Content-Length`/contentLengthHeaderValue to httpRequest’s header
	  //    list.
	  if (contentLengthHeaderValue != null) {
	    httpRequest.headersList.append('content-length', contentLengthHeaderValue);
	  }

	  //    9. If contentLengthHeaderValue is non-null, then append (`Content-Length`,
	  //    contentLengthHeaderValue) to httpRequest’s header list.

	  //    10. If contentLength is non-null and httpRequest’s keepalive is true,
	  //    then:
	  if (contentLength != null && httpRequest.keepalive) ;

	  //    11. If httpRequest’s referrer is a URL, then append
	  //    `Referer`/httpRequest’s referrer, serialized and isomorphic encoded,
	  //     to httpRequest’s header list.
	  if (httpRequest.referrer instanceof URL) {
	    // TODO: isomorphic encoded
	    httpRequest.headersList.append('referer', httpRequest.referrer.href);
	  }

	  //    12. Append a request `Origin` header for httpRequest.
	  appendRequestOriginHeader(httpRequest);

	  //    13. Append the Fetch metadata headers for httpRequest. [FETCH-METADATA]
	  appendFetchMetadata(httpRequest);

	  //    14. If httpRequest’s header list does not contain `User-Agent`, then
	  //    user agents should append `User-Agent`/default `User-Agent` value to
	  //    httpRequest’s header list.
	  if (!httpRequest.headersList.has('user-agent')) {
	    httpRequest.headersList.append('user-agent', 'undici');
	  }

	  //    15. If httpRequest’s cache mode is "default" and httpRequest’s header
	  //    list contains `If-Modified-Since`, `If-None-Match`,
	  //    `If-Unmodified-Since`, `If-Match`, or `If-Range`, then set
	  //    httpRequest’s cache mode to "no-store".
	  if (
	    httpRequest.cache === 'default' &&
	    (httpRequest.headersList.has('if-modified-since') ||
	      httpRequest.headersList.has('if-none-match') ||
	      httpRequest.headersList.has('if-unmodified-since') ||
	      httpRequest.headersList.has('if-match') ||
	      httpRequest.headersList.has('if-range'))
	  ) {
	    httpRequest.cache = 'no-store';
	  }

	  //    16. If httpRequest’s cache mode is "no-cache", httpRequest’s prevent
	  //    no-cache cache-control header modification flag is unset, and
	  //    httpRequest’s header list does not contain `Cache-Control`, then append
	  //    `Cache-Control`/`max-age=0` to httpRequest’s header list.
	  if (
	    httpRequest.cache === 'no-cache' &&
	    !httpRequest.preventNoCacheCacheControlHeaderModification &&
	    !httpRequest.headersList.has('cache-control')
	  ) {
	    httpRequest.headersList.append('cache-control', 'max-age=0');
	  }

	  //    17. If httpRequest’s cache mode is "no-store" or "reload", then:
	  if (httpRequest.cache === 'no-store' || httpRequest.cache === 'reload') {
	    // 1. If httpRequest’s header list does not contain `Pragma`, then append
	    // `Pragma`/`no-cache` to httpRequest’s header list.
	    if (!httpRequest.headersList.has('pragma')) {
	      httpRequest.headersList.append('pragma', 'no-cache');
	    }

	    // 2. If httpRequest’s header list does not contain `Cache-Control`,
	    // then append `Cache-Control`/`no-cache` to httpRequest’s header list.
	    if (!httpRequest.headersList.has('cache-control')) {
	      httpRequest.headersList.append('cache-control', 'no-cache');
	    }
	  }

	  //    18. If httpRequest’s header list contains `Range`, then append
	  //    `Accept-Encoding`/`identity` to httpRequest’s header list.
	  if (httpRequest.headersList.has('range')) {
	    httpRequest.headersList.append('accept-encoding', 'identity');
	  }

	  //    19. Modify httpRequest’s header list per HTTP. Do not append a given
	  //    header if httpRequest’s header list contains that header’s name.
	  //    TODO: https://github.com/whatwg/fetch/issues/1285#issuecomment-896560129
	  if (!httpRequest.headersList.has('accept-encoding')) {
	    if (/^https:/.test(requestCurrentURL(httpRequest).protocol)) {
	      httpRequest.headersList.append('accept-encoding', 'br, gzip, deflate');
	    } else {
	      httpRequest.headersList.append('accept-encoding', 'gzip, deflate');
	    }
	  }

	  //    21. If there’s a proxy-authentication entry, use it as appropriate.
	  //    TODO: proxy-authentication

	  //    22. Set httpCache to the result of determining the HTTP cache
	  //    partition, given httpRequest.
	  //    TODO: cache

	  //    23. If httpCache is null, then set httpRequest’s cache mode to
	  //    "no-store".
	  {
	    httpRequest.cache = 'no-store';
	  }

	  //    24. If httpRequest’s cache mode is neither "no-store" nor "reload",
	  //    then:
	  if (httpRequest.mode !== 'no-store' && httpRequest.mode !== 'reload') ;

	  // 9. If aborted, then return the appropriate network error for fetchParams.
	  // TODO

	  // 10. If response is null, then:
	  if (response == null) {
	    // 1. If httpRequest’s cache mode is "only-if-cached", then return a
	    // network error.
	    if (httpRequest.mode === 'only-if-cached') {
	      return makeNetworkError('only if cached')
	    }

	    // 2. Let forwardResponse be the result of running HTTP-network fetch
	    // given httpFetchParams, includeCredentials, and isNewConnectionFetch.
	    const forwardResponse = await httpNetworkFetch(
	      httpFetchParams,
	      includeCredentials,
	      isNewConnectionFetch
	    );

	    // 3. If httpRequest’s method is unsafe and forwardResponse’s status is
	    // in the range 200 to 399, inclusive, invalidate appropriate stored
	    // responses in httpCache, as per the "Invalidation" chapter of HTTP
	    // Caching, and set storedResponse to null. [HTTP-CACHING]
	    if (
	      !safeMethods.includes(httpRequest.method) &&
	      forwardResponse.status >= 200 &&
	      forwardResponse.status <= 399
	    ) ;

	    // 5. If response is null, then:
	    if (response == null) {
	      // 1. Set response to forwardResponse.
	      response = forwardResponse;

	      // 2. Store httpRequest and forwardResponse in httpCache, as per the
	      // "Storing Responses in Caches" chapter of HTTP Caching. [HTTP-CACHING]
	      // TODO: cache
	    }
	  }

	  // 11. Set response’s URL list to a clone of httpRequest’s URL list.
	  response.urlList = [...httpRequest.urlList];

	  // 12. If httpRequest’s header list contains `Range`, then set response’s
	  // range-requested flag.
	  if (httpRequest.headersList.has('range')) {
	    response.rangeRequested = true;
	  }

	  // 13. Set response’s request-includes-credentials to includeCredentials.
	  response.requestIncludesCredentials = includeCredentials;

	  // 14. If response’s status is 401, httpRequest’s response tainting is not
	  // "cors", includeCredentials is true, and request’s window is an environment
	  // settings object, then:
	  // TODO

	  // 15. If response’s status is 407, then:
	  if (response.status === 407) {
	    // 1. If request’s window is "no-window", then return a network error.
	    if (request.window === 'no-window') {
	      return makeNetworkError()
	    }

	    // 2. ???

	    // 3. If fetchParams is canceled, then return the appropriate network error for fetchParams.
	    if (isCancelled(fetchParams)) {
	      return makeAppropriateNetworkError(fetchParams)
	    }

	    // 4. Prompt the end user as appropriate in request’s window and store
	    // the result as a proxy-authentication entry. [HTTP-AUTH]
	    // TODO: Invoke some kind of callback?

	    // 5. Set response to the result of running HTTP-network-or-cache fetch given
	    // fetchParams.
	    // TODO
	    return makeNetworkError('proxy authentication required')
	  }

	  // 16. If all of the following are true
	  if (
	    // response’s status is 421
	    response.status === 421 &&
	    // isNewConnectionFetch is false
	    !isNewConnectionFetch &&
	    // request’s body is null, or request’s body is non-null and request’s body’s source is non-null
	    (request.body == null || request.body.source != null)
	  ) {
	    // then:

	    // 1. If fetchParams is canceled, then return the appropriate network error for fetchParams.
	    if (isCancelled(fetchParams)) {
	      return makeAppropriateNetworkError(fetchParams)
	    }

	    // 2. Set response to the result of running HTTP-network-or-cache
	    // fetch given fetchParams, isAuthenticationFetch, and true.

	    // TODO (spec): The spec doesn't specify this but we need to cancel
	    // the active response before we can start a new one.
	    // https://github.com/whatwg/fetch/issues/1293
	    fetchParams.controller.connection.destroy();

	    response = await httpNetworkOrCacheFetch(
	      fetchParams,
	      isAuthenticationFetch,
	      true
	    );
	  }

	  // 18. Return response.
	  return response
	}

	// https://fetch.spec.whatwg.org/#http-network-fetch
	async function httpNetworkFetch (
	  fetchParams,
	  includeCredentials = false,
	  forceNewConnection = false
	) {
	  assert(!fetchParams.controller.connection || fetchParams.controller.connection.destroyed);

	  fetchParams.controller.connection = {
	    abort: null,
	    destroyed: false,
	    destroy (err) {
	      if (!this.destroyed) {
	        this.destroyed = true;
	        this.abort?.(err ?? new DOMException('The operation was aborted.', 'AbortError'));
	      }
	    }
	  };

	  // 1. Let request be fetchParams’s request.
	  const request = fetchParams.request;

	  // 2. Let response be null.
	  let response = null;

	  // 3. Let timingInfo be fetchParams’s timing info.
	  const timingInfo = fetchParams.timingInfo;

	  // 5. If httpCache is null, then set request’s cache mode to "no-store".
	  {
	    request.cache = 'no-store';
	  }

	  // 8. Switch on request’s mode:
	  if (request.mode === 'websocket') ;

	  // 9. Run these steps, but abort when the ongoing fetch is terminated:

	  //    1. If connection is failure, then return a network error.

	  //    2. Set timingInfo’s final connection timing info to the result of
	  //    calling clamp and coarsen connection timing info with connection’s
	  //    timing info, timingInfo’s post-redirect start time, and fetchParams’s
	  //    cross-origin isolated capability.

	  //    3. If connection is not an HTTP/2 connection, request’s body is non-null,
	  //    and request’s body’s source is null, then append (`Transfer-Encoding`,
	  //    `chunked`) to request’s header list.

	  //    4. Set timingInfo’s final network-request start time to the coarsened
	  //    shared current time given fetchParams’s cross-origin isolated
	  //    capability.

	  //    5. Set response to the result of making an HTTP request over connection
	  //    using request with the following caveats:

	  //        - Follow the relevant requirements from HTTP. [HTTP] [HTTP-SEMANTICS]
	  //        [HTTP-COND] [HTTP-CACHING] [HTTP-AUTH]

	  //        - If request’s body is non-null, and request’s body’s source is null,
	  //        then the user agent may have a buffer of up to 64 kibibytes and store
	  //        a part of request’s body in that buffer. If the user agent reads from
	  //        request’s body beyond that buffer’s size and the user agent needs to
	  //        resend request, then instead return a network error.

	  //        - Set timingInfo’s final network-response start time to the coarsened
	  //        shared current time given fetchParams’s cross-origin isolated capability,
	  //        immediately after the user agent’s HTTP parser receives the first byte
	  //        of the response (e.g., frame header bytes for HTTP/2 or response status
	  //        line for HTTP/1.x).

	  //        - Wait until all the headers are transmitted.

	  //        - Any responses whose status is in the range 100 to 199, inclusive,
	  //        and is not 101, are to be ignored, except for the purposes of setting
	  //        timingInfo’s final network-response start time above.

	  //    - If request’s header list contains `Transfer-Encoding`/`chunked` and
	  //    response is transferred via HTTP/1.0 or older, then return a network
	  //    error.

	  //    - If the HTTP request results in a TLS client certificate dialog, then:

	  //        1. If request’s window is an environment settings object, make the
	  //        dialog available in request’s window.

	  //        2. Otherwise, return a network error.

	  // To transmit request’s body body, run these steps:
	  let requestBody = null;
	  // 1. If body is null and fetchParams’s process request end-of-body is
	  // non-null, then queue a fetch task given fetchParams’s process request
	  // end-of-body and fetchParams’s task destination.
	  if (request.body == null && fetchParams.processRequestEndOfBody) {
	    queueMicrotask(() => fetchParams.processRequestEndOfBody());
	  } else if (request.body != null) {
	    // 2. Otherwise, if body is non-null:

	    //    1. Let processBodyChunk given bytes be these steps:
	    const processBodyChunk = async function * (bytes) {
	      // 1. If the ongoing fetch is terminated, then abort these steps.
	      if (isCancelled(fetchParams)) {
	        return
	      }

	      // 2. Run this step in parallel: transmit bytes.
	      yield bytes;

	      // 3. If fetchParams’s process request body is non-null, then run
	      // fetchParams’s process request body given bytes’s length.
	      fetchParams.processRequestBodyChunkLength?.(bytes.byteLength);
	    };

	    // 2. Let processEndOfBody be these steps:
	    const processEndOfBody = () => {
	      // 1. If fetchParams is canceled, then abort these steps.
	      if (isCancelled(fetchParams)) {
	        return
	      }

	      // 2. If fetchParams’s process request end-of-body is non-null,
	      // then run fetchParams’s process request end-of-body.
	      if (fetchParams.processRequestEndOfBody) {
	        fetchParams.processRequestEndOfBody();
	      }
	    };

	    // 3. Let processBodyError given e be these steps:
	    const processBodyError = (e) => {
	      // 1. If fetchParams is canceled, then abort these steps.
	      if (isCancelled(fetchParams)) {
	        return
	      }

	      // 2. If e is an "AbortError" DOMException, then abort fetchParams’s controller.
	      if (e.name === 'AbortError') {
	        fetchParams.controller.abort();
	      } else {
	        fetchParams.controller.terminate(e);
	      }
	    };

	    // 4. Incrementally read request’s body given processBodyChunk, processEndOfBody,
	    // processBodyError, and fetchParams’s task destination.
	    requestBody = (async function * () {
	      try {
	        for await (const bytes of request.body.stream) {
	          yield * processBodyChunk(bytes);
	        }
	        processEndOfBody();
	      } catch (err) {
	        processBodyError(err);
	      }
	    })();
	  }

	  try {
	    const { body, status, statusText, headersList } = await dispatch({ body: requestBody });

	    const iterator = body[Symbol.asyncIterator]();
	    fetchParams.controller.next = () => iterator.next();

	    response = makeResponse({ status, statusText, headersList });
	  } catch (err) {
	    // 10. If aborted, then:
	    if (err.name === 'AbortError') {
	      // 1. If connection uses HTTP/2, then transmit an RST_STREAM frame.
	      fetchParams.controller.connection.destroy();

	      // 2. Return the appropriate network error for fetchParams.
	      return makeAppropriateNetworkError(fetchParams)
	    }

	    return makeNetworkError(err)
	  }

	  // 11. Let pullAlgorithm be an action that resumes the ongoing fetch
	  // if it is suspended.
	  const pullAlgorithm = () => {
	    fetchParams.controller.resume();
	  };

	  // 12. Let cancelAlgorithm be an algorithm that aborts fetchParams’s
	  // controller.
	  const cancelAlgorithm = () => {
	    fetchParams.controller.abort();
	  };

	  // 13. Let highWaterMark be a non-negative, non-NaN number, chosen by
	  // the user agent.
	  // TODO

	  // 14. Let sizeAlgorithm be an algorithm that accepts a chunk object
	  // and returns a non-negative, non-NaN, non-infinite number, chosen by the user agent.
	  // TODO

	  // 15. Let stream be a new ReadableStream.
	  // 16. Set up stream with pullAlgorithm set to pullAlgorithm,
	  // cancelAlgorithm set to cancelAlgorithm, highWaterMark set to
	  // highWaterMark, and sizeAlgorithm set to sizeAlgorithm.
	  if (!ReadableStream) {
	    ReadableStream = require$$10.ReadableStream;
	  }

	  const stream = new ReadableStream(
	    {
	      async start (controller) {
	        fetchParams.controller.controller = controller;
	      },
	      async pull (controller) {
	        await pullAlgorithm();
	      },
	      async cancel (reason) {
	        await cancelAlgorithm();
	      }
	    },
	    { highWaterMark: 0 }
	  );

	  // 17. Run these steps, but abort when the ongoing fetch is terminated:

	  //    1. Set response’s body to a new body whose stream is stream.
	  response.body = { stream };

	  //    2. If response is not a network error and request’s cache mode is
	  //    not "no-store", then update response in httpCache for request.
	  //    TODO

	  //    3. If includeCredentials is true and the user agent is not configured
	  //    to block cookies for request (see section 7 of [COOKIES]), then run the
	  //    "set-cookie-string" parsing algorithm (see section 5.2 of [COOKIES]) on
	  //    the value of each header whose name is a byte-case-insensitive match for
	  //    `Set-Cookie` in response’s header list, if any, and request’s current URL.
	  //    TODO

	  // 18. If aborted, then:
	  // TODO

	  // 19. Run these steps in parallel:

	  //    1. Run these steps, but abort when fetchParams is canceled:
	  fetchParams.controller.on('terminated', onAborted);
	  fetchParams.controller.resume = async () => {
	    // 1. While true
	    while (true) {
	      // 1-3. See onData...

	      // 4. Set bytes to the result of handling content codings given
	      // codings and bytes.
	      let bytes;
	      try {
	        const { done, value } = await fetchParams.controller.next();

	        if (isAborted(fetchParams)) {
	          break
	        }

	        bytes = done ? undefined : value;
	      } catch (err) {
	        if (fetchParams.controller.ended && !timingInfo.encodedBodySize) {
	          // zlib doesn't like empty streams.
	          bytes = undefined;
	        } else {
	          bytes = err;
	        }
	      }

	      if (bytes === undefined) {
	        // 2. Otherwise, if the bytes transmission for response’s message
	        // body is done normally and stream is readable, then close
	        // stream, finalize response for fetchParams and response, and
	        // abort these in-parallel steps.
	        try {
	          fetchParams.controller.controller.close();
	        } catch (err) {
	          // TODO (fix): How/Why can this happen? Do we have a bug?
	          if (!/Controller is already closed/.test(err)) {
	            throw err
	          }
	        }

	        finalizeResponse(fetchParams, response);

	        return
	      }

	      // 5. Increase timingInfo’s decoded body size by bytes’s length.
	      timingInfo.decodedBodySize += bytes?.byteLength ?? 0;

	      // 6. If bytes is failure, then terminate fetchParams’s controller.
	      if (bytes instanceof Error) {
	        fetchParams.controller.terminate(bytes);
	        return
	      }

	      // 7. Enqueue a Uint8Array wrapping an ArrayBuffer containing bytes
	      // into stream.
	      fetchParams.controller.controller.enqueue(new Uint8Array(bytes));

	      // 8. If stream is errored, then terminate the ongoing fetch.
	      if (isErrored(stream)) {
	        fetchParams.controller.terminate();
	        return
	      }

	      // 9. If stream doesn’t need more data ask the user agent to suspend
	      // the ongoing fetch.
	      if (!fetchParams.controller.controller.desiredSize) {
	        return
	      }
	    }
	  };

	  //    2. If aborted, then:
	  function onAborted (reason) {
	    // 2. If fetchParams is aborted, then:
	    if (isAborted(fetchParams)) {
	      // 1. Set response’s aborted flag.
	      response.aborted = true;

	      // 2. If stream is readable, error stream with an "AbortError" DOMException.
	      if (isReadable(stream)) {
	        fetchParams.controller.controller.error(
	          new DOMException('The operation was aborted.', 'AbortError')
	        );
	      }
	    } else {
	      // 3. Otherwise, if stream is readable, error stream with a TypeError.
	      if (isReadable(stream)) {
	        fetchParams.controller.controller.error(new TypeError('terminated', {
	          cause: reason instanceof Error ? reason : undefined
	        }));
	      }
	    }

	    // 4. If connection uses HTTP/2, then transmit an RST_STREAM frame.
	    // 5. Otherwise, the user agent should close connection unless it would be bad for performance to do so.
	    fetchParams.controller.connection.destroy();
	  }

	  // 20. Return response.
	  return response

	  async function dispatch ({ body }) {
	    const url = requestCurrentURL(request);
	    return new Promise((resolve, reject) => fetchParams.controller.dispatcher.dispatch(
	      {
	        path: url.pathname + url.search,
	        origin: url.origin,
	        method: request.method,
	        body: fetchParams.controller.dispatcher.isMockActive ? request.body && request.body.source : body,
	        headers: [...request.headersList].flat(),
	        maxRedirections: 0,
	        bodyTimeout: 300_000,
	        headersTimeout: 300_000
	      },
	      {
	        body: null,
	        abort: null,

	        onConnect (abort) {
	          // TODO (fix): Do we need connection here?
	          const { connection } = fetchParams.controller;

	          if (connection.destroyed) {
	            abort(new DOMException('The operation was aborted.', 'AbortError'));
	          } else {
	            fetchParams.controller.on('terminated', abort);
	            this.abort = connection.abort = abort;
	          }
	        },

	        onHeaders (status, headersList, resume, statusText) {
	          if (status < 200) {
	            return
	          }

	          let codings = [];

	          const headers = new Headers();
	          for (let n = 0; n < headersList.length; n += 2) {
	            const key = headersList[n + 0].toString();
	            const val = headersList[n + 1].toString();

	            if (key.toLowerCase() === 'content-encoding') {
	              codings = val.split(',').map((x) => x.trim());
	            }

	            headers.append(key, val);
	          }

	          this.body = new Readable({ read: resume });

	          const decoders = [];

	          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding
	          if (request.method !== 'HEAD' && request.method !== 'CONNECT' && !nullBodyStatus.includes(status)) {
	            for (const coding of codings) {
	              if (/(x-)?gzip/.test(coding)) {
	                decoders.push(zlib.createGunzip());
	              } else if (/(x-)?deflate/.test(coding)) {
	                decoders.push(zlib.createInflate());
	              } else if (coding === 'br') {
	                decoders.push(zlib.createBrotliDecompress());
	              } else {
	                decoders.length = 0;
	                break
	              }
	            }
	          }

	          resolve({
	            status,
	            statusText,
	            headersList: headers[kHeadersList],
	            body: decoders.length
	              ? pipeline(this.body, ...decoders, () => {})
	              : this.body.on('error', () => {})
	          });

	          return true
	        },

	        onData (chunk) {
	          if (fetchParams.controller.dump) {
	            return
	          }

	          // 1. If one or more bytes have been transmitted from response’s
	          // message body, then:

	          //  1. Let bytes be the transmitted bytes.
	          const bytes = chunk;

	          //  2. Let codings be the result of extracting header list values
	          //  given `Content-Encoding` and response’s header list.
	          //  See pullAlgorithm.

	          //  3. Increase timingInfo’s encoded body size by bytes’s length.
	          timingInfo.encodedBodySize += bytes.byteLength;

	          //  4. See pullAlgorithm...

	          return this.body.push(bytes)
	        },

	        onComplete () {
	          if (this.abort) {
	            fetchParams.controller.off('terminated', this.abort);
	          }

	          fetchParams.controller.ended = true;

	          this.body.push(null);
	        },

	        onError (error) {
	          if (this.abort) {
	            fetchParams.controller.off('terminated', this.abort);
	          }

	          this.body?.destroy(error);

	          fetchParams.controller.terminate(error);

	          reject(error);
	        }
	      }
	    ))
	  }
	}

	fetch_1 = fetch;
	return fetch_1;
}

var Request$1;
var Response;
var Headers$1;
var fetch;
const Dispatcher = dispatcher;
const errors = errors$1;
const util = util$e;
const { InvalidArgumentError } = errors;
const api = api$1;
const { getGlobalDispatcher, setGlobalDispatcher } = global$1;

const nodeVersion = process.versions.node.split('.');
const nodeMajor = Number(nodeVersion[0]);
const nodeMinor = Number(nodeVersion[1]);

Object.assign(Dispatcher.prototype, api);

function makeDispatcher (fn) {
  return (url, opts, handler) => {
    if (typeof opts === 'function') {
      handler = opts;
      opts = null;
    }

    if (!url || (typeof url !== 'string' && typeof url !== 'object' && !(url instanceof URL))) {
      throw new InvalidArgumentError('invalid url')
    }

    if (opts != null && typeof opts !== 'object') {
      throw new InvalidArgumentError('invalid opts')
    }

    if (opts && opts.path != null) {
      if (typeof opts.path !== 'string') {
        throw new InvalidArgumentError('invalid opts.path')
      }

      url = new URL(opts.path, util.parseOrigin(url));
    } else {
      if (!opts) {
        opts = typeof url === 'object' ? url : {};
      }

      url = util.parseURL(url);
    }

    const { agent, dispatcher = getGlobalDispatcher() } = opts;

    if (agent) {
      throw new InvalidArgumentError('unsupported opts.agent. Did you mean opts.client?')
    }

    return fn.call(dispatcher, {
      ...opts,
      origin: url.origin,
      path: url.search ? `${url.pathname}${url.search}` : url.pathname,
      method: opts.method || (opts.body ? 'PUT' : 'GET')
    }, handler)
  }
}

if (nodeMajor > 16 || (nodeMajor === 16 && nodeMinor >= 5)) {
  let fetchImpl = null;
  fetch = async function fetch (resource) {
    if (!fetchImpl) {
      fetchImpl = requireFetch();
    }
    const dispatcher = (arguments[1] && arguments[1].dispatcher) || getGlobalDispatcher();
    return fetchImpl.apply(dispatcher, arguments)
  };
  Headers$1 = requireHeaders().Headers;
  Response = requireResponse().Response;
  Request$1 = requireRequest().Request;
  requireFormdata().FormData;
  requireFile().File;
}

makeDispatcher(api.request);
makeDispatcher(api.stream);
makeDispatcher(api.pipeline);
makeDispatcher(api.connect);
makeDispatcher(api.upgrade);

var ponyfill_es2018 = {exports: {}};

/**
 * web-streams-polyfill v3.2.1
 */

var hasRequiredPonyfill_es2018;

function requirePonyfill_es2018 () {
	if (hasRequiredPonyfill_es2018) return ponyfill_es2018.exports;
	hasRequiredPonyfill_es2018 = 1;
	(function (module, exports) {
		(function (global, factory) {
		    factory(exports) ;
		}(commonjsGlobal, (function (exports) {
		    /// <reference lib="es2015.symbol" />
		    const SymbolPolyfill = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ?
		        Symbol :
		        description => `Symbol(${description})`;

		    /// <reference lib="dom" />
		    function noop() {
		        return undefined;
		    }
		    function getGlobals() {
		        if (typeof self !== 'undefined') {
		            return self;
		        }
		        else if (typeof window !== 'undefined') {
		            return window;
		        }
		        else if (typeof commonjsGlobal !== 'undefined') {
		            return commonjsGlobal;
		        }
		        return undefined;
		    }
		    const globals = getGlobals();

		    function typeIsObject(x) {
		        return (typeof x === 'object' && x !== null) || typeof x === 'function';
		    }
		    const rethrowAssertionErrorRejection = noop;

		    const originalPromise = Promise;
		    const originalPromiseThen = Promise.prototype.then;
		    const originalPromiseResolve = Promise.resolve.bind(originalPromise);
		    const originalPromiseReject = Promise.reject.bind(originalPromise);
		    function newPromise(executor) {
		        return new originalPromise(executor);
		    }
		    function promiseResolvedWith(value) {
		        return originalPromiseResolve(value);
		    }
		    function promiseRejectedWith(reason) {
		        return originalPromiseReject(reason);
		    }
		    function PerformPromiseThen(promise, onFulfilled, onRejected) {
		        // There doesn't appear to be any way to correctly emulate the behaviour from JavaScript, so this is just an
		        // approximation.
		        return originalPromiseThen.call(promise, onFulfilled, onRejected);
		    }
		    function uponPromise(promise, onFulfilled, onRejected) {
		        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), undefined, rethrowAssertionErrorRejection);
		    }
		    function uponFulfillment(promise, onFulfilled) {
		        uponPromise(promise, onFulfilled);
		    }
		    function uponRejection(promise, onRejected) {
		        uponPromise(promise, undefined, onRejected);
		    }
		    function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
		        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
		    }
		    function setPromiseIsHandledToTrue(promise) {
		        PerformPromiseThen(promise, undefined, rethrowAssertionErrorRejection);
		    }
		    const queueMicrotask = (() => {
		        const globalQueueMicrotask = globals && globals.queueMicrotask;
		        if (typeof globalQueueMicrotask === 'function') {
		            return globalQueueMicrotask;
		        }
		        const resolvedPromise = promiseResolvedWith(undefined);
		        return (fn) => PerformPromiseThen(resolvedPromise, fn);
		    })();
		    function reflectCall(F, V, args) {
		        if (typeof F !== 'function') {
		            throw new TypeError('Argument is not a function');
		        }
		        return Function.prototype.apply.call(F, V, args);
		    }
		    function promiseCall(F, V, args) {
		        try {
		            return promiseResolvedWith(reflectCall(F, V, args));
		        }
		        catch (value) {
		            return promiseRejectedWith(value);
		        }
		    }

		    // Original from Chromium
		    // https://chromium.googlesource.com/chromium/src/+/0aee4434a4dba42a42abaea9bfbc0cd196a63bc1/third_party/blink/renderer/core/streams/SimpleQueue.js
		    const QUEUE_MAX_ARRAY_SIZE = 16384;
		    /**
		     * Simple queue structure.
		     *
		     * Avoids scalability issues with using a packed array directly by using
		     * multiple arrays in a linked list and keeping the array size bounded.
		     */
		    class SimpleQueue {
		        constructor() {
		            this._cursor = 0;
		            this._size = 0;
		            // _front and _back are always defined.
		            this._front = {
		                _elements: [],
		                _next: undefined
		            };
		            this._back = this._front;
		            // The cursor is used to avoid calling Array.shift().
		            // It contains the index of the front element of the array inside the
		            // front-most node. It is always in the range [0, QUEUE_MAX_ARRAY_SIZE).
		            this._cursor = 0;
		            // When there is only one node, size === elements.length - cursor.
		            this._size = 0;
		        }
		        get length() {
		            return this._size;
		        }
		        // For exception safety, this method is structured in order:
		        // 1. Read state
		        // 2. Calculate required state mutations
		        // 3. Perform state mutations
		        push(element) {
		            const oldBack = this._back;
		            let newBack = oldBack;
		            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
		                newBack = {
		                    _elements: [],
		                    _next: undefined
		                };
		            }
		            // push() is the mutation most likely to throw an exception, so it
		            // goes first.
		            oldBack._elements.push(element);
		            if (newBack !== oldBack) {
		                this._back = newBack;
		                oldBack._next = newBack;
		            }
		            ++this._size;
		        }
		        // Like push(), shift() follows the read -> calculate -> mutate pattern for
		        // exception safety.
		        shift() { // must not be called on an empty queue
		            const oldFront = this._front;
		            let newFront = oldFront;
		            const oldCursor = this._cursor;
		            let newCursor = oldCursor + 1;
		            const elements = oldFront._elements;
		            const element = elements[oldCursor];
		            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
		                newFront = oldFront._next;
		                newCursor = 0;
		            }
		            // No mutations before this point.
		            --this._size;
		            this._cursor = newCursor;
		            if (oldFront !== newFront) {
		                this._front = newFront;
		            }
		            // Permit shifted element to be garbage collected.
		            elements[oldCursor] = undefined;
		            return element;
		        }
		        // The tricky thing about forEach() is that it can be called
		        // re-entrantly. The queue may be mutated inside the callback. It is easy to
		        // see that push() within the callback has no negative effects since the end
		        // of the queue is checked for on every iteration. If shift() is called
		        // repeatedly within the callback then the next iteration may return an
		        // element that has been removed. In this case the callback will be called
		        // with undefined values until we either "catch up" with elements that still
		        // exist or reach the back of the queue.
		        forEach(callback) {
		            let i = this._cursor;
		            let node = this._front;
		            let elements = node._elements;
		            while (i !== elements.length || node._next !== undefined) {
		                if (i === elements.length) {
		                    node = node._next;
		                    elements = node._elements;
		                    i = 0;
		                    if (elements.length === 0) {
		                        break;
		                    }
		                }
		                callback(elements[i]);
		                ++i;
		            }
		        }
		        // Return the element that would be returned if shift() was called now,
		        // without modifying the queue.
		        peek() { // must not be called on an empty queue
		            const front = this._front;
		            const cursor = this._cursor;
		            return front._elements[cursor];
		        }
		    }

		    function ReadableStreamReaderGenericInitialize(reader, stream) {
		        reader._ownerReadableStream = stream;
		        stream._reader = reader;
		        if (stream._state === 'readable') {
		            defaultReaderClosedPromiseInitialize(reader);
		        }
		        else if (stream._state === 'closed') {
		            defaultReaderClosedPromiseInitializeAsResolved(reader);
		        }
		        else {
		            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
		        }
		    }
		    // A client of ReadableStreamDefaultReader and ReadableStreamBYOBReader may use these functions directly to bypass state
		    // check.
		    function ReadableStreamReaderGenericCancel(reader, reason) {
		        const stream = reader._ownerReadableStream;
		        return ReadableStreamCancel(stream, reason);
		    }
		    function ReadableStreamReaderGenericRelease(reader) {
		        if (reader._ownerReadableStream._state === 'readable') {
		            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
		        }
		        else {
		            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
		        }
		        reader._ownerReadableStream._reader = undefined;
		        reader._ownerReadableStream = undefined;
		    }
		    // Helper functions for the readers.
		    function readerLockException(name) {
		        return new TypeError('Cannot ' + name + ' a stream using a released reader');
		    }
		    // Helper functions for the ReadableStreamDefaultReader.
		    function defaultReaderClosedPromiseInitialize(reader) {
		        reader._closedPromise = newPromise((resolve, reject) => {
		            reader._closedPromise_resolve = resolve;
		            reader._closedPromise_reject = reject;
		        });
		    }
		    function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
		        defaultReaderClosedPromiseInitialize(reader);
		        defaultReaderClosedPromiseReject(reader, reason);
		    }
		    function defaultReaderClosedPromiseInitializeAsResolved(reader) {
		        defaultReaderClosedPromiseInitialize(reader);
		        defaultReaderClosedPromiseResolve(reader);
		    }
		    function defaultReaderClosedPromiseReject(reader, reason) {
		        if (reader._closedPromise_reject === undefined) {
		            return;
		        }
		        setPromiseIsHandledToTrue(reader._closedPromise);
		        reader._closedPromise_reject(reason);
		        reader._closedPromise_resolve = undefined;
		        reader._closedPromise_reject = undefined;
		    }
		    function defaultReaderClosedPromiseResetToRejected(reader, reason) {
		        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
		    }
		    function defaultReaderClosedPromiseResolve(reader) {
		        if (reader._closedPromise_resolve === undefined) {
		            return;
		        }
		        reader._closedPromise_resolve(undefined);
		        reader._closedPromise_resolve = undefined;
		        reader._closedPromise_reject = undefined;
		    }

		    const AbortSteps = SymbolPolyfill('[[AbortSteps]]');
		    const ErrorSteps = SymbolPolyfill('[[ErrorSteps]]');
		    const CancelSteps = SymbolPolyfill('[[CancelSteps]]');
		    const PullSteps = SymbolPolyfill('[[PullSteps]]');

		    /// <reference lib="es2015.core" />
		    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite#Polyfill
		    const NumberIsFinite = Number.isFinite || function (x) {
		        return typeof x === 'number' && isFinite(x);
		    };

		    /// <reference lib="es2015.core" />
		    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc#Polyfill
		    const MathTrunc = Math.trunc || function (v) {
		        return v < 0 ? Math.ceil(v) : Math.floor(v);
		    };

		    // https://heycam.github.io/webidl/#idl-dictionaries
		    function isDictionary(x) {
		        return typeof x === 'object' || typeof x === 'function';
		    }
		    function assertDictionary(obj, context) {
		        if (obj !== undefined && !isDictionary(obj)) {
		            throw new TypeError(`${context} is not an object.`);
		        }
		    }
		    // https://heycam.github.io/webidl/#idl-callback-functions
		    function assertFunction(x, context) {
		        if (typeof x !== 'function') {
		            throw new TypeError(`${context} is not a function.`);
		        }
		    }
		    // https://heycam.github.io/webidl/#idl-object
		    function isObject(x) {
		        return (typeof x === 'object' && x !== null) || typeof x === 'function';
		    }
		    function assertObject(x, context) {
		        if (!isObject(x)) {
		            throw new TypeError(`${context} is not an object.`);
		        }
		    }
		    function assertRequiredArgument(x, position, context) {
		        if (x === undefined) {
		            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
		        }
		    }
		    function assertRequiredField(x, field, context) {
		        if (x === undefined) {
		            throw new TypeError(`${field} is required in '${context}'.`);
		        }
		    }
		    // https://heycam.github.io/webidl/#idl-unrestricted-double
		    function convertUnrestrictedDouble(value) {
		        return Number(value);
		    }
		    function censorNegativeZero(x) {
		        return x === 0 ? 0 : x;
		    }
		    function integerPart(x) {
		        return censorNegativeZero(MathTrunc(x));
		    }
		    // https://heycam.github.io/webidl/#idl-unsigned-long-long
		    function convertUnsignedLongLongWithEnforceRange(value, context) {
		        const lowerBound = 0;
		        const upperBound = Number.MAX_SAFE_INTEGER;
		        let x = Number(value);
		        x = censorNegativeZero(x);
		        if (!NumberIsFinite(x)) {
		            throw new TypeError(`${context} is not a finite number`);
		        }
		        x = integerPart(x);
		        if (x < lowerBound || x > upperBound) {
		            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
		        }
		        if (!NumberIsFinite(x) || x === 0) {
		            return 0;
		        }
		        // TODO Use BigInt if supported?
		        // let xBigInt = BigInt(integerPart(x));
		        // xBigInt = BigInt.asUintN(64, xBigInt);
		        // return Number(xBigInt);
		        return x;
		    }

		    function assertReadableStream(x, context) {
		        if (!IsReadableStream(x)) {
		            throw new TypeError(`${context} is not a ReadableStream.`);
		        }
		    }

		    // Abstract operations for the ReadableStream.
		    function AcquireReadableStreamDefaultReader(stream) {
		        return new ReadableStreamDefaultReader(stream);
		    }
		    // ReadableStream API exposed for controllers.
		    function ReadableStreamAddReadRequest(stream, readRequest) {
		        stream._reader._readRequests.push(readRequest);
		    }
		    function ReadableStreamFulfillReadRequest(stream, chunk, done) {
		        const reader = stream._reader;
		        const readRequest = reader._readRequests.shift();
		        if (done) {
		            readRequest._closeSteps();
		        }
		        else {
		            readRequest._chunkSteps(chunk);
		        }
		    }
		    function ReadableStreamGetNumReadRequests(stream) {
		        return stream._reader._readRequests.length;
		    }
		    function ReadableStreamHasDefaultReader(stream) {
		        const reader = stream._reader;
		        if (reader === undefined) {
		            return false;
		        }
		        if (!IsReadableStreamDefaultReader(reader)) {
		            return false;
		        }
		        return true;
		    }
		    /**
		     * A default reader vended by a {@link ReadableStream}.
		     *
		     * @public
		     */
		    class ReadableStreamDefaultReader {
		        constructor(stream) {
		            assertRequiredArgument(stream, 1, 'ReadableStreamDefaultReader');
		            assertReadableStream(stream, 'First parameter');
		            if (IsReadableStreamLocked(stream)) {
		                throw new TypeError('This stream has already been locked for exclusive reading by another reader');
		            }
		            ReadableStreamReaderGenericInitialize(this, stream);
		            this._readRequests = new SimpleQueue();
		        }
		        /**
		         * Returns a promise that will be fulfilled when the stream becomes closed,
		         * or rejected if the stream ever errors or the reader's lock is released before the stream finishes closing.
		         */
		        get closed() {
		            if (!IsReadableStreamDefaultReader(this)) {
		                return promiseRejectedWith(defaultReaderBrandCheckException('closed'));
		            }
		            return this._closedPromise;
		        }
		        /**
		         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
		         */
		        cancel(reason = undefined) {
		            if (!IsReadableStreamDefaultReader(this)) {
		                return promiseRejectedWith(defaultReaderBrandCheckException('cancel'));
		            }
		            if (this._ownerReadableStream === undefined) {
		                return promiseRejectedWith(readerLockException('cancel'));
		            }
		            return ReadableStreamReaderGenericCancel(this, reason);
		        }
		        /**
		         * Returns a promise that allows access to the next chunk from the stream's internal queue, if available.
		         *
		         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
		         */
		        read() {
		            if (!IsReadableStreamDefaultReader(this)) {
		                return promiseRejectedWith(defaultReaderBrandCheckException('read'));
		            }
		            if (this._ownerReadableStream === undefined) {
		                return promiseRejectedWith(readerLockException('read from'));
		            }
		            let resolvePromise;
		            let rejectPromise;
		            const promise = newPromise((resolve, reject) => {
		                resolvePromise = resolve;
		                rejectPromise = reject;
		            });
		            const readRequest = {
		                _chunkSteps: chunk => resolvePromise({ value: chunk, done: false }),
		                _closeSteps: () => resolvePromise({ value: undefined, done: true }),
		                _errorSteps: e => rejectPromise(e)
		            };
		            ReadableStreamDefaultReaderRead(this, readRequest);
		            return promise;
		        }
		        /**
		         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
		         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
		         * from now on; otherwise, the reader will appear closed.
		         *
		         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
		         * the reader's {@link ReadableStreamDefaultReader.read | read()} method has not yet been settled. Attempting to
		         * do so will throw a `TypeError` and leave the reader locked to the stream.
		         */
		        releaseLock() {
		            if (!IsReadableStreamDefaultReader(this)) {
		                throw defaultReaderBrandCheckException('releaseLock');
		            }
		            if (this._ownerReadableStream === undefined) {
		                return;
		            }
		            if (this._readRequests.length > 0) {
		                throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
		            }
		            ReadableStreamReaderGenericRelease(this);
		        }
		    }
		    Object.defineProperties(ReadableStreamDefaultReader.prototype, {
		        cancel: { enumerable: true },
		        read: { enumerable: true },
		        releaseLock: { enumerable: true },
		        closed: { enumerable: true }
		    });
		    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
		        Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
		            value: 'ReadableStreamDefaultReader',
		            configurable: true
		        });
		    }
		    // Abstract operations for the readers.
		    function IsReadableStreamDefaultReader(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_readRequests')) {
		            return false;
		        }
		        return x instanceof ReadableStreamDefaultReader;
		    }
		    function ReadableStreamDefaultReaderRead(reader, readRequest) {
		        const stream = reader._ownerReadableStream;
		        stream._disturbed = true;
		        if (stream._state === 'closed') {
		            readRequest._closeSteps();
		        }
		        else if (stream._state === 'errored') {
		            readRequest._errorSteps(stream._storedError);
		        }
		        else {
		            stream._readableStreamController[PullSteps](readRequest);
		        }
		    }
		    // Helper functions for the ReadableStreamDefaultReader.
		    function defaultReaderBrandCheckException(name) {
		        return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
		    }

		    /// <reference lib="es2018.asynciterable" />
		    /* eslint-disable @typescript-eslint/no-empty-function */
		    const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () { }).prototype);

		    /// <reference lib="es2018.asynciterable" />
		    class ReadableStreamAsyncIteratorImpl {
		        constructor(reader, preventCancel) {
		            this._ongoingPromise = undefined;
		            this._isFinished = false;
		            this._reader = reader;
		            this._preventCancel = preventCancel;
		        }
		        next() {
		            const nextSteps = () => this._nextSteps();
		            this._ongoingPromise = this._ongoingPromise ?
		                transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) :
		                nextSteps();
		            return this._ongoingPromise;
		        }
		        return(value) {
		            const returnSteps = () => this._returnSteps(value);
		            return this._ongoingPromise ?
		                transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) :
		                returnSteps();
		        }
		        _nextSteps() {
		            if (this._isFinished) {
		                return Promise.resolve({ value: undefined, done: true });
		            }
		            const reader = this._reader;
		            if (reader._ownerReadableStream === undefined) {
		                return promiseRejectedWith(readerLockException('iterate'));
		            }
		            let resolvePromise;
		            let rejectPromise;
		            const promise = newPromise((resolve, reject) => {
		                resolvePromise = resolve;
		                rejectPromise = reject;
		            });
		            const readRequest = {
		                _chunkSteps: chunk => {
		                    this._ongoingPromise = undefined;
		                    // This needs to be delayed by one microtask, otherwise we stop pulling too early which breaks a test.
		                    // FIXME Is this a bug in the specification, or in the test?
		                    queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
		                },
		                _closeSteps: () => {
		                    this._ongoingPromise = undefined;
		                    this._isFinished = true;
		                    ReadableStreamReaderGenericRelease(reader);
		                    resolvePromise({ value: undefined, done: true });
		                },
		                _errorSteps: reason => {
		                    this._ongoingPromise = undefined;
		                    this._isFinished = true;
		                    ReadableStreamReaderGenericRelease(reader);
		                    rejectPromise(reason);
		                }
		            };
		            ReadableStreamDefaultReaderRead(reader, readRequest);
		            return promise;
		        }
		        _returnSteps(value) {
		            if (this._isFinished) {
		                return Promise.resolve({ value, done: true });
		            }
		            this._isFinished = true;
		            const reader = this._reader;
		            if (reader._ownerReadableStream === undefined) {
		                return promiseRejectedWith(readerLockException('finish iterating'));
		            }
		            if (!this._preventCancel) {
		                const result = ReadableStreamReaderGenericCancel(reader, value);
		                ReadableStreamReaderGenericRelease(reader);
		                return transformPromiseWith(result, () => ({ value, done: true }));
		            }
		            ReadableStreamReaderGenericRelease(reader);
		            return promiseResolvedWith({ value, done: true });
		        }
		    }
		    const ReadableStreamAsyncIteratorPrototype = {
		        next() {
		            if (!IsReadableStreamAsyncIterator(this)) {
		                return promiseRejectedWith(streamAsyncIteratorBrandCheckException('next'));
		            }
		            return this._asyncIteratorImpl.next();
		        },
		        return(value) {
		            if (!IsReadableStreamAsyncIterator(this)) {
		                return promiseRejectedWith(streamAsyncIteratorBrandCheckException('return'));
		            }
		            return this._asyncIteratorImpl.return(value);
		        }
		    };
		    if (AsyncIteratorPrototype !== undefined) {
		        Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
		    }
		    // Abstract operations for the ReadableStream.
		    function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
		        const reader = AcquireReadableStreamDefaultReader(stream);
		        const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
		        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
		        iterator._asyncIteratorImpl = impl;
		        return iterator;
		    }
		    function IsReadableStreamAsyncIterator(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_asyncIteratorImpl')) {
		            return false;
		        }
		        try {
		            // noinspection SuspiciousTypeOfGuard
		            return x._asyncIteratorImpl instanceof
		                ReadableStreamAsyncIteratorImpl;
		        }
		        catch (_a) {
		            return false;
		        }
		    }
		    // Helper functions for the ReadableStream.
		    function streamAsyncIteratorBrandCheckException(name) {
		        return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
		    }

		    /// <reference lib="es2015.core" />
		    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#Polyfill
		    const NumberIsNaN = Number.isNaN || function (x) {
		        // eslint-disable-next-line no-self-compare
		        return x !== x;
		    };

		    function CreateArrayFromList(elements) {
		        // We use arrays to represent lists, so this is basically a no-op.
		        // Do a slice though just in case we happen to depend on the unique-ness.
		        return elements.slice();
		    }
		    function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
		        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
		    }
		    // Not implemented correctly
		    function TransferArrayBuffer(O) {
		        return O;
		    }
		    // Not implemented correctly
		    // eslint-disable-next-line @typescript-eslint/no-unused-vars
		    function IsDetachedBuffer(O) {
		        return false;
		    }
		    function ArrayBufferSlice(buffer, begin, end) {
		        // ArrayBuffer.prototype.slice is not available on IE10
		        // https://www.caniuse.com/mdn-javascript_builtins_arraybuffer_slice
		        if (buffer.slice) {
		            return buffer.slice(begin, end);
		        }
		        const length = end - begin;
		        const slice = new ArrayBuffer(length);
		        CopyDataBlockBytes(slice, 0, buffer, begin, length);
		        return slice;
		    }

		    function IsNonNegativeNumber(v) {
		        if (typeof v !== 'number') {
		            return false;
		        }
		        if (NumberIsNaN(v)) {
		            return false;
		        }
		        if (v < 0) {
		            return false;
		        }
		        return true;
		    }
		    function CloneAsUint8Array(O) {
		        const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
		        return new Uint8Array(buffer);
		    }

		    function DequeueValue(container) {
		        const pair = container._queue.shift();
		        container._queueTotalSize -= pair.size;
		        if (container._queueTotalSize < 0) {
		            container._queueTotalSize = 0;
		        }
		        return pair.value;
		    }
		    function EnqueueValueWithSize(container, value, size) {
		        if (!IsNonNegativeNumber(size) || size === Infinity) {
		            throw new RangeError('Size must be a finite, non-NaN, non-negative number.');
		        }
		        container._queue.push({ value, size });
		        container._queueTotalSize += size;
		    }
		    function PeekQueueValue(container) {
		        const pair = container._queue.peek();
		        return pair.value;
		    }
		    function ResetQueue(container) {
		        container._queue = new SimpleQueue();
		        container._queueTotalSize = 0;
		    }

		    /**
		     * A pull-into request in a {@link ReadableByteStreamController}.
		     *
		     * @public
		     */
		    class ReadableStreamBYOBRequest {
		        constructor() {
		            throw new TypeError('Illegal constructor');
		        }
		        /**
		         * Returns the view for writing in to, or `null` if the BYOB request has already been responded to.
		         */
		        get view() {
		            if (!IsReadableStreamBYOBRequest(this)) {
		                throw byobRequestBrandCheckException('view');
		            }
		            return this._view;
		        }
		        respond(bytesWritten) {
		            if (!IsReadableStreamBYOBRequest(this)) {
		                throw byobRequestBrandCheckException('respond');
		            }
		            assertRequiredArgument(bytesWritten, 1, 'respond');
		            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, 'First parameter');
		            if (this._associatedReadableByteStreamController === undefined) {
		                throw new TypeError('This BYOB request has been invalidated');
		            }
		            if (IsDetachedBuffer(this._view.buffer)) ;
		            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
		        }
		        respondWithNewView(view) {
		            if (!IsReadableStreamBYOBRequest(this)) {
		                throw byobRequestBrandCheckException('respondWithNewView');
		            }
		            assertRequiredArgument(view, 1, 'respondWithNewView');
		            if (!ArrayBuffer.isView(view)) {
		                throw new TypeError('You can only respond with array buffer views');
		            }
		            if (this._associatedReadableByteStreamController === undefined) {
		                throw new TypeError('This BYOB request has been invalidated');
		            }
		            if (IsDetachedBuffer(view.buffer)) ;
		            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
		        }
		    }
		    Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
		        respond: { enumerable: true },
		        respondWithNewView: { enumerable: true },
		        view: { enumerable: true }
		    });
		    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
		        Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
		            value: 'ReadableStreamBYOBRequest',
		            configurable: true
		        });
		    }
		    /**
		     * Allows control of a {@link ReadableStream | readable byte stream}'s state and internal queue.
		     *
		     * @public
		     */
		    class ReadableByteStreamController {
		        constructor() {
		            throw new TypeError('Illegal constructor');
		        }
		        /**
		         * Returns the current BYOB pull request, or `null` if there isn't one.
		         */
		        get byobRequest() {
		            if (!IsReadableByteStreamController(this)) {
		                throw byteStreamControllerBrandCheckException('byobRequest');
		            }
		            return ReadableByteStreamControllerGetBYOBRequest(this);
		        }
		        /**
		         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
		         * over-full. An underlying byte source ought to use this information to determine when and how to apply backpressure.
		         */
		        get desiredSize() {
		            if (!IsReadableByteStreamController(this)) {
		                throw byteStreamControllerBrandCheckException('desiredSize');
		            }
		            return ReadableByteStreamControllerGetDesiredSize(this);
		        }
		        /**
		         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
		         * the stream, but once those are read, the stream will become closed.
		         */
		        close() {
		            if (!IsReadableByteStreamController(this)) {
		                throw byteStreamControllerBrandCheckException('close');
		            }
		            if (this._closeRequested) {
		                throw new TypeError('The stream has already been closed; do not close it again!');
		            }
		            const state = this._controlledReadableByteStream._state;
		            if (state !== 'readable') {
		                throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
		            }
		            ReadableByteStreamControllerClose(this);
		        }
		        enqueue(chunk) {
		            if (!IsReadableByteStreamController(this)) {
		                throw byteStreamControllerBrandCheckException('enqueue');
		            }
		            assertRequiredArgument(chunk, 1, 'enqueue');
		            if (!ArrayBuffer.isView(chunk)) {
		                throw new TypeError('chunk must be an array buffer view');
		            }
		            if (chunk.byteLength === 0) {
		                throw new TypeError('chunk must have non-zero byteLength');
		            }
		            if (chunk.buffer.byteLength === 0) {
		                throw new TypeError(`chunk's buffer must have non-zero byteLength`);
		            }
		            if (this._closeRequested) {
		                throw new TypeError('stream is closed or draining');
		            }
		            const state = this._controlledReadableByteStream._state;
		            if (state !== 'readable') {
		                throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
		            }
		            ReadableByteStreamControllerEnqueue(this, chunk);
		        }
		        /**
		         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
		         */
		        error(e = undefined) {
		            if (!IsReadableByteStreamController(this)) {
		                throw byteStreamControllerBrandCheckException('error');
		            }
		            ReadableByteStreamControllerError(this, e);
		        }
		        /** @internal */
		        [CancelSteps](reason) {
		            ReadableByteStreamControllerClearPendingPullIntos(this);
		            ResetQueue(this);
		            const result = this._cancelAlgorithm(reason);
		            ReadableByteStreamControllerClearAlgorithms(this);
		            return result;
		        }
		        /** @internal */
		        [PullSteps](readRequest) {
		            const stream = this._controlledReadableByteStream;
		            if (this._queueTotalSize > 0) {
		                const entry = this._queue.shift();
		                this._queueTotalSize -= entry.byteLength;
		                ReadableByteStreamControllerHandleQueueDrain(this);
		                const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
		                readRequest._chunkSteps(view);
		                return;
		            }
		            const autoAllocateChunkSize = this._autoAllocateChunkSize;
		            if (autoAllocateChunkSize !== undefined) {
		                let buffer;
		                try {
		                    buffer = new ArrayBuffer(autoAllocateChunkSize);
		                }
		                catch (bufferE) {
		                    readRequest._errorSteps(bufferE);
		                    return;
		                }
		                const pullIntoDescriptor = {
		                    buffer,
		                    bufferByteLength: autoAllocateChunkSize,
		                    byteOffset: 0,
		                    byteLength: autoAllocateChunkSize,
		                    bytesFilled: 0,
		                    elementSize: 1,
		                    viewConstructor: Uint8Array,
		                    readerType: 'default'
		                };
		                this._pendingPullIntos.push(pullIntoDescriptor);
		            }
		            ReadableStreamAddReadRequest(stream, readRequest);
		            ReadableByteStreamControllerCallPullIfNeeded(this);
		        }
		    }
		    Object.defineProperties(ReadableByteStreamController.prototype, {
		        close: { enumerable: true },
		        enqueue: { enumerable: true },
		        error: { enumerable: true },
		        byobRequest: { enumerable: true },
		        desiredSize: { enumerable: true }
		    });
		    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
		        Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
		            value: 'ReadableByteStreamController',
		            configurable: true
		        });
		    }
		    // Abstract operations for the ReadableByteStreamController.
		    function IsReadableByteStreamController(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableByteStream')) {
		            return false;
		        }
		        return x instanceof ReadableByteStreamController;
		    }
		    function IsReadableStreamBYOBRequest(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_associatedReadableByteStreamController')) {
		            return false;
		        }
		        return x instanceof ReadableStreamBYOBRequest;
		    }
		    function ReadableByteStreamControllerCallPullIfNeeded(controller) {
		        const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
		        if (!shouldPull) {
		            return;
		        }
		        if (controller._pulling) {
		            controller._pullAgain = true;
		            return;
		        }
		        controller._pulling = true;
		        // TODO: Test controller argument
		        const pullPromise = controller._pullAlgorithm();
		        uponPromise(pullPromise, () => {
		            controller._pulling = false;
		            if (controller._pullAgain) {
		                controller._pullAgain = false;
		                ReadableByteStreamControllerCallPullIfNeeded(controller);
		            }
		        }, e => {
		            ReadableByteStreamControllerError(controller, e);
		        });
		    }
		    function ReadableByteStreamControllerClearPendingPullIntos(controller) {
		        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
		        controller._pendingPullIntos = new SimpleQueue();
		    }
		    function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
		        let done = false;
		        if (stream._state === 'closed') {
		            done = true;
		        }
		        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
		        if (pullIntoDescriptor.readerType === 'default') {
		            ReadableStreamFulfillReadRequest(stream, filledView, done);
		        }
		        else {
		            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
		        }
		    }
		    function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
		        const bytesFilled = pullIntoDescriptor.bytesFilled;
		        const elementSize = pullIntoDescriptor.elementSize;
		        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
		    }
		    function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
		        controller._queue.push({ buffer, byteOffset, byteLength });
		        controller._queueTotalSize += byteLength;
		    }
		    function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
		        const elementSize = pullIntoDescriptor.elementSize;
		        const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
		        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
		        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
		        const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
		        let totalBytesToCopyRemaining = maxBytesToCopy;
		        let ready = false;
		        if (maxAlignedBytes > currentAlignedBytes) {
		            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
		            ready = true;
		        }
		        const queue = controller._queue;
		        while (totalBytesToCopyRemaining > 0) {
		            const headOfQueue = queue.peek();
		            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
		            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
		            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
		            if (headOfQueue.byteLength === bytesToCopy) {
		                queue.shift();
		            }
		            else {
		                headOfQueue.byteOffset += bytesToCopy;
		                headOfQueue.byteLength -= bytesToCopy;
		            }
		            controller._queueTotalSize -= bytesToCopy;
		            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
		            totalBytesToCopyRemaining -= bytesToCopy;
		        }
		        return ready;
		    }
		    function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
		        pullIntoDescriptor.bytesFilled += size;
		    }
		    function ReadableByteStreamControllerHandleQueueDrain(controller) {
		        if (controller._queueTotalSize === 0 && controller._closeRequested) {
		            ReadableByteStreamControllerClearAlgorithms(controller);
		            ReadableStreamClose(controller._controlledReadableByteStream);
		        }
		        else {
		            ReadableByteStreamControllerCallPullIfNeeded(controller);
		        }
		    }
		    function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
		        if (controller._byobRequest === null) {
		            return;
		        }
		        controller._byobRequest._associatedReadableByteStreamController = undefined;
		        controller._byobRequest._view = null;
		        controller._byobRequest = null;
		    }
		    function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
		        while (controller._pendingPullIntos.length > 0) {
		            if (controller._queueTotalSize === 0) {
		                return;
		            }
		            const pullIntoDescriptor = controller._pendingPullIntos.peek();
		            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
		                ReadableByteStreamControllerShiftPendingPullInto(controller);
		                ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
		            }
		        }
		    }
		    function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
		        const stream = controller._controlledReadableByteStream;
		        let elementSize = 1;
		        if (view.constructor !== DataView) {
		            elementSize = view.constructor.BYTES_PER_ELEMENT;
		        }
		        const ctor = view.constructor;
		        // try {
		        const buffer = TransferArrayBuffer(view.buffer);
		        // } catch (e) {
		        //   readIntoRequest._errorSteps(e);
		        //   return;
		        // }
		        const pullIntoDescriptor = {
		            buffer,
		            bufferByteLength: buffer.byteLength,
		            byteOffset: view.byteOffset,
		            byteLength: view.byteLength,
		            bytesFilled: 0,
		            elementSize,
		            viewConstructor: ctor,
		            readerType: 'byob'
		        };
		        if (controller._pendingPullIntos.length > 0) {
		            controller._pendingPullIntos.push(pullIntoDescriptor);
		            // No ReadableByteStreamControllerCallPullIfNeeded() call since:
		            // - No change happens on desiredSize
		            // - The source has already been notified of that there's at least 1 pending read(view)
		            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
		            return;
		        }
		        if (stream._state === 'closed') {
		            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
		            readIntoRequest._closeSteps(emptyView);
		            return;
		        }
		        if (controller._queueTotalSize > 0) {
		            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
		                const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
		                ReadableByteStreamControllerHandleQueueDrain(controller);
		                readIntoRequest._chunkSteps(filledView);
		                return;
		            }
		            if (controller._closeRequested) {
		                const e = new TypeError('Insufficient bytes to fill elements in the given buffer');
		                ReadableByteStreamControllerError(controller, e);
		                readIntoRequest._errorSteps(e);
		                return;
		            }
		        }
		        controller._pendingPullIntos.push(pullIntoDescriptor);
		        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
		        ReadableByteStreamControllerCallPullIfNeeded(controller);
		    }
		    function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
		        const stream = controller._controlledReadableByteStream;
		        if (ReadableStreamHasBYOBReader(stream)) {
		            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
		                const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
		                ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
		            }
		        }
		    }
		    function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
		        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
		        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
		            return;
		        }
		        ReadableByteStreamControllerShiftPendingPullInto(controller);
		        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
		        if (remainderSize > 0) {
		            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
		            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
		            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
		        }
		        pullIntoDescriptor.bytesFilled -= remainderSize;
		        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
		        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
		    }
		    function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
		        const firstDescriptor = controller._pendingPullIntos.peek();
		        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
		        const state = controller._controlledReadableByteStream._state;
		        if (state === 'closed') {
		            ReadableByteStreamControllerRespondInClosedState(controller);
		        }
		        else {
		            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
		        }
		        ReadableByteStreamControllerCallPullIfNeeded(controller);
		    }
		    function ReadableByteStreamControllerShiftPendingPullInto(controller) {
		        const descriptor = controller._pendingPullIntos.shift();
		        return descriptor;
		    }
		    function ReadableByteStreamControllerShouldCallPull(controller) {
		        const stream = controller._controlledReadableByteStream;
		        if (stream._state !== 'readable') {
		            return false;
		        }
		        if (controller._closeRequested) {
		            return false;
		        }
		        if (!controller._started) {
		            return false;
		        }
		        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
		            return true;
		        }
		        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
		            return true;
		        }
		        const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
		        if (desiredSize > 0) {
		            return true;
		        }
		        return false;
		    }
		    function ReadableByteStreamControllerClearAlgorithms(controller) {
		        controller._pullAlgorithm = undefined;
		        controller._cancelAlgorithm = undefined;
		    }
		    // A client of ReadableByteStreamController may use these functions directly to bypass state check.
		    function ReadableByteStreamControllerClose(controller) {
		        const stream = controller._controlledReadableByteStream;
		        if (controller._closeRequested || stream._state !== 'readable') {
		            return;
		        }
		        if (controller._queueTotalSize > 0) {
		            controller._closeRequested = true;
		            return;
		        }
		        if (controller._pendingPullIntos.length > 0) {
		            const firstPendingPullInto = controller._pendingPullIntos.peek();
		            if (firstPendingPullInto.bytesFilled > 0) {
		                const e = new TypeError('Insufficient bytes to fill elements in the given buffer');
		                ReadableByteStreamControllerError(controller, e);
		                throw e;
		            }
		        }
		        ReadableByteStreamControllerClearAlgorithms(controller);
		        ReadableStreamClose(stream);
		    }
		    function ReadableByteStreamControllerEnqueue(controller, chunk) {
		        const stream = controller._controlledReadableByteStream;
		        if (controller._closeRequested || stream._state !== 'readable') {
		            return;
		        }
		        const buffer = chunk.buffer;
		        const byteOffset = chunk.byteOffset;
		        const byteLength = chunk.byteLength;
		        const transferredBuffer = TransferArrayBuffer(buffer);
		        if (controller._pendingPullIntos.length > 0) {
		            const firstPendingPullInto = controller._pendingPullIntos.peek();
		            if (IsDetachedBuffer(firstPendingPullInto.buffer)) ;
		            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
		        }
		        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
		        if (ReadableStreamHasDefaultReader(stream)) {
		            if (ReadableStreamGetNumReadRequests(stream) === 0) {
		                ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
		            }
		            else {
		                if (controller._pendingPullIntos.length > 0) {
		                    ReadableByteStreamControllerShiftPendingPullInto(controller);
		                }
		                const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
		                ReadableStreamFulfillReadRequest(stream, transferredView, false);
		            }
		        }
		        else if (ReadableStreamHasBYOBReader(stream)) {
		            // TODO: Ideally in this branch detaching should happen only if the buffer is not consumed fully.
		            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
		            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
		        }
		        else {
		            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
		        }
		        ReadableByteStreamControllerCallPullIfNeeded(controller);
		    }
		    function ReadableByteStreamControllerError(controller, e) {
		        const stream = controller._controlledReadableByteStream;
		        if (stream._state !== 'readable') {
		            return;
		        }
		        ReadableByteStreamControllerClearPendingPullIntos(controller);
		        ResetQueue(controller);
		        ReadableByteStreamControllerClearAlgorithms(controller);
		        ReadableStreamError(stream, e);
		    }
		    function ReadableByteStreamControllerGetBYOBRequest(controller) {
		        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
		            const firstDescriptor = controller._pendingPullIntos.peek();
		            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
		            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
		            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
		            controller._byobRequest = byobRequest;
		        }
		        return controller._byobRequest;
		    }
		    function ReadableByteStreamControllerGetDesiredSize(controller) {
		        const state = controller._controlledReadableByteStream._state;
		        if (state === 'errored') {
		            return null;
		        }
		        if (state === 'closed') {
		            return 0;
		        }
		        return controller._strategyHWM - controller._queueTotalSize;
		    }
		    function ReadableByteStreamControllerRespond(controller, bytesWritten) {
		        const firstDescriptor = controller._pendingPullIntos.peek();
		        const state = controller._controlledReadableByteStream._state;
		        if (state === 'closed') {
		            if (bytesWritten !== 0) {
		                throw new TypeError('bytesWritten must be 0 when calling respond() on a closed stream');
		            }
		        }
		        else {
		            if (bytesWritten === 0) {
		                throw new TypeError('bytesWritten must be greater than 0 when calling respond() on a readable stream');
		            }
		            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
		                throw new RangeError('bytesWritten out of range');
		            }
		        }
		        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
		        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
		    }
		    function ReadableByteStreamControllerRespondWithNewView(controller, view) {
		        const firstDescriptor = controller._pendingPullIntos.peek();
		        const state = controller._controlledReadableByteStream._state;
		        if (state === 'closed') {
		            if (view.byteLength !== 0) {
		                throw new TypeError('The view\'s length must be 0 when calling respondWithNewView() on a closed stream');
		            }
		        }
		        else {
		            if (view.byteLength === 0) {
		                throw new TypeError('The view\'s length must be greater than 0 when calling respondWithNewView() on a readable stream');
		            }
		        }
		        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
		            throw new RangeError('The region specified by view does not match byobRequest');
		        }
		        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
		            throw new RangeError('The buffer of view has different capacity than byobRequest');
		        }
		        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
		            throw new RangeError('The region specified by view is larger than byobRequest');
		        }
		        const viewByteLength = view.byteLength;
		        firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
		        ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
		    }
		    function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
		        controller._controlledReadableByteStream = stream;
		        controller._pullAgain = false;
		        controller._pulling = false;
		        controller._byobRequest = null;
		        // Need to set the slots so that the assert doesn't fire. In the spec the slots already exist implicitly.
		        controller._queue = controller._queueTotalSize = undefined;
		        ResetQueue(controller);
		        controller._closeRequested = false;
		        controller._started = false;
		        controller._strategyHWM = highWaterMark;
		        controller._pullAlgorithm = pullAlgorithm;
		        controller._cancelAlgorithm = cancelAlgorithm;
		        controller._autoAllocateChunkSize = autoAllocateChunkSize;
		        controller._pendingPullIntos = new SimpleQueue();
		        stream._readableStreamController = controller;
		        const startResult = startAlgorithm();
		        uponPromise(promiseResolvedWith(startResult), () => {
		            controller._started = true;
		            ReadableByteStreamControllerCallPullIfNeeded(controller);
		        }, r => {
		            ReadableByteStreamControllerError(controller, r);
		        });
		    }
		    function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
		        const controller = Object.create(ReadableByteStreamController.prototype);
		        let startAlgorithm = () => undefined;
		        let pullAlgorithm = () => promiseResolvedWith(undefined);
		        let cancelAlgorithm = () => promiseResolvedWith(undefined);
		        if (underlyingByteSource.start !== undefined) {
		            startAlgorithm = () => underlyingByteSource.start(controller);
		        }
		        if (underlyingByteSource.pull !== undefined) {
		            pullAlgorithm = () => underlyingByteSource.pull(controller);
		        }
		        if (underlyingByteSource.cancel !== undefined) {
		            cancelAlgorithm = reason => underlyingByteSource.cancel(reason);
		        }
		        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
		        if (autoAllocateChunkSize === 0) {
		            throw new TypeError('autoAllocateChunkSize must be greater than 0');
		        }
		        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
		    }
		    function SetUpReadableStreamBYOBRequest(request, controller, view) {
		        request._associatedReadableByteStreamController = controller;
		        request._view = view;
		    }
		    // Helper functions for the ReadableStreamBYOBRequest.
		    function byobRequestBrandCheckException(name) {
		        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
		    }
		    // Helper functions for the ReadableByteStreamController.
		    function byteStreamControllerBrandCheckException(name) {
		        return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
		    }

		    // Abstract operations for the ReadableStream.
		    function AcquireReadableStreamBYOBReader(stream) {
		        return new ReadableStreamBYOBReader(stream);
		    }
		    // ReadableStream API exposed for controllers.
		    function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
		        stream._reader._readIntoRequests.push(readIntoRequest);
		    }
		    function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
		        const reader = stream._reader;
		        const readIntoRequest = reader._readIntoRequests.shift();
		        if (done) {
		            readIntoRequest._closeSteps(chunk);
		        }
		        else {
		            readIntoRequest._chunkSteps(chunk);
		        }
		    }
		    function ReadableStreamGetNumReadIntoRequests(stream) {
		        return stream._reader._readIntoRequests.length;
		    }
		    function ReadableStreamHasBYOBReader(stream) {
		        const reader = stream._reader;
		        if (reader === undefined) {
		            return false;
		        }
		        if (!IsReadableStreamBYOBReader(reader)) {
		            return false;
		        }
		        return true;
		    }
		    /**
		     * A BYOB reader vended by a {@link ReadableStream}.
		     *
		     * @public
		     */
		    class ReadableStreamBYOBReader {
		        constructor(stream) {
		            assertRequiredArgument(stream, 1, 'ReadableStreamBYOBReader');
		            assertReadableStream(stream, 'First parameter');
		            if (IsReadableStreamLocked(stream)) {
		                throw new TypeError('This stream has already been locked for exclusive reading by another reader');
		            }
		            if (!IsReadableByteStreamController(stream._readableStreamController)) {
		                throw new TypeError('Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte ' +
		                    'source');
		            }
		            ReadableStreamReaderGenericInitialize(this, stream);
		            this._readIntoRequests = new SimpleQueue();
		        }
		        /**
		         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
		         * the reader's lock is released before the stream finishes closing.
		         */
		        get closed() {
		            if (!IsReadableStreamBYOBReader(this)) {
		                return promiseRejectedWith(byobReaderBrandCheckException('closed'));
		            }
		            return this._closedPromise;
		        }
		        /**
		         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
		         */
		        cancel(reason = undefined) {
		            if (!IsReadableStreamBYOBReader(this)) {
		                return promiseRejectedWith(byobReaderBrandCheckException('cancel'));
		            }
		            if (this._ownerReadableStream === undefined) {
		                return promiseRejectedWith(readerLockException('cancel'));
		            }
		            return ReadableStreamReaderGenericCancel(this, reason);
		        }
		        /**
		         * Attempts to reads bytes into view, and returns a promise resolved with the result.
		         *
		         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
		         */
		        read(view) {
		            if (!IsReadableStreamBYOBReader(this)) {
		                return promiseRejectedWith(byobReaderBrandCheckException('read'));
		            }
		            if (!ArrayBuffer.isView(view)) {
		                return promiseRejectedWith(new TypeError('view must be an array buffer view'));
		            }
		            if (view.byteLength === 0) {
		                return promiseRejectedWith(new TypeError('view must have non-zero byteLength'));
		            }
		            if (view.buffer.byteLength === 0) {
		                return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
		            }
		            if (IsDetachedBuffer(view.buffer)) ;
		            if (this._ownerReadableStream === undefined) {
		                return promiseRejectedWith(readerLockException('read from'));
		            }
		            let resolvePromise;
		            let rejectPromise;
		            const promise = newPromise((resolve, reject) => {
		                resolvePromise = resolve;
		                rejectPromise = reject;
		            });
		            const readIntoRequest = {
		                _chunkSteps: chunk => resolvePromise({ value: chunk, done: false }),
		                _closeSteps: chunk => resolvePromise({ value: chunk, done: true }),
		                _errorSteps: e => rejectPromise(e)
		            };
		            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
		            return promise;
		        }
		        /**
		         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
		         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
		         * from now on; otherwise, the reader will appear closed.
		         *
		         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
		         * the reader's {@link ReadableStreamBYOBReader.read | read()} method has not yet been settled. Attempting to
		         * do so will throw a `TypeError` and leave the reader locked to the stream.
		         */
		        releaseLock() {
		            if (!IsReadableStreamBYOBReader(this)) {
		                throw byobReaderBrandCheckException('releaseLock');
		            }
		            if (this._ownerReadableStream === undefined) {
		                return;
		            }
		            if (this._readIntoRequests.length > 0) {
		                throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
		            }
		            ReadableStreamReaderGenericRelease(this);
		        }
		    }
		    Object.defineProperties(ReadableStreamBYOBReader.prototype, {
		        cancel: { enumerable: true },
		        read: { enumerable: true },
		        releaseLock: { enumerable: true },
		        closed: { enumerable: true }
		    });
		    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
		        Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
		            value: 'ReadableStreamBYOBReader',
		            configurable: true
		        });
		    }
		    // Abstract operations for the readers.
		    function IsReadableStreamBYOBReader(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_readIntoRequests')) {
		            return false;
		        }
		        return x instanceof ReadableStreamBYOBReader;
		    }
		    function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
		        const stream = reader._ownerReadableStream;
		        stream._disturbed = true;
		        if (stream._state === 'errored') {
		            readIntoRequest._errorSteps(stream._storedError);
		        }
		        else {
		            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
		        }
		    }
		    // Helper functions for the ReadableStreamBYOBReader.
		    function byobReaderBrandCheckException(name) {
		        return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
		    }

		    function ExtractHighWaterMark(strategy, defaultHWM) {
		        const { highWaterMark } = strategy;
		        if (highWaterMark === undefined) {
		            return defaultHWM;
		        }
		        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
		            throw new RangeError('Invalid highWaterMark');
		        }
		        return highWaterMark;
		    }
		    function ExtractSizeAlgorithm(strategy) {
		        const { size } = strategy;
		        if (!size) {
		            return () => 1;
		        }
		        return size;
		    }

		    function convertQueuingStrategy(init, context) {
		        assertDictionary(init, context);
		        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
		        const size = init === null || init === void 0 ? void 0 : init.size;
		        return {
		            highWaterMark: highWaterMark === undefined ? undefined : convertUnrestrictedDouble(highWaterMark),
		            size: size === undefined ? undefined : convertQueuingStrategySize(size, `${context} has member 'size' that`)
		        };
		    }
		    function convertQueuingStrategySize(fn, context) {
		        assertFunction(fn, context);
		        return chunk => convertUnrestrictedDouble(fn(chunk));
		    }

		    function convertUnderlyingSink(original, context) {
		        assertDictionary(original, context);
		        const abort = original === null || original === void 0 ? void 0 : original.abort;
		        const close = original === null || original === void 0 ? void 0 : original.close;
		        const start = original === null || original === void 0 ? void 0 : original.start;
		        const type = original === null || original === void 0 ? void 0 : original.type;
		        const write = original === null || original === void 0 ? void 0 : original.write;
		        return {
		            abort: abort === undefined ?
		                undefined :
		                convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
		            close: close === undefined ?
		                undefined :
		                convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
		            start: start === undefined ?
		                undefined :
		                convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
		            write: write === undefined ?
		                undefined :
		                convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
		            type
		        };
		    }
		    function convertUnderlyingSinkAbortCallback(fn, original, context) {
		        assertFunction(fn, context);
		        return (reason) => promiseCall(fn, original, [reason]);
		    }
		    function convertUnderlyingSinkCloseCallback(fn, original, context) {
		        assertFunction(fn, context);
		        return () => promiseCall(fn, original, []);
		    }
		    function convertUnderlyingSinkStartCallback(fn, original, context) {
		        assertFunction(fn, context);
		        return (controller) => reflectCall(fn, original, [controller]);
		    }
		    function convertUnderlyingSinkWriteCallback(fn, original, context) {
		        assertFunction(fn, context);
		        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
		    }

		    function assertWritableStream(x, context) {
		        if (!IsWritableStream(x)) {
		            throw new TypeError(`${context} is not a WritableStream.`);
		        }
		    }

		    function isAbortSignal(value) {
		        if (typeof value !== 'object' || value === null) {
		            return false;
		        }
		        try {
		            return typeof value.aborted === 'boolean';
		        }
		        catch (_a) {
		            // AbortSignal.prototype.aborted throws if its brand check fails
		            return false;
		        }
		    }
		    const supportsAbortController = typeof AbortController === 'function';
		    /**
		     * Construct a new AbortController, if supported by the platform.
		     *
		     * @internal
		     */
		    function createAbortController() {
		        if (supportsAbortController) {
		            return new AbortController();
		        }
		        return undefined;
		    }

		    /**
		     * A writable stream represents a destination for data, into which you can write.
		     *
		     * @public
		     */
		    class WritableStream {
		        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
		            if (rawUnderlyingSink === undefined) {
		                rawUnderlyingSink = null;
		            }
		            else {
		                assertObject(rawUnderlyingSink, 'First parameter');
		            }
		            const strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
		            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, 'First parameter');
		            InitializeWritableStream(this);
		            const type = underlyingSink.type;
		            if (type !== undefined) {
		                throw new RangeError('Invalid type is specified');
		            }
		            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
		            const highWaterMark = ExtractHighWaterMark(strategy, 1);
		            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
		        }
		        /**
		         * Returns whether or not the writable stream is locked to a writer.
		         */
		        get locked() {
		            if (!IsWritableStream(this)) {
		                throw streamBrandCheckException$2('locked');
		            }
		            return IsWritableStreamLocked(this);
		        }
		        /**
		         * Aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be
		         * immediately moved to an errored state, with any queued-up writes discarded. This will also execute any abort
		         * mechanism of the underlying sink.
		         *
		         * The returned promise will fulfill if the stream shuts down successfully, or reject if the underlying sink signaled
		         * that there was an error doing so. Additionally, it will reject with a `TypeError` (without attempting to cancel
		         * the stream) if the stream is currently locked.
		         */
		        abort(reason = undefined) {
		            if (!IsWritableStream(this)) {
		                return promiseRejectedWith(streamBrandCheckException$2('abort'));
		            }
		            if (IsWritableStreamLocked(this)) {
		                return promiseRejectedWith(new TypeError('Cannot abort a stream that already has a writer'));
		            }
		            return WritableStreamAbort(this, reason);
		        }
		        /**
		         * Closes the stream. The underlying sink will finish processing any previously-written chunks, before invoking its
		         * close behavior. During this time any further attempts to write will fail (without erroring the stream).
		         *
		         * The method returns a promise that will fulfill if all remaining chunks are successfully written and the stream
		         * successfully closes, or rejects if an error is encountered during this process. Additionally, it will reject with
		         * a `TypeError` (without attempting to cancel the stream) if the stream is currently locked.
		         */
		        close() {
		            if (!IsWritableStream(this)) {
		                return promiseRejectedWith(streamBrandCheckException$2('close'));
		            }
		            if (IsWritableStreamLocked(this)) {
		                return promiseRejectedWith(new TypeError('Cannot close a stream that already has a writer'));
		            }
		            if (WritableStreamCloseQueuedOrInFlight(this)) {
		                return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
		            }
		            return WritableStreamClose(this);
		        }
		        /**
		         * Creates a {@link WritableStreamDefaultWriter | writer} and locks the stream to the new writer. While the stream
		         * is locked, no other writer can be acquired until this one is released.
		         *
		         * This functionality is especially useful for creating abstractions that desire the ability to write to a stream
		         * without interruption or interleaving. By getting a writer for the stream, you can ensure nobody else can write at
		         * the same time, which would cause the resulting written data to be unpredictable and probably useless.
		         */
		        getWriter() {
		            if (!IsWritableStream(this)) {
		                throw streamBrandCheckException$2('getWriter');
		            }
		            return AcquireWritableStreamDefaultWriter(this);
		        }
		    }
		    Object.defineProperties(WritableStream.prototype, {
		        abort: { enumerable: true },
		        close: { enumerable: true },
		        getWriter: { enumerable: true },
		        locked: { enumerable: true }
		    });
		    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
		        Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
		            value: 'WritableStream',
		            configurable: true
		        });
		    }
		    // Abstract operations for the WritableStream.
		    function AcquireWritableStreamDefaultWriter(stream) {
		        return new WritableStreamDefaultWriter(stream);
		    }
		    // Throws if and only if startAlgorithm throws.
		    function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
		        const stream = Object.create(WritableStream.prototype);
		        InitializeWritableStream(stream);
		        const controller = Object.create(WritableStreamDefaultController.prototype);
		        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
		        return stream;
		    }
		    function InitializeWritableStream(stream) {
		        stream._state = 'writable';
		        // The error that will be reported by new method calls once the state becomes errored. Only set when [[state]] is
		        // 'erroring' or 'errored'. May be set to an undefined value.
		        stream._storedError = undefined;
		        stream._writer = undefined;
		        // Initialize to undefined first because the constructor of the controller checks this
		        // variable to validate the caller.
		        stream._writableStreamController = undefined;
		        // This queue is placed here instead of the writer class in order to allow for passing a writer to the next data
		        // producer without waiting for the queued writes to finish.
		        stream._writeRequests = new SimpleQueue();
		        // Write requests are removed from _writeRequests when write() is called on the underlying sink. This prevents
		        // them from being erroneously rejected on error. If a write() call is in-flight, the request is stored here.
		        stream._inFlightWriteRequest = undefined;
		        // The promise that was returned from writer.close(). Stored here because it may be fulfilled after the writer
		        // has been detached.
		        stream._closeRequest = undefined;
		        // Close request is removed from _closeRequest when close() is called on the underlying sink. This prevents it
		        // from being erroneously rejected on error. If a close() call is in-flight, the request is stored here.
		        stream._inFlightCloseRequest = undefined;
		        // The promise that was returned from writer.abort(). This may also be fulfilled after the writer has detached.
		        stream._pendingAbortRequest = undefined;
		        // The backpressure signal set by the controller.
		        stream._backpressure = false;
		    }
		    function IsWritableStream(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_writableStreamController')) {
		            return false;
		        }
		        return x instanceof WritableStream;
		    }
		    function IsWritableStreamLocked(stream) {
		        if (stream._writer === undefined) {
		            return false;
		        }
		        return true;
		    }
		    function WritableStreamAbort(stream, reason) {
		        var _a;
		        if (stream._state === 'closed' || stream._state === 'errored') {
		            return promiseResolvedWith(undefined);
		        }
		        stream._writableStreamController._abortReason = reason;
		        (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
		        // TypeScript narrows the type of `stream._state` down to 'writable' | 'erroring',
		        // but it doesn't know that signaling abort runs author code that might have changed the state.
		        // Widen the type again by casting to WritableStreamState.
		        const state = stream._state;
		        if (state === 'closed' || state === 'errored') {
		            return promiseResolvedWith(undefined);
		        }
		        if (stream._pendingAbortRequest !== undefined) {
		            return stream._pendingAbortRequest._promise;
		        }
		        let wasAlreadyErroring = false;
		        if (state === 'erroring') {
		            wasAlreadyErroring = true;
		            // reason will not be used, so don't keep a reference to it.
		            reason = undefined;
		        }
		        const promise = newPromise((resolve, reject) => {
		            stream._pendingAbortRequest = {
		                _promise: undefined,
		                _resolve: resolve,
		                _reject: reject,
		                _reason: reason,
		                _wasAlreadyErroring: wasAlreadyErroring
		            };
		        });
		        stream._pendingAbortRequest._promise = promise;
		        if (!wasAlreadyErroring) {
		            WritableStreamStartErroring(stream, reason);
		        }
		        return promise;
		    }
		    function WritableStreamClose(stream) {
		        const state = stream._state;
		        if (state === 'closed' || state === 'errored') {
		            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
		        }
		        const promise = newPromise((resolve, reject) => {
		            const closeRequest = {
		                _resolve: resolve,
		                _reject: reject
		            };
		            stream._closeRequest = closeRequest;
		        });
		        const writer = stream._writer;
		        if (writer !== undefined && stream._backpressure && state === 'writable') {
		            defaultWriterReadyPromiseResolve(writer);
		        }
		        WritableStreamDefaultControllerClose(stream._writableStreamController);
		        return promise;
		    }
		    // WritableStream API exposed for controllers.
		    function WritableStreamAddWriteRequest(stream) {
		        const promise = newPromise((resolve, reject) => {
		            const writeRequest = {
		                _resolve: resolve,
		                _reject: reject
		            };
		            stream._writeRequests.push(writeRequest);
		        });
		        return promise;
		    }
		    function WritableStreamDealWithRejection(stream, error) {
		        const state = stream._state;
		        if (state === 'writable') {
		            WritableStreamStartErroring(stream, error);
		            return;
		        }
		        WritableStreamFinishErroring(stream);
		    }
		    function WritableStreamStartErroring(stream, reason) {
		        const controller = stream._writableStreamController;
		        stream._state = 'erroring';
		        stream._storedError = reason;
		        const writer = stream._writer;
		        if (writer !== undefined) {
		            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
		        }
		        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
		            WritableStreamFinishErroring(stream);
		        }
		    }
		    function WritableStreamFinishErroring(stream) {
		        stream._state = 'errored';
		        stream._writableStreamController[ErrorSteps]();
		        const storedError = stream._storedError;
		        stream._writeRequests.forEach(writeRequest => {
		            writeRequest._reject(storedError);
		        });
		        stream._writeRequests = new SimpleQueue();
		        if (stream._pendingAbortRequest === undefined) {
		            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
		            return;
		        }
		        const abortRequest = stream._pendingAbortRequest;
		        stream._pendingAbortRequest = undefined;
		        if (abortRequest._wasAlreadyErroring) {
		            abortRequest._reject(storedError);
		            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
		            return;
		        }
		        const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
		        uponPromise(promise, () => {
		            abortRequest._resolve();
		            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
		        }, (reason) => {
		            abortRequest._reject(reason);
		            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
		        });
		    }
		    function WritableStreamFinishInFlightWrite(stream) {
		        stream._inFlightWriteRequest._resolve(undefined);
		        stream._inFlightWriteRequest = undefined;
		    }
		    function WritableStreamFinishInFlightWriteWithError(stream, error) {
		        stream._inFlightWriteRequest._reject(error);
		        stream._inFlightWriteRequest = undefined;
		        WritableStreamDealWithRejection(stream, error);
		    }
		    function WritableStreamFinishInFlightClose(stream) {
		        stream._inFlightCloseRequest._resolve(undefined);
		        stream._inFlightCloseRequest = undefined;
		        const state = stream._state;
		        if (state === 'erroring') {
		            // The error was too late to do anything, so it is ignored.
		            stream._storedError = undefined;
		            if (stream._pendingAbortRequest !== undefined) {
		                stream._pendingAbortRequest._resolve();
		                stream._pendingAbortRequest = undefined;
		            }
		        }
		        stream._state = 'closed';
		        const writer = stream._writer;
		        if (writer !== undefined) {
		            defaultWriterClosedPromiseResolve(writer);
		        }
		    }
		    function WritableStreamFinishInFlightCloseWithError(stream, error) {
		        stream._inFlightCloseRequest._reject(error);
		        stream._inFlightCloseRequest = undefined;
		        // Never execute sink abort() after sink close().
		        if (stream._pendingAbortRequest !== undefined) {
		            stream._pendingAbortRequest._reject(error);
		            stream._pendingAbortRequest = undefined;
		        }
		        WritableStreamDealWithRejection(stream, error);
		    }
		    // TODO(ricea): Fix alphabetical order.
		    function WritableStreamCloseQueuedOrInFlight(stream) {
		        if (stream._closeRequest === undefined && stream._inFlightCloseRequest === undefined) {
		            return false;
		        }
		        return true;
		    }
		    function WritableStreamHasOperationMarkedInFlight(stream) {
		        if (stream._inFlightWriteRequest === undefined && stream._inFlightCloseRequest === undefined) {
		            return false;
		        }
		        return true;
		    }
		    function WritableStreamMarkCloseRequestInFlight(stream) {
		        stream._inFlightCloseRequest = stream._closeRequest;
		        stream._closeRequest = undefined;
		    }
		    function WritableStreamMarkFirstWriteRequestInFlight(stream) {
		        stream._inFlightWriteRequest = stream._writeRequests.shift();
		    }
		    function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
		        if (stream._closeRequest !== undefined) {
		            stream._closeRequest._reject(stream._storedError);
		            stream._closeRequest = undefined;
		        }
		        const writer = stream._writer;
		        if (writer !== undefined) {
		            defaultWriterClosedPromiseReject(writer, stream._storedError);
		        }
		    }
		    function WritableStreamUpdateBackpressure(stream, backpressure) {
		        const writer = stream._writer;
		        if (writer !== undefined && backpressure !== stream._backpressure) {
		            if (backpressure) {
		                defaultWriterReadyPromiseReset(writer);
		            }
		            else {
		                defaultWriterReadyPromiseResolve(writer);
		            }
		        }
		        stream._backpressure = backpressure;
		    }
		    /**
		     * A default writer vended by a {@link WritableStream}.
		     *
		     * @public
		     */
		    class WritableStreamDefaultWriter {
		        constructor(stream) {
		            assertRequiredArgument(stream, 1, 'WritableStreamDefaultWriter');
		            assertWritableStream(stream, 'First parameter');
		            if (IsWritableStreamLocked(stream)) {
		                throw new TypeError('This stream has already been locked for exclusive writing by another writer');
		            }
		            this._ownerWritableStream = stream;
		            stream._writer = this;
		            const state = stream._state;
		            if (state === 'writable') {
		                if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
		                    defaultWriterReadyPromiseInitialize(this);
		                }
		                else {
		                    defaultWriterReadyPromiseInitializeAsResolved(this);
		                }
		                defaultWriterClosedPromiseInitialize(this);
		            }
		            else if (state === 'erroring') {
		                defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
		                defaultWriterClosedPromiseInitialize(this);
		            }
		            else if (state === 'closed') {
		                defaultWriterReadyPromiseInitializeAsResolved(this);
		                defaultWriterClosedPromiseInitializeAsResolved(this);
		            }
		            else {
		                const storedError = stream._storedError;
		                defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
		                defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
		            }
		        }
		        /**
		         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
		         * the writer’s lock is released before the stream finishes closing.
		         */
		        get closed() {
		            if (!IsWritableStreamDefaultWriter(this)) {
		                return promiseRejectedWith(defaultWriterBrandCheckException('closed'));
		            }
		            return this._closedPromise;
		        }
		        /**
		         * Returns the desired size to fill the stream’s internal queue. It can be negative, if the queue is over-full.
		         * A producer can use this information to determine the right amount of data to write.
		         *
		         * It will be `null` if the stream cannot be successfully written to (due to either being errored, or having an abort
		         * queued up). It will return zero if the stream is closed. And the getter will throw an exception if invoked when
		         * the writer’s lock is released.
		         */
		        get desiredSize() {
		            if (!IsWritableStreamDefaultWriter(this)) {
		                throw defaultWriterBrandCheckException('desiredSize');
		            }
		            if (this._ownerWritableStream === undefined) {
		                throw defaultWriterLockException('desiredSize');
		            }
		            return WritableStreamDefaultWriterGetDesiredSize(this);
		        }
		        /**
		         * Returns a promise that will be fulfilled when the desired size to fill the stream’s internal queue transitions
		         * from non-positive to positive, signaling that it is no longer applying backpressure. Once the desired size dips
		         * back to zero or below, the getter will return a new promise that stays pending until the next transition.
		         *
		         * If the stream becomes errored or aborted, or the writer’s lock is released, the returned promise will become
		         * rejected.
		         */
		        get ready() {
		            if (!IsWritableStreamDefaultWriter(this)) {
		                return promiseRejectedWith(defaultWriterBrandCheckException('ready'));
		            }
		            return this._readyPromise;
		        }
		        /**
		         * If the reader is active, behaves the same as {@link WritableStream.abort | stream.abort(reason)}.
		         */
		        abort(reason = undefined) {
		            if (!IsWritableStreamDefaultWriter(this)) {
		                return promiseRejectedWith(defaultWriterBrandCheckException('abort'));
		            }
		            if (this._ownerWritableStream === undefined) {
		                return promiseRejectedWith(defaultWriterLockException('abort'));
		            }
		            return WritableStreamDefaultWriterAbort(this, reason);
		        }
		        /**
		         * If the reader is active, behaves the same as {@link WritableStream.close | stream.close()}.
		         */
		        close() {
		            if (!IsWritableStreamDefaultWriter(this)) {
		                return promiseRejectedWith(defaultWriterBrandCheckException('close'));
		            }
		            const stream = this._ownerWritableStream;
		            if (stream === undefined) {
		                return promiseRejectedWith(defaultWriterLockException('close'));
		            }
		            if (WritableStreamCloseQueuedOrInFlight(stream)) {
		                return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
		            }
		            return WritableStreamDefaultWriterClose(this);
		        }
		        /**
		         * Releases the writer’s lock on the corresponding stream. After the lock is released, the writer is no longer active.
		         * If the associated stream is errored when the lock is released, the writer will appear errored in the same way from
		         * now on; otherwise, the writer will appear closed.
		         *
		         * Note that the lock can still be released even if some ongoing writes have not yet finished (i.e. even if the
		         * promises returned from previous calls to {@link WritableStreamDefaultWriter.write | write()} have not yet settled).
		         * It’s not necessary to hold the lock on the writer for the duration of the write; the lock instead simply prevents
		         * other producers from writing in an interleaved manner.
		         */
		        releaseLock() {
		            if (!IsWritableStreamDefaultWriter(this)) {
		                throw defaultWriterBrandCheckException('releaseLock');
		            }
		            const stream = this._ownerWritableStream;
		            if (stream === undefined) {
		                return;
		            }
		            WritableStreamDefaultWriterRelease(this);
		        }
		        write(chunk = undefined) {
		            if (!IsWritableStreamDefaultWriter(this)) {
		                return promiseRejectedWith(defaultWriterBrandCheckException('write'));
		            }
		            if (this._ownerWritableStream === undefined) {
		                return promiseRejectedWith(defaultWriterLockException('write to'));
		            }
		            return WritableStreamDefaultWriterWrite(this, chunk);
		        }
		    }
		    Object.defineProperties(WritableStreamDefaultWriter.prototype, {
		        abort: { enumerable: true },
		        close: { enumerable: true },
		        releaseLock: { enumerable: true },
		        write: { enumerable: true },
		        closed: { enumerable: true },
		        desiredSize: { enumerable: true },
		        ready: { enumerable: true }
		    });
		    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
		        Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
		            value: 'WritableStreamDefaultWriter',
		            configurable: true
		        });
		    }
		    // Abstract operations for the WritableStreamDefaultWriter.
		    function IsWritableStreamDefaultWriter(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_ownerWritableStream')) {
		            return false;
		        }
		        return x instanceof WritableStreamDefaultWriter;
		    }
		    // A client of WritableStreamDefaultWriter may use these functions directly to bypass state check.
		    function WritableStreamDefaultWriterAbort(writer, reason) {
		        const stream = writer._ownerWritableStream;
		        return WritableStreamAbort(stream, reason);
		    }
		    function WritableStreamDefaultWriterClose(writer) {
		        const stream = writer._ownerWritableStream;
		        return WritableStreamClose(stream);
		    }
		    function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
		        const stream = writer._ownerWritableStream;
		        const state = stream._state;
		        if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
		            return promiseResolvedWith(undefined);
		        }
		        if (state === 'errored') {
		            return promiseRejectedWith(stream._storedError);
		        }
		        return WritableStreamDefaultWriterClose(writer);
		    }
		    function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
		        if (writer._closedPromiseState === 'pending') {
		            defaultWriterClosedPromiseReject(writer, error);
		        }
		        else {
		            defaultWriterClosedPromiseResetToRejected(writer, error);
		        }
		    }
		    function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
		        if (writer._readyPromiseState === 'pending') {
		            defaultWriterReadyPromiseReject(writer, error);
		        }
		        else {
		            defaultWriterReadyPromiseResetToRejected(writer, error);
		        }
		    }
		    function WritableStreamDefaultWriterGetDesiredSize(writer) {
		        const stream = writer._ownerWritableStream;
		        const state = stream._state;
		        if (state === 'errored' || state === 'erroring') {
		            return null;
		        }
		        if (state === 'closed') {
		            return 0;
		        }
		        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
		    }
		    function WritableStreamDefaultWriterRelease(writer) {
		        const stream = writer._ownerWritableStream;
		        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
		        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
		        // The state transitions to "errored" before the sink abort() method runs, but the writer.closed promise is not
		        // rejected until afterwards. This means that simply testing state will not work.
		        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
		        stream._writer = undefined;
		        writer._ownerWritableStream = undefined;
		    }
		    function WritableStreamDefaultWriterWrite(writer, chunk) {
		        const stream = writer._ownerWritableStream;
		        const controller = stream._writableStreamController;
		        const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
		        if (stream !== writer._ownerWritableStream) {
		            return promiseRejectedWith(defaultWriterLockException('write to'));
		        }
		        const state = stream._state;
		        if (state === 'errored') {
		            return promiseRejectedWith(stream._storedError);
		        }
		        if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
		            return promiseRejectedWith(new TypeError('The stream is closing or closed and cannot be written to'));
		        }
		        if (state === 'erroring') {
		            return promiseRejectedWith(stream._storedError);
		        }
		        const promise = WritableStreamAddWriteRequest(stream);
		        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
		        return promise;
		    }
		    const closeSentinel = {};
		    /**
		     * Allows control of a {@link WritableStream | writable stream}'s state and internal queue.
		     *
		     * @public
		     */
		    class WritableStreamDefaultController {
		        constructor() {
		            throw new TypeError('Illegal constructor');
		        }
		        /**
		         * The reason which was passed to `WritableStream.abort(reason)` when the stream was aborted.
		         *
		         * @deprecated
		         *  This property has been removed from the specification, see https://github.com/whatwg/streams/pull/1177.
		         *  Use {@link WritableStreamDefaultController.signal}'s `reason` instead.
		         */
		        get abortReason() {
		            if (!IsWritableStreamDefaultController(this)) {
		                throw defaultControllerBrandCheckException$2('abortReason');
		            }
		            return this._abortReason;
		        }
		        /**
		         * An `AbortSignal` that can be used to abort the pending write or close operation when the stream is aborted.
		         */
		        get signal() {
		            if (!IsWritableStreamDefaultController(this)) {
		                throw defaultControllerBrandCheckException$2('signal');
		            }
		            if (this._abortController === undefined) {
		                // Older browsers or older Node versions may not support `AbortController` or `AbortSignal`.
		                // We don't want to bundle and ship an `AbortController` polyfill together with our polyfill,
		                // so instead we only implement support for `signal` if we find a global `AbortController` constructor.
		                throw new TypeError('WritableStreamDefaultController.prototype.signal is not supported');
		            }
		            return this._abortController.signal;
		        }
		        /**
		         * Closes the controlled writable stream, making all future interactions with it fail with the given error `e`.
		         *
		         * This method is rarely used, since usually it suffices to return a rejected promise from one of the underlying
		         * sink's methods. However, it can be useful for suddenly shutting down a stream in response to an event outside the
		         * normal lifecycle of interactions with the underlying sink.
		         */
		        error(e = undefined) {
		            if (!IsWritableStreamDefaultController(this)) {
		                throw defaultControllerBrandCheckException$2('error');
		            }
		            const state = this._controlledWritableStream._state;
		            if (state !== 'writable') {
		                // The stream is closed, errored or will be soon. The sink can't do anything useful if it gets an error here, so
		                // just treat it as a no-op.
		                return;
		            }
		            WritableStreamDefaultControllerError(this, e);
		        }
		        /** @internal */
		        [AbortSteps](reason) {
		            const result = this._abortAlgorithm(reason);
		            WritableStreamDefaultControllerClearAlgorithms(this);
		            return result;
		        }
		        /** @internal */
		        [ErrorSteps]() {
		            ResetQueue(this);
		        }
		    }
		    Object.defineProperties(WritableStreamDefaultController.prototype, {
		        abortReason: { enumerable: true },
		        signal: { enumerable: true },
		        error: { enumerable: true }
		    });
		    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
		        Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
		            value: 'WritableStreamDefaultController',
		            configurable: true
		        });
		    }
		    // Abstract operations implementing interface required by the WritableStream.
		    function IsWritableStreamDefaultController(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_controlledWritableStream')) {
		            return false;
		        }
		        return x instanceof WritableStreamDefaultController;
		    }
		    function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
		        controller._controlledWritableStream = stream;
		        stream._writableStreamController = controller;
		        // Need to set the slots so that the assert doesn't fire. In the spec the slots already exist implicitly.
		        controller._queue = undefined;
		        controller._queueTotalSize = undefined;
		        ResetQueue(controller);
		        controller._abortReason = undefined;
		        controller._abortController = createAbortController();
		        controller._started = false;
		        controller._strategySizeAlgorithm = sizeAlgorithm;
		        controller._strategyHWM = highWaterMark;
		        controller._writeAlgorithm = writeAlgorithm;
		        controller._closeAlgorithm = closeAlgorithm;
		        controller._abortAlgorithm = abortAlgorithm;
		        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
		        WritableStreamUpdateBackpressure(stream, backpressure);
		        const startResult = startAlgorithm();
		        const startPromise = promiseResolvedWith(startResult);
		        uponPromise(startPromise, () => {
		            controller._started = true;
		            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
		        }, r => {
		            controller._started = true;
		            WritableStreamDealWithRejection(stream, r);
		        });
		    }
		    function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
		        const controller = Object.create(WritableStreamDefaultController.prototype);
		        let startAlgorithm = () => undefined;
		        let writeAlgorithm = () => promiseResolvedWith(undefined);
		        let closeAlgorithm = () => promiseResolvedWith(undefined);
		        let abortAlgorithm = () => promiseResolvedWith(undefined);
		        if (underlyingSink.start !== undefined) {
		            startAlgorithm = () => underlyingSink.start(controller);
		        }
		        if (underlyingSink.write !== undefined) {
		            writeAlgorithm = chunk => underlyingSink.write(chunk, controller);
		        }
		        if (underlyingSink.close !== undefined) {
		            closeAlgorithm = () => underlyingSink.close();
		        }
		        if (underlyingSink.abort !== undefined) {
		            abortAlgorithm = reason => underlyingSink.abort(reason);
		        }
		        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
		    }
		    // ClearAlgorithms may be called twice. Erroring the same stream in multiple ways will often result in redundant calls.
		    function WritableStreamDefaultControllerClearAlgorithms(controller) {
		        controller._writeAlgorithm = undefined;
		        controller._closeAlgorithm = undefined;
		        controller._abortAlgorithm = undefined;
		        controller._strategySizeAlgorithm = undefined;
		    }
		    function WritableStreamDefaultControllerClose(controller) {
		        EnqueueValueWithSize(controller, closeSentinel, 0);
		        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
		    }
		    function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
		        try {
		            return controller._strategySizeAlgorithm(chunk);
		        }
		        catch (chunkSizeE) {
		            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
		            return 1;
		        }
		    }
		    function WritableStreamDefaultControllerGetDesiredSize(controller) {
		        return controller._strategyHWM - controller._queueTotalSize;
		    }
		    function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
		        try {
		            EnqueueValueWithSize(controller, chunk, chunkSize);
		        }
		        catch (enqueueE) {
		            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
		            return;
		        }
		        const stream = controller._controlledWritableStream;
		        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === 'writable') {
		            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
		            WritableStreamUpdateBackpressure(stream, backpressure);
		        }
		        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
		    }
		    // Abstract operations for the WritableStreamDefaultController.
		    function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
		        const stream = controller._controlledWritableStream;
		        if (!controller._started) {
		            return;
		        }
		        if (stream._inFlightWriteRequest !== undefined) {
		            return;
		        }
		        const state = stream._state;
		        if (state === 'erroring') {
		            WritableStreamFinishErroring(stream);
		            return;
		        }
		        if (controller._queue.length === 0) {
		            return;
		        }
		        const value = PeekQueueValue(controller);
		        if (value === closeSentinel) {
		            WritableStreamDefaultControllerProcessClose(controller);
		        }
		        else {
		            WritableStreamDefaultControllerProcessWrite(controller, value);
		        }
		    }
		    function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
		        if (controller._controlledWritableStream._state === 'writable') {
		            WritableStreamDefaultControllerError(controller, error);
		        }
		    }
		    function WritableStreamDefaultControllerProcessClose(controller) {
		        const stream = controller._controlledWritableStream;
		        WritableStreamMarkCloseRequestInFlight(stream);
		        DequeueValue(controller);
		        const sinkClosePromise = controller._closeAlgorithm();
		        WritableStreamDefaultControllerClearAlgorithms(controller);
		        uponPromise(sinkClosePromise, () => {
		            WritableStreamFinishInFlightClose(stream);
		        }, reason => {
		            WritableStreamFinishInFlightCloseWithError(stream, reason);
		        });
		    }
		    function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
		        const stream = controller._controlledWritableStream;
		        WritableStreamMarkFirstWriteRequestInFlight(stream);
		        const sinkWritePromise = controller._writeAlgorithm(chunk);
		        uponPromise(sinkWritePromise, () => {
		            WritableStreamFinishInFlightWrite(stream);
		            const state = stream._state;
		            DequeueValue(controller);
		            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === 'writable') {
		                const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
		                WritableStreamUpdateBackpressure(stream, backpressure);
		            }
		            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
		        }, reason => {
		            if (stream._state === 'writable') {
		                WritableStreamDefaultControllerClearAlgorithms(controller);
		            }
		            WritableStreamFinishInFlightWriteWithError(stream, reason);
		        });
		    }
		    function WritableStreamDefaultControllerGetBackpressure(controller) {
		        const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
		        return desiredSize <= 0;
		    }
		    // A client of WritableStreamDefaultController may use these functions directly to bypass state check.
		    function WritableStreamDefaultControllerError(controller, error) {
		        const stream = controller._controlledWritableStream;
		        WritableStreamDefaultControllerClearAlgorithms(controller);
		        WritableStreamStartErroring(stream, error);
		    }
		    // Helper functions for the WritableStream.
		    function streamBrandCheckException$2(name) {
		        return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
		    }
		    // Helper functions for the WritableStreamDefaultController.
		    function defaultControllerBrandCheckException$2(name) {
		        return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
		    }
		    // Helper functions for the WritableStreamDefaultWriter.
		    function defaultWriterBrandCheckException(name) {
		        return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
		    }
		    function defaultWriterLockException(name) {
		        return new TypeError('Cannot ' + name + ' a stream using a released writer');
		    }
		    function defaultWriterClosedPromiseInitialize(writer) {
		        writer._closedPromise = newPromise((resolve, reject) => {
		            writer._closedPromise_resolve = resolve;
		            writer._closedPromise_reject = reject;
		            writer._closedPromiseState = 'pending';
		        });
		    }
		    function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
		        defaultWriterClosedPromiseInitialize(writer);
		        defaultWriterClosedPromiseReject(writer, reason);
		    }
		    function defaultWriterClosedPromiseInitializeAsResolved(writer) {
		        defaultWriterClosedPromiseInitialize(writer);
		        defaultWriterClosedPromiseResolve(writer);
		    }
		    function defaultWriterClosedPromiseReject(writer, reason) {
		        if (writer._closedPromise_reject === undefined) {
		            return;
		        }
		        setPromiseIsHandledToTrue(writer._closedPromise);
		        writer._closedPromise_reject(reason);
		        writer._closedPromise_resolve = undefined;
		        writer._closedPromise_reject = undefined;
		        writer._closedPromiseState = 'rejected';
		    }
		    function defaultWriterClosedPromiseResetToRejected(writer, reason) {
		        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
		    }
		    function defaultWriterClosedPromiseResolve(writer) {
		        if (writer._closedPromise_resolve === undefined) {
		            return;
		        }
		        writer._closedPromise_resolve(undefined);
		        writer._closedPromise_resolve = undefined;
		        writer._closedPromise_reject = undefined;
		        writer._closedPromiseState = 'resolved';
		    }
		    function defaultWriterReadyPromiseInitialize(writer) {
		        writer._readyPromise = newPromise((resolve, reject) => {
		            writer._readyPromise_resolve = resolve;
		            writer._readyPromise_reject = reject;
		        });
		        writer._readyPromiseState = 'pending';
		    }
		    function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
		        defaultWriterReadyPromiseInitialize(writer);
		        defaultWriterReadyPromiseReject(writer, reason);
		    }
		    function defaultWriterReadyPromiseInitializeAsResolved(writer) {
		        defaultWriterReadyPromiseInitialize(writer);
		        defaultWriterReadyPromiseResolve(writer);
		    }
		    function defaultWriterReadyPromiseReject(writer, reason) {
		        if (writer._readyPromise_reject === undefined) {
		            return;
		        }
		        setPromiseIsHandledToTrue(writer._readyPromise);
		        writer._readyPromise_reject(reason);
		        writer._readyPromise_resolve = undefined;
		        writer._readyPromise_reject = undefined;
		        writer._readyPromiseState = 'rejected';
		    }
		    function defaultWriterReadyPromiseReset(writer) {
		        defaultWriterReadyPromiseInitialize(writer);
		    }
		    function defaultWriterReadyPromiseResetToRejected(writer, reason) {
		        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
		    }
		    function defaultWriterReadyPromiseResolve(writer) {
		        if (writer._readyPromise_resolve === undefined) {
		            return;
		        }
		        writer._readyPromise_resolve(undefined);
		        writer._readyPromise_resolve = undefined;
		        writer._readyPromise_reject = undefined;
		        writer._readyPromiseState = 'fulfilled';
		    }

		    /// <reference lib="dom" />
		    const NativeDOMException = typeof DOMException !== 'undefined' ? DOMException : undefined;

		    /// <reference types="node" />
		    function isDOMExceptionConstructor(ctor) {
		        if (!(typeof ctor === 'function' || typeof ctor === 'object')) {
		            return false;
		        }
		        try {
		            new ctor();
		            return true;
		        }
		        catch (_a) {
		            return false;
		        }
		    }
		    function createDOMExceptionPolyfill() {
		        // eslint-disable-next-line no-shadow
		        const ctor = function DOMException(message, name) {
		            this.message = message || '';
		            this.name = name || 'Error';
		            if (Error.captureStackTrace) {
		                Error.captureStackTrace(this, this.constructor);
		            }
		        };
		        ctor.prototype = Object.create(Error.prototype);
		        Object.defineProperty(ctor.prototype, 'constructor', { value: ctor, writable: true, configurable: true });
		        return ctor;
		    }
		    // eslint-disable-next-line no-redeclare
		    const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();

		    function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
		        const reader = AcquireReadableStreamDefaultReader(source);
		        const writer = AcquireWritableStreamDefaultWriter(dest);
		        source._disturbed = true;
		        let shuttingDown = false;
		        // This is used to keep track of the spec's requirement that we wait for ongoing writes during shutdown.
		        let currentWrite = promiseResolvedWith(undefined);
		        return newPromise((resolve, reject) => {
		            let abortAlgorithm;
		            if (signal !== undefined) {
		                abortAlgorithm = () => {
		                    const error = new DOMException$1('Aborted', 'AbortError');
		                    const actions = [];
		                    if (!preventAbort) {
		                        actions.push(() => {
		                            if (dest._state === 'writable') {
		                                return WritableStreamAbort(dest, error);
		                            }
		                            return promiseResolvedWith(undefined);
		                        });
		                    }
		                    if (!preventCancel) {
		                        actions.push(() => {
		                            if (source._state === 'readable') {
		                                return ReadableStreamCancel(source, error);
		                            }
		                            return promiseResolvedWith(undefined);
		                        });
		                    }
		                    shutdownWithAction(() => Promise.all(actions.map(action => action())), true, error);
		                };
		                if (signal.aborted) {
		                    abortAlgorithm();
		                    return;
		                }
		                signal.addEventListener('abort', abortAlgorithm);
		            }
		            // Using reader and writer, read all chunks from this and write them to dest
		            // - Backpressure must be enforced
		            // - Shutdown must stop all activity
		            function pipeLoop() {
		                return newPromise((resolveLoop, rejectLoop) => {
		                    function next(done) {
		                        if (done) {
		                            resolveLoop();
		                        }
		                        else {
		                            // Use `PerformPromiseThen` instead of `uponPromise` to avoid
		                            // adding unnecessary `.catch(rethrowAssertionErrorRejection)` handlers
		                            PerformPromiseThen(pipeStep(), next, rejectLoop);
		                        }
		                    }
		                    next(false);
		                });
		            }
		            function pipeStep() {
		                if (shuttingDown) {
		                    return promiseResolvedWith(true);
		                }
		                return PerformPromiseThen(writer._readyPromise, () => {
		                    return newPromise((resolveRead, rejectRead) => {
		                        ReadableStreamDefaultReaderRead(reader, {
		                            _chunkSteps: chunk => {
		                                currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), undefined, noop);
		                                resolveRead(false);
		                            },
		                            _closeSteps: () => resolveRead(true),
		                            _errorSteps: rejectRead
		                        });
		                    });
		                });
		            }
		            // Errors must be propagated forward
		            isOrBecomesErrored(source, reader._closedPromise, storedError => {
		                if (!preventAbort) {
		                    shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
		                }
		                else {
		                    shutdown(true, storedError);
		                }
		            });
		            // Errors must be propagated backward
		            isOrBecomesErrored(dest, writer._closedPromise, storedError => {
		                if (!preventCancel) {
		                    shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
		                }
		                else {
		                    shutdown(true, storedError);
		                }
		            });
		            // Closing must be propagated forward
		            isOrBecomesClosed(source, reader._closedPromise, () => {
		                if (!preventClose) {
		                    shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
		                }
		                else {
		                    shutdown();
		                }
		            });
		            // Closing must be propagated backward
		            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === 'closed') {
		                const destClosed = new TypeError('the destination writable stream closed before all data could be piped to it');
		                if (!preventCancel) {
		                    shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
		                }
		                else {
		                    shutdown(true, destClosed);
		                }
		            }
		            setPromiseIsHandledToTrue(pipeLoop());
		            function waitForWritesToFinish() {
		                // Another write may have started while we were waiting on this currentWrite, so we have to be sure to wait
		                // for that too.
		                const oldCurrentWrite = currentWrite;
		                return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : undefined);
		            }
		            function isOrBecomesErrored(stream, promise, action) {
		                if (stream._state === 'errored') {
		                    action(stream._storedError);
		                }
		                else {
		                    uponRejection(promise, action);
		                }
		            }
		            function isOrBecomesClosed(stream, promise, action) {
		                if (stream._state === 'closed') {
		                    action();
		                }
		                else {
		                    uponFulfillment(promise, action);
		                }
		            }
		            function shutdownWithAction(action, originalIsError, originalError) {
		                if (shuttingDown) {
		                    return;
		                }
		                shuttingDown = true;
		                if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
		                    uponFulfillment(waitForWritesToFinish(), doTheRest);
		                }
		                else {
		                    doTheRest();
		                }
		                function doTheRest() {
		                    uponPromise(action(), () => finalize(originalIsError, originalError), newError => finalize(true, newError));
		                }
		            }
		            function shutdown(isError, error) {
		                if (shuttingDown) {
		                    return;
		                }
		                shuttingDown = true;
		                if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
		                    uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
		                }
		                else {
		                    finalize(isError, error);
		                }
		            }
		            function finalize(isError, error) {
		                WritableStreamDefaultWriterRelease(writer);
		                ReadableStreamReaderGenericRelease(reader);
		                if (signal !== undefined) {
		                    signal.removeEventListener('abort', abortAlgorithm);
		                }
		                if (isError) {
		                    reject(error);
		                }
		                else {
		                    resolve(undefined);
		                }
		            }
		        });
		    }

		    /**
		     * Allows control of a {@link ReadableStream | readable stream}'s state and internal queue.
		     *
		     * @public
		     */
		    class ReadableStreamDefaultController {
		        constructor() {
		            throw new TypeError('Illegal constructor');
		        }
		        /**
		         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
		         * over-full. An underlying source ought to use this information to determine when and how to apply backpressure.
		         */
		        get desiredSize() {
		            if (!IsReadableStreamDefaultController(this)) {
		                throw defaultControllerBrandCheckException$1('desiredSize');
		            }
		            return ReadableStreamDefaultControllerGetDesiredSize(this);
		        }
		        /**
		         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
		         * the stream, but once those are read, the stream will become closed.
		         */
		        close() {
		            if (!IsReadableStreamDefaultController(this)) {
		                throw defaultControllerBrandCheckException$1('close');
		            }
		            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
		                throw new TypeError('The stream is not in a state that permits close');
		            }
		            ReadableStreamDefaultControllerClose(this);
		        }
		        enqueue(chunk = undefined) {
		            if (!IsReadableStreamDefaultController(this)) {
		                throw defaultControllerBrandCheckException$1('enqueue');
		            }
		            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
		                throw new TypeError('The stream is not in a state that permits enqueue');
		            }
		            return ReadableStreamDefaultControllerEnqueue(this, chunk);
		        }
		        /**
		         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
		         */
		        error(e = undefined) {
		            if (!IsReadableStreamDefaultController(this)) {
		                throw defaultControllerBrandCheckException$1('error');
		            }
		            ReadableStreamDefaultControllerError(this, e);
		        }
		        /** @internal */
		        [CancelSteps](reason) {
		            ResetQueue(this);
		            const result = this._cancelAlgorithm(reason);
		            ReadableStreamDefaultControllerClearAlgorithms(this);
		            return result;
		        }
		        /** @internal */
		        [PullSteps](readRequest) {
		            const stream = this._controlledReadableStream;
		            if (this._queue.length > 0) {
		                const chunk = DequeueValue(this);
		                if (this._closeRequested && this._queue.length === 0) {
		                    ReadableStreamDefaultControllerClearAlgorithms(this);
		                    ReadableStreamClose(stream);
		                }
		                else {
		                    ReadableStreamDefaultControllerCallPullIfNeeded(this);
		                }
		                readRequest._chunkSteps(chunk);
		            }
		            else {
		                ReadableStreamAddReadRequest(stream, readRequest);
		                ReadableStreamDefaultControllerCallPullIfNeeded(this);
		            }
		        }
		    }
		    Object.defineProperties(ReadableStreamDefaultController.prototype, {
		        close: { enumerable: true },
		        enqueue: { enumerable: true },
		        error: { enumerable: true },
		        desiredSize: { enumerable: true }
		    });
		    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
		        Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
		            value: 'ReadableStreamDefaultController',
		            configurable: true
		        });
		    }
		    // Abstract operations for the ReadableStreamDefaultController.
		    function IsReadableStreamDefaultController(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableStream')) {
		            return false;
		        }
		        return x instanceof ReadableStreamDefaultController;
		    }
		    function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
		        const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
		        if (!shouldPull) {
		            return;
		        }
		        if (controller._pulling) {
		            controller._pullAgain = true;
		            return;
		        }
		        controller._pulling = true;
		        const pullPromise = controller._pullAlgorithm();
		        uponPromise(pullPromise, () => {
		            controller._pulling = false;
		            if (controller._pullAgain) {
		                controller._pullAgain = false;
		                ReadableStreamDefaultControllerCallPullIfNeeded(controller);
		            }
		        }, e => {
		            ReadableStreamDefaultControllerError(controller, e);
		        });
		    }
		    function ReadableStreamDefaultControllerShouldCallPull(controller) {
		        const stream = controller._controlledReadableStream;
		        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
		            return false;
		        }
		        if (!controller._started) {
		            return false;
		        }
		        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
		            return true;
		        }
		        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
		        if (desiredSize > 0) {
		            return true;
		        }
		        return false;
		    }
		    function ReadableStreamDefaultControllerClearAlgorithms(controller) {
		        controller._pullAlgorithm = undefined;
		        controller._cancelAlgorithm = undefined;
		        controller._strategySizeAlgorithm = undefined;
		    }
		    // A client of ReadableStreamDefaultController may use these functions directly to bypass state check.
		    function ReadableStreamDefaultControllerClose(controller) {
		        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
		            return;
		        }
		        const stream = controller._controlledReadableStream;
		        controller._closeRequested = true;
		        if (controller._queue.length === 0) {
		            ReadableStreamDefaultControllerClearAlgorithms(controller);
		            ReadableStreamClose(stream);
		        }
		    }
		    function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
		        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
		            return;
		        }
		        const stream = controller._controlledReadableStream;
		        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
		            ReadableStreamFulfillReadRequest(stream, chunk, false);
		        }
		        else {
		            let chunkSize;
		            try {
		                chunkSize = controller._strategySizeAlgorithm(chunk);
		            }
		            catch (chunkSizeE) {
		                ReadableStreamDefaultControllerError(controller, chunkSizeE);
		                throw chunkSizeE;
		            }
		            try {
		                EnqueueValueWithSize(controller, chunk, chunkSize);
		            }
		            catch (enqueueE) {
		                ReadableStreamDefaultControllerError(controller, enqueueE);
		                throw enqueueE;
		            }
		        }
		        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
		    }
		    function ReadableStreamDefaultControllerError(controller, e) {
		        const stream = controller._controlledReadableStream;
		        if (stream._state !== 'readable') {
		            return;
		        }
		        ResetQueue(controller);
		        ReadableStreamDefaultControllerClearAlgorithms(controller);
		        ReadableStreamError(stream, e);
		    }
		    function ReadableStreamDefaultControllerGetDesiredSize(controller) {
		        const state = controller._controlledReadableStream._state;
		        if (state === 'errored') {
		            return null;
		        }
		        if (state === 'closed') {
		            return 0;
		        }
		        return controller._strategyHWM - controller._queueTotalSize;
		    }
		    // This is used in the implementation of TransformStream.
		    function ReadableStreamDefaultControllerHasBackpressure(controller) {
		        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
		            return false;
		        }
		        return true;
		    }
		    function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
		        const state = controller._controlledReadableStream._state;
		        if (!controller._closeRequested && state === 'readable') {
		            return true;
		        }
		        return false;
		    }
		    function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
		        controller._controlledReadableStream = stream;
		        controller._queue = undefined;
		        controller._queueTotalSize = undefined;
		        ResetQueue(controller);
		        controller._started = false;
		        controller._closeRequested = false;
		        controller._pullAgain = false;
		        controller._pulling = false;
		        controller._strategySizeAlgorithm = sizeAlgorithm;
		        controller._strategyHWM = highWaterMark;
		        controller._pullAlgorithm = pullAlgorithm;
		        controller._cancelAlgorithm = cancelAlgorithm;
		        stream._readableStreamController = controller;
		        const startResult = startAlgorithm();
		        uponPromise(promiseResolvedWith(startResult), () => {
		            controller._started = true;
		            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
		        }, r => {
		            ReadableStreamDefaultControllerError(controller, r);
		        });
		    }
		    function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
		        const controller = Object.create(ReadableStreamDefaultController.prototype);
		        let startAlgorithm = () => undefined;
		        let pullAlgorithm = () => promiseResolvedWith(undefined);
		        let cancelAlgorithm = () => promiseResolvedWith(undefined);
		        if (underlyingSource.start !== undefined) {
		            startAlgorithm = () => underlyingSource.start(controller);
		        }
		        if (underlyingSource.pull !== undefined) {
		            pullAlgorithm = () => underlyingSource.pull(controller);
		        }
		        if (underlyingSource.cancel !== undefined) {
		            cancelAlgorithm = reason => underlyingSource.cancel(reason);
		        }
		        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
		    }
		    // Helper functions for the ReadableStreamDefaultController.
		    function defaultControllerBrandCheckException$1(name) {
		        return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
		    }

		    function ReadableStreamTee(stream, cloneForBranch2) {
		        if (IsReadableByteStreamController(stream._readableStreamController)) {
		            return ReadableByteStreamTee(stream);
		        }
		        return ReadableStreamDefaultTee(stream);
		    }
		    function ReadableStreamDefaultTee(stream, cloneForBranch2) {
		        const reader = AcquireReadableStreamDefaultReader(stream);
		        let reading = false;
		        let readAgain = false;
		        let canceled1 = false;
		        let canceled2 = false;
		        let reason1;
		        let reason2;
		        let branch1;
		        let branch2;
		        let resolveCancelPromise;
		        const cancelPromise = newPromise(resolve => {
		            resolveCancelPromise = resolve;
		        });
		        function pullAlgorithm() {
		            if (reading) {
		                readAgain = true;
		                return promiseResolvedWith(undefined);
		            }
		            reading = true;
		            const readRequest = {
		                _chunkSteps: chunk => {
		                    // This needs to be delayed a microtask because it takes at least a microtask to detect errors (using
		                    // reader._closedPromise below), and we want errors in stream to error both branches immediately. We cannot let
		                    // successful synchronously-available reads get ahead of asynchronously-available errors.
		                    queueMicrotask(() => {
		                        readAgain = false;
		                        const chunk1 = chunk;
		                        const chunk2 = chunk;
		                        // There is no way to access the cloning code right now in the reference implementation.
		                        // If we add one then we'll need an implementation for serializable objects.
		                        // if (!canceled2 && cloneForBranch2) {
		                        //   chunk2 = StructuredDeserialize(StructuredSerialize(chunk2));
		                        // }
		                        if (!canceled1) {
		                            ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
		                        }
		                        if (!canceled2) {
		                            ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
		                        }
		                        reading = false;
		                        if (readAgain) {
		                            pullAlgorithm();
		                        }
		                    });
		                },
		                _closeSteps: () => {
		                    reading = false;
		                    if (!canceled1) {
		                        ReadableStreamDefaultControllerClose(branch1._readableStreamController);
		                    }
		                    if (!canceled2) {
		                        ReadableStreamDefaultControllerClose(branch2._readableStreamController);
		                    }
		                    if (!canceled1 || !canceled2) {
		                        resolveCancelPromise(undefined);
		                    }
		                },
		                _errorSteps: () => {
		                    reading = false;
		                }
		            };
		            ReadableStreamDefaultReaderRead(reader, readRequest);
		            return promiseResolvedWith(undefined);
		        }
		        function cancel1Algorithm(reason) {
		            canceled1 = true;
		            reason1 = reason;
		            if (canceled2) {
		                const compositeReason = CreateArrayFromList([reason1, reason2]);
		                const cancelResult = ReadableStreamCancel(stream, compositeReason);
		                resolveCancelPromise(cancelResult);
		            }
		            return cancelPromise;
		        }
		        function cancel2Algorithm(reason) {
		            canceled2 = true;
		            reason2 = reason;
		            if (canceled1) {
		                const compositeReason = CreateArrayFromList([reason1, reason2]);
		                const cancelResult = ReadableStreamCancel(stream, compositeReason);
		                resolveCancelPromise(cancelResult);
		            }
		            return cancelPromise;
		        }
		        function startAlgorithm() {
		            // do nothing
		        }
		        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
		        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
		        uponRejection(reader._closedPromise, (r) => {
		            ReadableStreamDefaultControllerError(branch1._readableStreamController, r);
		            ReadableStreamDefaultControllerError(branch2._readableStreamController, r);
		            if (!canceled1 || !canceled2) {
		                resolveCancelPromise(undefined);
		            }
		        });
		        return [branch1, branch2];
		    }
		    function ReadableByteStreamTee(stream) {
		        let reader = AcquireReadableStreamDefaultReader(stream);
		        let reading = false;
		        let readAgainForBranch1 = false;
		        let readAgainForBranch2 = false;
		        let canceled1 = false;
		        let canceled2 = false;
		        let reason1;
		        let reason2;
		        let branch1;
		        let branch2;
		        let resolveCancelPromise;
		        const cancelPromise = newPromise(resolve => {
		            resolveCancelPromise = resolve;
		        });
		        function forwardReaderError(thisReader) {
		            uponRejection(thisReader._closedPromise, r => {
		                if (thisReader !== reader) {
		                    return;
		                }
		                ReadableByteStreamControllerError(branch1._readableStreamController, r);
		                ReadableByteStreamControllerError(branch2._readableStreamController, r);
		                if (!canceled1 || !canceled2) {
		                    resolveCancelPromise(undefined);
		                }
		            });
		        }
		        function pullWithDefaultReader() {
		            if (IsReadableStreamBYOBReader(reader)) {
		                ReadableStreamReaderGenericRelease(reader);
		                reader = AcquireReadableStreamDefaultReader(stream);
		                forwardReaderError(reader);
		            }
		            const readRequest = {
		                _chunkSteps: chunk => {
		                    // This needs to be delayed a microtask because it takes at least a microtask to detect errors (using
		                    // reader._closedPromise below), and we want errors in stream to error both branches immediately. We cannot let
		                    // successful synchronously-available reads get ahead of asynchronously-available errors.
		                    queueMicrotask(() => {
		                        readAgainForBranch1 = false;
		                        readAgainForBranch2 = false;
		                        const chunk1 = chunk;
		                        let chunk2 = chunk;
		                        if (!canceled1 && !canceled2) {
		                            try {
		                                chunk2 = CloneAsUint8Array(chunk);
		                            }
		                            catch (cloneE) {
		                                ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
		                                ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
		                                resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
		                                return;
		                            }
		                        }
		                        if (!canceled1) {
		                            ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
		                        }
		                        if (!canceled2) {
		                            ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
		                        }
		                        reading = false;
		                        if (readAgainForBranch1) {
		                            pull1Algorithm();
		                        }
		                        else if (readAgainForBranch2) {
		                            pull2Algorithm();
		                        }
		                    });
		                },
		                _closeSteps: () => {
		                    reading = false;
		                    if (!canceled1) {
		                        ReadableByteStreamControllerClose(branch1._readableStreamController);
		                    }
		                    if (!canceled2) {
		                        ReadableByteStreamControllerClose(branch2._readableStreamController);
		                    }
		                    if (branch1._readableStreamController._pendingPullIntos.length > 0) {
		                        ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
		                    }
		                    if (branch2._readableStreamController._pendingPullIntos.length > 0) {
		                        ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
		                    }
		                    if (!canceled1 || !canceled2) {
		                        resolveCancelPromise(undefined);
		                    }
		                },
		                _errorSteps: () => {
		                    reading = false;
		                }
		            };
		            ReadableStreamDefaultReaderRead(reader, readRequest);
		        }
		        function pullWithBYOBReader(view, forBranch2) {
		            if (IsReadableStreamDefaultReader(reader)) {
		                ReadableStreamReaderGenericRelease(reader);
		                reader = AcquireReadableStreamBYOBReader(stream);
		                forwardReaderError(reader);
		            }
		            const byobBranch = forBranch2 ? branch2 : branch1;
		            const otherBranch = forBranch2 ? branch1 : branch2;
		            const readIntoRequest = {
		                _chunkSteps: chunk => {
		                    // This needs to be delayed a microtask because it takes at least a microtask to detect errors (using
		                    // reader._closedPromise below), and we want errors in stream to error both branches immediately. We cannot let
		                    // successful synchronously-available reads get ahead of asynchronously-available errors.
		                    queueMicrotask(() => {
		                        readAgainForBranch1 = false;
		                        readAgainForBranch2 = false;
		                        const byobCanceled = forBranch2 ? canceled2 : canceled1;
		                        const otherCanceled = forBranch2 ? canceled1 : canceled2;
		                        if (!otherCanceled) {
		                            let clonedChunk;
		                            try {
		                                clonedChunk = CloneAsUint8Array(chunk);
		                            }
		                            catch (cloneE) {
		                                ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
		                                ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
		                                resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
		                                return;
		                            }
		                            if (!byobCanceled) {
		                                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
		                            }
		                            ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
		                        }
		                        else if (!byobCanceled) {
		                            ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
		                        }
		                        reading = false;
		                        if (readAgainForBranch1) {
		                            pull1Algorithm();
		                        }
		                        else if (readAgainForBranch2) {
		                            pull2Algorithm();
		                        }
		                    });
		                },
		                _closeSteps: chunk => {
		                    reading = false;
		                    const byobCanceled = forBranch2 ? canceled2 : canceled1;
		                    const otherCanceled = forBranch2 ? canceled1 : canceled2;
		                    if (!byobCanceled) {
		                        ReadableByteStreamControllerClose(byobBranch._readableStreamController);
		                    }
		                    if (!otherCanceled) {
		                        ReadableByteStreamControllerClose(otherBranch._readableStreamController);
		                    }
		                    if (chunk !== undefined) {
		                        if (!byobCanceled) {
		                            ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
		                        }
		                        if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
		                            ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
		                        }
		                    }
		                    if (!byobCanceled || !otherCanceled) {
		                        resolveCancelPromise(undefined);
		                    }
		                },
		                _errorSteps: () => {
		                    reading = false;
		                }
		            };
		            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
		        }
		        function pull1Algorithm() {
		            if (reading) {
		                readAgainForBranch1 = true;
		                return promiseResolvedWith(undefined);
		            }
		            reading = true;
		            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
		            if (byobRequest === null) {
		                pullWithDefaultReader();
		            }
		            else {
		                pullWithBYOBReader(byobRequest._view, false);
		            }
		            return promiseResolvedWith(undefined);
		        }
		        function pull2Algorithm() {
		            if (reading) {
		                readAgainForBranch2 = true;
		                return promiseResolvedWith(undefined);
		            }
		            reading = true;
		            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
		            if (byobRequest === null) {
		                pullWithDefaultReader();
		            }
		            else {
		                pullWithBYOBReader(byobRequest._view, true);
		            }
		            return promiseResolvedWith(undefined);
		        }
		        function cancel1Algorithm(reason) {
		            canceled1 = true;
		            reason1 = reason;
		            if (canceled2) {
		                const compositeReason = CreateArrayFromList([reason1, reason2]);
		                const cancelResult = ReadableStreamCancel(stream, compositeReason);
		                resolveCancelPromise(cancelResult);
		            }
		            return cancelPromise;
		        }
		        function cancel2Algorithm(reason) {
		            canceled2 = true;
		            reason2 = reason;
		            if (canceled1) {
		                const compositeReason = CreateArrayFromList([reason1, reason2]);
		                const cancelResult = ReadableStreamCancel(stream, compositeReason);
		                resolveCancelPromise(cancelResult);
		            }
		            return cancelPromise;
		        }
		        function startAlgorithm() {
		            return;
		        }
		        branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
		        branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
		        forwardReaderError(reader);
		        return [branch1, branch2];
		    }

		    function convertUnderlyingDefaultOrByteSource(source, context) {
		        assertDictionary(source, context);
		        const original = source;
		        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
		        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
		        const pull = original === null || original === void 0 ? void 0 : original.pull;
		        const start = original === null || original === void 0 ? void 0 : original.start;
		        const type = original === null || original === void 0 ? void 0 : original.type;
		        return {
		            autoAllocateChunkSize: autoAllocateChunkSize === undefined ?
		                undefined :
		                convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
		            cancel: cancel === undefined ?
		                undefined :
		                convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
		            pull: pull === undefined ?
		                undefined :
		                convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
		            start: start === undefined ?
		                undefined :
		                convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
		            type: type === undefined ? undefined : convertReadableStreamType(type, `${context} has member 'type' that`)
		        };
		    }
		    function convertUnderlyingSourceCancelCallback(fn, original, context) {
		        assertFunction(fn, context);
		        return (reason) => promiseCall(fn, original, [reason]);
		    }
		    function convertUnderlyingSourcePullCallback(fn, original, context) {
		        assertFunction(fn, context);
		        return (controller) => promiseCall(fn, original, [controller]);
		    }
		    function convertUnderlyingSourceStartCallback(fn, original, context) {
		        assertFunction(fn, context);
		        return (controller) => reflectCall(fn, original, [controller]);
		    }
		    function convertReadableStreamType(type, context) {
		        type = `${type}`;
		        if (type !== 'bytes') {
		            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
		        }
		        return type;
		    }

		    function convertReaderOptions(options, context) {
		        assertDictionary(options, context);
		        const mode = options === null || options === void 0 ? void 0 : options.mode;
		        return {
		            mode: mode === undefined ? undefined : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
		        };
		    }
		    function convertReadableStreamReaderMode(mode, context) {
		        mode = `${mode}`;
		        if (mode !== 'byob') {
		            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
		        }
		        return mode;
		    }

		    function convertIteratorOptions(options, context) {
		        assertDictionary(options, context);
		        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
		        return { preventCancel: Boolean(preventCancel) };
		    }

		    function convertPipeOptions(options, context) {
		        assertDictionary(options, context);
		        const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
		        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
		        const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
		        const signal = options === null || options === void 0 ? void 0 : options.signal;
		        if (signal !== undefined) {
		            assertAbortSignal(signal, `${context} has member 'signal' that`);
		        }
		        return {
		            preventAbort: Boolean(preventAbort),
		            preventCancel: Boolean(preventCancel),
		            preventClose: Boolean(preventClose),
		            signal
		        };
		    }
		    function assertAbortSignal(signal, context) {
		        if (!isAbortSignal(signal)) {
		            throw new TypeError(`${context} is not an AbortSignal.`);
		        }
		    }

		    function convertReadableWritablePair(pair, context) {
		        assertDictionary(pair, context);
		        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
		        assertRequiredField(readable, 'readable', 'ReadableWritablePair');
		        assertReadableStream(readable, `${context} has member 'readable' that`);
		        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
		        assertRequiredField(writable, 'writable', 'ReadableWritablePair');
		        assertWritableStream(writable, `${context} has member 'writable' that`);
		        return { readable, writable };
		    }

		    /**
		     * A readable stream represents a source of data, from which you can read.
		     *
		     * @public
		     */
		    class ReadableStream {
		        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
		            if (rawUnderlyingSource === undefined) {
		                rawUnderlyingSource = null;
		            }
		            else {
		                assertObject(rawUnderlyingSource, 'First parameter');
		            }
		            const strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
		            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, 'First parameter');
		            InitializeReadableStream(this);
		            if (underlyingSource.type === 'bytes') {
		                if (strategy.size !== undefined) {
		                    throw new RangeError('The strategy for a byte stream cannot have a size function');
		                }
		                const highWaterMark = ExtractHighWaterMark(strategy, 0);
		                SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
		            }
		            else {
		                const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
		                const highWaterMark = ExtractHighWaterMark(strategy, 1);
		                SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
		            }
		        }
		        /**
		         * Whether or not the readable stream is locked to a {@link ReadableStreamDefaultReader | reader}.
		         */
		        get locked() {
		            if (!IsReadableStream(this)) {
		                throw streamBrandCheckException$1('locked');
		            }
		            return IsReadableStreamLocked(this);
		        }
		        /**
		         * Cancels the stream, signaling a loss of interest in the stream by a consumer.
		         *
		         * The supplied `reason` argument will be given to the underlying source's {@link UnderlyingSource.cancel | cancel()}
		         * method, which might or might not use it.
		         */
		        cancel(reason = undefined) {
		            if (!IsReadableStream(this)) {
		                return promiseRejectedWith(streamBrandCheckException$1('cancel'));
		            }
		            if (IsReadableStreamLocked(this)) {
		                return promiseRejectedWith(new TypeError('Cannot cancel a stream that already has a reader'));
		            }
		            return ReadableStreamCancel(this, reason);
		        }
		        getReader(rawOptions = undefined) {
		            if (!IsReadableStream(this)) {
		                throw streamBrandCheckException$1('getReader');
		            }
		            const options = convertReaderOptions(rawOptions, 'First parameter');
		            if (options.mode === undefined) {
		                return AcquireReadableStreamDefaultReader(this);
		            }
		            return AcquireReadableStreamBYOBReader(this);
		        }
		        pipeThrough(rawTransform, rawOptions = {}) {
		            if (!IsReadableStream(this)) {
		                throw streamBrandCheckException$1('pipeThrough');
		            }
		            assertRequiredArgument(rawTransform, 1, 'pipeThrough');
		            const transform = convertReadableWritablePair(rawTransform, 'First parameter');
		            const options = convertPipeOptions(rawOptions, 'Second parameter');
		            if (IsReadableStreamLocked(this)) {
		                throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream');
		            }
		            if (IsWritableStreamLocked(transform.writable)) {
		                throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream');
		            }
		            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
		            setPromiseIsHandledToTrue(promise);
		            return transform.readable;
		        }
		        pipeTo(destination, rawOptions = {}) {
		            if (!IsReadableStream(this)) {
		                return promiseRejectedWith(streamBrandCheckException$1('pipeTo'));
		            }
		            if (destination === undefined) {
		                return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
		            }
		            if (!IsWritableStream(destination)) {
		                return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
		            }
		            let options;
		            try {
		                options = convertPipeOptions(rawOptions, 'Second parameter');
		            }
		            catch (e) {
		                return promiseRejectedWith(e);
		            }
		            if (IsReadableStreamLocked(this)) {
		                return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream'));
		            }
		            if (IsWritableStreamLocked(destination)) {
		                return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream'));
		            }
		            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
		        }
		        /**
		         * Tees this readable stream, returning a two-element array containing the two resulting branches as
		         * new {@link ReadableStream} instances.
		         *
		         * Teeing a stream will lock it, preventing any other consumer from acquiring a reader.
		         * To cancel the stream, cancel both of the resulting branches; a composite cancellation reason will then be
		         * propagated to the stream's underlying source.
		         *
		         * Note that the chunks seen in each branch will be the same object. If the chunks are not immutable,
		         * this could allow interference between the two branches.
		         */
		        tee() {
		            if (!IsReadableStream(this)) {
		                throw streamBrandCheckException$1('tee');
		            }
		            const branches = ReadableStreamTee(this);
		            return CreateArrayFromList(branches);
		        }
		        values(rawOptions = undefined) {
		            if (!IsReadableStream(this)) {
		                throw streamBrandCheckException$1('values');
		            }
		            const options = convertIteratorOptions(rawOptions, 'First parameter');
		            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
		        }
		    }
		    Object.defineProperties(ReadableStream.prototype, {
		        cancel: { enumerable: true },
		        getReader: { enumerable: true },
		        pipeThrough: { enumerable: true },
		        pipeTo: { enumerable: true },
		        tee: { enumerable: true },
		        values: { enumerable: true },
		        locked: { enumerable: true }
		    });
		    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
		        Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.toStringTag, {
		            value: 'ReadableStream',
		            configurable: true
		        });
		    }
		    if (typeof SymbolPolyfill.asyncIterator === 'symbol') {
		        Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.asyncIterator, {
		            value: ReadableStream.prototype.values,
		            writable: true,
		            configurable: true
		        });
		    }
		    // Abstract operations for the ReadableStream.
		    // Throws if and only if startAlgorithm throws.
		    function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
		        const stream = Object.create(ReadableStream.prototype);
		        InitializeReadableStream(stream);
		        const controller = Object.create(ReadableStreamDefaultController.prototype);
		        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
		        return stream;
		    }
		    // Throws if and only if startAlgorithm throws.
		    function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
		        const stream = Object.create(ReadableStream.prototype);
		        InitializeReadableStream(stream);
		        const controller = Object.create(ReadableByteStreamController.prototype);
		        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, undefined);
		        return stream;
		    }
		    function InitializeReadableStream(stream) {
		        stream._state = 'readable';
		        stream._reader = undefined;
		        stream._storedError = undefined;
		        stream._disturbed = false;
		    }
		    function IsReadableStream(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_readableStreamController')) {
		            return false;
		        }
		        return x instanceof ReadableStream;
		    }
		    function IsReadableStreamLocked(stream) {
		        if (stream._reader === undefined) {
		            return false;
		        }
		        return true;
		    }
		    // ReadableStream API exposed for controllers.
		    function ReadableStreamCancel(stream, reason) {
		        stream._disturbed = true;
		        if (stream._state === 'closed') {
		            return promiseResolvedWith(undefined);
		        }
		        if (stream._state === 'errored') {
		            return promiseRejectedWith(stream._storedError);
		        }
		        ReadableStreamClose(stream);
		        const reader = stream._reader;
		        if (reader !== undefined && IsReadableStreamBYOBReader(reader)) {
		            reader._readIntoRequests.forEach(readIntoRequest => {
		                readIntoRequest._closeSteps(undefined);
		            });
		            reader._readIntoRequests = new SimpleQueue();
		        }
		        const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
		        return transformPromiseWith(sourceCancelPromise, noop);
		    }
		    function ReadableStreamClose(stream) {
		        stream._state = 'closed';
		        const reader = stream._reader;
		        if (reader === undefined) {
		            return;
		        }
		        defaultReaderClosedPromiseResolve(reader);
		        if (IsReadableStreamDefaultReader(reader)) {
		            reader._readRequests.forEach(readRequest => {
		                readRequest._closeSteps();
		            });
		            reader._readRequests = new SimpleQueue();
		        }
		    }
		    function ReadableStreamError(stream, e) {
		        stream._state = 'errored';
		        stream._storedError = e;
		        const reader = stream._reader;
		        if (reader === undefined) {
		            return;
		        }
		        defaultReaderClosedPromiseReject(reader, e);
		        if (IsReadableStreamDefaultReader(reader)) {
		            reader._readRequests.forEach(readRequest => {
		                readRequest._errorSteps(e);
		            });
		            reader._readRequests = new SimpleQueue();
		        }
		        else {
		            reader._readIntoRequests.forEach(readIntoRequest => {
		                readIntoRequest._errorSteps(e);
		            });
		            reader._readIntoRequests = new SimpleQueue();
		        }
		    }
		    // Helper functions for the ReadableStream.
		    function streamBrandCheckException$1(name) {
		        return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
		    }

		    function convertQueuingStrategyInit(init, context) {
		        assertDictionary(init, context);
		        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
		        assertRequiredField(highWaterMark, 'highWaterMark', 'QueuingStrategyInit');
		        return {
		            highWaterMark: convertUnrestrictedDouble(highWaterMark)
		        };
		    }

		    // The size function must not have a prototype property nor be a constructor
		    const byteLengthSizeFunction = (chunk) => {
		        return chunk.byteLength;
		    };
		    try {
		        Object.defineProperty(byteLengthSizeFunction, 'name', {
		            value: 'size',
		            configurable: true
		        });
		    }
		    catch (_a) {
		        // This property is non-configurable in older browsers, so ignore if this throws.
		        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#browser_compatibility
		    }
		    /**
		     * A queuing strategy that counts the number of bytes in each chunk.
		     *
		     * @public
		     */
		    class ByteLengthQueuingStrategy {
		        constructor(options) {
		            assertRequiredArgument(options, 1, 'ByteLengthQueuingStrategy');
		            options = convertQueuingStrategyInit(options, 'First parameter');
		            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
		        }
		        /**
		         * Returns the high water mark provided to the constructor.
		         */
		        get highWaterMark() {
		            if (!IsByteLengthQueuingStrategy(this)) {
		                throw byteLengthBrandCheckException('highWaterMark');
		            }
		            return this._byteLengthQueuingStrategyHighWaterMark;
		        }
		        /**
		         * Measures the size of `chunk` by returning the value of its `byteLength` property.
		         */
		        get size() {
		            if (!IsByteLengthQueuingStrategy(this)) {
		                throw byteLengthBrandCheckException('size');
		            }
		            return byteLengthSizeFunction;
		        }
		    }
		    Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
		        highWaterMark: { enumerable: true },
		        size: { enumerable: true }
		    });
		    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
		        Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
		            value: 'ByteLengthQueuingStrategy',
		            configurable: true
		        });
		    }
		    // Helper functions for the ByteLengthQueuingStrategy.
		    function byteLengthBrandCheckException(name) {
		        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
		    }
		    function IsByteLengthQueuingStrategy(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_byteLengthQueuingStrategyHighWaterMark')) {
		            return false;
		        }
		        return x instanceof ByteLengthQueuingStrategy;
		    }

		    // The size function must not have a prototype property nor be a constructor
		    const countSizeFunction = () => {
		        return 1;
		    };
		    try {
		        Object.defineProperty(countSizeFunction, 'name', {
		            value: 'size',
		            configurable: true
		        });
		    }
		    catch (_a) {
		        // This property is non-configurable in older browsers, so ignore if this throws.
		        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#browser_compatibility
		    }
		    /**
		     * A queuing strategy that counts the number of chunks.
		     *
		     * @public
		     */
		    class CountQueuingStrategy {
		        constructor(options) {
		            assertRequiredArgument(options, 1, 'CountQueuingStrategy');
		            options = convertQueuingStrategyInit(options, 'First parameter');
		            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
		        }
		        /**
		         * Returns the high water mark provided to the constructor.
		         */
		        get highWaterMark() {
		            if (!IsCountQueuingStrategy(this)) {
		                throw countBrandCheckException('highWaterMark');
		            }
		            return this._countQueuingStrategyHighWaterMark;
		        }
		        /**
		         * Measures the size of `chunk` by always returning 1.
		         * This ensures that the total queue size is a count of the number of chunks in the queue.
		         */
		        get size() {
		            if (!IsCountQueuingStrategy(this)) {
		                throw countBrandCheckException('size');
		            }
		            return countSizeFunction;
		        }
		    }
		    Object.defineProperties(CountQueuingStrategy.prototype, {
		        highWaterMark: { enumerable: true },
		        size: { enumerable: true }
		    });
		    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
		        Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
		            value: 'CountQueuingStrategy',
		            configurable: true
		        });
		    }
		    // Helper functions for the CountQueuingStrategy.
		    function countBrandCheckException(name) {
		        return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
		    }
		    function IsCountQueuingStrategy(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_countQueuingStrategyHighWaterMark')) {
		            return false;
		        }
		        return x instanceof CountQueuingStrategy;
		    }

		    function convertTransformer(original, context) {
		        assertDictionary(original, context);
		        const flush = original === null || original === void 0 ? void 0 : original.flush;
		        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
		        const start = original === null || original === void 0 ? void 0 : original.start;
		        const transform = original === null || original === void 0 ? void 0 : original.transform;
		        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
		        return {
		            flush: flush === undefined ?
		                undefined :
		                convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
		            readableType,
		            start: start === undefined ?
		                undefined :
		                convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
		            transform: transform === undefined ?
		                undefined :
		                convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
		            writableType
		        };
		    }
		    function convertTransformerFlushCallback(fn, original, context) {
		        assertFunction(fn, context);
		        return (controller) => promiseCall(fn, original, [controller]);
		    }
		    function convertTransformerStartCallback(fn, original, context) {
		        assertFunction(fn, context);
		        return (controller) => reflectCall(fn, original, [controller]);
		    }
		    function convertTransformerTransformCallback(fn, original, context) {
		        assertFunction(fn, context);
		        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
		    }

		    // Class TransformStream
		    /**
		     * A transform stream consists of a pair of streams: a {@link WritableStream | writable stream},
		     * known as its writable side, and a {@link ReadableStream | readable stream}, known as its readable side.
		     * In a manner specific to the transform stream in question, writes to the writable side result in new data being
		     * made available for reading from the readable side.
		     *
		     * @public
		     */
		    class TransformStream {
		        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
		            if (rawTransformer === undefined) {
		                rawTransformer = null;
		            }
		            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, 'Second parameter');
		            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, 'Third parameter');
		            const transformer = convertTransformer(rawTransformer, 'First parameter');
		            if (transformer.readableType !== undefined) {
		                throw new RangeError('Invalid readableType specified');
		            }
		            if (transformer.writableType !== undefined) {
		                throw new RangeError('Invalid writableType specified');
		            }
		            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
		            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
		            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
		            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
		            let startPromise_resolve;
		            const startPromise = newPromise(resolve => {
		                startPromise_resolve = resolve;
		            });
		            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
		            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
		            if (transformer.start !== undefined) {
		                startPromise_resolve(transformer.start(this._transformStreamController));
		            }
		            else {
		                startPromise_resolve(undefined);
		            }
		        }
		        /**
		         * The readable side of the transform stream.
		         */
		        get readable() {
		            if (!IsTransformStream(this)) {
		                throw streamBrandCheckException('readable');
		            }
		            return this._readable;
		        }
		        /**
		         * The writable side of the transform stream.
		         */
		        get writable() {
		            if (!IsTransformStream(this)) {
		                throw streamBrandCheckException('writable');
		            }
		            return this._writable;
		        }
		    }
		    Object.defineProperties(TransformStream.prototype, {
		        readable: { enumerable: true },
		        writable: { enumerable: true }
		    });
		    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
		        Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
		            value: 'TransformStream',
		            configurable: true
		        });
		    }
		    function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
		        function startAlgorithm() {
		            return startPromise;
		        }
		        function writeAlgorithm(chunk) {
		            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
		        }
		        function abortAlgorithm(reason) {
		            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
		        }
		        function closeAlgorithm() {
		            return TransformStreamDefaultSinkCloseAlgorithm(stream);
		        }
		        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
		        function pullAlgorithm() {
		            return TransformStreamDefaultSourcePullAlgorithm(stream);
		        }
		        function cancelAlgorithm(reason) {
		            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
		            return promiseResolvedWith(undefined);
		        }
		        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
		        // The [[backpressure]] slot is set to undefined so that it can be initialised by TransformStreamSetBackpressure.
		        stream._backpressure = undefined;
		        stream._backpressureChangePromise = undefined;
		        stream._backpressureChangePromise_resolve = undefined;
		        TransformStreamSetBackpressure(stream, true);
		        stream._transformStreamController = undefined;
		    }
		    function IsTransformStream(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_transformStreamController')) {
		            return false;
		        }
		        return x instanceof TransformStream;
		    }
		    // This is a no-op if both sides are already errored.
		    function TransformStreamError(stream, e) {
		        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
		        TransformStreamErrorWritableAndUnblockWrite(stream, e);
		    }
		    function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
		        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
		        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);
		        if (stream._backpressure) {
		            // Pretend that pull() was called to permit any pending write() calls to complete. TransformStreamSetBackpressure()
		            // cannot be called from enqueue() or pull() once the ReadableStream is errored, so this will will be the final time
		            // _backpressure is set.
		            TransformStreamSetBackpressure(stream, false);
		        }
		    }
		    function TransformStreamSetBackpressure(stream, backpressure) {
		        // Passes also when called during construction.
		        if (stream._backpressureChangePromise !== undefined) {
		            stream._backpressureChangePromise_resolve();
		        }
		        stream._backpressureChangePromise = newPromise(resolve => {
		            stream._backpressureChangePromise_resolve = resolve;
		        });
		        stream._backpressure = backpressure;
		    }
		    // Class TransformStreamDefaultController
		    /**
		     * Allows control of the {@link ReadableStream} and {@link WritableStream} of the associated {@link TransformStream}.
		     *
		     * @public
		     */
		    class TransformStreamDefaultController {
		        constructor() {
		            throw new TypeError('Illegal constructor');
		        }
		        /**
		         * Returns the desired size to fill the readable side’s internal queue. It can be negative, if the queue is over-full.
		         */
		        get desiredSize() {
		            if (!IsTransformStreamDefaultController(this)) {
		                throw defaultControllerBrandCheckException('desiredSize');
		            }
		            const readableController = this._controlledTransformStream._readable._readableStreamController;
		            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
		        }
		        enqueue(chunk = undefined) {
		            if (!IsTransformStreamDefaultController(this)) {
		                throw defaultControllerBrandCheckException('enqueue');
		            }
		            TransformStreamDefaultControllerEnqueue(this, chunk);
		        }
		        /**
		         * Errors both the readable side and the writable side of the controlled transform stream, making all future
		         * interactions with it fail with the given error `e`. Any chunks queued for transformation will be discarded.
		         */
		        error(reason = undefined) {
		            if (!IsTransformStreamDefaultController(this)) {
		                throw defaultControllerBrandCheckException('error');
		            }
		            TransformStreamDefaultControllerError(this, reason);
		        }
		        /**
		         * Closes the readable side and errors the writable side of the controlled transform stream. This is useful when the
		         * transformer only needs to consume a portion of the chunks written to the writable side.
		         */
		        terminate() {
		            if (!IsTransformStreamDefaultController(this)) {
		                throw defaultControllerBrandCheckException('terminate');
		            }
		            TransformStreamDefaultControllerTerminate(this);
		        }
		    }
		    Object.defineProperties(TransformStreamDefaultController.prototype, {
		        enqueue: { enumerable: true },
		        error: { enumerable: true },
		        terminate: { enumerable: true },
		        desiredSize: { enumerable: true }
		    });
		    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
		        Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
		            value: 'TransformStreamDefaultController',
		            configurable: true
		        });
		    }
		    // Transform Stream Default Controller Abstract Operations
		    function IsTransformStreamDefaultController(x) {
		        if (!typeIsObject(x)) {
		            return false;
		        }
		        if (!Object.prototype.hasOwnProperty.call(x, '_controlledTransformStream')) {
		            return false;
		        }
		        return x instanceof TransformStreamDefaultController;
		    }
		    function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
		        controller._controlledTransformStream = stream;
		        stream._transformStreamController = controller;
		        controller._transformAlgorithm = transformAlgorithm;
		        controller._flushAlgorithm = flushAlgorithm;
		    }
		    function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
		        const controller = Object.create(TransformStreamDefaultController.prototype);
		        let transformAlgorithm = (chunk) => {
		            try {
		                TransformStreamDefaultControllerEnqueue(controller, chunk);
		                return promiseResolvedWith(undefined);
		            }
		            catch (transformResultE) {
		                return promiseRejectedWith(transformResultE);
		            }
		        };
		        let flushAlgorithm = () => promiseResolvedWith(undefined);
		        if (transformer.transform !== undefined) {
		            transformAlgorithm = chunk => transformer.transform(chunk, controller);
		        }
		        if (transformer.flush !== undefined) {
		            flushAlgorithm = () => transformer.flush(controller);
		        }
		        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
		    }
		    function TransformStreamDefaultControllerClearAlgorithms(controller) {
		        controller._transformAlgorithm = undefined;
		        controller._flushAlgorithm = undefined;
		    }
		    function TransformStreamDefaultControllerEnqueue(controller, chunk) {
		        const stream = controller._controlledTransformStream;
		        const readableController = stream._readable._readableStreamController;
		        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
		            throw new TypeError('Readable side is not in a state that permits enqueue');
		        }
		        // We throttle transform invocations based on the backpressure of the ReadableStream, but we still
		        // accept TransformStreamDefaultControllerEnqueue() calls.
		        try {
		            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
		        }
		        catch (e) {
		            // This happens when readableStrategy.size() throws.
		            TransformStreamErrorWritableAndUnblockWrite(stream, e);
		            throw stream._readable._storedError;
		        }
		        const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
		        if (backpressure !== stream._backpressure) {
		            TransformStreamSetBackpressure(stream, true);
		        }
		    }
		    function TransformStreamDefaultControllerError(controller, e) {
		        TransformStreamError(controller._controlledTransformStream, e);
		    }
		    function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
		        const transformPromise = controller._transformAlgorithm(chunk);
		        return transformPromiseWith(transformPromise, undefined, r => {
		            TransformStreamError(controller._controlledTransformStream, r);
		            throw r;
		        });
		    }
		    function TransformStreamDefaultControllerTerminate(controller) {
		        const stream = controller._controlledTransformStream;
		        const readableController = stream._readable._readableStreamController;
		        ReadableStreamDefaultControllerClose(readableController);
		        const error = new TypeError('TransformStream terminated');
		        TransformStreamErrorWritableAndUnblockWrite(stream, error);
		    }
		    // TransformStreamDefaultSink Algorithms
		    function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
		        const controller = stream._transformStreamController;
		        if (stream._backpressure) {
		            const backpressureChangePromise = stream._backpressureChangePromise;
		            return transformPromiseWith(backpressureChangePromise, () => {
		                const writable = stream._writable;
		                const state = writable._state;
		                if (state === 'erroring') {
		                    throw writable._storedError;
		                }
		                return TransformStreamDefaultControllerPerformTransform(controller, chunk);
		            });
		        }
		        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
		    }
		    function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
		        // abort() is not called synchronously, so it is possible for abort() to be called when the stream is already
		        // errored.
		        TransformStreamError(stream, reason);
		        return promiseResolvedWith(undefined);
		    }
		    function TransformStreamDefaultSinkCloseAlgorithm(stream) {
		        // stream._readable cannot change after construction, so caching it across a call to user code is safe.
		        const readable = stream._readable;
		        const controller = stream._transformStreamController;
		        const flushPromise = controller._flushAlgorithm();
		        TransformStreamDefaultControllerClearAlgorithms(controller);
		        // Return a promise that is fulfilled with undefined on success.
		        return transformPromiseWith(flushPromise, () => {
		            if (readable._state === 'errored') {
		                throw readable._storedError;
		            }
		            ReadableStreamDefaultControllerClose(readable._readableStreamController);
		        }, r => {
		            TransformStreamError(stream, r);
		            throw readable._storedError;
		        });
		    }
		    // TransformStreamDefaultSource Algorithms
		    function TransformStreamDefaultSourcePullAlgorithm(stream) {
		        // Invariant. Enforced by the promises returned by start() and pull().
		        TransformStreamSetBackpressure(stream, false);
		        // Prevent the next pull() call until there is backpressure.
		        return stream._backpressureChangePromise;
		    }
		    // Helper functions for the TransformStreamDefaultController.
		    function defaultControllerBrandCheckException(name) {
		        return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
		    }
		    // Helper functions for the TransformStream.
		    function streamBrandCheckException(name) {
		        return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
		    }

		    exports.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
		    exports.CountQueuingStrategy = CountQueuingStrategy;
		    exports.ReadableByteStreamController = ReadableByteStreamController;
		    exports.ReadableStream = ReadableStream;
		    exports.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
		    exports.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
		    exports.ReadableStreamDefaultController = ReadableStreamDefaultController;
		    exports.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
		    exports.TransformStream = TransformStream;
		    exports.TransformStreamDefaultController = TransformStreamDefaultController;
		    exports.WritableStream = WritableStream;
		    exports.WritableStreamDefaultController = WritableStreamDefaultController;
		    exports.WritableStreamDefaultWriter = WritableStreamDefaultWriter;

		    Object.defineProperty(exports, '__esModule', { value: true });

		})));
		
} (ponyfill_es2018, ponyfill_es2018.exports));
	return ponyfill_es2018.exports;
}

/* c8 ignore start */

// 64 KiB (same size chrome slice theirs blob into Uint8array's)
const POOL_SIZE$1 = 65536;

if (!globalThis.ReadableStream) {
  // `node:stream/web` got introduced in v16.5.0 as experimental
  // and it's preferred over the polyfilled version. So we also
  // suppress the warning that gets emitted by NodeJS for using it.
  try {
    const process = require('node:process');
    const { emitWarning } = process;
    try {
      process.emitWarning = () => {};
      Object.assign(globalThis, require('node:stream/web'));
      process.emitWarning = emitWarning;
    } catch (error) {
      process.emitWarning = emitWarning;
      throw error
    }
  } catch (error) {
    // fallback to polyfill implementation
    Object.assign(globalThis, requirePonyfill_es2018());
  }
}

try {
  // Don't use node: prefix for this, require+node: is not supported until node v14.14
  // Only `import()` can use prefix in 12.20 and later
  const { Blob } = require('buffer');
  if (Blob && !Blob.prototype.stream) {
    Blob.prototype.stream = function name (params) {
      let position = 0;
      const blob = this;

      return new ReadableStream({
        type: 'bytes',
        async pull (ctrl) {
          const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
          const buffer = await chunk.arrayBuffer();
          position += buffer.byteLength;
          ctrl.enqueue(new Uint8Array(buffer));

          if (position === blob.size) {
            ctrl.close();
          }
        }
      })
    };
  }
} catch (error) {}

/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

// 64 KiB (same size chrome slice theirs blob into Uint8array's)
const POOL_SIZE = 65536;

/** @param {(Blob | Uint8Array)[]} parts */
async function * toIterator (parts, clone = true) {
  for (const part of parts) {
    if ('stream' in part) {
      yield * (/** @type {AsyncIterableIterator<Uint8Array>} */ (part.stream()));
    } else if (ArrayBuffer.isView(part)) {
      if (clone) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    /* c8 ignore next 10 */
    } else {
      // For blobs that have arrayBuffer but no stream method (nodes buffer.Blob)
      let position = 0, b = (/** @type {Blob} */ (part));
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}

const _Blob = class Blob {
  /** @type {Array.<(Blob|Uint8Array)>} */
  #parts = []
  #type = ''
  #size = 0
  #endings = 'transparent'

  /**
   * The Blob() constructor returns a new Blob object. The content
   * of the blob consists of the concatenation of the values given
   * in the parameter array.
   *
   * @param {*} blobParts
   * @param {{ type?: string, endings?: string }} [options]
   */
  constructor (blobParts = [], options = {}) {
    if (typeof blobParts !== 'object' || blobParts === null) {
      throw new TypeError('Failed to construct \'Blob\': The provided value cannot be converted to a sequence.')
    }

    if (typeof blobParts[Symbol.iterator] !== 'function') {
      throw new TypeError('Failed to construct \'Blob\': The object must have a callable @@iterator property.')
    }

    if (typeof options !== 'object' && typeof options !== 'function') {
      throw new TypeError('Failed to construct \'Blob\': parameter 2 cannot convert to dictionary.')
    }

    if (options === null) options = {};

    const encoder = new TextEncoder();
    for (const element of blobParts) {
      let part;
      if (ArrayBuffer.isView(element)) {
        part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
      } else if (element instanceof ArrayBuffer) {
        part = new Uint8Array(element.slice(0));
      } else if (element instanceof Blob) {
        part = element;
      } else {
        part = encoder.encode(`${element}`);
      }

      const size = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      // Avoid pushing empty parts into the array to better GC them
      if (size) {
        this.#size += size;
        this.#parts.push(part);
      }
    }

    this.#endings = `${options.endings === undefined ? 'transparent' : options.endings}`;
    const type = options.type === undefined ? '' : String(options.type);
    this.#type = /^[\x20-\x7E]*$/.test(type) ? type : '';
  }

  /**
   * The Blob interface's size property returns the
   * size of the Blob in bytes.
   */
  get size () {
    return this.#size
  }

  /**
   * The type property of a Blob object returns the MIME type of the file.
   */
  get type () {
    return this.#type
  }

  /**
   * The text() method in the Blob interface returns a Promise
   * that resolves with a string containing the contents of
   * the blob, interpreted as UTF-8.
   *
   * @return {Promise<string>}
   */
  async text () {
    // More optimized than using this.arrayBuffer()
    // that requires twice as much ram
    const decoder = new TextDecoder();
    let str = '';
    for await (const part of toIterator(this.#parts, false)) {
      str += decoder.decode(part, { stream: true });
    }
    // Remaining
    str += decoder.decode();
    return str
  }

  /**
   * The arrayBuffer() method in the Blob interface returns a
   * Promise that resolves with the contents of the blob as
   * binary data contained in an ArrayBuffer.
   *
   * @return {Promise<ArrayBuffer>}
   */
  async arrayBuffer () {
    // Easier way... Just a unnecessary overhead
    // const view = new Uint8Array(this.size);
    // await this.stream().getReader({mode: 'byob'}).read(view);
    // return view.buffer;

    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of toIterator(this.#parts, false)) {
      data.set(chunk, offset);
      offset += chunk.length;
    }

    return data.buffer
  }

  stream () {
    const it = toIterator(this.#parts, true);

    return new globalThis.ReadableStream({
      // @ts-ignore
      type: 'bytes',
      async pull (ctrl) {
        const chunk = await it.next();
        chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
      },

      async cancel () {
        await it.return();
      }
    })
  }

  /**
   * The Blob interface's slice() method creates and returns a
   * new Blob object which contains data from a subset of the
   * blob on which it's called.
   *
   * @param {number} [start]
   * @param {number} [end]
   * @param {string} [type]
   */
  slice (start = 0, end = this.size, type = '') {
    const { size } = this;

    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);

    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = this.#parts;
    const blobParts = [];
    let added = 0;

    for (const part of parts) {
      // don't add the overflow to new blobParts
      if (added >= span) {
        break
      }

      const size = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size <= relativeStart) {
        // Skip the beginning and change the relative
        // start & end position as we skip the unwanted parts
        relativeStart -= size;
        relativeEnd -= size;
      } else {
        let chunk;
        if (ArrayBuffer.isView(part)) {
          chunk = part.subarray(relativeStart, Math.min(size, relativeEnd));
          added += chunk.byteLength;
        } else {
          chunk = part.slice(relativeStart, Math.min(size, relativeEnd));
          added += chunk.size;
        }
        relativeEnd -= size;
        blobParts.push(chunk);
        relativeStart = 0; // All next sequential parts should start at 0
      }
    }

    const blob = new Blob([], { type: String(type).toLowerCase() });
    blob.#size = span;
    blob.#parts = blobParts;

    return blob
  }

  get [Symbol.toStringTag] () {
    return 'Blob'
  }

  static [Symbol.hasInstance] (object) {
    return (
      object &&
      typeof object === 'object' &&
      typeof object.constructor === 'function' &&
      (
        typeof object.stream === 'function' ||
        typeof object.arrayBuffer === 'function'
      ) &&
      /^(Blob|File)$/.test(object[Symbol.toStringTag])
    )
  }
};

Object.defineProperties(_Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});

/** @type {typeof globalThis.Blob} */
const Blob = _Blob;

const _File = class File extends Blob {
  #lastModified = 0
  #name = ''

  /**
   * @param {*[]} fileBits
   * @param {string} fileName
   * @param {{lastModified?: number, type?: string}} options
   */// @ts-ignore
  constructor (fileBits, fileName, options = {}) {
    if (arguments.length < 2) {
      throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`)
    }
    super(fileBits, options);

    if (options === null) options = {};

    // Simulate WebIDL type casting for NaN value in lastModified option.
    const lastModified = options.lastModified === undefined ? Date.now() : Number(options.lastModified);
    if (!Number.isNaN(lastModified)) {
      this.#lastModified = lastModified;
    }

    this.#name = String(fileName);
  }

  get name () {
    return this.#name
  }

  get lastModified () {
    return this.#lastModified
  }

  get [Symbol.toStringTag] () {
    return 'File'
  }

  static [Symbol.hasInstance] (object) {
    return !!object && object instanceof Blob &&
      /^(File)$/.test(object[Symbol.toStringTag])
  }
};

/** @type {typeof globalThis.File} */// @ts-ignore
const File = _File;

/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

var {toStringTag:t,iterator:i,hasInstance:h}=Symbol,
r=Math.random,
m='append,set,get,getAll,delete,keys,values,entries,forEach,constructor'.split(','),
f=(a,b,c)=>(a+='',/^(Blob|File)$/.test(b && b[t])?[(c=c!==void 0?c+'':b[t]=='File'?b.name:'blob',a),b.name!==c||b[t]=='blob'?new File([b],c,b):b]:[a,b+'']),
e=(c,f)=>(f?c:c.replace(/\r?\n|\r/g,'\r\n')).replace(/\n/g,'%0A').replace(/\r/g,'%0D').replace(/"/g,'%22'),
x=(n, a, e)=>{if(a.length<e){throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e} arguments required, but only ${a.length} present.`)}};

/** @type {typeof globalThis.FormData} */
const FormData = class FormData {
#d=[];
constructor(...a){if(a.length)throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`)}
get [t]() {return 'FormData'}
[i](){return this.entries()}
static [h](o) {return o&&typeof o==='object'&&o[t]==='FormData'&&!m.some(m=>typeof o[m]!='function')}
append(...a){x('append',arguments,2);this.#d.push(f(...a));}
delete(a){x('delete',arguments,1);a+='';this.#d=this.#d.filter(([b])=>b!==a);}
get(a){x('get',arguments,1);a+='';for(var b=this.#d,l=b.length,c=0;c<l;c++)if(b[c][0]===a)return b[c][1];return null}
getAll(a,b){x('getAll',arguments,1);b=[];a+='';this.#d.forEach(c=>c[0]===a&&b.push(c[1]));return b}
has(a){x('has',arguments,1);a+='';return this.#d.some(b=>b[0]===a)}
forEach(a,b){x('forEach',arguments,1);for(var [c,d]of this)a.call(b,d,c,this);}
set(...a){x('set',arguments,2);var b=[],c=!0;a=f(...a);this.#d.forEach(d=>{d[0]===a[0]?c&&(c=!b.push(a)):b.push(d);});c&&b.push(a);this.#d=b;}
*entries(){yield*this.#d;}
*keys(){for(var[a]of this)yield a;}
*values(){for(var[,a]of this)yield a;}};

/** @param {FormData} F */
function formDataToBlob (F,B=Blob){
var b=`${r()}${r()}`.replace(/\./g, '').slice(-28).padStart(32, '-'),c=[],p=`--${b}\r\nContent-Disposition: form-data; name="`;
F.forEach((v,n)=>typeof v=='string'
?c.push(p+e(n)+`"\r\n\r\n${v.replace(/\r(?!\n)|(?<!\r)\n/g, '\r\n')}\r\n`)
:c.push(p+e(n)+`"; filename="${e(v.name, 1)}"\r\nContent-Type: ${v.type||"application/octet-stream"}\r\n\r\n`, v, '\r\n'));
c.push(`--${b}--`);
return new B(c,{type:"multipart/form-data; boundary="+b})}

class FetchBaseError extends Error {
	constructor(message, type) {
		super(message);
		// Hide custom error implementation details from end-users
		Error.captureStackTrace(this, this.constructor);

		this.type = type;
	}

	get name() {
		return this.constructor.name;
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}

/**
 * @typedef {{ address?: string, code: string, dest?: string, errno: number, info?: object, message: string, path?: string, port?: number, syscall: string}} SystemError
*/

/**
 * FetchError interface for operational errors
 */
class FetchError extends FetchBaseError {
	/**
	 * @param  {string} message -      Error message for human
	 * @param  {string} [type] -        Error type for machine
	 * @param  {SystemError} [systemError] - For Node.js system error
	 */
	constructor(message, type, systemError) {
		super(message, type);
		// When err.type is `system`, err.erroredSysCall contains system error and err.code contains system error code
		if (systemError) {
			// eslint-disable-next-line no-multi-assign
			this.code = this.errno = systemError.code;
			this.erroredSysCall = systemError.syscall;
		}
	}
}

/**
 * Is.js
 *
 * Object type checks.
 */

const NAME = Symbol.toStringTag;

/**
 * Check if `obj` is a URLSearchParams object
 * ref: https://github.com/node-fetch/node-fetch/issues/296#issuecomment-307598143
 * @param {*} object - Object to check for
 * @return {boolean}
 */
const isURLSearchParameters = object => {
	return (
		typeof object === 'object' &&
		typeof object.append === 'function' &&
		typeof object.delete === 'function' &&
		typeof object.get === 'function' &&
		typeof object.getAll === 'function' &&
		typeof object.has === 'function' &&
		typeof object.set === 'function' &&
		typeof object.sort === 'function' &&
		object[NAME] === 'URLSearchParams'
	);
};

/**
 * Check if `object` is a W3C `Blob` object (which `File` inherits from)
 * @param {*} object - Object to check for
 * @return {boolean}
 */
const isBlob = object => {
	return (
		object &&
		typeof object === 'object' &&
		typeof object.arrayBuffer === 'function' &&
		typeof object.type === 'string' &&
		typeof object.stream === 'function' &&
		typeof object.constructor === 'function' &&
		/^(Blob|File)$/.test(object[NAME])
	);
};

/**
 * Check if `obj` is an instance of AbortSignal.
 * @param {*} object - Object to check for
 * @return {boolean}
 */
const isAbortSignal = object => {
	return (
		typeof object === 'object' && (
			object[NAME] === 'AbortSignal' ||
			object[NAME] === 'EventTarget'
		)
	);
};

promisify(Stream.pipeline);
const INTERNALS$1 = Symbol('Body internals');

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Body {
	constructor(body, {
		size = 0
	} = {}) {
		let boundary = null;

		if (body === null) {
			// Body is undefined or null
			body = null;
		} else if (isURLSearchParameters(body)) {
			// Body is a URLSearchParams
			body = Buffer$1.from(body.toString());
		} else if (isBlob(body)) ; else if (Buffer$1.isBuffer(body)) ; else if (types.isAnyArrayBuffer(body)) {
			// Body is ArrayBuffer
			body = Buffer$1.from(body);
		} else if (ArrayBuffer.isView(body)) {
			// Body is ArrayBufferView
			body = Buffer$1.from(body.buffer, body.byteOffset, body.byteLength);
		} else if (body instanceof Stream) ; else if (body instanceof FormData) {
			// Body is FormData
			body = formDataToBlob(body);
			boundary = body.type.split('=')[1];
		} else {
			// None of the above
			// coerce to string then buffer
			body = Buffer$1.from(String(body));
		}

		let stream = body;

		if (Buffer$1.isBuffer(body)) {
			stream = Stream.Readable.from(body);
		} else if (isBlob(body)) {
			stream = Stream.Readable.from(body.stream());
		}

		this[INTERNALS$1] = {
			body,
			stream,
			boundary,
			disturbed: false,
			error: null
		};
		this.size = size;

		if (body instanceof Stream) {
			body.on('error', error_ => {
				const error = error_ instanceof FetchBaseError ?
					error_ :
					new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, 'system', error_);
				this[INTERNALS$1].error = error;
			});
		}
	}

	get body() {
		return this[INTERNALS$1].stream;
	}

	get bodyUsed() {
		return this[INTERNALS$1].disturbed;
	}

	/**
	 * Decode response as ArrayBuffer
	 *
	 * @return  Promise
	 */
	async arrayBuffer() {
		const {buffer, byteOffset, byteLength} = await consumeBody(this);
		return buffer.slice(byteOffset, byteOffset + byteLength);
	}

	async formData() {
		const ct = this.headers.get('content-type');

		if (ct.startsWith('application/x-www-form-urlencoded')) {
			const formData = new FormData();
			const parameters = new URLSearchParams(await this.text());

			for (const [name, value] of parameters) {
				formData.append(name, value);
			}

			return formData;
		}

		const {toFormData} = await import('../chunks/multipart-parser.js');
		return toFormData(this.body, ct);
	}

	/**
	 * Return raw response as Blob
	 *
	 * @return Promise
	 */
	async blob() {
		const ct = (this.headers && this.headers.get('content-type')) || (this[INTERNALS$1].body && this[INTERNALS$1].body.type) || '';
		const buf = await this.arrayBuffer();

		return new Blob([buf], {
			type: ct
		});
	}

	/**
	 * Decode response as json
	 *
	 * @return  Promise
	 */
	async json() {
		const text = await this.text();
		return JSON.parse(text);
	}

	/**
	 * Decode response as text
	 *
	 * @return  Promise
	 */
	async text() {
		const buffer = await consumeBody(this);
		return new TextDecoder().decode(buffer);
	}

	/**
	 * Decode response as buffer (non-spec api)
	 *
	 * @return  Promise
	 */
	buffer() {
		return consumeBody(this);
	}
}

Body.prototype.buffer = deprecate(Body.prototype.buffer, 'Please use \'response.arrayBuffer()\' instead of \'response.buffer()\'', 'node-fetch#buffer');

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: {enumerable: true},
	bodyUsed: {enumerable: true},
	arrayBuffer: {enumerable: true},
	blob: {enumerable: true},
	json: {enumerable: true},
	text: {enumerable: true},
	data: {get: deprecate(() => {},
		'data doesn\'t exist, use json(), text(), arrayBuffer(), or body instead',
		'https://github.com/node-fetch/node-fetch/issues/1000 (response)')}
});

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return Promise
 */
async function consumeBody(data) {
	if (data[INTERNALS$1].disturbed) {
		throw new TypeError(`body used already for: ${data.url}`);
	}

	data[INTERNALS$1].disturbed = true;

	if (data[INTERNALS$1].error) {
		throw data[INTERNALS$1].error;
	}

	const {body} = data;

	// Body is null
	if (body === null) {
		return Buffer$1.alloc(0);
	}

	/* c8 ignore next 3 */
	if (!(body instanceof Stream)) {
		return Buffer$1.alloc(0);
	}

	// Body is stream
	// get ready to actually consume the body
	const accum = [];
	let accumBytes = 0;

	try {
		for await (const chunk of body) {
			if (data.size > 0 && accumBytes + chunk.length > data.size) {
				const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, 'max-size');
				body.destroy(error);
				throw error;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		}
	} catch (error) {
		const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, 'system', error);
		throw error_;
	}

	if (body.readableEnded === true || body._readableState.ended === true) {
		try {
			if (accum.every(c => typeof c === 'string')) {
				return Buffer$1.from(accum.join(''));
			}

			return Buffer$1.concat(accum, accumBytes);
		} catch (error) {
			throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, 'system', error);
		}
	} else {
		throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
	}
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed   instance       Response or Request instance
 * @param   String  highWaterMark  highWaterMark for both PassThrough body streams
 * @return  Mixed
 */
const clone = (instance, highWaterMark) => {
	let p1;
	let p2;
	let {body} = instance[INTERNALS$1];

	// Don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// Check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if ((body instanceof Stream) && (typeof body.getBoundary !== 'function')) {
		// Tee instance body
		p1 = new PassThrough$1({highWaterMark});
		p2 = new PassThrough$1({highWaterMark});
		body.pipe(p1);
		body.pipe(p2);
		// Set instance body to teed body and return the other teed body
		instance[INTERNALS$1].stream = p1;
		body = p2;
	}

	return body;
};

const getNonSpecFormDataBoundary = deprecate(
	body => body.getBoundary(),
	'form-data doesn\'t follow the spec and requires special treatment. Use alternative package',
	'https://github.com/node-fetch/node-fetch/issues/1167'
);

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param {any} body Any options.body input
 * @returns {string | null}
 */
const extractContentType = (body, request) => {
	// Body is null or undefined
	if (body === null) {
		return null;
	}

	// Body is string
	if (typeof body === 'string') {
		return 'text/plain;charset=UTF-8';
	}

	// Body is a URLSearchParams
	if (isURLSearchParameters(body)) {
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	}

	// Body is blob
	if (isBlob(body)) {
		return body.type || null;
	}

	// Body is a Buffer (Buffer, ArrayBuffer or ArrayBufferView)
	if (Buffer$1.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
		return null;
	}

	if (body instanceof FormData) {
		return `multipart/form-data; boundary=${request[INTERNALS$1].boundary}`;
	}

	// Detect form data input from form-data module
	if (body && typeof body.getBoundary === 'function') {
		return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
	}

	// Body is stream - can't really do much about this
	if (body instanceof Stream) {
		return null;
	}

	// Body constructor defaults other things to string
	return 'text/plain;charset=UTF-8';
};

/**
 * Headers.js
 *
 * Headers class offers convenient helpers
 */

/* c8 ignore next 9 */
const validateHeaderName = typeof http.validateHeaderName === 'function' ?
	http.validateHeaderName :
	name => {
		if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
			const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
			Object.defineProperty(error, 'code', {value: 'ERR_INVALID_HTTP_TOKEN'});
			throw error;
		}
	};

/* c8 ignore next 9 */
const validateHeaderValue = typeof http.validateHeaderValue === 'function' ?
	http.validateHeaderValue :
	(name, value) => {
		if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
			const error = new TypeError(`Invalid character in header content ["${name}"]`);
			Object.defineProperty(error, 'code', {value: 'ERR_INVALID_CHAR'});
			throw error;
		}
	};

/**
 * @typedef {Headers | Record<string, string> | Iterable<readonly [string, string]> | Iterable<Iterable<string>>} HeadersInit
 */

/**
 * This Fetch API interface allows you to perform various actions on HTTP request and response headers.
 * These actions include retrieving, setting, adding to, and removing.
 * A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.
 * You can add to this using methods like append() (see Examples.)
 * In all methods of this interface, header names are matched by case-insensitive byte sequence.
 *
 */
class Headers extends URLSearchParams {
	/**
	 * Headers class
	 *
	 * @constructor
	 * @param {HeadersInit} [init] - Response headers
	 */
	constructor(init) {
		// Validate and normalize init object in [name, value(s)][]
		/** @type {string[][]} */
		let result = [];
		if (init instanceof Headers) {
			const raw = init.raw();
			for (const [name, values] of Object.entries(raw)) {
				result.push(...values.map(value => [name, value]));
			}
		} else if (init == null) ; else if (typeof init === 'object' && !types.isBoxedPrimitive(init)) {
			const method = init[Symbol.iterator];
			// eslint-disable-next-line no-eq-null, eqeqeq
			if (method == null) {
				// Record<ByteString, ByteString>
				result.push(...Object.entries(init));
			} else {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// Sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				result = [...init]
					.map(pair => {
						if (
							typeof pair !== 'object' || types.isBoxedPrimitive(pair)
						) {
							throw new TypeError('Each header pair must be an iterable object');
						}

						return [...pair];
					}).map(pair => {
						if (pair.length !== 2) {
							throw new TypeError('Each header pair must be a name/value tuple');
						}

						return [...pair];
					});
			}
		} else {
			throw new TypeError('Failed to construct \'Headers\': The provided value is not of type \'(sequence<sequence<ByteString>> or record<ByteString, ByteString>)');
		}

		// Validate and lowercase
		result =
			result.length > 0 ?
				result.map(([name, value]) => {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return [String(name).toLowerCase(), String(value)];
				}) :
				undefined;

		super(result);

		// Returning a Proxy that will lowercase key names, validate parameters and sort keys
		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get(target, p, receiver) {
				switch (p) {
					case 'append':
					case 'set':
						return (name, value) => {
							validateHeaderName(name);
							validateHeaderValue(name, String(value));
							return URLSearchParams.prototype[p].call(
								target,
								String(name).toLowerCase(),
								String(value)
							);
						};

					case 'delete':
					case 'has':
					case 'getAll':
						return name => {
							validateHeaderName(name);
							return URLSearchParams.prototype[p].call(
								target,
								String(name).toLowerCase()
							);
						};

					case 'keys':
						return () => {
							target.sort();
							return new Set(URLSearchParams.prototype.keys.call(target)).keys();
						};

					default:
						return Reflect.get(target, p, receiver);
				}
			}
		});
		/* c8 ignore next */
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	toString() {
		return Object.prototype.toString.call(this);
	}

	get(name) {
		const values = this.getAll(name);
		if (values.length === 0) {
			return null;
		}

		let value = values.join(', ');
		if (/^content-encoding$/i.test(name)) {
			value = value.toLowerCase();
		}

		return value;
	}

	forEach(callback, thisArg = undefined) {
		for (const name of this.keys()) {
			Reflect.apply(callback, thisArg, [this.get(name), name, this]);
		}
	}

	* values() {
		for (const name of this.keys()) {
			yield this.get(name);
		}
	}

	/**
	 * @type {() => IterableIterator<[string, string]>}
	 */
	* entries() {
		for (const name of this.keys()) {
			yield [name, this.get(name)];
		}
	}

	[Symbol.iterator]() {
		return this.entries();
	}

	/**
	 * Node-fetch non-spec method
	 * returning all headers and their values as array
	 * @returns {Record<string, string[]>}
	 */
	raw() {
		return [...this.keys()].reduce((result, key) => {
			result[key] = this.getAll(key);
			return result;
		}, {});
	}

	/**
	 * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
	 */
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return [...this.keys()].reduce((result, key) => {
			const values = this.getAll(key);
			// Http.request() only supports string as Host header.
			// This hack makes specifying custom Host header possible.
			if (key === 'host') {
				result[key] = values[0];
			} else {
				result[key] = values.length > 1 ? values : values[0];
			}

			return result;
		}, {});
	}
}

/**
 * Re-shaping object for Web IDL tests
 * Only need to do it for overridden methods
 */
Object.defineProperties(
	Headers.prototype,
	['get', 'entries', 'forEach', 'values'].reduce((result, property) => {
		result[property] = {enumerable: true};
		return result;
	}, {})
);

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#enumdef-referrerpolicy|enum ReferrerPolicy}
 */
const ReferrerPolicy = new Set([
	'',
	'no-referrer',
	'no-referrer-when-downgrade',
	'same-origin',
	'origin',
	'strict-origin',
	'origin-when-cross-origin',
	'strict-origin-when-cross-origin',
	'unsafe-url'
]);

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#referrer-policies|Referrer Policy §3. Referrer Policies}
 * @param {string} referrerPolicy
 * @returns {string} referrerPolicy
 */
function validateReferrerPolicy(referrerPolicy) {
	if (!ReferrerPolicy.has(referrerPolicy)) {
		throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
	}

	return referrerPolicy;
}

/**
 * Request.js
 *
 * Request class contains server only options
 *
 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
 */

const INTERNALS = Symbol('Request internals');

/**
 * Check if `obj` is an instance of Request.
 *
 * @param  {*} object
 * @return {boolean}
 */
const isRequest = object => {
	return (
		typeof object === 'object' &&
		typeof object[INTERNALS] === 'object'
	);
};

const doBadDataWarn = deprecate(() => {},
	'.data is not a valid RequestInit property, use .body instead',
	'https://github.com/node-fetch/node-fetch/issues/1000 (request)');

/**
 * Request class
 *
 * Ref: https://fetch.spec.whatwg.org/#request-class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request extends Body {
	constructor(input, init = {}) {
		let parsedURL;

		// Normalize input and force URL to be encoded as UTF-8 (https://github.com/node-fetch/node-fetch/issues/245)
		if (isRequest(input)) {
			parsedURL = new URL(input.url);
		} else {
			parsedURL = new URL(input);
			input = {};
		}

		if (parsedURL.username !== '' || parsedURL.password !== '') {
			throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
		}

		let method = init.method || input.method || 'GET';
		if (/^(delete|get|head|options|post|put)$/i.test(method)) {
			method = method.toUpperCase();
		}

		if ('data' in init) {
			doBadDataWarn();
		}

		// eslint-disable-next-line no-eq-null, eqeqeq
		if ((init.body != null || (isRequest(input) && input.body !== null)) &&
			(method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		const inputBody = init.body ?
			init.body :
			(isRequest(input) && input.body !== null ?
				clone(input) :
				null);

		super(inputBody, {
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody, this);
			if (contentType) {
				headers.set('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ?
			input.signal :
			null;
		if ('signal' in init) {
			signal = init.signal;
		}

		// eslint-disable-next-line no-eq-null, eqeqeq
		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal or EventTarget');
		}

		// §5.4, Request constructor steps, step 15.1
		// eslint-disable-next-line no-eq-null, eqeqeq
		let referrer = init.referrer == null ? input.referrer : init.referrer;
		if (referrer === '') {
			// §5.4, Request constructor steps, step 15.2
			referrer = 'no-referrer';
		} else if (referrer) {
			// §5.4, Request constructor steps, step 15.3.1, 15.3.2
			const parsedReferrer = new URL(referrer);
			// §5.4, Request constructor steps, step 15.3.3, 15.3.4
			referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? 'client' : parsedReferrer;
		} else {
			referrer = undefined;
		}

		this[INTERNALS] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal,
			referrer
		};

		// Node-fetch-only options
		this.follow = init.follow === undefined ? (input.follow === undefined ? 20 : input.follow) : init.follow;
		this.compress = init.compress === undefined ? (input.compress === undefined ? true : input.compress) : init.compress;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
		this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
		this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;

		// §5.4, Request constructor steps, step 16.
		// Default is empty string per https://fetch.spec.whatwg.org/#concept-request-referrer-policy
		this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || '';
	}

	/** @returns {string} */
	get method() {
		return this[INTERNALS].method;
	}

	/** @returns {string} */
	get url() {
		return format(this[INTERNALS].parsedURL);
	}

	/** @returns {Headers} */
	get headers() {
		return this[INTERNALS].headers;
	}

	get redirect() {
		return this[INTERNALS].redirect;
	}

	/** @returns {AbortSignal} */
	get signal() {
		return this[INTERNALS].signal;
	}

	// https://fetch.spec.whatwg.org/#dom-request-referrer
	get referrer() {
		if (this[INTERNALS].referrer === 'no-referrer') {
			return '';
		}

		if (this[INTERNALS].referrer === 'client') {
			return 'about:client';
		}

		if (this[INTERNALS].referrer) {
			return this[INTERNALS].referrer.toString();
		}

		return undefined;
	}

	get referrerPolicy() {
		return this[INTERNALS].referrerPolicy;
	}

	set referrerPolicy(referrerPolicy) {
		this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
	}

	/**
	 * Clone this request
	 *
	 * @return  Request
	 */
	clone() {
		return new Request(this);
	}

	get [Symbol.toStringTag]() {
		return 'Request';
	}
}

Object.defineProperties(Request.prototype, {
	method: {enumerable: true},
	url: {enumerable: true},
	headers: {enumerable: true},
	redirect: {enumerable: true},
	clone: {enumerable: true},
	signal: {enumerable: true},
	referrer: {enumerable: true},
	referrerPolicy: {enumerable: true}
});

/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

if (!globalThis.DOMException) {
  try {
    const { MessageChannel } = require('worker_threads'),
    port = new MessageChannel().port1,
    ab = new ArrayBuffer();
    port.postMessage(ab, [ab, ab]);
  } catch (err) {
    err.constructor.name === 'DOMException' && (
      globalThis.DOMException = err.constructor
    );
  }
}

/** @type {Record<string, any>} */
const globals = {
	crypto: webcrypto,
	fetch,
	Response,
	// TODO remove the superclass as soon as Undici supports formData
	// https://github.com/nodejs/undici/issues/974
	Request: class extends Request$1 {
		// @ts-expect-error
		formData() {
			return new Request(this.url, {
				method: this.method,
				headers: this.headers,
				body: this.body && Readable$3.from(this.body)
			}).formData();
		}
	},
	Headers: Headers$1,
	ReadableStream: ReadableStream$2,
	TransformStream,
	WritableStream
};

// exported for dev/preview and node environments
function installPolyfills() {
	for (const name in globals) {
		Object.defineProperty(globalThis, name, {
			enumerable: true,
			configurable: true,
			writable: true,
			value: globals[name]
		});
	}
}

export { FormData as F, File as a, installPolyfills };
