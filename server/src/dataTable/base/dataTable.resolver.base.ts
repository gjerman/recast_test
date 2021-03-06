import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateDataTableArgs } from "./CreateDataTableArgs";
import { UpdateDataTableArgs } from "./UpdateDataTableArgs";
import { DeleteDataTableArgs } from "./DeleteDataTableArgs";
import { DataTableFindManyArgs } from "./DataTableFindManyArgs";
import { DataTableFindUniqueArgs } from "./DataTableFindUniqueArgs";
import { DataTable } from "./DataTable";
import { DataTableService } from "../dataTable.service";

@graphql.Resolver(() => DataTable)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class DataTableResolverBase {
  constructor(
    protected readonly service: DataTableService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "DataTable",
    action: "read",
    possession: "any",
  })
  async _dataTablesMeta(
    @graphql.Args() args: DataTableFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [DataTable])
  @nestAccessControl.UseRoles({
    resource: "DataTable",
    action: "read",
    possession: "any",
  })
  async dataTables(
    @graphql.Args() args: DataTableFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DataTable[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DataTable",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => DataTable, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "DataTable",
    action: "read",
    possession: "own",
  })
  async dataTable(
    @graphql.Args() args: DataTableFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DataTable | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "DataTable",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => DataTable)
  @nestAccessControl.UseRoles({
    resource: "DataTable",
    action: "create",
    possession: "any",
  })
  async createDataTable(
    @graphql.Args() args: CreateDataTableArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DataTable> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "DataTable",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"DataTable"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => DataTable)
  @nestAccessControl.UseRoles({
    resource: "DataTable",
    action: "update",
    possession: "any",
  })
  async updateDataTable(
    @graphql.Args() args: UpdateDataTableArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DataTable | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "DataTable",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"DataTable"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => DataTable)
  @nestAccessControl.UseRoles({
    resource: "DataTable",
    action: "delete",
    possession: "any",
  })
  async deleteDataTable(
    @graphql.Args() args: DeleteDataTableArgs
  ): Promise<DataTable | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
