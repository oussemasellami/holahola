import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
//npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
//npm install @nestjs/serve-static

@WebSocketGateway()
export class ChatGateway {

  @WebSocketServer()
  server: Server;


    @SubscribeMessage('send_message')
  async handleMessage(@MessageBody() data: any) {
    //const message = await this.messagesService.create(data.content, 'sent');
    this.server.emit('receive_message', data);
    return data;
  }

}
