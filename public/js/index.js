/* carousel change Start */

function changeCarousel(name) {
  let category;
  if (name.includes('Loan')) {
    category = 'loan';
  } else if (name.includes('Savings')) {
    category = 'savings';
  } else if (name.includes('Insurance')) {
    category = 'insurance';
  }
  const filteredName = featured.filter((el) => el.name === name);
  const tempBG = $('#findProdContainer').css('background-image');
  $('#sliderWrap').css({
    'background-image': tempBG,
    'background-size': 'cover',
    'background-repeat': 'no-repeat',
    'background-position': '50% 50%',
  });

  $('#sliderWrapper').empty();
  $('#sliderWrapper').append(`
    <div id="findProdContainer" class="container-fluid slider-bg"
    style="background-position: 50% 50%; background-image:linear-gradient(to bottom, rgba(18,42, 66, .55), rgba(18,42, 66, .55)), url(${filteredName[0].image}), url('https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')">
      <div class="container">
        <div class="row">
          <div class="col-md-9">
            <div id="pTitle" class="prodtype-title">
            ${filteredName[0].name ? filteredName[0].name : ''}
            </div>
            <div id="pDesc" class="prod-desc">
            ${filteredName[0].sub_head ? filteredName[0].sub_head : ''}
            </div>
            <div class="slider-btn-wrapper">
              <button type="button" data-name="${filteredName[0].name}" class="btn btn-primary btn-curve find-products-btn btn-animate"
               onclick="window.open('/${category}?type=${filteredName[0].name}','_self')">Find Products</button>
            </div>
          </div>
          <div class="col-md-3 loan-names-container">
            <div id="loanNames" class="loan-names">            
            </div>
          </div>
        </div>
      </div>
    </div>    
  `);
  featured.forEach((el) => {
    $('#loanNames').append(`  
      <button type="button" class="btn-transparent" onclick="changeCarousel('${el.name}')">
        ${el.name}
      </button>
      <div class="underline"></div>    
    `);
  });
}
/* Carousel Change End */

/* Analaytics Track Start */

$(document).ready(() => {
  document.addEventListener('click', (e) => {
    let data;
    if (e.target.id === 'bodyClick') {
      // do nothing
    } else if (e.target && e.target.parentNode.id === 'loanNames') {
      data = e.target.innerHTML.trim();
    } else if ($(e.target).hasClass('find-products-btn')) {
      data = e.target.getAttribute('data-name');
    } else if ($(e.target).hasClass('exp')) {
      data = e.target.parentNode.children[0].innerHTML.trim();
    } else if ($(e.target.parentNode).hasClass('btn-div')) {
      data = 'Explore Popular Products';
    }
    postHistory(cookieDetail._id, data);
  });
});

/* Analaytics Track End */
