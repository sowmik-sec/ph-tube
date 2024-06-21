async function fetchCategory() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const json = await res.json();
  catItems = json.data;
  //   console.log("catItems", catItems);
  const categories = document.getElementById("categories");
  const div = document.createElement("div");

  div.classList.add(
    "flex",
    "flex-col",
    "md:flex-row",
    "justify-center",
    "my-12"
  );
  //   div.classList.add();
  //   div.classList.add();
  //   div.classList.add();
  //   div.classList.add();
  // console.log(div);
  let catId;
  const catDivs = catItems.map((item) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = `
        <div class="px-5 py-2 text-center mb-3 bg-gray-200 rounded cursor-pointer mr-6">${item.category}</div>
    `;
    tempDiv.addEventListener("click", () => {
      fetchCourses(item.category_id);
    });
    return tempDiv;
  });
  catDivs.forEach((cat) => div.appendChild(cat));
  //   console.log(div);
  categories.appendChild(div);
}
fetchCategory();

async function fetchCourses(id = 1000) {
  let courses;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const json = await res.json();
  courses = json.data;
  console.log(courses);
}

fetchCourses();
