import './loading.indicator.scss';
import PortalProvider from "./portal.provider";

const LoadingIndicator = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <PortalProvider>
      <div className="loading-indicator">
        <span className="spinner-wrap">
          <i className="fa-spin fa fa-circle-o-notch fa-5x"></i>
        </span>
      </div>
    </PortalProvider>
  );
};

export default LoadingIndicator;
