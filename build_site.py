import os
import re
import markdown
import jinja2
import math
import json
import shutil
from bs4 import BeautifulSoup

# Configuration
# Source directories - we will walk 'Blog' but filter for .md
SOURCE_ROOT = 'Blog'
OUTPUT_DIR = 'built_site'
TEMPLATE_DIR = 'templates'
ASSETS_DIR = 'assets'

# Setup Jinja2 environment
env = jinja2.Environment(loader=jinja2.FileSystemLoader(TEMPLATE_DIR))

def slugify(text):
    text = text.replace('.md', '').replace(' ', '_').lower()
    return re.sub(r'[^a-z0-9_]', '', text)

def estimate_reading_time(text):
    words = len(text.split())
    minutes = math.ceil(words / 200)
    return minutes

def get_metadata(filename, content):
    # Default assignments based on filename
    assignments = {
        'Jai Jagannath.md': {'category': 'Journey', 'tags': ['spiritual', 'cultural', 'historical', 'mythological', 'pilgrimage', 'temples', 'Shakti Peethas', 'Odisha']},
        'odisha_sacred_odyssey_temp.md': {'category': 'Journey', 'tags': ['spiritual', 'cultural', 'historical', 'mythological', 'pilgrimage', 'temples', 'Shakti Peethas', 'Odisha']},
        'odisha_sacred_odyssey.md': {'category': 'Journey', 'tags': ['spiritual', 'cultural', 'historical', 'mythological', 'pilgrimage', 'temples', 'Shakti Peethas', 'Odisha']},
        'Chausath Yogini.md': {'category': 'Temples', 'tags': ['spiritual', 'mythological', 'architectural', 'temples', 'Shakti Peethas', 'Odisha']},
        'Chhatia Bata.md': {'category': 'Temples', 'tags': ['spiritual', 'mythological', 'historical', 'temples', 'Odisha']},
        'Cuttack Chandi Shakti Peetha.md': {'category': 'Shakti Peethas', 'tags': ['spiritual', 'mythological', 'temples', 'Shakti Peethas', 'Odisha']},
        'jain_temple_caves.md': {'category': 'Jain Sites', 'tags': ['spiritual', 'historical', 'architectural', 'Jain', 'Odisha']},
        'Konark Sun Temple.md': {'category': 'Temples', 'tags': ['spiritual', 'historical', 'mythological', 'architectural', 'temples', 'Odisha', 'science']},
        'lingaraj_temple.md': {'category': 'Temples', 'tags': ['spiritual', 'mythological', 'architectural', 'temples', 'Odisha']},
        'Maa Biraja Shakti Peetha.md': {'category': 'Shakti Peethas', 'tags': ['spiritual', 'mythological', 'temples', 'Shakti Peethas', 'Odisha']},
        'Parashurameshwar Temple.md': {'category': 'Temples', 'tags': ['spiritual', 'mythological', 'temples', 'Odisha']},
        'puri_jagannath_temple.md': {'category': 'Temples', 'tags': ['spiritual', 'mythological', 'temples', 'Odisha']},
        'ram mandir.md': {'category': 'Temples', 'tags': ['spiritual', 'cultural', 'temples', 'Odisha']},
        'Sri Jagannath Temple Complex': {'category': 'Temples', 'tags': ['spiritual', 'mythological', 'temples', 'Odisha']},
        'subhash_chandra_bose_museum.md': {'category': 'Museums', 'tags': ['historical', 'cultural', 'revolution', 'Odisha']},
        'The Rajarani Temple.md': {'category': 'Temples', 'tags': ['spiritual', 'architectural', 'temples', 'Odisha']},
        'THE MIRROR OF THE SOUL': {'category': 'Temples', 'tags': ['spiritual', 'mythological', 'historical', 'temples', 'Odisha']},
    }

    key = os.path.basename(filename)
    meta = assignments.get(key)

    if not meta:
        # Fallback: Inference from content
        category = 'General'
        tags = ['Odisha', 'Journey']

        lower_content = content.lower()
        if 'temple' in lower_content:
            category = 'Temples'
            tags.append('temples')
        if 'shakti' in lower_content:
            tags.append('shakti')
        if 'history' in lower_content:
            tags.append('historical')

        meta = {'category': category, 'tags': tags}

    return meta

def parse_markdown_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Extract Title
    title_match = re.search(r'^#\s+(.*)', content, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else os.path.basename(filepath).replace('.md', '').replace('_', ' ').title()

    # Get tags and categories
    metadata = get_metadata(filepath, content)

    # Handle Image Suggestions (Transform to placeholders or actual img tags if we had them)
    # The requirement is "Zero information loss", so we keep the placeholder text visible but styled
    content = re.sub(
        r'> \*\*\[🖼️ (.*?)\]\*\*',
        r'<div class="image-placeholder"><span class="icon">🖼️</span> \1</div>',
        content
    )

    # Pre-process citations (<sup>1</sup> -> <sup id="cite-ref-1"><a href="#ref-1">1</a></sup>)
    content = re.sub(r'<sup>(\d+)</sup>', r'<sup id="cite-ref-\1"><a href="#ref-\1">\1</a></sup>', content)

    # Render Markdown
    md = markdown.Markdown(extensions=['toc', 'extra', 'smarty', 'footnotes'])
    html_content = md.convert(content)

    # Post-process HTML with BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    # 1. Add IDs to headers for TOC/Linking if missing
    for header in soup.find_all(['h2', 'h3']):
        if not header.get('id'):
            header['id'] = slugify(header.get_text())

    # 2. Identify References List and add back links
    ref_list = None
    ref_header = None

    # Try to find a header saying "References"
    for header in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
        text = header.get_text().lower()
        if 'reference' in text or 'source' in text or 'bibliography' in text:
            ref_header = header
            # Look for the next UL or OL
            next_elem = header.find_next_sibling(['ul', 'ol'])
            if next_elem:
                ref_list = next_elem
            break

    # Fallback: Look for the last list if it looks like references
    if not ref_list:
        lists = soup.find_all(['ul', 'ol'])
        if lists:
            last_list = lists[-1]
            text_content = last_list.get_text().lower()
            if "accessed on" in text_content or "http" in text_content:
                ref_list = last_list

    if ref_list:
        ref_list['class'] = ref_list.get('class', []) + ['references-list']
        for i, li in enumerate(ref_list.find_all('li'), 1):
            li['id'] = f'ref-{i}'
            # Check if back link already exists
            if not li.find('a', class_='back-to-cite'):
                back_link = soup.new_tag('a', href=f'#cite-ref-{i}', **{'class': 'back-to-cite'})
                back_link.string = ' ↩'
                li.append(back_link)

    # 3. Apply Rustic Classes to elements
    for img in soup.find_all('img'):
        img['class'] = img.get('class', []) + ['rustic-img']

    for quote in soup.find_all('blockquote'):
        quote['class'] = quote.get('class', []) + ['rustic-quote']

    html_content = str(soup)

    return {
        'title': title,
        'content': html_content,
        'toc': md.toc,
        'reading_time': estimate_reading_time(content),
        'filename': slugify(os.path.basename(filepath)) + '.html',
        'category': metadata['category'],
        'tags': metadata['tags'],
        'excerpt': BeautifulSoup(html_content, 'html.parser').get_text()[:180] + '...'
    }

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    # Copy Assets
    if os.path.exists(ASSETS_DIR):
        output_assets = os.path.join(OUTPUT_DIR, 'assets')
        if os.path.exists(output_assets):
            shutil.rmtree(output_assets)
        shutil.copytree(ASSETS_DIR, output_assets)
        print("Assets copied.")

    pages = []
    search_index = []

    # Walk Blog directory
    print(f"Scanning {SOURCE_ROOT} for content...")
    for root, dirs, files in os.walk(SOURCE_ROOT):
        # Exclude 'html' directory if it exists to avoid processing generated files
        if 'html' in dirs:
            dirs.remove('html')

        for filename in files:
            if filename.endswith('.md') or filename in ['Sri Jagannath Temple Complex', 'THE MIRROR OF THE SOUL']: # Handle known files without extension if any
                filepath = os.path.join(root, filename)
                print(f"Processing {filepath}...")
                try:
                    page_data = parse_markdown_file(filepath)
                    pages.append(page_data)

                    search_index.append({
                        'title': page_data['title'],
                        'url': page_data['filename'],
                        'content': page_data['excerpt'],
                        'category': page_data['category'],
                        'tags': page_data['tags']
                    })
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

    # Sort pages by title (or could be by date if we had it)
    pages.sort(key=lambda x: x['title'])

    # Collect unique categories and tags
    categories = sorted(list(set(p['category'] for p in pages)))
    all_tags = set()
    for p in pages:
        all_tags.update(p['tags'])
    tags = sorted(list(all_tags))

    # Calculate Related Posts
    for page in pages:
        related = []
        page_tags = set(page['tags'])
        for other_page in pages:
            if other_page['filename'] == page['filename']:
                continue
            other_tags = set(other_page['tags'])
            overlap = len(page_tags.intersection(other_tags))
            if overlap > 0:
                related.append((overlap, other_page))

        # Sort by overlap descending
        related.sort(key=lambda x: x[0], reverse=True)
        page['related_posts'] = [x[1] for x in related[:3]] # Top 3 related

    # Render Article Pages
    template = env.get_template('article.html')
    for i, page in enumerate(pages):
        prev_page = pages[i-1] if i > 0 else None
        next_page = pages[i+1] if i < len(pages) - 1 else None

        output_html = template.render(
            title=page['title'],
            content=page['content'],
            toc=page['toc'],
            metadata={},
            reading_time=page['reading_time'],
            prev_page=prev_page,
            next_page=next_page,
            related_posts=page['related_posts'],
            body_class="article-page",
            pages=pages,
            category=page['category'],
            tags=page['tags']
        )

        with open(os.path.join(OUTPUT_DIR, page['filename']), 'w', encoding='utf-8') as f:
            f.write(output_html)

    # Render Index
    index_template = env.get_template('index.html')
    index_html = index_template.render(
        title="Home",
        pages=pages,
        body_class="home-page",
        categories=categories,
        tags=tags
    )

    with open(os.path.join(OUTPUT_DIR, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(index_html)

    # Render Blog/All Posts Page
    blog_template = env.get_template('blog.html')
    blog_html = blog_template.render(
        title="All Posts",
        pages=pages,
        body_class="blog-page",
        categories=categories,
        tags=tags
    )

    with open(os.path.join(OUTPUT_DIR, 'blog.html'), 'w', encoding='utf-8') as f:
        f.write(blog_html)

    # Render Immersive Odyssey Page
    immersive_template = env.get_template('immersive_odyssey.html')
    immersive_html = immersive_template.render(
        title="Immersive Odyssey",
        pages=pages,
        body_class="immersive-page"
    )

    with open(os.path.join(OUTPUT_DIR, 'immersive_odyssey.html'), 'w', encoding='utf-8') as f:
        f.write(immersive_html)

    # Write Search Index
    with open(os.path.join(OUTPUT_DIR, 'search.json'), 'w', encoding='utf-8') as f:
        json.dump(search_index, f)

    print("Site built successfully!")

if __name__ == "__main__":
    main()
