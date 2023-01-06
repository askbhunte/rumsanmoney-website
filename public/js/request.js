const step = document.getElementsByClassName("step");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const form = document.getElementsByTagName("form")[0];

form.onsubmit = () => {
  const forms = document.getElementsByClassName("needs-validation");
  Array.prototype.filter.call(forms, (test) => {
    if (test.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      const formData = rs.form.get("#form-wrapper");
      if (!formData.full_name) {
        $(".invalid-name").removeClass("d-none");
      }
      if (!formData.email) {
        $(".invalid-email").removeClass("d-none");
      }
      if (!formData.phone) {
        $(".invalid-phone").removeClass("d-none");
      }
      if (!formData.age_group) {
        $(".invalid-age").removeClass("d-none");
      }
      if (!formData.annual_income) {
        $(".invalid-income").removeClass("d-none");
      }
      if (!formData.foreign_employment) {
        $(".invalid-foreign").removeClass("d-none");
      }
      if (!formData.gender) {
        $(".invalid-gender").removeClass("d-none");
      }
      if (!formData.location) {
        $(".invalid-location").removeClass("d-none");
      }
      if (!formData.occupation) {
        $(".invalid-occupation").removeClass("d-none");
      }
      $("#validation-fail").removeClass("d-none");
    }
    test.classList.add("was-validated");
    if (test.checkValidity() === true) {
      event.preventDefault();
      let formData = rs.form.get("#form-wrapper");
      formData.created_at = new Date();
      formData.created_at = moment(formData.created_at).format("llll");
      formData = JSON.stringify(formData);
      setCookie("rm_preference", formData);
      const cookieName = getCookie("rm_user");
      updatePreference(cookieName, formData);
      return false;
    }
  });
};
async function updatePreference(cookieName, formData) {
  return $.ajax({
    type: "POST",
    url: `/api/v1/cookie/${cookieName}`,
    data: { data: formData },
  })
    .done((d) => d, (window.location.href = "/preference"))
    .fail((e) => {
      console.log(e);
    });
}
let current_step = 0;
const stepCount = 6;
step[current_step].classList.add("d-block");
if (current_step == 0) {
  prevBtn.classList.add("d-none");
  submitBtn.classList.add("d-none");
  nextBtn.classList.add("d-inline-block");
}

const progress = (value) => {
  document.getElementsByClassName("progress-bar")[0].style.width = `${value}%`;
};

nextBtn.addEventListener("click", () => {
  const formData = rs.form.get("#form-wrapper");
  if (!formData.full_name) {
    $(".invalid-name").removeClass("d-none");
  } else if (!formData.email) {
    $(".invalid-email").removeClass("d-none");
  } else if (!formData.phone) {
    $(".invalid-phone").removeClass("d-none");
  } else {
    current_step = 1;
    const previous_step = current_step - 1;
    if (current_step > 0 && current_step <= stepCount) {
      prevBtn.classList.remove("d-none");
      prevBtn.classList.add("d-inline-block");
      step[current_step].classList.remove("d-none");
      step[current_step].classList.add("d-block");
      step[previous_step].classList.remove("d-block");
      step[previous_step].classList.add("d-none");
      if (current_step == stepCount) {
        submitBtn.classList.remove("d-none");
        submitBtn.classList.add("d-inline-block");
        nextBtn.classList.remove("d-inline-block");
        nextBtn.classList.add("d-none");
      }
    } else if (current_step > stepCount) {
      form.onsubmit = () => true;
    }
    progress((100 / stepCount) * current_step);
  }
  if (!formData.age_group) {
    $(".invalid-age").removeClass("d-none");
  } else {
    current_step = 2;
    const previous_step = current_step - 1;
    if (current_step > 0 && current_step <= stepCount) {
      prevBtn.classList.remove("d-none");
      prevBtn.classList.add("d-inline-block");
      step[current_step].classList.remove("d-none");
      step[current_step].classList.add("d-block");
      step[previous_step].classList.remove("d-block");
      step[previous_step].classList.add("d-none");
      if (current_step == stepCount) {
        submitBtn.classList.remove("d-none");
        submitBtn.classList.add("d-inline-block");
        nextBtn.classList.remove("d-inline-block");
        nextBtn.classList.add("d-none");
      }
    } else if (current_step > stepCount) {
      form.onsubmit = () => true;
    }
    progress((100 / stepCount) * current_step);
  }
  if (!formData.occupation) {
    $(".invalid-occupation").removeClass("d-none");
  } else {
    current_step = 3;
    const previous_step = current_step - 1;
    if (current_step > 0 && current_step <= stepCount) {
      prevBtn.classList.remove("d-none");
      prevBtn.classList.add("d-inline-block");
      step[current_step].classList.remove("d-none");
      step[current_step].classList.add("d-block");
      step[previous_step].classList.remove("d-block");
      step[previous_step].classList.add("d-none");
      if (current_step == stepCount) {
        submitBtn.classList.remove("d-none");
        submitBtn.classList.add("d-inline-block");
        nextBtn.classList.remove("d-inline-block");
        nextBtn.classList.add("d-none");
      }
    } else if (current_step > stepCount) {
      form.onsubmit = () => true;
    }
    progress((100 / stepCount) * current_step);
  }
  if (!formData.foreign_employment) {
    $(".invalid-foreign").removeClass("d-none");
  } else {
    current_step = 4;
    const previous_step = current_step - 1;
    if (current_step > 0 && current_step <= stepCount) {
      prevBtn.classList.remove("d-none");
      prevBtn.classList.add("d-inline-block");
      step[current_step].classList.remove("d-none");
      step[current_step].classList.add("d-block");
      step[previous_step].classList.remove("d-block");
      step[previous_step].classList.add("d-none");
      if (current_step == stepCount) {
        submitBtn.classList.remove("d-none");
        submitBtn.classList.add("d-inline-block");
        nextBtn.classList.remove("d-inline-block");
        nextBtn.classList.add("d-none");
      }
    } else if (current_step > stepCount) {
      form.onsubmit = () => true;
    }
    progress((100 / stepCount) * current_step);
  }
  if (!formData.annual_income) {
    $(".invalid-income").removeClass("d-none");
  } else {
    current_step = 5;
    const previous_step = current_step - 1;
    if (current_step > 0 && current_step <= stepCount) {
      prevBtn.classList.remove("d-none");
      prevBtn.classList.add("d-inline-block");
      step[current_step].classList.remove("d-none");
      step[current_step].classList.add("d-block");
      step[previous_step].classList.remove("d-block");
      step[previous_step].classList.add("d-none");
      if (current_step == stepCount) {
        submitBtn.classList.remove("d-none");
        submitBtn.classList.add("d-inline-block");
        nextBtn.classList.remove("d-inline-block");
        nextBtn.classList.add("d-none");
      }
    } else if (current_step > stepCount) {
      form.onsubmit = () => true;
    }
    progress((100 / stepCount) * current_step);
  }
  if (!formData.location) {
    $(".invalid-location").removeClass("d-none");
  } else {
    current_step = 6;
    const previous_step = current_step - 1;
    if (current_step > 0 && current_step <= stepCount) {
      prevBtn.classList.remove("d-none");
      prevBtn.classList.add("d-inline-block");
      step[current_step].classList.remove("d-none");
      step[current_step].classList.add("d-block");
      step[previous_step].classList.remove("d-block");
      step[previous_step].classList.add("d-none");
      if (current_step == stepCount) {
        submitBtn.classList.remove("d-none");
        submitBtn.classList.add("d-inline-block");
        nextBtn.classList.remove("d-inline-block");
        nextBtn.classList.add("d-none");
      }
    } else if (current_step > stepCount) {
      form.onsubmit = () => true;
    }
    progress((100 / stepCount) * current_step);
  }
  if (!formData.gender) {
    $(".invalid-gender").removeClass("d-none");
  } else {
    current_step = 7;
    const previous_step = current_step - 1;
    if (current_step > 0 && current_step <= stepCount) {
      prevBtn.classList.remove("d-none");
      prevBtn.classList.add("d-inline-block");
      step[current_step].classList.remove("d-none");
      step[current_step].classList.add("d-block");
      step[previous_step].classList.remove("d-block");
      step[previous_step].classList.add("d-none");
      if (current_step == stepCount) {
        submitBtn.classList.remove("d-none");
        submitBtn.classList.add("d-inline-block");
        nextBtn.classList.remove("d-inline-block");
        nextBtn.classList.add("d-none");
      }
    } else if (current_step > stepCount) {
      form.onsubmit = () => true;
    }
    progress((100 / stepCount) * current_step);
  }
});

prevBtn.addEventListener("click", () => {
  $("#validation-fail").addClass("d-none");
  if (current_step > 0) {
    current_step--;
    const previous_step = current_step + 1;
    prevBtn.classList.add("d-none");
    prevBtn.classList.add("d-inline-block");
    step[current_step].classList.remove("d-none");
    step[current_step].classList.add("d-block");
    step[previous_step].classList.remove("d-block");
    step[previous_step].classList.add("d-none");
    if (current_step < stepCount) {
      submitBtn.classList.remove("d-inline-block");
      submitBtn.classList.add("d-none");
      nextBtn.classList.remove("d-none");
      nextBtn.classList.add("d-inline-block");
      prevBtn.classList.remove("d-none");
      prevBtn.classList.add("d-inline-block");
    }
  }

  if (current_step == 0) {
    prevBtn.classList.remove("d-inline-block");
    prevBtn.classList.add("d-none");
  }
  progress((100 / stepCount) * current_step);
});

$("#full_name").click(() => {
  $(".invalid-name").addClass("d-none");
});

$("#email").click(() => {
  $(".invalid-email").addClass("d-none");
});
$("#phone").click(() => {
  $(".invalid-phone").addClass("d-none");
});
$("#full_name").keypress(() => {
  $(".invalid-name").addClass("d-none");
});

$("#email").keypress(() => {
  $(".invalid-email").addClass("d-none");
});
$("#phone").keypress(() => {
  $(".invalid-phone").addClass("d-none");
});

$("input[name='age_group']").change(function () {
  if (this.checked) {
    $(".invalid-age").addClass("d-none");
  }
});
$("input[name='occupation']").change(function () {
  if (this.checked) {
    $(".invalid-occupation").addClass("d-none");
  }
});
$("input[name='occupation']").change(function () {
  if (this.checked) {
    $(".invalid-occupation").addClass("d-none");
  }
});
$("input[name='foreign_employment']").change(function () {
  if (this.checked) {
    $(".invalid-foreign").addClass("d-none");
  }
});
$("input[name='annual_income']").change(function () {
  if (this.checked) {
    $(".invalid-income").addClass("d-none");
  }
});
$("input[name='location']").change(function () {
  if (this.checked) {
    $(".invalid-location").addClass("d-none");
  }
});
$("input[name='gender']").change(function () {
  if (this.checked) {
    $(".invalid-gender").addClass("d-none");
  }
});
