import { ArgsType, Field } from "@nestjs/graphql";
import { DataTableWhereUniqueInput } from "./DataTableWhereUniqueInput";

@ArgsType()
class DataTableFindUniqueArgs {
  @Field(() => DataTableWhereUniqueInput, { nullable: false })
  where!: DataTableWhereUniqueInput;
}

export { DataTableFindUniqueArgs };
