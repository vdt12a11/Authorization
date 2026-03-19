# Hướng dẫn cấu hình biến môi trường (Environment Variables)

Để dự án hoạt động, bạn cần tạo file `.env` ở thư mục gốc và cấu hình các thông số sau:

## 1. Cách tạo ACCESS_TOKEN_SECRET và REFRESH_TOKEN_SECRET

Các mã này dùng để ký (sign) và bảo mật Token của bạn. Bạn nên tạo các chuỗi ngẫu nhiên dài để đảm bảo an toàn.

**Cách làm nhanh nhất bằng Terminal:**
Mở terminal (PowerShell hoặc CMD) và chạy lệnh sau:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

- Chạy lệnh lần 1: Copy kết quả dán vào `ACCESS_TOKEN_SECRET`.
- Chạy lệnh lần 2: Copy kết quả dán vào `REFRESH_TOKEN_SECRET`.

---

## 2. Cách lấy DATABASE_URI (MongoDB Atlas)

Nếu bạn dùng MongoDB trên Cloud (Atlas):

1.  Đăng nhập vào [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Tại Cluster của bạn, nhấn nút **Connect**.
3.  Chọn **Connect your application**.
4.  Copy đoạn mã (Connection String), nó sẽ có dạng:
    `mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority`
5.  **Lưu ý:** Thay thế `<password>` bằng mật khẩu thực tế của Database User mà bạn đã tạo (không phải mật khẩu đăng nhập trang web MongoDB).

---

## 3. Cấu trúc file .env mẫu

Sau khi lấy đủ thông tin, file `.env` của bạn sẽ trông như thế này:

```env
PORT=3500
DATABASE_URI=mongodb+srv://your_user:your_password@cluster0.xxx.mongodb.net/your_db_name
ACCESS_TOKEN_SECRET=chuoi_vừa_tạo_ở_bước_1
REFRESH_TOKEN_SECRET=chuoi_vừa_tạo_ở_bước_1_lần_2
```

## tạo user nhớ thêm trường Admin trong roles nếu muốn set admin 1 ai đó trong database
