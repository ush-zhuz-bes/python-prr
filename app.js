/* app.js — интерфейс және интерактивтер.
 * Таза JavaScript, сыртқы кітапханасыз. Деректер: lessons.js (window.LESSONS).
 * Назар аударыңыз: бұл — Python интерпретаторы емес. Зертханалар Python-ның индекстеу,
 * тілімдеу және тізім әдістерінің мінез-құлқын бөлек, шағын демонстрация ретінде көрсетеді. */
(function () {
  'use strict';

  var DATA = window.LESSONS;
  if (!DATA) {
    document.body.textContent = 'lessons.js жүктелмеді. index.html мен lessons.js бір қалтада болуы керек.';
    return;
  }

  /* ───────────────────────── Көмекші функциялар ───────────────────────── */

  function h(tag, props) {
    var el = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        var v = props[k];
        if (v == null || v === false) return;
        if (k === 'class') el.className = v;
        else if (k === 'dataset') Object.keys(v).forEach(function (d) { el.dataset[d] = v[d]; });
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
        else if (v === true) el.setAttribute(k, '');
        else el.setAttribute(k, String(v));
      });
    }
    var kids = Array.prototype.slice.call(arguments, 2);
    appendKids(el, kids);
    return el;
  }
  function appendKids(el, kids) {
    kids.forEach(function (k) {
      if (k == null || k === false) return;
      if (Array.isArray(k)) appendKids(el, k);
      else if (k.nodeType) el.appendChild(k);
      else el.appendChild(document.createTextNode(String(k)));
    });
  }
  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); return el; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function fmtTime(ms) {
    var s = Math.max(0, Math.ceil(ms / 1000));
    return pad2(Math.floor(s / 60)) + ':' + pad2(s % 60);
  }
  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  var NS = 'http://www.w3.org/2000/svg';

  /* ───────────────────────── Белгішелер (қарапайым SVG) ───────────────────────── */
  var ICONS = {
    play: 'M7 4l13 8-13 8z', pause: 'M8 5v14M16 5v14', reset: 'M4 12a8 8 0 1 0 2.4-5.7L4 8M4 3v5h5',
    copy: 'M8 8h11v12H8zM5 16V4h11', eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
    eyeoff: 'M3 3l18 18M10.6 5.1A9.7 9.7 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 4M6.6 6.7A17 17 0 0 0 2 12s4 7 10 7a9.7 9.7 0 0 0 4.2-1M9.9 9.9a3 3 0 0 0 4.2 4.2',
    check: 'M5 12l5 5 9-10', prev: 'M15 5l-7 7 7 7', next: 'M9 5l7 7-7 7',
    fullscreen: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5', exitfs: 'M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5',
    focus: 'M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
    sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
    moon: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z', plus: 'M12 5v14M5 12h14', minus: 'M5 12h14',
    menu: 'M4 6h16M4 12h16M4 18h16', print: 'M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z',
    link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
    dice: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8 8h.01M16 8h.01M8 16h.01M16 16h.01M12 12h.01',
    help: 'M12 17h.01M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10', clock: 'M12 7v5l3 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M4 21a8 8 0 0 1 16 0', skip: 'M5 5l9 7-9 7zM19 5v14',
    undo: 'M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3', close: 'M6 6l12 12M18 6L6 18',
    trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3', list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    arrow: 'M5 12h14M13 6l6 6-6 6', bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.4.4.5.8.5 1.1v1h6v-1c0-.3.1-.7.5-1.1A6 6 0 0 0 12 3z',
    code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16', flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
    shuffle: 'M3 7h4l10 10h4M3 17h4l3-3M14 10l3-3h4M18 4l3 3-3 3M18 14l3 3-3 3'
  };
  function icon(name, cls) {
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('class', 'ico' + (cls ? ' ' + cls : ''));
    var p = document.createElementNS(NS, 'path');
    p.setAttribute('d', ICONS[name] || '');
    svg.appendChild(p);
    return svg;
  }
  function btn(label, opts) {
    opts = opts || {};
    var kids = [];
    if (opts.icon) kids.push(icon(opts.icon));
    if (label) kids.push(h('span', { class: 'btn-txt' }, label));
    return h('button', {
      type: 'button', class: 'btn' + (opts.kind ? ' btn-' + opts.kind : '') + (opts.cls ? ' ' + opts.cls : ''),
      onClick: opts.onClick, title: opts.title || null, 'aria-label': opts.aria || null,
      disabled: opts.disabled || null, id: opts.id || null
    }, kids);
  }

  /* ───────────────────────── Сақтау (localStorage қолжетімсіз болса да жұмыс істейді) ───────────────────────── */
  var mem = {};
  var lsOK = true;
  try {
    var probe = '__pylessons_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
  } catch (e) { lsOK = false; }
  var store = {
    get: function (k) {
      if (lsOK) { try { return window.localStorage.getItem(k); } catch (e) { lsOK = false; } }
      return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null;
    },
    set: function (k, v) {
      mem[k] = v;
      if (lsOK) { try { window.localStorage.setItem(k, v); } catch (e) { lsOK = false; } }
    },
    remove: function (k) {
      delete mem[k];
      if (lsOK) { try { window.localStorage.removeItem(k); } catch (e) { lsOK = false; } }
    },
    ok: function () { return lsOK; }
  };
  function loadJSON(key, dflt) {
    try {
      var raw = store.get(key);
      if (!raw) return dflt;
      var v = JSON.parse(raw);
      return v && typeof v === 'object' ? v : dflt;
    } catch (e) { return dflt; }
  }
  var KEY_SET = 'pylessons.settings.v1';
  var KEY_PRO = 'pylessons.progress.v1';
  var FONT_STEPS = [0.8, 0.9, 1, 1.1, 1.25, 1.4, 1.6];

  var settings = Object.assign({ theme: 'light', fontStep: 2, view: null }, loadJSON(KEY_SET, {}));
  var progress = Object.assign({ last: null, visited: {}, quiz: {}, tasks: {}, selfcheck: {}, variant: {}, hw: {} }, loadJSON(KEY_PRO, {}));
  ['visited', 'quiz', 'tasks', 'selfcheck', 'variant', 'hw'].forEach(function (k) {
    if (!progress[k] || typeof progress[k] !== 'object') progress[k] = {};
  });
  settings.fontStep = clamp(parseInt(settings.fontStep, 10) || 2, 0, FONT_STEPS.length - 1);
  if (settings.theme !== 'dark') settings.theme = 'light';
  if (settings.view !== 'present' && settings.view !== 'study') settings.view = null;

  function saveSettings() { store.set(KEY_SET, JSON.stringify(settings)); }
  var saveTimer = null;
  function saveProgress() {
    if (saveTimer) return;
    saveTimer = setTimeout(function () { saveTimer = null; store.set(KEY_PRO, JSON.stringify(progress)); }, 120);
  }
  function saveProgressNow() {
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
    store.set(KEY_PRO, JSON.stringify(progress));
  }
  window.addEventListener('pagehide', saveProgressNow);

  function pget(bucket, lid) {
    if (!progress[bucket][lid]) progress[bucket][lid] = {};
    return progress[bucket][lid];
  }
  function hasProgress() {
    if (progress.last) return true;
    var any = false;
    ['visited', 'quiz', 'tasks', 'selfcheck', 'variant', 'hw'].forEach(function (b) {
      Object.keys(progress[b]).forEach(function (l) { if (Object.keys(progress[b][l] || {}).length) any = true; });
    });
    return any;
  }

  /* ───────────────────────── Python-ға тән көмекшілер ───────────────────────── */
  var PY_WS = '\\t\\n\\v\\f\\r\\x1c-\\x1f \\x85\\xa0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000';
  var RE_STRIP = new RegExp('^[' + PY_WS + ']+|[' + PY_WS + ']+$', 'g');
  var RE_WS_SPLIT = new RegExp('[' + PY_WS + ']+');
  function cps(s) { return Array.from(s); }
  function pyStrip(s) { return s.replace(RE_STRIP, ''); }
  function pySplit(s) { return pyStrip(s) === '' ? [] : pyStrip(s).split(RE_WS_SPLIT); }
  function pyRepr(s) {
    var q = "'";
    if (s.indexOf("'") >= 0 && s.indexOf('"') < 0) q = '"';
    var out = '';
    cps(s).forEach(function (ch) {
      var c = ch.codePointAt(0);
      if (ch === '\\') out += '\\\\';
      else if (ch === q) out += '\\' + q;
      else if (ch === '\n') out += '\\n';
      else if (ch === '\r') out += '\\r';
      else if (ch === '\t') out += '\\t';
      else if (c < 0x20 || (c >= 0x7f && c <= 0xa0)) out += '\\x' + ('0' + c.toString(16)).slice(-2);
      else if ((c >= 0x2000 && c <= 0x200f) || (c >= 0x2028 && c <= 0x202f) || c === 0x205f || c === 0x3000 || c === 0xfeff || c === 0x1680)
        out += '\\u' + ('000' + c.toString(16)).slice(-4);
      else out += ch;
    });
    return q + out + q;
  }
  /* Python коды үшін қос тырнақты литерал */
  function pyLit(s) {
    return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }
  function pyFloat(x) {
    if (Number.isFinite(x) && Number.isInteger(x) && Math.abs(x) < 1e16) return x.toFixed(1);
    return String(x);
  }
  /* Python-дағы бүтін сан енгізуі (қарапайым): +5, -3, 007 (int() үшін ғана) */
  function parseIntStrict(s) {
    var t = pyStrip(String(s).replace(/−/g, '-'));
    if (!/^[+-]?\d+$/.test(t)) return null;
    var n = Number(t);
    return Number.isFinite(n) ? n : null;
  }
  function cmpStr(a, b) {
    var x = cps(a), y = cps(b), n = Math.min(x.length, y.length);
    for (var i = 0; i < n; i++) {
      var d = x[i].codePointAt(0) - y[i].codePointAt(0);
      if (d) return d < 0 ? -1 : 1;
    }
    return x.length === y.length ? 0 : (x.length < y.length ? -1 : 1);
  }
  /* Python кесінді индекстерін есептеу (CPython PySlice_AdjustIndices логикасы) */
  function sliceIndices(len, start, stop, step) {
    var st = step === null ? 1 : step;
    var lower, upper;
    if (st < 0) { lower = -1; upper = len - 1; } else { lower = 0; upper = len; }
    function norm(v, dflt) {
      if (v === null) return dflt;
      if (v < 0) { v += len; if (v < lower) v = lower; } else if (v > upper) v = upper;
      return v;
    }
    var a = norm(start, st < 0 ? upper : lower);
    var b = norm(stop, st < 0 ? lower : upper);
    var idx = [];
    if (st > 0) { for (var i = a; i < b; i += st) idx.push(i); }
    else { for (var j = a; j > b; j += st) idx.push(j); }
    return { start: a, stop: b, step: st, indices: idx };
  }
  function showChar(ch) {
    if (ch === ' ') return '␣';
    if (ch === '\t') return '⇥';
    if (ch === ' ') return '⍽';
    return ch;
  }

  /* ───────────────────────── Python кодын боябау (қарапайым) ───────────────────────── */
  var KW = {}; ['and', 'as', 'break', 'class', 'continue', 'def', 'elif', 'else', 'for', 'from', 'if', 'import', 'in', 'is', 'not', 'or', 'pass', 'return', 'while', 'with'].forEach(function (k) { KW[k] = 1; });
  var CONST = { True: 1, False: 1, None: 1 };
  var BUILTIN = {}; ['print', 'len', 'int', 'str', 'type', 'range', 'sum', 'float', 'list', 'abs', 'min', 'max', 'repr'].forEach(function (k) { BUILTIN[k] = 1; });
  var TOKEN_RE = /(#.*$)|("(?:[^"\\]|\\.)*"?|'(?:[^'\\]|\\.)*'?)|(\d+(?:\.\d+)?)|([\p{L}_][\p{L}\p{N}_]*)|(\s+)|([\s\S])/gu;
  function highlightLine(line) {
    var frag = document.createDocumentFragment();
    var m;
    TOKEN_RE.lastIndex = 0;
    var last = null;
    while ((m = TOKEN_RE.exec(line)) !== null) {
      var txt = m[0], cls = null;
      if (m[1]) cls = 'tk-c';
      else if (m[2]) cls = 'tk-s';
      else if (m[3]) cls = 'tk-n';
      else if (m[4]) {
        if (KW[txt]) cls = 'tk-k';
        else if (CONST[txt]) cls = 'tk-k';
        else if (BUILTIN[txt]) cls = 'tk-b';
        else if (line.charAt(TOKEN_RE.lastIndex) === '(') cls = 'tk-f';
      }
      last = txt;
      frag.appendChild(cls ? h('span', { class: cls }, txt) : document.createTextNode(txt));
    }
    return frag;
  }
  /* Код блогы: код редакторына ұқсас. Қайтарады: {el, setActive(lineNo), lines} */
  function codeBlock(code, opts) {
    opts = opts || {};
    var lines = Array.isArray(code) ? code : String(code).split('\n');
    var rows = [];
    var pre = h('pre', { class: 'code-scroll', tabindex: '0', 'aria-label': opts.label || 'Python коды' });
    var codeEl = h('code', null);
    lines.forEach(function (ln, i) {
      var row = h('span', { class: 'cl', dataset: { line: String(i + 1) } },
        opts.numbers === false ? null : h('span', { class: 'cn', 'aria-hidden': 'true' }, String(i + 1)),
        h('span', { class: 'ct' }, highlightLine(ln), ln === '' ? '​' : null));
      rows.push(row);
      codeEl.appendChild(row);
    });
    pre.appendChild(codeEl);
    var bar = h('div', { class: 'code-bar' },
      h('span', { class: 'dots', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')),
      h('span', { class: 'code-title' }, opts.title || 'main.py'),
      opts.copy === false ? null : h('button', {
        type: 'button', class: 'code-copy', 'aria-label': 'Кодты көшіру', title: 'Кодты көшіру',
        onClick: function () { copyWithToast(lines.join('\n'), 'Код көшірілді'); }
      }, icon('copy')));
    var el = h('div', { class: 'code' + (opts.cls ? ' ' + opts.cls : '') }, bar, pre);
    return {
      el: el, lines: lines, rows: rows,
      setActive: function (n) {
        rows.forEach(function (r, i) { r.classList.toggle('is-active', i + 1 === n); });
        if (n) {
          var r = rows[n - 1];
          if (r && r.scrollIntoView && pre.scrollHeight > pre.clientHeight + 4) {
            var top = r.offsetTop, bottom = top + r.offsetHeight;
            if (top < pre.scrollTop) pre.scrollTop = top - 8;
            else if (bottom > pre.scrollTop + pre.clientHeight) pre.scrollTop = bottom - pre.clientHeight + 8;
          }
        }
      }
    };
  }
  /* Қысқа код/мән белгісі */
  function codeInline(txt) { return h('code', { class: 'ic' }, txt); }

  /* ───────────────────────── Хабарлама (toast) ───────────────────────── */
  var toastTimer = null;
  function toast(msg, kind) {
    var t = $('#toast');
    if (!t) return;
    clear(t);
    t.className = 'toast show' + (kind ? ' toast-' + kind : '');
    t.appendChild(document.createTextNode(msg));
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.className = 'toast'; }, 2400);
  }

  /* ───────────────────────── Модальді терезе ───────────────────────── */
  var modalStack = [];
  function openModal(opts) {
    var root = $('#modal-root');
    var prevFocus = document.activeElement;
    var titleId = 'mt' + Math.random().toString(36).slice(2, 7);
    var body = h('div', { class: 'modal-body' }, opts.body);
    var actions = h('div', { class: 'modal-actions' });
    var box = h('div', { class: 'modal' + (opts.wide ? ' modal-wide' : ''), role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': titleId },
      h('div', { class: 'modal-head' }, h('h2', { id: titleId }, opts.title || ''),
        h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Жабу', onClick: function () { close(); } }, icon('close'))),
      body, actions);
    var back = h('div', { class: 'modal-back', onClick: function (e) { if (e.target === back) close(); } }, box);
    var done = false;
    function close(val) {
      if (done) return;
      done = true;
      var i = modalStack.indexOf(api);
      if (i >= 0) modalStack.splice(i, 1);
      back.remove();
      if (prevFocus && prevFocus.focus) { try { prevFocus.focus(); } catch (e) { /* ignore */ } }
      if (opts.onClose) opts.onClose(val);
    }
    (opts.actions || []).forEach(function (a) {
      actions.appendChild(btn(a.label, {
        kind: a.kind || 'ghost', icon: a.icon,
        onClick: function () { var r = a.onClick ? a.onClick() : undefined; if (r !== false) close(a.value); }
      }));
    });
    if (!(opts.actions || []).length) actions.remove();
    var api = { close: close, el: back };
    modalStack.push(api);
    root.appendChild(back);
    var first = box.querySelector('[data-autofocus]') || box.querySelector('.modal-actions .btn') || box.querySelector('button, input, textarea, select');
    setTimeout(function () { if (first) first.focus(); }, 30);
    back.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = $$('button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"]), a[href]', box).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      var firstEl = f[0], lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    });
    return api;
  }
  function confirmModal(title, message, okLabel) {
    return new Promise(function (resolve) {
      openModal({
        title: title, body: h('p', null, message),
        actions: [
          { label: 'Бас тарту', kind: 'ghost', value: false },
          { label: okLabel || 'Иә', kind: 'danger', value: true }
        ],
        onClose: function (v) { resolve(v === true); }
      });
    });
  }

  /* ───────────────────────── Көшіру ───────────────────────── */
  function copyText(text) {
    return new Promise(function (resolve) {
      function legacy() {
        try {
          var ta = h('textarea', { readonly: '', style: { position: 'fixed', top: '-1000px', opacity: '0' } });
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          var ok = document.execCommand('copy');
          ta.remove();
          resolve(!!ok);
        } catch (e) { resolve(false); }
      }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(function () { resolve(true); }, legacy);
          return;
        }
      } catch (e) { /* ignore */ }
      legacy();
    });
  }
  function copyWithToast(text, okMsg) {
    copyText(text).then(function (ok) {
      if (ok) toast(okMsg || 'Көшірілді');
      else {
        var ta = h('textarea', { class: 'manual-copy', readonly: '', rows: '6', 'data-autofocus': '1' });
        ta.value = text;
        openModal({
          title: 'Көшіру', body: h('div', null, h('p', null, 'Браузер автоматты көшіруге рұқсат бермеді. Мәтінді таңдап, Ctrl+C басыңыз.'), ta),
          actions: [{ label: 'Жабу', kind: 'primary' }]
        });
        setTimeout(function () { ta.select(); }, 60);
      }
    });
  }

  /* ───────────────────────── Жалпы UI блоктары ───────────────────────── */
  function card(cls) {
    var kids = Array.prototype.slice.call(arguments, 1);
    return h.apply(null, ['div', { class: 'card' + (cls ? ' ' + cls : '') }].concat(kids));
  }
  function cardTitle(txt, ic) {
    return h('div', { class: 'card-title' }, ic ? icon(ic) : null, h('span', null, txt));
  }
  function errorBox(kind, title, text) {
    return h('div', { class: 'msg msg-' + kind, role: 'status' },
      h('div', { class: 'msg-title' }, title),
      text ? h('div', { class: 'msg-text' }, text) : null);
  }
  function mkTable(tbl, opts) {
    opts = opts || {};
    var cls = 'tbl' + (opts.cls ? ' ' + opts.cls : '');
    var t = h('table', { class: cls },
      h('thead', null, h('tr', null, tbl.head.map(function (c) { return h('th', { scope: 'col' }, c); }))),
      h('tbody', null, (opts.rows || tbl.rows).map(function (r) {
        return h('tr', null, r.map(function (c, i) {
          var isCode = opts.codeCols && opts.codeCols.indexOf(i) >= 0;
          return h(i === 0 && opts.rowHeader ? 'th' : 'td', i === 0 && opts.rowHeader ? { scope: 'row' } : null,
            isCode ? h('code', { class: 'ic' }, c) : c);
        }));
      })));
    return h('div', { class: 'tbl-wrap' }, t);
  }
  /* Мәтіндегі `code` бөліктерін ерекшелеу: «...» ішіндегі Python өрнектерін автоматты таңдамаймыз,
     тек берілген жолды қауіпсіз мәтін ретінде шығарамыз. */
  function para(text, cls) { return h('p', { class: cls || null }, text); }

  /* Жауап ашу/жасыру (слайд ішіндегі ортақ тізілім) */
  function makeReveal(ctx, label, hideLabel, content, opts) {
    opts = opts || {};
    var shown = false;
    var box = h('div', { class: 'answer', hidden: true, 'aria-live': 'polite' }, content);
    var b = btn(label, { icon: 'eye', kind: opts.kind || 'accent', cls: 'reveal-btn' });
    function set(v) {
      shown = !!v;
      box.hidden = !shown;
      clear(b);
      b.appendChild(icon(shown ? 'eyeoff' : 'eye'));
      b.appendChild(h('span', { class: 'btn-txt' }, shown ? hideLabel : label));
      b.setAttribute('aria-expanded', String(shown));
      if (shown && !reducedMotion()) { box.classList.remove('pop'); void box.offsetWidth; box.classList.add('pop'); }
      if (opts.onChange) opts.onChange(shown);
    }
    b.addEventListener('click', function () { set(!shown); });
    set(false);
    if (ctx && ctx.answers) ctx.answers.push({ set: set, get shown() { return shown; } });
    return { button: b, box: box, set: set, isShown: function () { return shown; } };
  }

  /* ═════════════════════ «ЖОЛДАР» САБАҒЫНЫҢ ИНТЕРАКТИВТЕРІ ═════════════════════ */

  function field(label, input, hint) {
    return h('label', { class: 'field' }, h('span', { class: 'field-l' }, label), input, hint ? h('span', { class: 'field-h' }, hint) : null);
  }
  function textInput(value, opts) {
    opts = opts || {};
    return h('input', {
      type: 'text', class: 'inp mono' + (opts.cls ? ' ' + opts.cls : ''), value: value, maxlength: opts.max || '60',
      placeholder: opts.ph || null, autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false',
      inputmode: opts.numeric ? 'numeric' : null, 'aria-label': opts.aria || null, size: opts.size || null
    });
  }

  /* ───────── А) Индекстер зертханасы ───────── */
  function indexLab() {
    var tIn = textInput('Python', { max: 40, aria: 'Мәтін', cls: 'inp-wide' });
    var iIn = textInput('', { max: 8, numeric: true, ph: '2 немесе -1', aria: 'Индекс', cls: 'inp-md' });
    var cellsRow = h('div', { class: 'cells', role: 'group', 'aria-label': 'Жол таңбалары' });
    var out = h('div', { class: 'lab-out', 'aria-live': 'polite' });
    var chars = [];
    var cellEls = [];

    function buildCells() {
      chars = cps(tIn.value);
      clear(cellsRow);
      cellEls = [];
      var n = chars.length;
      if (!n) {
        cellsRow.appendChild(h('div', { class: 'cells-empty' }, 'Жол бос: ұяшық жоқ'));
        return;
      }
      chars.forEach(function (ch, i) {
        var c = h('div', { class: 'cell' },
          h('span', { class: 'ix ix-pos', title: 'Оң индекс' }, String(i)),
          h('button', { type: 'button', class: 'ch', 'aria-label': (i + '-индекс, таңба ' + (ch === ' ' ? 'бос орын' : ch)),
            onClick: function () { iIn.value = String(i); update(); } }, showChar(ch)),
          h('span', { class: 'ix ix-neg', title: 'Теріс индекс' }, '−' + (n - i)));
        cellEls.push(c);
        cellsRow.appendChild(c);
      });
    }
    function update() {
      var n = chars.length;
      var raw = iIn.value.replace(/−/g, '-').trim();
      clear(out);
      cellEls.forEach(function (c) { c.classList.remove('hit'); });
      var lenLine = h('div', { class: 'lab-line' }, codeInline('len(text)'), ' = ', h('b', null, String(n)),
        n ? h('span', { class: 'muted' }, ' · дұрыс индекстер: 0…' + (n - 1) + ' және −' + n + '…−1') : null);
      out.appendChild(lenLine);
      if (raw === '') {
        out.appendChild(h('div', { class: 'lab-hint' }, 'Индекс енгізіңіз (мысалы, 0 немесе −1) немесе ұяшықтағы таңбаны басыңыз.'));
        return;
      }
      if (!/^[+-]?\d+$/.test(raw)) {
        out.appendChild(errorBox('err', 'TypeError: string indices must be integers',
          'Индекс бүтін сан болуы керек. «' + raw + '» бүтін сан емес, сондықтан Python қате береді. Мысалы: 0, 3 немесе −1.'));
        return;
      }
      var k = Number(raw);
      var expr = 'text[' + raw.replace(/^\+/, '') + ']';
      if (n === 0) {
        out.appendChild(errorBox('err', 'IndexError: string index out of range',
          'Жол бос (ұзындығы 0), сондықтан онда ешқандай индекс жоқ. Алдымен мәтін енгізіңіз.'));
        return;
      }
      if (k >= n || k < -n) {
        out.appendChild(h('div', { class: 'lab-line' }, codeInline(expr), ' →'));
        out.appendChild(errorBox('err', 'IndexError: string index out of range',
          'Жолдың ұзындығы ' + n + ', сондықтан дұрыс индекстер: 0…' + (n - 1) + ' және −' + n + '…−1. ' +
          'Сіз енгізген ' + k.toString().replace('-', '−') + ' осы аралықтан тыс. ' +
          (k >= n ? 'Ең соңғы таңбаның индексі — ' + (n - 1) + ' (ұзындық − 1).' : 'Ең бірінші таңба −' + n + ' индексінде тұр.')));
        return;
      }
      var pos = k < 0 ? k + n : k;
      cellEls[pos].classList.add('hit');
      out.appendChild(h('div', { class: 'lab-line lab-result' }, codeInline(expr), h('span', { class: 'arrow' }, icon('arrow')), h('code', { class: 'ic res' }, pyRepr(chars[pos]))));
      out.appendChild(h('div', { class: 'lab-line muted' }, 'Бұл таңба екі индекспен жазылады: ',
        codeInline('text[' + pos + ']'), ' және ', codeInline('text[−' + (n - pos) + ']'), '.'));
    }
    tIn.addEventListener('input', function () { buildCells(); update(); });
    iIn.addEventListener('input', update);
    buildCells();
    update();
    return card('lab',
      cardTitle('Индекстер зертханасы', 'code'),
      h('div', { class: 'lab-controls' }, field('Мәтін (text)', tIn), field('Индекс', iIn)),
      h('div', { class: 'legend-row' }, h('span', null, '↑ оң индекс: 0-ден басталады'), h('span', null, '↓ теріс индекс: соңынан, −1 — соңғы таңба')),
      cellsRow, out);
  }

  /* ───────── Ә) Тілімдеу зертханасы ───────── */
  function sliceLab() {
    var tIn = textInput('Python', { max: 40, aria: 'Мәтін', cls: 'inp-wide' });
    var sIn = textInput('1', { max: 8, numeric: true, ph: 'бос', aria: 'start', cls: 'inp-xs' });
    var eIn = textInput('4', { max: 8, numeric: true, ph: 'бос', aria: 'stop', cls: 'inp-xs' });
    var pIn = textInput('', { max: 8, numeric: true, ph: 'бос', aria: 'step', cls: 'inp-xs' });
    var cellsRow = h('div', { class: 'cells', role: 'group', 'aria-label': 'Жол таңбалары' });
    var out = h('div', { class: 'lab-out', 'aria-live': 'polite' });
    var chars = [], cellEls = [];

    function buildCells() {
      chars = cps(tIn.value);
      clear(cellsRow);
      cellEls = [];
      var n = chars.length;
      if (!n) { cellsRow.appendChild(h('div', { class: 'cells-empty' }, 'Жол бос: ұяшық жоқ')); return; }
      chars.forEach(function (ch, i) {
        var c = h('div', { class: 'cell' },
          h('span', { class: 'ix ix-pos' }, String(i)),
          h('span', { class: 'ch', 'aria-hidden': 'true' }, showChar(ch), h('span', { class: 'ord' })),
          h('span', { class: 'ix ix-neg' }, '−' + (n - i)));
        cellEls.push(c);
        cellsRow.appendChild(c);
      });
    }
    function parseField(inp, name) {
      var raw = inp.value.replace(/−/g, '-').trim();
      if (raw === '') return { v: null, raw: '' };
      if (!/^[+-]?\d+$/.test(raw)) return { err: name + ' = «' + inp.value.trim() + '» — бүтін сан емес' };
      return { v: Number(raw), raw: raw.replace(/^\+/, '') };
    }
    function update() {
      clear(out);
      var n = chars.length;
      cellEls.forEach(function (c) {
        c.classList.remove('pick', 'is-start', 'is-stop');
        var o = $('.ord', c); if (o) o.textContent = '';
        var f = $('.flag', c); if (f) f.remove();
      });
      $$('.end-flag', cellsRow).forEach(function (e) { e.remove(); });
      var a = parseField(sIn, 'start'), b = parseField(eIn, 'stop'), s = parseField(pIn, 'step');
      var bad = [a, b, s].filter(function (x) { return x.err; });
      if (bad.length) {
        out.appendChild(errorBox('err', 'TypeError: slice indices must be integers or None or have an __index__ method',
          'Кесіндінің start, stop және step өрістері бүтін сан немесе бос болуы керек. ' + bad.map(function (x) { return x.err; }).join('; ') + '.'));
        return;
      }
      var parts = [a.raw, b.raw];
      var expr = 'text[' + a.raw + ':' + b.raw + (s.raw !== '' ? ':' + s.raw : '') + ']';
      if (s.v === 0) {
        out.appendChild(h('div', { class: 'lab-line' }, codeInline(expr)));
        out.appendChild(errorBox('err', 'ValueError: slice step cannot be zero',
          'Қадам (step) 0 бола алмайды: Python қанша таңбаға жылжу керегін білмейді. 1, 2 сияқты оң сан алға, −1 сияқты теріс сан артқа жүреді.'));
        return;
      }
      var r = sliceIndices(n, a.v, b.v, s.v);
      var res = r.indices.map(function (i) { return chars[i]; }).join('');
      r.indices.forEach(function (i, k) {
        var c = cellEls[i];
        c.classList.add('pick');
        $('.ord', c).textContent = String(k + 1);
      });
      if (n) {
        if (r.start >= 0 && r.start < n && (r.indices.length || true)) cellEls[r.start].classList.add('is-start');
        if (r.stop >= 0 && r.stop < n) {
          cellEls[r.stop].classList.add('is-stop');
          cellEls[r.stop].appendChild(h('span', { class: 'flag' }, 'stop'));
        } else if (r.stop >= n) {
          cellsRow.appendChild(h('div', { class: 'end-flag' }, 'stop →' + ' соңы'));
        } else if (r.stop < 0 && s.v !== null && s.v < 0) {
          cellsRow.insertBefore(h('div', { class: 'end-flag begin' }, 'stop: басынан бұрын'), cellsRow.firstChild);
        }
      }
      out.appendChild(h('div', { class: 'lab-line lab-result' }, codeInline(expr), h('span', { class: 'arrow' }, icon('arrow')),
        h('code', { class: 'ic res' }, pyRepr(res))));
      out.appendChild(h('div', { class: 'lab-line' }, 'Алынған индекстер: ',
        h('b', null, r.indices.length ? r.indices.join(', ') : 'жоқ'), '  ·  ұзындығы: ', h('b', null, String(res ? cps(res).length : 0))));
      var expl = h('ul', { class: 'lab-expl' });
      var step = r.step;
      expl.appendChild(h('li', null, a.v === null
        ? ['start бос: ', step > 0 ? 'басынан (0-индекстен) бастаймыз.' : 'соңынан (соңғы таңбадан) бастаймыз.']
        : ['start = ' + a.raw + ': ' + r.start + '-индекстен бастаймыз' + (a.v < 0 ? ' (теріс индекс соңынан санайды).' : '.')]));
      expl.appendChild(h('li', null, b.v === null
        ? ['stop бос: ', step > 0 ? 'жолдың соңына дейін.' : 'жолдың басына дейін (бірінші таңбаны қоса).']
        : ['stop = ' + b.raw + ': ', h('b', null, 'осы индекстегі таңба нәтижеге кірмейді'), ' — алдында тоқтаймыз.']));
      expl.appendChild(h('li', null, s.v === null ? 'step бос: қадам 1.' : ('step = ' + s.raw + ': әр ' + Math.abs(step) + '-ші таңба' + (step < 0 ? ', артқа қарай.' : '.'))));
      if (!r.indices.length) {
        expl.appendChild(h('li', { class: 'note-ok' }, 'Нәтиже бос жол \'\'. Кесінді шектен шықса да, IndexError болмайды — бұл индекстен басты айырмашылығы.'));
      }
      out.appendChild(expl);
    }
    function preset(label, st, en, sp) {
      return h('button', { type: 'button', class: 'chip-btn', onClick: function () { sIn.value = st; eIn.value = en; pIn.value = sp; update(); } }, label);
    }
    tIn.addEventListener('input', function () { buildCells(); update(); });
    [sIn, eIn, pIn].forEach(function (i) { i.addEventListener('input', update); });
    buildCells();
    update();
    return card('lab',
      cardTitle('Тілімдеу зертханасы', 'code'),
      h('div', { class: 'lab-controls' },
        field('Мәтін (text)', tIn), field('start', sIn), field('stop', eIn), field('step', pIn)),
      h('div', { class: 'presets' }, h('span', { class: 'muted' }, 'Мысалдар:'),
        preset('[1:4]', '1', '4', ''), preset('[:3]', '', '3', ''), preset('[-3:]', '-3', '', ''),
        preset('[::2]', '', '', '2'), preset('[::-1]', '', '', '-1'), preset('[4:1:-1]', '4', '1', '-1'), preset('[10:20]', '10', '20', '')),
      cellsRow, out);
  }

  /* ───────── Б) Жол әдістері ───────── */
  function methodsDemo() {
    var DEFS = [
      { id: 'strip', name: 'strip()', src: '  Dana_2005  ', args: [], note: 'Шеткі бос орындарды жояды. Мәтін ортасындағы бос орын қалады.',
        run: function (s) { return pyStrip(s); }, call: function () { return 'strip()'; } },
      { id: 'lower', name: 'lower()', src: 'Python САБАҒЫ', args: [], note: 'Барлық әріпті кіші әріпке айналдырады.',
        run: function (s) { return s.toLowerCase(); }, call: function () { return 'lower()'; } },
      { id: 'upper', name: 'upper()', src: 'python сабағы', args: [], note: 'Барлық әріпті бас әріпке айналдырады.',
        run: function (s) { return s.toUpperCase(); }, call: function () { return 'upper()'; } },
      { id: 'replace', name: 'replace()', src: 'Сәлем', args: [{ l: 'ескі', v: 'С' }, { l: 'жаңа', v: 'Ә' }],
        note: 'Мәтіннің барлық сәйкес бөлігін ауыстырады. Нәтиже — жаңа жол, бастапқы жол өзгермейді.',
        run: function (s, a) {
          var o = a[0], n = a[1];
          if (o === '') { var c = cps(s); return c.length ? n + c.join(n) + n : n; }
          return s.split(o).join(n);
        }, call: function (a) { return 'replace(' + pyLit(a[0]) + ', ' + pyLit(a[1]) + ')'; } },
      { id: 'find', name: 'find()', src: 'user@mail.kz', args: [{ l: 'іздеу', v: '@' }],
        note: 'Алғашқы сәйкестіктің индексін қайтарады; табылмаса −1. Нәтиже — сан (int).',
        run: function (s, a) { var i = s.indexOf(a[0]); return i < 0 ? -1 : cps(s.slice(0, i)).length; },
        call: function (a) { return 'find(' + pyLit(a[0]) + ')'; }, num: true, hint: '«#» деп көріңіз: табылмаса −1 болады.' },
      { id: 'count', name: 'count()', src: 'банан', args: [{ l: 'іздеу', v: 'а' }],
        note: 'Берілген бөліктің қайталанбайтын кездесу санын қайтарады. Нәтиже — сан (int).',
        run: function (s, a) {
          var sub = a[0];
          if (sub === '') return cps(s).length + 1;
          var cnt = 0, pos = 0, i;
          while ((i = s.indexOf(sub, pos)) !== -1) { cnt++; pos = i + sub.length; }
          return cnt;
        }, call: function (a) { return 'count(' + pyLit(a[0]) + ')'; }, num: true }
    ];
    var cur = DEFS[0];
    var tabs = h('div', { class: 'seg', role: 'group', 'aria-label': 'Әдісті таңдау' });
    var body = h('div', { class: 'lab' });

    function show(def) {
      cur = def;
      $$('button', tabs).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.id === def.id)); });
      clear(body);
      var srcIn = textInput(def.src, { max: 60, aria: 'Бастапқы жол', cls: 'inp-wide' });
      var argIns = def.args.map(function (a) { return textInput(a.v, { max: 20, aria: a.l, cls: 'inp-sm' }); });
      var origBox = h('div', { class: 'flow-box' });
      var callBox = h('div', { class: 'flow-box flow-method' });
      var resBox = h('div', { class: 'flow-box flow-res' });
      var keep = h('div', { class: 'lab-line muted' });
      function upd() {
        var s = srcIn.value;
        var args = argIns.map(function (i) { return i.value; });
        var r = def.run(s, args);
        clear(origBox); clear(callBox); clear(resBox); clear(keep);
        origBox.append(h('div', { class: 'flow-l' }, 'Бастапқы жол'), h('code', { class: 'flow-v' }, 'text = ' + pyRepr(s)));
        callBox.append(h('div', { class: 'flow-l' }, 'Қолданылған әдіс'), h('code', { class: 'flow-v' }, 'text.' + def.call(args)));
        resBox.append(h('div', { class: 'flow-l' }, 'Нәтиже ' + (def.num ? '(int)' : '(str)')), h('code', { class: 'flow-v res' }, def.num ? String(r) : pyRepr(r)));
        keep.append('text әлі де: ', codeInline(pyRepr(s)), ' — бастапқы жол өзгермейді.');
        if (def.id === 'find' || def.id === 'count') keep.append(' Нәтиже сан болғандықтан, жолды өзгертпейді.');
      }
      srcIn.addEventListener('input', upd);
      argIns.forEach(function (i) { i.addEventListener('input', upd); });
      body.appendChild(h('div', { class: 'lab-controls' }, field('Бастапқы жол', srcIn),
        def.args.map(function (a, k) { return field(a.l, argIns[k]); })));
      body.appendChild(h('div', { class: 'flow' }, origBox, h('span', { class: 'flow-arrow' }, icon('arrow')), callBox, h('span', { class: 'flow-arrow' }, icon('arrow')), resBox));
      body.appendChild(keep);
      body.appendChild(h('div', { class: 'lab-hint' }, def.note + (def.hint ? ' ' + def.hint : '')));
      upd();
    }
    DEFS.forEach(function (d) {
      tabs.appendChild(h('button', { type: 'button', class: 'seg-btn mono', dataset: { id: d.id }, 'aria-pressed': 'false', onClick: function () { show(d); } }, d.name));
    });
    show(DEFS[0]);
    return card('lab', cardTitle('Жол әдістері: бастапқы жол → әдіс → нәтиже', 'code'), tabs, body);
  }

  /* ───────── В) Өзгермейтіндік ───────── */
  function immutableDemo(lesson) {
    var tIn = textInput('Сәлем', { max: 30, aria: 'Мәтін', cls: 'inp-wide' });
    var iIn = textInput('0', { max: 6, numeric: true, aria: 'Индекс', cls: 'inp-xs' });
    var cIn = textInput('Ә', { max: 2, aria: 'Жаңа таңба', cls: 'inp-xs' });
    var out = h('div', { class: 'lab-out', 'aria-live': 'polite' });
    var state = h('div', { class: 'lab-line' });

    function base() { return cps(tIn.value); }
    function showState() {
      clear(state);
      state.append('text әлі де: ', h('code', { class: 'ic res' }, pyRepr(tIn.value)));
    }
    function parseIdx() {
      var k = parseIntStrict(iIn.value);
      return k;
    }
    function tryAssign() {
      clear(out);
      var k = parseIdx();
      var idx = (k === null ? iIn.value.trim() : String(k)).replace('-', '−');
      out.appendChild(h('div', { class: 'lab-line' }, codeInline('text[' + (k === null ? iIn.value.trim() : k) + '] = ' + pyLit(cIn.value))));
      out.appendChild(errorBox('err', "TypeError: 'str' object does not support item assignment",
        'Жол — өзгермейтін тізбек: оның жеке таңбасын тікелей ауыстыруға болмайды. Индекс (' + idx + ') дұрыс болса да, қате шығады. Жолды өзгерту үшін жаңа жол құру керек.'));
      showState();
    }
    function fixSlices() {
      clear(out);
      var k = parseIdx(), c = base(), n = c.length;
      if (k === null) { out.appendChild(errorBox('warn', 'Индекс бүтін сан емес', 'Индексті бүтін сан етіп енгізіңіз (мысалы, 0).')); return; }
      if (k >= n || k < -n) {
        out.appendChild(errorBox('warn', 'Бұл индексте таңба жоқ',
          'Жолдың ұзындығы ' + n + '. Алдымен индекс 0…' + Math.max(0, n - 1) + ' немесе −' + n + '…−1 аралығында екенін тексеру керек.'));
        return;
      }
      var p = k < 0 ? k + n : k;
      var res = c.slice(0, p).join('') + cIn.value + c.slice(p + 1).join('');
      var code = 'new_text = text[:' + p + '] + ' + pyLit(cIn.value) + ' + text[' + (p + 1) + ':]';
      out.appendChild(h('div', { class: 'lab-line' }, codeInline(code)));
      out.appendChild(h('div', { class: 'lab-line lab-result' }, codeInline('new_text'), h('span', { class: 'arrow' }, icon('arrow')), h('code', { class: 'ic res' }, pyRepr(res))));
      out.appendChild(h('div', { class: 'lab-line note-ok' }, 'Жаңа жол құрылды. Бастапқы жол өзгерген жоқ.'));
      showState();
    }
    function fixReplace() {
      clear(out);
      var c = base(), k = parseIdx();
      var oldCh = (k !== null && k >= -c.length && k < c.length) ? c[k < 0 ? k + c.length : k] : (c[0] || '');
      var res = tIn.value.split(oldCh).join(cIn.value);
      out.appendChild(h('div', { class: 'lab-line' }, codeInline('new_text = text.replace(' + pyLit(oldCh) + ', ' + pyLit(cIn.value) + ')')));
      out.appendChild(h('div', { class: 'lab-line lab-result' }, codeInline('new_text'), h('span', { class: 'arrow' }, icon('arrow')), h('code', { class: 'ic res' }, pyRepr(res))));
      out.appendChild(h('div', { class: 'lab-line muted' }, 'replace() таңдалған таңбаның барлық кездесуін ауыстырады және жаңа жол қайтарады.'));
      showState();
    }
    tIn.addEventListener('input', function () { clear(out); showState(); });
    showState();
    var im = lesson.immutable;
    return h('div', { class: 'two-col' },
      card('lab',
        cardTitle('Өзгермейтіндік', 'code'),
        h('div', { class: 'lab-controls' }, field('Мәтін (text)', tIn), field('Индекс', iIn), field('Жаңа таңба', cIn)),
        h('div', { class: 'btn-row' },
          btn('text[i] = «таңба» орындау', { kind: 'danger', icon: 'play', onClick: tryAssign }),
          btn('Дұрыс жол: жаңа жол құру', { kind: 'accent', icon: 'check', onClick: fixSlices }),
          btn('replace() арқылы', { kind: 'ghost', icon: 'check', onClick: fixReplace })),
        state, out),
      card('', cardTitle('Құжаттағы мысал', 'bulb'), codeBlock(im.code1).el, para(im.text, 'small-note'), codeBlock(im.code2).el));
  }

  /* ═════════════════════ «ТІЗІМДЕР» САБАҒЫНЫҢ ИНТЕРАКТИВТЕРІ ═════════════════════ */

  /* ───────── А) Тізім зертханасы ───────── */
  var uidCounter = 0;
  function mkItem(t, v) { uidCounter += 1; return { id: uidCounter, t: t, v: v }; }
  function parseValue(raw) {
    var s = raw.replace(/−/g, '-').trim();
    if (s === '') return null;
    var q = /^"(.*)"$/.exec(s) || /^'(.*)'$/.exec(s);
    if (q) return mkItem('str', q[1]);
    if (/^[+-]?\d{1,15}$/.test(s)) return mkItem('int', Number(s));
    if (/^[+-]?\d{1,15}\.\d{1,12}$/.test(s)) return mkItem('float', Number(s));
    return mkItem('str', raw.trim());
  }
  function itemShow(it) { return it.t === 'str' ? pyRepr(it.v) : (it.t === 'float' ? pyFloat(it.v) : String(it.v)); }
  function itemLit(it) { return it.t === 'str' ? pyLit(it.v) : (it.t === 'float' ? pyFloat(it.v) : String(it.v)); }
  function itemEq(a, b) {
    var an = a.t !== 'str', bn = b.t !== 'str';
    if (an && bn) return a.v === b.v;
    if (!an && !bn) return a.v === b.v;
    return false;
  }
  function listShow(items) { return '[' + items.map(itemShow).join(', ') + ']'; }
  function copyItems(items) { return items.map(function (x) { return { id: x.id, t: x.t, v: x.v }; }); }

  function listOp(items, op, valRaw, idxRaw) {
    var n = items.length, res = { items: items.slice(), notes: [] };
    function needVal() {
      var v = parseValue(valRaw);
      if (!v) return { error: { name: 'Мән жоқ', text: 'Мән өрісін толтырыңыз. Мәтін үшін сөзді, сан үшін санды жазыңыз (мысалы: су немесе 5).' } };
      return v;
    }
    function needIdx(allowEmpty) {
      var raw = idxRaw.replace(/−/g, '-').trim();
      if (raw === '' && allowEmpty) return { empty: true };
      var k = parseIntStrict(raw);
      if (k === null) return { error: { name: 'TypeError: индекс бүтін сан болуы керек', text: 'Индекс өрісіне бүтін сан жазыңыз (мысалы, 0, 2 немесе −1).' } };
      return { k: k };
    }
    var v, ix;
    switch (op) {
      case 'append':
        v = needVal(); if (v.error) return v;
        res.items.push(v); res.cmd = 'items.append(' + itemLit(v) + ')'; res.ret = 'None'; res.focus = v.id; res.kind = 'add';
        return res;
      case 'insert':
        ix = needIdx(false); if (ix.error) return ix;
        v = needVal(); if (v.error) return v;
        var pos = ix.k;
        if (pos < 0) { pos += n; if (pos < 0) pos = 0; }
        if (pos > n) pos = n;
        if (pos !== ix.k && !(ix.k < 0 && ix.k + n >= 0)) {
          res.notes.push(ix.k > n
            ? 'Индекс ' + ix.k + ' тізім ұзындығынан (' + n + ') үлкен: Python қате бермейді, элемент соңына қосылады.'
            : 'Индекс ' + String(ix.k).replace('-', '−') + ' тізім басынан тыс: Python қате бермейді, элемент басына қосылады.');
        }
        res.items.splice(pos, 0, v); res.cmd = 'items.insert(' + ix.k + ', ' + itemLit(v) + ')'; res.ret = 'None'; res.focus = v.id; res.kind = 'add';
        return res;
      case 'remove':
        v = needVal(); if (v.error) return v;
        var found = -1;
        for (var i = 0; i < n; i++) { if (itemEq(items[i], v)) { found = i; break; } }
        res.cmd = 'items.remove(' + itemLit(v) + ')';
        if (found < 0) {
          return { cmd: res.cmd, error: { name: 'ValueError: list.remove(x): x not in list',
            text: 'Өшірілетін мән (' + itemShow(v) + ') тізімде жоқ, сондықтан Python қате береді. Алдымен тексеріңіз: if ' + itemLit(v) + ' in items: … . Ескерту: 5 саны мен «5» мәтіні — әртүрлі мән.' } };
        }
        res.removed = items[found].id; res.items.splice(found, 1); res.ret = 'None'; res.kind = 'remove';
        if (items.filter(function (x) { return itemEq(x, v); }).length > 1) res.notes.push('Тізімде бірнеше сәйкес мән болса, remove() тек алғашқысын өшіреді.');
        return res;
      case 'pop':
        ix = needIdx(true); if (ix.error) return ix;
        res.cmd = ix.empty ? 'items.pop()' : 'items.pop(' + ix.k + ')';
        if (n === 0) return { cmd: res.cmd, error: { name: 'IndexError: pop from empty list', text: 'Тізім бос, өшіретін элемент жоқ. pop() алдында len(items) > 0 екенін тексеріңіз.' } };
        var pi = ix.empty ? n - 1 : ix.k;
        if (!ix.empty && (pi >= n || pi < -n)) {
          return { cmd: res.cmd, error: { name: 'IndexError: pop index out of range', text: 'Тізімде ' + n + ' элемент бар, дұрыс индекстер: 0…' + (n - 1) + ' және −' + n + '…−1. Сіз енгізген ' + String(ix.k).replace('-', '−') + ' осы аралықтан тыс.' } };
        }
        if (pi < 0) pi += n;
        res.removed = items[pi].id; res.ret = itemShow(items[pi]); res.retIsValue = true;
        res.items.splice(pi, 1); res.kind = 'remove';
        return res;
      case 'set':
        ix = needIdx(false); if (ix.error) return ix;
        v = needVal(); if (v.error) return v;
        res.cmd = 'items[' + ix.k + '] = ' + itemLit(v);
        if (ix.k >= n || ix.k < -n) {
          return { cmd: res.cmd, error: { name: 'IndexError: list assignment index out of range',
            text: n ? 'Тізімде ' + n + ' элемент бар, дұрыс индекстер: 0…' + (n - 1) + ' және −' + n + '…−1. Индекс арқылы жаңа орын қосуға болмайды — ол үшін append() немесе insert() қолданыңыз.' : 'Тізім бос: индекс арқылы ештеңе ауыстыруға болмайды. Алдымен append() арқылы элемент қосыңыз.' } };
        }
        var si = ix.k < 0 ? ix.k + n : ix.k;
        var nv = mkItem(v.t, v.v); nv.id = items[si].id; // орнында қалады, мәні өзгереді
        res.items[si] = nv; res.ret = '—'; res.noRet = true; res.focus = nv.id; res.kind = 'set';
        return res;
      case 'sort':
      case 'badsort':
        var hasNum = items.some(function (x) { return x.t !== 'str'; });
        var hasStr = items.some(function (x) { return x.t === 'str'; });
        res.cmd = op === 'sort' ? 'items.sort()' : 'items = items.sort()';
        if (hasNum && hasStr) {
          var a = null, b = null;
          for (var j = 0; j + 1 < n; j++) { if ((items[j].t === 'str') !== (items[j + 1].t === 'str')) { a = items[j + 1]; b = items[j]; break; } }
          var tn = function (x) { return x.t === 'str' ? 'str' : (x.t === 'int' ? 'int' : 'float'); };
          return { cmd: res.cmd, error: { name: "TypeError: '<' not supported between instances of '" + tn(a) + "' and '" + tn(b) + "'",
            text: 'Тізімде сандар мен мәтіндер араласып тұр: Python оларды салыстыра алмайды, сондықтан сұрыптау мүмкін емес. (Типтердің жазылу реті салыстыру ретіне байланысты өзгеруі мүмкін.)' } };
        }
        res.items.sort(function (x, y) { return hasStr ? cmpStr(x.v, y.v) : (x.v < y.v ? -1 : (x.v > y.v ? 1 : 0)); });
        res.ret = 'None'; res.kind = 'move';
        if (res.items.every(function (x, i) { return x === items[i]; })) res.notes.push('Тізім бұрыннан өсу ретімен тұр, сондықтан өзгеріс көрінбейді.');
        if (op === 'badsort') { res.none = true; res.ret = 'None'; res.notes.push('sort() None қайтарады. Меншіктеуден кейін items айнымалысы тізімді емес, None мәнін көрсетеді — тізім жоғалды.'); }
        return res;
      case 'reverse':
        res.items.reverse(); res.cmd = 'items.reverse()'; res.ret = 'None'; res.kind = 'move';
        return res;
    }
    return { error: { name: 'Белгісіз әрекет', text: '' } };
  }

  function listLab() {
    var PRESETS = {
      shop: { label: 'Сатып алу тізімі', items: function () { return [mkItem('str', 'нан'), mkItem('str', 'сүт'), mkItem('str', 'алма')]; } },
      nums: { label: 'Сандар [3, 1, 2]', items: function () { return [mkItem('int', 3), mkItem('int', 1), mkItem('int', 2)]; } },
      empty: { label: 'Бос тізім []', items: function () { return []; } }
    };
    var OPS = [
      { id: 'append', label: 'append()', val: true, idx: false },
      { id: 'insert', label: 'insert()', val: true, idx: true },
      { id: 'remove', label: 'remove()', val: true, idx: false },
      { id: 'pop', label: 'pop()', val: false, idx: true, optIdx: true },
      { id: 'set', label: 'items[i] = …', val: true, idx: true },
      { id: 'sort', label: 'sort()', val: false, idx: false },
      { id: 'reverse', label: 'reverse()', val: false, idx: false },
      { id: 'badsort', label: 'items = items.sort()', val: false, idx: false, bad: true }
    ];
    var st = { items: PRESETS.shop.items(), none: false, op: 'append', busy: false, last: null };
    var stage = h('div', { class: 'lstage', 'aria-live': 'polite' });
    var opSeg = h('div', { class: 'seg seg-wrap', role: 'group', 'aria-label': 'Әрекетті таңдау' });
    var valIn = textInput('жұмыртқа', { max: 30, aria: 'Мән', cls: 'inp-md' });
    var idxIn = textInput('0', { max: 6, numeric: true, aria: 'Индекс', cls: 'inp-xs' });
    var valField = field('Мән (value)', valIn);
    var idxField = field('Индекс (index)', idxIn);
    var runBtn = btn('Орындау', { kind: 'primary', icon: 'play', onClick: function () { run(); } });
    var replayBtn = btn('Қайта ойнату', { kind: 'ghost', icon: 'reset', onClick: function () { replay(); }, disabled: true });
    var resetBtn = btn('Бастапқы күйге', { kind: 'ghost', icon: 'undo', onClick: function () { setPreset('shop'); } });
    var panelBefore = h('code', { class: 'pv' }), panelCmd = h('code', { class: 'pv' }), panelAfter = h('code', { class: 'pv' }), panelRet = h('code', { class: 'pv' });
    var msg = h('div', { class: 'lab-msg', 'aria-live': 'polite' });
    var opHint = h('div', { class: 'lab-hint' });

    function stateText() { return st.none ? 'None' : listShow(st.items); }

    function cardEl(it, i, n) {
      return h('div', { class: 'lcard', dataset: { id: String(it.id) } },
        h('span', { class: 'ix ix-pos' }, String(i)),
        h('div', { class: 'lv lv-' + it.t }, itemShow(it)),
        h('span', { class: 'ix ix-neg' }, '−' + (n - i)));
    }
    function renderStage() {
      clear(stage);
      if (st.none) { stage.appendChild(h('div', { class: 'none-card' }, 'items = None')); return; }
      if (!st.items.length) { stage.appendChild(h('div', { class: 'cells-empty' }, 'Тізім бос: []')); return; }
      var n = st.items.length;
      st.items.forEach(function (it, i) { stage.appendChild(cardEl(it, i, n)); });
    }
    function rects() {
      var m = {};
      $$('.lcard', stage).forEach(function (c) { m[c.dataset.id] = c.getBoundingClientRect(); });
      return m;
    }
    function flipFrom(prev, focusId, kind) {
      if (reducedMotion()) return;
      $$('.lcard', stage).forEach(function (c) {
        var id = c.dataset.id, r = c.getBoundingClientRect(), p = prev[id];
        if (p) {
          var dx = p.left - r.left, dy = p.top - r.top;
          if (Math.abs(dx) > 1 || Math.abs(dy) > 1) c.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px)' }, { transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
          if (kind === 'set' && String(focusId) === id) c.animate([{ transform: 'scale(1.18)', boxShadow: '0 0 0 3px var(--accent)' }, { transform: 'none', boxShadow: '0 0 0 0 transparent' }], { duration: 300, easing: 'ease-out' });
        } else {
          c.animate([{ opacity: 0, transform: 'scale(.5) translateY(-10px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'cubic-bezier(.2,.9,.3,1.2)' });
        }
      });
    }
    function setBusy(b) { st.busy = b; runBtn.disabled = b; }

    function applyResult(before, r, animate) {
      var prev = rects();
      function finish() {
        st.items = r.items; st.none = !!r.none;
        renderStage();
        if (animate) flipFrom(prev, r.focus, r.kind);
        panelAfter.textContent = stateText();
        panelRet.textContent = r.noRet ? '— (меншіктеу мән қайтармайды)' : r.ret;
        panelRet.className = 'pv ' + (r.ret === 'None' ? 'pv-none' : (r.retIsValue ? 'pv-val' : ''));
        setBusy(false);
      }
      if (animate && r.removed != null && !reducedMotion()) {
        var el = stage.querySelector('.lcard[data-id="' + r.removed + '"]');
        if (el) {
          setBusy(true);
          var an = el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.4) translateY(-12px)' }], { duration: 200, easing: 'ease-in', fill: 'forwards' });
          an.onfinish = finish;
          setTimeout(function () { if (st.busy) finish(); }, 320);
          return;
        }
      }
      finish();
    }
    function showError(r, beforeText) {
      clear(msg);
      msg.appendChild(errorBox('err', r.error.name, r.error.text));
      panelBefore.textContent = beforeText;
      panelCmd.textContent = r.cmd || '—';
      panelAfter.textContent = st.none ? 'None' : listShow(st.items) + '  (өзгерген жоқ)';
      panelRet.textContent = '— (қате)';
      panelRet.className = 'pv';
    }
    function run(fromReplay) {
      if (st.busy) return;
      clear(msg);
      var o = OPS.filter(function (x) { return x.id === st.op; })[0];
      var beforeText = stateText();
      if (st.none) {
        panelBefore.textContent = 'None';
        panelCmd.textContent = 'items.' + (st.op === 'badsort' ? 'sort' : st.op) + '(…)';
        panelAfter.textContent = 'None'; panelRet.textContent = '— (қате)'; panelRet.className = 'pv';
        msg.appendChild(errorBox('err', "AttributeError: 'NoneType' object has no attribute '" + (st.op === 'badsort' ? 'sort' : st.op) + "'",
          'items айнымалысы енді тізім емес, None. None-да тізім әдістері жоқ. «Бастапқы күйге» басып, қайта бастаңыз.'));
        return;
      }
      var r = listOp(st.items, st.op, valIn.value, idxIn.value);
      if (r.error) { showError(r, beforeText); st.last = null; replayBtn.disabled = true; return; }
      st.last = { beforeItems: copyItems(st.items), beforeNone: st.none, op: st.op, val: valIn.value, idx: idxIn.value };
      replayBtn.disabled = false;
      panelBefore.textContent = beforeText;
      panelCmd.textContent = r.cmd;
      r.notes.forEach(function (t) { msg.appendChild(errorBox('info', 'Ескерту', t)); });
      applyResult(st.items, r, true);
    }
    function replay() {
      if (!st.last || st.busy) return;
      setOp(st.last.op); valIn.value = st.last.val; idxIn.value = st.last.idx;
      st.items = st.last.beforeItems.map(function (x) { return { id: x.id, t: x.t, v: x.v }; });
      st.none = false;
      renderStage();
      panelAfter.textContent = '';
      setTimeout(function () { run(true); }, reducedMotion() ? 0 : 150);
    }
    function setPreset(key) {
      st.items = PRESETS[key].items(); st.none = false; st.last = null; st.busy = false; runBtn.disabled = false;
      replayBtn.disabled = true;
      clear(msg);
      renderStage();
      panelBefore.textContent = '—'; panelCmd.textContent = '—'; panelAfter.textContent = stateText(); panelRet.textContent = '—'; panelRet.className = 'pv';
    }
    function setOp(id) {
      st.op = id;
      var o = OPS.filter(function (x) { return x.id === id; })[0];
      $$('button', opSeg).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.id === id)); });
      valField.hidden = !o.val;
      idxField.hidden = !o.idx;
      $('.field-l', idxField).textContent = o.optIdx ? 'Индекс (бос — соңғысы)' : 'Индекс (index)';
      var hints = {
        append: 'append(value) — элементті тізімнің соңына қосады. Қайтаратыны: None.',
        insert: 'insert(index, value) — берілген индекске қосады, қалған элементтер оңға жылжиды. Қайтаратыны: None.',
        remove: 'remove(value) — мәні сәйкес алғашқы элементті өшіреді. Мән жоқ болса, ValueError. Қайтаратыны: None.',
        pop: 'pop(index) — индекстегі элементті өшіріп, ӨЗІН қайтарады. Индекс бос болса — соңғы элемент. Бос тізімде IndexError.',
        set: 'items[i] = value — индекстегі элементті ауыстырады (жол үшін бұл мүмкін емес, тізім үшін мүмкін). Мән қайтармайды.',
        sort: 'sort() — тізімді орнында өсу ретімен сұрыптайды. Қайтаратыны: None. Мәтіндер Unicode ретімен салыстырылады.',
        reverse: 'reverse() — элементтер ретін кері аударады. Қайтаратыны: None.',
        badsort: 'Жиі қателік: sort() None қайтарады, сондықтан items = items.sort() тізімді None-ға айналдырады.'
      };
      opHint.textContent = hints[id];
    }
    OPS.forEach(function (o) {
      opSeg.appendChild(h('button', { type: 'button', class: 'seg-btn mono' + (o.bad ? ' seg-bad' : ''), dataset: { id: o.id }, 'aria-pressed': 'false', onClick: function () { setOp(o.id); } }, o.label));
    });
    [valIn, idxIn].forEach(function (i) { i.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); run(); } }); });
    setOp('append');
    renderStage();
    panelBefore.textContent = '—'; panelCmd.textContent = '—'; panelAfter.textContent = stateText(); panelRet.textContent = '—';

    function pbox(title, node, cls) { return h('div', { class: 'pbox' + (cls ? ' ' + cls : '') }, h('div', { class: 'pbox-t' }, title), node); }
    return card('lab',
      cardTitle('Тізім зертханасы', 'code'),
      h('div', { class: 'presets' }, h('span', { class: 'muted' }, 'Бастапқы тізім:'),
        Object.keys(PRESETS).map(function (k) { return h('button', { type: 'button', class: 'chip-btn', onClick: function () { setPreset(k); } }, PRESETS[k].label); })),
      opSeg,
      h('div', { class: 'lab-controls' }, valField, idxField, h('div', { class: 'btn-row btn-row-end' }, runBtn, replayBtn, resetBtn)),
      opHint,
      stage,
      h('div', { class: 'pgrid' },
        pbox('1 · Бастапқы күйі', panelBefore), pbox('2 · Python командасы', panelCmd, 'pbox-cmd'),
        pbox('3 · Соңғы күйі', panelAfter), pbox('4 · Әдістің қайтарған мәні', panelRet, 'pbox-ret')),
      msg);
  }

  /* ───────── Ә) Көшіру демонстрациясы ───────── */
  function copyDemo() {
    var st = { a: [10, 20, 30], objs: null, b: null };
    function fresh() { st.objs = { o1: { name: '№1', items: [10, 20, 30] }, o2: null }; st.a = 'o1'; st.b = null; st.mode = null; }
    fresh();
    var stage = h('div', { class: 'cstage' });
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'carrows'); svg.setAttribute('aria-hidden', 'true');
    var info = h('div', { class: 'cinfo', 'aria-live': 'polite' });
    var opBtns = [];
    var cmdLine = h('div', { class: 'lab-line' });

    function objEl(key) {
      var o = st.objs[key];
      return h('div', { class: 'cobj', dataset: { obj: key } },
        h('div', { class: 'cobj-t' }, 'тізім объектісі ' + o.name),
        h('div', { class: 'cobj-items' }, o.items.map(function (v) { return h('span', { class: 'cobj-i' }, String(v)); })));
    }
    function nameChip(n) { return h('div', { class: 'cname', dataset: { name: n } }, n); }
    function render() {
      clear(stage);
      var rowA = h('div', { class: 'crow' }, nameChip('a'), h('div', { class: 'cgap' }), objEl('o1'));
      var rowB;
      if (st.b === null) rowB = h('div', { class: 'crow crow-empty' }, h('div', { class: 'cname ghost' }, 'b'), h('div', { class: 'cgap' }), h('div', { class: 'cobj ghost' }, 'b әлі жоқ'));
      else if (st.b === 'o1') rowB = h('div', { class: 'crow' }, nameChip('b'), h('div', { class: 'cgap' }), h('div', { class: 'cobj cobj-same' }, 'b де №1 объектісіне сілтейді'));
      else rowB = h('div', { class: 'crow' }, nameChip('b'), h('div', { class: 'cgap' }), objEl('o2'));
      stage.append(rowA, rowB, svg);
      requestAnimationFrame(drawArrows);
      opBtns.forEach(function (b) { b.disabled = st.b === null; });
    }
    function drawArrows() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var sr = stage.getBoundingClientRect();
      if (!sr.width) return;
      svg.setAttribute('viewBox', '0 0 ' + sr.width + ' ' + sr.height);
      svg.setAttribute('width', sr.width); svg.setAttribute('height', sr.height);
      function link(nameKey, objKey, cls) {
        var from = stage.querySelector('.cname[data-name="' + nameKey + '"]');
        var to = stage.querySelector('.cobj[data-obj="' + objKey + '"]');
        if (!from || !to) return;
        var a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
        var x1 = a.right - sr.left, y1 = a.top + a.height / 2 - sr.top, x2 = b.left - sr.left - 4, y2 = b.top + b.height / 2 - sr.top;
        var mx = (x1 + x2) / 2;
        var p = document.createElementNS(NS, 'path');
        p.setAttribute('d', 'M' + x1 + ',' + y1 + ' C' + mx + ',' + y1 + ' ' + mx + ',' + y2 + ' ' + x2 + ',' + y2);
        p.setAttribute('class', 'carrow ' + cls);
        p.setAttribute('marker-end', 'url(#ah)');
        svg.appendChild(p);
        if (!reducedMotion() && p.getTotalLength) {
          var len = p.getTotalLength();
          p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
          p.getBoundingClientRect();
          p.style.transition = 'stroke-dashoffset 260ms ease-out'; p.style.strokeDashoffset = '0';
        }
      }
      var defs = document.createElementNS(NS, 'defs');
      var mk = document.createElementNS(NS, 'marker');
      mk.setAttribute('id', 'ah'); mk.setAttribute('markerWidth', '8'); mk.setAttribute('markerHeight', '8'); mk.setAttribute('refX', '6'); mk.setAttribute('refY', '4'); mk.setAttribute('orient', 'auto');
      var tri = document.createElementNS(NS, 'path'); tri.setAttribute('d', 'M0,0 L8,4 L0,8 z'); tri.setAttribute('class', 'carrow-head');
      mk.appendChild(tri); defs.appendChild(mk); svg.appendChild(defs);
      link('a', 'o1', 'ca');
      if (st.b === 'o1') {
        var from = stage.querySelector('.cname[data-name="b"]');
        var to = stage.querySelector('.cobj[data-obj="o1"]');
        link('b', 'o1', 'cb');
      } else if (st.b === 'o2') link('b', 'o2', 'cb');
    }
    function updateInfo() {
      clear(info);
      var A = st.objs[st.a].items;
      info.appendChild(h('div', { class: 'lab-line' }, codeInline('print(a)'), h('span', { class: 'arrow' }, icon('arrow')), h('code', { class: 'ic res' }, '[' + A.join(', ') + ']')));
      if (st.b !== null) {
        var B = st.objs[st.b].items;
        info.appendChild(h('div', { class: 'lab-line' }, codeInline('print(b)'), h('span', { class: 'arrow' }, icon('arrow')), h('code', { class: 'ic res' }, '[' + B.join(', ') + ']')));
        var same = st.b === st.a;
        info.appendChild(h('div', { class: 'lab-line' }, codeInline('a is b'), h('span', { class: 'arrow' }, icon('arrow')), h('code', { class: 'ic ' + (same ? 'res-bad' : 'res') }, same ? 'True' : 'False'),
          h('span', { class: 'muted' }, same ? '  — бір объект: біреуін өзгертсек, екіншісі де өзгереді' : '  — екі бөлек объект: бірі екіншісіне әсер етпейді')));
      }
    }
    function assign(mode) {
      fresh();
      if (mode === 'alias') { st.b = 'o1'; cmdLine.textContent = ''; setCmd('b = a'); }
      else { st.objs.o2 = { name: '№2', items: st.objs.o1.items.slice() }; st.b = 'o2'; setCmd('b = a.copy()'); }
      render(); updateInfo();
    }
    function setCmd(c) { clear(cmdLine); cmdLine.append('Орындалған команда: ', codeInline(c)); }
    function doOp(which) {
      if (st.b === null) return;
      var B = st.objs[st.b].items, A = st.objs[st.a].items;
      if (which === 'bappend') { B.push(40); setCmd('b.append(40)'); }
      else if (which === 'bset') { B[0] = 99; setCmd('b[0] = 99'); }
      else if (which === 'aappend') { A.push(50); setCmd('a.append(50)'); }
      render(); updateInfo();
      if (!reducedMotion()) $$('.cobj', stage).forEach(function (o) { o.animate([{ transform: 'scale(1.03)' }, { transform: 'none' }], { duration: 220, easing: 'ease-out' }); });
    }
    function opBtn(label, which) { var b = btn(label, { kind: 'ghost', onClick: function () { doOp(which); }, cls: 'mono-btn' }); opBtns.push(b); return b; }
    var bAlias = btn('b = a', { kind: 'accent', onClick: function () { assign('alias'); }, cls: 'mono-btn' });
    var bCopy = btn('b = a.copy()', { kind: 'primary', onClick: function () { assign('copy'); }, cls: 'mono-btn' });
    var bReset = btn('Қайта бастау', { kind: 'ghost', icon: 'reset', onClick: function () { fresh(); clear(cmdLine); render(); updateInfo(); } });
    window.addEventListener('resize', function () { if (stage.isConnected) drawArrows(); });
    var opRow = h('div', { class: 'btn-row' }, h('span', { class: 'muted' }, '2-қадам:'), opBtn('b.append(40)', 'bappend'), opBtn('b[0] = 99', 'bset'), opBtn('a.append(50)', 'aappend'));
    render(); updateInfo();
    return card('lab',
      cardTitle('Көшіру демонстрациясы: b = a және b = a.copy()', 'code'),
      h('div', { class: 'lab-line' }, codeInline('a = [10, 20, 30]'), h('span', { class: 'muted' }, '  · Ішкі тізімдері жоқ қарапайым тізім')),
      h('div', { class: 'btn-row' }, h('span', { class: 'muted' }, '1-қадам:'), bAlias, bCopy, bReset),
      opRow,
      cmdLine, stage, info);
  }

  /* ───────── Б) Жолдан тізімге: split() және int() ───────── */
  function splitDemo() {
    var rawIn = textInput('80 95 60 100', { max: 40, aria: 'Жол (raw)', cls: 'inp-wide' });
    var stageEl = h('div', { class: 'sstage', 'aria-live': 'polite' });
    var codeHost = h('div');
    var step = 0;
    var bSplit = btn('1 · split()', { kind: 'accent', onClick: function () { step = 1; render(true); } });
    var bInt = btn('2 · int() қолдану', { kind: 'primary', onClick: function () { step = 2; render(true); } });
    var bReset = btn('Қайта бастау', { kind: 'ghost', icon: 'reset', onClick: function () { step = 0; render(false); } });

    function render(animate) {
      var raw = rawIn.value;
      var parts = pySplit(raw);
      clear(stageEl);
      bInt.disabled = step < 1;
      var lines = ['raw = ' + pyLit(raw)];
      if (step >= 1) lines.push('parts = raw.split()');
      if (step >= 2) { lines.push('scores = []'); lines.push('for part in parts:'); lines.push('    scores.append(int(part))'); }
      clear(codeHost); codeHost.appendChild(codeBlock(lines, { title: 'main.py', copy: false }).el);

      stageEl.appendChild(h('div', { class: 'srow' }, h('div', { class: 'sl' }, 'raw — str'), h('div', { class: 'schars' },
        cps(raw).map(function (ch) { return h('span', { class: 'sch' + (RE_WS_SPLIT.test(ch) && ch.trim() === '' || ch === ' ' ? ' sch-sp' : '') }, showChar(ch)); }))));
      if (step >= 1) {
        var row = h('div', { class: 'srow' }, h('div', { class: 'sl' }, 'parts = raw.split() — list ішінде str'),
          h('div', { class: 'schips' }, parts.length ? parts.map(function (p) { return h('span', { class: 'chip chip-str' }, pyRepr(p)); }) : h('span', { class: 'cells-empty' }, 'Бос тізім: [] (split() бос жолдан бос тізім береді)')));
        stageEl.appendChild(row);
        stageEl.appendChild(h('div', { class: 'lab-line' }, codeInline('print(parts)'), h('span', { class: 'arrow' }, icon('arrow')),
          h('code', { class: 'ic res' }, '[' + parts.map(pyRepr).join(', ') + ']'), h('span', { class: 'muted' }, '  — элементтер мәтін, сан емес')));
      }
      if (step >= 2) {
        var nums = [], bad = -1;
        for (var i = 0; i < parts.length; i++) {
          var t = parts[i];
          if (/^[+-]?\d+(_\d+)*$/.test(t)) nums.push(Number(t.replace(/_/g, ''))); else { bad = i; break; }
        }
        var chips = parts.map(function (p, i) {
          if (bad >= 0 && i === bad) return h('span', { class: 'chip chip-bad' }, pyRepr(p) + ' ✗');
          if (bad >= 0 && i > bad) return h('span', { class: 'chip chip-str chip-dim' }, pyRepr(p));
          return h('span', { class: 'chip chip-int' }, String(nums[i]));
        });
        stageEl.appendChild(h('div', { class: 'srow' }, h('div', { class: 'sl' }, 'scores — list ішінде int'), h('div', { class: 'schips' }, chips.length ? chips : h('span', { class: 'cells-empty' }, '[]'))));
        if (bad >= 0) {
          stageEl.appendChild(errorBox('err', 'ValueError: invalid literal for int() with base 10: ' + pyRepr(parts[bad]),
            'int() «' + parts[bad] + '» мәтінін бүтін санға айналдыра алмайды. Енгізілген мәндердің бәрі бүтін сан болуы керек. Цикл осы жерде тоқтайды.'));
        } else {
          stageEl.appendChild(h('div', { class: 'lab-line' }, codeInline('print(scores)'), h('span', { class: 'arrow' }, icon('arrow')), h('code', { class: 'ic res' }, '[' + nums.join(', ') + ']')));
          if (nums.length) {
            var sum = nums.reduce(function (x, y) { return x + y; }, 0);
            stageEl.appendChild(h('div', { class: 'lab-line' }, codeInline('sum(scores) / len(scores)'), h('span', { class: 'arrow' }, icon('arrow')), h('code', { class: 'ic res' }, pyFloat(sum / nums.length))));
          } else {
            stageEl.appendChild(errorBox('err', 'ZeroDivisionError: division by zero', 'Тізім бос, орташа мәнді есептеуге болмайды (0-ге бөлу). Мысалда тізім бос емес деп есептеледі.'));
          }
        }
      }
      if (animate && !reducedMotion()) $$('.chip', stageEl).forEach(function (c, i) { c.animate([{ opacity: 0, transform: 'translateY(8px) scale(.9)' }, { opacity: 1, transform: 'none' }], { duration: 220, delay: Math.min(i * 40, 200), easing: 'ease-out', fill: 'backwards' }); });
    }
    rawIn.addEventListener('input', function () { render(false); });
    render(false);
    return card('lab',
      cardTitle('Жолдан тізімге: split() және int()', 'code'),
      h('div', { class: 'lab-controls' }, field('Жол (raw)', rawIn), h('div', { class: 'btn-row btn-row-end' }, bSplit, bInt, bReset)),
      stageEl, codeHost);
  }

  /* ═════════════════════ ПРАКТИКАЛЫҚ МЫСАЛДАР (қадамдық демонстрация) ═════════════════════ */

  function exampleRunner(ex, ctx) {
    var steps = ex.steps;
    var cb = codeBlock(ex.codeLines, { title: 'main.py', copy: false, label: 'Мысал коды' });
    var stepping = false, si = 0, resultShown = false;
    var noteEl = h('div', { class: 'step-note', 'aria-live': 'polite' });
    var counterEl = h('span', { class: 'step-count' });
    var varsHost = h('div', { class: 'vars' });
    var consoleBody = h('pre', { class: 'console-body', 'aria-live': 'polite' });
    var stepPanel = h('div', { class: 'step-panel', hidden: true });
    var stepRow = h('div', { class: 'btn-row step-row', hidden: true });
    var disclaimer = h('div', { class: 'disclaimer', hidden: true }, 'Қадамдық демонстрация: алдын ала дайындалған қадамдар. Бұл — браузердегі Python интерпретаторы емес.');

    var bCopy = btn('Кодты көшіру', { icon: 'copy', kind: 'ghost', onClick: function () { copyWithToast(ex.codeLines.join('\n'), 'Код көшірілді'); } });
    var bStep = btn('Қадамдық көрсету', { icon: 'play', kind: 'accent', onClick: function () { if (!stepping) startStepping(); else goStep(si + 1); } });
    var bRes = btn('Нәтижені ашу', { icon: 'eye', kind: 'primary', onClick: function () { setResult(!resultShown); } });
    var bReset = btn('Қайта бастау', { icon: 'reset', kind: 'ghost', onClick: function () { reset(); } });
    var bPrev = btn('Алдыңғы қадам', { icon: 'prev', kind: 'ghost', onClick: function () { goStep(si - 1); } });
    var bNext = btn('Келесі қадам', { icon: 'next', kind: 'accent', onClick: function () { goStep(si + 1); } });
    var bSkip = btn('Циклді өткізу', { icon: 'skip', kind: 'ghost', onClick: function () { skipLoop(); } });

    function inLoop(line) {
      for (var i = 0; i < ex.loops.length; i++) { if (line >= ex.loops[i][0] && line <= ex.loops[i][1]) return ex.loops[i]; }
      return null;
    }
    function renderConsole() {
      var lines;
      if (resultShown) lines = ex.output;
      else if (stepping) lines = ex.output.slice(0, steps[si].o);
      else lines = null;
      clear(consoleBody);
      if (lines === null) consoleBody.appendChild(h('span', { class: 'muted' }, 'Нәтиже жасырылған. «Нәтижені ашу» батырмасын басыңыз.'));
      else if (!lines.length) consoleBody.appendChild(h('span', { class: 'muted' }, '(әзірге ештеңе шығарылған жоқ)'));
      else consoleBody.appendChild(document.createTextNode(lines.join('\n')));
      consoleBody.parentNode && consoleBody.parentNode.classList.toggle('is-open', lines !== null);
    }
    function setResult(v) {
      resultShown = !!v;
      clear(bRes);
      bRes.appendChild(icon(resultShown ? 'eyeoff' : 'eye'));
      bRes.appendChild(h('span', { class: 'btn-txt' }, resultShown ? 'Нәтижені жасыру' : 'Нәтижені ашу'));
      renderConsole();
    }
    function renderVars(prev, cur) {
      clear(varsHost);
      var names = Object.keys(cur);
      if (!names.length) { varsHost.appendChild(h('div', { class: 'muted' }, 'Айнымалылар әлі жасалған жоқ.')); return; }
      var t = h('table', { class: 'vtbl' }, h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Айнымалы'), h('th', { scope: 'col' }, 'Мәні'))));
      var tb = h('tbody');
      names.forEach(function (n) {
        var changed = !prev || !(n in prev) || prev[n] !== cur[n];
        tb.appendChild(h('tr', { class: changed ? 'changed' : null }, h('th', { scope: 'row' }, n), h('td', null, h('code', null, cur[n]), changed ? h('span', { class: 'chg', 'aria-label': 'өзгерді' }, ' ●') : null)));
      });
      t.appendChild(tb);
      varsHost.appendChild(t);
    }
    function goStep(i) {
      if (!stepping) return;
      si = clamp(i, 0, steps.length - 1);
      var s = steps[si], prev = si > 0 ? steps[si - 1].v : null;
      cb.setActive(s.l);
      counterEl.textContent = 'Қадам ' + (si + 1) + ' / ' + steps.length;
      clear(noteEl);
      if (s.l === 0) noteEl.appendChild(h('div', null, h('b', null, 'Бағдарлама аяқталды. '), 'Соңғы күй мен нәтиже төменде.'));
      else {
        noteEl.appendChild(h('div', { class: 'step-line' }, h('span', { class: 'tag' }, 'Келесі жол ' + s.l), ' ', h('code', { class: 'ic' }, ex.codeLines[s.l - 1].trim())));
        noteEl.appendChild(h('div', null, ex.notes[String(s.l)] || ''));
      }
      renderVars(prev, s.v);
      renderConsole();
      bPrev.disabled = si === 0;
      bNext.disabled = si === steps.length - 1;
      bSkip.hidden = !(s.l && inLoop(s.l));
      clear(bStep);
      bStep.appendChild(icon('next'));
      bStep.appendChild(h('span', { class: 'btn-txt' }, si >= steps.length - 1 ? 'Соңы' : 'Келесі қадам'));
      bStep.disabled = si >= steps.length - 1;
      if (!reducedMotion()) { noteEl.classList.remove('pop'); void noteEl.offsetWidth; noteEl.classList.add('pop'); }
    }
    function skipLoop() {
      var s = steps[si], lp = s.l ? inLoop(s.l) : null;
      if (!lp) return;
      var j = si;
      while (j < steps.length - 1 && steps[j].l && steps[j].l >= lp[0] && steps[j].l <= lp[1]) j++;
      goStep(j);
    }
    function startStepping() {
      stepping = true; si = 0;
      stepPanel.hidden = false; stepRow.hidden = false; disclaimer.hidden = false;
      goStep(0);
    }
    function reset() {
      stepping = false; si = 0;
      stepPanel.hidden = true; stepRow.hidden = true; disclaimer.hidden = true;
      cb.setActive(0);
      clear(bStep); bStep.appendChild(icon('play')); bStep.appendChild(h('span', { class: 'btn-txt' }, 'Қадамдық көрсету')); bStep.disabled = false;
      setResult(false);
    }
    ctx.stepKey = function (dir) {
      if (dir > 0) { if (!stepping) startStepping(); else goStep(si + 1); }
      else if (stepping) goStep(si - 1);
    };
    ctx.answers.push({ set: function (v) { setResult(v); }, get shown() { return resultShown; } });

    stepPanel.append(
      h('div', { class: 'step-head' }, h('span', { class: 'tag tag-accent' }, 'Қадамдық демонстрация'), counterEl),
      noteEl, varsHost);
    stepRow.append(bPrev, bNext, bSkip);
    var consoleBox = h('div', { class: 'console' }, h('div', { class: 'console-t' }, icon('code'), h('span', null, 'Нәтиже (консоль)')), consoleBody);
    renderConsole();
    return h('div', { class: 'ex-run' },
      h('div', { class: 'ex-left' }, cb.el, h('div', { class: 'btn-row' }, bCopy, bStep, bRes, bReset), stepRow, disclaimer),
      h('div', { class: 'ex-right' }, stepPanel, consoleBox));
  }

  /* ═════════════════════ БЕКІТУ СҰРАҚТАРЫ ═════════════════════ */

  var QTYPES = {
    short: 'Қысқа ауызша жауап', predict: 'Код нәтижесін болжау', error: 'Қатені табу', compare: 'Ұғымдарды салыстыру'
  };
  function quizCard(lesson, q, ctx) {
    var lid = lesson.id;
    var left = q.time, running = false, endAt = 0, tick = null;
    var timeEl = h('span', { class: 'qt-time mono', role: 'timer', 'aria-live': 'off' }, fmtTime(left * 1000));
    var stateEl = h('span', { class: 'qt-state' }, '');
    var durSel = h('select', { class: 'sel', 'aria-label': 'Ойлану уақыты' },
      [15, 20, 30, 45, 60, 90, 120].map(function (s) { return h('option', { value: String(s), selected: s === q.time ? true : null }, s + ' с'); }));
    var bGo = btn('Ойлануға уақыт', { icon: 'clock', kind: 'accent', onClick: function () { toggle(); } });
    var bRst = btn('', { icon: 'reset', kind: 'ghost', aria: 'Таймерді қайта бастау', title: 'Таймерді қайта бастау', onClick: function () { stop(); left = Number(durSel.value); paint(); stateEl.textContent = ''; } });
    function paint() { timeEl.textContent = fmtTime(left * 1000); timeEl.classList.toggle('qt-low', running && left <= 5); }
    function stop() { running = false; if (tick) { clearInterval(tick); tick = null; } setGo(); }
    function setGo() {
      clear(bGo);
      bGo.appendChild(icon(running ? 'pause' : 'clock'));
      bGo.appendChild(h('span', { class: 'btn-txt' }, running ? 'Кідірту' : (left < Number(durSel.value) && left > 0 ? 'Жалғастыру' : 'Ойлануға уақыт')));
    }
    function toggle() {
      if (running) { left = Math.max(0, (endAt - Date.now()) / 1000); stop(); paint(); stateEl.textContent = 'кідіртілді'; return; }
      if (left <= 0) left = Number(durSel.value);
      running = true; endAt = Date.now() + left * 1000; stateEl.textContent = '';
      tick = setInterval(function () {
        left = Math.max(0, (endAt - Date.now()) / 1000);
        paint();
        if (left <= 0) { stop(); stateEl.textContent = 'Уақыт бітті'; paint(); }
      }, 200);
      setGo(); paint();
    }
    durSel.addEventListener('change', function () { stop(); left = Number(durSel.value); paint(); stateEl.textContent = ''; setGo(); });
    ctx.cleanups.push(stop);
    setGo();

    var codeEl = q.code ? codeBlock(q.code, { title: 'main.py', label: 'Сұрақ коды' }).el : null;
    var ansBody = h('div', { class: 'ans-body' },
      h('div', { class: 'ans-row' }, h('span', { class: 'tag tag-ok' }, 'Дұрыс жауап'), h('span', { class: 'ans-text' }, q.answer)),
      q.result != null ? h('div', { class: 'ans-row' }, h('span', { class: 'tag' }, 'Код нәтижесі'), h('pre', { class: 'ans-pre' }, q.result)) : null,
      h('div', { class: 'ans-row' }, h('span', { class: 'tag' }, 'Түсіндірме'), h('span', { class: 'ans-text' }, q.explain)),
      h('div', { class: 'small-note' }, 'Жауаптар автоматты бағаланбайды: үлгі жауаппен салыстырып, өзіңізді бағалаңыз.'));
    var rev = makeReveal(ctx, 'Жауапты көрсету', 'Жауапты жасыру', ansBody);

    var marks = pget('quiz', lid);
    var bOk = h('button', { type: 'button', class: 'btn btn-mark btn-mark-ok', 'aria-pressed': 'false' }, icon('check'), h('span', { class: 'btn-txt' }, 'Түсіндім'));
    var bAgain = h('button', { type: 'button', class: 'btn btn-mark btn-mark-again', 'aria-pressed': 'false' }, icon('reset'), h('span', { class: 'btn-txt' }, 'Қайталау керек'));
    function paintMarks() {
      bOk.setAttribute('aria-pressed', String(marks[q.n] === 'ok'));
      bAgain.setAttribute('aria-pressed', String(marks[q.n] === 'again'));
    }
    bOk.addEventListener('click', function () { marks[q.n] = marks[q.n] === 'ok' ? undefined : 'ok'; if (!marks[q.n]) delete marks[q.n]; saveProgress(); paintMarks(); });
    bAgain.addEventListener('click', function () { marks[q.n] = marks[q.n] === 'again' ? undefined : 'again'; if (!marks[q.n]) delete marks[q.n]; saveProgress(); paintMarks(); });
    paintMarks();

    return h('div', { class: 'quiz' },
      h('div', { class: 'quiz-top' },
        h('span', { class: 'tag tag-type' }, QTYPES[q.type]),
        h('span', { class: 'muted' }, 'Сұрақ ' + q.n + ' / 6')),
      h('div', { class: 'quiz-q' }, q.q),
      codeEl,
      h('div', { class: 'qtimer' }, bGo, timeEl, durSel, bRst, stateEl),
      h('div', { class: 'btn-row' }, rev.button),
      rev.box,
      h('div', { class: 'btn-row marks' }, h('span', { class: 'muted' }, 'Өзін-өзі бағалау:'), bOk, bAgain));
  }

  /* ═════════════════════ ПРАКТИКАЛЫҚ ЖҰМЫС: НҰСҚАЛАР ═════════════════════ */

  function lessonById(id) { return DATA.lessons.filter(function (l) { return l.id === id; })[0]; }
  function selVariantNum(lid) { var n = progress.variant[lid]; return n >= 1 && n <= 8 ? n : null; }
  function setVariantNum(lid, n) { progress.variant[lid] = n; saveProgress(); }
  function baseUrl() { return String(window.location.href).split('#')[0]; }
  function variantLink(lid, n) { return baseUrl() + '#l=' + lid + '&s=v-data&v=' + n; }
  function variantTitle(lesson, v) { return v.n + '-нұсқа: ' + v.title; }
  function variantTaskText(lesson, v) {
    var t = lesson.num + '-сабақ: ' + lesson.title + '\n' + v.n + ' нұсқа. ' + v.title + '\n' + v.intro + '\n\nБес тапсырма:\n';
    v.tasks.forEach(function (x, i) { t += (i + 1) + '. ' + x + '\n'; });
    if (v.constraints && v.constraints.length) { t += '\nШектеулер:\n'; v.constraints.forEach(function (c) { t += '– ' + c + '\n'; }); }
    t += '\nНегізгі тәсіл: ' + v.method + '\nТапсыру: ' + v.submit + '\nБағалау: ' + v.grading;
    return t;
  }
  function tasksDone(lid, n) {
    var arr = (progress.tasks[lid] || {})[n] || [];
    var c = 0; for (var i = 0; i < 5; i++) if (arr[i]) c++;
    return c;
  }
  /* Таңдалған нұсқа үшін басып шығару құжаты */
  function buildPrintDoc(lesson, v) {
    var field = function (label, w) { return h('span', { class: 'pd-field' }, label + ': ', h('span', { class: 'pd-line', style: { minWidth: w } })); };
    var grade = h('table', { class: 'pd-grade' },
      h('thead', null, h('tr', null, ['Тапсырма', 'Алгоритм дұрыс (1 балл)', 'Нәтиже дұрыс әрі түсінікті (1 балл)', 'Балл'].map(function (c) { return h('th', null, c); }))),
      h('tbody', null, [1, 2, 3, 4, 5].map(function (i) { return h('tr', null, h('td', null, String(i)), h('td'), h('td'), h('td')); }),
        h('tr', { class: 'pd-total' }, h('td', { colspan: '3' }, 'Барлығы (10 баллдан)'), h('td'))));
    return h('div', { class: 'print-doc' },
      h('div', { class: 'pd-brand' }, DATA.meta.title + ' · ' + lesson.num + '-сабақ: ' + lesson.title),
      h('h1', null, v.n + ' нұсқа. ' + v.title),
      h('div', { class: 'pd-fields' }, field('Студент', '70mm'), field('Топ', '28mm'), field('Күні', '28mm')),
      h('p', { class: 'pd-intro' }, v.intro),
      h('h2', null, 'Бастапқы деректер'),
      h('pre', { class: 'pd-code' }, v.data),
      h('h2', null, 'Бес тапсырма'),
      h('ol', { class: 'pd-tasks' }, v.tasks.map(function (t) { return h('li', null, t); })),
      v.constraints && v.constraints.length ? h('div', { class: 'pd-block' }, h('h2', null, 'Шектеулер'), h('ul', null, v.constraints.map(function (c) { return h('li', null, c); }))) : null,
      h('p', { class: 'pd-method' }, h('b', null, 'Негізгі тәсіл: '), v.method),
      h('div', { class: 'pd-block' }, h('h2', null, 'Тапсыру және бағалау'),
        h('p', null, h('b', null, 'Тапсыру: '), v.submit),
        h('p', null, h('b', null, 'Бағалау: '), v.grading),
        grade));
  }
  /* Таңдалған нұсқаға сәйкес үй жұмысы үшін басып шығару құжаты */
  function buildPrintDocHW(lesson, hw) {
    var field = function (label, w) { return h('span', { class: 'pd-field' }, label + ': ', h('span', { class: 'pd-line', style: { minWidth: w } })); };
    return h('div', { class: 'print-doc' },
      h('div', { class: 'pd-brand' }, DATA.meta.title + ' · ' + lesson.num + '-сабақ: ' + lesson.title + ' · Үй жұмысы'),
      h('h1', null, hw.n + ' нұсқа. ' + hw.title),
      h('div', { class: 'pd-fields' }, field('Студент', '70mm'), field('Топ', '28mm'), field('Күні', '28mm')),
      h('p', { class: 'pd-intro' }, hw.condition),
      h('h2', null, 'Бастапқы деректер'),
      h('pre', { class: 'pd-code' }, hw.data),
      h('h2', null, 'Үш қадам'),
      h('ol', { class: 'pd-tasks' }, hw.steps.map(function (t) { return h('li', null, t); })),
      h('div', { class: 'pd-block' }, h('h2', null, 'Күтілетін нәтиженің форматы'), h('p', null, hw.outputFormat)),
      h('div', { class: 'pd-block' }, h('h2', null, 'Тапсыру және бағалау'),
        h('p', null, h('b', null, 'Тапсыру: '), hw.submit),
        h('p', null, h('b', null, 'Бағалау: '), hw.grading)));
  }
  function fillPrintArea(lid, kind) {
    var area = $('#print-area');
    clear(area);
    var lesson = lessonById(lid), n = lid ? selVariantNum(lid) : null;
    if (!lesson || !n) {
      area.appendChild(h('div', { class: 'print-doc' }, h('h1', null, 'Нұсқа таңдалмаған'),
        h('p', null, 'Басып шығару үшін алдымен «Практикалық жұмыс» бөлімінде нұсқаны таңдаңыз.')));
      return false;
    }
    if (kind === 'hw') area.appendChild(buildPrintDocHW(lesson, lesson.homework[n - 1]));
    else area.appendChild(buildPrintDoc(lesson, lesson.variants[n - 1]));
    return true;
  }
  var printKind = 'variant';
  function printVariant(lid) {
    if (!fillPrintArea(lid, 'variant')) { toast('Алдымен нұсқаны таңдаңыз', 'warn'); return; }
    printKind = 'variant'; printPending = true;
    setTimeout(function () { window.print(); }, 30);
  }
  function printHomework(lid) {
    if (!fillPrintArea(lid, 'hw')) { toast('Алдымен нұсқаны таңдаңыз', 'warn'); return; }
    printKind = 'hw'; printPending = true;
    setTimeout(function () { window.print(); }, 30);
  }
  var printPending = false;
  window.addEventListener('beforeprint', function () { if (!printPending) fillPrintArea(S.lessonId, printKind); });
  window.addEventListener('afterprint', function () { printPending = false; });

  /* Нұсқа құралдар тақтасы (таңдау + көшіру + басып шығару) */
  function variantToolbar(lesson, ctx, onChange) {
    var lid = lesson.id, n = selVariantNum(lid);
    var sel = h('select', { class: 'sel', 'aria-label': 'Нұсқаны таңдау' },
      h('option', { value: '' }, '— нұсқа таңдаңыз —'),
      lesson.variants.map(function (v) { return h('option', { value: String(v.n), selected: v.n === n ? true : null }, v.n + '-нұсқа: ' + v.title); }));
    sel.addEventListener('change', function () {
      var k = parseInt(sel.value, 10);
      if (k >= 1 && k <= 8) { setVariantNum(lid, k); onChange(); }
    });
    var has = !!n;
    var v = has ? lesson.variants[n - 1] : null;
    return h('div', { class: 'vbar' },
      h('div', { class: 'btn-row' }, h('label', { class: 'field field-inline' }, h('span', { class: 'field-l' }, 'Нұсқа'), sel)),
      h('div', { class: 'btn-row' },
        btn('Сілтемені көшіру', { icon: 'link', kind: 'ghost', disabled: !has, onClick: function () { copyWithToast(variantLink(lid, n), 'Нұсқа сілтемесі көшірілді'); } }),
        btn('Тапсырма мәтінін көшіру', { icon: 'copy', kind: 'ghost', disabled: !has, onClick: function () { copyWithToast(variantTaskText(lesson, v), 'Тапсырма мәтіні көшірілді'); } }),
        btn('Бастапқы деректерді көшіру', { icon: 'code', kind: 'ghost', disabled: !has, onClick: function () { copyWithToast(v.data, 'Бастапқы деректер көшірілді'); } }),
        btn('Басып шығару', { icon: 'print', kind: 'ghost', disabled: !has, onClick: function () { printVariant(lid); } })));
  }
  function noVariantNotice(goPick) {
    return card('notice', h('p', null, 'Нұсқа таңдалмаған. Жоғарыдағы тізімнен нұсқаны таңдаңыз немесе нұсқа таңдау экранына өтіңіз.'),
      btn('Нұсқа таңдау экраны', { kind: 'accent', icon: 'list', onClick: goPick }));
  }

  /* Нұсқа таңдау және үлестіру экраны */
  function variantPicker(lesson, ctx, nav) {
    var lid = lesson.id;
    var wrap = h('div', { class: 'vpick' });
    function render() {
      clear(wrap);
      var sel = selVariantNum(lid);
      var tiles = h('div', { class: 'vtiles', role: 'group', 'aria-label': 'Нұсқалар' },
        lesson.variants.map(function (v) {
          var done = tasksDone(lid, v.n);
          return h('button', {
            type: 'button', class: 'vtile' + (sel === v.n ? ' is-sel' : ''), 'aria-pressed': String(sel === v.n),
            onClick: function () { setVariantNum(lid, v.n); render(); }
          }, h('span', { class: 'vtile-n' }, String(v.n)), h('span', { class: 'vtile-t' }, v.title),
            h('span', { class: 'vtile-meta' }, h('span', { class: 'badge' }, done + '/5 тапсырма')));
        }));
      var selBox;
      if (sel) {
        var v = lesson.variants[sel - 1];
        selBox = card('vsel', h('div', { class: 'vsel-t' }, h('span', { class: 'tag tag-accent' }, 'Таңдалған'), ' ', h('b', null, variantTitle(lesson, v))),
          h('div', { class: 'btn-row' }, btn('Нұсқаны ашу', { kind: 'primary', icon: 'next', onClick: function () { nav('v-data'); } }),
            btn('Сілтемені көшіру', { icon: 'link', kind: 'ghost', onClick: function () { copyWithToast(variantLink(lid, sel), 'Нұсқа сілтемесі көшірілді'); } }),
            btn('Басып шығару', { icon: 'print', kind: 'ghost', onClick: function () { printVariant(lid); } })));
      } else selBox = card('vsel', h('div', { class: 'muted' }, 'Нұсқа әлі таңдалған жоқ. Өз нөміріңізді басыңыз, немесе кездейсоқ нұсқаны таңдаңыз.'));

      var rnd = btn('Кездейсоқ нұсқа', { kind: 'accent', icon: 'dice', onClick: function () {
        var n = 1 + Math.floor(Math.random() * lesson.variants.length);
        setVariantNum(lid, n); render(); toast(n + '-нұсқа таңдалды');
      } });
      wrap.append(tiles, h('div', { class: 'btn-row' }, rnd), selBox);
    }
    render();
    return wrap;
  }

  /* Нұсқаның 1-бөлігі: деректер, шектеулер, тапсыру, бағалау */
  function variantDataView(lesson, ctx, nav, rerender) {
    var n = selVariantNum(lesson.id);
    var wrap = h('div', { class: 'vview' });
    wrap.appendChild(variantToolbar(lesson, ctx, rerender));
    if (!n) { wrap.appendChild(noVariantNotice(function () { nav('v-pick'); })); return wrap; }
    var v = lesson.variants[n - 1];
    wrap.append(
      h('div', { class: 'vhead' }, h('span', { class: 'vnum' }, v.n), h('div', null, h('div', { class: 'vtitle' }, v.title))),
      para(v.intro, 'vintro'),
      h('div', { class: 'two-col' },
        h('div', null, card('', cardTitle('Бастапқы деректер', 'code'), codeBlock(v.data, { title: 'data.py' }).el),
          card('', cardTitle('Негізгі тәсіл', 'bulb'), para(v.method))),
        h('div', null,
          card('', cardTitle('Шектеулер', 'flag'), h('ul', { class: 'clean' }, v.constraints.map(function (c) { return h('li', null, c); }))),
          card('', cardTitle('Тапсыру және бағалау', 'check'), para(v.submit), para('Бағалау: ' + v.grading),
            para(DATA.meta.grading, 'small-note')))));
    return wrap;
  }
  /* Нұсқаның 2-бөлігі: бес тапсырма */
  function variantTasksView(lesson, ctx, nav, rerender) {
    var lid = lesson.id, n = selVariantNum(lid);
    var wrap = h('div', { class: 'vview' });
    wrap.appendChild(variantToolbar(lesson, ctx, rerender));
    if (!n) { wrap.appendChild(noVariantNotice(function () { nav('v-pick'); })); return wrap; }
    var v = lesson.variants[n - 1];
    var store5 = pget('tasks', lid);
    if (!Array.isArray(store5[n])) store5[n] = [false, false, false, false, false];
    var arr = store5[n];
    var prog = h('span', { class: 'task-prog' });
    var bar = h('div', { class: 'bar' }, h('i'));
    function paint() {
      var c = arr.filter(Boolean).length;
      prog.textContent = 'Орындалды: ' + c + ' / 5';
      bar.firstChild.style.width = (c * 20) + '%';
    }
    var list = h('ol', { class: 'tasks' }, v.tasks.map(function (t, i) {
      var cb = h('input', { type: 'checkbox', class: 'task-cb', 'aria-label': (i + 1) + '-тапсырма орындалды', checked: arr[i] ? true : null });
      var li = h('li', { class: 'task' + (arr[i] ? ' is-done' : '') },
        h('label', { class: 'task-l' }, cb, h('span', { class: 'task-box', 'aria-hidden': 'true' }, icon('check')),
          h('span', { class: 'task-n' }, String(i + 1)), h('span', { class: 'task-t' }, t)));
      cb.addEventListener('change', function () { arr[i] = cb.checked; li.classList.toggle('is-done', cb.checked); saveProgress(); paint(); });
      return li;
    }));
    paint();
    wrap.append(
      h('div', { class: 'vhead' }, h('span', { class: 'vnum' }, v.n), h('div', null, h('div', { class: 'vtitle' }, v.title), para(v.intro, 'vintro'))),
      card('', h('div', { class: 'task-top' }, cardTitle('Бес тапсырма', 'list'), prog), bar, list),
      errorBox('info', 'Дайын шешім жоқ', 'Есептің шешімі сайтта көрсетілмейді. Тапсырманы өзіңіз орындап, .py файлын, нәтижесін және қолданған әдісіңіз туралы 2–3 сөйлемді тапсырыңыз.'));
    return wrap;
  }

  /* ═════════════════════ ҮЙ ЖҰМЫСЫ ═════════════════════ */

  function homeworkTaskText(lesson, hw) {
    var t = lesson.num + '-сабақ: ' + lesson.title + ' · Үй жұмысы\n' + hw.n + ' нұсқа. ' + hw.title + '\n\n' + hw.condition + '\n\nБастапқы деректер:\n' + hw.data + '\n\nҮш қадам:\n';
    hw.steps.forEach(function (s, i) { t += (i + 1) + '. ' + s + '\n'; });
    t += '\nКүтілетін нәтиженің форматы: ' + hw.outputFormat + '\nТапсыру: ' + hw.submit + '\nБағалау: ' + hw.grading;
    return t;
  }
  function homeworkView(lesson, ctx) {
    var lid = lesson.id, n = selVariantNum(lid);
    var wrap = h('div', { class: 'vview' });
    if (!n) {
      wrap.appendChild(card('notice', h('p', null, 'Үй жұмысы таңдалған нұсқаға сәйкес беріледі. Алдымен «Практикалық жұмыс» бөлімінде нұсқаны таңдаңыз.'),
        btn('Нұсқа таңдау экраны', { kind: 'accent', icon: 'list', onClick: function () { ctx.nav('v-pick'); } })));
      return wrap;
    }
    var hw = lesson.homework[n - 1];
    var hwStore = pget('hw', lid);
    var doneCb = h('input', { type: 'checkbox', class: 'task-cb', 'aria-label': 'Үй жұмысы аяқталды', checked: hwStore[n] ? true : null });
    var doneLi = h('li', { class: 'task' + (hwStore[n] ? ' is-done' : '') },
      h('label', { class: 'task-l' }, doneCb, h('span', { class: 'task-box', 'aria-hidden': 'true' }, icon('check')),
        h('span', { class: 'task-t' }, 'Үй жұмысын аяқтадым')));
    doneCb.addEventListener('change', function () { hwStore[n] = doneCb.checked; doneLi.classList.toggle('is-done', doneCb.checked); saveProgress(); });
    wrap.append(
      h('div', { class: 'vbar' }, h('div', { class: 'btn-row' },
        btn('Тапсырма мәтінін көшіру', { icon: 'copy', kind: 'ghost', onClick: function () { copyWithToast(homeworkTaskText(lesson, hw), 'Үй жұмысының мәтіні көшірілді'); } }),
        btn('Бастапқы деректерді көшіру', { icon: 'code', kind: 'ghost', onClick: function () { copyWithToast(hw.data, 'Бастапқы деректер көшірілді'); } }),
        btn('Басып шығару', { icon: 'print', kind: 'ghost', onClick: function () { printHomework(lid); } }))),
      h('div', { class: 'vhead' }, h('span', { class: 'vnum' }, hw.n), h('div', null, h('div', { class: 'vtitle' }, hw.title),
        para('Бұл үй жұмысы — практикадағы ' + n + '-нұсқаға сәйкес, сыныптағы жұмыстан сәл күрделірек, жаңа жағдаятпен берілген.', 'small-note'))),
      para(hw.condition, 'vintro'),
      h('div', { class: 'two-col' },
        h('div', null, card('', cardTitle('Бастапқы деректер', 'code'), codeBlock(hw.data, { title: 'data.py' }).el),
          card('', cardTitle('Күтілетін нәтиженің форматы', 'bulb'), para(hw.outputFormat))),
        h('div', null,
          card('', cardTitle('Үш қадам', 'list'), h('ol', { class: 'clean' }, hw.steps.map(function (s) { return h('li', null, s); }))),
          card('', cardTitle('Тапсыру және бағалау', 'check'), para(hw.submit), para('Бағалау: ' + hw.grading)))),
      card('', cardTitle('Өзіме белгі', 'flag'), h('ol', { class: 'tasks' }, doneLi)),
      errorBox('info', 'Дайын шешім жоқ', 'Үй жұмысының дайын жауабы сайтта көрсетілмейді. Тапсырманы өзіңіз орындап, .py файлын, нәтижесін және қолданған әдісіңіз туралы 2–3 сөйлемді тапсырыңыз.'));
    return wrap;
  }

  /* ═════════════════════ ҚОРЫТЫНДЫ ЖӘНЕ ӨЗІН-ӨЗІ БАҒАЛАУ ═════════════════════ */

  function progressSummary(lesson, totalSlides) {
    var lid = lesson.id;
    var vis = Object.keys(progress.visited[lid] || {}).length;
    var marks = progress.quiz[lid] || {};
    var ok = 0, again = 0;
    Object.keys(marks).forEach(function (k) { if (marks[k] === 'ok') ok++; else if (marks[k] === 'again') again++; });
    var sc = progress.selfcheck[lid] || {};
    var scVals = Object.keys(sc).map(function (k) { return sc[k]; });
    var selfTotal = lesson.summary.self.length;
    function stat(label, val, total, cls) {
      var pct = total ? Math.round(val / total * 100) : 0;
      return h('div', { class: 'stat' }, h('div', { class: 'stat-t' }, h('span', null, label), h('b', null, val + ' / ' + total)),
        h('div', { class: 'bar' + (cls ? ' ' + cls : '') }, h('i', { style: { width: pct + '%' } })));
    }
    var varRows = lesson.variants.map(function (v) {
      var c = tasksDone(lid, v.n);
      return h('tr', null, h('th', { scope: 'row' }, v.n + '-нұсқа'), h('td', null, v.title), h('td', null, c + ' / 5'));
    });
    return h('div', { class: 'progress-sum' },
      stat('Қаралған экрандар', vis, totalSlides),
      stat('Бекіту: «Түсіндім»', ok, 6, 'bar-ok'),
      h('div', { class: 'muted small-note' }, 'Қайталау керек деп белгіленген сұрақтар: ' + again + '.'),
      stat('Өзін-өзі бағалау: «Түсіндім»', scVals.filter(function (x) { return x === 2; }).length, selfTotal, 'bar-ok'),
      h('details', { class: 'det' }, h('summary', null, 'Нұсқалар бойынша орындалған тапсырмалар'),
        h('div', { class: 'tbl-wrap' }, h('table', { class: 'tbl tbl-sm' }, h('tbody', null, varRows)))));
  }

  function summarySlide(lesson) {
    var sm = lesson.summary;
    return h('div', { class: 'summary' },
      h('ol', { class: 'points' }, sm.points.map(function (p, i) { return h('li', { class: 'point' }, h('span', { class: 'point-n' }, String(i + 1)), h('span', null, p)); })),
      card('bridge', cardTitle(lesson.id === 'strings' ? 'Келесі сабаққа көпір' : 'Салыстыру', 'arrow'), para(sm.bridge)));
  }

  function selfAssessSlide(lesson, ctx, totalSlides, onClear) {
    var lid = lesson.id, sc = pget('selfcheck', lid);
    var LEVELS = [{ v: 2, t: 'Түсіндім' }, { v: 1, t: 'Жартылай' }, { v: 0, t: 'Қайталау керек' }];
    var recHost = h('div', { class: 'rec' });
    function paintRec() {
      clear(recHost);
      var weak = lesson.summary.self.filter(function (s, i) { return sc[i] === 0 || sc[i] === 1; });
      if (weak.length) recHost.append(h('div', { class: 'card-title' }, 'Қайталауға ұсыныс'), h('ul', { class: 'clean' }, weak.map(function (w) { return h('li', null, w); })));
    }
    var rows = lesson.summary.self.map(function (stmt, i) {
      var seg = h('div', { class: 'seg', role: 'group', 'aria-label': stmt });
      LEVELS.forEach(function (L) {
        var b = h('button', { type: 'button', class: 'seg-btn lv-' + L.v, 'aria-pressed': String(sc[i] === L.v), onClick: function () {
          if (sc[i] === L.v) delete sc[i]; else sc[i] = L.v;
          saveProgress();
          $$('button', seg).forEach(function (x, k) { x.setAttribute('aria-pressed', String(sc[i] === LEVELS[k].v)); });
          paintRec();
        } }, L.t);
        seg.appendChild(b);
      });
      return h('li', { class: 'self-row' }, h('div', { class: 'self-t' }, stmt), seg);
    });
    paintRec();
    return h('div', { class: 'selfassess' },
      h('ol', { class: 'self-list' }, rows),
      recHost,
      card('', cardTitle('Менің прогресім', 'flag'), progressSummary(lesson, totalSlides),
        h('div', { class: 'btn-row' }, btn('Прогресті тазалау', { kind: 'danger', icon: 'trash', onClick: onClear }))));
  }

  /* ═════════════════════ СЛАЙДТАР ҚҰРЫЛЫМЫ ═════════════════════ */

  var SECTIONS = [
    { n: 1, short: 'Түсіндіру', full: 'Түсіндіру және анықтамалар' },
    { n: 2, short: 'Мысалдар', full: 'Үш практикалық мысал' },
    { n: 3, short: 'Бекіту', full: 'Бекіту сұрақтары' },
    { n: 4, short: 'Практика', full: 'Практикалық жұмыс: 8 нұсқа' },
    { n: 5, short: 'Үй жұмысы', full: 'Үй жұмысы: таңдалған нұсқаға сәйкес' },
    { n: 6, short: 'Қорытынды', full: 'Қорытынды және өзін-өзі бағалау' }
  ];
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function sent(s) { s = cap(String(s || '').trim()); return /[.!?]$/.test(s) ? s : s + '.'; }

  function cellStrip(text) {
    var chars = cps(text), n = chars.length;
    return h('div', { class: 'cells cells-static', role: 'img', 'aria-label': 'Жол таңбалары индекстерімен: ' + text },
      chars.map(function (ch, i) {
        return h('div', { class: 'cell' }, h('span', { class: 'ix ix-pos' }, String(i)), h('span', { class: 'ch' }, showChar(ch)), h('span', { class: 'ix ix-neg' }, '−' + (n - i)));
      }));
  }
  function listStrip(items) {
    var n = items.length;
    return h('div', { class: 'lstage lstage-static', role: 'img', 'aria-label': 'Тізім элементтері индекстерімен' },
      items.map(function (v, i) {
        return h('div', { class: 'lcard' }, h('span', { class: 'ix ix-pos' }, String(i)), h('div', { class: 'lv ' + (typeof v === 'number' ? 'lv-int' : 'lv-str') }, typeof v === 'number' ? String(v) : pyRepr(v)), h('span', { class: 'ix ix-neg' }, '−' + (n - i)));
      }));
  }
  function colorizeYesNo(tbl) {
    $$('td', tbl).forEach(function (td) {
      var t = td.textContent.trim();
      if (t === 'Болады') td.classList.add('yes');
      else if (t === 'Болмайды') td.classList.add('no');
      else if (t === 'Бар') td.classList.add('has');
    });
    return tbl;
  }

  function buildSlides(L) {
    var lid = L.id, list = [];
    function add(section, id, title, render) { list.push({ id: id, section: section, title: title, render: render }); }

    /* 1 · Түсіндіру */
    if (lid === 'lists') {
      add(1, 'bridge', 'Көпір: жолдан тізімге', function (host) {
        var T = { head: ['Түсінік', 'Жолда (1-сабақ)', 'Тізімде (2-сабақ)'], rows: [
          ['Индекс', 'text[0], text[-1]', 'items[0], items[-1]'],
          ['Кесінді', 'text[1:4]', 'items[1:4]'],
          ['Цикл', 'for ch in text:', 'for item in items:'],
          ['Өзгерту', 'text[0] = "J"  → TypeError', 'items[0] = "J"  → болады']] };
        host.append(card('', h('p', { class: 'lead' }, 'Жолдағы индекс, кесінді және цикл ұғымдары тізімдерді түсінуге негіз болады: тізімде олар дәл солай жұмыс істейді.'),
          mkTable(T, { rowHeader: true, codeCols: [1, 2], cls: 'tbl-bridge' }),
          para('Негізгі айырмасы: жол өзгермейді, ал тізімнің элементтерін өзгертуге, қосуға және өшіруге болады.')));
        host.appendChild(h('div', { class: 'two-col' }, card('', h('div', { class: 'tag' }, 'Жол'), cellStrip('Python')), card('', h('div', { class: 'tag tag-accent' }, 'Тізім'), listStrip(['Аян', 'Дана', 'Әли']))));
      });
    }

    if (lid === 'strings') {
      add(1, 'def', 'Жол дегеніміз не?', function (host) {
        host.append(card('', h('p', { class: 'lead' }, L.definition.text), codeBlock(L.definition.code).el, para(L.definition.note)),
          card('', cardTitle('Көрнекі мысал: «Python» жолы', 'eye'), cellStrip('Python'), para('Әр таңбаның екі индексі бар: оң (0-ден) және теріс (соңынан, −1-ден).', 'small-note')));
      });
      add(1, 'ops1', 'Жол амалдары (1/2)', function (host) { host.appendChild(mkTable(L.opsTable, { rows: L.opsTable.rows.slice(0, 5), codeCols: [1], rowHeader: true })); });
      add(1, 'ops2', 'Жол амалдары (2/2)', function (host) {
        host.appendChild(mkTable(L.opsTable, { rows: L.opsTable.rows.slice(5), codeCols: [1], rowHeader: true }));
        host.appendChild(card('callout', cardTitle('Келесі сабаққа негіз', 'arrow'), para('Индекс, кесінді және цикл — тізімдерде де қолданылады. Бұл амалдарды жолда жақсы түсінсеңіз, тізім сабағы жеңіл өтеді.')));
      });
      add(1, 'index-lab', 'Индекстер зертханасы', function (host) { host.appendChild(indexLab()); });
      add(1, 'slice-lab', 'Тілімдеу зертханасы', function (host) { host.appendChild(sliceLab()); });
      add(1, 'methods', 'Жол әдістері', function (host) { host.appendChild(methodsDemo()); });
      add(1, 'immutable', 'Өзгермейтіндік', function (host) { host.appendChild(immutableDemo(L)); });
    } else {
      add(1, 'def', 'Тізім дегеніміз не?', function (host) {
        host.append(card('', h('p', { class: 'lead' }, L.definition.text), codeBlock(L.definition.code).el),
          card('', cardTitle('Көрнекі мысал: students тізімі', 'eye'), listStrip(['Аян', 'Дана', 'Әли'])));
      });
      add(1, 'compare', 'Жол, кортеж және тізім', function (host) {
        var t = mkTable(L.compareTable, { rowHeader: true });
        colorizeYesNo(t);
        host.append(t, card('', codeBlock(L.definition.code2).el, para(L.definition.note)));
      });
      add(1, 'methods1', 'Тізім әдістері (1/2)', function (host) { host.appendChild(mkTable(L.methodsTable, { rows: L.methodsTable.rows.slice(0, 5), codeCols: [0], rowHeader: true })); });
      add(1, 'methods2', 'Тізім әдістері (2/2)', function (host) {
        host.append(mkTable(L.methodsTable, { rows: L.methodsTable.rows.slice(5), codeCols: [0], rowHeader: true }),
          card('callout', para(L.methodsNote.text), codeBlock(L.methodsNote.code).el));
      });
      add(1, 'list-lab', 'Тізім зертханасы', function (host) { host.appendChild(listLab()); });
      add(1, 'copy', 'Көшіру демонстрациясы', function (host) { host.appendChild(copyDemo()); });
      add(1, 'split', 'Жолдан тізімге', function (host) { host.appendChild(splitDemo()); });
    }

    /* 2 · Мысалдар */
    L.examples.forEach(function (ex) {
      var pre = 'ex' + ex.n;
      var title = ex.n + '-мысал: ' + ex.title;
      add(2, pre + '-case', title, function (host) {
        host.append(h('div', { class: 'two-col' },
          h('div', null,
            card('', cardTitle('1 · Өмірлік жағдай', 'user'), para(ex.docSituation || ex.context)),
            card('', cardTitle('2 · Есептің мақсаты', 'flag'), para(ex.goal))),
          card('', cardTitle('3 · Бастапқы деректер', 'code'), codeBlock(ex.dataLines, { title: 'data.py', copy: false }).el, para(ex.dataNote))));
      });
      add(2, pre + '-code', title, function (host, ctx) {
        host.append(h('div', { class: 'predict' }, h('span', { class: 'tag tag-accent' }, '4 · Нәтижесі қандай болады?'), h('span', null, ex.question)),
          exampleRunner(ex, ctx));
      });
      add(2, pre + '-analysis', title, function (host, ctx) {
        var rev = makeReveal(ctx, 'Жауапты көрсету', 'Жауапты жасыру', h('div', null, h('b', null, 'Жауап: '), ex.follow.a));
        host.append(
          card('', cardTitle('7 · Нәтиже', 'code'), h('pre', { class: 'console-body console-static' }, ex.output.join('\n'))),
          card('', cardTitle('Талдау', 'bulb'), para(ex.docAnalysis)),
          card('', cardTitle('8 · Қысқа талдау сұрағы', 'help'), para(ex.follow.q), h('div', { class: 'btn-row' }, rev.button), rev.box));
      });
    });

    /* 3 · Бекіту сұрақтары */
    L.quiz.forEach(function (q) {
      add(3, 'q' + q.n, 'Бекіту: ' + q.n + '-сұрақ', function (host, ctx) { host.appendChild(quizCard(L, q, ctx)); });
    });

    /* 4 · Практикалық жұмыс */
    var introEl = function () { return h('div', { class: 'small-note vintro-note' }, L.practiceIntro.join(' ')); };
    add(4, 'v-pick', 'Нұсқаны таңдау', function (host, ctx) {
      host.append(introEl(), variantPicker(L, ctx, function (id) { ctx.nav(id); }));
    });
    add(4, 'v-data', 'Нұсқа: деректер мен талаптар', function (host, ctx) {
      host.appendChild(variantDataView(L, ctx, ctx.nav, ctx.rerender));
    });
    add(4, 'v-tasks', 'Нұсқа: бес тапсырма', function (host, ctx) {
      host.appendChild(variantTasksView(L, ctx, ctx.nav, ctx.rerender));
    });

    /* 5 · Үй жұмысы */
    add(5, 'hw', 'Үй жұмысы', function (host, ctx) {
      host.appendChild(homeworkView(L, ctx));
    });

    /* 6 · Қорытынды */
    add(6, 'summary', 'Қорытынды', function (host) { host.appendChild(summarySlide(L)); });
    add(6, 'self', 'Өзін-өзі бағалау', function (host, ctx) {
      host.appendChild(selfAssessSlide(L, ctx, list.length, function () { clearProgressFlow(); }));
      var next = h('div', { class: 'btn-row end-row' });
      if (lid === 'strings') next.appendChild(btn('2-сабаққа өту: Тізімдер', { kind: 'primary', icon: 'next', onClick: function () { openLesson('lists', null); } }));
      next.appendChild(btn('Басты бет', { kind: 'ghost', icon: 'home', onClick: function () { goHome(); } }));
      host.appendChild(next);
    });
    return list;
  }

  /* ═════════════════════ ҚОЛДАНБА КҮЙІ ═════════════════════ */

  var S = { lessonId: null, slides: [], idx: 0, ctx: null, focus: false };
  var CACHE = {};
  function slidesFor(lid) { if (!CACHE[lid]) CACHE[lid] = buildSlides(lessonById(lid)); return CACHE[lid]; }
  function slideIndexById(slides, id) { for (var i = 0; i < slides.length; i++) if (slides[i].id === id) return i; return -1; }
  function currentLesson() { return S.lessonId ? lessonById(S.lessonId) : null; }

  /* ───────── Баптаулар (тақырып, қаріп, көрініс) ───────── */
  function applySettings() {
    var b = document.body;
    b.dataset.theme = settings.theme;
    document.documentElement.dataset.theme = settings.theme;
    b.dataset.view = settings.view;
    document.documentElement.style.setProperty('--scale', String(FONT_STEPS[settings.fontStep]));
    var set = function (sel, fn) { $$(sel).forEach(fn); };
    set('#btn-view', function (el) { el.setAttribute('aria-pressed', String(settings.view === 'present')); });
    set('#btn-theme', function (el) { var p = el.querySelector('path'); if (p) p.setAttribute('d', ICONS[settings.theme === 'dark' ? 'sun' : 'moon']); el.setAttribute('aria-label', settings.theme === 'dark' ? 'Жарық режимге ауысу' : 'Қараңғы режимге ауысу'); el.title = el.getAttribute('aria-label'); });
    set('#btn-font-minus', function (el) { el.disabled = settings.fontStep <= 0; });
    set('#btn-font-plus', function (el) { el.disabled = settings.fontStep >= FONT_STEPS.length - 1; });
    var fl = $('#font-level'); if (fl) fl.textContent = Math.round(FONT_STEPS[settings.fontStep] * 100) + '%';
  }
  function toggleView() { settings.view = settings.view === 'present' ? 'study' : 'present'; saveSettings(); applySettings(); }
  function toggleTheme() { settings.theme = settings.theme === 'dark' ? 'light' : 'dark'; saveSettings(); applySettings(); }
  function changeFont(d) { settings.fontStep = clamp(settings.fontStep + d, 0, FONT_STEPS.length - 1); saveSettings(); applySettings(); }

  function isFs() { return !!(document.fullscreenElement || document.webkitFullscreenElement); }
  function toggleFs() {
    var el = document.documentElement;
    try {
      if (isFs()) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); }
      else {
        var fn = el.requestFullscreen || el.webkitRequestFullscreen;
        if (!fn) { toast('Бұл браузер толық экранды қолдамайды', 'warn'); return; }
        var p = fn.call(el);
        if (p && p.catch) p.catch(function () { toast('Толық экранға өту мүмкін болмады', 'warn'); });
      }
    } catch (e) { toast('Толық экранға өту мүмкін болмады', 'warn'); }
  }
  function syncFs() {
    var b = $('#btn-fs'); if (!b) return;
    var p = b.querySelector('path'); if (p) p.setAttribute('d', ICONS[isFs() ? 'exitfs' : 'fullscreen']);
    b.setAttribute('aria-label', isFs() ? 'Толық экраннан шығу (Esc)' : 'Толық экран (F)'); b.title = b.getAttribute('aria-label');
    b.setAttribute('aria-pressed', String(isFs()));
  }
  function setFocus(on) {
    S.focus = !!on;
    document.body.classList.toggle('focus-mode', S.focus);
    var b = $('#btn-focus'); if (b) b.setAttribute('aria-pressed', String(S.focus));
    if (S.focus) toast('Фокус режимі: H немесе Esc — шығу');
  }

  /* ───────── Бөлімдер навигациясы мен төменгі панель ───────── */
  function buildSectionNav() {
    var nav = $('#sections'); clear(nav);
    var lesson = currentLesson();
    if (!lesson) return;
    var cur = S.slides[S.idx] ? S.slides[S.idx].section : 0;
    SECTIONS.forEach(function (sec) {
      var idx = -1;
      for (var i = 0; i < S.slides.length; i++) if (S.slides[i].section === sec.n) { idx = i; break; }
      nav.appendChild(h('button', {
        type: 'button', class: 'sec-chip' + (cur === sec.n ? ' is-cur' : ''), 'aria-current': cur === sec.n ? 'step' : null,
        title: sec.full + ' (' + sec.n + ')', onClick: function () { showSlide(idx, 1); }
      }, h('span', { class: 'sec-n' }, String(sec.n)), h('span', { class: 'sec-t' }, sec.short)));
    });
    $$('.lesson-tab').forEach(function (t) { t.setAttribute('aria-current', t.dataset.lesson === S.lessonId ? 'page' : 'false'); t.classList.toggle('is-cur', t.dataset.lesson === S.lessonId); });
  }
  function updateFooter() {
    var total = S.slides.length;
    var c = $('#counter'); var pb = $('#progress-fill'); var pr = $('#btn-prev'), nx = $('#btn-next');
    if (!total || !c) return;
    var sl = S.slides[S.idx];
    c.textContent = 'Экран ' + (S.idx + 1) + ' / ' + total;
    var sec = SECTIONS[sl.section - 1];
    var sc = $('#counter-sec'); if (sc) sc.textContent = 'Бөлім ' + sec.n + ': ' + sec.short;
    pb.style.width = ((S.idx + 1) / total * 100) + '%';
    $('#progress').setAttribute('aria-valuenow', String(S.idx + 1)); $('#progress').setAttribute('aria-valuemax', String(total));
    pr.disabled = S.idx === 0; nx.disabled = S.idx === total - 1;
  }

  /* ───────── Слайд көрсету ───────── */
  var lastDir = 1;
  function showSlide(idx, dir) {
    if (!S.slides.length) return;
    idx = clamp(idx, 0, S.slides.length - 1);
    if (S.ctx) { S.ctx.cleanups.forEach(function (f) { try { f(); } catch (e) { /* ignore */ } }); }
    var slide = S.slides[idx];
    var lesson = currentLesson();
    S.idx = idx; lastDir = dir || (idx >= S.idx ? 1 : -1);
    var ctx = {
      lesson: lesson, answers: [], cleanups: [], stepKey: null,
      nav: function (id) { var k = slideIndexById(S.slides, id); if (k >= 0) showSlide(k, 1); },
      rerender: function () { showSlide(S.idx, 0, true); }
    };
    S.ctx = ctx;
    var host = $('#slide-host');
    clear(host);
    var sec = SECTIONS[slide.section - 1];
    var body = h('div', { class: 'slide-body' });
    var el = h('section', { class: 'slide enter', 'aria-labelledby': 'slide-title', dataset: { slide: slide.id, dir: String(dir || 0) } },
      h('header', { class: 'slide-head' },
        h('div', { class: 'eyebrow' }, lesson.num + '-сабақ: ' + lesson.title + '  ·  ' + sec.n + '. ' + sec.full),
        h('h1', { id: 'slide-title', tabindex: '-1' }, slide.title)),
      body);
    host.appendChild(el);
    try { slide.render(body, ctx); }
    catch (err) {
      if (window.console && console.error) console.error(err);
      body.appendChild(errorBox('err', 'Бұл экранды көрсету мүмкін болмады', 'Бетті қайта жүктеп көріңіз.'));
    }
    $('#stage').scrollTop = 0;
    pget('visited', lesson.id)[slide.id] = 1;
    progress.last = { lesson: lesson.id, slide: slide.id };
    saveProgress();
    buildSectionNav(); updateFooter(); writeHash(); updateAnswersBtn();
    document.title = slide.title + ' — ' + lesson.num + '-сабақ: ' + lesson.title + ' · ' + DATA.meta.title;
  }
  function next() { if (S.idx < S.slides.length - 1) showSlide(S.idx + 1, 1); }
  function prev() { if (S.idx > 0) showSlide(S.idx - 1, -1); }
  function jumpSection(n) {
    for (var i = 0; i < S.slides.length; i++) if (S.slides[i].section === n) { showSlide(i, i > S.idx ? 1 : -1); return; }
  }
  function toggleAnswers() {
    if (!S.ctx || !S.ctx.answers.length) { toast('Бұл экранда жасырылған жауап жоқ'); return; }
    var any = S.ctx.answers.some(function (a) { return !a.shown; });
    S.ctx.answers.forEach(function (a) { a.set(any); });
    updateAnswersBtn();
  }
  function updateAnswersBtn() {
    var b = $('#btn-answers'); if (!b) return;
    var has = S.ctx && S.ctx.answers.length > 0;
    b.disabled = !has;
    var any = has && S.ctx.answers.some(function (a) { return !a.shown; });
    clear(b); b.appendChild(icon(any || !has ? 'eye' : 'eyeoff')); b.appendChild(h('span', { class: 'btn-txt' }, any || !has ? 'Жауаптарды ашу' : 'Жауаптарды жасыру'));
  }
  document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('.reveal-btn, .answer')) setTimeout(updateAnswersBtn, 0); });

  /* ───────── Хэш арқылы тікелей сілтеме ───────── */
  function writeHash() {
    var l = currentLesson(); if (!l) return;
    var s = S.slides[S.idx];
    var h2 = '#l=' + l.id + '&s=' + s.id;
    if (s.id.indexOf('v-') === 0 && selVariantNum(l.id)) h2 += '&v=' + selVariantNum(l.id);
    try { window.history.replaceState(null, '', h2); } catch (e) { /* file:// кейбір браузерлерде */ }
  }
  function parseHash() {
    var raw = String(window.location.hash || '').replace(/^#/, '');
    if (!raw) return null;
    var o = {};
    raw.split('&').forEach(function (p) { var kv = p.split('='); if (kv[0]) o[kv[0]] = decodeURIComponent(kv[1] || ''); });
    if (!o.l || !lessonById(o.l)) return null;
    return o;
  }
  function routeFromHash() {
    var o = parseHash();
    if (!o) return false;
    var v = parseInt(o.v, 10);
    if (v >= 1 && v <= 8) setVariantNum(o.l, v);
    openLesson(o.l, o.s || (v ? 'v-data' : null), true);
    return true;
  }

  /* ───────── Сабақты ашу, басты бет ───────── */
  function openLesson(lid, slideId, silent) {
    S.lessonId = lid;
    S.slides = slidesFor(lid);
    document.body.dataset.screen = 'lesson';
    $('#home').hidden = true; $('#stage').hidden = false; $('#bottombar').hidden = false;
    var idx = slideId ? slideIndexById(S.slides, slideId) : 0;
    showSlide(idx < 0 ? 0 : idx, 0);
    var h1 = $('#slide-title'); if (h1 && !silent) { try { h1.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
  }
  function goHome() {
    if (S.ctx) S.ctx.cleanups.forEach(function (f) { try { f(); } catch (e) { /* ignore */ } });
    S.ctx = null; S.lessonId = null; S.slides = [];
    setFocus(false);
    document.body.dataset.screen = 'home';
    $('#home').hidden = false; $('#stage').hidden = true; $('#bottombar').hidden = true;
    renderHome();
    try { window.history.replaceState(null, '', window.location.pathname + window.location.search); } catch (e) { /* ignore */ }
    document.title = DATA.meta.title;
    clear($('#sections'));
    $$('.lesson-tab').forEach(function (t) { t.setAttribute('aria-current', 'false'); t.classList.remove('is-cur'); });
  }
  function clearProgressFlow() {
    confirmModal('Прогресті тазалау', 'Барлық прогресс (қаралған экрандар, сұрақ белгілері, орындалған тапсырмалар, өзін-өзі бағалау, таңдалған нұсқалар) жойылады. Тақырып пен қаріп өлшемі сақталады. Жалғастырасыз ба?', 'Иә, тазалау').then(function (ok) {
      if (!ok) return;
      progress = { last: null, visited: {}, quiz: {}, tasks: {}, selfcheck: {}, variant: {}, hw: {} };
      saveProgressNow();
      toast('Прогресс тазартылды');
      if (S.lessonId) { var id = S.slides[S.idx].id; var l = S.lessonId; CACHE = {}; openLesson(l, id, true); } else renderHome();
    });
  }

  function renderHome() {
    var host = $('#home'); clear(host);
    var lessons = DATA.lessons;
    var cont = progress.last && lessonById(progress.last.lesson) ? progress.last : null;
    var cards = lessons.map(function (L) {
      var total = slidesFor(L.id).length;
      var vis = Object.keys(progress.visited[L.id] || {}).length;
      var pct = Math.round(vis / total * 100);
      return h('article', { class: 'lesson-card lc-' + L.num },
        h('div', { class: 'lc-num' }, String(L.num)),
        h('h2', null, L.num + '-сабақ: ' + L.title),
        h('p', { class: 'lc-goal' }, sent(L.goal)),
        h('div', { class: 'lc-meta' }, h('span', { class: 'badge' }, '50 минут'), h('span', { class: 'badge' }, total + ' экран'), h('span', { class: 'badge' }, '8 нұсқа × 5 тапсырма')),
        h('div', { class: 'bar', title: 'Қаралған: ' + pct + '%' }, h('i', { style: { width: pct + '%' } })),
        h('div', { class: 'small-note' }, vis ? 'Қаралған экрандар: ' + vis + ' / ' + total : 'Әлі басталған жоқ'),
        btn(L.num + '-сабақ: ' + L.title, { kind: L.num === 1 ? 'accent' : 'primary', icon: 'next', onClick: function () { openLesson(L.id, null); } }));
    });
    host.append(
      h('div', { class: 'hero' },
        h('div', { class: 'hero-eyebrow' }, 'Интерактивті сабақ жинағы · 2 курс'),
        h('h1', null, DATA.meta.title),
        h('p', { class: 'hero-sub' }, 'Алдымен жолдар, содан кейін тізімдер: мәтінді индекс пен кесінді арқылы өңдеуден бастап, тізімді өзгертуге дейін. Әр сабақ — 50 минут.'),
        h('div', { class: 'hero-actions' },
          btn('Сабақты бастау', { kind: 'primary', icon: 'play', cls: 'btn-xl', onClick: function () { openLesson('strings', null); } }),
          cont ? btn('Жалғастыру', { kind: 'accent', icon: 'next', cls: 'btn-xl', onClick: function () { openLesson(cont.lesson, cont.slide); } }) : null)),
      h('div', { class: 'lesson-cards' }, cards),
      h('div', { class: 'home-foot' },
        h('div', { class: 'small-note' }, DATA.meta.source),
        h('div', { class: 'small-note' }, store.ok() ? 'Прогресс, тақырып және қаріп өлшемі осы браузерде сақталады.' : 'Браузер сақтауға рұқсат бермейді: прогресс тек осы бет ашық тұрғанда сақталады.'),
        h('div', { class: 'btn-row' }, btn('Прогресті тазалау', { kind: 'ghost', icon: 'trash', onClick: clearProgressFlow }), btn('Пернелер және көмек', { kind: 'ghost', icon: 'help', onClick: openHelp }))));
  }

  /* ───────── Мазмұн (outline) және көмек ───────── */
  function openOutline() {
    var l = currentLesson(); if (!l) return;
    var body = h('div', { class: 'outline' }, SECTIONS.map(function (sec) {
      var items = S.slides.map(function (s, i) { return { s: s, i: i }; }).filter(function (x) { return x.s.section === sec.n; });
      return h('div', { class: 'outline-sec' }, h('div', { class: 'outline-h' }, sec.n + '. ' + sec.full),
        h('div', { class: 'outline-items' }, items.map(function (x) {
          var seen = (progress.visited[l.id] || {})[x.s.id];
          return h('button', { type: 'button', class: 'outline-it' + (x.i === S.idx ? ' is-cur' : '') + (seen ? ' is-seen' : ''), 'aria-current': x.i === S.idx ? 'true' : null,
            onClick: function () { api.close(); showSlide(x.i, x.i > S.idx ? 1 : -1); } }, h('span', { class: 'o-n' }, String(x.i + 1)), h('span', null, x.s.title));
        })));
    }));
    var api = openModal({ title: 'Мазмұны: ' + l.num + '-сабақ', body: body, wide: true, actions: [{ label: 'Жабу', kind: 'ghost' }] });
  }
  function openHelp() {
    var keys = [
      ['← / →', 'Алдыңғы / келесі экран'], ['Home / End', 'Бірінші / соңғы экран'], ['1 … 6', 'Бөлімге жылдам өту'], ['F', 'Толық экран (Esc — шығу)'],
      ['H', 'Фокус режимі: артық навигацияны жасыру'], ['A', 'Осы экрандағы жауаптарды ашу / жасыру'],
      ['S', 'Мысалда: келесі қадам (Shift+S — алдыңғы)'], ['+ / −', 'Мәтін өлшемін үлкейту / кішірейту'], ['?', 'Осы анықтама'], ['Esc', 'Терезені жабу / фокус режимінен шығу']
    ];
    var body = h('div', null,
      h('div', { class: 'tbl-wrap' }, h('table', { class: 'tbl tbl-sm' }, h('tbody', null, keys.map(function (k) { return h('tr', null, h('th', { scope: 'row' }, h('kbd', null, k[0])), h('td', null, k[1])); })))),
      h('p', { class: 'small-note' }, 'Мәтін енгізу өрісінде не таңдау тізімінде тұрғанда пернелер экранды ауыстырмайды.'),
      h('p', { class: 'small-note' }, 'Қадамдық демонстрация — алдын ала дайындалған қадамдар; бұл сайт Python кодын орындамайды. Зертханалар Python-ның индекстеу, тілімдеу және тізім әдістерінің мінез-құлқын қарапайым түрде көрсетеді.'));
    openModal({ title: 'Пернелер және көмек', body: body, actions: [{ label: 'Түсінікті', kind: 'primary' }] });
  }

  /* ───────── Бет құрылымы (header / footer) ───────── */
  function ibtn(name, label, onClick, id, extra) {
    return h('button', { type: 'button', class: 'icon-btn' + (extra ? ' ' + extra : ''), id: id || null, 'aria-label': label, title: label, onClick: onClick }, icon(name));
  }
  function buildChrome() {
    var top = $('#topbar'); clear(top);
    var tabs = DATA.lessons.map(function (L) {
      return h('button', { type: 'button', class: 'lesson-tab lesson-only', dataset: { lesson: L.id }, 'aria-current': 'false', onClick: function () {
        if (S.lessonId === L.id) return;
        var last = progress.last && progress.last.lesson === L.id ? progress.last.slide : null;
        openLesson(L.id, last);
      } }, L.num + '-сабақ: ' + L.title);
    });
    var row1 = h('div', { class: 'top-row' },
      h('button', { type: 'button', class: 'brand', 'aria-label': 'Басты бет', onClick: goHome }, h('span', { class: 'brand-mark', 'aria-hidden': 'true' }, icon('code')), h('span', { class: 'brand-t' }, 'Python · Жолдар мен тізімдер')),
      h('div', { class: 'tabs' }, tabs),
      h('div', { class: 'top-actions' },
        h('button', { type: 'button', class: 'btn btn-ghost btn-sm lesson-only', id: 'btn-view', 'aria-pressed': 'false', title: 'Үлкен мәтін режимі', onClick: toggleView }, icon('focus'), h('span', { class: 'btn-txt' }, 'Үлкен мәтін')),
        h('div', { class: 'font-ctl', role: 'group', 'aria-label': 'Мәтін өлшемі' },
          h('button', { type: 'button', class: 'icon-btn', id: 'btn-font-minus', 'aria-label': 'Мәтінді кішірейту', title: 'Мәтінді кішірейту (−)', onClick: function () { changeFont(-1); } }, icon('minus')),
          h('span', { id: 'font-level', class: 'font-level', 'aria-live': 'polite' }, '100%'),
          h('button', { type: 'button', class: 'icon-btn', id: 'btn-font-plus', 'aria-label': 'Мәтінді үлкейту', title: 'Мәтінді үлкейту (+)', onClick: function () { changeFont(1); } }, icon('plus'))),
        ibtn('sun', 'Тақырыпты ауыстыру', toggleTheme, 'btn-theme'),
        ibtn('focus', 'Фокус режимі (H)', function () { setFocus(!S.focus); }, 'btn-focus', 'lesson-only'),
        (document.fullscreenEnabled || document.webkitFullscreenEnabled) ? ibtn('fullscreen', 'Толық экран (F)', toggleFs, 'btn-fs', 'lesson-only') : null,
        ibtn('list', 'Мазмұны: экранға тікелей өту', openOutline, 'btn-outline', 'lesson-only'),
        ibtn('help', 'Пернелер және көмек (?)', openHelp, 'btn-help')));
    top.append(row1, h('nav', { id: 'sections', class: 'sections lesson-only', 'aria-label': 'Сабақ бөлімдері' }));
    // Төменгі панель
    var bb = $('#bottombar'); clear(bb);
    bb.append(
      h('div', { id: 'progress', class: 'progress', role: 'progressbar', 'aria-label': 'Сабақ прогресі', 'aria-valuemin': '1', 'aria-valuenow': '1', 'aria-valuemax': '1' }, h('i', { id: 'progress-fill' })),
      h('div', { class: 'bb-row' },
        h('button', { type: 'button', class: 'btn btn-ghost nav-btn', id: 'btn-prev', 'aria-label': 'Алдыңғы экран', onClick: prev }, icon('prev'), h('span', { class: 'btn-txt' }, 'Алдыңғы')),
        h('div', { class: 'bb-mid' }, h('span', { id: 'counter', class: 'counter', 'aria-live': 'polite' }, ''), h('span', { id: 'counter-sec', class: 'counter-sec' }, '')),
        h('button', { type: 'button', class: 'btn btn-ghost', id: 'btn-answers', onClick: toggleAnswers }, icon('eye'), h('span', { class: 'btn-txt' }, 'Жауаптарды ашу')),
        h('button', { type: 'button', class: 'btn btn-primary nav-btn', id: 'btn-next', 'aria-label': 'Келесі экран', onClick: next }, h('span', { class: 'btn-txt' }, 'Келесі'), icon('next'))));
    // Фокус режимі: шағын басқару
    var fc = $('#focus-cluster'); clear(fc);
    fc.append(
      ibtn('prev', 'Алдыңғы экран', prev), ibtn('next', 'Келесі экран', next), ibtn('close', 'Фокус режимінен шығу', function () { setFocus(false); }));
  }

  /* ───────── Пернетақта ───────── */
  function isTyping(t) {
    if (!t || !t.tagName) return false;
    var tag = t.tagName;
    if (tag === 'TEXTAREA' || tag === 'SELECT') return true;
    if (t.isContentEditable) return true;
    if (tag === 'INPUT') { var ty = (t.type || 'text').toLowerCase(); return ['checkbox', 'radio', 'button', 'submit', 'reset', 'range'].indexOf(ty) < 0; }
    return false;
  }
  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented) return;
    if (e.key === 'Escape') {
      if (modalStack.length) { modalStack[modalStack.length - 1].close(); e.preventDefault(); return; }
      if (S.focus && !isFs()) { setFocus(false); e.preventDefault(); }
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (isTyping(e.target) || modalStack.length) return;
    var k = e.key;
    if (k === '?' ) { openHelp(); e.preventDefault(); return; }
    if (k === '+' || k === '=') { changeFont(1); e.preventDefault(); return; }
    if (k === '-' || k === '_' || k === '−') { changeFont(-1); e.preventDefault(); return; }
    if (!S.lessonId) return;
    // көлденең айналатын код блогында бағыттауыштар код блогын айналдырады
    if ((k === 'ArrowLeft' || k === 'ArrowRight') && e.target && e.target.classList && e.target.classList.contains('code-scroll') && e.target.scrollWidth > e.target.clientWidth) return;
    switch (k) {
      case 'ArrowRight': case 'PageDown': next(); e.preventDefault(); break;
      case 'ArrowLeft': case 'PageUp': prev(); e.preventDefault(); break;
      case 'Home': showSlide(0, -1); e.preventDefault(); break;
      case 'End': showSlide(S.slides.length - 1, 1); e.preventDefault(); break;
      case 'f': case 'F': toggleFs(); e.preventDefault(); break;
      case 'h': case 'H': setFocus(!S.focus); e.preventDefault(); break;
      case 'a': case 'A': toggleAnswers(); e.preventDefault(); break;
      case 's': case 'S': if (S.ctx && S.ctx.stepKey) { S.ctx.stepKey(e.shiftKey ? -1 : 1); e.preventDefault(); } break;
      default:
        if (/^[1-6]$/.test(k)) { jumpSection(Number(k)); e.preventDefault(); }
    }
  });
  document.addEventListener('fullscreenchange', syncFs);
  document.addEventListener('webkitfullscreenchange', syncFs);
  window.addEventListener('hashchange', function () { routeFromHash(); });

  /* ───────── Іске қосу ───────── */
  function init() {
    if (settings.view === null) settings.view = 'study';
    buildChrome();
    applySettings();
    syncFs();
    document.body.dataset.screen = 'home';
    if (!routeFromHash()) goHome();
    var skeleton = $('#loading'); if (skeleton) skeleton.remove();
  }
  try { init(); }
  catch (err) {
    if (window.console && console.error) console.error(err);
    var m = document.getElementById('main');
    if (m) m.appendChild(document.createTextNode('Қолданбаны іске қосу кезінде қате болды. Бетті қайта жүктеңіз.'));
  }
})();
