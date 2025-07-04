// import { Module } from '@nestjs/common';
// import { TransactionService } from './transaction.service';
// import { TransactionController } from './transaction.controller';
// import { PrismaModule } from 'prisma/prisma.module';


// @Module({
//   imports: [PrismaModule],  // <-- import PrismaModule here
//   providers: [TransactionService],
//   controllers: [TransactionController]
// })
// export class TransactionModule {}




import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../../prisma/prisma.module'; // ✅

@Module({
  imports: [AuthModule, PrismaModule], // ✅ Import it here
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
