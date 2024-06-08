import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  hours?: number[]
  day: string;
}

export function useAddAvailability() {
  const { toast } = useToast()
  return useMutation({
    mutationFn: (data:Props) => {
      return axios.post('/api/work/availability', data);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Oops! Something went wrong",
        variant: "destructive"
      });
    },
    onSuccess: (res) => {      
      toast({
        title: "Hurra!",
        description: `${res.data.message}`,
      });
    }
  });
}