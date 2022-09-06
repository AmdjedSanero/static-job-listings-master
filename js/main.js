let main = document.querySelector(".res");
let filterContainer = document.querySelector(".filter .container");

let clear = document.querySelector(".filter .container .clear");

let containerAll = document.querySelector(".filter .container .all");
const boxes = [];

const endpont = "js/data.json";

fetch(endpont)
  .then((blob) => blob.json())
  .then((data) => boxes.push(...data));

function findMatches(word, boxes) {
  return boxes.filter((box) => {
    let t;
    for (let i = 0; i < word.length; i++) {
      t =
        box.role.match(word[i].innerHTML) || box.level.match(word[i].innerHTML);
    }
    if (t) {
      return box;
    }
  });
}
function findAll(boxes) {
  return boxes;
}

function displayAll() {
  fetch("js/data.json")
    .then((response) => response.json())
    .then((myData) => {
      getData(myData);
    });
}
displayAll();
function displayMatches(spanSearch) {
  const dataFinal = [];
  const uni = [];

  da = findMatches(spanSearch, boxes);
  dataFinal.push(...da);

  for (let j = 0; j < dataFinal.length; j++) {
    if (uni.indexOf(dataFinal[j]) === -1) {
      uni.push(dataFinal[j]);
    }
  }
  getData(uni);
}

function getData(dataFinal) {
  main.innerHTML = "";
  dataFinal.forEach((element) => {
    let result = document.createElement("div");
    result.className = "result";

    let container = document.createElement("div");
    container.className = "container";
    // leftSide
    let left_side = document.createElement("div");
    left_side.className = "left-side";

    let img = document.createElement("img");

    let info_text = document.createElement("div");
    info_text.className = "info-text";
    // top
    let top = document.createElement("div");
    top.className = "top";
    let company = document.createElement("span");
    company.className = "company";
    let neww = document.createElement("span");
    neww.className = "new false";
    neww.innerHTML = "NEW!";
    let featured = document.createElement("span");
    featured.className = "featured false";
    featured.innerHTML = "Featured";

    //center
    let center = document.createElement("div");
    center.className = "center";
    let position = document.createElement("span");
    position.className = "position";
    //bottom
    let bottom = document.createElement("div");
    bottom.className = "bottom";
    // rightSide

    let right_side = document.createElement("div");
    right_side.className = "right-side";
    let role = document.createElement("div");
    role.className = "role";

    let languages = document.createElement("div");
    languages.className = "languages";

    container.appendChild(left_side);
    container.appendChild(right_side);
    left_side.appendChild(img);
    left_side.appendChild(info_text);
    info_text.appendChild(top);

    info_text.appendChild(center);
    info_text.appendChild(bottom);
    top.appendChild(company);
    center.appendChild(position);
    right_side.appendChild(role);
    right_side.appendChild(languages);

    img.src = element.logo;
    company.innerHTML = element.company;

    if (element.new) {
      neww.classList.remove("false");
      top.appendChild(neww);
    }
    if (element.featured) {
      featured.classList.remove("false");
      let ft_left = document.createElement("div");
      ft_left.className = "ft-left";
      container.appendChild(ft_left);

      top.appendChild(featured);
    }
    position.innerHTML = element.position;
    bottom.innerHTML = `
        <span class="postedAt">${element.postedAt}</span>
        <span class="point">.</span>

        <span class="contract">${element.contract}</span>
        <span class="point">.</span>

        <span class="location">${element.location}</span>
        `;
    role.innerHTML = `
        <span class="frontend">${element.role}</span>
        <span class="level">${element.level}</span>
        `;
    for (let i = 0; i < element.languages.length; i++) {
      let lang = document.createElement("span");
      lang.innerHTML = element.languages[i];
      languages.appendChild(lang);
    }
    result.appendChild(container);

    main.appendChild(result);
  });

  let spanRightSide = document.querySelectorAll(".right-side span");

  for (let i = 0; i < spanRightSide.length; i++) {
    spanRightSide[i].addEventListener("click", function () {
      filterContainer.classList.remove("none");
      let filtre_box = document.createElement("div");
      filtre_box.className = "filter-box";
      filtre_box.innerHTML = `
      <span class="text">${spanRightSide[i].innerHTML}</span>
      <img src="images/icon-remove.svg" alt="" />
    `;
      containerAll.appendChild(filtre_box);
      let spanSearchDel = document.querySelectorAll(
        ".filter .container .filter-box img"
      );
      let spanSearch = document.querySelectorAll(
        ".filter .container .filter-box span"
      );

      spanSearchDel.forEach((element) => {
        element.addEventListener("click", function () {
          element.parentElement.remove();
          let spanSearch = document.querySelectorAll(
            ".filter .container .filter-box span"
          );
          console.log(spanSearch.length);

          if (spanSearch.length == 0) {
            displayAll();
            filterContainer.classList.add("none");
          } else {
            displayMatches(spanSearch);
          }
        });
      });

      displayMatches(spanSearch);
    });
  }
}
clear.addEventListener("click", function () {
  let spanSearch = document.querySelectorAll(
    ".filter .container .filter-box span"
  );

  displayAll();
  containerAll.innerHTML = "";
  filterContainer.classList.add("none");
});
