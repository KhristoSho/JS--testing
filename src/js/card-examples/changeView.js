export function changeView(payment) {
  const otherCards = document.querySelectorAll(".card-example img");
  for (const card of otherCards) {
    card.style.opacity = "0.2";
  }
  if (!payment) {
    return;
  }
  const card = document.getElementById(payment);
  card.firstElementChild.style.opacity = "1";
}
