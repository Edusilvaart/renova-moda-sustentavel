////////////// Scripts do navbar e carrinho /////////////////

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle("active");
    navbar.classList.remove("active");
    shoppingCart.classList.remove("active");
}

let shoppingCart = document.querySelector(".shopping-cart");

document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle("active");
    searchForm.classList.remove("active");
    navbar.classList.remove("active");
}

let navbar = document.querySelector(".navbar");

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle("active");
    searchForm.classList.remove("active");
    shoppingCart.classList.remove("active");
}

window.onscroll = () => {
    shoppingCart.classList.remove("active");
    searchForm.classList.remove("active");
    navbar.classList.remove("active");
}

////////// função para adicionar produtos ao carrinho ////////////

const cartIcon = document.querySelector("#cart-btn");
const cartCount = document.querySelector("#cart-count");
const sidebar = document.querySelector("#sidebar");
const cartContent = document.querySelector(".cart-content");
const closeBtn = document.querySelector(".close-btn");

let itemsAdded = JSON.parse(localStorage.getItem('cartItems')) || [];

cartIcon.addEventListener("click", toggleSidebar);
closeBtn.addEventListener("click", toggleSidebar);

function toggleSidebar() {
    sidebar.classList.toggle("active");
}

// Adiciona evento de clique para o botão "Adicionar ao carrinho" do produto principal
const mainAddToCartButton = document.getElementById("add-to-cart-button");
if (mainAddToCartButton) {
    mainAddToCartButton.addEventListener("click", handleMainProductAddToCart);
}

function handleMainProductAddToCart() {
    const title = document.querySelector(".single-pro-details h3").innerText;
    const price = parseFloat(document.querySelector(".single-pro-details h2").innerText.replace('R$', '').replace(',', '.'));
    const imgSrc = document.querySelector(".single-pro-image img").src;

    const newProduct = {
        title,
        price,
        imgSrc,
        quantity: 1
    };

    const existingItem = itemsAdded.find(item => item.title === newProduct.title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        itemsAdded.push(newProduct);
    }

    saveCartToLocalStorage();
    updateCartCount();
    renderCartItems();
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", handleAddToCart);
});

function updateCartCount() {
    cartCount.innerText = itemsAdded.length;
    cartCount.style.display = itemsAdded.length > 0 ? "block" : "none";
}

////////// função para atualizar o valor do carrinho ////////////

function renderCartItems() {
    cartContent.innerHTML = "";
    if (itemsAdded.length === 0) {
        cartContent.innerHTML = "<p id='empty-cart-message'>Seu carrinho está vazio.</p>";
        return;
    }

    let total = 0;
    itemsAdded.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("product-item");
        itemElement.style.display = "flex";
        itemElement.style.justifyContent = "space-between";
        itemElement.style.alignItems = "center";

        itemElement.innerHTML = `
            <img src="${item.imgSrc}" class="product-image" style="width: 50px; height: auto; margin-right: 10px;" />
            <div style="flex: 1;">
                <h4 style="margin: 0;">${item.title}</h4>
                <p style="margin: 0;">Valor: R$ ${item.price.toFixed(2)}</p>
                <p style="margin: 0;">Quantidade: <span id="quantity-${index}">${item.quantity}</span></p>
            </div>

            <div style="display: flex; align-items: center;">
                <button class="quantity-btn" onclick="alterarQuantidade(${index}, -1)" style="background: none; border: none; cursor: pointer;">
                    <i class="fas fa-minus"></i>
                </button>
                <button class="quantity-btn" onclick="alterarQuantidade(${index}, 1)" style="background: none; border: none; cursor: pointer;">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="remove-item" onclick="removerProduto(${index})" style="background: none; border: none; cursor: pointer;">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        `;
        cartContent.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    document.getElementById('total-value').innerText = `Valor total: R$ ${total.toFixed(2)}`;
}

function alterarQuantidade(index, delta) {
    const item = itemsAdded[index];

    if (delta < 0 && item.quantity <= 1) {
        return;
    }

    item.quantity += delta;
    saveCartToLocalStorage();
    renderCartItems();
}

////////// função para remover produtos ////////////

function removerProduto(index) {
    itemsAdded.splice(index, 1);
    saveCartToLocalStorage();
    updateCartCount();
    renderCartItems();

    if (itemsAdded.length === 0) {
        document.getElementById('total-value').innerText = `Valor total: R$ 0,00`;
    }
}

document.querySelector(".checkout-btn").addEventListener("click", function () {
    window.location.href = "carrinho.html";
});

function handleAddToCart(event) {
    const product = event.target.closest(".pro");
    const title = product.querySelector("h5").innerText;
    const price = parseFloat(product.querySelector("h4").innerText.replace('R$', '').replace(',', '.'));
    const imgSrc = product.querySelector("img").src;

    const newProduct = {
        title,
        price,
        imgSrc,
        quantity: 1
    };

    const existingItem = itemsAdded.find(item => item.title === newProduct.title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        itemsAdded.push(newProduct);
    }

    saveCartToLocalStorage();
    updateCartCount();
    renderCartItems();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(itemsAdded));
}

// Renderiza os itens do carrinho ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCartItems();
});

////////////// Scripts da barra de pesquisa /////////////////

const produtos = [
    { id: 1, nome: 'Calça jeans elétrica vermelha', descricao: 'Calça jeans elétrica vermelha', preco: 'R$109,99' },
    { id: 2, nome: 'Calça jeans elétrica azul', descricao: 'Calça jeans elétrica azul', preco: 'R$109,99' },
    { id: 3, nome: 'Jaqueta multi-color', descricao: 'Jaqueta multi-color', preco: 'R$89,99' },
    { id: 4, nome: 'Camiseta old cartoom', descricao: 'Camiseta old cartoom', preco: 'R$59,99' },
    { id: 5, nome: 'Moletom de lã arcanjos', descricao: 'Moletom de lã arcanjos', preco: 'R$130,00' },
    { id: 6, nome: 'Moletom flores', descricao: 'Moletom flores', preco: 'R$119,99' },
    { id: 7, nome: 'Shorts underground', descricao: 'Shorts underground', preco: 'R$69,99' },
    { id: 8, nome: 'Moletom joaninha', descricao: 'Moletom joaninha', preco: 'R$109,99' },
    { id: 9, nome: 'Calça de couro camuflada', descricao: 'Calça de couro camuflada', preco: 'R$159,99' },
    { id: 10, nome: 'Calça jeans primavera', descricao: 'Calça jeans primavera', preco: 'R$189,99' },
    { id: 11, nome: 'Jaqueta de couro coração do deserto', descricao: 'Jaqueta de couro coração do deserto', preco: 'R$189,99' },
    { id: 12, nome: 'Calça cargo olhares', descricao: 'Calça cargo olhares', preco: 'R$129,99' },
    { id: 13, nome: 'Camiseta Gasparzinho vida loka', descricao: 'Camiseta Gasparzinho vida loka', preco: 'R$70,00' },
    { id: 14, nome: 'Camisa azul ghostmane', descricao: 'Camisa azul ghostmane', preco: 'R$69,99' },
    { id: 15, nome: 'Camiseta Hull City', descricao: 'Camiseta Hull City', preco: 'R$69,99' },
    { id: 16, nome: 'Camiseta Adidas Spain Collection', descricao: 'Camiseta Adidas Spain Collection', preco: 'R$59,99' },
    { id: 17, nome: 'Camisa atlético mineiro', descricao: 'Camisa atlético mineiro', preco: 'R$49,99' },
    { id: 18, nome: 'Camisa Al-hilal', descricao: 'Camisa Al-hilal', preco: 'R$49,99' },
    { id: 19, nome: 'Jaqueta teclado branco', descricao: 'Jaqueta teclado branco', preco: 'R$109,99' },
    { id: 20, nome: 'Jaqueta teclado preto', descricao: 'Jaqueta teclado preto', preco: 'R$109,99' },
    { id: 21, nome: 'Calça jeans mosaico azul', descricao: 'Calça jeans mosaico azul', preco: 'R$139,99' },
    { id: 22, nome: 'Shorts jeans preto', descricao: 'Shorts jeans preto', preco: 'R$79,99' },
    { id: 23, nome: 'Camiseta polo Harley Davidson', descricao: 'Camiseta polo Harley Davidson', preco: 'R$129,99' },
    { id: 24, nome: 'Camiseta xadrez pokemon Eve', descricao: 'Camiseta xadrez pokemon Eve', preco: 'R$129,99' },
    { id: 25, nome: 'Sweater pokemon Electabuzz', descricao: 'Sweater pokemon Electabuzz', preco: 'R$149,99' },
    { id: 26, nome: 'Shortinho Barbie gótica', descricao: 'Shortinho Barbie gótica', preco: 'R$59,99' },
    { id: 27, nome: 'Camiseta Barbie', descricao: 'Camiseta Barbie', preco: 'R$89,99' },
    { id: 28, nome: 'Moletom Barbie', descricao: 'Moletom Barbie', preco: 'R$129,99' },
    { id: 29, nome: 'Maiô jeans borboleta', descricao: 'Maiô jeans borboleta', preco: 'R$79,99' },
    { id: 30, nome: 'Calça psicodélica rosa', descricao: 'Calça psicodélica rosa', preco: 'R$169,99' },
    { id: 31, nome: 'Moletom napolitano', descricao: 'Moletom napolitano', preco: 'R$129,99' },
    { id: 32, nome: 'Calça jeans flores rosa shock', descricao: 'Calça jeans flores rosa shock', preco: 'R$99,99' },
];

function buscarProdutos() {
    const input = document.getElementById('search-box').value.toLowerCase();
    const resultados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(input) ||
        produto.descricao.toLowerCase().includes(input)
    );

    exibirResultados(resultados);
    exibirSugestoes(input);
}

function exibirResultados(resultados) {
    const productContainer = document.querySelector('.pro-container');
    productContainer.innerHTML = ''; 

    if (resultados.length === 0) {
        productContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    resultados.forEach(produto => {
        const div = document.createElement('div');
        div.classList.add('pro');
        div.innerHTML = `
            <img src="imagens/produto${produto.id}.jpg" alt="${produto.nome}">
            <div class="des">
                <span>custom</span>
                <h5>${produto.nome}</h5>
                <div class="star">                <div class="star">
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>${produto.preco}</h4>
            </div>
            <a class="add-to-cart" data-product-id="${produto.id}"><i class="fa fa-shopping-cart cart" aria-hidden="true"></i></a>
        `;
        productContainer.appendChild(div);
    });
}

function exibirSugestoes(input) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; 
    if (input === '') {
        return; 
    }

    const sugestoes = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(input)
    );

    sugestoes.forEach(produto => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = produto.nome;

        suggestionItem.addEventListener('click', () => {
            document.getElementById('search-box').value = produto.nome;
            suggestionsContainer.innerHTML = ''; 
            buscarProdutos(); 
        });

        suggestionsContainer.appendChild(suggestionItem);
    });
}

document.getElementById('search-box').addEventListener('input', buscarProdutos);

//////////////////integração entre o carrinho e checkout//////////////////

function addToCart(product) {
    const cartItems = JSON.parse(localStorage.getItem("produtosCarrinho")) || [];

    const existingItem = cartItems.find(item => item.title === product.title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push(product);
    }

    localStorage.setItem("produtosCarrinho", JSON.stringify(cartItems));
    console.log("Produtos no carrinho:", cartItems);
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const productElement = event.target.closest(".pro");
        const title = productElement.querySelector("h5").innerText;
        const priceText = productElement.querySelector("h4").innerText;
        const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());
        const imgSrc = productElement.querySelector("img").src;

        const product = { title, price, imgSrc, quantity: 1 };
        addToCart(product);
    });
});

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("produtosCarrinho")) || [];
    const cartContent = document.querySelector(".cart-item-box");
    cartContent.innerHTML = ""; 
    let total = 0;

    if (cartItems.length === 0) {
        cartContent.innerHTML = "<p id='empty-cart-message'>Seu carrinho está vazio.</p>";
        document.getElementById("total").innerText = "0,00"; 
        return;
    }

    cartItems.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("product-item");
        itemElement.innerHTML = `
            <img src="${item.imgSrc}" style="width: 50px; height: auto; margin-right: 10px;" />
            <div>
                <h4>${item.title}</h4>
                <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
        `;
        cartContent.appendChild(itemElement);
        total += item.price * item.quantity; 
    });

    document.getElementById("total").innerText = total.toFixed(2).replace('.', ','); 
    document.getElementById("total").style.display = "block"; 
}

function clearCart() {
    localStorage.removeItem("produtosCarrinho"); 
    itemsAdded = [];
    updateCartCount(); 
    loadCartItems();
}


document.getElementById("clear-cart-button").addEventListener("click", clearCart);


window.onload = () => {
    loadCartItems();
    updateCartCount(); 
};

function handlePayment() {
    alert("Pedido feito com sucesso!"); 
    location.reload(); 
}

document.querySelector(".btn.btn-primary").addEventListener("click", handlePayment);

///////////scripts single product//////////////

function handleMainProductAddToCart() {
    const title = document.querySelector(".single-pro-details h3").innerText;
    const price = parseFloat(document.querySelector(".single-pro-details h2").innerText.replace('R$', '').replace(',', '.'));
    const imgSrc = document.querySelector(".single-pro-image img").src;

    const newProduct = {
        title,
        price,
        imgSrc,
        quantity: 1
    };

    const existingItem = itemsAdded.find(item => item.title === newProduct.title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        itemsAdded.push(newProduct);
    }

    saveCartToLocalStorage();
    updateCartCount();
    renderCartItems();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(itemsAdded));
}

function loadCartItems() {
    const itemsAdded = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContent = document.querySelector(".cart-item-box");
    cartContent.innerHTML = ""; 
    let total = 0;

    if (itemsAdded.length === 0) {
        cartContent.innerHTML = "<p id='empty-cart-message'>Seu carrinho está vazio.</p>";
        document.getElementById("total").innerText = "0,00"; 
        return;
    }

    itemsAdded.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("product-item");
        itemElement.innerHTML = `
            <img src="${item.imgSrc}" style="width: 50px; height: auto; margin-right: 10px;" />
            <div>
                <h4>${item.title}</h4>
                <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="remove-item" data-index="${index}">Remover</button>
            </div>
        `;
        cartContent.appendChild(itemElement);
        total += item.price * item.quantity; 
    });

    document.getElementById("total").innerText = total.toFixed(2).replace('.', ',');

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            removeProduct(index);
        });
    });
}

function removeProduct(index) {
    const itemsAdded = JSON.parse(localStorage.getItem('cartItems')) || [];
    itemsAdded.splice(index, 1); 
    localStorage.setItem('cartItems', JSON.stringify(itemsAdded));
    loadCartItems(); 
}

function loadCartItems() {
    const itemsAdded = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContent = document.querySelector(".cart-item-box");
    cartContent.innerHTML = "";

    let total = 0;

    if (itemsAdded.length === 0) {
        cartContent.innerHTML = "<p id='empty-cart-message'>Seu carrinho está vazio.</p>";
        document.getElementById("total").innerText = "0,00";
        return;
    }

    itemsAdded.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("product-item");
        itemElement.innerHTML = `
            <img src="${item.imgSrc}" style="width: 50px; height: auto; margin-right: 10px;" />
            <div>
                <h4>${item.title}</h4>
                <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="remove-item" data-index="${index}">Remover</button>
            </div>
        `;
        cartContent.appendChild(itemElement);
        total += item.price * item.quantity; 
    });

    document.getElementById("total").innerText = total.toFixed(2).replace('.', ',');

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            removeProduct(index);
        });
    });
}

function removeProduct(index) {
    const itemsAdded = JSON.parse(localStorage.getItem('cartItems')) || [];
    itemsAdded.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(itemsAdded)); 
    loadCartItems(); 
}

document.getElementById("clear-cart-button").addEventListener("click", function () {
 
    localStorage.removeItem('cartItems'); 

    loadCartItems(); 
});


document.addEventListener("DOMContentLoaded", loadCartItems);