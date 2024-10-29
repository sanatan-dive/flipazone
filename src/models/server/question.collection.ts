import { IndexType } from "node-appwrite";
import { db, questionCollection } from "../name";
import { databases } from "./config";
import { Permission } from "appwrite";
import { log } from "console";

export default async function createQuestionCollection() {
    // Create collection
    await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("question collection created");

    // Creating attributes
    await Promise.all([
        databases.createStringAttribute(db, questionCollection, "title", 100, true),
        databases.createStringAttribute(db, questionCollection, "content", 100, true),
        databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
        databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
        databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false),
    ]);

    console.log("question collection attributes created");

    // Creating indexes
    await Promise.all([
        databases.createIndex(db, questionCollection, "title_index", IndexType.Fulltext, ["title"]),
        databases.createIndex(db, questionCollection, "content_index", IndexType.Fulltext, ["content"])
       
    ]);

    console.log("question collection indexes created");
}
