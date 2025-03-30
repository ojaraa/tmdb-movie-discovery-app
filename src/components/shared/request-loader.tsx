// import { AlertDialog } from "../ui/alert-dialog";
// import LoaderComponent from "./loader.component";

import { AlertDialog } from "../ui/alert-dialog";
import LoaderComponent from "./loader-component";

type RequestLoaderProps = {
  loading: boolean;
};

const RequestLoader = (props: RequestLoaderProps) => {
  return (
    <AlertDialog open={props.loading}>
      <LoaderComponent message="Loading...."/>
    </AlertDialog>
  );
};

export default RequestLoader;