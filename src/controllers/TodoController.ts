import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, Delete } from 'routing-controllers';

@JsonController('/todos')
export class TodoController extends BaseController {
  @Get()
  public index() {
    return {
      data: [],
    };
  }

  @Post()
  public create() {
    return {
      data: {},
    };
  }

  @Get('/:userId')
  public retrieve() {
    return {
      data: {},
    };
  }

  @Put('/:userId')
  public update() {
    return {
      data: {},
    };
  }

  @Delete('/:userId')
  public delete() {
    return {
      data: {},
    };
  }
}
