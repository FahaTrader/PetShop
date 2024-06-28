const btnCarrinho = document.getElementById("btn-carrinho");
const btnFechar = document.getElementById("btn-fechar");
const modal = document.getElementById("modal");
const fecharCarrinho = document.getElementById("btn-fechar");
const modalMobile = document.getElementById("bag-modal");
const menu = document.getElementById("menu");
const cartItem = document.getElementById("body-modal");
const valorTotal = document.getElementById("valor-total");
const contadorItem = document.getElementById("contador");
const contadorBag = document.getElementById("bag-contador");
const mensagemItem = document.getElementById("container-mensagem");
const productContainer = document.getElementById("product-container");
const verMaisBtn = document.getElementById("ver-mais");
const continuarCompra = document.getElementById("continuar");
const finalizarPedido = document.getElementById("btn-final");
const fecharFinal = document.getElementById("fechar-final");

let cart = [];
let produtosMostrados = 0;
const produtosPorPagina = 6;

const produtos = [
    { name: "Caixa de transporte", price: 28.00, image: "/assets/caixa.png" },
    { name: "Caixa de areia", price: 55.00, image: "/assets/areia.png" },
    { name: "Cama pet 2 peças", price: 60.00, image: "/assets/cama.png" },
    { name: "Puxador com ventosa", price: 45.00, image: "/assets/ventosa.png" },
    { name: "Arranhador para gato", price: 290.00, image: "/assets/arranhador.png" },
    { name: "Tigela pet", price: 100.00, image: "/assets/tigela.png" },
    { name: "Ração Cachorro 10Kg", price: 127, image: "/assets/Ração.png" },
    { name: "Ração Gato 1Kg", price: 61.50, image: "/assets/ração gato.png" },
    { name: "Mistura calopsita 500g", price: 7.50, image: "/assets/ração callopsita.png" },
];

btnCarrinho.addEventListener("click", () => {
    modal.classList.add("show");
});

btnFechar.addEventListener("click", () => {
    modal.classList.remove("show");
});

modalMobile.addEventListener("click", () => {
    modal.classList.add("show");
});

modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

fecharCarrinho.addEventListener("click", function() {
    modal.classList.remove("show");
});

menu.addEventListener("click", function(event) {
    let parentButton = event.target.closest(".svg-icon");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        const image = parentButton.getAttribute("data-image");

        addCart(name, price, image);
    }
});

function addCart(name, price, image) {
    const existeItem = cart.find(item => item.name === name);

    if (existeItem) {
        existeItem.quantity += 1;
        showMensagem("Item adicionado com sucesso");
    } else {
        cart.push({
            name,
            price,
            image,
            quantity: 1,
        });
        showMensagem("Item adicionado com sucesso");
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    cartItem.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");

        cartItemElement.innerHTML = `
            <div class="card-item">
                <img src="${item.image}" alt=""/>
                <div class="desc-modal">
                    <p class="title-desc">${item.name}</p>
                    <p class="desc-price"><span>R$</span> ${item.price.toFixed(2)}</p>
                </div>
                <div class="buttons-quantity">
                    <button class="btn btn-menos" data-name="${item.name}"><i class="fa-solid fa-minus"></i></button>
                    <p class="quantity-item">${item.quantity}</p>
                    <button class="btn btn-mais" data-name="${item.name}"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        `;

        total += item.price * item.quantity;

        cartItem.appendChild(cartItemElement);
    });

    valorTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    contadorItem.textContent = cart.length;
    contadorBag.textContent = cart.length;

    document.querySelectorAll('.btn-menos').forEach(button => {
        button.addEventListener('click', function(event) {
            const itemName = event.target.closest('button').getAttribute('data-name');
            updateQuantity(itemName, -1);
        });
    });

    document.querySelectorAll('.btn-mais').forEach(button => {
        button.addEventListener('click', function(event) {
            const itemName = event.target.closest('button').getAttribute('data-name');
            updateQuantity(itemName, 1);
        });
    });
}

function updateQuantity(name, delta) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.name !== name);
        }
    }
    atualizarCarrinho();
}

function showMensagem(mensagem) {
    const mensagemElement = document.createElement("div");
    mensagemElement.className = "mensagem-item animate__animated animate__fadeInDown";
    mensagemElement.textContent = mensagem;
    mensagemItem.appendChild(mensagemElement);

    setTimeout(() => {
        mensagemElement.classList.replace("animate__fadeInDown", "animate__fadeOutUp");
        mensagemElement.addEventListener("animationend", () => {
            mensagemElement.remove();
        });
    }, 2000);
}

function exibirProdutos() {
    const produtosParaMostrar = produtos.slice(produtosMostrados, produtosMostrados + produtosPorPagina);

    produtosParaMostrar.forEach(produto => {
        const productElement = document.createElement("div");
        productElement.className = "product-item";
        productElement.innerHTML = `
        <div class="col-12 col-lg-4">
            <div class="card">
                <div class="card-img"><img src="${produto.image}" alt="${produto.name}"></div>
                <div class="card-info">
                    <p class="text-title">${produto.name}</p>
                </div>
                <div class="card-footer">
                    <span class="text-title">R$ ${produto.price.toFixed(2)}</span>
                    <div class="card-button">
                        <svg class="svg-icon" viewBox="0 0 20 20" data-image="${produto.image}" data-name="${produto.name}" data-price="${produto.price}">
                            <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                            <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                            <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        `;
        productContainer.appendChild(productElement);
    });

    produtosMostrados += produtosPorPagina;

    if (produtosMostrados >= produtos.length) {
        verMaisBtn.style.display = "none";
    }
}

verMaisBtn.addEventListener("click", exibirProdutos);

// Exibir os primeiros produtos ao carregar a página
exibirProdutos();

continuarCompra.addEventListener("click", function(){
    $("#modal-carrinho").addClass("hidden");
    $("#bg-final").removeClass("hidden");
});

fecharFinal.addEventListener("click", function(){
    $("#modal-carrinho").removeClass("hidden");
    $("#bg-final").addClass("hidden");
})

finalizarPedido.addEventListener("click", function() {
    const nomeCompleto = document.getElementById("nome-completo").value;
    const endereco = document.getElementById("endereco").value;
    const formaPagamento = document.getElementById("forma-pagamento").value;
    const whatsapp = document.getElementById("whatsapp").value;

    let mensagem = `*Pedido*\n\n*Nome:* ${nomeCompleto}\n*Endereço:* ${endereco}\n*Forma de pagamento:* ${formaPagamento}\n*WhatsApp:* ${whatsapp}\n\n*Itens do pedido:*\n`;

    cart.forEach(item => {
        mensagem += `- ${item.name} (x${item.quantity}): R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    mensagem += `\n*Valor Total:* ${valorTotal.textContent}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=5521988526928&text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
});
