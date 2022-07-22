import { io, Socket } from 'socket.io-client'

export default class SocketClient {
    socket: Socket | null | undefined

    connect(token?: string) {

        this.socket = io('http://13.38.251.175/', {
            extraHeaders: token ? {
                "x-auth-token": token || "",
            } : {},
            forceNew: true,
            reconnection: true,
            requestTimeout: 10000,
            transportOptions: ["websocket"]
        })

    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
        }
    }

    emit(eventName: string, data: any) {
        if (this.socket) {
            this.socket.emit(eventName, data)

        }
    }

    on(eventName: string, func: (args: any[]) => void) {
        if (this.socket) {
            this.socket.on(eventName, func)
        }
    }
}