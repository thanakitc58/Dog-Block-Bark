# React Router Setup Guide

## 📦 การติดตั้ง

### 1. ติดตั้ง react-router-dom

```bash
npm install react-router-dom
```

หรือ

```bash
npm install react-router-dom@latest
```

## 📁 โครงสร้างไฟล์ที่สร้างใหม่

```
src/
├── pages/
│   ├── HomePage.jsx          # หน้า Home (Route: /)
│   └── ArticleDetailPage.jsx # หน้า Article Detail (Route: /article/:id)
└── App.jsx                    # ตั้งค่า Router
```

## 🔄 การเปลี่ยนแปลง

### 1. **App.jsx**
- เปลี่ยนจาก state-based navigation เป็น React Router
- ใช้ `BrowserRouter`, `Routes`, `Route`
- Routes:
  - `/` → HomePage
  - `/article/:id` → ArticleDetailPage
  - `*` → Redirect to HomePage (catch all)

### 2. **Components ที่ปรับปรุง**

#### BlogCard.jsx
- เปลี่ยนจาก `onClick` handler เป็น `<Link>` component
- ใช้ `to={`/article/${id}`}` สำหรับ navigation

#### Logo.jsx
- เปลี่ยนจาก `onClick` handler เป็น `<Link>` component
- ใช้ `to="/"` สำหรับกลับหน้า home

#### NavBar.jsx
- ลบ prop `onLogoClick` (ไม่จำเป็นแล้ว)

#### Article/index.jsx
- ลบ prop `onArticleClick` (ไม่จำเป็นแล้ว)

#### ArticleSection.jsx
- ลบ prop `onArticleClick` (ไม่จำเป็นแล้ว)

## 🚀 วิธีใช้งาน

### Navigation ใน Components

#### ใช้ Link Component (สำหรับ navigation แบบไม่ reload)
```jsx
import { Link } from 'react-router-dom'

<Link to="/article/1">Go to Article 1</Link>
<Link to="/">Go to Home</Link>
```

#### ใช้ useNavigate Hook (สำหรับ programmatic navigation)
```jsx
import { useNavigate } from 'react-router-dom'

function MyComponent() {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate('/article/1')
    // หรือ navigate(-1) สำหรับกลับหน้าเดิม
  }
  
  return <button onClick={handleClick}>Go to Article</button>
}
```

#### ใช้ useParams Hook (สำหรับดึง URL parameters)
```jsx
import { useParams } from 'react-router-dom'

function ArticleDetailPage() {
  const { id } = useParams()
  // id จะเป็น string จาก URL เช่น "1", "2"
  // ต้องแปลงเป็น number: parseInt(id)
}
```

## 📍 Routes ที่มี

| Path | Component | Description |
|------|-----------|-------------|
| `/` | HomePage | หน้าแรกพร้อม article list |
| `/article/:id` | ArticleDetailPage | หน้าแสดงรายละเอียดบทความ |
| `*` | HomePage | Catch all route (redirect to home) |

## 🔗 URL Examples

- Home: `http://localhost:5173/`
- Article 1: `http://localhost:5173/article/1`
- Article 2: `http://localhost:5173/article/2`
- Article 5: `http://localhost:5173/article/5`

## ✅ ข้อดีของการใช้ React Router

1. **URL-based Navigation**: สามารถ bookmark, share URL ได้
2. **Browser History**: ใช้ปุ่ม back/forward ของ browser ได้
3. **SEO Friendly**: Search engines สามารถ index URLs ได้
4. **Clean Code**: ไม่ต้องจัดการ state สำหรับ navigation
5. **Deep Linking**: สามารถลิงก์ไปหน้าเฉพาะได้โดยตรง

## 🛠️ Troubleshooting

### ถ้าเจอ error "Cannot find module 'react-router-dom'"
```bash
npm install react-router-dom
```

### ถ้า URL ไม่ทำงาน (404)
- ตรวจสอบว่า Vercel config มี `rewrites` สำหรับ SPA:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### ถ้า navigation ไม่ทำงาน
- ตรวจสอบว่า `<Router>` ครอบ `<Routes>` ใน App.jsx
- ตรวจสอบว่าใช้ `<Link>` แทน `<a>` tag

## 📚 เอกสารเพิ่มเติม

- [React Router Documentation](https://reactrouter.com/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)

