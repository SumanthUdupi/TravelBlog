from playwright.sync_api import sync_playwright

def verify_immersive(page):
    # Load the local HTML file (assuming it's in built_site)
    # Since we can't run a server easily in this context without blocking, we use file://
    # We need to get the absolute path
    import os
    cwd = os.getcwd()
    file_path = f"file://{cwd}/built_site/immersive_odyssey.html"

    print(f"Navigating to {file_path}")
    page.goto(file_path)

    # Wait for the hero section to be visible
    page.wait_for_selector('.immersive-hero')

    # Take screenshot of Hero
    page.screenshot(path="verification/immersive_hero.png")
    print("Hero screenshot taken")

    # Scroll down to trigger animations
    # Scroll to Chapter 1
    chapter1 = page.locator('#chapter-1')
    chapter1.scroll_into_view_if_needed()

    # Wait for animation (the .visible class)
    page.wait_for_selector('#chapter-1 .scrolly-content.visible')

    # Take screenshot of Chapter 1
    page.screenshot(path="verification/immersive_chapter1.png")
    print("Chapter 1 screenshot taken")

    # Scroll to Chapter 2 (Temple City)
    chapter2 = page.locator('#chapter-2')
    chapter2.scroll_into_view_if_needed()

    # Wait for animation
    page.wait_for_selector('#chapter-2 .scrolly-content.visible')

    # Take screenshot of Chapter 2
    page.screenshot(path="verification/immersive_chapter2.png")
    print("Chapter 2 screenshot taken")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1280, 'height': 800})
        verify_immersive(page)
        browser.close()
