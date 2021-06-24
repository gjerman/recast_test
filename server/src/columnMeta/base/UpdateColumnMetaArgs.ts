import { ArgsType, Field } from "@nestjs/graphql";
import { ColumnMetaWhereUniqueInput } from "./ColumnMetaWhereUniqueInput";
import { ColumnMetaUpdateInput } from "./ColumnMetaUpdateInput";

@ArgsType()
class UpdateColumnMetaArgs {
  @Field(() => ColumnMetaWhereUniqueInput, { nullable: false })
  where!: ColumnMetaWhereUniqueInput;
  @Field(() => ColumnMetaUpdateInput, { nullable: false })
  data!: ColumnMetaUpdateInput;
}

export { UpdateColumnMetaArgs };
