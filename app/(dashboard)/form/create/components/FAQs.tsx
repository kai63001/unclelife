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
            answer: "This message indicates that we couldn't find any databases associated with your Notion account. Please ensure you've properly connected your Notion account to UncleLife.co and that you have databases set up in Notion.",
            youTube: "https://www.youtube.com/embed/ywgMgCBKJvc?si=B5nbwyaaCTQUDt6D"
        },
        {
            question: "I'm trying to create a form, but I can't see my database. What should I do?",
            answer: "1. **Check Your Connection:** Ensure you're connected to the internet and that there are no network disruptions.\n2. **Re-integration:** Sometimes, re-integrating can help. Try logging out of UncleLife.co and then logging back in.\n3. **Wait a Bit:** After re-integrating, please wait for 3-5 minutes. Some databases might take a short while to appear due to syncing delays.\n4. **Still Not Working?** If you're certain you've connected your Notion account and the database still doesn't appear, please contact our admin support team for further assistance.",
            youTube: "https://www.youtube.com/embed/ywgMgCBKJvc?si=B5nbwyaaCTQUDt6D"
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
        },
        {
            question: "I encountered an error when submitting my form related to 'mismatched mapping' or 'body error...'. What does this mean?",
            answer: "This error typically arises when there's a discrepancy between the type of input field in your form and the corresponding column type in your Notion database. For instance, if you've set up a multi-selection input in your form but are trying to map it to a single selection column in Notion, a mismatch occurs. To resolve this, ensure that the input fields in your form align with the column types in your Notion database. You might need to adjust either the form input or the database column to ensure they match."
        }
    ];

    return (
        <Accordion type="single" collapsible className="w-full mt-5 mb-5">
            {listFaq.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="w-full">{faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="w-full whitespace-pre-line">
                            {faq.answer}
                            {faq.youTube && (
                                <div className={'flex justify-center mt-5'}>
                                    <iframe width="860" height="515" src={faq.youTube} title=""
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen></iframe>
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                )
            )}
        </Accordion>
    )
}

export default CreateFormFAQs
