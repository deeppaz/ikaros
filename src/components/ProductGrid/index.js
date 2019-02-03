import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '../../App.css';
import addToCart from '../../state/cart/actions';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ProductWrapper = styled.div`
  flex-basis: 24%;
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 100%;
`;

const ProductName = styled.div`
  margin: 10px 0;
`;
const ProductPrice = styled.div`
  margin: 10px 0;
`;


const ProductGrid = ({ products, addToCart, miktarEnc, miktarDec }) => (
  <Wrapper>
    {products.map(product => (
      <ProductWrapper key={product._id} className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <ProductImage className="product-image"
          src={product.picture}
        />
        <ProductName className="productName">
          {product.name}
        </ProductName>
        <ProductPrice className="product-price">{product.price}</ProductPrice>

        <button className="btn-sepete-ekle" onClick={() => addToCart(product)}>
       Sepete Ekle
        </button>

        <button  onClick={() => miktarEnc(product)}>+1
        </button>    

        <button  onClick={() => miktarDec(product)}>-1
        </button>
      </ProductWrapper>
    ))}
  </Wrapper>
);

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired,
  addToCart: PropTypes.func.isRequired,
  miktarEnc: PropTypes.func.isRequired,
  miktarDec: PropTypes.func.isRequired,
};


export default ProductGrid;