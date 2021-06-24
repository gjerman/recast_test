import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type ColumnMetaWhereInput = {
  dataTableColumnName?: StringNullableFilter;
  id?: StringFilter;
  rawDataColumnName?: StringNullableFilter;
};
