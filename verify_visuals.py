from playwright.sync_api import sync_playwright
import time
import os

BASE_URL = "http://localhost:8000"

def verify_visuals():
    if not os.path.exists("verification"):
        os.makedirs("verification")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 720})

        # 1. Verify Home Page
        print("Verifying Home Page...")
        page.goto(f"{BASE_URL}/index.html")
        page.wait_for_load_state("networkidle")

        # Scroll to trigger animations
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(2) # Wait for animations
        page.evaluate("window.scrollTo(0, 0)") # Scroll back up if needed, or take full page
        time.sleep(1)

        page.screenshot(path="verification/home_page.png", full_page=True)

        # 2. Verify Blog Index
        print("Verifying Blog Index...")
        page.goto(f"{BASE_URL}/blog.html")
        page.wait_for_load_state("networkidle")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(2)
        page.screenshot(path="verification/blog_page.png", full_page=True)

        # 3. Verify Individual Blog Post (e.g., Chausath_Yogini.html)
        print("Verifying Blog Post...")
        page.goto(f"{BASE_URL}/Chausath_Yogini.html")
        page.wait_for_load_state("networkidle")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(2)
        page.screenshot(path="verification/blog_post.png", full_page=True)

        # 4. Verify Mobile View
        print("Verifying Mobile View...")
        page.set_viewport_size({"width": 375, "height": 667})
        page.goto(f"{BASE_URL}/index.html")
        page.wait_for_load_state("networkidle")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(2)
        page.screenshot(path="verification/home_mobile.png", full_page=True)

        browser.close()
        print("Verification complete. Screenshots saved in verification/")

if __name__ == "__main__":
    verify_visuals()