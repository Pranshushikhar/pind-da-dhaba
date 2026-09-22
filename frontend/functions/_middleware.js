export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname === "/google41d4abd0aa0c455f.html" || url.pathname === "/google41d4abd0aa0c455f") {
    return new Response("google-site-verification: google41d4abd0aa0c455f.html\n", {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=0, must-revalidate",
      },
    });
  }
  return context.next();
}
