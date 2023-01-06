$(document).ready(() => {
  let data;
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('mouse-hover')) {
      data = `${e.target.children[0].innerHTML.trim()} - ${e.target.children[1].innerHTML.trim()}`;
    } else if (e.target.parentNode.classList.contains('mouse-hover')) {
      data = `${e.target.parentNode.children[0].innerHTML.trim()} - ${e.target.parentNode.children[1].innerHTML.trim()}`;
    }
    postHistory(cookieDetail._id, data);
  });
});
