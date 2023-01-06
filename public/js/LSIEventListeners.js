$(document).ready(() => {
  let data;
  const compareData = [];
  document.addEventListener('click', (e) => {
    if (e.target.id === 'bodyClick') {
      // do nothing
    } else if (e.target.classList.contains('category-list')) {
      data = e.target.innerHTML.trim();
    } else if (e.target.classList.contains('learnMoreBtn')) {
      data = `Learn More - ${e.target.parentNode.getAttribute('data-product')} - ${e.target.parentNode.getAttribute('data-bank')}`;
    } else if (e.target.classList.contains('contactBankBtn')) {
      data = `Contact form - ${e.target.parentNode.getAttribute('data-product')} - ${e.target.parentNode.getAttribute('data-bank')}`;
    } else if (e.target.classList.contains('bankName')) {
      data = e.target.innerHTML.trim();
    } // else if (e.target.classList.contains('listen-checkbox')) {
    //   console.log('CheckBox:');
    //   console.log(e.target.parentNode.parentNode.getAttribute('data-bank'));
    //   console.log(e.target.parentNode.parentNode.getAttribute('data-product'));
    //   data = `${e.target.parentNode.parentNode.getAttribute('data-product')} - ${e.target.parentNode.parentNode.getAttribute('data-bank')}`;
    // }
    postHistory(cookieDetail._id, data);
  });
  const categorySelect = document.querySelector('.loan-list-select');
  categorySelect.addEventListener('input', (e) => {
    data = e.target.value;
    postHistory(cookieDetail._id, data);
  });
  const compareBtn = document.getElementById('compare_button');
  compareBtn.addEventListener('click', (e) => {
    document.querySelectorAll('.compare-footer-card-container').forEach((el) => {
      compareData.push(`${el.children[0].children[0].children[1].children[0].innerHTML.trim()}`);
    });
    postHistory(cookieDetail._id, compareData);
  });
});
