"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
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
exports.resolvers = {
    Query: {
        // すべての投稿を取得
        posts: () => posts,
        // IDで特定の投稿を取得
        post: (_parent, args) => posts.find((post) => post.id === args.id),
    },
    Post: {
        // Post の author を取得
        author: (parent) => authors.find((author) => author.id === parent.authorId),
    },
    Author: {
        // 特定の Author が書いた投稿を取得 (タイトルでフィルタリング可能)
        posts: (parent, args) => {
            let authorPosts = posts.filter((post) => post.authorId === parent.id);
            if (args.findTitle) {
                authorPosts = authorPosts.filter((post) => {
                    if (args.findTitle) {
                        return post.title.toLowerCase().includes(args.findTitle.toLowerCase());
                    }
                    return true;
                });
            }
            return authorPosts;
        },
    },
};
