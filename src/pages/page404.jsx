import { useDocumentTitle } from "../hooks/useDocumentHandler";

const Page404 = () => {
  useDocumentTitle("404");
  return <h1>Page 404</h1>;
};

export default Page404;
