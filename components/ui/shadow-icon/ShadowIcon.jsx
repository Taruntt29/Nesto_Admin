import './ShadowIcon.css';
const ShadowIcon = ({ icon, bgColor, customClassName }) => {
  return (
    <div
      className={`shadow-icon d-flex justify-content-center align-items-center  ${
        customClassName ? customClassName : ''
      } ${bgColor ? bgColor : ''}`}
    >
      {icon}
    </div>
  );
};

export default ShadowIcon;
