import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/**
 * @param  {number} upvotes
 * @param  {number} downvotes
 * @param  {number} shares
 * @return {number} trendscore
 */
function calculateTrendscore(upvotes:number,
    downvotes:number, shares:number): number {
  return upvotes + shares - downvotes;
}

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const onPostUpdate = functions.firestore.document("posts/{postID}")
    .onUpdate(async (change) => {
      // Retrieve the current and previous value
      const data = change.after.data();
      const previousData = change.before.data();

      if (data.upvotes == previousData.upvotes &&
        data.downvotes == previousData.downvotes &&
        data.shares == previousData.shares) {
        return null;
      }

      const currTrendscore = calculateTrendscore(data.upvotes.length,
          data.downvotes.length, data.shares.length);
      const prevTrendscore = calculateTrendscore(previousData.upvotes.length,
          previousData.downvotes.length, previousData.shares.length);
      const authorOfPost = db.doc(`users/${data.userID}`);
      const wordOfPost = db.doc(`words/${data.word}`);

      await authorOfPost.update({"profile.inssajeom":
        admin.firestore.FieldValue.increment(-prevTrendscore)});
      await authorOfPost.update({"profile.inssajeom":
        admin.firestore.FieldValue.increment(currTrendscore)});
      await wordOfPost.update({trendscore:
        admin.firestore.FieldValue.increment(-prevTrendscore)});
      await wordOfPost.update({trendscore:
        admin.firestore.FieldValue.increment(currTrendscore)});

      return change.after.ref.set({
        "metrics.upvoteCount": data.upvotes.length,
        "metrics.downvoteCount": data.downvotes.length,
        "metrics.shareCount": data.shares.length,
        "metrics.trendscore": currTrendscore,
      }, {merge: true});
    });

export const onPostCreate = functions.firestore.document("posts/{postID}")
    .onCreate(async (change) => {
      return change.ref.set({
        timestamp: admin.firestore.Timestamp.fromDate(new Date()),
      }, {merge: true});
    });
