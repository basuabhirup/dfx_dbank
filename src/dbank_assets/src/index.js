import { dbank } from "../../declarations/dbank";

document.addEventListener("DOMContentLoaded", async function () {
  await getCurrentAmount();
});

document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const inputAmount = document.getElementById("input-amount");
    const withdrawalAmount = document.getElementById("withdrawal-amount");
    const submitBtn = document.getElementById("submit-btn");

    submitBtn.setAttribute("disabled", true);
    inputAmount.setAttribute("disabled", true);
    withdrawalAmount.setAttribute("disabled", true);

    if (inputAmount.value.length > 0) {
      await dbank.topUp(parseFloat(inputAmount.value));
    }

    if (withdrawalAmount.value.length > 0) {
      await dbank.withdraw(parseFloat(withdrawalAmount.value));
    }

    await getCurrentAmount();

    inputAmount.value = "";
    withdrawalAmount.value = "";

    submitBtn.removeAttribute("disabled");
    inputAmount.removeAttribute("disabled");
    withdrawalAmount.removeAttribute("disabled");
  });

const getCurrentAmount = async () => {
  const currentAmount = await dbank.checkBalance();
  // console.log({ currentAmount });
  document.getElementById("value").innerText = currentAmount.toFixed(2);
};
