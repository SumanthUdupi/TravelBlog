import { signIn, signUp, signOut, getCurrentUser } from '../lib/supabase';
import { updateUserProfile, getUserProfile } from '../lib/services/userService';

export async function setupAuthUI() {
  const authButton = document.getElementById('auth-button');
  if (!authButton) return;

  const user = await getCurrentUser();

  if (user) {
    showUserMenu(user);
  } else {
    authButton.textContent = 'Sign In';
    authButton.onclick = () => showAuthModal();
  }
}

function showUserMenu(user) {
  const authButton = document.getElementById('auth-button');
  if (!authButton) return;

  authButton.textContent = 'Account';
  authButton.onclick = () => openUserMenu(user);
}

function openUserMenu(user) {
  const menu = createUserMenuModal(user);
  document.body.appendChild(menu);
  menu.showModal();
}

function createUserMenuModal(user) {
  const dialog = document.createElement('dialog');
  dialog.className = 'user-menu-modal';

  dialog.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Close menu">&times;</button>
      <h2>Account Menu</h2>
      <div class="user-info">
        <p>Logged in as: <strong>${user.email}</strong></p>
      </div>
      <ul class="user-menu-list">
        <li><a href="/profile">My Profile</a></li>
        <li><a href="/bookmarks">My Bookmarks</a></li>
        <li><a href="/journey-progress">Journey Progress</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><button class="sign-out-btn">Sign Out</button></li>
      </ul>
    </div>
  `;

  const closeBtn = dialog.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => dialog.close());

  const signOutBtn = dialog.querySelector('.sign-out-btn');
  signOutBtn.addEventListener('click', async () => {
    await signOut();
    location.reload();
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  return dialog;
}

function showAuthModal() {
  const modal = createAuthModal();
  document.body.appendChild(modal);
  modal.showModal();
}

function createAuthModal() {
  const dialog = document.createElement('dialog');
  dialog.className = 'auth-modal';

  dialog.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Close auth modal">&times;</button>
      <h2>Sacred Journey Begins Here</h2>
      <div class="auth-tabs">
        <button class="tab-btn active" data-tab="signin">Sign In</button>
        <button class="tab-btn" data-tab="signup">Create Account</button>
      </div>

      <form id="signin-form" class="auth-form active">
        <div class="form-group">
          <label for="signin-email">Email</label>
          <input type="email" id="signin-email" required>
        </div>
        <div class="form-group">
          <label for="signin-password">Password</label>
          <input type="password" id="signin-password" required>
        </div>
        <button type="submit" class="btn btn-primary">Sign In</button>
        <p class="form-hint"><a href="#forgot">Forgot password?</a></p>
      </form>

      <form id="signup-form" class="auth-form">
        <div class="form-group">
          <label for="signup-email">Email</label>
          <input type="email" id="signup-email" required>
        </div>
        <div class="form-group">
          <label for="signup-password">Password</label>
          <input type="password" id="signup-password" required minlength="8">
        </div>
        <div class="form-group">
          <label for="signup-confirm">Confirm Password</label>
          <input type="password" id="signup-confirm" required>
        </div>
        <button type="submit" class="btn btn-primary">Create Account</button>
        <p class="form-hint">By creating an account, you agree to our terms</p>
      </form>
    </div>
  `;

  const closeBtn = dialog.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => dialog.close());

  const tabBtns = dialog.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      dialog.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const formId = btn.dataset.tab + '-form';
      document.getElementById(formId).classList.add('active');
    });
  });

  const signInForm = document.getElementById('signin-form');
  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    const { error } = await signIn(email, password);
    if (error) {
      alert('Sign in failed: ' + error.message);
    } else {
      dialog.close();
      location.reload();
    }
  });

  const signUpForm = document.getElementById('signup-form');
  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }

    const { data, error } = await signUp(email, password);
    if (error) {
      alert('Sign up failed: ' + error.message);
    } else {
      alert('Account created! Check your email to confirm.');
      dialog.close();
    }
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  return dialog;
}

export function setupThemeToggle() {
  const toggleButton = document.getElementById('darkModeToggle');
  const darkModeCss = document.getElementById('darkModeCss');

  if (!toggleButton || !darkModeCss) return;

  const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

  if (isDarkMode) {
    darkModeCss.removeAttribute('disabled');
    toggleButton.setAttribute('aria-label', 'Switch to light mode');
  } else {
    darkModeCss.setAttribute('disabled', 'true');
    toggleButton.setAttribute('aria-label', 'Switch to dark mode');
  }

  toggleButton.addEventListener('click', () => {
    if (darkModeCss.hasAttribute('disabled')) {
      darkModeCss.removeAttribute('disabled');
      localStorage.setItem('darkMode', 'enabled');
      toggleButton.setAttribute('aria-label', 'Switch to light mode');
    } else {
      darkModeCss.setAttribute('disabled', 'true');
      localStorage.setItem('darkMode', 'disabled');
      toggleButton.setAttribute('aria-label', 'Switch to dark mode');
    }
  });
}
