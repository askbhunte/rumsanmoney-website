// $(document).ready(() => {

function setCookie(cname, cvalue, exdays) {
  if (exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  } else {
    document.cookie = `${cname}=${cvalue};path=/`;
  }
}

function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function eraseCookie(name) {
  setCookie(name, '', -1);
}

async function CreateNewCookie() {
  // post the client data to the backend
  return $.ajax({
    type: 'POST',
    url: '/api/v1/cookie',
  }).done((d) => d)
    .fail((e) => {
      console.log(e);
    });
}

async function checkCookie(name) {
  return $.ajax({
    type: 'GET',
    url: `/api/v1/cookie/${name}`,
  }).done((d) => d)
    .fail((e) => {
      console.log(e);
    });
}

function postHistory(cookieId, data) {
  if (data && data.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/v1/history',
      data: { cookie: cookieId, data: JSON.stringify(data) },
    });
  }
}
let cookieDetail;

async function run() {
  const cookie = getCookie('rm_user');
  if (cookie === '') {
    cookieDetail = await CreateNewCookie();
    setCookie('rm_user', cookieDetail.name);
  } else {
    const cookieName = getCookie('rm_user');
    cookieDetail = await checkCookie(cookieName);
    if (cookieDetail == null) {
      cookieDetail = await CreateNewCookie();
      setCookie('rm_user', cookieDetail.name);
    }
  }
}
run();

/* Preference section */

async function preferenceCheck() {
  const preference = getCookie('rm_preference');
  if (preference === '') {
    $('#preference-form-section').attr('style', 'display: block !important');
    $('#preference-alert').attr('style', 'display:none !important');
  } else {
    $('#preference-form-section').attr('style', 'display: none !important');
    $('#preference-alert').attr('style', 'display:block !important');
    getPrefferedCategory(preference);
  }
}
async function getPrefferedCategory(preference) {
  return $.ajax({
    type: 'POST',
    url: '/api/v1/categories/preference',
    data: { data: preference },
  }).done((d) => prefferedCategoyList(d))
    .fail((e) => {
      console.log(e);
    });
}

preferenceCheck();
function prefferedCategoyList(d) {
  return d;
}
