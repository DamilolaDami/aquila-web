import { FaBars } from 'react-icons/fa'
import { NavLink as Link } from 'react-router-dom'
import styled from 'styled-components'


export const StyledNavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  /* ...other styles... */

  @media screen and (max-width: 768px) {
    display: ${props => (props.show ? 'flex' : 'none')};
    /* ...other styles for mobile menu... */
  }
`;
export const Nav = styled.nav`
  transition: background 0.3s, box-shadow 0.3s;
  background: #010606;
  height: 80px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  position: fixed;
  width: 100%;
  padding: 0.5rem calc((100vw - 1000px) / 80);
  padding-right: 20px;
  /* Third Nav */
  /* justify-content: flex-start; */
`
export const NavScrolledBar = styled.nav`
  transition: background 0.3s, box-shadow 0.3s;
  background: #fff;
  color: #000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  height: 80px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  position: fixed;
  width: 100%;
  padding: 0.5rem calc((100vw - 1000px) / 80);
  padding-right: 20px;
  /* Third Nav */
  /* justify-content: flex-start; */
`

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`
export const NavLinkScrolled = styled(Link)`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`

export const Bars = styled(FaBars)`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
export const BarsBlack = styled(FaBars)`
  display: none;
  color: black;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;


export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  /* Second Nav */
  /* margin-right: 24px; */

  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #3f51b5;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  /* Second Nav */
  margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`


