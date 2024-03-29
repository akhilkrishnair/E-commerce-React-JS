import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import {  FaUser,FaHome, FaShoppingBag,  } from "react-icons/fa";
import '../components/css/Header.css';
import { access_token,baseUrl } from "../App";


class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentUser : false,
            email:"",
            first_name:"",
            last_name:"",
            user_id:null,
            searchItems:"",
        }
    }

    componentDidMount (){
        if(access_token){
            axios.get(baseUrl+'user/profile/',
            ).then((res) => {
                this.setState({currentUser:true})
                this.setState({email:res.data.email})
                this.setState({first_name:res.data.first_name})
                this.setState({last_name:res.data.last_name})
                this.setState({user_id:res.data.id})
                this.props.set_current_user(true)
    
    
            }).catch((err) => {
                this.setState({currentUser:false})
                this.props.set_current_user(false)
            })
        }
    }

 
    

    componentDidUpdate(){
        if (
            !this.state.currentUser&&
            window.location.href==='http://127.0.0.1:3000/user/cart/'||
            window.location.href==='http://127.0.0.1:3000/user/dashbord/'||
            window.location.href==='http://127.0.0.1:3000/user/dashbord/wishlist/'||
            window.location.href==='http://127.0.0.1:3000/user/dashbord/orders/'||
            window.location.href==='http://127.0.0.1:3000/user/dashbord/profile/'
            ){
            window.location.href='/'
        }
      

    }
   

    searchItems =(e)=> {
        const {name,value} = e.target;
        this.setState({[name]:value});
    }
    
    searchItemSend = (e) => {
        this.props.product_search(this.state.searchItems)
    }
    

   


     
    render() {
        
        return (
            <div className="header-section">
                    <nav className="navbar bg-dark navbar-expand-lg " data-bs-theme="dark" >
                        <div className="container-fluid">
                            <h3>
                                <Link className="navbar-brand mx-5" 
                                   to={"/"}   
                                >
                                    E-Shop
                                </Link>
                            </h3>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse ms-4" id="navbarSupportedContent">
                            <ul className="ms-4 navbar-nav me-auto mb-2 mb-lg-0">


                                {
                                !this.state.currentUser?
                                <li className="nav-item dropdown">
                                <a className="nav-link active dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FaUser className="fs-5" /> 
                                </a>
                                    
                                        
                                        <ul className='dropdown-menu'>
                                    
                                                <li><Link className="dropdown-item" to={"/user/registration"} >Register</Link></li>
                                                <li><Link className="dropdown-item"  to={"/user/login/"}>Log in</Link></li>
                                        
                                        </ul>
                                </li>:

                                <li className="nav-item text-light ms-1">
                                    <Link className="nav-link active" to={'/user/dashbord/profile/'} > <FaUser className="fs-5" /> </Link>
                                </li>
                                }

                                <li className="nav-item ms-1">
                                <Link className="nav-link active" aria-current="page" to={'/'} ><FaHome className="fs-5" /></Link>
                                </li>

                                {
                                    this.state.currentUser&&
                                        <li className="nav-item ms-1">
                                            <Link className="nav-link active" aria-current="page" to={'/user/cart/'} >
                                                    
                                                    <span className="p-1" >
                                                        <FaShoppingBag className="fs-5" /> 
                                                        {
                                                            this.props.cart_count>0&&
                                                            <span className="header-cart-icon">{this.props.cart_count}</span> 
                                                        }
                                                    </span> 

                                            </Link>
                                        </li>

                                }


                            </ul>
                            <div className="d-flex col-lg-6" role="search">
                                <input className="form-control me-2 border-light" name="searchItems" 
                                type="search" placeholder="Search products" aria-label="Search"
                                onChange={this.searchItems}
                                />
                                <Link 
                                    className="btn btn-outline-light" 
                                    type="submit"
                                    onClick={this.searchItemSend}
                                    to={`/search/?query=${this.state.searchItems}`}>Search</Link>
                            </div>
                            </div>
                        </div>

                    </nav>
            </div>
        );
    }
}


export default Header;