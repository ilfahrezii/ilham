"""Format the static site: pip install -r tools/format-requirements.txt"""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.format-tools'))

from bs4 import BeautifulSoup
import cssbeautifier
import jsbeautifier

for path in ROOT.glob('*.html'):
    soup = BeautifulSoup(path.read_text(encoding='utf-8'), 'html.parser')
    pretty = soup.prettify(formatter='minimal')
    # BeautifulSoup uses one space per level; match the JS/CSS two-space style.
    lines = []
    for line in pretty.splitlines():
        depth = len(line) - len(line.lstrip(' '))
        lines.append(' ' * depth + line)
    path.write_text('\n'.join(lines) + '\n', encoding='utf-8')

for folder, extension, formatter in [
    ('js', '*.js', jsbeautifier),
    ('css', '*.css', cssbeautifier),
]:
    options = formatter.default_options()
    options.indent_size = 2
    options.end_with_newline = True
    for path in (ROOT / folder).glob(extension):
        path.write_text(formatter.beautify(path.read_text(encoding='utf-8'), options), encoding='utf-8')

print('Formatted HTML, CSS, and JavaScript with consistent indentation.')
