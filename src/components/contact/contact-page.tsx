import NavBar from "@/components/navigation-bar";
import ContactForm from "@/components/contact/contact-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function Contact() {
    return (
        <div className="flex flex-col">
            <NavBar currentPage="Let's Talk" className="float-right" />
            <Card className="my-5 p-5 w-2/3 self-center border-none shadow-none">
                <CardHeader>
                    <CardTitle>Let's get in touch!</CardTitle>
                    <CardDescription>
                        Fill out the form below to get in touch with me!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>
        </div>
    );
}

export default Contact;
