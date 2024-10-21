import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

// shadcn components
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormLabel,
	FormControl,
	FormItem,
	FormMessage,
} from "@/components/ui/form"
import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

const signupFormSchema = z.object({
	firstname: z.string().min(2,
		{message: "Must be longer than 2 characters"}).max(50,
			{message: "Must be less than 50 characters"}),
	middlename: z.string().max(50,
		{message: "Must be less than 50 characters"}).optional(),
	lastname: z.string(),
	email: z.string().email('This is not a valid email'),
	password: z.string(),
})

const SignupForm:React.FC = () => {
	// form definition
	const form = useForm<z.infer<typeof signupFormSchema>>({
		resolver: zodResolver(signupFormSchema),
		defaultValues: {
			firstname: '',
			middlename: '',
			lastname: '',
			email: '',
			password: ''
		}
	})
	// submit handler
	const onSubmit = (values: z.infer<typeof signupFormSchema>) => {
		console.log(values);
	}

	return (
		<Card className="w-1/2 h-fit p-4 flex items-center justify-center">
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 h-full p-4 flex flex-col gap-4">
			<h1 className="text-2xl mb-4 mt-0">Signup</h1>
			<FormField
				// control={form.control}
				name="firstname"
				render={({ field }) => (
					<FormItem className="form-item">
						<FormLabel>First name</FormLabel>
						<FormControl>
							<Input placeholder="Enter your first name" {...field}
							className="form-input"/>
						</FormControl>
						<FormMessage />
					</FormItem>
					)}
			/>
			<FormField
				// control={form.control}
				name="middlename"
				render={({ field }) => (
					<FormItem className="form-item">
						<FormLabel>Middle name / Initials</FormLabel>
						<FormControl>
							<Input placeholder="Optional" {...field}
							className="form-input"/>
						</FormControl>
						<FormMessage />
					</FormItem>
					)}
			/>
			<FormField
				// control={form.control}
				name="lastname"
				render={({ field }) => (
					<FormItem className="form-item">
						<FormLabel>Surname</FormLabel>
						<FormControl>
							<Input placeholder="Enter your lastname" {...field}
							className="form-input"/>
						</FormControl>
						<FormMessage />
					</FormItem>
					)}
			/>

			<FormField
				// control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem className="form-item">
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input type="email" placeholder="Enter your email" {...field}
							className="form-input"/>
						</FormControl>
						<FormMessage />
					</FormItem>
					)}
			/>

			<FormField
				// control={form.control}
				name="password"
				render={({ field }) => (
					<FormItem className="form-item">
						<FormLabel>Password</FormLabel>
						<FormControl>
							<Input type="password" placeholder="Enter your password" {...field}
							className="form-input"/>
						</FormControl>
						<FormMessage />
					</FormItem>
					)}
			/>
			<Button type="submit" className="mt-4 p-6 text-lg bg-sky-800">Sign up</Button>
			</form>
		</Form>
		</Card>
	)
}

export default SignupForm;
