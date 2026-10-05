#!/usr/bin/env python3
"""Word құжатынан (source.docx) құрылымды дерек шығарады -> tools/source.json.
Код блоктарындағы бос орындар мен шегініс өзгертілмей сақталады."""
import json, re, sys, os
import docx
from docx.table import Table
from docx.text.paragraph import Paragraph

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'source.docx')

def iter_blocks(d):
    body = d.element.body
    for child in body.iterchildren():
        tag = child.tag.split('}')[1]
        if tag == 'p':
            yield Paragraph(child, d)
        elif tag == 'tbl':
            yield Table(child, d)

def is_code(p):
    return any((r.font.name or '').lower().find('mono') >= 0 for r in p.runs)

def main():
    d = docx.Document(SRC)
    blocks = []
    for b in iter_blocks(d):
        if isinstance(b, Table):
            blocks.append({'t': 'table', 'rows': [[c.text for c in r.cells] for r in b.rows]})
            continue
        style = b.style.name
        text = b.text
        if style == 'Title': blocks.append({'t': 'title', 'text': text})
        elif style == 'Subtitle': blocks.append({'t': 'subtitle', 'text': text})
        elif style == 'Heading 1': blocks.append({'t': 'h1', 'text': text})
        elif style == 'Heading 2': blocks.append({'t': 'h2', 'text': text})
        elif is_code(b): blocks.append({'t': 'code', 'text': text})
        else:
            if text.strip() == '': continue
            blocks.append({'t': 'p', 'text': text})
    json.dump(blocks, open(os.path.join(HERE, 'source_blocks.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(len(blocks), 'blocks')

if __name__ == '__main__':
    main()
