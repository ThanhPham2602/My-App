// import logo from "./logo.svg";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Root from "./routes/root"; // action as rootAction,
import ErrorPage from "./error-page";
import Contact from "./routes/contact";
import Index from "./routes";
import EditContact from "./routes/edit";
import { useContext } from "react";
import { AppContext } from "./AppContext";

// import Contacts from "./contacts";

function App() {
  const { list, dispatch } = useContext(AppContext);

  function getContact() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ contacts: list }));
    });
  }

  // function  searchLoader({ request }){
  //   const url = new URL(request.url);
  // const q = url.searchParams.get("q");
  // const contacts = getContacts(q);
  // }

  function contactLoader(demo) {
    // console.log("object demo", demo);
    return new Promise((resolve, reject) => {
      // console.log("list before", list);
      const index = list.findIndex(
        (value) => parseFloat(demo.params.contactId) === value.id
      );

      console.log("list loader", list);
      // list[index] =
      setTimeout(() => resolve({ contact: list[index] }));
    });
  }

  function createContact() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ contacts: list });
        dispatch({ type: "create" });
      }, 1000);
    });
  }

  async function editAction(something) {
    // console.log("sthg object", something.request.formData());
    const { params, request } = something;
    console.log("object sthing", something);
    const data = await request.formData();

    console.log("object data", Object.fromEntries(data));
    const dataEdit = Object.fromEntries(data);
    console.log("number", params.contactId);

    redirect(`/contacts/${params.contactId}`);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ contact: dataEdit });
        dispatch({
          type: "save",
          payload: { ...dataEdit, id: params.contactId },
        });
      });
    });
  }

  function destroyAction(doSomeThing) {
    const { params } = doSomeThing;
    dispatch({
      type: "delete",
      payload: { id: parseFloat(params.contactId) },
    });

    return null;
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: async () => getContact(),
      action: async () => createContact(),
      children: [
        { index: true, element: <Index /> },
        {
          path: "contacts/:contactId",
          element: <Contact />,
          loader: contactLoader,
        },
        {
          path: "contacts/:contactId/edit",
          element: <EditContact />,
          loader: contactLoader,
          action: editAction,
        },
        {
          path: "contacts/:contactId/destroy",
          action: destroyAction,
          errorElement: <div>Oops! There was an error.</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
