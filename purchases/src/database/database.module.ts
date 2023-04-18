// path: purchases/src/database/database.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class DatabaseModule {}
