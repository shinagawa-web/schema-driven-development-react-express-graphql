"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
// `graphql/` フォルダ内のすべての `.graphql` ファイルを結合
const typeDefs = (0, merge_1.mergeTypeDefs)((0, load_files_1.loadFilesSync)("graphql/**/*.graphql"));
exports.typeDefs = typeDefs;
