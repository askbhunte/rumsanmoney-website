$(document).ready(() => {
  let data;
  document.addEventListener('click', (e) => {
    /* NAVBAR START */
    if (e.target.id === 'bodyClick' || e.target.tagName === 'BODY') {
      // do nothing
    } else if (e.target.classList.contains('navbar-img')) {
      data = 'Homepage';
    } else if (e.target.classList.contains('nav-link')) {
      const { text } = e.target;
      data = text.trim().split(' ')[0];
    } else if (e.target.classList.contains('dropdown-item')) {
      const str = e.target.text.trim();

      data = str.substr(str.indexOf(' ') + 1);
    }
    /* NAVBAR END */

    /* FOOTER START */
    // 1st Column
    else if (e.target.id === 'footer-rumsan') {
      data = e.target.parentNode.getAttribute('href');
    }

    // Other companies link
    else if (e.target.parentNode.parentNode && e.target.parentNode.parentNode.id === 'footer-companies') {
      data = e.target.parentNode.getAttribute('href');
    }

    // Contact Us
    else if (e.target.parentNode.parentNode.classList.contains('footer-contact-us')) {
      data = e.target.getAttribute('href');
    }

    // Follow Us
    else if (e.target.parentNode.parentNode.classList.contains('footer-follow-us')) {
      data = e.target.getAttribute('href');
    }

    // Nav Links
    else if (e.target.parentNode.parentNode.classList.contains('footer-nav-link')) {
      data = e.target.innerHTML.trim();
    }
    // Disclaimer
    else if (e.target.parentNode.classList.contains('footer-disclaimer')) {
      data = e.target.getAttribute('href');
    }

    /* FOOTER END */
    postHistory(cookieDetail._id, data);
  });
});
