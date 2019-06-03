document.addEventListener("DOMContentLoaded", () => {
  const collapse = document.querySelector(".collapse");

  collapse.addEventListener("click", function(element) {
    let target = element.target;
    if (target.className == "collapse__title") {
      target.nextElementSibling.classList.toggle("collapse__elem_active");
    }
  });
});