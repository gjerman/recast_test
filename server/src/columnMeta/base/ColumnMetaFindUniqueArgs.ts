import { ArgsType, Field } from "@nestjs/graphql";
import { ColumnMetaWhereUniqueInput } from "./ColumnMetaWhereUniqueInput";

@ArgsType()
class ColumnMetaFindUniqueArgs {
  @Field(() => ColumnMetaWhereUniqueInput, { nullable: false })
  where!: ColumnMetaWhereUniqueInput;
}

export { ColumnMetaFindUniqueArgs };
