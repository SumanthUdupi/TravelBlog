import { getUserBookmarks, addBookmark, removeBookmark, isBookmarked } from '../lib/services/userService';
import { getContent } from '../content/enhanced-copy';

export async function setupBookmarkButtons() {
  const bookmarkButtons = document.querySelectorAll('[data-bookmark-id]');

  const user = await getCurrentUser();
  if (!user) return;

  for (const btn of bookmarkButtons) {
    const itemId = btn.dataset.bookmarkId;
    const itemType = btn.dataset.bookmarkType || 'entry';

    const { isBookmarked: bookmarked } = await isBookmarked(user.id, itemId, itemType);

    updateBookmarkButton(btn, bookmarked);

    btn.addEventListener('click', async () => {
      if (bookmarked) {
        const { error } = await removeBookmark(itemId);
        if (!error) {
          bookmarked = false;
          updateBookmarkButton(btn, false);
          showNotification(getContent('bookmarks.removed'));
        }
      } else {
        const { error } = await addBookmark(user.id, itemId, itemType, '');
        if (!error) {
          bookmarked = true;
          updateBookmarkButton(btn, true);
          showNotification(getContent('bookmarks.added'));
        }
      }
    });
  }
}

function updateBookmarkButton(btn, isBookmarked) {
  if (isBookmarked) {
    btn.classList.add('bookmarked');
    btn.setAttribute('aria-pressed', 'true');
    btn.textContent = getContent('buttons.unbookmark');
  } else {
    btn.classList.remove('bookmarked');
    btn.setAttribute('aria-pressed', 'false');
    btn.textContent = getContent('buttons.bookmark');
  }
}

export function displayUserBookmarks(container) {
  container.innerHTML = `
    <div class="bookmarks-section">
      <h2>${getContent('bookmarks.title')}</h2>
      <p>${getContent('bookmarks.description')}</p>
      <div id="bookmarks-list" class="bookmarks-list">
        <div class="loading">${getContent('messages.loading')}</div>
      </div>
    </div>
  `;

  const listContainer = document.getElementById('bookmarks-list');

  (async () => {
    const user = await getCurrentUser();
    if (!user) {
      listContainer.innerHTML = `<p>${getContent('auth.welcome')}</p>`;
      return;
    }

    const { data: bookmarks, error } = await getUserBookmarks(user.id);

    if (error || !bookmarks?.length) {
      listContainer.innerHTML = `<p>${getContent('bookmarks.empty')}</p>`;
      return;
    }

    const html = bookmarks.map(bookmark => {
      const item = bookmark.journey_entries || bookmark.sacred_sites;
      const url = bookmark.journey_entries
        ? `/entry/${item.slug}`
        : `/site/${item.slug}`;
      const title = item.title || item.name;
      const icon = bookmark.journey_entries ? '📖' : '🏛️';

      return `
        <div class="bookmark-item">
          <div class="bookmark-content">
            <span class="bookmark-icon">${icon}</span>
            <a href="${url}" class="bookmark-title">${title}</a>
            ${bookmark.notes ? `<p class="bookmark-note">${bookmark.notes}</p>` : ''}
          </div>
          <button class="bookmark-remove" data-id="${bookmark.id}">
            ${getContent('buttons.delete')}
          </button>
        </div>
      `;
    }).join('');

    listContainer.innerHTML = html;

    listContainer.querySelectorAll('.bookmark-remove').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const { error } = await removeBookmark(id);
        if (!error) {
          btn.closest('.bookmark-item').remove();
          showNotification(getContent('bookmarks.removed'));
        }
      });
    });
  })();
}

export function displayJourneyProgress(container) {
  container.innerHTML = `
    <div class="progress-section">
      <h2>${getContent('progress.title')}</h2>
      <p>${getContent('progress.description')}</p>
      <div id="progress-list" class="progress-list">
        <div class="loading">${getContent('messages.loading')}</div>
      </div>
    </div>
  `;

  const listContainer = document.getElementById('progress-list');

  (async () => {
    const user = await getCurrentUser();
    if (!user) {
      listContainer.innerHTML = `<p>${getContent('auth.welcome')}</p>`;
      return;
    }

    const { data: progress, error } = await getUserJourneyProgress(user.id);

    if (error || !progress?.length) {
      listContainer.innerHTML = `<p>${getContent('progress.empty')}</p>`;
      return;
    }

    const html = progress.map(item => `
      <div class="progress-item">
        <div class="progress-header">
          <h3>${item.entry?.title || 'Untitled Entry'}</h3>
          ${item.completed ? '<span class="completed-badge">Completed</span>' : ''}
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${item.scroll_percentage}%"></div>
        </div>
        <div class="progress-stats">
          <span>${getContent('progress.scroll_progress')}: ${item.scroll_percentage}%</span>
          <span>${getContent('progress.reading_time')}: ${formatReadingTime(item.time_spent_seconds)}</span>
        </div>
        <a href="${item.entry?.url}" class="btn btn-primary btn-sm">
          ${item.completed ? getContent('buttons.read_full') : getContent('progress.continue_reading')}
        </a>
      </div>
    `).join('');

    listContainer.innerHTML = html;
  })();
}

export async function trackReadingSession(entryId) {
  const user = await getCurrentUser();
  if (!user) return;

  let startTime = Date.now();
  let scrollPercentage = 0;

  const trackingInterval = setInterval(async () => {
    const scrollPercent = getScrollPercentage();

    if (scrollPercent > scrollPercentage) {
      scrollPercentage = scrollPercent;

      const timeSpent = Math.floor((Date.now() - startTime) / 1000);

      const { error } = await updateUserProgress(user.id, entryId, {
        scroll_percentage: scrollPercentage,
        time_spent_seconds: timeSpent,
        completed: scrollPercentage >= 90
      });

      if (error) {
        console.error('Error tracking progress:', error);
      }
    }
  }, 10000);

  return () => clearInterval(trackingInterval);
}

function getScrollPercentage() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return Math.round((winScroll / height) * 100);
}

function formatReadingTime(seconds) {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h`;
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.setAttribute('role', 'status');
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('visible');
  }, 100);

  setTimeout(() => {
    notification.classList.remove('visible');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Notification styles would be added to CSS
const notificationStyles = `
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--color-primary);
  color: var(--color-cream);
  padding: 1rem 1.5rem;
  border-radius: 4px;
  box-shadow: var(--shadow-rustic);
  opacity: 0;
  transform: translateY(20px) translateX(20px);
  transition: all 300ms ease-out;
  z-index: 1000;
  max-width: 300px;
}

.notification.visible {
  opacity: 1;
  transform: translateY(0) translateX(0);
}

.bookmark-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--color-secondary);
  border-radius: 4px;
  margin-bottom: 1rem;
  transition: all var(--transition-base);
}

.bookmark-item:hover {
  box-shadow: var(--shadow-md);
}

.bookmark-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
}

.bookmark-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.bookmark-title {
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
}

.bookmark-note {
  font-size: 0.875rem;
  color: var(--color-muted);
  margin-top: 0.25rem;
}

.progress-item {
  padding: 1.5rem;
  border: 1px solid var(--color-secondary);
  border-radius: 4px;
  margin-bottom: 1rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.completed-badge {
  background: var(--color-success);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.progress-bar-container {
  height: 8px;
  background: var(--color-secondary);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-bar {
  height: 100%;
  background: var(--color-primary);
  transition: width 300ms ease-out;
}

.progress-stats {
  display: flex;
  gap: 2rem;
  font-size: 0.875rem;
  color: var(--color-muted);
  margin-bottom: 1rem;
}
`;
