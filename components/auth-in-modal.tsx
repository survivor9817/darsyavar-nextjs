import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginField from "./login-field";
type Props = {};

const AuthInModal = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            className="border-2 my-1 px-4 rounded-3xl border-[#bcbcbc] hover:bg-[#ddd] 
              transition-colors duration-100 ease-in-out active:scale-[0.95] text-sm"
          >
            ورود / ثبت‌نام
          </button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>ورود به حساب کاربری</DialogTitle>
          <DialogDescription>وارد شوید یا حساب کاربری بسازید.</DialogDescription>
        </DialogHeader>
        <LoginField />
      </DialogContent>
    </Dialog>
  );
};

export default AuthInModal;
