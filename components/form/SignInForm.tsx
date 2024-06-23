'use client';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { SignInSchema, SignInSchemaType } from '@/schemas/SignInSchema';
import { useAuthModalStore } from '@/store/AuthModalStore';

const SignInForm = () => {
  const {changeType} = useAuthModalStore(state => state)
  const { toast } = useToast()
  const router = useRouter();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async(values: SignInSchemaType) => {
    
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    })
    
    if(signInData?.error){
      
      toast({
        title: "Error",
        description: `${signInData.error}`,
        variant: "destructive"
      })
    }else{
      toast({
        title: "Hurra!",
        description: "Now you are signed in.",
      });
      router.push("/")
      changeType(null)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          Sign in
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;