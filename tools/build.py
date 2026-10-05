#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
lessons.js жасаушы.

1) source.docx (tools/extract_docx.py арқылы) ішінен сабақ мазмұнын дәл алады;
2) мысал кодтарын НАҚТЫ Python-да орындап, нәтиже мен қадамдық трассаны шығарады
   (және құжаттағы нәтижемен салыстырады — сәйкес келмесе, іске қосу тоқтайды);
3) үлгі шешімдерді орындап, шығысын жазады;
4) ../lessons.js файлын жазады.

Іске қосу:  python3 tools/build.py
Сайтты қолдану үшін бұл скрипт міндетті емес: lessons.js дайын.
"""
import ast, io, json, os, re, sys, contextlib, traceback

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')  # Windows консолінің кодтамасы қазақ әріптерін қабылдамауы мүмкін

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

import extract_docx
from authored import EXAMPLES, QUIZ, VARIANT_EXTRA, SUMMARY
from solutions import SOLUTIONS
from homework import HOMEWORK

extract_docx.main()
BLOCKS = json.load(open(os.path.join(HERE, 'source_blocks.json'), encoding='utf-8'))


# ─────────────────────────── көмекші функциялар ───────────────────────────
def die(msg):
    print('ҚАТЕ:', msg)
    sys.exit(1)


def seg_until(start, stop_pred):
    """start-тан кейінгі блоктар (stop_pred ақиқат болғанға дейін)."""
    out = []
    i = start + 1
    while i < len(BLOCKS) and not stop_pred(BLOCKS[i]):
        out.append(BLOCKS[i])
        i += 1
    return out


def find_idx(t, text_start, frm=0, quiet=False):
    for i in range(frm, len(BLOCKS)):
        b = BLOCKS[i]
        if b['t'] == t and b.get('text', '').startswith(text_start):
            return i
    if quiet:
        return None
    die(f'Блок табылмады: {t} "{text_start}"')


def is_heading(b):
    return b['t'] in ('h1', 'h2')


def strip_num(s):
    return re.sub(r'^\d+\.\s*', '', s)


def table_obj(rows):
    return {'head': rows[0], 'rows': rows[1:]}


def run_code(code):
    """Кодты орындап, (stdout, қате) қайтарады."""
    buf = io.StringIO()
    err = None
    with contextlib.redirect_stdout(buf):
        try:
            exec(compile(code, '<run>', 'exec'), {'__name__': '__main__'})
        except Exception as e:  # noqa
            err = f'{type(e).__name__}: {e}'
    return buf.getvalue(), err


def run_trace(code):
    """Әр 'line' оқиғасында айнымалылар күйін жазады (Python Tutor сияқты:
    жол орындалуға дейінгі күй). Нақты CPython settrace пайдаланылады."""
    tree = ast.parse(code)
    loops = [[n.lineno, n.end_lineno] for n in ast.walk(tree) if isinstance(n, (ast.For, ast.While))]
    compiled = compile(code, '<ex>', 'exec')
    buf = io.StringIO()
    glb = {'__name__': '__main__'}
    steps = []

    def snap(g):
        return {k: repr(v) for k, v in g.items() if not k.startswith('__')}

    def tracer(frame, event, arg):
        if frame.f_code.co_filename != '<ex>':
            return None
        if event == 'line':
            steps.append({'l': frame.f_lineno, 'v': snap(frame.f_globals), 'o': buf.getvalue().count('\n')})
        return tracer

    old = sys.stdout
    sys.stdout = buf
    sys.settrace(tracer)
    try:
        exec(compiled, glb)
    finally:
        sys.settrace(None)
        sys.stdout = old
    steps.append({'l': 0, 'v': snap(glb), 'o': buf.getvalue().count('\n')})
    out_lines = buf.getvalue().rstrip('\n').split('\n') if buf.getvalue() else []
    return steps, out_lines, loops


def code_lines(code):
    return code.split('\n')


# ─────────────────────────── жалпы мәлімет ───────────────────────────
meta = {
    'title': 'Python: Жолдар мен тізімдер',
    'docTitle': BLOCKS[0]['text'],
    'audience': BLOCKS[2]['text'],
    'order': BLOCKS[3]['text'],
    'source': BLOCKS[4]['text'],
    'collection': BLOCKS[6]['text'],
    'grading': BLOCKS[8]['text'],
    'methodics': [BLOCKS[10]['text'], BLOCKS[11]['text']],
}
assert BLOCKS[5]['text'] == 'Жинақты қолдану' and BLOCKS[9]['text'].startswith('Оқытушыға әдістемелік')


# ─────────────────────────── сабақты жинау ───────────────────────────
def build_lesson(lid, num, h1_text, quiz_h1, examples_h1_first):
    start = find_idx('h1', h1_text)
    next_lesson = len(BLOCKS)
    for i in range(start + 1, len(BLOCKS)):
        if BLOCKS[i]['t'] == 'h1' and re.match(r'^\d сабақ', BLOCKS[i]['text']):
            next_lesson = i
            break
    L = {'id': lid, 'num': num, 'title': BLOCKS[start]['text'].split(' ', 2)[2]}
    # мақсат
    goal_p = BLOCKS[start + 1]
    assert goal_p['t'] == 'p' and goal_p['text'].startswith('Мақсаты:')
    gt = goal_p['text'][len('Мақсаты:'):].strip()
    if ' Нәтиже:' in gt:
        g, r = gt.split(' Нәтиже:', 1)
        L['goal'], L['outcome'] = g.strip(), r.strip()
    else:
        L['goal'], L['outcome'] = gt, ''
    plan_tbl = BLOCKS[start + 2]
    assert plan_tbl['t'] == 'table'
    plan = []
    for r in plan_tbl['rows'][1:]:
        a, b = [int(x) for x in re.match(r'(\d+)[–-](\d+)', r[0]).groups()]
        plan.append({'time': r[0], 'from': a, 'to': b, 'stage': r[1], 'content': r[2]})
    L['plan'] = plan

    # анықтама
    di = find_idx('h2', 'Анықтама', start)
    dseg = seg_until(di, lambda b: b['t'] == 'h1')
    if lid == 'strings':
        # p, code, p, table(ops)
        assert [b['t'] for b in dseg] == ['p', 'code', 'p', 'table'], [b['t'] for b in dseg]
        L['definition'] = {'text': dseg[0]['text'], 'code': dseg[1]['text'], 'note': dseg[2]['text']}
        L['opsTable'] = table_obj(dseg[3]['rows'])
        # өзгермейтіндік
        mi = find_idx('h2', 'Таңбаны тікелей', start)
        mseg = seg_until(mi, lambda b: b['t'] in ('h1', 'h2'))
        assert [b['t'] for b in mseg] == ['code', 'p', 'code']
        L['immutable'] = {'code1': mseg[0]['text'], 'text': mseg[1]['text'], 'code2': mseg[2]['text']}
    else:
        assert [b['t'] for b in dseg] == ['p', 'code', 'table', 'code', 'p'], [b['t'] for b in dseg]
        L['definition'] = {'text': dseg[0]['text'], 'code': dseg[1]['text'], 'note': dseg[4]['text'],
                           'code2': dseg[3]['text']}
        L['compareTable'] = table_obj(dseg[2]['rows'])
        mi = find_idx('h1', 'Тізім әдістері', start)
        mseg = seg_until(mi, lambda b: b['t'] in ('h1', 'h2'))
        assert [b['t'] for b in mseg] == ['table', 'p', 'code'], [b['t'] for b in mseg]
        L['methodsTable'] = table_obj(mseg[0]['rows'])
        L['methodsNote'] = {'text': mseg[1]['text'], 'code': mseg[2]['text']}

    # мысалдар
    exs = []
    i = start
    while True:
        ei = find_idx('h2', f'{len(exs) + 1} мысал', i, quiet=True)
        if ei is None:
            break
        title = BLOCKS[ei]['text'].split(' ', 2)[2]
        seg = seg_until(ei, lambda b: b['t'] == 'h1' or (b['t'] == 'h2' and re.match(r'^\d мысал', b['text'])))
        seg = [b for b in seg if b['t'] != 'h2']  # «Күтілетін нәтиже» тақырыбын алып тастау
        n = len(exs) + 1
        ex = {'n': n, 'title': title}
        types = [b['t'] for b in seg]
        if lid == 'strings':
            if n in (1, 2):
                assert types == ['p', 'code', 'code', 'p'], types
                ex['docSituation'], ex['code'], ex['docOutput'], ex['docAnalysis'] = [b['text'] for b in seg]
            else:
                assert types == ['p', 'code', 'p'], types
                ex['docSituation'], ex['code'], ex['docResultAnalysis'] = [b['text'] for b in seg]
                ex['docOutput'] = None
                ex['docAnalysis'] = ex['docResultAnalysis'].split('Нәтиже:', 1)[1].strip()
        else:
            assert types == ['code', 'code', 'p'], types
            ex['code'], ex['docOutput'], ex['docAnalysis'] = [b['text'] for b in seg]
            ex['docSituation'] = ''
        exs.append(ex)
        i = ei
    assert len(exs) == 3, len(exs)

    # мысалдарды орындау
    for ex in exs:
        a = EXAMPLES[(lid, ex['n'])]
        steps, out_lines, loops = run_trace(ex['code'])
        ex['output'] = out_lines
        if ex['docOutput'] is not None:
            if '\n'.join(out_lines) != ex['docOutput'].strip():
                die(f'{lid} мысал {ex["n"]}: нәтиже құжатпен сәйкес емес:\n{out_lines}\n---\n{ex["docOutput"]}')
        else:
            # 3-мысал (жолдар): құжатта нәтиже сөйлем ретінде берілген
            doc_line = ex['docResultAnalysis'].split('Нәтиже:', 1)[1].strip().split('. ')[0].rstrip('.')
            if out_lines != [doc_line]:
                die(f'{lid} мысал 3: нәтиже құжатпен сәйкес емес: {out_lines} / {doc_line}')
        ex['codeLines'] = code_lines(ex['code'])
        del ex['code']
        used = {s['l'] for s in steps if s['l']}
        missing = [l for l in used if l not in a['notes']]
        if missing:
            die(f'{lid} мысал {ex["n"]}: түсіндірме жоқ жолдар: {missing}')
        ex['steps'] = steps
        ex['loops'] = loops
        ex['notes'] = {str(k): v for k, v in a['notes'].items()}
        ex['context'] = a['context']
        ex['goal'] = a['goal']
        ex['dataNote'] = a['dataNote']
        ex['question'] = a['question']
        ex['follow'] = a['follow']
        # бастапқы деректер: бірінші тапсырма жолы(тары) — «= ...» меншіктеулері, функцияларсыз
        first = ex['codeLines'][0]
        ex['dataLines'] = [first]
        # құжат сөзін бөлек сақтау
        if ex.get('docResultAnalysis'):
            del ex['docResultAnalysis']
    L['examples'] = exs

    # бекіту сұрақтары
    qi = find_idx('h1', quiz_h1, start)
    qseg = seg_until(qi, lambda b: b['t'] == 'h1')
    ps = [b for b in qseg if b['t'] == 'p']
    qs_h2 = [i for i, b in enumerate(qseg) if b['t'] == 'h2']
    # құрылым: 6 сұрақ p, h2(жауаптар), 6 жауап p, h2(тәртіп), p...
    qtexts = []
    atexts = []
    ptexts = []
    mode = 'q'
    for b in qseg:
        if b['t'] == 'h2':
            mode = 'a' if b['text'].startswith('Оқытушыға арналған') else 'p'
            continue
        if mode == 'q':
            qtexts.append(strip_num(b['text']))
        elif mode == 'a':
            atexts.append(strip_num(b['text']))
        else:
            ptexts.append(b['text'])
    assert len(qtexts) == 6 and len(atexts) == 6, (len(qtexts), len(atexts))
    quiz = []
    for k in range(6):
        qa = QUIZ[lid][k]
        item = {'n': k + 1, 'type': qa['type'], 'time': qa['time'], 'q': qtexts[k], 'answer': atexts[k],
                'explain': qa['explain'], 'code': qa['code']}
        if qa['code']:
            out, err = run_code(qa['code'])
            res = out.rstrip('\n')
            if err:
                res = (res + '\n' if res else '') + err
            item['result'] = res
        else:
            item['result'] = None
        quiz.append(item)
    L['quiz'] = quiz
    L['practiceIntro'] = ptexts

    # нұсқалар
    variants = []
    vi = qi
    for n in range(1, 9):
        vh = find_idx('h1', f'{n} нұсқа', start)
        assert vh < next_lesson
        vseg = seg_until(vh, lambda b: b['t'] == 'h1')
        title = BLOCKS[vh]['text'].split(' ', 2)[2]
        # құрылым: p(Студент), p(intro) [, ...], h2(Бастапқы), code, h2(Бес тапсырма), 5 p, p(Негізгі тәсіл), p(Тапсыру/Бағалау)
        assert vseg[0]['t'] == 'p' and vseg[0]['text'].startswith('Студент:')
        k = 1
        intro = []
        while vseg[k]['t'] == 'p':
            intro.append(vseg[k]['text'])
            k += 1
        assert vseg[k]['t'] == 'h2' and vseg[k]['text'] == 'Бастапқы деректер'
        assert vseg[k + 1]['t'] == 'code'
        data = vseg[k + 1]['text']
        assert vseg[k + 2]['t'] == 'h2' and vseg[k + 2]['text'] == 'Бес тапсырма'
        rest = vseg[k + 3:]
        assert len(rest) == 7 and all(b['t'] == 'p' for b in rest), len(rest)
        tasks = [strip_num(b['text']) for b in rest[:5]]
        for t_i, b in enumerate(rest[:5]):
            assert b['text'].startswith(f'{t_i + 1}. '), b['text'][:10]
        method = rest[5]['text']
        assert method.startswith('Негізгі тәсіл:')
        sub = rest[6]['text']
        m = re.match(r'^Тапсыру:\s*(.+?)\s*Бағалау:\s*(.+)$', sub)
        assert m, sub
        ex = VARIANT_EXTRA[(lid, n)]
        v = {
            'n': n, 'title': title, 'intro': ' '.join(intro), 'data': data, 'tasks': tasks,
            'method': method[len('Негізгі тәсіл:'):].strip().rstrip('.') + '.',
            'constraints': ex['constraints'], 'hard': bool(ex.get('hard')),
            'submit': m.group(1).strip(), 'grading': m.group(2).strip(),
        }
        # үлгі шешім (құжатта жоқ — сайт авторы дайындаған), нақты Python-да орындалады
        sol = SOLUTIONS[(lid, n)]
        out, err = run_code(sol)
        if err:
            die(f'Шешім қатесі {lid} {n}: {err}')
        # шешім бастапқы деректерді дәл қамтуы керек
        first_data_line = data.split('\n')[0]
        if first_data_line not in sol:
            die(f'Шешімде бастапқы деректер сәйкес емес: {lid} {n}')
        v['solution'] = {'code': sol.rstrip('\n').split('\n'), 'output': out.rstrip('\n').split('\n')}
        variants.append(v)
    assert len(variants) == 8
    L['variants'] = variants

    # үй жұмысы (құжатта жоқ — сайт авторы дайындаған, практикадағы 8 нұсқаға бір-бірден сәйкес)
    homework = []
    for n in range(1, 9):
        hw = HOMEWORK[(lid, n)]
        for key in ('title', 'condition', 'data', 'steps', 'outputFormat', 'submit', 'grading'):
            assert key in hw, f'Үй жұмысында өріс жоқ: {lid} {n} {key}'
        assert len(hw['steps']) == 3, f'Үй жұмысында 3 қадам болуы керек: {lid} {n}'
        homework.append(dict(n=n, **hw))
    L['homework'] = homework

    L['summary'] = SUMMARY[lid]
    return L


L1 = build_lesson('strings', 1, '1 сабақ', 'Жолдар бойынша бекіту', None)
L2 = build_lesson('lists', 2, '2 сабақ', 'Тізімдер бойынша бекіту', None)

# қосымша тексеру: мысал талдау сұрақтарының жауаптары
chk, err = run_code('password = "Python 2026"\n'
                    'has_letter = False\nhas_digit = False\nhas_space = False\n'
                    'for character in password:\n'
                    '    if character.isalpha():\n        has_letter = True\n'
                    '    if character.isdecimal():\n        has_digit = True\n'
                    '    if character.isspace():\n        has_space = True\n'
                    'if len(password) >= 8 and has_letter and has_digit and not has_space:\n'
                    '    print("сәйкес")\nelse:\n    print("сәйкес емес")\nprint(has_space)')
assert chk.strip().split('\n') == ['сәйкес емес', 'True'], chk
chk2, err2 = run_code('record = "ORDER-105"\nprint(record.find(":"))')
assert chk2.strip() == '-1'
_, err3 = run_code('raw = "80 95 abc"\nscores = []\nfor p in raw.split():\n    scores.append(int(p))')
assert err3.startswith('ValueError')
_, err4 = run_code('scores = []\nprint(sum(scores) / len(scores))')
assert err4.startswith('ZeroDivisionError')

DATA = {'meta': meta, 'lessons': [L1, L2]}

# санау
nt = sum(len(v['tasks']) for L in DATA['lessons'] for v in L['variants'])
nv = sum(len(L['variants']) for L in DATA['lessons'])
assert (nv, nt) == (16, 80), (nv, nt)
nh = sum(len(L['homework']) for L in DATA['lessons'])
assert nh == 16, nh

header = ('/* lessons.js — сабақтар мен тапсырмалардың деректері.\n'
          ' * Мазмұн «Zholdar_tizimder_eki_sabak.docx» құжатынан алынған (tools/build.py арқылы).\n'
          ' * Мысалдардың нәтижелері мен қадамдық демонстрация деректері нақты Python-да орындаудан алынған.\n'
          ' * "solution" өрістері — құжатта жоқ, сайт авторы дайындаған қосымша үлгі шешімдер.\n'
          ' */\n')
js = header + 'window.LESSONS = ' + json.dumps(DATA, ensure_ascii=False, indent=1) + ';\n'
with open(os.path.join(ROOT, 'lessons.js'), 'w', encoding='utf-8') as f:
    f.write(js)
print(f'OK: lessons.js жазылды ({len(js)//1024} КБ); нұсқа: {nv}, тапсырма: {nt}')
for L in DATA['lessons']:
    for ex in L['examples']:
        print(f"  {L['id']} мысал {ex['n']}: {len(ex['steps'])} қадам, нәтиже {len(ex['output'])} жол")
