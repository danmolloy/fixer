import Link from "next/link";
import { faqData } from "./faqData";

export default function FaqIndex() {
  return (
    <div data-testid="faq-index" className="border rounded shadow px-4 py-8">
      <div>
        <h1 className="font-bold ">Frequently Asked Questions</h1>
        <p className="py-4">Can{"'"}t find the answer you{"'"}re looking for? <Link href="/contact" className="text-indigo-600 font-extrabold hover:underline">Contact us</Link>.</p>
      </div>
      <div className="py-4">
        {faqData.map(i => (
          <div data-testid={`question-${i.id}`} className="py-4" key={i.id}>
            <p className="font-bold text-lg py-2">{i.question}</p>
            <p>{i.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}