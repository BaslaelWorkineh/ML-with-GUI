export default defineNuxtRouteMiddleware((to, from) => {
    console.log("Navigating to:", to.fullPath);
    console.log("Coming from:", from.fullPath);
});