import { PrismaService } from "nestjs-prisma";
import { Prisma, ColumnMeta } from "@prisma/client";

export class ColumnMetaServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ColumnMetaFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ColumnMetaFindManyArgs>
  ): Promise<number> {
    return this.prisma.columnMeta.count(args);
  }

  async findMany<T extends Prisma.ColumnMetaFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ColumnMetaFindManyArgs>
  ): Promise<ColumnMeta[]> {
    return this.prisma.columnMeta.findMany(args);
  }
  async findOne<T extends Prisma.ColumnMetaFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ColumnMetaFindUniqueArgs>
  ): Promise<ColumnMeta | null> {
    return this.prisma.columnMeta.findUnique(args);
  }
  async create<T extends Prisma.ColumnMetaCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ColumnMetaCreateArgs>
  ): Promise<ColumnMeta> {
    return this.prisma.columnMeta.create<T>(args);
  }
  async update<T extends Prisma.ColumnMetaUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ColumnMetaUpdateArgs>
  ): Promise<ColumnMeta> {
    return this.prisma.columnMeta.update<T>(args);
  }
  async delete<T extends Prisma.ColumnMetaDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ColumnMetaDeleteArgs>
  ): Promise<ColumnMeta> {
    return this.prisma.columnMeta.delete(args);
  }
}
