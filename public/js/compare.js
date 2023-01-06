const bank_1 = document.getElementById('bank_1_select');
const bank_2 = document.getElementById('bank_2_select');
const bank_3 = document.getElementById('bank_3_select');

const product_1 = document.getElementById('product_1_select');
const product_2 = document.getElementById('product_2_select');
const product_3 = document.getElementById('product_3_select');

let b1; let b2; let b3; let p1; let p2; let
  p3;
const cardArr = [];

function check() {
  if (cardArr[0] && cardArr[1] || cardArr[0] && cardArr[2] || cardArr[1] && cardArr[2] || cardArr[0] && cardArr[1] && cardArr[2]) {
    postHistory(cookieDetail._id, cardArr);
  }
}

bank_1.addEventListener('input', () => {
  b1 = bank_1.options[bank_1.selectedIndex].text;
});

product_1.addEventListener('input', () => {
  p1 = product_1.options[product_1.selectedIndex].text;
  cardArr[0] = `c1: ${p1} - ${b1}`;
  check();
});

bank_2.addEventListener('input', () => {
  b2 = bank_2.options[bank_2.selectedIndex].text;
});

product_2.addEventListener('input', () => {
  p2 = product_2.options[product_2.selectedIndex].text;
  cardArr[1] = `c2: ${p2} - ${b2}`;
  check();
});

bank_3.addEventListener('input', () => {
  b3 = bank_3.options[bank_3.selectedIndex].text;
});

product_3.addEventListener('input', () => {
  p3 = product_3.options[product_3.selectedIndex].text;
  cardArr[2] = `c3: ${p3} - ${b3}`;
  check();
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList && e.target.classList.contains('compare-apply')) {
    if (e.target.parentNode.parentNode.id === 'card_1') {
      postHistory(cookieDetail._id, `Compare Page - ${e.target.innerHTML.trim()} - ${p1} -${b1}`);
    } else if (e.target.parentNode.parentNode.id === 'card_2') {
      postHistory(cookieDetail._id, `Compare Page - ${e.target.innerHTML.trim()} - ${p2} -${b2}`);
    } else if (e.target.parentNode.parentNode.id === 'card_3') {
      postHistory(cookieDetail._id, `Compare Page - ${e.target.innerHTML.trim()} - ${p3} -${b3}`);
    }
  }
});
