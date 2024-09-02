// in src/MyMenu.js
import { Menu, useResourceDefinitions } from 'react-admin';
import { House } from '@mui/icons-material/';

export const MyMenu = () => {
  const resources = useResourceDefinitions();
  return (
    <Menu>
      <Menu.Item to="/" primaryText="Live Prices" leftIcon={<House />} />
      {Object.keys(resources).map((name) => (
        <Menu.ResourceItem key={name} name={name} />
      ))}
    </Menu>
  );
};
