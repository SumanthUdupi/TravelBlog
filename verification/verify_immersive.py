from playwright.sync_api import sync_playwright
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Path to the generated file
    file_path = os.path.abspath("built_site/immersive_odyssey.html")
    page.goto(f"file://{file_path}")

    # Wait for the hero section to be visible
    page.wait_for_selector(".immersive-hero")

    # Take a screenshot of the hero section
    page.screenshot(path="verification/immersive_hero.png")

    # Scroll down to the scrollytelling section
    page.locator("#narrative-start").scroll_into_view_if_needed()
    # Wait for animation (the .visible class is added by observer)
    page.wait_for_selector(".scrolly-content.visible", timeout=5000)

    # Take a screenshot of the scrollytelling section
    page.screenshot(path="verification/immersive_scrolly.png")

    # Scroll to map
    page.locator(".map-section").scroll_into_view_if_needed()
    page.screenshot(path="verification/immersive_map.png")

    # Scroll to blog grid
    page.locator("#articles").scroll_into_view_if_needed()
    # Wait for staggered animation
    page.wait_for_selector(".card.fade-in-scroll.visible", timeout=5000)
    page.screenshot(path="verification/immersive_blog.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
