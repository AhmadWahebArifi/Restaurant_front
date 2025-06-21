import { useRef } from "react";

function MenuForm() {
  const nameInput = useRef();
  const descriptionInput = useRef();
  const is_AvailableInput = useRef();
  const Category_idInput = useRef();
  const PriceInput = useRef();

  const SubmitHandler = () => {
    // nameInput.current.value;
    const InputInfo = axios
      .post(
        "http://127.0.0.1:8000/api/customer",
        {
          name: nameInput.current.value,
          phone: PhoneInput.current.value,
          address: AddressInput.current.value,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
            "Content-Type": "applicatioin/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => console.log(res.errors))
      .catch((err) => console.log(err.res.data));
  };
  return (
    <>
      <form method="post" onSubmit={SubmitHandler}>
        <div class="relative">
          <label
            for="Address"
            className="mb-2.5 block ml-[16px] text-base font-medium text-dark dark:text-white"
          >
            Category
          </label>
          <select
            name="default-select"
            class="ml-[16px] w-96 appearance-none bg-transparent rounded-lg border border-stroke py-3 pl-5 pr-12 text-dark outline-hidden focus:border-primary dark:border-dark-3 dark:text-white"
          >
            <option className="bg-blue-950" value="Foods">
              1
            </option>
            <option className="bg-blue-950" value="Desserts">
              2
            </option>
            <option className="bg-blue-950" value="Drinks">
              3
            </option>
          </select>
          <span class="pointer-events-none absolute right-0 top-0 flex h-full w-12 items-center justify-center text-dark-5">
            <path
              d="M2.29645 5.15354L2.29642 5.15357L2.30065 5.1577L7.65065 10.3827L8.00167 10.7255L8.35105 10.381L13.7011 5.10603L13.7011 5.10604L13.7036 5.10354C13.7221 5.08499 13.7386 5.08124 13.75 5.08124C13.7614 5.08124 13.7779 5.08499 13.7964 5.10354C13.815 5.12209 13.8188 5.13859 13.8188 5.14999C13.8188 5.1612 13.8151 5.17734 13.7974 5.19552L8.04956 10.8433L8.04955 10.8433L8.04645 10.8464C8.01604 10.8768 7.99596 10.8921 7.98519 10.8992C7.97756 10.8983 7.97267 10.8968 7.96862 10.8952C7.96236 10.8929 7.94954 10.887 7.92882 10.8721L2.20263 5.2455C2.18488 5.22733 2.18125 5.2112 2.18125 5.19999C2.18125 5.18859 2.18501 5.17209 2.20355 5.15354C2.2221 5.13499 2.2386 5.13124 2.25 5.13124C2.2614 5.13124 2.2779 5.13499 2.29645 5.15354Z"
              fill="currentColor"
              stroke="currentColor"
            />
          </span>
        </div>

        <div className="flex flex-wrap">
          <div className="p-5">
            <label
              for="name"
              className="mb-2.5 block text-base font-medium text-dark dark:text-white"
            >
              Name
            </label>
            <input
              ref={nameInput}
              type="text"
              name="name"
              placeholder="Enter Food Name"
              className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            />
          </div>
          <div className="p-5">
            <label
              for="Phone"
              className="mb-2.5 block text-base font-medium text-dark dark:text-white"
            >
              Description
            </label>
            <input
              ref={descriptionInput}
              type="text"
              name="Description"
              placeholder="Enter Food Description"
              className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            />
          </div>
          <div className="p-5">
            <label
              for="Address"
              className="mb-2.5 block text-base font-medium text-dark dark:text-white"
            >
              Category
            </label>
            <select
              name="default-select"
              class=" w-96 appearance-none bg-transparent rounded-lg border border-stroke py-3 pl-5 pr-12 text-dark outline-hidden focus:border-primary dark:border-dark-3 dark:text-white"
            >
              <option className="bg-blue-950" value="True">
                Exist
              </option>
              <option className="bg-blue-950" value="False">
                NotExist
              </option>
            </select>
            <span class="pointer-events-none absolute right-0 top-0 flex h-full w-12 items-center justify-center text-dark-5">
              <path
                d="M2.29645 5.15354L2.29642 5.15357L2.30065 5.1577L7.65065 10.3827L8.00167 10.7255L8.35105 10.381L13.7011 5.10603L13.7011 5.10604L13.7036 5.10354C13.7221 5.08499 13.7386 5.08124 13.75 5.08124C13.7614 5.08124 13.7779 5.08499 13.7964 5.10354C13.815 5.12209 13.8188 5.13859 13.8188 5.14999C13.8188 5.1612 13.8151 5.17734 13.7974 5.19552L8.04956 10.8433L8.04955 10.8433L8.04645 10.8464C8.01604 10.8768 7.99596 10.8921 7.98519 10.8992C7.97756 10.8983 7.97267 10.8968 7.96862 10.8952C7.96236 10.8929 7.94954 10.887 7.92882 10.8721L2.20263 5.2455C2.18488 5.22733 2.18125 5.2112 2.18125 5.19999C2.18125 5.18859 2.18501 5.17209 2.20355 5.15354C2.2221 5.13499 2.2386 5.13124 2.25 5.13124C2.2614 5.13124 2.2779 5.13499 2.29645 5.15354Z"
                fill="currentColor"
                stroke="currentColor"
              />
            </span>
          </div>

          <div className="p-5">
            <label
              for="Address"
              className="mb-2.5 block text-base font-medium text-dark dark:text-white"
            >
              Price
            </label>
            <input
              ref={PriceInput}
              type="text"
              name="Price"
              placeholder="Enter Food Price"
              className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            />
          </div>
        </div>
        <a
          onClick={SubmitHandler}
          className="inline-flex m-12 rounded-full border border-transparent bg-blue-950 px-7 py-3 text-center text-base font-medium text-dark shadow-1 hover:bg-blue-700 disabled:border-gray-3 disabled:bg-gray-3 disabled:text-dark-5 dark:bg-gray-2 dark:shadow-box-dark dark:hover:bg-dark-3"
        >
          <span className="pr-[10px]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current"
            >
              <g clip-path="url(#clip0_906_8052)">
                <path d="M13.1875 9.28125H10.6875V6.8125C10.6875 6.4375 10.375 6.125 9.96875 6.125C9.59375 6.125 9.28125 6.4375 9.28125 6.84375V9.3125H6.8125C6.4375 9.3125 6.125 9.625 6.125 10.0312C6.125 10.4062 6.4375 10.7187 6.84375 10.7187H9.3125V13.1875C9.3125 13.5625 9.625 13.875 10.0312 13.875C10.4062 13.875 10.7187 13.5625 10.7187 13.1562V10.6875H13.1875C13.5625 10.6875 13.875 10.375 13.875 9.96875C13.875 9.59375 13.5625 9.28125 13.1875 9.28125Z" />
                <path d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.8125 19.4688 10.0312 19.4688C15.25 19.4688 19.5 15.2188 19.5 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.5625 18.0625 10C18.0625 14.4375 14.4375 18.0625 10 18.0625Z" />
              </g>
              <defs>
                <clipPath id="clip0_906_8052">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          Add Menu
        </a>
      </form>
    </>
  );
}
export default MenuForm;
