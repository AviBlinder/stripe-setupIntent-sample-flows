<template>
  <main class="viewSize">
    <h1>This is an about page</h1>
          <div class="m-6">
      <button class="btn">
        <RouterLink to="/">Go Home</RouterLink>
      </button >
    </div>

  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
