// Responsive Navigation Menu

// Return current page filename (defaults to index.html)
function getCurrentPage() {
	const path = window.location.pathname.split('/').pop();
	return path === '' ? 'index.html' : path;
}

// Highlight active nav link
function setActiveNavLink() {
	const current = getCurrentPage();
	document.querySelectorAll('.navbar a').forEach(a => {
		a.classList.toggle('active', a.getAttribute('href') === current || a.getAttribute('href') === '/' + current);
	});
}

// Build hamburger button and wire up menu behaviors
function setupResponsiveNav() {
	const navbar = document.querySelector('.navbar');
	if (!navbar) return;

	// Create hamburger button if not present
	if (!document.querySelector('.hamburger-menu')) {
		const btn = document.createElement('button');
		btn.className = 'hamburger-menu';
		btn.setAttribute('aria-expanded', 'false');
		btn.setAttribute('aria-label', 'Toggle navigation menu');
		btn.innerHTML = '<span class="hamburger-icon">☰</span>';
		navbar.parentNode.insertBefore(btn, navbar);

		btn.addEventListener('click', () => {
			const isActive = navbar.classList.toggle('active');
			btn.classList.toggle('active', isActive);
			btn.setAttribute('aria-expanded', String(isActive));
		});

		// Close when clicking a link
		navbar.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				navbar.classList.remove('active');
				btn.classList.remove('active');
				btn.setAttribute('aria-expanded', 'false');
			});
		});

		// Close when clicking outside
		document.addEventListener('click', (e) => {
			if (!navbar.contains(e.target) && !btn.contains(e.target)) {
				navbar.classList.remove('active');
				btn.classList.remove('active');
				btn.setAttribute('aria-expanded', 'false');
			}
		});
	}
}

document.addEventListener('DOMContentLoaded', () => {
	setActiveNavLink();
	setupResponsiveNav();
  setupAccountForm();
});

/* Contact form validation (used by contact.html onsubmit)
   Returns true to allow submission, false to block. */
function validateForm() {
  const name = (document.getElementById('name') || {}).value || '';
  const email = (document.getElementById('email') || {}).value || '';
  const message = (document.getElementById('message') || {}).value || '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.trim().length < 2) {
    alert('Please enter your full name.');
    return false;
  }
  if (!emailRegex.test(email.trim())) {
    alert('Please enter a valid email address.');
    return false;
  }
  if (message.trim().length < 5) {
    alert('Please enter a message (at least 5 characters).');
    return false;
  }

  // If you want to actually submit the form via AJAX, do it here.
  alert('Your message has been sent!');
  return true;
}

/* Account form validation: validates fields inside .account-container */
function setupAccountForm() {
  const container = document.querySelector('.account-container');
  if (!container) return;

  const username = container.querySelector('#username');
  const email = container.querySelector('#email');
  const password = container.querySelector('#password');
  const btn = container.querySelector('button');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function clearErrors() {
    container.querySelectorAll('.form-error').forEach(el => el.remove());
  }

  function showError(field, msg) {
    clearErrors();
    const err = document.createElement('div');
    err.className = 'form-error';
    err.textContent = msg;
    field.parentNode.insertBefore(err, field.nextSibling);
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    clearErrors();

    if (!username || username.value.trim().length < 3) {
      showError(username || btn, 'Username must be at least 3 characters.');
      return;
    }
    if (!email || !emailRegex.test(email.value.trim())) {
      showError(email || btn, 'Please enter a valid email address.');
      return;
    }
    if (!password || password.value.length < 6) {
      showError(password || btn, 'Password must be at least 6 characters.');
      return;
    }

    // Simulate successful update
    alert('Account updated successfully.');
  });
}
