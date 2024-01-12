import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading to true

  useEffect(() => {
    async function loadDocument() {
      try {
        const docRef = doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(`${docCollection} Document data:`, docSnap.data());
          setDocument(docSnap.data());
        } else {
          console.log(`${docCollection} not found!`);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    }
    loadDocument();
  }, [docCollection, id]);

  return { document, loading, error };
};
