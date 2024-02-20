module.exports = {
  get loc_SCCAuth_txtEmail() {
    return $(`//input[@type= "email"]`);
  },
  get loc_SCCAuth_txtPassword() {
    return $(`//input[@type= "password"]`);
  },
  get loc_SCCAuth_btnLogin() {
    return $(`//input[@type= "submit"]`);
  },
  get loc_SCCAuth_btnNext() {
    return $('//input[@type="submit"]');
  },
};
