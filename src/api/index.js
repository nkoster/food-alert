export async function saveProduct(product) {

  const productCode = product.code;

  console.log('saveProduct', productCode);

  const fetcher = async () => {
    try {
      const response = await fetch(`https://foodproducts.w3b.net/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });
      return await response.json();
    }
    catch (error) {
      console.error(error);
    }
  }

  console.log(await fetcher());

}

export async function getProduct(productCode) {
  console.log('getProduct', productCode);
  const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${productCode}.json`);
  return await response.json();
}
