let catItems;

async function fetchCategory() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const json = await res.json();
  catItems = json.data;
  console.log("catItems", catItems);
  const categories = document.getElementById("categories");
  const catDiv = document.createElement("div");
  catDiv.innerHTML = `
    <div>
        
    </div>
`;
  catItems.map((item) => {
    item.category;
  });
}
fetchCategory();
