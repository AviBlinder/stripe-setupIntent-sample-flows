## getting route params in Component
```js
<template>
    <p>{{ $route.params.id }}</p>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'

  const route = useRoute();
  const router = useRouter()


  onMounted(() => {
    const id = route.params.id;

    fetch(`https://reqres.in/api/users/${id}`)
    ...
      })

 const customerDetails = () => {
    router.push(`/customers/${selectedCustomer.value.id}`)
}


</script
```

