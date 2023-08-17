import { Link } from "react-router-dom";
import {
  useDocumentClickTarget,
  useDocumentTitle,
} from "../hooks/useDocumentHandler";
import DualForm from "../components/Layout/DualForm";
import InputField from "../components/Elements/InputField";
import Button from "../components/Elements/Button";
import SimpleCombobox from "../components/Elements/SimpleCombobox";
import SimpleNav from "../components/Fragments/SimpleNav";
import SimpleNavLi from "../components/Elements/SimpleNav/SimpleNavLi";
import SimpleComboLi from "../components/Elements/SimpleCombobox/SimpleComboLi";

const SignInPage = () => {
  useDocumentClickTarget();
  useDocumentTitle("SignIn");

  const signInHandler = async (e) => {
    // prevent default
    e.preventDefault();

    const value = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    console.log(value);
  };
  return (
    <DualForm
      content={
        <>
          <h1>WELCOME BACK!</h1>
          <p className="mrgn-t-10 mrgn-b-40">
            Don&apos;t have a account,{" "}
            <Link to={"/auth/register"} className="hyperlink">
              Sign Up
            </Link>
          </p>
          <form
            action=""
            method="post"
            className="w-100"
            onSubmit={signInHandler}
          >
            <InputField
              type="text"
              label="Username"
              style="regular"
              name="username"
              placeHolder="Username"
              autoComplete="off"
              required="on"
              moreClass="w-100 mrgn-b-20"
            />
            <InputField
              type="password"
              label="Password"
              style="regular"
              name="password"
              placeHolder="Password"
              autoComplete="off"
              required="on"
              moreClass="w-100"
            />
            <div className="box w-100 txt-right mrgn-y-20">
              <Link to={"/auth/forgetpassword"} className="hyperlink">
                Forget Password?
              </Link>
            </div>
            <Button
              type="submit"
              style="fill"
              color="default"
              id="signin"
              moreClass="mrgn-t-20"
            >
              Sign In
            </Button>
          </form>
        </>
      }
      banner={
        <>
          <SimpleNav>
            <SimpleNavLi>Help</SimpleNavLi>
            <SimpleNavLi>Contact us</SimpleNavLi>
            <SimpleNavLi>
              <SimpleCombobox select="English">
                <SimpleComboLi>Indonesia</SimpleComboLi>
                <SimpleComboLi>English</SimpleComboLi>
              </SimpleCombobox>
            </SimpleNavLi>
            <SimpleNavLi>
              <button className="btn">
                <span>Sign Up</span>
              </button>
            </SimpleNavLi>
            <SimpleNavLi>
              <a href="/" className="btn icon icons8-filled home"></a>
            </SimpleNavLi>
          </SimpleNav>
          <img
            src="/img/paintedbrowncoffeecup.png"
            className="illustration"
            alt="paintedbrowncoffeecup"
          />
        </>
      }
    />
  );
};

export default SignInPage;
