import { AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "../ui/alert-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { BiLoaderAlt } from "react-icons/bi";


interface LoaderProps {
    message?: string;
    ariaTitle?: string;
    ariaDesc?: string;
  }
const LoaderComponent = (props : LoaderProps) => {
  return (
    <AlertDialogContent className="h-[194px] !max-w-[349px] items-center rounded-2xl">
    <div className="flex flex-col items-center gap-y-2">
      <BiLoaderAlt className="size-[36px] animate-spin text-primary-blue" />
      <p className="text-sm font-medium leading-[20.3px] text-black">
        {props.message}
      </p>
      <VisuallyHidden>
        <AlertDialogTitle>{props.ariaTitle}</AlertDialogTitle>
        <AlertDialogDescription>{props.ariaDesc}</AlertDialogDescription>
      </VisuallyHidden>
    </div>
  </AlertDialogContent>
  )
}

export default LoaderComponent