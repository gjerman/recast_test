import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { DataTableResolverBase } from "./base/dataTable.resolver.base";
import { DataTable } from "./base/DataTable";
import { DataTableService } from "./dataTable.service";

@graphql.Resolver(() => DataTable)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class DataTableResolver extends DataTableResolverBase {
  constructor(
    protected readonly service: DataTableService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
