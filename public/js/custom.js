$('#compare-div').hide();
$('.compare-row').empty();
$('#loader').hide();

/* scroll to top Start */
let footerOffsetHeight;
let windowHeight;
let scrollTopHeight;
let bot;
$('#btnScrollToTop').hide();
$('#btnScrollToTop').on('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});
//
/* footerOffsetHeight = $('#footer-card').offset().top;
windowHeight = $(window).height();
scrollTopHeight = $(this).scrollTop();
bot = (windowHeight + scrollTopHeight) - footerOffsetHeight + 10; */
function setData() {
  footerOffsetHeight = $('#footer-card').offset().top;
  windowHeight = $(window).height();
  scrollTopHeight = $(this).scrollTop();
  bot = (windowHeight + scrollTopHeight) - footerOffsetHeight + 10;
}
function mobileView(windowHeight, scrollTopHeight, footerOffsetHeight) {
  if ($(window).width() < 600) {
    if ((windowHeight + scrollTopHeight) >= footerOffsetHeight) {
      if ($('#compare-div').length && $('#compare-div').css('display') == 'none') {
        $('#btnScrollToTop').css('bottom', 10);
      }
      if ($('#compare-div').length && $('#compare-div').css('display') != 'none') {
        $('#btnScrollToTop').css('bottom', 110);
      } else {
        $('#btnScrollToTop').css('bottom', 10);
      }
    } else {
      if ($('#compare-div').length && $('#compare-div').css('display') == 'none') {
        $('#btnScrollToTop').css('bottom', 10);
      }
      if ($('#compare-div').length && $('#compare-div').css('display') != 'none') {
        $('#btnScrollToTop').css('bottom', 110);
      } else {
        $('#btnScrollToTop').css('bottom', 10);
      }
    }
  }
}
//
$(document).ready(function () {
  $(window).scroll(() => {
    if ($(this).scrollTop() > 700) {
      $('#btnScrollToTop').show();
    } else {
      $('#btnScrollToTop').hide();
    }
    setData();
    mobileView(windowHeight, scrollTopHeight, footerOffsetHeight);
    if ($(window).width() >= 600) {
      if ((windowHeight + scrollTopHeight) >= footerOffsetHeight) {
        if ($('#compare-div').css('display') == 'none') {
          $('#btnScrollToTop').css('bottom', bot);
        }
      } else if ($('#compare-div').css('display') == 'none') {
        $('#btnScrollToTop').css('bottom', 10);
      }
    }
    if ($(window).width() >= 768) {
      if ((windowHeight + scrollTopHeight) >= footerOffsetHeight) {
        if ($('#compare-div').css('display') == 'none') {
          $('#btnScrollToTop').css('bottom', bot);
        } else {
          $('#btnScrollToTop').css('bottom', bot);
        }
      } else if ($('#compare-div').css('display') == 'none') {
        $('#btnScrollToTop').css('bottom', 10);
      } else {
        $('#btnScrollToTop').css('bottom', 10);
      }
    }
    if ($(window).width() >= 1200) {
      if ((windowHeight + scrollTopHeight) >= footerOffsetHeight) {
        if ($('#compare-div') && $('#compare-div').css('display') == 'none') {
          $('#btnScrollToTop').css('bottom', bot);
        } else {
          $('#btnScrollToTop').css('bottom', bot);
        }
      } else if ($('#compare-div') && $('#compare-div').css('display') == 'none') {
        $('#btnScrollToTop').css('bottom');
      } else {
        $('#btnScrollToTop').css('bottom', 10);
      }
    }
  });
});
/* scroll to top End */

/* Compare Part Start */
$('#compare-div').hide();
let compareCounter = 0;
let compareId = [];
let compareName = [];
function addToCompare(checkbox, pLogo) {
  if (checkbox.checked) {
    compareCounter++;

    if (compareCounter > 3) {
      $('#compare_button').attr('disabled', true);
      /* console.log(checkbox.id);
      $(`#${checkbox.id}`).attr('disabled', true);
      $(`#alert-${checkbox.id}`).show(); */
    } else {
      $('#compare-div').show();
      setData();
      mobileView();
      $('#compare_button').attr('disabled', false);
      compareId.push(checkbox.id);
      compareName.push(checkbox.value);
      $('.compare-row').append(`
         <div class="col-xs-4 col-sm-4 col-md-4 compare-footer-card-container mob-w-4" id="compare-${checkbox.id}">
         <div class="compare-footer-card">
           <div class="row">
             <div class="col-xs-4 col-sm-4 col-md-4 mob-w-12">
               <div class="compare-footer-img-container">
                 <img src="${pLogo}" onerror="this.onerror=null;this.src='https://assets.rumsan.com/askbhunte/assets/bhunte.png';" alt="${checkbox.value}">
                 </div>
               </div>
               <div class="col-xs-8 col-sm-8 col-md-8 mob-w-12">
                 <p class="product-name" id="first-text">${checkbox.value}</p>
               </div>
             </div>
           </div>
           <button class="btn-remove" id="remove-${checkbox.id}" value="${checkbox.id}" onClick="removeItem(this)">
             <i class="material-icons mr-1">
               cancel
             </i>
           </button>
         </div>
       `);
      setData();
      mobileView(windowHeight, scrollTopHeight, footerOffsetHeight);
      if (compareCounter == 3) {
        currentLoanData.forEach((el) => {
          if ($(`#${el._id}`)[0].checked) {
            $(`#${el._id}`).attr('disabled', false);
          } else {
            $(`#${el._id}`).attr('disabled', true);
            $(`#alert-${el._id}`).show();
          }
        });
      }
    }
  } else {
    compareCounter--;
    const index = compareId.indexOf(checkbox.id);
    if (index > -1) {
      compareId.splice(index, 1);
      compareName.splice(index, 1);
    }
    $(`#compare-${checkbox.id}`).remove();
    if (compareCounter == 0) {
      $('#compare-div').hide();
      setData();
      mobileView(windowHeight, scrollTopHeight, footerOffsetHeight);
    }
    if (compareCounter < 3) {
      /* $('#compare_button').attr("disabled", false); */
      currentLoanData.forEach((el) => {
        if ($(`#${el._id}`)[0].checked) {
          $(`#${el._id}`).attr('disabled', false);
        } else {
          $(`#${el._id}`).attr('disabled', false);
          $(`#alert-${el._id}`).hide();
        }
      });
    }
  }
  if (compareCounter > 0) {
    $('#compare-div').show();
  }

  /* if ($('#compare-div').css("display") == "none") {
    if ((windowHeight + scrollTopHeight) >= footerOffsetHeight) {
      $('#btnScrollToTop').css('bottom', 205);
    }
    else {
      $('#btnScrollToTop').css('bottom', 10);
    }
  }
  else {
    $('#btnScrollToTop').css("bottom", $('#compare-div').css('height'));
  } */
}

function removeItem(el) {
  compareCounter--;
  const index = compareId.indexOf(el.value);
  if (index > -1) {
    compareId.splice(index, 1);
    compareName.splice(index, 1);
  }
  $(`#compare-${el.value}`).remove();
  $(`#${el.value}`)[0].checked = false;

  if (compareCounter == 0) {
    $('#compare-div').hide();
    setData();
    mobileView();
    /* if ((windowHeight + scrollTopHeight) >= footerOffsetHeight) {
      $('#btnScrollToTop').css("bottom", 205);
    }
    else {
      $('#btnScrollToTop').css("bottom", 10);
    } */
  }
  if (compareCounter < 3 && compareCounter > 0) {
    currentLoanData.forEach((el) => {
      if ($(`#${el._id}`)[0].checked) {
        $(`#${el._id}`).attr('disabled', false);
      } else {
        $(`#${el._id}`).attr('disabled', false);
        $(`#alert-${el._id}`).hide();
      }
    });
    /*
    $('#btnScrollToTop').css("bottom", $('#compare-div').css('height')); */
  }
}

$('#compare_button').on('click', () => {
  window.location.href = `/compare?product_one=${compareId[0] ? compareId[0] : ''}&product_two=${compareId[1] ? compareId[1] : ''}&product_three=${compareId[2] ? compareId[2] : ''}`;
});
/* Compare Part End */

/* CATEGORIES SELECT IN DESKTOP VIEW IN LOAN / SAVINGS / INSURANCE PAGE START */

function loanListBtn(clickedBtn, category) {
  location.replace(`http://https://loanman.askbhunte.com/${category}?type=${clickedBtn.innerHTML.trim()}`);

  const loanListBtns = document.getElementsByClassName('loan-list');

  const activeBtn = loanListBtns[0].getElementsByClassName('active');

  activeBtn[0] ? activeBtn[0].classList.remove('active') : null;

  clickedBtn.classList.add('active');
}

function aloanListBtn(clickedBtn, category) {
  hasMore = true;
  const loanCard = document.getElementById('loanCard');

  compareCounter = 0;
  compareId = [];
  compareName = [];
  $('#compare-div').hide();
  $('.compare-row').empty();

  const queryType = clickedBtn.innerHTML.trim();

  loanCard.innerHTML = '';

  let fp;
  if (category === 'insurance') {
    currentLoanData = [];
    start = 0;
    type = queryType;
    appendContent({ start: 0, ptype: queryType });
  } else if (category === 'loan') {
    currentLoanData = [];
    start = 0;
    type = queryType;
    appendContent({ start: 0, ptype: queryType });
  } else {
    currentLoanData = [];
    start = 0;
    type = queryType;
    appendContent({ start: 0, ptype: queryType });
  }

  const loanListBtns = document.getElementsByClassName('loan-list');

  const activeBtn = loanListBtns[0].getElementsByClassName('active');

  activeBtn[0] ? activeBtn[0].classList.remove('active') : null;

  clickedBtn.classList.add('active');
}
/* CATEGORIES SELECT IN DESKTOP VIEW IN LOAN / SAVINGS / INSURANCE PAGE END */

/* CATEGORIES LIST SELECT IN MOBILE VIEW IN LOAN AND SAVINGS PAGE START */
$('#loan-list-select').on('change', function () {
  hasMore = true;
  const loanCard = document.getElementById('loanCard');
  const value = $(this).val();
  const catType = $(this).find('option:selected').attr('type');
  loanCard.innerHTML = '';
  type = value;

  compareCounter = 0;
  compareId = [];
  compareName = [];
  $('#compare-div').hide();
  $('.compare-row').empty();

  if (catType === 'loan') {
    currentLoanData = [];
    start = 0;
    appendContent({ start: 0, ptype: value });
  } else if (catType === 'savings') {
    currentLoanData = [];
    start = 0;
    appendContent({ start: 0, ptype: value });
  }
});
/* CATEGORIES LIST SELECT IN MOBILE VIEW IN LOAN AND SAVINGS PAGE END */

/* CATEGORIES LIST SELECT IN MOBILE VIEW IN INSURANCE PAGE START */
$('#loan-list-select-insurance').on('change', function () {
  hasMore = true;
  const value = $(this).val();
  loanCard.innerHTML = '';
  type = value;

  compareCounter = 0;
  compareId = [];
  compareName = [];
  $('#compare-div').hide();
  $('.compare-row').empty();

  currentLoanData = [];
  start = 0;
  appendContent({ start: 0, ptype: value });
});
/* CATEGORIES LIST SELECT IN MOBILE VIEW IN INSURANCE PAGE END */
