/* @ts-self-types="./formantwise_core.d.ts" */

/**
 * The BUILD, not the version: `git describe` at compile time (nearest `v*`
 * tag, commits since, sha) plus `+dirty` when the tree had uncommitted
 * tracked changes -- the bundle's counterpart of `formantwise-pipe --build-id`,
 * for a page that shows which candidate it runs without hard-coding it.
 * @returns {string}
 */
export function build_id() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.build_id();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Which build this is, for a page that logs its provenance.
 *
 * Since 2026-09-11 the bundle carries praatfan, so there is no missing-column
 * caveat left to print: the feature set is the binary's minus `parallel`.
 * @returns {string}
 */
export function build_info() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.build_info();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * DECODE AN AUDIO FILE'S BYTES: `bytes` (a `Uint8Array` holding the whole
 * file) -> `{samples, rate, channels, codec, lossy, lossy_audio}` or
 * `{error}`.  Nothing throws.
 *
 * The host-side half of `wav_path` for a surface that has no filesystem: the
 * SAME reader the binary uses (`hound` first, then praatfan's decoder --
 * symphonia FLAC / MP3 / AAC / Ogg Vorbis, desphere NIST SPHERE incl.
 * shorten; `audio::decode_bytes`), so handing `samples` and `rate` to
 * `prepass` / `run_intervals` / `detect` gives the native binary's numbers
 * on the same file -- to the bit for WAV / FLAC / SPHERE / Vorbis; MP3 and
 * AAC decode an f32 ulp apart through wasm's libm (docs/PROTOCOL.md).
 *
 * * `samples` -- a `Float64Array` of CHANNEL 0 at the file's own rate, NOT
 *   centred (the engine removes the DC itself, as it does for any samples).
 * * `channels` -- how many the file had (only channel 0 is returned).
 * * `codec` -- `pcm_s16le`, `pcm_f32le`, `flac`, `nist_sphere`, `mp3`, ...
 * * `lossy` / `lossy_audio` -- for a lossy codec, `true` and the very
 *   `{codec, message}` object the binary adds to its response as
 *   `lossy_audio` (decoders add delay and padding, so times may shift against
 *   label files); else `false` / `null`.  The analysis exports cannot see
 *   where samples came from, so carrying the warning is the host's job.
 *
 * `name` is the file's name or extension (`"x.mp3"`, `"mp3"`, or `""`),
 * passed to the format probe as a hint exactly as the binary passes a path's
 * extension; the probe reads the bytes either way.
 * @param {Uint8Array} bytes
 * @param {string} name
 * @returns {any}
 */
export function decode_audio(bytes, name) {
    const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.decode_audio(bytes, ptr0, len0);
    return ret;
}

/**
 * `action: "detect"` — broad-class spans and extract-ready `vowel_intervals`
 * from the baked `en-buckeye` artifact.  The action DISPATCHES ON THE
 * ARTIFACT'S FORMAT TAG, not on the export it was called through, so a further
 * artifact kind baked in beside it would be served through this same export.
 *
 * It exists here because the bundle now carries praatfan: the model's features
 * are read off the conditioning tracks, and before 2026-09-11 this bundle had
 * none, so the export would have been one that could only refuse.
 *
 * `model_path` takes the BAKED names only — a browser has no filesystem — so
 * the model this serves is one compiled into the bundle, and `detect_model`
 * in the response names it (sha256 included) exactly as the binary's does.
 * `audio_offset_s` is refused for a BROAD-CLASS `detect` on every transport
 * (the model reads whole-signal tracks and a window truncates them at both
 * ends).
 *
 * So a broad `detect` is one whole-recording call, and its linear memory
 * grows with it: ~36 MiB per minute of 16 kHz audio, ~44 at 24 kHz, several
 * times that at 44.1 kHz (measured 2026-10-08; `docs/PROTOCOL.md`, "Broad
 * `detect` on a long recording").  Resample to 16 kHz before a long one.
 * The split detect below spreads the TRACKING over workers, but each stage
 * still takes the whole recording.
 * @param {Float64Array} samples
 * @param {number} sample_rate
 * @param {string} request_json
 * @returns {string}
 */
export function detect(samples, sample_rate, request_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.detect(samples, sample_rate, ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * See [`detect_plan`].
 * @param {Float64Array} samples
 * @param {number} sample_rate
 * @param {string} request_json
 * @returns {string}
 */
export function detect_chunk(samples, sample_rate, request_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.detect_chunk(samples, sample_rate, ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * See [`detect_plan`].
 * @param {Float64Array} samples
 * @param {number} sample_rate
 * @param {string} request_json
 * @returns {string}
 */
export function detect_finish(samples, sample_rate, request_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.detect_finish(samples, sample_rate, ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * THE SPLIT `detect` (2026-11-07; `docs/PROTOCOL.md`, "Split detect"): the
 * same broad request served in three stages so a page can spread the
 * tracking over independent workers -- `detect_plan` once, `detect_chunk`
 * on any worker for any subset of the plan's chunks, `detect_finish` once
 * with every chunk -- and get one-call `detect`'s answer byte for byte.
 * @param {Float64Array} samples
 * @param {number} sample_rate
 * @param {string} request_json
 * @returns {string}
 */
export function detect_plan(samples, sample_rate, request_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.detect_plan(samples, sample_rate, ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * One JSON object in, one JSON response out — whatever `action` it names.
 *
 * This is the literal protocol surface; `prepass`, `run_intervals`, `detect`
 * and the three split-detect exports are the named doors onto it, and exist
 * so that a caller cannot forget the action.
 * @param {Float64Array} samples
 * @param {number} sample_rate
 * @param {string} request_json
 * @returns {string}
 */
export function pipe_request(samples, sample_rate, request_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.pipe_request(samples, sample_rate, ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * `action: "prepass"` — the speaker anchor (`config.speaker_f3` / `speaker_f4`).
 *
 * `samples` is mono and is CONSUMED (the JS `Float64Array` is untouched — this
 * takes ownership of the copy the binding already made, so the audio is
 * resident once rather than twice); `request_json` may be `""` or `"{}"` for
 * "defaults, whole file".  Pin the anchor back into `run_intervals` to skip the
 * prepass — and pin `audio_mean` too if the run_intervals calls are windowed.
 * @param {Float64Array} samples
 * @param {number} sample_rate
 * @param {string} request_json
 * @returns {string}
 */
export function prepass(samples, sample_rate, request_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.prepass(samples, sample_rate, ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * `action: "run_intervals"` — `measurements[]`, one `points[]` entry per
 * requested fraction, plus the dense track when the request asks for
 * `"frames": true`.
 * @param {Float64Array} samples
 * @param {number} sample_rate
 * @param {string} request_json
 * @returns {string}
 */
export function run_intervals(samples, sample_rate, request_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(request_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.run_intervals(samples, sample_rate, ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Better panic messages in the console.  Runs on module instantiation.
 */
export function start() {
    wasm.start();
}

/**
 * THE LAST REQUEST'S BINARY MATRICES (`"matrix_dtype": "f32" | "f64"` on
 * `detect` / `detect_finish`): an `ArrayBuffer` holding the
 * `formantwise-matrix/1` blob the response's `binary` block describes (its
 * 32-byte header, then the matrices; `frames[i].posterior` / `.features`
 * become `{offset, rows, cols}` into it, offsets counted from the buffer's
 * byte 0), or `null` when the last request wrote none.  The same bytes the
 * native pipe writes to `binary_path` (docs/PROTOCOL.md, "Binary matrices").  Reading it empties it,
 * and every analysis call starts afresh, as `take_log()` does.
 *
 * The buffer lives in the JS heap, NOT in the module's linear memory: the
 * engine streams the matrices into it through a 64 KiB staging buffer, so
 * the wasm memory never holds the blob (and never holds it as text), and the
 * buffer is transferable (`postMessage(buf, [buf])`) from a worker.
 * @returns {any}
 */
export function take_binary() {
    const ret = wasm.take_binary();
    return ret;
}

/**
 * THE LAST REQUEST'S LOG: the informational lines the binary prints on stderr
 * while serving it (e.g. `formantwise: prepass select=conditioning: 18 of 26
 * candidate frames kept (...)`), each ending in `\n`, in the order the binary
 * prints them; `""` when there were none.  Reading it empties it, and every
 * analysis call (`pipe_request`, `prepass`, `run_intervals`, `detect` and the
 * three split-detect exports) starts a fresh one, so call it after the
 * request it describes.
 *
 * A host that prints this on its stderr shows the binary's log.  Two lines
 * are NOT in it, because the response already carries them and the hosts
 * print them from there: the `ignored_keys` warning (the binary prints it
 * first, before any line of this log) and the `lossy_audio` warning (which
 * `decode_audio` returns).  The log is informational only: nothing in it is
 * absent from the response's contract, and the response is byte-identical
 * whether or not this is ever called.
 * @returns {string}
 */
export function take_log() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.take_log();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * The engine tag, identical to the `engine` field of every response.
 *
 * It names the ENGINE, not the transport, and this bundle is the same Rust
 * code the binary is — so it is deliberately the same string.  Use
 * `build_info()` to tell a bundle from a binary.
 * @returns {string}
 */
export function version() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.version();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_is_null_5160b3e381865372: function(arg0) {
            const ret = arg0 === null;
            return ret;
        },
        __wbg___wbindgen_is_undefined_8c687d0b90d5b524: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_string_get_92ab86bb19cbc12f: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_5d9e815e6fdf150f: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg___wbindgen_typeof_8e630e4d777e2338: function(arg0) {
            const ret = typeof arg0;
            return ret;
        },
        __wbg_buffer_4a989bded7035f57: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_byteLength_833e40ea99ce65ce: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_constructor_207e5664c25e1af9: function(arg0) {
            const ret = arg0.constructor;
            return ret;
        },
        __wbg_error_757e9472f8410341: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_instanceof_Float64Array_a1a224867ea646c3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Float64Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Object_87732cb922ac2e2c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Object;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_598adc0fef426aa8: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_length_31bdaf014f5fbde2: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_598aff98d0c65a59: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_name_b4e1ee96e711fbdf: function(arg0) {
            const ret = arg0.name;
            return ret;
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_bebc3f4757acf305: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_with_length_5ffeddb9d9fbb96f: function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_e90621e112da5f41: function(arg0) {
            const ret = new Float64Array(arg0 >>> 0);
            return ret;
        },
        __wbg_parse_6937a9050adfb0e1: function() { return handleError(function (arg0, arg1) {
            const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_prototypesetcall_5c62be9626638df9: function(arg0, arg1, arg2) {
            Float64Array.prototype.set.call(getArrayF64FromWasm0(arg0, arg1), arg2);
        },
        __wbg_prototypesetcall_ae9f5e7459250748: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_set_5f2ad37e5e02dc7b: function(arg0, arg1, arg2) {
            arg0.set(getArrayU8FromWasm0(arg1, arg2));
        },
        __wbg_set_a377297433dfea63: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_f1e37f7786b4c22e: function(arg0, arg1, arg2) {
            arg0.set(getArrayF64FromWasm0(arg1, arg2));
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_subarray_1daff70dde20c145: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbindgen_generic_0000000000000001: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_generic_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./formantwise_core_bg.js": import0,
    };
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (!module.ok) {
            throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
        }

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('formantwise_core_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
