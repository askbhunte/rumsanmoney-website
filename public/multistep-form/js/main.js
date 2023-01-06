const form = $('#form-register');
$('#form-total').steps({
  headerTag: 'h2',
  bodyTag: 'section',
  transitionEffect: 'fade',
  enableAllSteps: true,
  autoFocus: true,
  enableKeyNavigation: false,
  enableFinishButton: false,
  transitionEffectSpeed: 200,
  titleTemplate: '<div class="title">#title#</div>',
  labels: {
    previous: 'Back',
    next: '<i class="zmdi zmdi-chevron-right"></i>',
    finish: '<i class="zmdi zmdi-chevron-right"></i>',
    current: '',
  },
  onInit(event, current) {
    $('.actions > ul > li:first-child').attr('style', 'visiblity:none');
    $('.actions > ul > li:first-child > a').attr('style', 'cursor:default');
  },
  onStepChanging(event, currentIndex, newIndex) {
    form.validate().settings.ignore = ':disabled,:hidden';
    return form.valid();
  },
  onStepChanged(event, currentIndex, priorIndex) {
    const fullname = `${$('#full_name').val()}`;
    const gender = $('form input[type=radio]:checked').val();
    const phone = $('#phone').val();
    const email = $('#email').val();
    const closestbranch = $('#closest_branch').val();
    let address = '';
    if ($('#province').val()) {
      address += `Province number: ${$('#province').val()}, `;
    }
    if ($('#district').val()) {
      address += `District: ${$('#district').val()}, `;
    }
    if ($('#municipality').val()) {
      address += `Municipality/Rural Municipality: ${$(
        '#municipality',
      ).val()}, `;
    }
    if ($('#street').val()) {
      address += `Street: ${$('#street').val()}, `;
    }
    if ($('#ward').val()) {
      address += `Ward number: ${$('#ward').val()}, `;
    }
    if ($('#houseno').val()) {
      address += `House number: ${$('#houseno').val()}`;
    }
    let citizenshipinformation = '';
    if ($('#citizenship_number').val()) {
      citizenshipinformation += `Citizenship Number: ${$(
        '#citizenship_number',
      ).val()}, `;
    }
    if ($('#issuing_date').val()) {
      citizenshipinformation += `Issuing Date: ${$('#issuing_date').val()}, `;
    }
    if ($('#issuing_district').val()) {
      citizenshipinformation += `Issuing District: ${$(
        '#issuing_district',
      ).val()} `;
    }
    let date_of_birth = '';
    if ($('#birth_bs').val()) {
      date_of_birth += `DOB in BS: ${$('#birth_bs').val()}, `;
    }
    if ($('#birth_ad').val()) {
      date_of_birth += `DOB in AD: ${$('#birth_ad').val()} `;
    }

    let family_information = '';
    if ($('#spouse').val()) {
      family_information += `Spouse's Name: ${$('#spouse').val()}, `;
    }
    if ($('#father').val()) {
      family_information += `Father's Name: ${$('#father').val()}, `;
    }
    if ($('#mother').val()) {
      family_information += `Mother's Name: ${$('#mother').val()}, `;
    }
    if ($('#grand_father').val()) {
      family_information += `Grand Father's Name: ${$(
        '#grand_father',
      ).val()}, `;
    }
    if ($('#son').val()) {
      family_information += `Son's Name: ${$('#son').val()}, `;
    }
    if ($('#daughter').val()) {
      family_information += `Daughter's Name: ${$('#daughter').val()} `;
    }
    $('#fullname-val').text(fullname);
    $('#gender-val').text(gender);
    $('#phone-val').text(phone);
    $('#email-val').text(email);
    $('#closest-branch').text(closestbranch);
    $('#address-val').text(address);
    $('#citizenship-information').text(citizenshipinformation);
    $('#date-of-birth').text(date_of_birth);
    $('#family-information').text(family_information);
    return true;
  },
  onFinished(event, currentIndex) {
    alert('Submitted!');
  },
});
