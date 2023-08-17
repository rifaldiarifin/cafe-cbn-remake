const SimpleNav = (props) => {
  const { children, moreClass } = props;
  return (
    <nav className={`simple-nav${moreClass ? " " + moreClass : ""}`}>
      <ul className="ul">{children}</ul>
    </nav>
  );
};

export default SimpleNav;
