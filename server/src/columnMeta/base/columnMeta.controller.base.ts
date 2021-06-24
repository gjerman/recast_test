import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ColumnMetaService } from "../columnMeta.service";
import { ColumnMetaCreateInput } from "./ColumnMetaCreateInput";
import { ColumnMetaWhereInput } from "./ColumnMetaWhereInput";
import { ColumnMetaWhereUniqueInput } from "./ColumnMetaWhereUniqueInput";
import { ColumnMetaFindManyArgs } from "./ColumnMetaFindManyArgs";
import { ColumnMetaUpdateInput } from "./ColumnMetaUpdateInput";
import { ColumnMeta } from "./ColumnMeta";

export class ColumnMetaControllerBase {
  constructor(
    protected readonly service: ColumnMetaService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "ColumnMeta",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: ColumnMeta })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: ColumnMetaCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ColumnMeta> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "ColumnMeta",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"ColumnMeta"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        createdAt: true,
        dataTableColumnName: true,
        id: true,
        rawDataColumnName: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "ColumnMeta",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [ColumnMeta] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => ColumnMetaFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ColumnMeta[]> {
    const args = plainToClass(ColumnMetaFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ColumnMeta",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        dataTableColumnName: true,
        id: true,
        rawDataColumnName: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "ColumnMeta",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: ColumnMeta })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: ColumnMetaWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ColumnMeta | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "ColumnMeta",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        dataTableColumnName: true,
        id: true,
        rawDataColumnName: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "ColumnMeta",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: ColumnMeta })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: ColumnMetaWhereUniqueInput,
    @common.Body()
    data: ColumnMetaUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ColumnMeta | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ColumnMeta",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"ColumnMeta"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          createdAt: true,
          dataTableColumnName: true,
          id: true,
          rawDataColumnName: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "ColumnMeta",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: ColumnMeta })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: ColumnMetaWhereUniqueInput
  ): Promise<ColumnMeta | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          dataTableColumnName: true,
          id: true,
          rawDataColumnName: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
