import './App.css'
import Signup from './pages/Signup'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import MemoList from './pages/MemoList'
import MemoForm from './pages/MemoForm'
import Memo from './pages/Memo'
import MemoEdit from './pages/MemoEdit'
import { AuthProvider } from './context/AuthContext'
import MyPage from './pages/MyPage'
import { AxiosProvider } from './context/AxiosContext'

function App() {

  return (
    <>
        <AuthProvider>
          <BrowserRouter >
            <AxiosProvider>
            <Header />
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              
              <Route path="/memos" element={<PrivateRoute><MemoList /></PrivateRoute>} />
              <Route path='/memos/:id' element={<PrivateRoute><Memo /></PrivateRoute>} />
              <Route path="/memos/create" element={<PrivateRoute><MemoForm /></PrivateRoute>} />
              <Route path="/memos/:id/update" element={<PrivateRoute><MemoEdit /></PrivateRoute>} />

              <Route path='/mypage' element={<PrivateRoute><MyPage/></PrivateRoute>} />
            </Routes>
            </AxiosProvider>
          </BrowserRouter >
        </AuthProvider>
    </>
  )
}

export default App
