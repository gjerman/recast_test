import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ColumnMetaResolverBase } from "./base/columnMeta.resolver.base";
import { ColumnMeta } from "./base/ColumnMeta";
import { ColumnMetaService } from "./columnMeta.service";

@graphql.Resolver(() => ColumnMeta)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ColumnMetaResolver extends ColumnMetaResolverBase {
  constructor(
    protected readonly service: ColumnMetaService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
