import React, { Component } from "react";
import { connect } from "react-redux";
import ProductGrid from "./components/ProductGrid";
import CartTable from "./components/CartTable";
import { fetchProducts } from "./state/product/actions";
import { fetchCart, addToCart } from "./state/cart/actions";
import "./App.css";
import Swiper from "react-id-swiper";
import LoadingScreen from "react-loading-screen";
import FirebaseSocial from "./components/Social/FirebaseSocial";
import AboutUs from "./components/AboutUs";
import { METHODS } from "http";
import Rodal from "rodal";
import "./rodal.css";
import logo from "./images/logo.png";
import Stepper from "./Stepper";
import styles from "./styles";
import Paginations from "./components/stepper/Paginations";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import CardReactFormContainer from "card-react";
import "card-react/lib/card.css";

export const StepperContext = React.createContext();

class StepperProvider extends Component {
  state = {
    stage: 1
  };
  render() {
    return (
      <StepperContext.Provider
        value={{
          stage: this.state.stage,
          handleClick: () =>
            this.setState({
              stage: this.state.stage + 1
            })
        }}
      >
        {this.props.children}
      </StepperContext.Provider>
    );
  }
}

class App extends Component {
  componentWillMount() {
    this.props.fetchProducts();
    this.props.fetchCart();
  }

  addToCart = product => {
    this.props.addToCart(product._id, 1);
  };

  constructor(props) {
    super(props);
    this.state = {
      total: 100,
      loading: true,
      count: 1,
      visible: false
    };
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 2700);
  }

  render() {
    const { isProductsLoading, products, cart } = this.props;

    const { loading } = this.state;

    const params = {
      slidesPerView: 1,
      loop: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    };

    if (isProductsLoading) {
      return <h2>Yükleniyor..</h2>;
    }

    return (
      <Router>
        <div>
          <div>
            <button className="sepet-icon" onClick={this.show.bind(this)} />
            <Rodal visible={this.state.visible} onClose={this.hide.bind(this)}>
              <CartTable cart={cart} />
              <button className="btn-odeme">Odemeye Git</button>
            </Rodal>
          </div>
          <div>
            <LoadingScreen
              loading={loading}
              bgColor="#34526f"
              spinnerColor="#9ee5f8"
              textColor="#dd9201"
              logoSrc={logo}
              text="ALTYUM PROJESINE HOŞGELDİN"
            />
          </div>
          <Swiper {...params}>
            <div className="slide slide0">
              <div className="container">
              <div className="rwd-table">
                <StepperProvider>
                  <Stepper stage={1}>
                    {/* <Stepper.Progress>
                      <Stepper.Stage num={1} />
                      <Stepper.Stage num={2} />
                      <Stepper.Stage num={3} />
                    </Stepper.Progress> */}
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      {/* <Stepper.Header title="Hoşgeldiniz" /> */}
                       <Stepper.Progress>
                      <Stepper.Stage num={1} />
                      <Stepper.Stage num={2} />
                      <Stepper.Stage num={3} />
                    </Stepper.Progress>
                      <Stepper.Steps>
                        <Stepper.Step num={1} text={<AboutUs />} />
                        <Stepper.Step num={2} text={<FirebaseSocial />} />
                        <Stepper.Step num={3} text={<Paginations />} />
                      </Stepper.Steps>
                      {/* <Stepper.Footer title="Stepper Footer" /> */}
                    </div>
                  </Stepper>
                </StepperProvider>
                </div>
              </div>
            </div>
            <div className="slide slide1">
              <div className="container">
                <div className="row">
                  <ProductGrid products={products} addToCart={this.addToCart} />
                </div>
              </div>
            </div>
            <div className="slide slide2">
              <div className="container">
                <div className="row">
                  <ProductGrid products={products} addToCart={this.addToCart} />
                </div>
              </div>
            </div>
            <div className="slide slide3">
              <div className="container">
                <div className="row">
                  <ProductGrid products={products} addToCart={this.addToCart} />
                </div>
              </div>
            </div>
            <div className="slide slide4">
              <div className="container">
                <CardReactFormContainer
                  container="card-wrapper"
                  formInputsNames={{
                    number: "CCnumber",
                    expiry: "CCexpiry",
                    cvc: "CCcvc",
                    name: "CCname" 
                  }}
                  initialValues={{
                    number: "", 
                    cvc: "",
                    expiry: "", 
                    name: "" 
                  }}
                  classes={{
                    valid: "valid-input", 
                    invalid: "invalid-input" 
                  }}
                  formatting={true} 
                >
                  <form className="odeme-form">
                   <div id="card-wrapper"></div>
                   <br />
                   <div className="input-styles">
                    <input placeholder="TAM ADI" type="text" name="CCname" /><br /><br />
                    <input
                      placeholder="Kart Numarası"
                      type="text"
                      name="CCnumber"
                    /><br /><br />
                    <input placeholder="AY/YIL" type="text" name="CCexpiry" /><br /><br />
                    <input placeholder="CVC" type="text" name="CCcvc" />
                    <br />
                    <br />
                    </div>
                    <br />
                    <button>Ödemeyi Tamamla</button> veya <button>Sonra Tamamla</button>
                  </form>
                </CardReactFormContainer>
              </div>
            </div>
          </Swiper>
        </div>
      </Router>
    );
  }
}

const getProductById = (products, productId) =>
  products.find(p => p._id === productId);

const populateCartItems = (cart, products) => ({
  ...cart,
  items: cart.items.map(item => ({
    ...item,
    product: getProductById(products, item.productId)
  }))
});

const mapStateToProps = state => ({
  isProductsLoading: state.product.isLoading,
  products: state.product.products,
  cart: populateCartItems(state.cart.cart, state.product.products)
});

const mapDispatchToProps = {
  fetchProducts,
  fetchCart,
  addToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
