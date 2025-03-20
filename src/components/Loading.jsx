import ReactLoading from 'react-loading';

export default function Loading({ isScreenLoading }) {
  return(<>
    { isScreenLoading && (
          <div 
            className="d-flex justify-content-center align-items-center"
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 999,
            }}>
            <ReactLoading type="spin" color="#ECCA6B" width="6rem" height="6rem" />
          </div>)
        }
  </>)
}