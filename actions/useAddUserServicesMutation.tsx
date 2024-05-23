import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  id: string;
  name: string;
  minutes: number;
}

export function useAddUserServicesMutation() {
  const { toast } = useToast()
  return useMutation({
    mutationFn: (newServices:Props[]) => {
      return axios.post('/api/services', newServices);
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
        description: "You have successfully added services",
      });
    }
  });
}