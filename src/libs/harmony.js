export const harmony = {
  initialHarmory: () => {
    window.Harmony.useEnv('https://hosted.mastersoftgroup.com');

    window.Harmony.init(
      'hhmt-nuxt-local',
      'BH6w3cJ87hAqM8kPfGhzEszbHDSI62dW',
      window.Harmony.AUSTRALIA
    );

    window.Harmony.useProtocol(window.Harmony.JSONP);
  },
  lookupAddress: (value, callback) => {
    try {
      harmony.initialHarmory();

      window.Harmony.address(
        {
          fullAddress: value,
          country: window.Harmony.AUSTRALIA,
        },
        window.Harmony.AUPAF,
        function (data) {
          if (data.status === window.Harmony.SUCCESS) {
            callback(data);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  },
  lookupPostcode: (value, callback) => {
    try {
      harmony.initialHarmory();

      window.Harmony.postcode(
        {
          postcode: value,
        },
        window.Harmony.AUPAF,
        function (data) {
          if (data.status === window.Harmony.SUCCESS) {
            callback(data);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  },
};
