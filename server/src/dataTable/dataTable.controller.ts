import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { DataTableService } from "./dataTable.service";
import { DataTableControllerBase } from "./base/dataTable.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("data-tables")
@common.Controller("data-tables")
export class DataTableController extends DataTableControllerBase {
  constructor(
    protected readonly service: DataTableService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
