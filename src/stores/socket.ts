import { onMounted, onUnmounted, ref } from "vue";
import { io, Socket } from "socket.io-client";
import { config } from "@/config";
import { Preferences } from "@capacitor/preferences";
import { defineStore, storeToRefs } from "pinia";
import { toast } from "vue-sonner";
import { useProfile } from "./profile";
import { Network } from "@capacitor/network";
import { useRouter } from "vue-router";
import { useLoading } from "@/stores/loading.ts";

export const useSocket = defineStore("socket-store", () => {
  const profileStore = useProfile();
  const loadingStore = useLoading();
  const router = useRouter();

  const { profile } = storeToRefs(profileStore);

  const state = ref({
    connected: false,
    socketId: "",
    disconnected: false,
  });

  const socket: Socket = io(config.SERVER_BASE, {
    autoConnect: false,
  });

  const connectSocket = async () => {
    try {
      if (!state.value.connected) {
        socket.connect();
      } else if (state.value.connected) {
        toast("Allaqachon ulangan yoki boshqatdan urinib ko'ring");
      }
    } catch (error: any) {
      console.error("Error connecting socket:", error);
      toast(
        error.message ||
          error.response?.data?.msg ||
          "Faollikni ishga tushirishda xatolik yuzaga keldi, dasturni boshqatdan ishga tushiring",
      );
    }
  };

  const initConnection = async (socketId: string) => {
    try {
      await loadingStore.setLoading(true);
      if (!profile.value) {
        await profileStore.getProfile();
      }
      const { value: login } = await Preferences.get({ key: "login" });
      if (login) {
        const user = {
          socketId: socket.id,
          login,
          type: "courier",
          id: profile.value?.id,
          details: {
            fullname: profile.value?.fullname,
            phone: profile.value?.phone,
          },
        };
        socket.emit("connection:init", { user });
      } else {
        throw new Error("Login is not found");
      }
    } catch (error) {
      await loadingStore.setLoading(false);
      console.error("Error initializing connection:", error);
      toast("Connection initialization failed. Please try again.");
    }
  };

  const disconnectSocket = async () => {
    try {
      if (state.value.connected) {
        const { value: login } = await Preferences.get({ key: "login" });
        if (login) {
          socket.emit("connection:disconnect");
          state.value.disconnected = true;
          state.value.socketId = "";
        } else {
          throw new Error("Login is not found");
        }
      } else {
        return;
      }
    } catch (error: any) {
      console.error("Error disconnecting socket:", error);
      toast(
        error.message ||
          error.response?.data?.msg ||
          "Faollikni o'chirishda xatolik yuzaga keldi, dasturni boshqatdan ishga tushiring",
      );
    }
  };

  socket.on("connect", async () => {
    state.value.socketId = socket.id as string;
    state.value.connected = true;
    await initConnection(socket.id as string);
  });

  socket.on("disconnect", () => {
    state.value.connected = false;
    state.value.socketId = "";
    console.log("Disconnected from server");
  });

  socket.on("connection:error", async (data) => {
    toast(data.msg);
    state.value.connected = false;
    state.value.socketId = "";
    socket.disconnect();
  });

  socket.on("message:disconnection-confirmed", async (data) => {
    toast(data.msg);
  });

  socket.on("message:connection-confirmed", async (data) => {
    toast(data.msg);
  });

  onMounted(() => {
    Network.addListener("networkStatusChange", async (status) => {
      if (!status.connected) {
        await router.push("/no-internet");
      }
    });
  });

  onUnmounted(() => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("message:disconnection-confirmed");
    socket.off("message:connection-confirmed");
  });

  return {
    state,
    connectSocket,
    initConnection,
    disconnectSocket,
    socket,
  };
});
