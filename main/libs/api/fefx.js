export default (axios) => ({
  // OLD API - /feol/
  getSellCurrencies() {
    return axios.get(`/swift/currencies/sell`);
  },
  getBuyCurrencies() {
    return axios.get(`/swift/currencies/buy`);
  },
  getRate(exchangeCode, currencyCode) {
    return axios.get(`/swift/rate/${exchangeCode}/${currencyCode}`);
  },
});
