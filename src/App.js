import React, { Component } from "react";
import { connect } from "react-redux";
import ProductGrid from "./components/ProductGrid";
import CartTable from "./components/CartTable";
import { fetchProducts } from "./state/product/action";
import { fetchCart, addToCart } from "./state/cart/actions";
import "./App.css";
import Swiper from "react-id-swiper";
import LoadingScreen from "react-loading-screen";
import Facebook from "./components/Facebook";
import { METHODS } from "http";
import Rodal from "rodal";
import "./rodal.css";
import styled from "styled-components";

class App extends Component {
  componentWillMount() {
    this.props.fetchProducts();
    fetchCart();
  }

  addToCart = product => {
    this.props.addToCart();
  };

  constructor(props) {
    super(props);
    this.state = {
      total: 100,
      loading: true,
      loginShow: "show",
      signupShow: "",
      count: 1,
      visible: false
    };

    this.toggle = this.toggle.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.sifreDegistir = this.sifreDegistir.bind(this);
    this.amountText = React.createRef();
    this.miktarInc = this.miktarInc.bind(this);
    this.miktarDec = this.miktarDec.bind(this);
  }

  sifreDegistir() {
    this.setState({
      loginShow: "",
      sifreDegistir: "show"
    });
  }

  showLogin() {
    this.setState({
      signupShow: "",
      loginShow: "show"
    });
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  miktarInc(product) {
    this.setState({
      count: this.state.count + 1
    });
  }

  miktarDec(product) {
    this.setState({
      count: this.state.count - 1
    });
  }

  reset() {
    this.setState({
      count: 0
    });
  }

  toggle() {
    this.setState({
      signupShow: "show",
      loginShow: ""
    });
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 2700);
  }

  render() {
    const { isProductsLoading, products, cart } = this.props;

    const { loading } = this.state;

    const params = {
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    };

    if (isProductsLoading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div>
        <div>
          <button className="sepet-icon" onClick={this.show.bind(this)} />
          <Rodal visible={this.state.visible} onClose={this.hide.bind(this)}>
            <CartTable cart={cart}/>
            <button className="btn-odeme">Odemeye Git</button>
          </Rodal>   
        </div>
        <LoadingScreen
          loading={loading}
          bgColor="#f1f1f1"
          spinnerColor="#7FFFD4"
          textColor="#C0C0C0"
          logoSrc="https://i.hizliresim.com/ZXQjJ0.png"
          text="Restoran Projesini Hoşgeldiniz. Afiyet Olsun"
        />

        <Swiper {...params}>
          <div className="slide slide0">
            <div className="container">
              <div id="logreg-forms">
                <form className={"form-signin " + this.state.loginShow}>
                  <h1>Üye Ol. Fırsatları Kaçırma!</h1>
                  <div className="social-login">
                    <Facebook
                      className="btn facebook-btn social-btn"
                      type="button"
                    >
                      <span>
                        <i className="fab fa-facebook-f" /> Şununla giriş yap
                        Facebook
                      </span>{" "}
                    </Facebook>
                    <button className="btn google-btn social-btn" type="button">
                      <span>
                        <i className="fab fa-google-plus-g" /> Şununla giriş yap
                        Google+
                      </span>{" "}
                    </button>
                  </div>
                  <p> Veya istersen </p>
                  <div className="input-group">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email Adres"
                      required=""
                      autofocus=""
                    />
                  </div>

                  <div className="input-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Şifre"
                      required=""
                    />
                  </div>

                  <div className="input-group">
                    <button
                      className="btn btn-md btn-rounded btn-block form-control submit"
                      type="submit"
                    >
                      <i className="fas fa-sign-in-alt" />
                      Oturun açabilirsin
                    </button>
                  </div>

                  <a href="#" id={"forgot_pswd" + this.state.sifreDegistir}>
                    Şifreyi Unuttun mu?
                  </a>
                  <hr />
                  <p>Hesabın yoksa.</p>
                  <button
                    className="btn btn-primary btn-block"
                    type="button"
                    id="btn-signup"
                    onClick={this.toggle}
                  >
                    <i className="fas fa-user-plus" />
                    Yeni hesap oluştur.
                  </button>
                </form>

                <form action="#" className="form-reset">
                  <input
                    type="email"
                    id="resetEmail"
                    className="form-control"
                    placeholder="Email address"
                    required=""
                    autofocus=""
                  />
                  <button className="btn btn-primary btn-block" type="submit">
                    Şifreyi Yenile
                  </button>
                  <a href="#" id="cancel_reset" onClick={this.showLogin}>
                    <i className="fas fa-angle-left" />
                    Geri
                  </a>
                </form>

                <form
                  action="#"
                  className={"form-signup " + this.state.signupShow}
                >
                  <div className="social-login">
                    <Facebook
                      className="btn facebook-btn social-btn"
                      type="button"
                    >
                      <span>
                        <i className="fab fa-facebook-f" />
                        Facebook ile kayıt ol.
                      </span>{" "}
                    </Facebook>
                  </div>
                  <div className="social-login">
                    <button className="btn google-btn social-btn" type="button">
                      <span>
                        <i className="fab fa-google-plus-g" />
                        Google+ ile kayıt ol.
                      </span>{" "}
                    </button>
                  </div>

                  <p>Veya istersen</p>
                  <div className="input-group">
                    <input
                      type="text"
                      id="user-name"
                      className="form-control"
                      placeholder="Full name"
                      required=""
                      autofocus=""
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="email"
                      id="user-email"
                      className="form-control"
                      placeholder="Email address"
                      required
                      autofocus=""
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="password"
                      id="user-pass"
                      className="form-control"
                      placeholder="Password"
                      required
                      autofocus=""
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="password"
                      id="user-repeatpass"
                      className="form-control"
                      placeholder="Confirm Password"
                      required
                      autofocus=""
                    />
                  </div>
                  <div className="input-group">
                    <button
                      className="btn btn-md btn-block submit"
                      type="submit"
                    >
                      <i className="fas fa-user-plus" />
                      Kayıt olabilirsin.
                    </button>
                  </div>

                  <a href="#" id="cancel_signup" onClick={this.showLogin}>
                    <i className="fa fa-angle-left" />
                    Geri
                  </a>
                </form>
                <br />
              </div>
            </div>
          </div>
          <div className="slide slide1">
            <div className="container">
              <div className="row">
                <ProductGrid
                  products={products}
                  addToCart={this.addToCart}
                  miktarInc={this.miktarInc}
                  miktarDec={this.miktarInc}
                />
              </div>
            </div>
          </div>
          <div className="slide slide2">
            <div className="container">
              <div className="row">
                <ProductGrid
                  products={products}
                  addToCart={this.addToCart}
                  miktarInc={this.miktarInc}
                  miktarDec={this.miktarInc}
                />
              </div>
            </div>
          </div>
          <div className="slide slide3">
            <div className="container">
              <div className="row">
                <ProductGrid
                  products={products}
                  addToCart={this.addToCart}
                  miktarInc={this.miktarInc}
                  miktarDec={this.miktarInc}
                />
              </div>
            </div>
          </div>
          <div className="slide slide4">
            <div className="container">
              <div className="creditCardForm">
                <div className="heading">
                  <h1>Confirm Purchase</h1>
                </div>
                <div className="payment">
                  <form>
                    <div className="form-group owner">
                      <label for="owner">Owner</label>
                      <input type="text" className="form-control" id="owner" />
                    </div>
                    <div className="form-group CVV">
                      <label for="cvv">CVV</label>
                      <input type="text" className="form-control" id="cvv" />
                    </div>
                    <div className="form-group" id="card-number-field">
                      <label for="cardNumber">Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                      />
                    </div>
                    <div className="form-group" id="expiration-date">
                      <label>Expiration Date</label>
                      <select>
                        <option value="01">January</option>
                        <option value="02">February </option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                      <select>
                        <option value="16"> 2016</option>
                        <option value="17"> 2017</option>
                        <option value="18"> 2018</option>
                        <option value="19"> 2019</option>
                        <option value="20"> 2020</option>
                        <option value="21"> 2021</option>
                      </select>
                    </div>
                    <div className="form-group" id="credit_cards">
                      <img
                        src="https://demo.tutorialzine.com/2016/11/simple-credit-card-validation-form/assets/images/visa.jpg"
                        id="visa"
                      />
                      <img
                        src="https://demo.tutorialzine.com/2016/11/simple-credit-card-validation-form/assets/images/mastercard.jpg"
                        id="mastercard"
                      />
                      <img
                        src="https://demo.tutorialzine.com/2016/11/simple-credit-card-validation-form/assets/images/amex.jpg"
                        id="amex"
                      />
                    </div>
                    <div className="form-group" id="pay-now">
                      <button
                        type="submit"
                        className="btn btn-default"
                        id="confirm-purchase"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Swiper>
      </div>
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
