import os
from bs4 import BeautifulSoup

def verify_requirements():
    print("Verifying Master Requirements Compliance...")

    file_path = 'built_site/immersive_odyssey.html'
    if not os.path.exists(file_path):
        print("❌ FAIL: immersive_odyssey.html does not exist.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    checks = {
        'REQ-CI-001 (Blog Cards)': soup.select('.card'),
        'REQ-CI-002 (Scrollytelling)': soup.select('.scrolly-section .scrolly-content'),
        'REQ-CI-003 (Parallax)': soup.select('.parallax-bg'),
        'REQ-CI-004 (Timeline)': soup.select('.timeline-container .timeline-card'),
        'REQ-IX-002 (Interactive Map)': soup.select('.interactive-map-container svg'),
        'REQ-IX-004 (Reading Progress)': soup.select('#readingProgress'),
        'REQ-VC-002 (Fonts)': "Cinzel" in str(soup) and "Lato" in str(soup),
        'REQ-TS-001 (Semantic HTML)': soup.select('header') and soup.select('main') and soup.select('footer'),
    }

    all_passed = True
    for req, result in checks.items():
        if result:
            print(f"✅ PASS: {req}")
        else:
            print(f"❌ FAIL: {req}")
            all_passed = False

    if all_passed:
        print("\nAll automated structure checks passed!")
    else:
        print("\nSome checks failed.")

if __name__ == "__main__":
    verify_requirements()
