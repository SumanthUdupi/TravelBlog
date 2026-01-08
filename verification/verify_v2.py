from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # Use localhost instead of file://
        base_url = "http://localhost:8000"

        # 1. Verify Home Page
        page.goto(f"{base_url}/index.html")
        page.wait_for_timeout(2000) # Wait for masonry/JS load

        # Check Title Animation (Class existence)
        title_exists = page.evaluate("!!document.querySelector('.animated-title-text')")
        print(f"Animated Title Exists: {title_exists}")

        # Check Masonry Grid
        grid_exists = page.evaluate("!!document.querySelector('.masonry-grid')")
        print(f"Masonry Grid Exists: {grid_exists}")

        page.screenshot(path="verification/home_page_v2.png")

        # 2. Verify Article Page
        page.goto(f"{base_url}/jai_jagannath.html")
        page.wait_for_timeout(1000)

        # Check Breadcrumbs
        crumbs = page.inner_text('.breadcrumbs')
        print(f"Breadcrumbs: {crumbs}")

        # Check Buttons (Stone Tablet)
        btn_class = page.eval_on_selector('#theme-toggle', 'el => el.className')
        print(f"Theme Toggle Class: {btn_class}")

        # Check Lantern Mode Toggle
        page.click('#theme-toggle')
        page.wait_for_timeout(1500) # Flare up + transition (wait longer)
        is_lantern = page.evaluate('document.body.classList.contains("lantern-mode")')
        print(f"Lantern Mode Active: {is_lantern}")

        page.screenshot(path="verification/article_lantern.png")

        # 3. Verify Mobile View
        mobile_context = browser.new_context(viewport={'width': 375, 'height': 667})
        m_page = mobile_context.new_page()
        m_page.goto(f"{base_url}/index.html")
        m_page.wait_for_timeout(1000)

        # Check Bottom Nav Visibility
        nav_display = m_page.eval_on_selector('.nav-links', 'el => window.getComputedStyle(el).display')
        nav_pos = m_page.eval_on_selector('.nav-links', 'el => window.getComputedStyle(el).bottom')
        print(f"Mobile Nav Display: {nav_display}, Position Bottom: {nav_pos}")

        m_page.screenshot(path="verification/mobile_view.png")

        browser.close()

if __name__ == "__main__":
    run()
