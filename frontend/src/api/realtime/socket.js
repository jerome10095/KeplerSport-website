import { io } from 'socket.io-client';

const websocketUrl = import.meta.env.VITE_WS_URL;

export const socket = websocketUrl
  ? io(websocketUrl, {
      autoConnect: false,
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    })
  : null;