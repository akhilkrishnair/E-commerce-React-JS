import axios from "axios";
import '../components/css/Cart.css';
import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../App";

class Cart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            cartChecked: false,
            totalAmount:0,
        };
    };

    componentDidMount() {
        this.fetchCart();
    };


    fetchCart = async ()=> {
        await this.props.fetch_cart().then((res)=>{
            this.setState({cart:res});
            this.setState({cartChecked:this.props.cart_checked});
            this.amountCalculation(res);
        });

    };

    amountCalculation = (cart)=> {
        let total = 0
        cart.map((cp) => {
            total +=  cp.quantity*(cp.product_variant.price - cp.product_variant.price/100*cp.product_variant.offer)
        })
        this.setState({totalAmount:total})
    }

   

    increamentCart= async (cart_id,product_variant_id)=>{
        
        await axios.post(baseUrl+'cart/increament-qty/',
            {
            cart_id:cart_id,
            product_variant_id:product_variant_id,  
            }
            ).then((res)=>{
                this.fetchCart();
            })
            .catch((err)=>{
            })
    };


    decreamentCart = async (cart_id) => {       
        await axios.post(baseUrl+'cart/decreament-qty/',
            {
            cart_id:cart_id,
            }
            ).then((res)=>{
                this.fetchCart();
            })
            .catch((err)=>{
            })
    };


    deleteCart(cart_id){       
        axios.post(baseUrl+'cart/delete-cart/',
         {
           cart_id:cart_id,
         }
        ).then((res)=>{
            this.fetchCart()
            this.props.cart_counter();
        })
        .catch((err)=>{
        })
    };


    render() {
        
        window.scrollTo(0,0)
        return (
            <div className="cart-main-container">
                {
                    !this.state.cartChecked &&
                    <div className="cart-loader-container">
                        <div className="cart-loader"></div>
                    </div>
                }
                
                {
                    this.state.cartChecked&&this.state.cart.length >0&&
                    <div className="each-cart-container">
                        <section className="h-100" style={{ backgroundColor: "#eee" }}>
                            <div className="container h-100 py-5">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-10">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                                        </div>

                                        {
                                            this.state.cart.map((cp) => (
                                                
                                                <div key={cp.id} className="card rounded-3 mb-4">
                                                    <div className="card-body p-4">
                                                        <div className="row d-flex justify-content-between align-items-center">
                                                            <Link 
                                                            to={        
                                                                `/${cp.product_variant.product_color_variant.product.category.slug}/${cp.product_variant.product_color_variant.product.slug}/${cp.product_variant.product_color_variant.color.name}/${cp.product_variant.size.name}/${cp.product_variant.product_color_variant.product.id}/`
                                                                }

                                                            className=" col-md-2 col-lg-2 col-xl-2">
                                                                <img
                                                                    src={
                                                                        cp.product_variant.product_color_variant.image1?
                                                                        cp.product_variant.product_color_variant.image1:
                                                                        cp.product_variant.product_color_variant.product.image_main
                                                                    }
                                                                    className="img-fluid rounded-3 w-75"
                                                                    alt={"Cotton T-shirt"}
                                                                />
                                                            </Link>
                                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                                <p className=" fw-normal mb-2">
                                                                    {
                                                                        `${cp.product_variant.product_color_variant.product.name}`
                                                                    }
                                                                </p>
                                                                <p>
                                                                    <span className="text-muted">Size: </span>{cp.product_variant.size.name}<br/>
                                                                    <span className="text-muted">Color: </span>{cp.product_variant.product_color_variant.color.name}
                                                                </p>
                                                            </div>

                                                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                                {  
                                                                    <>
                                                                        {                           
                                                                            cp.quantity>1&&
                                                                            <button onClick={()=> this.decreamentCart(cp.id)} className="btn btn-link px-2">
                                                                                <i className="fa fa-minus"></i>
                                                                            </button>                        
                                                                        }
                                                                        <label
                                                                            id="form1"                        
                                                                            className="form-control form-control-sm text-center w-50">
                                                                            {cp.quantity}
                                                                        </label>                                        
                                                                        {
                                                                            cp.quantity < 10&&
                                                                            <button onClick={()=> this.increamentCart(cp.id,cp.product_variant.id)} className="btn btn-link px-2">
                                                                                <i className="fa fa-plus"></i>
                                                                            </button>
                                                                        }
                                                                    </>
                                                                }
                                                            </div>

                                                            <div className="cart-product-stock-status-container">
                                                                {
                                                                    cp.product_variant.stock < 5&&
                                                                    <p className="text-danger">only {cp.product_variant.stock} items left</p>
                                                                }
                                                            </div>

                                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                <h6 className="mb-0">
                                                                    Rs.
                                                                    {
                                                                        cp.product_variant.price-
                                                                        cp.product_variant.price/100*cp.product_variant.offer
                                                                    }
                                                                </h6>
                                                            </div>
                                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                <Link onClick={()=>this.deleteCart(cp.id)} className="text-danger">
                                                                    <i className="fa fa-trash fa-lg"></i>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}


                                        <div className="card">
                                            <div className= {`card-body ${window.innerWidth>500?'d-flex justify-content-between align-items-center':'d-block'}`}>
                                                <Link to={'/user/order/checkout/'} className={`btn btn-warning btn-block btn-lg`}>
                                                    Proceed to Pay
                                                </Link>
                                                <h5 className={`${window.innerWidth>500?" p-1 me-5":"mt-2"}`}>Total Amount : Rs. {this.state.totalAmount}</h5>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                }

                {
                    this.state.cartChecked && this.state.cart.length === 0 && (
                        <div className="empty-cart-container">
                            <Link to={"/"} className="empty-cart">                             
                                You have not added anything to cart! shop now                             
                            </Link>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Cart;
