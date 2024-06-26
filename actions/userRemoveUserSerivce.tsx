import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export function useRemoveUserService() {
    const router = useRouter();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (id: string) => {
      return axios.delete("/api/work/services", { data: { id } });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Oops! Something went wrong",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Hurra!",
        description: "You have successfully removed your service",
      });
      router.refresh();
    },
  });
}
