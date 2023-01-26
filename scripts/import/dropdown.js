 function displayFilterMenu(displayMediaList) {
  const dropDownMenu = document.querySelector(".dropdownMenu ");
  const filterSelect = document.querySelector(".filter-select");
  const filterSelectButton = document.querySelector(".filter-select-button");
  const filterOptions = document.querySelectorAll(".filter-option");
  const dropdownFilter = document.getElementById('filter-options');
  const arrowIcon = document.querySelector('.fa-solid');
  const firstFilterOption = document.querySelector(".filter-select a:first-child");
  //selection du dernier enfant de l'élément filter select
  const lastFilterOption = document.querySelector(
    ".filter-select a:last-child"
  );
  // parcours le tableau filterOptions au click sur le menu dropdown
  for (const filter of filterOptions) {
    filter.addEventListener("click", function (e) {
      e.preventDefault();
      if (!this.classList.contains("selected")) {
        const selected = this.parentNode.querySelector(
          ".filter-option.selected"
        );

        selected.classList.remove("selected");
        this.classList.add("selected");
        this.setAttribute("aria-selected", "true");
        this.closest(".filter-select").querySelector(".filter-select-button span").textContent = this.textContent;
        hideDropdown();
        displayMediaList();
      }
    });
  }

  dropDownMenu.addEventListener("click", function (e) {
    e.preventDefault();
    if (filterSelect.classList.contains("open")) {
      hideDropdown();
    } else {
      displayDropdown();
    }
  });

  lastFilterOption.addEventListener("keydown", function (e) {
    if (e.code === "Tab" && !e.shiftKey) {
      hideDropdown();
    }
  });

  firstFilterOption.addEventListener("keydown", function (e) {
    if (e.code === "Tab" && e.shiftKey) {
      hideDropdown();
    }
  });

  window.addEventListener("click", function (e) {
    if (!filterSelect.contains(e.target)) {
      hideDropdown();
    }
  });

  function displayDropdown() {
    filterSelect.classList.add("open");
    filterSelectButton.setAttribute("aria-expanded", "true");
    if(arrowIcon.classList.contains('fa-chevron-up')){
      arrowIcon.classList.replace('fa-chevron-up', 'fa-chevron-down')
    } 
    if(dropdownFilter.classList.contains('filter-options-container-hidden')) {
      dropdownFilter.classList.replace('filter-options-container-hidden', 'filter-options-container-display')
    }
  }

  function hideDropdown() {
    filterSelect.classList.remove("open");
    filterSelectButton.setAttribute("aria-expanded", "false");
    if(arrowIcon.classList.contains('fa-chevron-down')){
      arrowIcon.classList.replace('fa-chevron-down', 'fa-chevron-up')
    } 
    if(dropdownFilter.classList.contains('filter-options-container-display')) {
      dropdownFilter.classList.replace('filter-options-container-display', 'filter-options-container-hidden')
    }
  }
}

export {displayFilterMenu }