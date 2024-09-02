import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  NumberField,
  EditButton,
  TextInput,
  NumberInput,
  DateField,
} from 'react-admin';
import Icon from '@mui/icons-material/TrendingUp';
export const WatchesIcon = Icon;

export const WatchesList = (props: any) => (
  <List {...props}>
      <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="stock.symbol" />
          <NumberField source="purchasePrice" />
          <NumberField source="quantity" />
          <DateField source="createdAt" />
          <EditButton />
      </Datagrid>
  </List>
);

const WatchesTitle = ({ record }: { record?: any }) => {
  return <span>Watch {record ? `"${record.id}"` : ''}</span>;
};

export const WatchesEdit = (props: any) => {
  return (
      <Edit title={<WatchesTitle />} {...props} mutationMode="pessimistic">
          <SimpleForm>
              <TextInput disabled source="id" />
              <TextInput source="stock.symbol" name="symbol" label="Symbol" />
              <NumberInput source="purchasePrice" />
              <NumberInput source="quantity" />
          </SimpleForm>
      </Edit>
  );
};

export const WatchesCreate = (props: any) => {
  return (
      <Create {...props} mutationMode="pessimistic" redirect="list">
          <SimpleForm>
              <TextInput source="stock.symbol" name="symbol" label="Symbol" />
              <NumberInput source="purchasePrice" />
              <NumberInput source="quantity" />
          </SimpleForm>
      </Create>
  );
};