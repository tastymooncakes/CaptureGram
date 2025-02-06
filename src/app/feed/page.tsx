import Feed from "@/components/Feed/Feed"; // Ensure the path is correct

export default function FeedPage() {
  return <Feed endpoint="/api/following-posts" />;
}
