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
import { DataTableService } from "../dataTable.service";
import { DataTableCreateInput } from "./DataTableCreateInput";
import { DataTableWhereInput } from "./DataTableWhereInput";
import { DataTableWhereUniqueInput } from "./DataTableWhereUniqueInput";
import { DataTableFindManyArgs } from "./DataTableFindManyArgs";
import { DataTableUpdateInput } from "./DataTableUpdateInput";
import { DataTable } from "./DataTable";

export class DataTableControllerBase {
  constructor(
    protected readonly service: DataTableService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "DataTable",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: DataTable })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: DataTableCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DataTable> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "DataTable",
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
        `providing the properties: ${properties} on ${"DataTable"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        condition1: true,
        condition2: true,
        createdAt: true,
        id: true,
        identifier1: true,
        identifier2: true,
        response1: true,
        response2: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "DataTable",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [DataTable] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => DataTableFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DataTable[]> {
    const args = plainToClass(DataTableFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DataTable",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        condition1: true,
        condition2: true,
        createdAt: true,
        id: true,
        identifier1: true,
        identifier2: true,
        response1: true,
        response2: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "DataTable",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: DataTable })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: DataTableWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DataTable | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "DataTable",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        condition1: true,
        condition2: true,
        createdAt: true,
        id: true,
        identifier1: true,
        identifier2: true,
        response1: true,
        response2: true,
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
    resource: "DataTable",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: DataTable })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: DataTableWhereUniqueInput,
    @common.Body()
    data: DataTableUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DataTable | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "DataTable",
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
        `providing the properties: ${properties} on ${"DataTable"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          condition1: true,
          condition2: true,
          createdAt: true,
          id: true,
          identifier1: true,
          identifier2: true,
          response1: true,
          response2: true,
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
    resource: "DataTable",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: DataTable })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: DataTableWhereUniqueInput
  ): Promise<DataTable | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          condition1: true,
          condition2: true,
          createdAt: true,
          id: true,
          identifier1: true,
          identifier2: true,
          response1: true,
          response2: true,
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
