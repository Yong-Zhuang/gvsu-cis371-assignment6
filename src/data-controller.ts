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

const firebaseConfig = {
  // COPY this from your Firebase Console
  apiKey: "your-api-key-goes-here",
  authDomain: "your-project-name-here.firebaseapp.com",
  databaseURL: "https://your-project-name-here.firebaseio.com",
  projectId: "your-project-name-here",
  storageBucket: "your-project-name.appspot.com",
  messagingSenderId: "xxxxxxxx",
};
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
  id: string,
  callback: (product: ProductDoc | null) => void
) {
  // write your code here.
}

export { initData, getProducts, deleteProductByID, updateProduct, listen_item };
