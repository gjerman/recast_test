import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const DataTableEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Condition1" source="condition1" />
        <TextInput label="Condition2" source="condition2" />
        <TextInput label="Identifier1" source="identifier1" />
        <TextInput label="Identifier2" source="identifier2" />
        <TextInput label="Response1" source="response1" />
        <TextInput label="Response2" source="response2" />
      </SimpleForm>
    </Edit>
  );
};
