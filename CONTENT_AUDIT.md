# Comprehensive Content Audit Document

## 1. Executive Summary

This audit encompasses 16 unique content files found in the `Blog/raw` and `Blog/research` directories. The content covers the historical, cultural, and spiritual aspects of Odisha, specifically focusing on temples, myths, and the "Odisha Sacred Odyssey".

Total Files: 16 (excluding temp file)
Total Word Count: ~65,000 words
Format: Markdown
Visual Assets: Currently 0 images embedded, but multiple placeholder suggestions (e.g., `[🖼️ Image Suggestion: ...]`).
Citations: Extensively used `<sup>` tags (HTML style) for footnotes in `Blog/research` files.

## 2. Content Inventory Checklist

### Files & Word Counts

| Filename | Location | Word Count | Content Type |
| :--- | :--- | :--- | :--- |
| **odisha_sacred_odyssey.md** | `Blog/raw/` | 2,834 | Itinerary / Overview |
| **Jai Jagannath.md** | `Blog/raw/` | 7,788 | Personal Narrative / Travelogue |
| **Chausath Yogini.md** | `Blog/research/` | 5,889 | Historical Monograph |
| **Cuttack Chandi Shakti Peetha.md** | `Blog/research/` | 4,572 | Historical Monograph |
| **Sri Jagannath Temple Complex** | `Blog/research/` | 5,192 | Architectural/Theological Analysis |
| **ram mandir.md** | `Blog/research/` | 5,263 | Architectural/Socio-Urban Analysis |
| **subhash_chandra_bose_museum.md** | `Blog/research/` | 3,576 | Curatorial/Historical Analysis |
| **Maa Biraja Shakti Peetha.md** | `Blog/research/` | 5,319 | Theological Monograph |
| **Chhatia Bata.md** | `Blog/research/` | 4,729 | Ethnographic/Theological Report |
| **jain_temple_caves.md** | `Blog/research/` | 4,823 | Archaeological Monograph |
| **lingaraj_temple.md** | `Blog/research/` | 5,141 | Historical Monograph |
| **The Rajarani Temple.md** | `Blog/research/` | 4,510 | Architectural Monograph |
| **puri_jagannath_temple.md** | `Blog/research/` | 397 | Brief Research Notes |
| **Konark Sun Temple.md** | `Blog/research/` | 5,523 | Analytical Report |
| **THE MIRROR OF THE SOUL** | `Blog/research/` | 1,674 | Philosophical Essay |
| **Parashurameshwar Temple.md** | `Blog/research/` | 4,291 | Architectural Monograph |

### Content Features

-   **Footnotes:** The `research` files extensively use HTML superscript tags `<sup>1</sup>`, `<sup>2</sup>`, etc., for citations. These must be preserved and rendered correctly.
-   **Images:** No actual image files are embedded. There are placeholder texts like `> **[🖼️ Image Suggestion: ...]**` in `Jai Jagannath.md`. These should be styled as placeholders or "Image Missing" blocks if no images are provided.
-   **Links:** A few files contain external links (e.g., Wikipedia, Reddit, Journals).
-   **Formatting:** Standard Markdown (headers, bold, italics, blockquotes, lists).
-   **Metadata:** No frontmatter found. Titles are usually the first header.

## 3. Master Content Map

### Thematic Clusters

1.  **Foundational/Overview:**
    -   `odisha_sacred_odyssey.md` (The Itinerary)
    -   `Jai Jagannath.md` (The Journey)
    -   `THE MIRROR OF THE SOUL` (The Philosophy)

2.  **The Jagannath Cult & Puri:**
    -   `Sri Jagannath Temple Complex`
    -   `puri_jagannath_temple.md` (Supplementary)
    -   `Chhatia Bata.md` (Prophecy related to Jagannath)

3.  **The Temple City (Bhubaneswar):**
    -   `lingaraj_temple.md` (Ekamra Kshetra)
    -   `The Rajarani Temple.md`
    -   `Parashurameshwar Temple.md`
    -   `ram mandir.md` (Modern addition)
    -   `jain_temple_caves.md` (Udayagiri/Khandagiri)

4.  **Shakti Peethas & Tantra:**
    -   `Chausath Yogini.md` (Tantra/Yoginis)
    -   `Cuttack Chandi Shakti Peetha.md`
    -   `Maa Biraja Shakti Peetha.md` (Jajpur)

5.  **Sun Temple:**
    -   `Konark Sun Temple.md`

6.  **Historical/Museum:**
    -   `subhash_chandra_bose_museum.md`

### Natural Reading Pathway

1.  **Start:** `odisha_sacred_odyssey.md` (Plan the trip)
2.  **Experience:** `Jai Jagannath.md` (Follow the traveler)
3.  **Deep Dive (Research):** Link out to specific research files from the narrative or a "Knowledge Base" section.
    -   *Example:* When the narrative mentions Lingaraj, link to `lingaraj_temple.md`.

## 4. Preservation Strategy (Zero Loss)

-   **Headings:** `<h1>` to `<h6>` based on Markdown `#`.
-   **Text:** Preserve all text including "Image Suggestion" blocks (maybe style them as distinct notes).
-   **Citations:** Convert `<sup>X</sup>` to clickable footnotes or tooltips. Since the source text doesn't always have a corresponding reference list at the bottom (need to check if the reference text exists or just the numbers), we need to handle this.
    -   *Observation:* The grep showed `<sup>` tags but I didn't verify if there's a reference list at the end of each file. I need to check `lingaraj_temple.md` or others for the actual references.
-   **Files without extension:** Treat `Sri Jagannath Temple Complex` and `THE MIRROR OF THE SOUL` as Markdown.

### Action Item: Verify Reference Lists
I need to check if the `research` files contain the actual bibliography/references corresponding to `<sup>` numbers.
