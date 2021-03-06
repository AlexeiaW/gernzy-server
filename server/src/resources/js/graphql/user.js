const userSchema = `
    input CreateAccountInput {
        name: String!
        email: String @rules(apply: ["required", "email", "unique:cart_users,email"])
        password: String!
        token: String
    }

    type CreateAccountPayload {
        token: String
        user: User
    }

    input SetSessionInput {
        products: [CartProductInput!]
    }

    input SetSessionCurrency {
        currency: String!
    }

    input CartProductInput {
        id: ID!
        quantity: Int!
    }

    type SetSessionPayload {
        cart_uuid: String
        products: [CartProduct]
    }

    type SetSessionCurrencyPayload {
        currency: String
        rate: String
    }

    type CartProduct {
        id: ID!
        quantity: Int!
    }

    extend type Mutation {
        logIn(input: LoginInput! @spread): LogInPayload @field(resolver: "Lab19\Cart\GraphQL\Mutations\Account@logIn")

        logOut: LogOutPayload @field(resolver: "Lab19\Cart\GraphQL\Mutations\Account@logOut")

        addToCart(input: AddToCartInput!): CartPayload
            @field(resolver: "Lab19\Cart\GraphQL\Mutations\Cart@addToCart")
            @gate(ability: "add-to-cart", sessionOnly: true)

        removeFromCart(input: RemoveFromCartInput!): CartPayload
            @field(resolver: "Lab19\Cart\GraphQL\Mutations\Cart@removeFromCart")
            @gate(ability: "remove-from-cart", sessionOnly: true)

        updateCartQuantity(input: UpdateCartQuantityInput!): CartPayload
            @field(resolver: "Lab19\Cart\GraphQL\Mutations\Cart@updateCartQuantity")
            @gate(ability: "add-to-cart", sessionOnly: true)

        createUser(input: CreateUserInput!): CreateUserPayload
            @field(resolver: "Lab19\Cart\GraphQL\Mutations\User@create")
            @can(ability: "create", model: "Lab19\Cart\Models\User", policy: "Lab19\Cart\Policies\UserPolicy")

        updateUser(id: ID!, input: UpdateUserInput!): CreateUserPayload
            @field(resolver: "Lab19\Cart\GraphQL\Mutations\User@update")
            @can(ability: "update", model: "Lab19\Cart\Models\User", policy: "Lab19\Cart\Policies\UserPolicy")

        deleteUser(id: ID!): DeleteResult
            @field(resolver: "Lab19\Cart\GraphQL\Mutations\User@delete")
            @can(ability: "delete", model: "Lab19\Cart\Models\User", policy: "Lab19\Cart\Policies\UserPolicy")

        elevateUser(id: ID!): CreateUserPayload
            @field(resolver: "Lab19\Cart\GraphQL\Mutations\User@elevate")
            @can(ability: "update", model: "Lab19\Cart\Models\User", policy: "Lab19\Cart\Policies\UserPolicy")

        demoteUser(id: ID!): CreateUserPayload
            @field(resolver: "Lab19\Cart\GraphQL\Mutations\User@demote")
            @can(ability: "update", model: "Lab19\Cart\Models\User", policy: "Lab19\Cart\Policies\UserPolicy")

        resetUserPasswordLink(email: String!): SendResult
            @field(resolver: "Lab19\Cart\GraphQL\Mutations\User@resetPasswordLink")

        resetPassword(input: UpdatePasswordPayload): UpdatePasswordResult
            @field(resolver: "Lab19\Cart\GraphQL\Mutations\User@resetPassword")
    }

    input UpdatePasswordPayload {
        email: String!
        token: String!
        password: String!
        password_confirmation: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type LogInPayload {
        user: User
        token: String
    }

    type LogOutPayload {
        success: Boolean!
    }

    input AddToCartInput {
        items: [AddToCartItemInput!]
    }

    input AddToCartItemInput {
        product_id: ID!
        quantity: Int!
    }

    type CartPayload {
        cart: Cart
    }

    input RemoveFromCartInput {
        product_id: ID!
        quantity: Int!
    }

    input UpdateCartQuantityInput {
        product_id: ID!
        quantity: Int!
    }

    extend type Query {
        me: User @field(resolver: "Lab19\Cart\GraphQL\Queries\Account@me")
        myOrders: [Order!] @field(resolver: "Lab19\Cart\GraphQL\Queries\Account@myOrders")
    }

    input CreateUserInput {
        name: String!
        email: String! @rules(apply: ["required", "email", "unique:cart_users,email"])
        password: String!
    }

    input UpdateUserInput {
        name: String
        email: String @rules(apply: ["email", "unique:cart_users,email"])
        password: String
    }

    type CreateUserPayload {
        id: ID!
        name: String!
        email: String!
        is_admin: Int
    }

    type SendResult {
        success: Boolean!
    }

    type UpdatePasswordResult {
        success: Boolean!
    }

`;

export default userSchema;
