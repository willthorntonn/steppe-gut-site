import { EYEBROW_CLS, EYEBROW_CLS_DARK } from "../../styles/type";

// Small uppercase label above a heading. Renders a <p>, never a heading
// element — it is not part of the document outline
// (05_component_library.md §6).
export default function Eyebrow({ tone = "light", className = "", children }) {
  return (
    <p
      className={`${tone === "dark" ? EYEBROW_CLS_DARK : EYEBROW_CLS} ${className}`}
    >
      {children}
    </p>
  );
}
