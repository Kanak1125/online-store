import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from "react-router-dom";

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="max-w-screen-xl mx-auto px-5 py-5 md:px-10">
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <NavLink key={match.pathname} to={match.pathname}>
          {breadcrumb.props.children + " / "}
        </NavLink>
      ))}
    </div>
  );
};

export default Breadcrumbs;