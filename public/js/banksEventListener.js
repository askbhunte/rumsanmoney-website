$(document).ready(() => {
  let data;
  document.querySelectorAll('.popular-desc').forEach((el) => {
    el.addEventListener('click', (e) => {
      data = e.target.getAttribute('alt').trim();
      postHistory(cookieDetail._id, data);
    });
  });
});
