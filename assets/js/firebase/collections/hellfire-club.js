import app from "../app.js";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  orderBy,
  doc,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

const db = getFirestore(app);
const hellfireClubCollection = collection(db, "hellfire-club");

const NOT_FOUND = {
  code: 404,
  status: "NOT FOUND",
};

export async function createSubscription(subscription) {
  const saved = await addDoc(hellfireClubCollection, subscription);
  return saved.id;
}

async function getSubscriptions() {
  const customQuery = query(hellfireClubCollection, orderBy("level", "desc"));
  const collectionSnapshot = await getDocs(customQuery);
  const subscriptions = collectionSnapshot.docs.map((doc) => doc.data());
  return subscriptions;
}

async function getSubscriptionsByName(name) {
  const customQuery = query(
    hellfireClubCollection,
    where("name", ">=", name),
    where("name", "<=", name + "\uf8ff")
  );

  const collectionSnapshot = await getDocs(customQuery);
  const subscriptions = collectionSnapshot.docs.map((doc) => doc.data());

  return subscriptions.length
    ? subscriptions
    : {
        ...NOT_FOUND,
        message: `there is no inscribed with the name ${name}`,
      };
}

async function getSubscriptionsById(id) {
  const subscriptionSnapshot = await getDoc(doc(hellfireClubCollection, id));

  return subscriptionSnapshot.exists()
    ? subscriptionSnapshot.data()
    : {
        ...NOT_FOUND,
        message: `there is no inscribed with the id '${id}'`,
      };
}

const id = "6vZMPfgkI97nVPAqL7x6";
const name = "William";

getSubscriptionsByName(name).then(
  (response) => (
    console.warn("getSubscriptionsByName"),
    response.code === 404 ? console.log(response) : console.table(response)
  )
);

getSubscriptions().then(
  (response) => (console.warn("getSubscriptions"), console.table(response))
);

getSubscriptionsById(id).then(
  (response) => (console.warn("getSubscriptionsById"), console.log(response))
);
