const SimpleLi = (props) => {
  const { children, moreClass } = props;
  return (
    <li className={`li${moreClass ? " " + moreClass : ""}`}>{children}</li>
  );
};

export default SimpleLi;
