import os
import re
import markdown
import jinja2
import math
import json
import shutil
from bs4 import BeautifulSoup

# Configuration
CONTENT_DIRS = ['Blog/raw', 'Blog/research']
OUTPUT_DIR = 'built_site'
TEMPLATE_DIR = 'templates'
ASSETS_DIR = 'assets'

# Setup Jinja2 environment
env = jinja2.Environment(loader=jinja2.FileSystemLoader(TEMPLATE_DIR))

def slugify(text):
    text = text.replace('.md', '').replace(' ', '_')
    return text

def estimate_reading_time(text):
    words = len(text.split())
    minutes = math.ceil(words / 200)
    return minutes

def get_tags_and_categories(filename, title):
    # Define tags and categories based on filename or title
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
    return assignments.get(key, {'category': 'Sacred Sites', 'tags': ['spiritual', 'Odisha']})

def parse_markdown_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Extract Title
    title_match = re.search(r'^#\s+(.*)', content, re.MULTILINE)
    title = title_match.group(1) if title_match else os.path.basename(filepath).replace('.md', '')

    # Get tags and categories
    metadata = get_tags_and_categories(filepath, title)

    # Handle Image Suggestions
    content = re.sub(
        r'> \*\*\[🖼️ (.*?)\]\*\*',
        r'<div class="image-placeholder"><span class="icon">🖼️</span> \1</div>',
        content
    )

    # Pre-process citations
    content = re.sub(r'<sup>(\d+)</sup>', r'<sup id="cite-ref-\1"><a href="#ref-\1">\1</a></sup>', content)

    # Render Markdown
    md = markdown.Markdown(extensions=['toc', 'extra', 'smarty'])
    html_content = md.convert(content)

    # Post-process HTML
    soup = BeautifulSoup(html_content, 'html.parser')

    # Identify References List
    ref_list = None
    ref_header = None

    for header in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
        if 'reference' in header.get_text().lower() or 'source' in header.get_text().lower() or 'bibliography' in header.get_text().lower():
            ref_header = header
            next_elem = ref_header.find_next_sibling(['ul', 'ol'])
            if next_elem:
                ref_list = next_elem
            break

    if not ref_list:
        lists = soup.find_all(['ul', 'ol'])
        if lists:
            last_list = lists[-1]
            text_content = last_list.get_text()
            if "accessed on" in text_content or "http" in text_content:
                ref_list = last_list

    if ref_list:
        for i, li in enumerate(ref_list.find_all('li'), 1):
            li['id'] = f'ref-{i}'
            back_link = soup.new_tag('a', href=f'#cite-ref-{i}', **{'class': 'back-to-cite'})
            back_link.string = '↩'
            li.append(back_link)

    html_content = str(soup)

    return {
        'title': title,
        'content': html_content,
        'toc': md.toc,
        'reading_time': estimate_reading_time(content),
        'filename': slugify(os.path.basename(filepath)) + '.html',
        'category': metadata['category'],
        'tags': metadata['tags'],
        'excerpt': BeautifulSoup(html_content, 'html.parser').get_text()[:200] + '...'
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

    # Collect all filepaths first to maintain order if needed (e.g. alphanumeric)
    all_filepaths = []
    for content_dir in CONTENT_DIRS:
        if not os.path.exists(content_dir):
            continue
        files = sorted(os.listdir(content_dir))
        for filename in files:
            if filename.startswith('.'): continue
            # Looser check to include more files, as we want complete population
            if not filename.endswith('.md') and filename not in ['Sri Jagannath Temple Complex', 'THE MIRROR OF THE SOUL']:
                 # Check if it is a folder or file without extension that contains markdown?
                 # Assuming simple md files for now.
                 continue
            all_filepaths.append(os.path.join(content_dir, filename))

    # Process files
    for filepath in all_filepaths:
        print(f"Processing {filepath}...")
        try:
            page_data = parse_markdown_file(filepath)
            pages.append(page_data)

            search_index.append({
                'title': page_data['title'],
                'url': page_data['filename'],
                'content': page_data['excerpt'],
                'category': page_data['category']
            })
        except Exception as e:
            print(f"Error processing {filepath}: {e}")

    # Collect unique categories and tags
    categories = sorted(list(set(p['category'] for p in pages)))
    all_tags = set()
    for p in pages:
        all_tags.update(p['tags'])
    tags = sorted(list(all_tags))

    # Render pages with prev/next links
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
            body_class="article-page",
            pages=pages, # Pass all pages to every template for navigation/sitemap
            category=page['category']
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
