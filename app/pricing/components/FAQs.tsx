import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const PricingFaq = () => {
    const listFaq = [
        {
            question: "What payment methods do you accept?",
            answer: "We process payments through Stripe, which accepts all major credit cards."
        },
        {
            question: "Is there a free trial available?",
            answer: "Yes, we offer a 14-day free trial for new users. You can try out all our premium features without any commitment."
        },
        {
            question: "What happens after my free trial ends?",
            answer: "Once your trial period concludes, you'll be automatically billed through Stripe for the plan you selected. Ensure you have sufficient funds in your account to avoid any disruptions."
        },
        {
            question: "Can I change my plan later?",
            answer: "Absolutely! You can upgrade or downgrade your plan at any time from your account settings."
        },
        {
            question: "What if I decide to cancel my subscription?",
            answer: "You can cancel your subscription at any time. Once canceled, you won't be billed for the next billing cycle. However, if you've been billed already, remember to check our refund policy."
        },
        {
            question: "Do you offer any discounts?",
            answer: "Yes, we offer discounts for annual subscriptions, non-profits, and educational institutions. Please contact our sales team for more details."
        },
        {
            question: "Is my payment information secure?",
            answer: "Absolutely. We use Stripe, a leading payment gateway, to process your payments. Stripe uses industry-standard encryption and security measures to protect your payment details."
        },
        {
            question: "Do you have a refund policy?",
            answer: "Yes, we offer a 10-day money-back guarantee. If you're not satisfied with our service within the first 10 days of your purchase, we'll refund your payment."
        },
        {
            question: "What's the difference between the monthly and annual plans?",
            answer: "The main difference is the billing frequency. With the monthly plan, you're billed once a month, while with the annual plan, you're billed once a year at a discounted rate."
        },
        {
            question: "How do I get an invoice for my subscription?",
            answer: "Invoices are automatically generated and can be accessed from your account dashboard. If you need further assistance, please contact our support team."
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

export default PricingFaq
