
export default {


  public: process.env.STRIPE_PUBLISHABLE || 'pk_test_51IqAqcSEEyvyGRoa8kDUMFXXWppmhtYymdDV4ZQTMp5TpABz3xsI7s0qftcBOJTaIx9ZlkKX3Fs9XLBXsLDngkUb00c0hdf4Xn',

  secret: process.env.STRIPE_SECRET || 'sk_test_51IqAqcSEEyvyGRoaaW1gRJTwG7pm1SjgfT9nBnrY3G8sT0lrtSvK27XPuM4koGkqqy50v3Tb9GiiEhbmyepeUhZN00QHG4I0jn',

  webhook  : process.env.STRIPE_WEBHOOK_SECRET || "whsec_jc5nobRC7PH2giC8kuf3bRNHq8yf3b5C"


};
