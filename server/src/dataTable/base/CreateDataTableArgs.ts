import { ArgsType, Field } from "@nestjs/graphql";
import { DataTableCreateInput } from "./DataTableCreateInput";

@ArgsType()
class CreateDataTableArgs {
  @Field(() => DataTableCreateInput, { nullable: false })
  data!: DataTableCreateInput;
}

export { CreateDataTableArgs };
