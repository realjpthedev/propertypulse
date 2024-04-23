import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
	try {
		await connectDB();

		const { propertyId } = await request.json();
		const sessionUser = await getSessionUser();

		if (!session || !session.userId) {
			return new Response("User ID is required", { status: 401 });
		}

		const { userId } = sessionUser;

		// Find user in db
		const user = await User.findOne({ _id: userId });

		// check if property is bookmarked
		let isBookmarked = user.bookmarks.includes(propertyId);

		let message;

		if (isBookmarked) {
			// If already bookmarked, remove it
			user.bookmarks.pull(propertyId);
			message = "Bookmark removed successfully";
			isBookmarked = false;
		} else {
			// If not bookmarked, add it
			user.bookmarks.push(propertyId);
			message = "Bookmark added successfully";
			isBookmarked = true;
		}

		await user.save();

		return new Response(JSON.stringify({ message, isBookmarked }), {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return new Reponse("Something went wrong", { status: 500 });
	}
};
