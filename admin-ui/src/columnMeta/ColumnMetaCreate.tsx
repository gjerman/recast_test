import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const ColumnMetaCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="DataTableColumnName" source="dataTableColumnName" />
        <TextInput label="RawDataColumnName" source="rawDataColumnName" />
      </SimpleForm>
    </Create>
  );
};
