from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        base_url = "http://localhost:8000"

        # Verify Contact Page
        page.goto(f"{base_url}/contact.html")
        page.wait_for_timeout(1000)

        # Check Icons (SVG existence)
        icons_count = page.evaluate("document.querySelectorAll('.logo-icon svg').length")
        print(f"SVG Icons Count on Contact: {icons_count}")

        # Check Toast Styling existence
        toast_exists = page.evaluate("!!document.querySelector('.toast-notification')")
        print(f"Toast Notification Exists: {toast_exists}")

        # Check Button Styling
        btn_class = page.eval_on_selector('.submit-btn', 'el => el.className')
        print(f"Submit Button Class: {btn_class}")

        page.screenshot(path="verification/contact_page.png")

        browser.close()

if __name__ == "__main__":
    run()
