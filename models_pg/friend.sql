CREATE TABLE friend (
    "userId" integer not null references public.user("id") check ("userId" < "friendId"),
    "friendId" integer not null references public.user("id"),
    "dateCreated" timestamp with time zone not null,
    "status" varchar(64),
    PRIMARY KEY ("userId", "friendId")
);
