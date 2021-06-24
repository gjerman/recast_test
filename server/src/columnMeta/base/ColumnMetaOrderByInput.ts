import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { SortOrder } from "../../util/SortOrder";

@InputType({
  isAbstract: true,
  description: undefined,
})
class ColumnMetaOrderByInput {
  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  createdAt?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  dataTableColumnName?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  id?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  rawDataColumnName?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  updatedAt?: SortOrder;
}

export { ColumnMetaOrderByInput };
