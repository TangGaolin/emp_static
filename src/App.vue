<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        position: absolute;
        top: -1px;
        left: -1px;
        bottom: 0px;
        width: 100%;
        background-color: #fafafa;
    }
    .page-title {
        font-size: 18px;
        margin: 15px auto;
        text-align: center;
        display: block;
        line-height: 1;
    }
    .to-button {
        margin-bottom: 3.4rem;
    }

</style>
