"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SignUpSchema, SignUpSchemaType } from "@/schemas/SignUpSchema";
import { Checkbox } from "../ui/checkbox";
import { useAuthModalStore } from "@/store/AuthModalStore";

const SignUpForm = () => {
  const {changeType} = useAuthModalStore(state => state)
  const { toast } = useToast();
  const router = useRouter();

  const { mutateAsync: createUserMutation, isPending } = useMutation({
    mutationFn: (values: SignUpSchemaType) => {
      return axios.post("api/user", {
        username: values.username,
        email: values.email,
        confirmPassword: values.confirmPassword,
        password: values.password,
        isCreator: values.isCreator,
      });
    },
    onSuccess: () => {
      toast({
        title: "Hurra!",
        description: "You are now signed up. you can sign in now",
      });
      router.push("/");
      changeType(null)
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Oops! Something went wrong",
        variant: "destructive",
      });
    },
  });

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpSchemaType) => {
    await createUserMutation(values);
  };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-Enter your password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Re-Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
          control={form.control}
          name="isCreator"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                are you creator?
                </FormLabel>
                <FormDescription>
                  You can choose your services and start booking clients on this platform.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
          </div>
          <Button disabled={isPending} className="w-full mt-6" type="submit">
            Sign up
          </Button>
        </form>
    </Form>
  );
};

export default SignUpForm;
