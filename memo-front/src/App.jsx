import './App.css'
import Signup from './pages/Signup'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import MemoList from './pages/MemoList'
import MemoForm from './pages/MemoForm'
import Memo from './pages/Memo'
import MemoEdit from './pages/MemoEdit'
import { AuthProvider } from './context/AuthContext'
import MyPage from './pages/MyPage'
import { AxiosProvider } from './context/AxiosContext'
import Layout from "./components/layout/Layout"
import PrivateLayout from "./components/layout/PrivateLayout"
import MemoCreate from './pages/MemoCreate'

function App() {

  return (
    <>
        <AuthProvider>
          <BrowserRouter >
            <AxiosProvider>
            <Routes>
              {/* 공개 페이지 */}
              <Route element={<Layout />}>
                <Route path='/' element={<MemoList />}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Route>
              
              <Route element={<PrivateLayout />}>
                <Route path="/memos" element={<MemoList />} />
                <Route path='/memos/:id' element={<Memo />} />
                <Route path="/memos/create" element={<MemoCreate />} />
                <Route path="/memos/:id/update" element={<MemoEdit />} />
                <Route path='/mypage' element={<MyPage/>} />
              </Route>
              
            </Routes>
            </AxiosProvider>
          </BrowserRouter >
        </AuthProvider>
    </>
  )
}

export default App
