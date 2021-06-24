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
import { CreateColumnMetaArgs } from "./CreateColumnMetaArgs";
import { UpdateColumnMetaArgs } from "./UpdateColumnMetaArgs";
import { DeleteColumnMetaArgs } from "./DeleteColumnMetaArgs";
import { ColumnMetaFindManyArgs } from "./ColumnMetaFindManyArgs";
import { ColumnMetaFindUniqueArgs } from "./ColumnMetaFindUniqueArgs";
import { ColumnMeta } from "./ColumnMeta";
import { ColumnMetaService } from "../columnMeta.service";

@graphql.Resolver(() => ColumnMeta)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ColumnMetaResolverBase {
  constructor(
    protected readonly service: ColumnMetaService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "ColumnMeta",
    action: "read",
    possession: "any",
  })
  async _columnMetasMeta(
    @graphql.Args() args: ColumnMetaFindManyArgs
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

  @graphql.Query(() => [ColumnMeta])
  @nestAccessControl.UseRoles({
    resource: "ColumnMeta",
    action: "read",
    possession: "any",
  })
  async columnMetas(
    @graphql.Args() args: ColumnMetaFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ColumnMeta[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ColumnMeta",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => ColumnMeta, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "ColumnMeta",
    action: "read",
    possession: "own",
  })
  async columnMeta(
    @graphql.Args() args: ColumnMetaFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ColumnMeta | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "ColumnMeta",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => ColumnMeta)
  @nestAccessControl.UseRoles({
    resource: "ColumnMeta",
    action: "create",
    possession: "any",
  })
  async createColumnMeta(
    @graphql.Args() args: CreateColumnMetaArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ColumnMeta> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "ColumnMeta",
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
        `providing the properties: ${properties} on ${"ColumnMeta"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => ColumnMeta)
  @nestAccessControl.UseRoles({
    resource: "ColumnMeta",
    action: "update",
    possession: "any",
  })
  async updateColumnMeta(
    @graphql.Args() args: UpdateColumnMetaArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ColumnMeta | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ColumnMeta",
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
        `providing the properties: ${properties} on ${"ColumnMeta"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => ColumnMeta)
  @nestAccessControl.UseRoles({
    resource: "ColumnMeta",
    action: "delete",
    possession: "any",
  })
  async deleteColumnMeta(
    @graphql.Args() args: DeleteColumnMetaArgs
  ): Promise<ColumnMeta | null> {
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
