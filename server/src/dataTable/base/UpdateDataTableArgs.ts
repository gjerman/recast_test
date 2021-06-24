import { ArgsType, Field } from "@nestjs/graphql";
import { DataTableWhereUniqueInput } from "./DataTableWhereUniqueInput";
import { DataTableUpdateInput } from "./DataTableUpdateInput";

@ArgsType()
class UpdateDataTableArgs {
  @Field(() => DataTableWhereUniqueInput, { nullable: false })
  where!: DataTableWhereUniqueInput;
  @Field(() => DataTableUpdateInput, { nullable: false })
  data!: DataTableUpdateInput;
}

export { UpdateDataTableArgs };
