import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FAQs = () => {
    const listFaq = [
        {
            question: "What is UncleLife.co?",
            answer: "UncleLife.co is a platform designed to enhance your Notion experience by providing custom forms, widgets, and other integrative tools."
        },
        {
            question: "How do I get started with UncleLife.co?",
            answer: "Simply sign up on our platform, integrate with your Notion account, and start creating custom forms and widgets!"
        },
        {
            question: "Is my data secure with UncleLife.co?",
            answer: "Absolutely! We prioritize your data's security and have implemented top-tier encryption and security measures to ensure its safety."
        },
        {
            question: "Do I need a Notion account to use UncleLife.co?",
            answer: "Yes, since our platform enhances the Notion experience, you'll need a Notion account to make the most of our features."
        },
        {
            question: "How does the subscription model work?",
            answer: "We offer both free and premium plans. The premium plans unlock additional features and capabilities. You can view the details on our Pricing page."
        },
        {
            question: "Can I cancel my subscription at any time?",
            answer: "Yes, you can cancel your subscription whenever you wish. Once canceled, you won't be billed for the subsequent billing cycle."
        },
        {
            question: "Do you offer customer support?",
            answer: "Yes, our dedicated support team is always ready to assist you. You can reach out to us via our Contact page."
        },
        {
            question: "Are there any tutorials or guides available?",
            answer: "Certainly! We have a range of tutorials and how-to guides to help you navigate and utilize our platform effectively."
        },
        {
            question: "Can I request new features or widgets?",
            answer: "Absolutely! We value user feedback and are always looking to improve. Feel free to share your suggestions with us."
        },
        {
            question: "Is UncleLife.co mobile-friendly?",
            answer: "Yes, our platform is designed to be responsive and works seamlessly on both desktop and mobile devices. but we recommend using it on desktop for the best experience."
        }
    ];

    return (
        <Accordion type="single" collapsible className="w-full my-10">
            {listFaq.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="w-full">
                            {faq.question}
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

export default FAQs
