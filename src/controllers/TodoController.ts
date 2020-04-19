import { BaseController } from './BaseController';
import {
  JsonController,
  Get,
  Param,
  Post,
  BodyParam,
} from 'routing-controllers';
import { PrismaClient } from '@prisma/client';

@JsonController('/todos')
export class TodoController extends BaseController {
  private client: PrismaClient;

  constructor() {
    super();
    this.client = new PrismaClient();
  }

  @Get()
  public index() {
    return this.client.todo.findMany();
  }

  @Get('/:todoId')
  public retrieve(@Param('todoId') todoId: number) {
    return this.client.todo.findOne({ where: { id: Number(todoId) } });
  }

  @Post()
  public async create(
    @BodyParam('title') title: string,
    @BodyParam('description') description: string
  ) {
    return this.client.todo.create({
      data: {
        title,
        description,
      },
    });
  }
}
