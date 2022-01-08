import * as functions from "firebase-functions";

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

export const onPostUpdate = functions.firestore.document("posts/{postId}")
    .onUpdate((change) => {
      // Retrieve the current and previous value
      const data = change.after.data();
      const previousData = change.before.data();
      if (data.upvotes == previousData.upvotes &&
        data.downvotes == previousData.downvotes &&
        data.shares == previousData.shares) {
        return null;
      }
      return change.after.ref.set({
        upvoteCount: data.upvotes.length,
        downvoteCount: data.downvotes.length,
        shareCount: data.shares.length,
        trendscore: calculateTrendscore(data.upvotes.length,
            data.downvotes.length, data.shares.length),
      }, {merge: true});
    });

