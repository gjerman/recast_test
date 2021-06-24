import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type DataTableWhereInput = {
  condition1?: StringNullableFilter;
  condition2?: StringNullableFilter;
  id?: StringFilter;
  identifier1?: StringFilter;
  identifier2?: StringNullableFilter;
  response1?: StringNullableFilter;
  response2?: StringNullableFilter;
};
