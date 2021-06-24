import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const DataTableCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Condition1" source="condition1" />
        <TextInput label="Condition2" source="condition2" />
        <TextInput label="Identifier1" source="identifier1" />
        <TextInput label="Identifier2" source="identifier2" />
        <TextInput label="Response1" source="response1" />
        <TextInput label="Response2" source="response2" />
      </SimpleForm>
    </Create>
  );
};
