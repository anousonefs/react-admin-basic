import {
  EditButton,
  Datagrid,
  List,
  TextField,
  SelectInput,
  useGetList,
  SearchInput,
} from "react-admin";

const UserList = () => {
  const { data, isPending } = useGetList("users");

  /* const choices = [ */
  /*   { id: "aworlakoumman@gmail.com", name: "aworlakoumman@gmail.com" }, */
  /*   { id: "souliyapps@gmail.com", name: "souliyapps@gmail.com" }, */
  /* ]; */

  const userFilters = [
    /* <SelectInput source="email" choices={choices} />, */
    <SelectInput
      source="email"
      choices={data}
      isPending={isPending}
      optionText={"email"}
      optionValue="email"
      alwaysOn
    />,

    <SearchInput source="q" alwaysOn />,

    /* <ReferenceInput */
    /*   source="username" */
    /*   label="username" */
    /*   reference="username" */
    /*   alwaysOn */
    /* />, */

    /* <SelectInput */
    /*   source="users" */
    /*   label="email" */
    /*   choices={data} */
    /*   isPending={isPending} */
    /*   alwaysOn */
    /* />, */
  ];

  return (
    <List filters={userFilters}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="username" />
        <TextField source="email" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default UserList;
