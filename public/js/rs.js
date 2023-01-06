const rs = {};

rs.form = {
  get: form => {
    const $form = $(form);
    const unindexed_array = $form.serializeArray();
    const indexed_array = {};
    $.map(unindexed_array, (n, i) => {
      indexed_array[n.name] = n.value;
    });
    return indexed_array;
  }
};
