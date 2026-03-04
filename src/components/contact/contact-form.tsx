import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
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
    }, [form]);

    function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);
        setError(null);
        setMessage(null);

        if (data.company === "" || data.company === undefined) {
            data.company = "N/A";
        }

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
                setError(
                    "Failed to send message. Please try again later, or contact me directly at me@armaanv.dev"
                );
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
                                <FormLabel className="minor-heading pl-1">
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="minor-heading pl-1">
                                    Name
                                    <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder={"Humany McPersonface"}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="minor-heading pl-1">Company</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder={"Company Inc."}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="minor-heading pl-1">
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="minor-heading pl-1">
                                    Message
                                    <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder={
                                            // if is morning, say good morning, if before 5 say good afternoon, else good evening
                                            new Date().getHours() < 12
                                                ? "Good morning!"
                                                : new Date().getHours() < 17
                                                ? "Good afternoon!"
                                                : "Good evening!"
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-h-10 sm:flex-1">
                            {loading && (
                                <p className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-card/20 px-3 py-2 text-sm text-muted-foreground">
                                    <Loader2 size={14} className="animate-spin" />
                                    Sending message...
                                </p>
                            )}
                            {!loading && error && (
                                <p className="inline-flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                                    <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                                    {error}
                                </p>
                            )}
                            {!loading && !error && message && (
                                <p className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-accent">
                                    <CheckCircle2 size={14} className="shrink-0" />
                                    {message}
                                </p>
                            )}
                        </div>
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
