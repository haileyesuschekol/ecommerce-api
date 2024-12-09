const fakeStripeAPI = ({ amount, currency }) => {
  const client_secret = "someRandVal"
  return { client_secret, amount }
}

module.exports = { fakeStripeAPI }
