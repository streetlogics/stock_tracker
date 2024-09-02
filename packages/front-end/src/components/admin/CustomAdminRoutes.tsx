import { Admin, Resource } from 'react-admin';
import CustomAuthProvider from './CustomAuthProvider';
import { CustomDataProvider } from './CustomDataProvider';
import LoginForm from '../../LoginForm';
import { Layout } from '../../views/admin/Layout';
import { WatchesList, WatchesEdit, WatchesCreate, WatchesIcon } from '../../views/admin/Watches';
const CustomAdminRoutes = () => {
  return (
    <Admin
      basename="/manage"
      dataProvider={CustomDataProvider}
      loginPage={LoginForm}
      authProvider={CustomAuthProvider}
      layout={Layout}
    >
      <Resource
        name="watches"
        options={{ label: 'Watchlist' }}
        list={WatchesList}
        edit={WatchesEdit}
        create={WatchesCreate}
        icon={WatchesIcon}
      />
    </Admin>
  );
};

export default CustomAdminRoutes;
