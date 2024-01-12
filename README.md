# Vite Plugin Vue

Creates lazy components using the RAW compiler from query params

## Usage

```ts
// vite.config.ts
import vitePluginLazyLoad from 'vite-plugin-lazy-load'

export default defineConfig({
  plugins: [
    vitePluginLazyLoad({ /* options */ }),
  ],
})
```

Use RAW compiler from query params

```html
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script setup>
import HelloWorld from './src/components/HelloWorld.vue?lazy'

</script>
```