import { authInstance } from "@/http";
import { Preferences } from "@capacitor/preferences";
import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";

export const useAuth = defineStore("auth-store", () => {
  const router = useRouter();

  const courierDetails = ref<{ login: string; password: string }>({
    login: "",
    password: "",
  });

  async function login(payload: typeof courierDetails.value) {
    try {
      const response = await authInstance.post("/login", { ...payload });

      if (!response) {
        toast(
          "Internet yoki server bilan aloqa mavjud emas, boshqatdan urinib ko'ring",
        );
        return;
      }

      const data = await response.data;

      if (data.status === "bad") {
        toast(data.msg);
        return;
      }

      await Preferences.set({ key: "token", value: data.token });
      await Preferences.set({ key: "login", value: data.courier.login });
      await router.push("/");
      toast(data.msg);
      return;
    } catch (error: any) {
      toast(
        error.message ||
          error.response.data.msg ||
          "Qandaydir xatolik yuzaga keldi, boshqatdan urinib ko'ring",
      );
    }
  }

  return { login, courierDetails };
});
