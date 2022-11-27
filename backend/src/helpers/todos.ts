// import { TodosAccess } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils';
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'

import { APIGatewayProxyEvent } from 'aws-lambda';
import { getUserId } from '../lambda/utils';
import { TodoItem } from '../models/TodoItem';
import { deleteTodo, updateTodo } from './todosAcess';
import { TodoUpdate } from '../models/TodoUpdate';
// // TODO: Implement businessLogic
export function todoBuilder(todoRequest: CreateTodoRequest, event: APIGatewayProxyEvent): TodoItem {
    const todoId = uuid.v4()
    const bucketName = process.env.ATTACHMENT_S3_BUCKET;
    const todo = {
      todoId: todoId,
      userId: getUserId(event),
      createdAt: new Date().toISOString(),
      done: false,
      attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${todoId}`,
      ...todoRequest
     }
     return todo as TodoItem

}
export async function delTodo(todoId: string, userId: string): Promise<any> {
    return await deleteTodo(todoId, userId)
  }

export async function updTodo( todoId: string, userId: string, updatedTodo: TodoUpdate): Promise<any> {
    return await updateTodo(todoId, userId, updatedTodo)
  }
