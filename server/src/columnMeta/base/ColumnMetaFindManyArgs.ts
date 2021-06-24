import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ColumnMetaWhereInput } from "./ColumnMetaWhereInput";
import { Type } from "class-transformer";
import { ColumnMetaOrderByInput } from "./ColumnMetaOrderByInput";

@ArgsType()
class ColumnMetaFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ColumnMetaWhereInput,
  })
  @Field(() => ColumnMetaWhereInput, { nullable: true })
  @Type(() => ColumnMetaWhereInput)
  where?: ColumnMetaWhereInput;

  @ApiProperty({
    required: false,
    type: ColumnMetaOrderByInput,
  })
  @Field(() => ColumnMetaOrderByInput, { nullable: true })
  @Type(() => ColumnMetaOrderByInput)
  orderBy?: ColumnMetaOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { ColumnMetaFindManyArgs };
