import { AddSetForm } from "./AddSetForm";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

const AddSetDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>create</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>create a set</AlertDialogTitle>
          <AlertDialogDescription>
            you're about to create your set
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AddSetForm />
        <AlertDialogFooter>
          <AlertDialogCancel>cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddSetDialog;
