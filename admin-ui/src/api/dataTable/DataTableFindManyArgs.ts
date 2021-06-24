import { DataTableWhereInput } from "./DataTableWhereInput";
import { DataTableOrderByInput } from "./DataTableOrderByInput";

export type DataTableFindManyArgs = {
  where?: DataTableWhereInput;
  orderBy?: DataTableOrderByInput;
  skip?: number;
  take?: number;
};
