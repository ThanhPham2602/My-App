import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  useNavigation,
} from "react-router-dom";
import { Row, Input, Col } from "antd";
// import { useContext } from "react";
// import { AppContext } from "../AppContext";

export default function Root() {
  // const { dispatch } = useContext(AppContext);
  const { contacts } = useLoaderData();
  const navigation = useNavigation();
  // console.log(contacts);
  return (
    <Row>
      <Col span={7} id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <Input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />

            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {/* {console.log("contacts", contacts.length)} */}
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
      <Col
        span={2}
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      ></Col>
      <Col span={15} id="detail">
        <Outlet />
      </Col>
    </Row>
  );
}
