import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentHandler";

const Landing = () => {
  useDocumentTitle("Hi");
  return (
    <div className="box w-100 h-100 dsp-flex justify-center align-itms-center">
      <Link to={"/auth/signin"} className="hyperlink">
        Sign In
      </Link>
    </div>
  );
};

export default Landing;
