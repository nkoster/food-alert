export function saveProduct(product) {

  const productCode = product.code;

  console.log('saveProduct', productCode);

  if (product.status === 0) {
    console.log('No data for this product');
    return;
  }

  fetch(`https://foodproducts.w3b.net/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}
