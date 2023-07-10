"use server";

import ShowcaseCard from "@/components/ShowcaseCard";
import { firestore } from "../../../firebase/firebase";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { ShowcaseProps } from "../../../types";
const Showcase = async () => {
  async function getAllPost() {
    "use server";
    // Access the "userImages" collection in Firestore
    const userImagesCollection = firestore
      .collection("userImages")
      .orderBy("uploadedAt", "desc");

    // Fetch all documents in the "userImages" collection
    const snapshot = await userImagesCollection.get();

    // Extract the data from each document
    const userImages = snapshot.docs.map((doc) => doc.data());

    // Return the user images as the API response
    return userImages;
  }
  const posts = await getAllPost();

  // Convert the uploadedAt property to a formatted date string
  const formattedPosts = posts.map((post) => ({
    imageUrl: post.imageUrl,
    username: post.username,
    model: post.model,
    prompt: post.prompt,
    negativePrompt: post.negativePrompt,
    uploadedAt: formatDistanceToNow(
      post.uploadedAt.seconds * 1000 || new Date(),
      { addSuffix: true }
    ),
  }));

  return (
    <section>
      <div className="m-10 border-b-2 border-gray-800 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Community Showcase</h1>
          <p className="text-xl font-semibold text-teal-500 ">
            Find out what other dreaming about!
          </p>
        </div>
        <Link href={"/playground"}>
          <button className="px-3 py-2 border-2 border-teal-500  rounded-md hover:bg-teal-700 transition-colors duration-300 ease-in-out">
            Manifest Your Dreams
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10">
        {formattedPosts.map((post, i) => (
          <ShowcaseCard
            post={{
              imageUrl: post.imageUrl,
              username: post.username,
              model: post.model,
              prompt: post.prompt,
              negativePrompt: post.negativePrompt,
              uploadedAt: post.uploadedAt,
            }}
            index={i}
            key={i}
          />
        ))}
      </div>
    </section>
  );
};

export default Showcase;
