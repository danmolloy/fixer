import Link from "next/link";

const faqData: {
  id: number
  question: string
  answer: string
}[] = [
  {
    id: 0,
    question: "How do you make holy water?",
    answer: "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
  }, 
  {
    id: 1,
    question: "Why do you never see elephants hiding in trees?",
    answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
  },
  {
    id: 2, 
    question: "What's the best thing about Switzerland?",
    answer: "Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
  },
  {
    id: 3,
    question: "What do you call someone with no body and no nose?",
    answer: "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
  }

]

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