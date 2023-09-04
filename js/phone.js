const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //console.log(phones);
  displayPhones(phones);
};

const displayPhones = (phones) => {
  console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerText = "";

  const showAllContainer = document.getElementById("show-all-container");

  phones.length >= 7
    ? showAllContainer.classList.remove("hidden")
    : showAllContainer.classList.add("hidden");

  phones = phones.slice(0, 6);

  phones.forEach((phone) => {
    //console.log(phone);
    //2. create a div and add tailwind/daisy ui classes
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card w-full p-5 bg-base-100 shadow-xl";
    //3: Set innerHTML
    phoneCard.innerHTML = `
    <figure>
      <img
        src="${phone.image}"
        alt="phone-image"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
    `;
    //4 Append Child
    phoneContainer.appendChild(phoneCard);
  });

  //hide loading spinner after all data is loaded
  toggleSpinner(false);
};

//handle the search button
const handleSearch = () => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText);
};

const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};
