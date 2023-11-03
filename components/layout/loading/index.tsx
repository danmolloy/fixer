import LoadingHeader from "./loadingHeader";

export default function LoadingLayout() {
  return (
    <div data-testid="loading-layout">
      <LoadingHeader />
      <div data-testid="loading-body">
        <p>Loading..</p>
      </div>      
    </div>
  )
}