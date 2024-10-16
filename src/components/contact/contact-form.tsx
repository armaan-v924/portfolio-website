import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { RotateLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters",
    }),
    company: z.string().optional(),
    subject: z.string().min(3, {
        message: "Subject must be at least 5 characters",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters",
    }),
});

function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            company: "",
            subject: "",
            message: "",
        },
    });

    useEffect(() => {
        const preservedForm = sessionStorage.getItem("form") as string | null;
        if (preservedForm) {
            form.reset(JSON.parse(preservedForm));
        }
    }, []);

    function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);
        setError(null);
        setMessage(null);

        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
                data,
                { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string }
            )
            .then(() => {
                setMessage("Message sent!");
                form.reset();
            })
            .catch((e) => {
                console.log(e);
                setError("Failed to send message. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                    }}
                    className="space-y-8 text-start"
                    onChange={() => {
                        sessionStorage.setItem(
                            "form",
                            JSON.stringify(form.getValues())
                        );
                    }}
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email
                                    <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="hello@howdy.com"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please enter your email address, so I know
                                    how to get back to you.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Name
                                    <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder={"Human McPerson"}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please enter your preferred name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder={"Company Inc."}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please enter your company's name, if
                                    applicable.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Subject
                                    <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Hello!"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please enter the subject of your message.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Message
                                    <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder={
                                            // if is morning, say good morning, if before 4 say good afternoon, else good evening
                                            new Date().getHours() < 12
                                                ? "Good morning!"
                                                : new Date().getHours() < 16
                                                ? "Good afternoon!"
                                                : "Good evening!"
                                        }
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please enter your message.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="align-middle justify-between">
                        <RotateLoader
                            loading={loading}
                            color={
                                window.document.documentElement.classList.contains(
                                    "dark"
                                )
                                    ? "#fff"
                                    : "#000"
                            }
                            speedMultiplier={0.75}
                            size={10}
                            className="inline-block"
                        />
                        {error ? (
                            <>
                                <p className="text-destructive font-bold">
                                    {error}
                                </p>
                            </>
                        ) : message ? (
                            <>
                                <p className="text-accent font-bold">
                                    {message}
                                </p>
                            </>
                        ) : (
                            <span />
                        )}
                        <Button
                            type="submit"
                            className="float-right group hover:shadow-glow transition-shadow hover:bg-primary self-end"
                            disabled={loading}
                        >
                            Submit
                            <ArrowRight
                                size={16}
                                className="ml-2 group-hover:-rotate-45 transition-transform"
                            />
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}

export default ContactForm;
