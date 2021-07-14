<template>
  <div id="app" class="app">
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.isKeepAlive"></router-view>
  </div>
</template>

<style>
.app {
  height: 100%;
}
</style>
