import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const CreateFormFAQs = () => {
    const listFaq = [
        {
            question: "I received an error saying 'No databases found.' What does this mean?",
            answer: "This message indicates that we couldn't find any databases associated with your Notion account. Please ensure you've properly connected your Notion account to UncleLife.co and that you have databases set up in Notion."
        },
        {
            question: "How do I connect my Notion account to UncleLife.co?",
            answer: "Navigate to the 'Account Settings' or 'Integrations' section on UncleLife.co and follow the instructions to integrate with Notion. You might need to grant certain permissions for the integration to work seamlessly."
        },
        {
            question: "I've connected my Notion account, but I still see the error. What should I do?",
            answer: "Ensure that your Notion account has databases created. If the issue persists, try disconnecting and reconnecting your Notion account. If you continue to face problems, please contact our support team."
        },
        {
            question: "I'm trying to create a form, but I keep encountering errors. Why?",
            answer: "Errors can occur for various reasons, such as network issues, temporary server outages, or incorrect configurations. Please check your internet connection, ensure you've filled out all required fields, and try again."
        },
        {
            question: "Are there specific requirements for the databases in Notion to work with UncleLife.co?",
            answer: "Yes, certain configurations and permissions are required for seamless integration. Please refer to our 'Getting Started' guide for detailed steps and requirements."
        },
        {
            question: "I can't find a specific feature while creating a form. Where can I find it?",
            answer: "Ensure you're on the correct page or section. Some features might be available only for premium users or might be located under advanced settings. If you're unsure, our user guide or tutorial section can provide more clarity."
        },
        {
            question: "Who can I contact if I continue to face issues?",
            answer: "Our dedicated support team is here to help! Navigate to the 'Contact' or 'Support' section on our website and provide details about the issue you're facing. We'll get back to you as soon as possible."
        }
    ];

    return (
        <Accordion type="single" collapsible className="w-full mt-5 mb-5">
            {listFaq.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="w-full">{faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="w-full">
                           {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                )
            )}
        </Accordion>
    )
}

export default CreateFormFAQs
