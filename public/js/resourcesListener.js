$(document).ready(() => {
  let data;
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('listenBtn')) {
      data = e.target.parentNode.children[0].innerHTML.trim();
    }
    postHistory(cookieDetail._id, data);
  });
});
