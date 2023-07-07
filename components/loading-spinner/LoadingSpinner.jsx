const LoadingSpinner = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center nes__loading__spinner p-3 text-primary m-5">
        <span
          className="spinner-border spinner-border-md"
          role="status"
          aria-hidden="true"
        ></span>
      </div>
    </>
  );
};

export default LoadingSpinner;
