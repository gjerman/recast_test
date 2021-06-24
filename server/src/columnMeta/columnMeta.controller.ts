import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ColumnMetaService } from "./columnMeta.service";
import { ColumnMetaControllerBase } from "./base/columnMeta.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("column-metas")
@common.Controller("column-metas")
export class ColumnMetaController extends ColumnMetaControllerBase {
  constructor(
    protected readonly service: ColumnMetaService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
