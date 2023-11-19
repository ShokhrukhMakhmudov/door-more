import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { DigiContext } from "../../context/DigiContext";

const UsersPart = () => {
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
        Пользователи
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
          <NavLink to="/callcenter" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-duotone fa-phone"></i>
            </span>{" "}
            <span className="sidebar-txt">Call Center</span>
          </NavLink>
          <NavLink to="/utility" className="sidebar-link">
            <span className="nav-icon">
              <i class="fa-solid fa-user-tie"></i>
            </span>{" "}
            <span className="sidebar-txt">Sales Manager</span>
          </NavLink>
          <NavLink to="/utility" className="sidebar-link">
            <span className="nav-icon">
              <i class="fa-solid fa-pen-ruler"></i>
            </span>{" "}
            <span className="sidebar-txt">Measure</span>
          </NavLink>
        </li>
      </ul>
    </li>
  );
};

export default UsersPart;
