import { IndexType } from "node-appwrite";
import {db,questionCollection} from "../name";
import {databases} from "./config";
import { Permission } from "appwrite";
import { log } from "console";

export default async function createQuestionCollection(){
    //create collection
    await databases.createCollection(db,questionCollection,questionCollection,[
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("question collection created")

    //creating attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db,questionCollection,"title",100,true),
        databases.createStringAttribute(db,questionCollection,"content",100,true),
        databases.createStringAttribute(db,questionCollection,"authorId",50,true),
        databases.createStringAttribute(db,questionCollection,"tags",50,true,undefined,true),
        databases.createStringAttribute(db,questionCollection,"attachementId",50,false),
    ])

    console.log("question collection attributes and indexes created")

    //create Indexes

    await Promise.all([
        databases.createIndex(db,questionCollection,"title",IndexType.Fulltext,["title"],['asc']),
        databases.createIndex(db,questionCollection,"content",IndexType.Fulltext,["content"],['asc']),
       
    ])

    console.log("question collection indexes created")
}


