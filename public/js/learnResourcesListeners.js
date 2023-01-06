$(document).ready(() => {
  let data;
  const productsCard = document.getElementsByClassName('productsCard');
  Array.from(productsCard).forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('productsCard')) {
        data = `Products you may like (learn-resources) - ${e.target.children[1].innerHTML.trim()} - ${e.target.children[2].innerHTML.trim()}`;
      } else if (e.target.parentNode.classList.contains('productsCard')) {
        data = `Products you may like (learn-resources) - ${e.target.parentNode.children[1].innerHTML.trim()} - ${e.target.parentNode.children[2].innerHTML.trim()}`;
      } else if (e.target.classList.contains('img-fluid')) {
        data = `Products you may like (learn-resources) - ${e.target.parentNode.parentNode.children[1].innerHTML.trim()} - ${e.target.parentNode.parentNode.children[2].innerHTML.trim()}`;
      }
      postHistory(cookieDetail._id, data);
    });
  });

  const viewMoreBtn = document.getElementById('viewMoreBtn');
  viewMoreBtn.addEventListener('click', (e) => {
    data = 'View More - Products You May Like (learn-resources)';
    postHistory(cookieDetail._id, data);
  });
});
