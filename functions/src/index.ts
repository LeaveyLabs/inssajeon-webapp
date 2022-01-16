import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const firestore = admin.firestore();

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
      const authorOfPost = firestore.doc(`users/${data.userID}`);
      const wordOfPost = firestore.doc(`words/${data.word}`);

      await authorOfPost.update({"metrics.inssajeom":
        admin.firestore.FieldValue.increment(-prevTrendscore)});
      await authorOfPost.update({"metrics.inssajeom":
        admin.firestore.FieldValue.increment(currTrendscore)});
      await wordOfPost.update({trendscore:
        admin.firestore.FieldValue.increment(-prevTrendscore)});
      await wordOfPost.update({trendscore:
        admin.firestore.FieldValue.increment(currTrendscore)});

      return change.after.ref.update({
        "metrics.upvoteCount": data.upvotes.length,
        "metrics.downvoteCount": data.downvotes.length,
        "metrics.shareCount": data.shares.length,
        "metrics.trendscore": currTrendscore,
      });
    });

export const onPostCreate = functions.firestore.document("posts/{postID}")
    .onCreate(async (change) => {
      return change.ref.set({
        timestamp: admin.firestore.Timestamp.fromDate(new Date()),
      }, {merge: true});
    });

export const onUserUpdate = functions.firestore.document("users/{userID}")
    .onUpdate(async (change) => {
      const data = change.after.data();
      const previousData = change.before.data();
      /* Only handle profile updates - activity is handled in postUpdate */
      if (data.profile !== previousData.profile) {
        /* Update profile information for each submitted post */
        for (const submissionID of data.activity.submissions) {
          const submission = firestore.doc(`posts/${submissionID}`);
          await submission.update({userProfile: data.profile});
        }
      }
      return null;
    });
