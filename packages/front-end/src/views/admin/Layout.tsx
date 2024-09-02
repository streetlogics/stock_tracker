// in src/MyLayout.js
import { Layout as RALayout } from 'react-admin';

import { MyMenu } from './Menu';

export const Layout = (props: any) => <RALayout {...props} menu={MyMenu} />;
