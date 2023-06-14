import { redirect } from "react-router-dom";
// import { destroyAction } from "../contacts";

export function action({ params }) {
  //   await destroyAction(params.contactId);
  redirect("/");
}
