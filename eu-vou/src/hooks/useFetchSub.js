import { useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  where,
  QuerySnapshot,
} from "firebase/firestore";

export const useFetchSub = (docCollection, userId, eventId) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadDocument() {
      try {
        const subsRef = collection(db, "userGoingTo");

        const q = query(
          subsRef,
          where("uid", "==", userId),
          where("eventId", "==", eventId)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setDocument(doc.data());
          console.log(doc.data());
        });

        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //   console.log(`${docCollection} Document data:`, docSnap.data());
        //   setDocument(docSnap.data());
        // } else {
        //   console.log(`${docCollection} not found!`);
        // }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    }
    loadDocument();
  }, [docCollection, userId, eventId]);

  return { document, loading, error };
};
