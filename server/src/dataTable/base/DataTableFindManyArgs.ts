import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DataTableWhereInput } from "./DataTableWhereInput";
import { Type } from "class-transformer";
import { DataTableOrderByInput } from "./DataTableOrderByInput";

@ArgsType()
class DataTableFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => DataTableWhereInput,
  })
  @Field(() => DataTableWhereInput, { nullable: true })
  @Type(() => DataTableWhereInput)
  where?: DataTableWhereInput;

  @ApiProperty({
    required: false,
    type: DataTableOrderByInput,
  })
  @Field(() => DataTableOrderByInput, { nullable: true })
  @Type(() => DataTableOrderByInput)
  orderBy?: DataTableOrderByInput;

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

export { DataTableFindManyArgs };
