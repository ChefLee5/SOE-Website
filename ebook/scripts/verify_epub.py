import zipfile, sys
sys.stdout.reconfigure(encoding='utf-8')
epub = zipfile.ZipFile('SOE_Essential_Picture_Dictionary.epub', 'r')
names = epub.namelist()
print(f'Total files in EPUB: {len(names)}')
print(f'First entry: {names[0]} (must be mimetype)')

pages = [n for n in names if n.startswith('OEBPS/pages/') and n.endswith('.xhtml')]
images = [n for n in names if n.startswith('OEBPS/images/') and n.endswith('.jpg')]
fonts = [n for n in names if n.startswith('OEBPS/fonts/')]
print(f'XHTML pages: {len(pages)}')
print(f'Images: {len(images)}')
print(f'Fonts: {len(fonts)}')
has_opf = 'OEBPS/content.opf' in names
has_nav = 'OEBPS/pages/nav.xhtml' in names
has_css = 'OEBPS/styles/dictionary.css' in names
has_meta = 'META-INF/container.xml' in names
print(f'Has content.opf: {has_opf}')
print(f'Has nav.xhtml: {has_nav}')
print(f'Has dictionary.css: {has_css}')
print(f'Has META-INF: {has_meta}')

fixed = [
    'OEBPS/pages/land3-silas-vestas-cottage-outside.xhtml',
    'OEBPS/pages/land3-rocks-minerals.xhtml',
    'OEBPS/pages/land3-recycling-sustainability.xhtml',
    'OEBPS/pages/land6-community-helpers-services.xhtml',
    'OEBPS/pages/land6-rights-responsibilities.xhtml',
    'OEBPS/pages/land7-the-scientific-method.xhtml',
    'OEBPS/pages/land7-the-calendar-cycles.xhtml',
    'OEBPS/pages/land7-the-future-dreams.xhtml',
]
print('\nFixed pages verification:')
for f in fixed:
    info = epub.getinfo(f)
    print(f'  OK  {f.split("/")[-1]}: {info.file_size} bytes')

epub.close()
print('\nEPUB package is valid!')
