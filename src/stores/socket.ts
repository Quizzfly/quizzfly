import { defineStore } from "pinia";
import { Client } from "@stomp/stompjs";
// import { getEndpointApi } from "@/services/master";

const BASE_URL_SOCKET = import.meta.env.VITE_BASE_URL_SOCKET;

// websocket store
export const useSocketStore = defineStore({
    id: "socket",
    state: () => ({
        client: null as null | Client,
        endpoint: "",
        messages: {} as any,
    }),
    actions: {
        async getEndpointApi(): Promise<any> {},
        async setupSocketStore() {
            try {
                this.endpoint = (await this.getEndpointApi()).data;
                this.clearSocketStore();
                this.client = new Client({
                    connectHeaders: {
                        login: "admin",
                        passcode: "admin",
                    },
                    brokerURL: BASE_URL_SOCKET,
                    heartbeatIncoming: 0,
                    heartbeatOutgoing: 20000,
                    reconnectDelay: 1000,
                    onConnect: (): void => {
                        this.client &&
                            this.client.subscribe(
                                `/queue/${this.endpoint}`,
                                (newContent: any) => {
                                    this.messages = JSON.parse(newContent.body) as any;
                                    // handleNoti(message);
                                },
                                {
                                    durable: "false",
                                    exclusive: "false",
                                    "auto-delete": "false",
                                    id: `${this.endpoint}`,
                                },
                            );
                    },
                });
                this.client.activate();
            } catch (error) {
                console.log(error);
            }
        },
        clearSocketStore() {
            if (this.client) {
                this.client.unsubscribe(`${this.endpoint}`);
                this.client.deactivate();
                this.client = null;
            }
        },
    },
    getters: {
        getMessages: (state) => state.messages,
    },
});
