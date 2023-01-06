const currentNavURL = window.location.pathname;

const navbarUL = document.getElementById('navbarList');

const activeLI = navbarUL.getElementsByClassName('active');

activeLI[0].classList.remove('active');

const navbarLI = navbarUL.querySelectorAll('li');
navbarLI.forEach((el) => {
  const a = el.querySelectorAll('a')[0];
  const aHref = a ? a.getAttribute('href') : '/ ';
  if (currentNavURL === aHref) {
    el.classList.add('active');
  }
});

const btn_animate = $('#contact_link');
btn_animate.click((e) => {
  $('html, body').animate(
    {
      scrollTop: $('#footer-card').offset().top,
    },
    'slow',
  );
});

/* $('.search-container').hover(() => {
  if (window.matchMedia('(max-width: 311px)').matches) {
    $('.search-box').css({ width: '110px', 'background-color': '#f3f3f3' });
  } else {
    $('.search-box').css({ width: '160px', 'background-color': '#f3f3f3' });
  }
},
() => {
  if (!$('.search-box').is(':focus')) {
    $('.search-box').css({ width: '0px', 'background-color': '#f3f3f300' });
  }
});

$('#searchBox').blur(() => {
  $('.search-box').css({ width: '0px', 'background-color': '#f3f3f300' });
}); */

/* search bar implementation */

async function search(data) {
  window.location.replace(`/search?#gsc.tab=0&gsc.q=${data}&gsc.sort`);
}

$('#searchButton').on('click', (e) => {
  if ($('#searchBox').val()) {
    postHistory(cookieDetail._id, `Search - ${$('#searchBox').val()}`);
    search($('#searchBox').val());
  }
});

$('#searchBox').on('keydown', (el) => {
  if (el.keyCode == 13) {
    if (el.target.value) {
      postHistory(cookieDetail._id, `Search - ${el.target.value}`);
      search(el.target.value);
    }
  }
});

if (window.matchMedia('(max-width: 990px)').matches) {
  $('#navbarList li:eq(0)').before($('#navbarList li:eq(6)'));
}
