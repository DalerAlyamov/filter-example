let jsonGoods = [
  {
    img: "1.avif",
    title: "Ethereal Dusk",
    description: "- Ethereal Series -",
    type: {
      hues: "red",
      styles: "yellow",
    },
  },
  {
    img: "2.avif",
    title: "Ethereal Haze",
    description: "- Ethereal Series -",
    type: {
      hues: "red",
      styles: "yellow",
    },
  },
  {
    img: "3.avif",
    title: "Ethereal Glow",
    description: "- Ethereal Series -",
    type: {
      hues: "red",
      styles: "yellow",
    },
  },
  {
    img: "4.avif",
    title: "Ethereal Noctis",
    description: "- Ethereal Series -",
    type: {
      hues: "red",
      styles: "yellow",
    },
  },
];

let data = {};

const render = (filter) => {
  if (filter !== null) {
    const allDropdownLabelFilters = document.querySelectorAll(
      ".dropdown-label-selected-filters"
    );
    let dropdownLabelFilters = null;
    allDropdownLabelFilters.forEach((d) => {
      if (d.getAttribute("data-filter") === filter) {
        dropdownLabelFilters = d;
      }
    });
    if (!dropdownLabelFilters) return;
    dropdownLabelFilters.innerHTML = !data[filter]
      ? ""
      : `
        <div class="dropdown-label-selected-filter">
          <div class="dropdown-label-selected-filter-icon">
            <img src="./images/filter-icon/${data[filter]}.png" alt="${data[filter]}">
          </div>
          ${data[filter]}
        </div>
      `;
  }
  const filteredGoods = Object.keys(data).length === 0 ? jsonGoods : jsonGoods.filter((product) => {
    let ok = true;
    Object.entries(product.type).forEach(([key, value]) => {
      Object.entries(data).forEach(([key2, value2]) => {
        if (key === key2 && value !== value2) {
          ok = false;
        }
      });
    });
    return ok;
  });

  const goods = document.querySelector(".goods");

  goods.innerHTML = filteredGoods.map(
    (product) =>
      `<div class="product">
        <img src="./images/goods/${product.img}" alt="goods_1" class="product-image">
        <div class="product-title">
          ${product.title}
        </div>
        <div class="product-description">
          ${product.description}
        </div>
      </div>`
  );
};

window.onload = () => {
  render(null);

  const dropdownLabels = document.querySelectorAll(".dropdown-label");

  dropdownLabels.forEach((dropdownLabel) => {
    dropdownLabel.addEventListener("click", () => {
      const dropdown = dropdownLabel.closest(".dropdown");
      const dropdownFilters = dropdown.querySelector(".dropdown-filters");
      const dropdownFiltersInnerWrap = dropdown.querySelector(
        ".dropdown-filters-inner-wrap"
      );
      dropdown.classList.toggle("active");
      if (dropdownFilters.offsetHeight === 0) {
        dropdownFilters.style.height =
          dropdownFiltersInnerWrap.offsetHeight + "px";
      } else {
        dropdownFilters.style.height = 0 + "px";
      }
    });
  });

  const dropdownFilters = document.querySelectorAll(".dropdown-filter");
  dropdownFilters.forEach((dropdownFilter) => {
    dropdownFilter.addEventListener("click", () => {
      const option = dropdownFilter.getAttribute("data-option");
      const value = dropdownFilter.getAttribute("data-value");

      if (value === "clear") {
        data[option] = null;
      } else {
        data[option] = value;
      }
      render(option);
    });
  });
};
