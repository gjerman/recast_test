import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ColumnMetaServiceBase } from "./base/columnMeta.service.base";

@Injectable()
export class ColumnMetaService extends ColumnMetaServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
