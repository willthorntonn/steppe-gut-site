import { PAYMENT_METHODS } from "./payments";

// The single source for the /faq/ accordion. One array of groups, each with a
// heading (<h2>) and its questions (<h3><button> rows in FaqAccordion).
//
// Each item is { id, question, answer } for prose, or { id, question, steps }
// for a numbered action list. `answer` is plain text; the only markup it may
// contain is [label](/route/), which FaqAccordion turns into a Link. Blank
// lines split paragraphs.
//
// Answers were drafted for this page in the brand voice (WRITING_STYLE.md,
// PUNCTUATION_RULE.md, claim discipline from 02_brand_guidelines.md §6). Two
// reuse wording already settled in website_blueprint/pages/faq-hub.md and are
// marked SOURCE so they stay in step with it.

// Read from src/data/payments.js so the FAQ can never list a method the
// checkout doesn't offer, or miss one it does. Order kept card-first.
const PAY_ORDER = ["visa", "mastercard", "promptpay", "truemoney", "applepay", "googlepay"];
const payLabels = [...PAYMENT_METHODS]
  .sort((a, b) => PAY_ORDER.indexOf(a.id) - PAY_ORDER.indexOf(b.id))
  .map((method) => method.label);
const payList = `${payLabels.slice(0, -1).join(", ")} and ${payLabels.at(-1)}`;

export const FAQ_GROUPS = [
  {
    id: "product",
    heading: "The product",
    items: [
      {
        id: "what-is-steppe-gut",
        question: "What is Steppe Gut?",
        answer:
          "Fermented mare's milk powder from Mongolia, sold as a daily supplement. One 10 g sachet stirred into water once a day, or the same dose as 3 capsules or a level scoop of loose powder. It is not a probiotic (drying ends the live culture). What remains is the nutritional product of fermentation: naturally present vitamin C, A, B vitamins, omega-3, calcium, iron, lactoferrin and lysozyme",
      },
      {
        id: "how-does-it-work",
        question: "How does it work?",
        answer:
          "Fermentation breaks down much of the lactose and casein in mare's milk, making nutrients more bioavailable. The powder contains naturally present vitamin C (contributes to collagen formation), B vitamins (contribute to energy metabolism), calcium and phosphorus (contribute to bone structure) and lactoferrin and lysozyme (proteins with general immune function). We have not run a human trial and cannot tell you how it works specifically in your body",
      },
      {
        id: "how-do-i-use-it",
        question: "How do I use it?",
        steps: [
          "Tear a sachet open, or add one level scoop from the pouch, or take three capsules",
          "Add to 100 ml of cool or room-temperature water (hot water worsens the taste)",
          "Stir and drink within a minute or two",
          "Take it at the same time each day (consistency matters more than the hour)",
        ],
      },
      {
        id: "building-up-usage",
        question: "What's the recommended way to build up usage?",
        answer:
          "Start with one sachet daily and stay there. There is no benefit to building up the dose or taking more than one a day. One sachet daily for a year is better than three a day for a month. If you forget a day, take the next one as normal, there is no catching up to do",
      },
      {
        id: "how-often-and-results",
        question:
          "How many times a week should I take it, and how long until I see results?",
        answer:
          "Once a day, every day. We are not going to tell you how long until you notice something because we have not run a trial and anyone who gives you a specific number is guessing. Take it daily and judge for yourself",
      },
      {
        id: "every-day",
        question: "Can I use it every day?",
        answer:
          "Yes. The recommended dose is one 10 g sachet (or 3 capsules) daily. There is no benefit to taking more. We would rather you took one a day for a year than three a day for a month. Consistency over time is what matters",
      },
      {
        id: "does-it-really-work",
        question: "Does it really work?",
        answer:
          "We do not know. We can tell you what is in it (fermented mare's milk with naturally present vitamins, minerals, proteins and fats) and that nutritional intake matters over weeks and months, but we have not run a human trial. If it works, the effect is likely gradual. If you want evidence, speak to your doctor",
      },
      {
        // SOURCE: faq-hub.md `how-long`. Keep in step with the research position.
        id: "how-long-to-work",
        question: "How long does it take to work?",
        answer:
          "We are not going to give you a number. Nutritional intake works over weeks and months, we have not run a trial, and anyone offering you a specific timeline is guessing. Take it daily and judge for yourself",
      },
      {
        id: "whats-in-the-box",
        question: "What comes in the box?",
        answer:
          "The Sachet Box contains 25 sachets of 10 g fermented mare's milk powder (25 days). The Pill Bottle contains 90 capsules (30 days at 3 capsules daily). The Refill Pouch contains 250 g of loose powder with a measuring scoop (25 servings). All three formats contain the same powder, just different delivery methods",
      },
      {
        id: "is-it-safe",
        question: "Is it safe? Who shouldn't take it?",
        answer:
          "It is a dairy product made from mare's milk. If you have a milk allergy, do not take it. If you are lactose intolerant, fermentation breaks down most lactose but some remains. If you tolerate yoghurt you may tolerate this, but ask your doctor first. Pregnant or breastfeeding, on medication, or under care for a condition? Speak to your doctor or pharmacist",
      },
      {
        id: "who-is-it-for",
        question: "Who is this for?",
        answer:
          "Anyone who wants to take fermented mare's milk daily as a nutritional supplement. We do not market it to children and have no basis for a recommendation about them or pregnancy. Vegetarians yes, vegans no (it is dairy). It is not a probiotic and not a medicine",
      },
    ],
  },
  {
    id: "ordering",
    heading: "Ordering & shipping",
    items: [
      {
        id: "how-do-i-place-my-order",
        question: "How do I place my order?",
        steps: [
          "Go to [the products page](/products/) and choose a format (Sachets, Capsules, or Refill Pouch)",
          "Add it to your cart",
          "Enter your shipping address and select a payment method",
          "Review your order and confirm",
        ],
      },
      {
        id: "order-submitted-confirmation",
        question: "How do I know my order was submitted?",
        answer:
          "After you confirm your order you will see a confirmation page with your order number. Keep that page or note the number down so you have it for reference",
      },
      {
        // SOURCE: faq-hub.md `delivery-time`.
        id: "when-expect-shipment",
        question: "When can I expect my shipment?",
        answer: "Two to four working days across Thailand",
      },
      {
        id: "tracking-not-working",
        question: "Why is my tracking number not working?",
        answer:
          "You will receive a shipping notification with a tracking number once your order is dispatched. It may take a little time for the tracking link to go live with the carrier. If it still does not work after a day, [contact us](/contact/)",
      },
      {
        id: "which-countries",
        question: "Which countries do you ship to?",
        answer:
          "We currently ship to Thailand only, direct from this site",
      },
      {
        id: "shipping-rates",
        question: "What are your shipping rates?",
        answer:
          "We deliver to any address in Thailand within 2 to 4 working days. Delivery is a single flat rate nationwide, not worked out by address. It shows as its own line in your cart and at checkout, before you confirm payment",
      },
      {
        id: "cancellation-policy",
        question: "What's your order cancellation policy?",
        answer:
          "If you need to cancel, [contact us](/contact/) immediately. If your order has already been dispatched we cannot stop it, but unopened packs can be returned within 14 days for a refund. Opened food products cannot be accepted back for safety reasons",
      },
      {
        id: "change-shipping-address",
        question: "How can I change my shipping address?",
        steps: [
          "If you have not yet completed payment, edit your address before confirming the order",
          "If your order is already submitted, [contact us](/contact/) immediately with the correction",
          "We can change the address only if your order has not yet been dispatched, so contact us as soon as possible",
        ],
      },
      {
        id: "wrong-address-policy",
        question: "What's your wrong address policy?",
        answer:
          "If your address is undeliverable, we will contact you to provide a corrected one before redelivery. If we cannot reach you and the parcel returns to us, we will offer a refund or reshipping to the correct address at no extra cost. Return costs only apply if the address was clearly incorrect",
      },
    ],
  },
  {
    id: "payment",
    heading: "Payment",
    items: [
      {
        id: "payment-options",
        question: "What are your payment options?",
        answer: `We accept ${payList}. All payments are processed securely at checkout. We do not store your card details`,
      },
      {
        id: "forgot-coupon-code",
        question: "I have a coupon code I forgot to use, what do I do?",
        answer:
          "[Contact us](/contact/) with your order number and coupon code. If your order was placed recently and has not yet been dispatched, we may be able to apply the discount. For future orders, enter your coupon code at checkout before confirming payment",
      },
    ],
  },
];
