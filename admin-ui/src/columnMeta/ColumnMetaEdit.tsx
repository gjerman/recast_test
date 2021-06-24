import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const ColumnMetaEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="DataTableColumnName" source="dataTableColumnName" />
        <TextInput label="RawDataColumnName" source="rawDataColumnName" />
      </SimpleForm>
    </Edit>
  );
};
