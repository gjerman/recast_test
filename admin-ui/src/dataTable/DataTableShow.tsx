import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
} from "react-admin";

export const DataTableShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="Condition1" source="condition1" />
        <TextField label="Condition2" source="condition2" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="Identifier1" source="identifier1" />
        <TextField label="Identifier2" source="identifier2" />
        <TextField label="Response1" source="response1" />
        <TextField label="Response2" source="response2" />
        <DateField source="updatedAt" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
