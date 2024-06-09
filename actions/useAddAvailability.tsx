import { useToast } from "@/components/ui/use-toast";
import { AddAvailabilitySchemaType } from "@/schemas/AddAvailabilitySchema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useAddAvailability() {
  const { toast } = useToast()
  return useMutation({
    mutationFn: (data:AddAvailabilitySchemaType) => {
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