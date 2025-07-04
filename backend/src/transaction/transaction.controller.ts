// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   Request,
//   UseGuards,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { TransactionService } from './transaction.service';
// import { CreateTransactionDto } from './dto/create-transaction.dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto/update-transaction.dto';

// @Controller('transactions')
// export class TransactionController {
//   constructor(private readonly transactionService: TransactionService) {}

//   private getUserId(request: any): number {
//     const userId = request.user?.sub;
//     if (!userId) {
//       throw new UnauthorizedException('User ID not found in request');
//     }

//     return userId;
//   }

//   @Post()
//   create(@Body() dto: CreateTransactionDto, @Request() req: any) {
//     console.log("hello",dto)
//     const userId = this.getUserId(req);
//     return this.transactionService.create(dto, userId);
//   }

//   @Get()
//   findAll(@Request() req: any) {
    
//     const userId = this.getUserId(req);
//     return this.transactionService.findAll(userId);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string, @Request() req: any) {
//     const userId = this.getUserId(req);
//     return this.transactionService.findOne(id, userId);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() dto: UpdateTransactionDto, @Request() req: any) {
//     const userId = this.getUserId(req);
//     return this.transactionService.update(id, dto, userId);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string, @Request() req: any) {
//     const userId = this.getUserId(req);
//     return this.transactionService.remove(id, userId);
//   }
// }




import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto/update-transaction.dto';
import { JwtCookieGuard } from '../common/midleware/jwt.middleware';
import { RequestWithUser } from '../common/types/request-with-user';

@UseGuards(JwtCookieGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  private getUserId(req: RequestWithUser): number {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in request');
    }
    return userId;
  }

  @Post()
  create(@Body() dto: CreateTransactionDto, @Req() req: RequestWithUser) {
    const userId = this.getUserId(req);
    return this.transactionService.create(dto, userId);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    const userId = this.getUserId(req);
    return this.transactionService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = this.getUserId(req);
    return this.transactionService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTransactionDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = this.getUserId(req);
    return this.transactionService.update(id, dto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = this.getUserId(req);
    return this.transactionService.remove(id, userId);
  }
}
