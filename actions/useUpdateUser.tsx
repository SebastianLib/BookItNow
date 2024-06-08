import { useToast } from "@/components/ui/use-toast";
import { EditUserSchemaType } from "@/schemas/EditUserProfile";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export function useUpdateUserMutation() {
    const router = useRouter();
  const { toast } = useToast()
  return useMutation({
    mutationFn: (values:EditUserSchemaType &{id:string}) => {
      return axios.put('/api/user', values);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `${error?.response?.data?.message}`,
        variant: "destructive"
      });
    },
    onSuccess: () => {
      toast({
        title: "Hurra!",
        description: "You have successfully updated your account",
      });
      router.refresh();
    }
  });
}