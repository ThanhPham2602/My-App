export async function getContacts() {
  const list = [
    { id: 0, SĐT: 123, first: 1 },
    { id: 1, SĐT: 234 },
    { id: 2, SĐT: 34234 },
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ contacts: list });
    }, 1000);
  });
}
export function createContact() {}
