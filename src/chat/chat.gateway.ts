// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // autorise toutes les origines (à restreindre en production)
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>();

  handleConnection(client: Socket) {
    console.log(`Client connecté : ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const username = this.connectedUsers.get(client.id);
    console.log(`Client déconnecté : ${username || client.id}`);
    this.connectedUsers.delete(client.id);
    this.server.emit('userDisconnected', username);
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() username: string, @ConnectedSocket() client: Socket) {
    this.connectedUsers.set(client.id, username);
    this.server.emit('userJoined', username);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: { sender: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`${message.sender}: ${message.content}`);
    this.server.emit('message', message); // envoie à tous les clients
  }
}
