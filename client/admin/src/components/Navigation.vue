<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Gernzy</span>
      </div>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <router-link
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            to="/"
            >Home</router-link
          >

          <router-link
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            to="/dashboard"
            >Dashboard</router-link
          >

          <router-link
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            to="/products"
            >Products</router-link
          >

          <router-link
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            to="/orders"
            >Orders</router-link
          >
        </div>
        <div>
          <router-link
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            to="/login"
            v-if="!isAuthenticated && !isAdmin"
            >Login</router-link
          >

          <a
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            v-if="isAuthenticated && isAdmin"
            @click="logOutClick"
            href="#/"
            >Logout</a
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";

const SessionGetter = namespace("session", Getter);
const SessionAction = namespace("session", Action);

@Component
export default class Navigation extends Vue {
  @SessionGetter isAuthenticated: any;
  @SessionGetter isAdmin: any;
  @SessionAction logOut: any;

  public async logOutClick(event: any): Promise<any> {
    event.preventDefault();
    this.logOut().then(() => this.$router.push("/"));
  }
}
</script>
