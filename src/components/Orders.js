import { Component } from "react";
import axios from "axios";   
import { Link } from "react-router-dom";
import { access_token,baseUrl } from "../App";



class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderProducts:null,
            checkedData:false
        }
    }


    componentDidMount(){
        if(access_token){
            this.fetchOrders();
        }
    }

    fetchOrders(){
        axios.get(baseUrl+'orders/')
        .then((res)=>{
            this.setState({orderProducts:res.data})
            this.setState({checkedData:true})
        })
        .catch((error)=> {
            this.setState({checkedData:true})
        });
    };



    render() {
        return (
            <>
                <h4 className="text-center mb-5" >Orders</h4>
                {   
                    this.state.orderProducts&&
                    this.state.orderProducts.map((p)=>(                       
                        <div key={p.id} className="wishlist-product-container">
                            <Link 
                            to={`/${p.product_variant.product_color_variant.product.category.slug}/${p.product_variant.product_color_variant.product.slug}/${p.product_variant.product_color_variant.color.name}/${p.product_variant.size.name}/${p.product_variant.product_color_variant.product.id}/`}
                            className="wishlist-product-image"
                            >
                               <div className="image">
                                   <img src={
                                    p.product_variant.product_color_variant.image1?
                                    p.product_variant.product_color_variant.image1:
                                    p.product_variant.product_color_variant.product.image_main
                                    } />
                               </div>
                            </Link>

                            <div className="wishlist-product-details">
                                <h6> 
                                    {
                                    p.product_variant.product_color_variant.product.name + "("+
                                    p.product_variant.product_color_variant.color.name+","+
                                    p.product_variant.size.name+")"
                                    }  
                                </h6>
                                
                                <h6>
                                    
                                        Rs.{
                                            p.product_variant.price-
                                            p.product_variant.price/100*p.product_variant.offer                                    
                                        }                                       
                                    
                                </h6>
                                <p>Order ID : {p.order_id}</p>
                                <p>Date : {p.ordered_date}</p>
                                {
                                   p.status === 'Cancelled'? 
                                    <p className="text-danger">Status : {p.status}</p>
                                    :<p className="text-success">Status : {p.status}</p>
                                }
                            </div>

                            <Link to={`/user/dashbord/orders/${p.order_id}/`} className="btn btn-primary h-25">
                                Details
                            </Link>
                      </div>
                    ))
                    
                }
                {
                    !this.state.checkedData&&
                    <h6>Loading .....</h6>
                }
                {
                    this.state.orderProducts&&this.state.orderProducts.length ===0&&
                    <h6>You have not ordered anything</h6>
                }
            </>
        );
    }
}

export default Orders;