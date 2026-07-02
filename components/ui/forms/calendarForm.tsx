"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

const FormSchema = z.object({
  dob: z.date({
    required_error: "the date is required.",
  }),
})

export function CalendarForm({handleChange,date}:{handleChange:(value:Date|undefined)=>void,date?:Date|undefined}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  return (
    <Form {...form}>
      <div className="space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => {
            if(date){
              field.value=date;
            }

            return(
            <FormItem className="flex flex-col">
              <FormLabel>Deadline</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left text-black font-semibold",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>{'Pick a date'}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                                field.onChange(date); 
                                handleChange(date); 
                            }}
                    disabled={(date) =>
                      date < new Date() || date > new Date("2030-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                
                chose the time where the project ends
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}}
        />
      </div>
    </Form>
  )
}
