import CheckoutChrome from "../../components/layout/CheckoutChrome";

// /checkout/ only: the reduced chrome, no nav row and no footer.
export default function CheckoutLayout({ children }) {
  return <CheckoutChrome>{children}</CheckoutChrome>;
}
