import { ColumnMeta as TColumnMeta } from "../api/columnMeta/ColumnMeta";

export const COLUMNMETA_TITLE_FIELD = "dataTableColumnName";

export const ColumnMetaTitle = (record: TColumnMeta) => {
  return record.dataTableColumnName;
};
