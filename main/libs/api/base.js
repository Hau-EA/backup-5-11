// import countries from '@/data/countries.js'

import { isImage, resize } from '@ea-fronts/helpers/image';

export default (axios) => ({
  /* Remit */
  getCountries() {
    return axios.get(`/public/remit/countries`);
  },
  getCurrencies(countryCode, dmCode) {
    return axios.get(`/public/remit/currencies/${countryCode}/${dmCode}`);
  },
  getDeliveryMethods(countryCode) {
    return axios.get(`/public/remit/delivery-methods/${countryCode}`);
  },
  getPickupOffices(countryCode) {
    return axios.get(`/public/remit/pickup-offices/${countryCode}`);
  },
  getBranches() {
    return axios.get(`/public/remit/branches`);
  },
  getBanks(countryCode) {
    return axios.get(`/public/remit/banks/${countryCode}`); // modified to countryCode
  },
  lookupRate(countryCode, dmCode, currencyCode) {
    return axios.post(`/public/remit/rates/lookup`, {
      countryCode,
      dmCode,
      currencyCode,
    });
  },
  lookupWwRate(currencyCode) {
    return axios.get(`/public/remit/rates/worldwide/${currencyCode}`);
  },
  lookupFee(countryCode, dmCode, amount, currencyCode) {
    return axios.post(`/public/remit/fees/lookup`, {
      countryCode,
      dmCode,
      amount,
      currencyCode,
    });
  },
  lookupOriginalFee(countryCode, dmCode, amount, currencyCode) {
    return axios.post(`/public/remit/fees/lookup-original`, {
      countryCode,
      dmCode,
      amount,
      currencyCode,
    });
  },
  ifsc(bankCode) {
    return axios.get(`/public/remit/ifsc/${bankCode}`);
  },
  getEwallets(countryCode) {
    return axios.get(`/public/remit/ewallets/${countryCode}`); // modified to countryCode
  },
  /* Configs */
  getCountryConfig(countryCode) {
    return axios.get(`/public/config/${countryCode}`);
  },
  getAppUUID() {
    return axios.get(`/public/config/app-uuid`);
  },
  lookupSp(countryCode, dmCode, currencyCode) {
    return axios.post(`/public/config/sp-lookup`, {
      countryCode,
      dmCode,
      currencyCode,
    });
  },
  /* Location */
  getCities(countryCode) {
    return axios.get(`/public/remit/cities/${countryCode}`);
  },
  getSuburbs(cityId) {
    return axios.get(`/public/remit/suburbs/${cityId}`);
  },
  /* Tran */
  getTrans(page, size) {
    return axios.get(`/trans?page=${page - 1}&&size=${size}`);
  },
  getRecentTrans(size) {
    return axios.get(`/trans/recent?size=${size}`);
  },
  getTran(refNumber) {
    return axios.get(`/trans/${refNumber}`);
  },
  getEditableTran(refNumber) {
    return axios.get(`/trans/editable/${refNumber}`);
  },
  createTran(tran) {
    return axios.post(`/trans`, tran);
  },
  updateTran(refNumber, tran) {
    return axios.put(`/trans/${refNumber}`, tran);
  },
  lookupAddressFinder(payload) {
    return axios.post(
      `https://hosted.mastersoftgroup.com/harmony/rest/au/address`,
      payload,
      {
        headers: {
          Authorization:
            'Basic aGhtdC1udXh0LXN0YWdpbmc6a2tXblU5Q3YweDZrcEJRU2J3b0RXb0J6T3BOaWpVSWE=',
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': 'https://nuxt-staging.hhmt.com.au',
        },
        // withCredentials: true,
      }
    );
  },

  /* Payment */
  // Poli
  getPoliBanks() {
    return axios.get(`/payments/poli/banks`);
  },
  payPoli(refNumber) {
    const homeUrl = `${location.protocol}//${location.hostname}:${location.port}`;
    const successPath = 'tran-success';
    const failPath = 'tran';
    return axios.post(`/payments/poli/${refNumber}`, {
      homeUrl,
      successPath,
      failPath,
    });
  },
  getPoliTran(token) {
    return axios.get(`/payments/poli/${token}`);
  },
  // Wirecard
  payWirecard(refNumber) {
    const homeUrl = `${location.protocol}//${location.hostname}:${location.port}`;
    const successPath = 'tran-success';
    const failPath = 'tran';
    return axios.post(`/payments/wirecard/${refNumber}`, {
      homeUrl,
      successPath,
      failPath,
    });
  },
  // Mint payment
  payMint(
    refNumber,
    number,
    expiryMonth,
    expiryYear,
    cvc,
    holderName,
    savedForFuture
  ) {
    return axios.post(`/payments/mint/${refNumber}`, {
      number,
      expiryMonth,
      expiryYear,
      cvc,
      holderName,
      savedForFuture,
    });
  },
  processMint(refNumber, token) {
    return axios.post(`/payments/mint/process`, { refNumber, token });
  },
  // I Have Paid
  ihavepaid(refNumber) {
    return axios.get(`/payments/ihavepaid/${refNumber}`);
  },
  /* Receiver */
  getAllReceivers() {
    return axios.get(`/receivers/all`);
  },
  getReceivers(page, size) {
    return axios.get(`/receivers?page=${page - 1}&&size=${size}`);
  },
  getFavReceivers(page, size) {
    return axios.get(`/receivers/favorited?page=${page - 1}&&size=${size}`);
  },
  getReceiver(id) {
    return axios.get(`/receivers/${id}`);
  },
  createReceiver(receiver) {
    return axios.post(`/receivers`, receiver);
  },
  updateDetails(id, details) {
    return axios.put(`/receivers/${id}`, details);
  },
  deleteReceiver(id) {
    return axios.delete(`/receivers/${id}`);
  },
  /* Receiver - Record */
  getReceiverRecord(refNumber) {
    return axios.get(`/receivers/record/${refNumber}`);
  },
  /* Receiver - Contact */
  addContact(id, type, contact) {
    return axios.post(`/receivers/${id}/contact/${type}`, contact);
  },
  updateContact(id, contactId, contact) {
    return axios.put(`/receivers/${id}/contact/${contactId}`, contact);
  },
  deleteContact(id, contactId) {
    return axios.delete(`/receivers/${id}/contact/${contactId}`);
  },
  /* Receiver - Address */
  updateAddress(id, addressId, address) {
    return axios.put(`/receivers/${id}/address/${addressId}`, address);
  },
  /* Receiver - Bank */
  addBank(id, bank) {
    return axios.post(`/receivers/${id}/bank`, bank);
  },
  updateBank(id, bankId, bank) {
    return axios.put(`/receivers/${id}/bank/${bankId}`, bank);
  },
  deleteBank(id, bankId) {
    return axios.delete(`/receivers/${id}/bank/${bankId}`);
  },
  /* Receiver - pref */
  setFavorited(id, favorited) {
    return axios.get(`/receivers/${id}/fav/${favorited}`);
  },
  /* Receiver - relationship */
  updateRelationship(id, relationship) {
    return axios.post(`/receivers/${id}/relationship`, { relationship });
  },
  /* Receiver - Ewallet */
  addEwallet(id, ewallet) {
    return axios.post(`/receivers/${id}/ewallet`, ewallet);
  },
  updateEwallet(id, receiverEwalletId, ewallet) {
    return axios.put(`/receivers/${id}/ewallet/${receiverEwalletId}`, ewallet);
  },
  deleteEwallet(id, receiverEwalletId) {
    return axios.delete(`/receivers/${id}/ewallet/${receiverEwalletId}`);
  },
  /* Receiver - Verification */
  addReceiverVerification(id, verification) {
    return axios.post(`/receivers/${id}/verification`, verification);
  },
  updateReceiverVerification(id, receiverVerificationId, verification) {
    return axios.put(
      `/receivers/${id}/verification/${receiverVerificationId}`,
      verification
    );
  },
  getReceiverVerification(type, entityId) {
    return axios.get(
      `/receivers/verification?type=${type}&entityId=${entityId}`
    );
  },

  /* Profile */
  getProfile(token) {
    return axios.get(`/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  updateProfile(profile) {
    return axios.put(`/profile`, profile);
  },
  updatePassword(currentPassword, newPassword) {
    return axios.put(`/profile/password`, { currentPassword, newPassword });
  },
  getOptin() {
    return axios.get(`/profile/optin`);
  },
  saveOptin(type, optin) {
    return axios.get(`/profile/optin/${type}/${optin}`);
  },
  getRiskLevel() {
    return axios.get(`/profile/risk-level`);
  },
  getOccupation() {
    return axios.get(`/profile/occupation`);
  },
  saveOccupation(occupation) {
    return axios.put(`/profile/occupation`, occupation);
  },
  getBirthCountry() {
    return axios.get(`/profile/cob`);
  },
  saveBirthCountry(birthCountry) {
    return axios.put(`/profile/cob`, birthCountry);
  },
  /* Signup */
  getSignup(signupId) {
    return axios.get(`/public/signups/${signupId}`);
  },
  saveSignup(signup) {
    return axios.post(`/public/signups`, signup);
  },
  isExistingCustomer(firstName, otherNames, lastName, gender, dob) {
    const name = otherNames ? `${firstName} ${otherNames}` : firstName;
    return axios.post(`/public/signups/is-existing-customer`, {
      firstName: name,
      lastName,
      gender,
      dob,
    });
  },
  isUsernameValid(username) {
    return axios.post(`/public/signups/is-username-valid`, { username });
  },
  async uploadDocument(docType, file) {
    let fileUpload = file;
    if (isImage(file)) {
      fileUpload = await resize(file);
    }
    const formData = new FormData();
    formData.append('docType', docType);
    formData.append('file', fileUpload);
    // return axios.post(`/public/signups/upload`, formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // });
    return fileUpload;
  },

  /* Discount */
  applyDiscount(
    code,
    txnAmount,
    txnFee,
    countryCode,
    deliveryMethod,
    currencies
  ) {
    return axios.post(`/discounts`, {
      code,
      txnAmount,
      txnFee,
      countryCode,
      deliveryMethod,
      currencies,
    });
  },

  /* Auth */
  login(username, password) {
    return axios.post(
      `/public/login`,
      { username, password },
      { withCredentials: true }
    );
  },
  activate(token, password) {
    return axios.post(`/public/activate`, { token, password });
  },
  forgotPassword(username) {
    return axios.post(`/public/password/forgot`, { username });
  },
  resetPassword(token, password) {
    return axios.post(`/public/password/reset`, { token, password });
  },
  refreshToken() {
    return axios.get(`/auth/refresh`, { withCredentials: true });
  },
  logout() {
    return axios.post(`/public/logout`, {}, { withCredentials: true });
  },

  /* Validation */
  // validatePhone (number, countryCode) {
  //   const country = countries.find(i => i.value === countryCode)
  //   return country ? axios.post(`/public/validation/phone`, { number, country_code: country.code }) : {}
  // },
  validateAccNumber(countryCode, bankId, bankAccNumber, rFirstName, rLastName) {
    const timeout = 10000; // 10 seconds
    return axios.post(
      `/public/validation/bank-acc`,
      { countryCode, bankId, bankAccNumber, rFirstName, rLastName },
      { timeout }
    );
  },
  validateIBAN(iban) {
    return axios.get(`/public/validation/iban?value=${iban}`);
  },
  validateSWIFT(swiftCode) {
    return axios.get(`/public/validation/swift?value=${swiftCode}`);
  },
  validateRoutingNumber(routingNumber) {
    return axios.get(
      `/public/validation/routing-number?value=${routingNumber}`
    );
  },
  validateBSB(bsb) {
    return axios.get(`/public/validation/bsb?value=${bsb}`);
  },
  validateSortCode(sortCode) {
    return axios.get(`/public/validation/sort-code?value=${sortCode}`);
  },
  validateEmail(email) {
    return axios.get(`/public/validation/email?value=${email}`);
  },
  /* Money Gram */
  lookupMGFeeInfo(
    countryCode,
    dmCode,
    currencyCode,
    sendAmount,
    receiveAmount
  ) {
    return axios.post(`/mg/fee-lookup`, {
      countryCode,
      dmCode,
      currencyCode,
      sendAmount,
      receiveAmount,
    });
  },
  getFieldsForProduct(countryCode, dmCode, currencyCode, sendAmount) {
    return axios.post(`/mg/gffp`, {
      countryCode,
      dmCode,
      currencyCode,
      sendAmount,
    });
  },
  isMg(countryCode, dmCode, currencyCode) {
    return axios.post(`/mg/is-mg`, { countryCode, dmCode, currencyCode });
  },
  sendValidation(tran) {
    return axios.post(`/mg/send-validation`, tran);
  },
  stagTranx(tran) {
    return axios.post(`/mg/stag-tranx`, tran);
  },
  getStateList(countryCode) {
    return axios.get(`/public/remit/mg/states/?countryCode=${countryCode}`);
  },
  getCityList(countryCode, stateCode) {
    return axios.get(
      `/public/remit/mg/cities/?countryCode=${countryCode}&stateCode=${stateCode}`
    );
  },
  getLocationList(countryCode, stateCode, city) {
    return axios.get(
      `/public/remit/mg/agents/?countryCode=${countryCode}&stateCode=${stateCode}&city=${city}`
    );
  },
});
