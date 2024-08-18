import { Server } from "socket.io";
import http from "http";

const socket_port = process.env.SOCKET_PORT
if(!socket_port) throw new Error(`missing env: SOCKET_PORT`)

export class IOSocket {
  static instance: IOSocket | undefined;
  public readonly io: Server;

  private constructor(
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  ) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });
    this.setupSocketHandlers();
  }

  static getInstance = (
    server?: http.Server<
      typeof http.IncomingMessage,
      typeof http.ServerResponse
    >
  ): IOSocket => {
    if (!IOSocket.instance) {
      if (!server) throw new Error("server param is required");
      IOSocket.instance = new IOSocket(server);
    }
    return IOSocket.instance;
  };

  private setupSocketHandlers = () => {
    this.io.on("connection", (socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on("join-room", (identifier: string) => {
        socket.join(identifier);
        console.log(`Client ${socket.id} joined room: ${identifier}`);
      });

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  };
}
