
export default function ProgressBar() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="w-50">
        <div className="position-relative  my-4">
          <div className="progress" style={{ height: 1 }}>
            <div
              className="progress-bar w-0"
              role="progressbar"
              // style={{ width: "0%" }}
              // aria-valuenow={50}
              // aria-valuemin={0}
              // aria-valuemax={100}
            />
          </div>
          <button
            type="button"
            className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"
            style={{ width: "2rem", height: "2rem" }}
          >
            1
          </button>
          <button
            type="button"
            className="position-absolute top-0 start-50 translate-middle btn btn-sm btn-secondary rounded-pill"
            style={{ width: "2rem", height: "2rem" }}
          >
            2
          </button>
          <button
            type="button"
            className="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill"
            style={{ width: "2rem", height: "2rem" }}
          >
            3
          </button>
        </div>
        <div className="position-relative my-8">
          <div className="progress" style={{ height: 0 }}>
            <div
              className="progress-bar"
              role="progressbar"
            />
          </div>
          <p
            className="position-absolute top-0 start-0 translate-middle"
          >
            步驟一：確認報名內容
          </p>
          <p
            className="position-absolute top-0 start-50 translate-middle"
          >
          </p>
          <p
            className="position-absolute top-0 start-100 translate-middle"
          >
          </p>
        </div>
      </div>
    </div>
  )
}