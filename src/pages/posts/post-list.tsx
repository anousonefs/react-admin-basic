import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
  FunctionField,
  useRecordContext,
  EditButton,
  DeleteButton,
  ReferenceInput,
  TextInput,
} from "react-admin";

const PostPanel = () => {
  const record = useRecordContext();
  return <div>{record?.body}</div>;
};

const PostList = () => {
  const postFilters = [
    <TextInput source="title" label="title" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" alwaysOn />,
  ];
  return (
    <List filters={postFilters}>
      <Datagrid
        expand={<PostPanel />}
        sx={{
          ".RaDatagrid-headerCell": {
            padding: "16px",
          },
        }}
      >
        <TextField source="id" />
        <TextField source="title" label="Post title" />
        {/* <TextField source="body" /> */}
        <FunctionField
          label="Excerpt"
          render={(record) => `${record.body.substring(0, 50)}...`}
        />
        <ReferenceField source="userId" reference="users" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default PostList;
