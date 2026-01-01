from playwright.sync_api import sync_playwright

def verify_site():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile view
        context = browser.new_context(viewport={'width': 375, 'height': 667})
        page = context.new_page()

        # 1. Home Mobile
        page.goto("http://localhost:8000/index.html")
        page.screenshot(path="verification/home_mobile.png", full_page=True)

        # 2. Blog Mobile
        page.goto("http://localhost:8000/blog.html")
        page.screenshot(path="verification/blog_mobile.png", full_page=True)

        # Desktop view
        context_desktop = browser.new_context(viewport={'width': 1280, 'height': 800})
        page_desktop = context_desktop.new_page()

        # 3. Home Desktop
        page_desktop.goto("http://localhost:8000/index.html")
        page_desktop.screenshot(path="verification/home_desktop.png", full_page=True)

        # 4. Article Page
        page_desktop.goto("http://localhost:8000/lingaraj_temple.html")
        page_desktop.screenshot(path="verification/article.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_site()
