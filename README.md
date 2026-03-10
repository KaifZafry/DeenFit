# DeenFit (Admin + User + Backend)

## Prerequisites
- Node.js (LTS recommended)
- MongoDB Atlas or a MongoDB connection string

## Backend setup
1. Copy `Backend/.env` and set your values (or create it from scratch):
   - `MONGODB_URI=...`
   - `JWT_SECRET=...`
   - `RAZORPAY_KEY_ID=...` and `RAZORPAY_KEY_SECRET=...` (for online payments; see `Backend/.env.example`)
2. Install + run:
   - `cd Backend`
   - `npm.cmd install`
   - `npm.cmd run dev`

Backend runs on `http://localhost:7000`.

Static images are served from `http://localhost:7000/ServiceProduct/<filename>`.

## User panel
- `cd user`
- `npm.cmd install`
- `npm.cmd run dev`

## Admin panel
- `cd Admin`
- `npm.cmd install`
- `npm.cmd run dev`

## Notes
- Both Vite apps proxy `/api/*` to `http://localhost:7000` (see `user/vite.config.js` and `Admin/vite.config.js`).
- OTP email sending is a stub at `POST /api/Email/send` (frontend OTP is client-generated).
