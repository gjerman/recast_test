import { SortOrder } from "../../util/SortOrder";

export type ColumnMetaOrderByInput = {
  createdAt?: SortOrder;
  dataTableColumnName?: SortOrder;
  id?: SortOrder;
  rawDataColumnName?: SortOrder;
  updatedAt?: SortOrder;
};
