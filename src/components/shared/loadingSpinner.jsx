import { Spin } from "antd";
import "./loadingSpinner.css";

const SpinnerLoader = () => {
  return (
    <div className="spinner-container">
      <Spin size="large" className="spinner" />
    </div>
  );
};

export default SpinnerLoader;