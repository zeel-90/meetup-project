import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <SpeedInsights />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
