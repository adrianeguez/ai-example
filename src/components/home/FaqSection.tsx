'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqItems = [
  {
    question: 'How do I choose the right supplements?',
    answer: 'Consider your specific health goals, consult with a healthcare professional, and review our product descriptions carefully. We provide detailed information about each supplement\'s benefits and recommended usage.'
  },
  {
    question: 'What is your shipping policy?',
    answer: 'We offer free shipping on orders over $50. Standard shipping takes 3-5 business days, while express shipping is available for 1-2 business days delivery.'
  },
  {
    question: 'Are your supplements third-party tested?',
    answer: 'Yes, all our supplements undergo rigorous third-party testing to ensure quality, purity, and potency. Test results are available upon request.'
  },
  // Add more FAQ items as needed
]

export default function FaqSection() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
} 