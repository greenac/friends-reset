CREATE TABLE "user" (
    "id" serial,
    "firstName" VARCHAR(64),
    "lastName" VARCHAR(64),
    "dateCreated" timestamp with time zone not null,
    PRIMARY KEY ("id")
);
