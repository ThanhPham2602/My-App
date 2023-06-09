import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { Button, Row, Input, Col } from "antd";
import { getContacts, createContact } from "../contacts";

export default function Root() {
  const { contacts } = useLoaderData();
  console.log(contacts);
  return (
    <Row>
      <Col span={8} id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <Input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />

            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <Button type="submit">New</Button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
          {/* <ul>
            <li>
              <Link to={`/contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`/contacts/2`}>Your Friend</Link>
            </li>
          </ul> */}
        </nav>
      </Col>
      <Col span={16} id="detail">
        <Outlet />
      </Col>
    </Row>
  );
}
// export async function loader() {
//   const contacts = await getContacts();
//   console.log(contacts.);
//   return { contacts };
// }
// export async function action() {
//   const contact = await createContact();
//   return { contact };
// }
