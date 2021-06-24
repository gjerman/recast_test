import { ArgsType, Field } from "@nestjs/graphql";
import { ColumnMetaWhereUniqueInput } from "./ColumnMetaWhereUniqueInput";

@ArgsType()
class DeleteColumnMetaArgs {
  @Field(() => ColumnMetaWhereUniqueInput, { nullable: false })
  where!: ColumnMetaWhereUniqueInput;
}

export { DeleteColumnMetaArgs };
