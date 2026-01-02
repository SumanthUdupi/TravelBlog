from playwright.sync_api import sync_playwright, expect

def verify_migration():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8000")

        # Check if main heading exists
        expect(page.locator("h1.hero-title")).to_be_visible()

        # Verify navigation to a blog post
        # Click the link for "Lingaraj Temple" (first Read More leads there based on context)
        # We can also just click a specific link if we know the text
        page.get_by_role("link", name="Read More").first.click()

        # Check if we landed on the page
        page.wait_for_load_state("networkidle")

        # Check that we have at least one article or the specific title
        # Based on previous output, "The Lingaraj Temple" is an article title
        # Let's check for "The Lingaraj Temple" heading
        expect(page.get_by_role("heading", name="The Lingaraj Temple")).to_be_visible()

        # Take a screenshot
        page.screenshot(path="verification/migration_verified.png")

        browser.close()

if __name__ == "__main__":
    verify_migration()
