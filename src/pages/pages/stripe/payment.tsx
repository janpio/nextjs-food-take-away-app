import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../../../components/stripe/CheckoutForm'
import { Main, Navbar } from '@/components'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
//@ts-ignore
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function App() {
  const [clientSecret, setClientSecret] = React.useState('')

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/stripe/stripe-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#c52b67',
    },
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <section>
      {clientSecret && (
        //@ts-ignore
        <Elements options={options} stripe={stripePromise}>
          <Navbar />
          <Main bgColorProp="sm:bg-quaternaryGrey md:bg-secondaryWhite">
            <CheckoutForm />
          </Main>
        </Elements>
      )}
    </section>
  )
}
