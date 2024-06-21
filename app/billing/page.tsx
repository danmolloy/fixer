export default function BillingIndex() {
  return (
    <div>
      <div>
        <p>Subscription Plan</p>
      </div>
      <form data-testid="subscribe-btn" action="/billing/api/subscribe/" method="POST">
      <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={"sessionId"}
        />
      <button type="submit" role="link">
        Checkout
      </button>
    </form>
    <form data-testid="subscribe-btn" action="/billing/api/manage/" method="POST">
      <button type="submit" role="link">
        Manage Account
      </button>
    </form>
    </div>
  )
}