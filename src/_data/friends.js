export default async function () {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/gh/homeofnever/friends@gh-pages/friends.json"
    );
    if (!res.ok) return {};
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch friends data:", e.message);
    return {};
  }
}
