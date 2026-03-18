// 勤太郎シフト - Website JavaScript
(function () {
  'use strict';

  // --- Nav scroll behavior ---
  var nav = document.querySelector('.nav');
  var isAlwaysSolid = nav.classList.contains('solid') && !nav.classList.contains('transparent');

  function updateNav() {
    if (isAlwaysSolid) return; // Sub-pages keep solid nav
    if (window.scrollY > 80) {
      nav.classList.remove('transparent');
      nav.classList.add('solid');
    } else {
      nav.classList.remove('solid');
      nav.classList.add('transparent');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  if (!isAlwaysSolid) updateNav();

  // --- Mobile hamburger menu ---
  var hamburger = document.querySelector('.nav-hamburger');
  var navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    // Force solid nav when menu is open
    if (navLinks.classList.contains('open')) {
      nav.classList.remove('transparent');
      nav.classList.add('solid');
    } else {
      updateNav();
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      updateNav();
    });
  });

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();
