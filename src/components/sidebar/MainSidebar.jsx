import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DigiContext } from "../../context/DigiContext";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import DashboardPart from "./DashboardPart";
import AppsPart from "./AppsPart";
import PagesPart from "./PagesPart";
import ComponentsPart from "./ComponentsPart";
import UsersPart from "./UsersPart";
import ManagerPart from "./ManagerPart";
import MeasurePart from "./MeasurePart";
import CallCenterPart from "./CallCenterPart";

const MainSidebar = () => {
  const {
    isExpanded,
    sidebarBackgroundImageStyle,
    isNavExpanded,
    layoutPosition,
    isSidebarOpen,
    ref,
    handleNavHover,
    handleNavHoverEnd,
    isSmallScreen,
    toggleSidebar,
    toggleNav,
  } = useContext(DigiContext);

  const shouldUseOverlayScrollbars =
    isExpanded ||
    !isNavExpanded.isSmall ||
    layoutPosition.horizontal ||
    (!layoutPosition.twoColumn && isExpanded) ||
    !layoutPosition.flush;
  const userRole = JSON.parse(sessionStorage.getItem("user"));
  console.log(userRole);
  return (
    <div
      className={`main-sidebar 
      ${
        isNavExpanded.isSmall && !isExpanded
          ? "collapsed"
          : isExpanded && isNavExpanded.reset
          ? "collapsed"
          : ""
      } ${isNavExpanded.reset && isExpanded ? "reset" : ""} ${
        layoutPosition.horizontal ? "open-sub horizontal-menu" : ""
      } ${
        isSidebarOpen && !layoutPosition.twoColumn
          ? "sidebar-mini"
          : "vertical-menu"
      }
      ${
        !isSidebarOpen && layoutPosition.twoColumn && isSmallScreen
          ? "sub-menu-collapsed"
          : ""
      }
        ${layoutPosition.twoColumn ? "two-column-menu collapsed" : ""} ${
        layoutPosition.twoColumn && isExpanded && !isSmallScreen
          ? "sub-menu-collapsed"
          : ""
      } ${
        isNavExpanded.hoverOpen && isNavExpanded.hover
          ? "sidebar-hover hoverable"
          : ""
      } ${layoutPosition.flush ? "flush-menu" : ""} 
      `}
      style={sidebarBackgroundImageStyle}
      ref={ref}
      onMouseEnter={isNavExpanded.hover ? handleNavHover : toggleNav}
      onMouseLeave={isNavExpanded.hover ? handleNavHoverEnd : null}>
      <div className="main-menu">
        {shouldUseOverlayScrollbars ? (
          <OverlayScrollbarsComponent className="sidebar-menu">
            {userRole.role == "admin" && <AppsPart />}
            {userRole.role == "manager" && <ManagerPart />}
            {userRole.role == "measurer" && <MeasurePart />}
            {userRole.role == "call_center" && <CallCenterPart />}
          </OverlayScrollbarsComponent>
        ) : (
          <>
            <DashboardPart />
            <AppsPart />
            <PagesPart />
            <ComponentsPart />
            <li className="help-center">
              <h3>Help Center</h3>
              <p>We're an award-winning, forward thinking</p>
              <Link to="#" className="btn btn-sm btn-light">
                Go to Help Center
              </Link>
            </li>
          </>
        )}
      </div>
    </div>
  );
};

export default MainSidebar;
