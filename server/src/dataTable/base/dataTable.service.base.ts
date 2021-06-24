import { PrismaService } from "nestjs-prisma";
import { Prisma, DataTable } from "@prisma/client";

export class DataTableServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.DataTableFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.DataTableFindManyArgs>
  ): Promise<number> {
    return this.prisma.dataTable.count(args);
  }

  async findMany<T extends Prisma.DataTableFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.DataTableFindManyArgs>
  ): Promise<DataTable[]> {
    return this.prisma.dataTable.findMany(args);
  }
  async findOne<T extends Prisma.DataTableFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.DataTableFindUniqueArgs>
  ): Promise<DataTable | null> {
    return this.prisma.dataTable.findUnique(args);
  }
  async create<T extends Prisma.DataTableCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.DataTableCreateArgs>
  ): Promise<DataTable> {
    return this.prisma.dataTable.create<T>(args);
  }
  async update<T extends Prisma.DataTableUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.DataTableUpdateArgs>
  ): Promise<DataTable> {
    return this.prisma.dataTable.update<T>(args);
  }
  async delete<T extends Prisma.DataTableDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.DataTableDeleteArgs>
  ): Promise<DataTable> {
    return this.prisma.dataTable.delete(args);
  }
}
