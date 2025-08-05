import { doc, setDoc } from "firebase/firestore";
import { db, DB_COLLECTIONS } from "../firebase/config";

export const addSubmission = async (
  email: string,
  archetype: string | undefined
) => {
  if (email === "" || archetype === "") return;

  try {
    await setDoc(doc(db, DB_COLLECTIONS.quizSubmissions, email), {
      email,
      archetype,
    });

    console.log("Submission saved successfully");
  } catch (error) {
    console.error("Error saving submission:", error);
  }
};
