import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
  EmailField,
  PasswordInput,
} from 'react-admin';
import Icon from '@mui/icons-material/SupervisedUserCircle';
export const UsersIcon = Icon;
export const UsersList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <EditButton />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }: { record?: any }) => {
  return <span>User {record ? `"${record.name}"` : ''}</span>;
};

export const UsersEdit = (props: any) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="email" />
      <PasswordInput source="new_password" />
    </SimpleForm>
  </Edit>
);

export const UsersCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <PasswordInput source="password" />
    </SimpleForm>
  </Create>
);
