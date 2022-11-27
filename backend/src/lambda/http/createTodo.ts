import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

import { createTodo, getAllTodosByUserId} from '../../helpers/todosAcess'
import { todoBuilder } from '../../helpers/todos'
import { getUserId } from '../utils'

// import { createTodo } from '../../businessLogic/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
    if (newTodo.name.length !== 0)
    {
      const todo = todoBuilder(newTodo,event)
      const toDoItem = await createTodo(todo)
      await createTodo(todo)
      return {
        statusCode: 201,
        body: JSON.stringify({
          "item": toDoItem
        })
      }
    }
    else{
      const todos = await getAllTodosByUserId(getUserId(event))
   
    return {
      statusCode: 201,
      body: JSON.stringify({
        items: todos
      })
    }
    }
   
   
    
  }
)

handler.use(
  cors({
    credentials: true
  })
)
