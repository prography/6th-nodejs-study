import { BaseController } from './BaseController';
import { JsonController, Get, Param } from 'routing-controllers';

@JsonController('/todos')
export class TodoController extends BaseController {
  @Get()
  public index() {
    return [
      {
        id: 1,
        title: 'must do',
        description: 'how to create express app',
      },
    ];
  }

  @Get('/:todoId')
  public retrieve(@Param('todoId') todoId: number) {
    return {
      id: todoId,
      title: 'sdfsdf',
      description: 'blah blah',
    };
  }
}
