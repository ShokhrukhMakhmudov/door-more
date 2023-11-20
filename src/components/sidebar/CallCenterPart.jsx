import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { DigiContext } from "../../context/DigiContext";

const CallCenterPart = () => {
  const {
    pagesState,
    toggleMainPagesDropdown,
    toggleSubPagesDropdown,
    toggleAuthentication,
    toggleError,
    toggleUser,
    layoutPosition,
    dropdownOpen,
    mainPagesRef,
    isExpanded,
    isNavExpanded,
    isSmallScreen,
    toggleAdditional,
  } = useContext(DigiContext);
  const {
    isMainDropdownOpen,
    isSubDropdownOpen,
    authentication,
    user,
    error,
    additional,
  } = pagesState;
  const handleSubNavLinkClick = () => {
    if (!isSubDropdownOpen) {
      toggleSubPagesDropdown(); // Open the sub-dropdown
    }
  };
  return (
    <li
      className="sidebar-item"
      ref={
        isExpanded ||
        isNavExpanded.isSmall ||
        layoutPosition.horizontal ||
        (layoutPosition.twoColumn && isExpanded) ||
        (layoutPosition.twoColumn && isSmallScreen)
          ? mainPagesRef
          : null
      }>
      <Link
        role="button"
        className={`sidebar-link-group-title has-sub ${
          isMainDropdownOpen ? "show" : ""
        }`}
        onClick={toggleMainPagesDropdown}>
        Панель управления
      </Link>
      <ul
        className={`sidebar-link-group ${
          layoutPosition.horizontal
            ? dropdownOpen.pages
              ? "d-block"
              : ""
            : isMainDropdownOpen
            ? "d-none"
            : ""
        }`}>
        <li className="sidebar-dropdown-item">
          <NavLink
            to="/home"
            className="sidebar-link"
            onClick={handleSubNavLinkClick}>
            <span className="nav-icon">
              <i className="fa-solid fa-clipboard-user"></i>
            </span>{" "}
            <span className="sidebar-txt">Моя доска</span>
          </NavLink>
        </li>
        <li className="sidebar-dropdown-item">
          <NavLink to="/callcenter" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-solid fa-list-check"></i>
            </span>{" "}
            <span className="sidebar-txt">Заказы</span>
          </NavLink>
        </li>
        <li className="sidebar-dropdown-item">
          <NavLink
            to="/task"
            className="sidebar-link"
            onClick={handleSubNavLinkClick}>
            <span className="nav-icon">
              <i className="fa-brands fa-stack-overflow"></i>
            </span>{" "}
            <span className="sidebar-txt">Жалобы</span>
          </NavLink>
        </li>
      </ul>
    </li>
  );
};

export default CallCenterPart;
