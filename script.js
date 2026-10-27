// script.js

// 1. Grab references to all elements and log them
const form = document.getElementById('regform');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const genderSelect = document.getElementById('gender');
const dobInput = document.getElementById('dob');
const countryInput = document.getElementById('country');
const phoneInput = document.getElementById('phone');
const bioInput = document.getElementById('bio');

// Error elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmError');
const genderError = document.getElementById('genderError');
const dobError = document.getElementById('dobError');
const countryError = document.getElementById('countryError');
const phoneError = document.getElementById('phoneError');
const bioError = document.getElementById('bioError');

// Feedback & list elements
const successMsg = document.getElementById('successMsg');
const memberList = document.getElementById('memberList');
const emptyNote = document.getElementById('emptyNote');
const countSpan = document.getElementById('count');
const themeBtn = document.getElementById('theme');

console.log('DOM Elements Found:', {
  form, nameInput, emailInput, passwordInput, confirmPasswordInput, 
  genderSelect, dobInput, countryInput, phoneInput, bioInput, 
  successMsg, memberList, countSpan, themeBtn
});

// Helper Functions for Errors
function showError(element, message) {
  element.textContent = message;
}

function clearError(element) {
  element.textContent = '';
}

// 5. Clear errors live as the user modifies inputs
nameInput.addEventListener('input', () => clearError(nameError));
emailInput.addEventListener('input', () => clearError(emailError));
passwordInput.addEventListener('input', () => clearError(passwordError));
confirmPasswordInput.addEventListener('input', () => clearError(confirmError));
genderSelect.addEventListener('change', () => clearError(genderError));
dobInput.addEventListener('input', () => clearError(dobError));
countryInput.addEventListener('input', () => clearError(countryError));
phoneInput.addEventListener('input', () => clearError(phoneError));
bioInput.addEventListener('input', () => clearError(bioError));

// 3. Capture form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (validateForm()) {
    registerMember();
    showSuccessAndReset();
  }
});

// 4. Validate each field
function validateForm() {
  let isValid = true;

  if (!nameInput.value.trim()) {
    showError(nameError, 'Full name is required.');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    showError(emailError, 'Email is required.');
    isValid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    showError(emailError, 'Please enter a valid email address.');
    isValid = false;
  }

  if (!passwordInput.value) {
    showError(passwordError, 'Password is required.');
    isValid = false;
  } else if (passwordInput.value.length < 6) {
    showError(passwordError, 'Password must be at least 6 characters.');
    isValid = false;
  }

  if (confirmPasswordInput.value !== passwordInput.value) {
    showError(confirmError, 'Passwords do not match.');
    isValid = false;
  }

  if (!genderSelect.value) {
    showError(genderError, 'Please select a gender.');
    isValid = false;
  }

  if (!dobInput.value) {
    showError(dobError, 'Date of birth is required.');
    isValid = false;
  }

  if (!countryInput.value.trim()) {
    showError(countryError, 'Country is required.');
    isValid = false;
  }

  if (!phoneInput.value.trim()) {
    showError(phoneError, 'Phone number is required.');
    isValid = false;
  }

  return isValid;
}

// 6 & 7. Register member (DOM creation) and Update Counter
let memberCount = 0;

function registerMember() {
  // Hide empty note if it's the first member
  if (emptyNote) {
    emptyNote.style.display = 'none';
  }

  const li = document.createElement('li');
  li.innerHTML = `
    <div>
      <strong>${escapeHTML(nameInput.value)}</strong> (${escapeHTML(genderSelect.value)})<br>
      <small>${escapeHTML(emailInput.value)} | ${escapeHTML(countryInput.value)}</small>
    </div>
  `;

  // 9. Remove a member button
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove-btn'; // Optional styling hook
  removeBtn.style.marginLeft = 'auto';

  removeBtn.addEventListener('click', function () {
    li.remove();
    memberCount--;
    countSpan.textContent = memberCount;

    // Show empty note back if list is empty
    if (memberCount === 0 && emptyNote) {
      emptyNote.style.display = 'block';
    }
  });

  li.appendChild(removeBtn);
  memberList.appendChild(li);

  // Update counter
  memberCount++;
  countSpan.textContent = memberCount;
}

// 8. Show success message and reset form
function showSuccessAndReset() {
  successMsg.textContent = 'Member successfully registered!';
  successMsg.classList.remove('hidden');

  form.reset();

  setTimeout(() => {
    successMsg.textContent = '';
    successMsg.classList.add('hidden');
  }, 4000);
}

// 10. Dark Mode toggle
themeBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    themeBtn.textContent = 'Light Mode';
  } else {
    themeBtn.textContent = 'Dark Mode';
  }
});

// Security helper to prevent basic injection
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'}[tag] || tag)
  );
}