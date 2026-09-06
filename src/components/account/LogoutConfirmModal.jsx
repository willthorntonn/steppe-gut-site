import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";
import { useAuth } from "../../auth/AuthProvider";

// "Are you sure?" gate before the header's Log out action. Confirming clears
// the stored session (AuthProvider.signOut) and returns the visitor to the
// homepage; cancelling just closes.
export default function LogoutConfirmModal({ open, onClose }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleConfirm = () => {
    signOut();
    onClose();
    navigate("/");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Log out?"
      description="Are you sure you want to log out? You'll need to sign in again to see your orders and saved addresses"
      maxWidth="max-w-[440px]"
    >
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-12 items-center justify-center rounded-full px-6 font-sans text-[15px] font-semibold text-forest transition-colors hover:bg-forest/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-7 font-sans text-[15px] font-semibold text-cream transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Log out
        </button>
      </div>
    </Modal>
  );
}
