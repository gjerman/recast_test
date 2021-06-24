import { ColumnMetaWhereInput } from "./ColumnMetaWhereInput";
import { ColumnMetaOrderByInput } from "./ColumnMetaOrderByInput";

export type ColumnMetaFindManyArgs = {
  where?: ColumnMetaWhereInput;
  orderBy?: ColumnMetaOrderByInput;
  skip?: number;
  take?: number;
};
