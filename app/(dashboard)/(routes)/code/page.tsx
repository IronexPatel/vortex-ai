"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import * as z from "zod"
import { Heading } from "@/components/heading";
import { CodeXml} from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CodePage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => { 
        console.log(values);
     };

    return ( 


        <div>
            <Heading
            title="Code Generation"
            description="Generate code using descriptive text."
            icon={CodeXml}
            iconColor="text-gray-700"
            bgColor="bg-gray-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form} >
                        <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
                        rounded-lg
                        border
                        w-full
                        p-4
                        px-3
                        md:px-6
                        focus-within:shadow-sm
                        grid
                        grid-cols-12
                        gap-2"
                        >
                            <FormField
                            name= "prompt" 
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input 
                                        className="border-0 outline-none focus-visible:ring-0
                                        focus-visible:ring-inherit"
                                        disabled={isLoading}
                                        placeholder="Simple toggle button using react hooks."
                                        {...field}
                                        
                                        />
                                    </FormControl>
                                    
                                </FormItem>
                            )}
                            />
                            <Button className="col-span-12 lg:col-span-2 bg-gray-800 text-white" disabled={isLoading} >
                                Generate
                                </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    Messages Content
                </div>
            </div>
        </div>
     );
}
 
export default CodePage;