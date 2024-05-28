import { useToast } from "@/components/ui/use-toast";
import { SignUpSchemaType } from "@/schemas/SignUpSchema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useCreateUserMutation() {
  const { toast } = useToast()
  return useMutation({
    mutationFn: (values:SignUpSchemaType) => {
      return axios.post('/api/user', values);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Oops! Something went wrong",
        variant: "destructive"
      });
    },
    onSuccess: () => {
      toast({
        title: "Hurra!",
        description: "You have successfully added user",
      });
    }
  });
}