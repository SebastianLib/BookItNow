import { useToast } from "@/components/ui/use-toast";
import { EditUserSchemaType } from "@/schemas/EditUserProfile";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export function useUpdateUserServicesMutation() {
    const router = useRouter();
  const { toast } = useToast()
  return useMutation({
    mutationFn: (data:{id:string, value:number}) => {        
      return axios.put('/api/work/services', data);
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
        description: "You have successfully updated serve hours",
      });
      router.refresh();
    }
  });
}