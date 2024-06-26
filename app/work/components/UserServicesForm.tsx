"use client"
 
import { UseFormReturn, useForm } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { UserServicesSchemaType } from "@/schemas/UserServicesSchema"
import { Service } from "@prisma/client"
 
 
interface UserServicesForProps {
    form: UseFormReturn<UserServicesSchemaType>;
    services: Service[];
  }

export function UserServicesForm({ form, services }: UserServicesForProps) {
 
 
  return (
        <FormField
          control={form.control}
          name="services"
          render={() => (
            <FormItem className="self-start">
              <div className="mb-4">
                <FormLabel className="text-2xl font-bold">Services</FormLabel>
                <FormDescription className="text-xl">
                  Select the services you want to add.
                </FormDescription>
              </div>
              {services.map((service) => (
                <FormField
                  key={service.id}
                  control={form.control}
                  name="services"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={service.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.some(item => item.id === service.id)}
                            onCheckedChange={(checked) => {form.clearErrors()
                              return checked
                                ? field.onChange([...field.value, { id: service.id, name: service.name, minutes: 30}])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value.id !== service.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {service.name}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </FormItem>
          )}
        />
  )
}