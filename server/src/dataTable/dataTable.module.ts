import { Module } from "@nestjs/common";
import { DataTableModuleBase } from "./base/dataTable.module.base";
import { DataTableService } from "./dataTable.service";
import { DataTableController } from "./dataTable.controller";
import { DataTableResolver } from "./dataTable.resolver";

@Module({
  imports: [DataTableModuleBase],
  controllers: [DataTableController],
  providers: [DataTableService, DataTableResolver],
  exports: [DataTableService],
})
export class DataTableModule {}
