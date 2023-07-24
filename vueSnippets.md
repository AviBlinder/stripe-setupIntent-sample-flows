## getting route params in Component
```js
<template>
    <p>{{ $route.params.id }}</p>

</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  onMounted(() => {
    const id = route.params.id;

    fetch(`https://reqres.in/api/users/${id}`)
    ...
      });

</script
```

