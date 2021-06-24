import { Module } from "@nestjs/common";
import { ColumnMetaModuleBase } from "./base/columnMeta.module.base";
import { ColumnMetaService } from "./columnMeta.service";
import { ColumnMetaController } from "./columnMeta.controller";
import { ColumnMetaResolver } from "./columnMeta.resolver";

@Module({
  imports: [ColumnMetaModuleBase],
  controllers: [ColumnMetaController],
  providers: [ColumnMetaService, ColumnMetaResolver],
  exports: [ColumnMetaService],
})
export class ColumnMetaModule {}
