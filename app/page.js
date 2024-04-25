import FeaturedProperties from "@/components/FeaturedProperties";
import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import connectDB from "@/config/database";

const HomePage = async () => {
	await connectDB();
	return (
		<>
			<Hero />
			<InfoBoxes />
			<FeaturedProperties />
			<HomeProperties />
		</>
	);
};

export default HomePage;
