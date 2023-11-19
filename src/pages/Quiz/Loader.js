import { db } from "../../auth/Config";
import { doc, getDoc } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const auth = getAuth();

export async function quizLoader({ params }) {
  if (!auth.currentUser) {
    return {};
  }
  const docSnapshot = await getDoc(
    doc(db, "users", auth.currentUser.uid, "quizSets", params.quizId)
  );
  if (docSnapshot.exists()) {
    // console.log("Document data:", docSnapshot.data());
    return {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    };
  } else {
    // docSnap.data() will be undefined in this case
    // console.log("No such document!");
    return {};
  }
}

export async function attemptLoader({ params }) {
  return { quizId: params.quizId, attemptId: params.attemptId };
}
