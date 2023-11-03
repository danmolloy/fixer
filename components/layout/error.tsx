import LoadingHeader from "./loading/loadingHeader";

export default function ErrorLayout() {
  return (
    <div data-testid="error-layout">
      <LoadingHeader />
      <div data-testid="error-body">
        <h1>Sorry, we&apos;ve encountered an error.</h1>
        <p>We have been alerted of this and will fix it as soon as possible.</p>
      </div>
    </div>
  )
}