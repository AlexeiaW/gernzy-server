var tagSchema = `
    extend type Query {
        tags: [Tag!]! @all(model: "Lab19\Cart\Models\Tag")
        tag(id: Int! @eq): Tag @find(model: "Lab19\Cart\Models\Tag")
    }

    extend type Mutation {
        createTag(input: CreateTagInput!): Tag
            @field(resolver: "Lab19\Cart\GraphQL\Mutations\Tag@create")
            @can(ability: "create", model: "Lab19\Cart\Models\Tag", policy: "Lab19\Cart\Policies\TagPolicy")
        updateTag(id: ID!, input: UpdateTagInput!): Tag
            @field(resolver: "Lab19\Cart\GraphQL\Mutations\Tag@update")
            @can(ability: "update", model: "Lab19\Cart\Models\Tag", policy: "Lab19\Cart\Policies\TagPolicy")
        deleteTag(id: ID!): DeleteResult
            @field(resolver: "Lab19\Cart\GraphQL\Mutations\Tag@delete")
            @can(ability: "delete", model: "Lab19\Cart\Models\Tag", policy: "Lab19\Cart\Policies\TagPolicy")
    }

    type Tag {
        id: ID!
        name: String!
        products: [Product!]! @hasMany(type: "paginator")
    }

    input CreateTagInput {
        name: String!
    }

    input UpdateTagInput {
        name: String!
    }
`;

export default tagSchema;
