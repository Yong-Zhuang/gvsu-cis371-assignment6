import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  FirebaseError,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentSnapshot,
  CollectionReference,
  DocumentReference,
  Firestore,
  query,
  where,
} from "firebase/firestore";
import { Product, ProductDoc } from "./data-types";
import { init_products } from "./data-init";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // COPY this from your Firebase Console

  apiKey: "AIzaSyBF-CRMH-LsqbrVSB5ZF_eBUYU8P-kdAIE",
  authDomain: "cis371-demo-770dc.firebaseapp.com",
  projectId: "cis371-demo-770dc",
  storageBucket: "cis371-demo-770dc.appspot.com",
  messagingSenderId: "988644841148",
  appId: "1:988644841148:web:3b246d80be5da0bccb62b9",
  measurementId: "G-X2KWMBZYFB",
};
// const firebaseConfig = {
//   // COPY this from your Firebase Console
//   apiKey: "your-api-key-goes-here",
//   authDomain: "your-project-name-here.firebaseapp.com",
//   databaseURL: "https://your-project-name-here.firebaseio.com",
//   projectId: "your-project-name-here",
//   storageBucket: "your-project-name.appspot.com",
//   messagingSenderId: "xxxxxxxx",
// };
const app = initializeApp(firebaseConfig, "Firestore sample code");
const db: Firestore = getFirestore(app);

function initData() {
  getDocs(collection(db, "products"))
    .then((qs: QuerySnapshot) => {
      if (qs.size === 0) {
        // Firestore is empty, invoke data_init to populate data
        data_init();
      }
    })
    .catch((error: FirebaseError) => {
      console.log("Error getting document:", error);
    });
}

function data_init() {
  init_products.forEach(async (item) => {
    try {
      const coll: CollectionReference = collection(db, "products");

      addDoc(coll, item).then((newDoc: DocumentReference) => {
        console.log(`New document with ID ${newDoc.id} inserted`);
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  });
}

function getProducts(category: string) {
  const productsColl =
    category === ""
      ? collection(db, "products")
      : query(collection(db, "products"), where("category", "==", category));

  return getDocs(productsColl).then((qs: QuerySnapshot) =>
    qs.docs.map(
      (qd: QueryDocumentSnapshot): ProductDoc => ({
        id: qd.id,
        data: qd.data() as Product,
      })
    )
  );
}

function deleteProductByID(id: string) {
  const p = doc(db, "products", id);
  return deleteDoc(p);
}
function updateProduct(product: ProductDoc) {
  const productRef = doc(db, "products", product.id);
  return updateDoc(productRef, product.data);
}

// prettier-ignore
function listen_item(
// write your code here.
) {
  // write your code here.
}

export { initData, getProducts, deleteProductByID, updateProduct, listen_item };
