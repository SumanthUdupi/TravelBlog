import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        file_path = os.path.abspath("index.html")
        page.goto(f"file://{file_path}")

        print(f"Opened {file_path}")

        page.wait_for_timeout(1000)

        # Scroll to the bottom to trigger observers for Site Index
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(2000) # Wait for animation

        # Screenshot
        screenshot_path = "verification/screenshot.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run()
