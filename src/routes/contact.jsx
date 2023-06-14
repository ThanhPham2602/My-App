import { Row, Col } from "antd";
import { Form, useLoaderData } from "react-router-dom";

function getContact() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(console.log("123")), 1000);
  });
}

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  console.log("params", params);
  // console.log("object contact", contact);
  return { contact };
}

export default function Contact() {
  const { contact } = useLoaderData();
  console.log("object contact", contact);

  return (
    <Row id="contact">
      <Col span={12}>
        <img key={contact.avatar} src={contact.avatar || null} alt="pic" />
      </Col>

      <Col span={12}>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
