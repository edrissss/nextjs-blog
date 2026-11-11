
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { getAllPosts } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";

export default async function Index() {
  const posts = getAllPosts();

  const renderedPosts = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      html: await markdownToHtml(post.content || ""),
    }))
  );

  return (
    <main>
      <Container>
        <div className="py-8">
          {renderedPosts.map((post) => (
            <article key={post.slug} className="mb-16">
              <h2 className="mb-6 text-3xl font-bold">
                {post.title}
              </h2>

              <PostBody content={post.html} />
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
