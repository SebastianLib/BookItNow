"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { EditUserSchema, EditUserSchemaType } from '@/schemas/EditUserProfile'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'next-auth'
import React from 'react'
import { useForm } from 'react-hook-form'

const UserProfile = ({user}:{user:User}) => {

    const form = useForm<EditUserSchemaType>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
         name: user.name || "",
          email: user.email || "",
          oldPassword: "",
          newPassword: "",
          isCreator: user.isCreator,
        },
      });
    
      const onSubmit = async (values: EditUserSchemaType) => {

      };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jan Kowalski" {...field} />
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
            name="oldPassword"
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
              <FormItem className="flex flex-row items-center gap-4 justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Are you creator?</FormLabel>
                  <FormDescription>
                    You can choose your services and start booking <br />
                    clients on this platform.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        <Button disabled={false} className="w-full mt-6" type="submit">
          Update
        </Button>
      </form>
    </Form>
  )
}

export default UserProfile