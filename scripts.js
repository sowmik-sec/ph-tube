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
  document.getElementById("sort-by-views").addEventListener("click", () => {
    courses.sort(
      (a, b) =>
        convertViewsToNumber(b.others.views) -
        convertViewsToNumber(a.others.views)
    );
    console.log("clicked");
    showItems(courses);
  });
  showItems(courses);
}

fetchCourses();

function showItems(courses) {
  const courseSection = document.getElementById("courses");
  // Clear the previous courses
  courseSection.innerHTML = "";

  const courseDiv = document.createElement("div");
  courseDiv.classList.add(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-4",
    "gap-5"
  );
  if (!courses.length) {
    courseDiv.classList.remove(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-4",
      "gap-5"
    );
    courseDiv.innerHTML = `
      <div class="flex justify-center items-center h-96 mx-auto">
        <div>
          <img class="mx-auto" src="images/Icon.png"/>
          <h3 class="text-3xl text-center font-bold block">Oops!! Sorry, There is no <br/> content here</h3>
        </div>
      </div>
    `;
    courseSection.appendChild(courseDiv);
    return;
  }
  const courseDivs = courses.map((course) => {
    const tempDiv = document.createElement("div");
    tempDiv.classList.add("mx-auto");
    // Create the HTML content
    const verifiedIcon = course.authors[0].verified
      ? '<i class="fa-solid fa-certificate text-blue-600"></i>'
      : "";
    tempDiv.innerHTML = `
      <div class="mx-auto">
        <div>
          <img src=${course.thumbnail} class="w-80 h-52 rounded-md"/>
        </div>
        <div class="flex mt-3">
          <div class="mr-5">
            <img class="w-10 h-10 rounded-full" src=${course?.authors[0].profile_picture}/>
          </div>
          <div>
            <h5 class="font-bold">${course.title}</h5>
            <div class="flex items-center">
              <p class="mr-1">${course.authors[0].profile_name}</p>
              ${verifiedIcon}
            </div>
            <p>${course.others.views}</p>
          </div>
        </div>
      </div>
    `;
    return tempDiv;
  });
  courseDivs.forEach((course) => courseDiv.appendChild(course));
  courseSection.appendChild(courseDiv);
}

// Helper function to convert view count strings to numbers
function convertViewsToNumber(views) {
  if (views.endsWith("k")) {
    return parseFloat(views) * 1000;
  }
  if (views.endsWith("M")) {
    return parseFloat(views) * 1000000;
  }
  return parseFloat(views); // Assuming views is a number if it doesn't end with 'k' or 'M'
}
