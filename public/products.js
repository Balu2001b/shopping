let products = null;


fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    addDataToHTML();
  });



 function addDataToHTML() {
    let listProductHTML = document.querySelector('.listProduct');
    

    if (products != null) {
        
        products.forEach(product => {
            let newProduct = document.createElement('a');
            newProduct.classList.add('item');
            newProduct.href = `products.html?id=${product.id}`;

            

            newProduct.innerHTML = `
                <img src="${product.image}" alt="" data-aos="fade-up" >
                <h2 data-aos="fade-up">${product.name}</h2>
                <div class="price" data-aos="fade-up">Rs.${product.price}</div>
            
            `;
            
 

           
        
            listProductHTML.appendChild(newProduct);
        });
    }
}



