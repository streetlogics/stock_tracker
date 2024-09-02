import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import { getUserToken } from './Utils';

export type MenuElement = {
  name: string;
  to: string;
};
export const LoggedInMenuElements: MenuElement[] = [
  {
    name: 'Live Prices',
    to: '/',
  },
  {
    name: 'Watchlist',
    to: '/manage/watches',
  }
];

export const LoggedOutMenuElements: MenuElement[] = [
  {
    name: 'Login',
    to: '/manage/login',
  }
];

export const getMenuElements = () => {
  return getUserToken() ? LoggedInMenuElements : LoggedOutMenuElements;
};

export default function HeaderMenu() {
  return (
    <>
      <DesktopMenu />
      <MobileMenu />
    </>
  );
}
