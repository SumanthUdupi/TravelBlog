from playwright.sync_api import sync_playwright, expect

def verify_timeline():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the page served by the local server
        page.goto("http://localhost:8000/odisha_sacred_odyssey.html")

        # Wait for the timeline container to be visible
        expect(page.locator(".timeline-container")).to_be_visible()

        # Verify there are 4 timeline events
        events = page.locator(".timeline-event")
        print(f"Found {events.count()} timeline events.")
        if events.count() != 4:
            raise Exception(f"Expected 4 timeline events, found {events.count()}")

        # Verify the content of the first event
        first_event = events.first
        expect(first_event).to_contain_text("Arrival in Bhubaneswar")

        # Take a screenshot
        page.screenshot(path="verification/final_timeline.png", full_page=True)
        print("Screenshot saved to verification/final_timeline.png")

        browser.close()

if __name__ == "__main__":
    verify_timeline()
