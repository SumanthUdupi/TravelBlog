from playwright.sync_api import sync_playwright

def verify_blog_content():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Listen to console messages
        page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Browser Error: {err}"))

        # Navigate to the local server
        page.goto("http://localhost:8000/index.html")

        # Scroll to the blog section
        page.locator("#blog").scroll_into_view_if_needed()

        # Wait for the blog ready signal
        print("Waiting for blog initialization...")
        try:
            # Wait for the window.__BLOG_READY__ flag to be true
            page.wait_for_function("() => window.__BLOG_READY__ === true", timeout=10000)
            print("Blog initialized!")
        except Exception as e:
            print(f"Timeout waiting for blog init: {e}")

        # Check if any blog cards exist
        count = page.locator(".blog-card").count()
        print(f"Found {count} blog cards.")

        if count == 0:
            # Check if "no results" message is shown
            no_results = page.locator(".no-results").count()
            if no_results > 0:
                print("No results message displayed.")
            else:
                print("Neither blog cards nor no-results message found. Container empty?")
                # Check container content
                container_html = page.inner_html("#blog-container")
                print(f"Container HTML: {container_html[:200]}...")

            browser.close()
            return

        # Click the first card
        print("Clicking first blog card...")
        page.click(".blog-card >> nth=0")

        # Wait for modal
        page.wait_for_selector(".blog-modal.active")
        print("Modal opened.")

        # Wait for content
        page.wait_for_timeout(1000)

        # Take screenshot of the modal
        page.screenshot(path="verification/blog_modal.png")
        print("Screenshot taken.")

        # Verify text content exists
        content = page.text_content(".blog-modal-content-text")
        # Check for content related to Lingaraj or Jagannath as in the first post
        if "Lingaraj" in content or "Jagannath" in content:
            print("Verified: Content contains expected keywords.")
        else:
            print(f"Warning: Content might be missing expected text. Content start: {content[:100]}")

        browser.close()

if __name__ == "__main__":
    try:
        verify_blog_content()
        print("Verification script ran successfully.")
    except Exception as e:
        print(f"Error: {e}")
