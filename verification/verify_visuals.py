
from playwright.sync_api import sync_playwright

def verify_home_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # Navigate to home
        page.goto("http://localhost:8000/index.html")

        # Wait for potential animations or lazy loading
        page.wait_for_timeout(2000)

        # Screenshot Hero Section
        page.screenshot(path="verification/home_hero.png")

        # Scroll down to reveal elements
        page.evaluate("window.scrollTo(0, 500)")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/home_scrolled.png")

        # Check "Aura" mode toggle if possible (interactive)
        # But for visual check, screenshots are key.

        browser.close()

if __name__ == "__main__":
    verify_home_page()
