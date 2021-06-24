import { DataTable as TDataTable } from "../api/dataTable/DataTable";

export const DATATABLE_TITLE_FIELD = "condition1";

export const DataTableTitle = (record: TDataTable) => {
  return record.condition1;
};
