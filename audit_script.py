import os
import re

def analyze_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    word_count = len(content.split())

    images = re.findall(r'!\[.*?\]\(.*?\)', content)
    html_images = re.findall(r'<img.*?>', content)
    links = re.findall(r'\[.*?\]\(.*?\)', content)
    footnotes = re.findall(r'\[\^.*?\]', content)

    headers = re.findall(r'^(#{1,6})\s+(.*)', content, re.MULTILINE)

    # Try to extract title
    title = "Unknown"
    if headers:
        title = headers[0][1]

    # Check for metadata (simple check for YAML frontmatter)
    metadata = []
    if content.startswith('---'):
        end_meta = content.find('---', 3)
        if end_meta != -1:
            metadata = content[3:end_meta].strip().split('\n')

    return {
        'filepath': filepath,
        'size': len(content),
        'word_count': word_count,
        'image_count': len(images) + len(html_images),
        'link_count': len(links),
        'footnote_count': len(footnotes),
        'title': title,
        'headers': [h[1] for h in headers],
        'metadata': metadata
    }

def main():
    root_dir = 'Blog'
    all_files = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.startswith('.'): continue # Skip hidden files
            filepath = os.path.join(dirpath, filename)
            # Only process files that seem to be text/markdown
            # We include files without extension if they are in the list we saw earlier
            if filename.endswith('.md') or filename in ['Sri Jagannath Temple Complex', 'THE MIRROR OF THE SOUL']:
                all_files.append(filepath)

    print(f"Found {len(all_files)} files.")

    audit_results = []
    for filepath in all_files:
        print(f"Analyzing {filepath}...")
        audit_results.append(analyze_file(filepath))

    print("\n--- AUDIT SUMMARY ---\n")
    for res in audit_results:
        print(f"File: {res['filepath']}")
        print(f"  Title: {res['title']}")
        print(f"  Word Count: {res['word_count']}")
        print(f"  Images: {res['image_count']}")
        print(f"  Links: {res['link_count']}")
        print(f"  Footnotes: {res['footnote_count']}")
        print(f"  Metadata: {res['metadata']}")
        print(f"  Structure (Top 3 Headers): {res['headers'][:3]}")
        print("-" * 20)

if __name__ == "__main__":
    main()
