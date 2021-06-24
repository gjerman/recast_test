import { ArgsType, Field } from "@nestjs/graphql";
import { DataTableWhereUniqueInput } from "./DataTableWhereUniqueInput";

@ArgsType()
class DeleteDataTableArgs {
  @Field(() => DataTableWhereUniqueInput, { nullable: false })
  where!: DataTableWhereUniqueInput;
}

export { DeleteDataTableArgs };
