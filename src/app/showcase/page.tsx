"use server";
import { formatDistanceToNow } from "date-fns";
import { firestore } from "../../../firebase/firebase";

const Showcase = async () => {
  async function getAllPost() {
    "use server";
    // Access the "userImages" collection in Firestore
    const userImagesCollection = firestore.collection("userImages");

    // Fetch all documents in the "userImages" collection
    const snapshot = await userImagesCollection.get();

    // Extract the data from each document
    const userImages = snapshot.docs.map((doc) => doc.data());

    // Return the user images as the API response
    return userImages;
  }
  const posts = await getAllPost();
  console.log(posts);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-md cursor-pointer group"
        >
          <img
            src={post.imageUrl}
            alt={post.username}
            loading="lazy"
            className="w-full h-auto transition-transform duration-300 transform hover:scale-105"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-90 p-4 transition-transform duration-300 transform-gpu translate-y-full group-hover:translate-y-0">
            <span className="flex justify-between items-center">
              <h3 className="text-xl text-teal-500 font-bold mb-2">
                {post.username}
              </h3>
              <p className="text-xs text-white/50 font-semibold">
                {formatDistanceToNow(
                  post.uploadedAt && post.uploadedAt.seconds
                    ? post.uploadedAt.seconds * 1000
                    : new Date(),
                  { addSuffix: true }
                )}
              </p>
            </span>
            <ul>
              <li className="border-b-2 border-teal-600  my-2">
                <p className="text-sm text-white ">
                  <span className="font-semibold">Model:</span> {post.model}
                </p>
              </li>
              <li className="border-b-2 border-teal-600 my-2">
                <p className="text-sm text-white font-semibold">Prompt: </p>
                <p className="text-sm text-white">{post.prompt}</p>
              </li>
              <li className="border-b-2 border-teal-600 my-2">
                <p className="text-sm text-white font-semibold">
                  Negative Prompt:
                </p>
                <p className="text-sm text-white">{post.negativePrompt}</p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Showcase;
