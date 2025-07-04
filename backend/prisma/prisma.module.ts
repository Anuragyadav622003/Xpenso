// import { Module } from '@nestjs/common';
// import { PrismaService } from './prisma.service';

// @Module({
//   providers: [PrismaService],
//   exports: [PrismaService],  // <-- important to export so other modules can import it
// })
// export class PrismaModule {}


import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 makes it reusable in other modules
})
export class PrismaModule {}
