# Project Structure Guide

## 📁 โครงสร้างโปรเจคตาม Requirements

### 1. **Landing Page** (Must have)
```
src/landing-page/
├─ LandingPage.jsx          # Main landing page
├─ NavBar/                  # Navigation bar
│  ├─ NavBar.jsx
│  ├─ Logo.jsx
│  ├─ HamburgerBar.jsx
│  ├─ LogInBtn.jsx
│  └─ SignUpBtn.jsx
├─ HeroSection/             # Hero section with author info
│  ├─ HeroSection.jsx
│  ├─ AuthorTitle.jsx
│  ├─ AuthorPic.jsx
│  └─ AuthorDescription.jsx
└─ ArticleList/             # List of articles
   ├─ ArticleList.jsx
   ├─ ArticleCard.jsx
   └─ ArticleGrid.jsx
```

### 2. **Authentication** (Must have)
```
src/pages/auth/
├─ LoginPage.jsx            # Login page (admin & member)
├─ SignupPage.jsx           # Signup page (member)
└─ LogoutButton.jsx         # Logout component

src/components/auth/
├─ LoginForm.jsx
├─ SignupForm.jsx
└─ ProtectedRoute.jsx       # Route protection
```

### 3. **Admin Panel** (Must have)
```
src/pages/admin/
├─ AdminDashboard.jsx       # Admin panel main page
├─ ArticleManagement.jsx    # Article CRUD page
└─ ArticleEditor.jsx        # Create/Edit article

src/components/admin/
├─ ArticleTable.jsx
├─ ArticleForm.jsx
├─ PublishButton.jsx
├─ DraftButton.jsx
└─ DeleteButton.jsx
```

### 4. **Article Detail** (Must have)
```
src/pages/article/
└─ ArticleDetailPage.jsx    # Article detail with comments

src/components/article/
├─ ArticleContent.jsx
├─ ArticleHeader.jsx
├─ CommentSection.jsx
├─ CommentList.jsx
├─ CommentForm.jsx
├─ LikeButton.jsx
└─ ShareButton.jsx
```

### 5. **Search & Filter** (Must have)
```
src/components/search/
├─ SearchBar.jsx
├─ CategoryFilter.jsx
└─ FilterDropdown.jsx
```

### 6. **Profile Management** (Should have)
```
src/pages/profile/
└─ ProfilePage.jsx

src/components/profile/
├─ ProfileForm.jsx
├─ ProfilePicture.jsx
└─ PasswordReset.jsx
```

### 7. **Notifications** (Could have)
```
src/components/notifications/
├─ NotificationBell.jsx
├─ NotificationList.jsx
└─ NotificationItem.jsx
```

### 8. **API & Services**
```
src/api/
├─ auth.js                  # Auth API calls
├─ articles.js              # Article API calls
├─ comments.js              # Comment API calls
├─ users.js                 # User API calls
└─ notifications.js         # Notification API calls
```

### 9. **Hooks**
```
src/hooks/
├─ useAuth.js               # Authentication hook
├─ useArticles.js           # Articles hook
├─ useComments.js           # Comments hook
└─ useNotifications.js      # Notifications hook
```

### 10. **Context/State Management**
```
src/context/
├─ AuthContext.jsx          # Auth state
├─ ArticleContext.jsx       # Article state
└─ NotificationContext.jsx  # Notification state
```

### 11. **Types**
```
src/types/
├─ article.js               # Article types
├─ user.js                  # User types
└─ comment.js               # Comment types
```

## 🚀 ขั้นตอนการสร้าง

### Phase 1: Foundation (Week 1-2)
1. ✅ Setup project structure
2. ✅ Setup Tailwind theme
3. Landing Page - NavBar & HeroSection
4. Auth - Login/Signup pages

### Phase 2: Core Features (Week 3-4)
5. Landing Page - Article List
6. Admin Panel - Dashboard
7. Article CRUD - Create, Edit, Delete
8. Article Detail Page

### Phase 3: Interactive Features (Week 5)
9. Search & Filter
10. Comments, Likes, Shares
11. Profile Management

### Phase 4: Enhancements (Week 6)
12. Notifications
13. Polish & Testing

---

## 📐 โครงสร้างตาม Clean Code (Health Test ตัวอย่าง)

**หลักการ: High Cohesion, Low Coupling, Separation of Concerns**

```
src/
├── api/                    # Layer: การเรียก API (ไม่มี UI/state)
│   ├── articles.js
│   └── health.js           # Health / test endpoints
├── hooks/                  # Custom Hooks: logic + state
│   ├── index.js
│   ├── useHealthTest.js    # state (result, error, loading) + testHealth, reset
│   └── ...
├── components/
│   └── healthTest/         # Presentational components (รับ props อย่างเดียว)
│       ├── index.js
│       └── HealthTestPanel.jsx
├── pages/
│   └── HealthTestPage.jsx  # Container: ใช้ hook + ส่ง props ลง Panel
└── context/                # Global state (ใช้เมื่อจำเป็น ไม่ prop drill)
    ├── AuthContext.jsx
    └── ArticleContext.jsx
```

- **API**: รับผิดชอบเฉพาะ HTTP request/response
- **Hooks**: จัดการ state + logic, คืนค่าให้ Page/Container ใช้
- **Components**: แสดงผลจาก props เท่านั้น (ไม่เรียก API เอง)
- **Pages**: รวม hook กับ components ไม่เก็บ business logic ในตัว
- **Context**: ใช้เมื่อมี state ที่หลายระดับของ component ต้องใช้ร่วมกัน

