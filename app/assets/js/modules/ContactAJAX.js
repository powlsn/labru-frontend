import $ from 'jquery';

class ContactAjax {
  constructor() {
    this.form = $('form');

    this.events();
  }

  events() {
    this.form.submit((evt) => {
      evt.preventDefault();
      let data = $(this.form).serializeArray();
      this.serializeArrayToJSON(data);
    });
  }

  serializeArrayToJSON(data) {
    console.log(data);
    const o = {};
    $.each(data, (i, v) => {
      if (v['name']) {
        if (!v['name'].push) {
          o['name'] = [v['name']];
        }
        o['name'].push(v['value'] || '');
      } else {
        o['name'] = v['value'] || '';
      }
    });
    this.submitForm(o);
  }

  submitForm(data) {
    console.log(data);
  }

  createPost() {
    console.log("create post is working!");
    $.ajax({
      url: '',
      type: 'POST',
      data: {
        name: $('#form-name').val(),
        email: $('#form-email').val(),
        subject: $('#form-subject').val(),
        message: $('#form-message').val()
      },
      success: function (json) {
        $('#form-name').val('');
        $('#form-email').val('');
        $('#form-subject').val('');
        $('#form-message').val('');
        console.log(json);
        console.log("success!");
      },
      error: function (xhr, errmsg, err) {
        console.log(xhr.status + ": " + xhr.responseText);
      }
    })
  }

}

export default ContactAjax;