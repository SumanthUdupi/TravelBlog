import os
import json
import re
import datetime
from pathlib import Path
import markdown
from jinja2 import Environment, FileSystemLoader
from bs4 import BeautifulSoup

# Configuration
BLOG_DIR = 'Documents/Blog/raw'
RESEARCH_DIR = 'Documents/Blog/research'
OUTPUT_DIR = os.getenv('BUILD_OUTPUT_DIR', '.')
TEMPLATES_DIR = 'templates'
DATA_DIR = 'data'

def load_templates():
    env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))
    return env

def slugify(text):
    text = text.lower()
    return re.sub(r'[^a-z0-9]+', '_', text).strip('_')

def parse_frontmatter(content):
    """
    Simple frontmatter parser.
    Assumes frontmatter is between first two --- lines.
    """
    lines = content.split('\n')
    if not lines[0].strip() == '---':
        return {}, content

    frontmatter = {}
    end_idx = 0
    for i, line in enumerate(lines[1:], 1):
        if line.strip() == '---':
            end_idx = i
            break

        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()
            # Handle arrays [a, b]
            if value.startswith('[') and value.endswith(']'):
                value = [x.strip() for x in value[1:-1].split(',')]
            frontmatter[key] = value

    body = '\n'.join(lines[end_idx+1:])
    return frontmatter, body

def estimate_reading_time(text):
    words = len(text.split())
    minutes = max(1, round(words / 200))
    return minutes

def process_citations(html_content, slug):
    """
    Converts <sup>^1</sup> to <a href="#ref-1" id="cite-1"><sup>1</sup></a>
    and extracts citations.
    """
    citations = []
    # Implementation placeholder
    return html_content, citations

def build_site():
    env = load_templates()
    article_template = env.get_template('article.html')

    posts_data = []

    # Ensure data dir exists
    os.makedirs(DATA_DIR, exist_ok=True)

    # 1. Build Standard Pages (About)
    # This manually renders templates/about.html to about.html
    # We could make this dynamic by scanning templates/pages, but explicit is fine for now.
    standard_pages = ['about.html']
    for page in standard_pages:
        try:
            template = env.get_template(page)
            # Render with empty context or global context
            output_html = template.render()
            with open(os.path.join(OUTPUT_DIR, page), 'w', encoding='utf-8') as f:
                f.write(output_html)
            print(f"Generated {page}")
        except Exception as e:
            print(f"Skipping {page}: {e}")

    # 2. Build Blog Posts
    source_dirs = [BLOG_DIR]
    print(f"Scanning {BLOG_DIR}...")

    for root, dirs, files in os.walk(BLOG_DIR):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    raw_content = f.read()

                metadata, body_md = parse_frontmatter(raw_content)

                # Defaults
                title = metadata.get('title', file.replace('.md', ''))
                date = metadata.get('date', datetime.date.today().isoformat())
                tags = metadata.get('tags', [])
                if isinstance(tags, str): tags = [tags]
                author = metadata.get('author', 'Anonymous Pilgrim')
                imageUrl = metadata.get('imageUrl', '')

                slug = slugify(title)

                # Convert to HTML
                html_content = markdown.markdown(body_md, extensions=['fenced_code', 'tables'])

                # Reading time
                soup = BeautifulSoup(html_content, 'html.parser')
                text_content = soup.get_text()
                reading_time = estimate_reading_time(text_content)
                excerpt = metadata.get('excerpt', text_content[:150] + '...')

                # Citations
                citations = []

                # Render Template
                output_html = article_template.render(
                    title=title,
                    content=html_content,
                    date=date,
                    author=author,
                    reading_time=reading_time,
                    tags=tags,
                    citations=citations,
                    excerpt=excerpt,
                    imageUrl=imageUrl
                )

                output_filename = f"{slug}.html"
                with open(os.path.join(OUTPUT_DIR, output_filename), 'w', encoding='utf-8') as f:
                    f.write(output_html)

                print(f"Generated {output_filename}")

                posts_data.append({
                    'slug': slug,
                    'title': title,
                    'date': date,
                    'excerpt': excerpt,
                    'tags': tags,
                    'reading_time': reading_time,
                    'author': author,
                    'imageUrl': imageUrl
                })

    # Write posts.json
    with open(os.path.join(DATA_DIR, 'posts.json'), 'w', encoding='utf-8') as f:
        json.dump(posts_data, f, indent=2)
    print(f"Generated data/posts.json with {len(posts_data)} posts.")

if __name__ == "__main__":
    build_site()
