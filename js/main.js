let main = document.querySelector("main");

function getData() {
  fetch("./data.json")
    .then((response) => response.json())
    .then((myData) => {
      myData.forEach((element) => {
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
    });
}
getData();
