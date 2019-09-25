import React, { Component } from "react";
import api from "../../services/api";
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    componentDidMount() {        
        this.loadProducts();        
    }

    loadProducts = async (page = 1) => {
        this.setLoading();
        try {
            const response = await api.get(`/products?page=${page}`);

            const { docs, ...productInfo } = response.data;

            this.setState({ products: docs, productInfo, page });
        } catch (err) {
            alert('Erro ao carregar');
        }
        this.setLoading(false);
    };

    setLoading(loading = true) {
        if (loading === true) {
            let loadingEl = document.createElement('p');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');

            document.getElementById('list').appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    };

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    };
    
    render() {
        const { products, page, productInfo } = this.state;

        //return <h1>Contagem de produtos: {this.state.products.length}</h1>;
        return (
            <div className="product-list" id="list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        );
    }
}