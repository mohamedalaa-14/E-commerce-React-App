import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/website/HomePage/HomePage';
import Login from './pages/Auth/AuthOperations/Login';
import Register from './pages/Auth//AuthOperations/Register';
import Users from './pages/Dashboard/Users/Users';
import GoogleCallBack from './pages/Auth//AuthOperations/GoogleCallBack';
import Dashboard from './pages/Dashboard/Dashboard';
import RequireAuth from './pages/Auth/Protecting/RequireAuth';
import User from './pages/Dashboard/Users/User';
import AddUser from './pages/Dashboard/Users/AddUser';
import Err403 from './pages/Auth//Errors/403';
import Writer from './pages/Dashboard/Writer';
import Err404 from './pages/Auth/Errors/404';
import RequireBack from './pages/Auth/Protecting/RequireBack';
import Categories from './pages/Dashboard/Category/Categories';
import AddCategory from './pages/Dashboard/Category/AddCategory';
import Category from './pages/Dashboard/Category/Category';
import Test from './pages/website/Test';
import Products from './pages/Dashboard/Product/Products';
import AddProduct from './pages/Dashboard/Product/AddProduct';
import Updateproduct from './pages/Dashboard/Product/Product';
import WebsiteCategories from './pages/website/Categories/Categories';
import Website from './pages/website/Website';
import SingleProduct from './pages/website/SingleProduct/SingleProduct';

function App() {
  return (
    <div className="App">
      <Routes>
        {/*public Routes */}
        <Route element={<Website/>}>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/categories' element={<WebsiteCategories/>}/>
      <Route path='/product/:id' element={<SingleProduct/>}/>
      </Route>
      <Route element={<RequireBack/>}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/test' element={<Test/>}/>
      </Route>
      <Route path='/auth/google/callback' element={<GoogleCallBack/>}/>
      <Route path='403' element ={<Err403/>} />
      <Route path='/*' element={<Err404/>} />
      {/* protected Routes */}
      <Route element={<RequireAuth allowedRole={['1996', '1995', '1999']}/>}>
      <Route path='/dashboard' element={<Dashboard/>}>
      <Route element={<RequireAuth allowedRole={['1995']}/>}>
      <Route path='users' element={<Users/>}/>
      <Route path='users/:id' element={<User/>}/>
      <Route path='user/add' element={<AddUser/>}/>
      </Route>
      <Route element={<RequireAuth allowedRole={['1999', "1995"]}/>}>
       {/* Categories */}
      <Route path='categories' element={<Categories/>}/>
      <Route path='category/add' element={<AddCategory/>}/>
      <Route path='categories/:id' element={<Category/>}/>
       {/* Products */}
       <Route path='products' element={<Products/>}/>
      <Route path='product/add' element={<AddProduct/>}/>
      <Route path='products/:id' element={<Updateproduct/>}/>

      </Route>
      <Route element={<RequireAuth allowedRole={['1996', "1995"]}/>}>
      <Route path='writer' element={<Writer/>}/>
      </Route>
    
      </Route>
      </Route>
      </Routes>
  
    </div>
  );
}

export default App;
