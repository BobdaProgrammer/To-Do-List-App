self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("your-cache-name").then((cache) => {
      return cache.addAll([
          "/",
          "../To-Do-List-App"
      ]);
    })
  );
});
