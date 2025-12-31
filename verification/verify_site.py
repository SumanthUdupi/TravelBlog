from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Determine the absolute path to the index.html file
        cwd = os.getcwd()
        file_path = f"file://{cwd}/built_site/index.html"
        print(f"Navigating to: {file_path}")

        page.goto(file_path)

        # Verify title
        title = page.title()
        print(f"Page title: {title}")
        assert "Odisha Sacred Odyssey" in title

        # Take screenshot of Homepage
        page.screenshot(path="verification/homepage.png", full_page=True)

        # Navigate to a specific article (e.g., Lingaraj)
        # Click on "Featured Content" or find link
        # Since links are static, we can goto directly or click

        # Testing search functionality (might not work with file:// protocol due to CORS? Let's see)
        # Search for "Lingaraj"
        page.fill('#searchInput', 'Lingaraj')
        page.wait_for_timeout(1000) # Wait for debounce
        page.screenshot(path="verification/search_results.png")

        # Navigate to Lingaraj page
        lingaraj_path = f"file://{cwd}/built_site/lingaraj_temple.html"
        page.goto(lingaraj_path)

        # Screenshot of article
        page.screenshot(path="verification/article.png", full_page=True)

        # Check citations
        # Click on a citation link if possible or just verify presence
        citation = page.locator('sup#cite-ref-1')
        if citation.count() > 0:
            print("Citation found!")

        browser.close()

if __name__ == "__main__":
    run()
