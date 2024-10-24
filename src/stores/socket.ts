import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { io, Socket } from "socket.io-client";
import { config } from "@/config";
import { useProfile } from "./profile";
import { toast } from "vue-sonner";
import { useLoading } from "./loading.ts";

export const useSocket = defineStore("socket-store", () => {
  const profileStore = useProfile();
  const loadingStore = useLoading();

  const { profile } = storeToRefs(profileStore);

  const socket = ref<Socket | null>(null);
  const connectionError = ref<string | null>(null);

  const isConnected = computed(() => {
    return socket.value?.connected;
  });

  async function connect() {
    try {
      await loadingStore.setLoading(true);
      if (!profile.value) {
        await profileStore.getProfile();
      }
      socket.value = io(config.SERVER_BASE, { reconnectionAttempts: Infinity });
      socket.value.on("connect", async () => {
        // const socketId = socket.value?.id
        socket.value?.emit("connection:init", {
          user: {
            type: "courier",
            login: profile.value?.login,
            socketId: socket.value.id,
            id: profile.value?.id,
            details: {
              fullname: profile.value?.fullname,
              phone: profile.value?.phone,
            },
          },
        });
      });

      socket.value.on("message:connection-confirmed", async (data) => {
        await loadingStore.setLoading(false);
        toast(data.msg);
        return;
      });
    } catch (error) {
      await loadingStore.setLoading(false);
      console.error("Error connecting to the socket server:", error);
      connectionError.value = "Failed to connect to the socket server";
    }
  }

  async function disconnect() {
    try {
      if (!socket.value) return;

      await loadingStore.setLoading(true);
      socket.value?.emit("connection:disconnect", {
        user: { socketId: socket.value.id },
      });

      socket.value.on("message:disconnection-confirmed", async (data) => {
        toast(data.msg);
        return;
      });
    } catch (e) {}
  }

  async function attachSocketEvents() {
    if (!socket.value) return;

    socket.value.on("disconnect", () => {
      console.log("Disconnected from the socket server");
    });
  }

  async function detachSocketEvents() {
    if (!socket.value) return;
    socket.value.off("disconnect");
  }

  return {
    socket,
    connect,
    connectionError,
    isConnected,
    attachSocketEvents,
    detachSocketEvents,
  };
});
