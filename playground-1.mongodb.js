/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'test';

// The current database to use.
use(database);

/* Create Posts collection */
db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "slug", "categories", "content", "owner"],
      properties: {
        title: { bsonType: "string" },
        slug: { bsonType: "string" },
        categories: {
          bsonType: "array",
          items: { bsonType: "objectId" }
        },
        content: { bsonType: "string" },
        owner: { bsonType: "objectId" }
      }
    }
  }
});

/* Create Categories collection */
db.createCollection("categories", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "slug", "content", "owner"],
      properties: {
        title: { bsonType: "string" },
        slug: { bsonType: "string" },
        content: { bsonType: "string" },
        owner: { bsonType: "objectId" },
        posts: {
          bsonType: "array",
          items: { bsonType: "objectId" }
        }
      }
    }
  }
});

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
