import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { UserServicesSchemaType } from '@/schemas/UserServicesSchema'
import { Category } from '@prisma/client'
import { SelectContent } from '@radix-ui/react-select'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

interface UserCategoryForProps {
    form: UseFormReturn<UserServicesSchemaType>;
    category: Category[]
  }

const UserCategoryForm = ({form, category}:UserCategoryForProps) => {
    
  return (
    <FormField
    control={form.control}
    name="category"
    render={({ field }) => (
      <FormItem
        className={cn(
          "flex-grow",
          form.getValues().category && "text-cyan-500"
        )}
      >
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          <FormControl
            className="text-lg md:text-2xl p-8 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent
      outline-none"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
          </FormControl>
          <SelectContent className='bg-white'>
            {category.map((category) => (
          <SelectItem className="text-lg px-8 " value={category.id} key={category.id}>
            {category.name}
          </SelectItem>
        ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default UserCategoryForm