import { ArgsType, Field } from "@nestjs/graphql";
import { ColumnMetaCreateInput } from "./ColumnMetaCreateInput";

@ArgsType()
class CreateColumnMetaArgs {
  @Field(() => ColumnMetaCreateInput, { nullable: false })
  data!: ColumnMetaCreateInput;
}

export { CreateColumnMetaArgs };
