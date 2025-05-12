const fakeInventory = [
  {
    id: "Finspan",
    name: "Finspan",
    imgSrc: "https://en.lautapelit.fi/tuotekuvat/520x520/Finspan_3D.jpg",
    price: 55,
    qty: 2,
  },
  {
    id: "El Grande",
    name: "El Grande",
    imgSrc: "https://en.lautapelit.fi/tuotekuvat/520x520/El_Grande_3D-VP2.jpg",
    price: 50,
    qty: 5,
  },
  {
    id: "Lost Ruins of Arnak",
    name: "Lost Ruins of Arnak",
    imgSrc:
      "https://en.lautapelit.fi/tuotekuvat/520x520/Lost_ruins_of_Arnak_3D_FI-VP-PV.jpg",
    price: 32,
    qty: 5,
  },
  {
    id: "Ark Nova",
    name: "Ark Nova",
    imgSrc:
      "https://en.lautapelit.fi/tuotekuvat/520x520/Ark-Nova_3D-logos-2.jpg",
    price: 10,
    qty: 4,
  },
]

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms))
}

export async function fetchProducts() {
  await delay(500)
  return [...fakeInventory]
}
