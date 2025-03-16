// ダミーデータ
const authors = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Jane", lastName: "Smith" },
];

const posts = [
  { id: 1, title: "GraphQL Introduction", authorId: 1 },
  { id: 2, title: "Advanced GraphQL", authorId: 1 },
  { id: 3, title: "GraphQL with Apollo", authorId: 2 },
];

export const resolvers = {
  Query: {
    // タイトルでフィルタリング可能な全投稿取得 + `author` を追加
    posts: (_parent: any, args: { findTitle?: string }) => {
      let filteredPosts = posts;

      if (args.findTitle) {
        filteredPosts = filteredPosts.filter((post) =>
          post.title.toLowerCase().includes(args.findTitle!.toLowerCase())
        );
      }

      // `authorId` を `author` に変換
      return filteredPosts.map((post) => ({
        ...post,
        author: authors.find((author) => author.id === post.authorId) || null,
      }));
    },

    // IDで特定の投稿を取得 + `author` を追加
    post: (_parent: any, args: { id: number }) => {
      const post = posts.find((post) => post.id === args.id);
      if (!post) return null;

      return {
        ...post,
        author: authors.find((author) => author.id === post.authorId) || null,
      };
    },
  },
};
