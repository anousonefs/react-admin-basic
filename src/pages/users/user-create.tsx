import { Create, SimpleForm, TextInput } from "react-admin";

const UserCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="username" />
        <TextInput source="name" />
        <TextInput source="email" />
        <TextInput source="avatar" />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
