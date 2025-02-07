import Feed from "@/app/components/Feed/Feed"; // Ensure the path is correct
import FooterBar from "../components/Footer/Footer";

export default function FeedPage() {
  return <>
  <Feed endpoint="/api/public-posts" />
  </>;
}
